from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Order, GroceryItem, Restaurant, Contact
from .serializers import OrderSerializer, UserSerializer, ContactSerializer
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import ContactSerializer

@api_view(['POST'])
def contact_view(request):
    if request.method == 'POST':
        # Serialize the data
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            # Save the contact data to the database
            serializer.save()
            return Response({"message": "Form submitted successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API View for creating an order
@api_view(["POST"])
def create_order(request):
    print("📥 Received Order Data:", request.data)  # Debugging log

    # Use OrderSerializer to validate the request data
    serializer = OrderSerializer(data=request.data)
    
    # Check if the serializer is valid
    if serializer.is_valid():
        order = serializer.save()
        return Response(
            {"message": "Order created successfully", "order_id": order.id},
            status=status.HTTP_201_CREATED
        )

    print("❌ Validation Errors:", serializer.errors)  # Log validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API View for user signup (register)
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


# API View for user signin (login)
@api_view(['POST'])
def signin(request):
    print("🔍 Received data:", request.data)  # Debugging log
    
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# API View to get all grocery items
@api_view(['GET'])
def get_grocery_items(request):
    items = GroceryItem.objects.values("id", "name", "price", "description")  # Fetch only required fields
    return Response(list(items))


# API View to get all restaurants
@api_view(['GET'])
def get_restaurants(request):
    restaurants = Restaurant.objects.values("id", "name", "location")  # Fetch only necessary fields
    return Response(list(restaurants))
