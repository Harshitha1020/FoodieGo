import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import ItemList from "./ItemList"; // ✅ Importing ItemList

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  // 🔹 Ensure every item has a valid price (default: ₹100 if missing)
  const validCartItems = cartItems.map((item) => ({
    ...item,
    price: isNaN(item.price) || item.price == null ? 100 : item.price,
  }));

  const handleBuy = async () => {
    if (validCartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      items: validCartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      total_price: validCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };

    console.log("📦 Sending order data:", orderData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/create_order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log("✅ Response received:", data);

      if (response.ok) {
        alert(`🎉 Order placed successfully! Order ID: ${data.order_id}`);
        dispatch(clearCart());
      } else {
        alert("⚠ Failed to place order: " + (data.error || JSON.stringify(data)));
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("⚠ Network error! Please try again.");
    }
  };

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl m-3 p-3">Cart</h1>

      {validCartItems.length === 0 ? (
        <div>
          <img
            className="block mx-auto w-1/4 h-1/4"
            src="https://mir-s3-cdn-cf.behance.net/projects/404/54b13147340145.Y3JvcCw0MDUsMzE3LDAsNDI.png"
            alt="Empty Cart"
          />
          <h2 className="text-bold text-xl m-4">Your Cart is Empty</h2>
          <h3 className="m-2 p-2">
            You can go to the home page to view more restaurants
          </h3>
          <h2 className="font-bold text-sm bg-orange-500 text-white w-1/5 m-auto p-2">
            <Link to={"/"}>SEE RESTAURANTS NEAR YOU</Link>
          </h2>
        </div>
      ) : (
        <div className="w-6/12 m-auto">
          {validCartItems.map((item) => (
            <div key={item.id} className="flex justify-between p-2 border-b">
              <span>
                {item.name} ({item.quantity}x)
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          {/* ✅ ItemList Component */}
          <div className="w-6/12 m-auto">
            <ItemList items={validCartItems} />
          </div>

          {/* Buttons Section */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
              onClick={handleBuy}
            >
              🛍 Buy Now
            </button>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
              onClick={() => dispatch(clearCart())}
            >
              🗑 Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
