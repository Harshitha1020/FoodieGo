from django.contrib import admin
from django.urls import path, include  # ✅ Import 'include' to load API URLs

urlpatterns = [
    path('admin/', admin.site.urls),
path('api/', include('api.urls')),]
