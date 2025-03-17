from django.urls import path
from .views import create_order
from .views import contact_view

from . import views

from .views import get_grocery_items, get_restaurants, signup, signin  # ✅ Import both functions

urlpatterns = [
    path('grocery/', get_grocery_items),  # ✅ Grocery API
    path('restaurants/', get_restaurants),  # ✅ Restaurants API
     path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
path('create_order/', create_order, name='create_order'),
path('contact/', contact_view, name='contact'),
 ]
