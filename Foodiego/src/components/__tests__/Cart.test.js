import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import { render, screen } from "@testing-library/react";
import MOCK_DATA from "../mocks/restaurantMenuMock.json";
import { act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  });
}); //fn ek mock function banata hai

it("should render Restaurant Menu component and check the expanding of accordian", async () => {
  await act(async () => {
    render(
      <Provider store={appStore}>
        <RestaurantMenu />
      </Provider>
    );
  });

  const accordianHeader = screen.getByText("Garlic Bread (5)");

  expect(accordianHeader).toBeInTheDocument();

  fireEvent.click(accordianHeader);

  const addButton = screen.getAllByRole("button", { name: "Add +" });

  expect(addButton.length).toBe(5);
});

it("should render Restaurant Menu and add one item to the cart", async () => {
    await act(async () => {
      render(
        <Provider store={appStore}>
          <RestaurantMenu />
        </Provider>
      );
    });
  
    const accordianHeader = screen.getByText("Garlic Bread (5)");
  
    expect(accordianHeader).toBeInTheDocument();
  
    fireEvent.click(accordianHeader);
  
    const addButton = screen.getAllByRole("button", { name: "Add +" });
  
    fireEvent.click(addButton[0]);
  });

it("should render cart component and 1 item should be added in the cart", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <RestaurantMenu />
          <Header/>
        </Provider>
      </BrowserRouter>
    );
  });

  const cartItems = screen.getByText(/1 item/);

  expect(cartItems).toBeInTheDocument();
});

it("should render Restaurant Menu Component and add 2nd item to the cart", async () => {
    await act( async() => {
        render(
            <BrowserRouter>
            <Provider store={appStore} >
                <RestaurantMenu />
                <Header/>
            </Provider>
        </BrowserRouter>
        );
    });

    const accordianHeader2 = screen.getByText("Non Veg Pizza (12)");

    fireEvent.click(accordianHeader2);//agar pehle accordian to expand nhi karenge to button nhi milega

    const addButton = screen.getAllByRole("button",{name:"Add +"});

    fireEvent.click(addButton[1]);
});

it("should render cart component and 2 item should be added in the cart", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <RestaurantMenu />
            <Header/>
          </Provider>
        </BrowserRouter>
      );
    });
  
    const cartItems = screen.getByText(/2 item/);
  
    expect(cartItems).toBeInTheDocument();
    
  });

it("should render Cart Component and clear the cart", async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        );
    })

    const cartItem = screen.getAllByTestId("foodItems");

    expect(cartItem.length).toBe(2);

    const clearCart = screen.getByRole("button",{name:"Clear cart"});

    expect(clearCart).toBeInTheDocument();

    fireEvent.click(clearCart);

    //expect(cartItem.length).toBe(0);
    expect(screen.getByText("Your Cart is Empty")).toBeInTheDocument();
});
