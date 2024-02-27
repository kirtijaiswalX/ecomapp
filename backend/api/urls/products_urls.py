from django.urls import path
from api.views import product_views as views

urlpatterns = [
    path('',views.getProducts,name="products"),
    path('<str:pk>/reviews/',views.createProductReview,name="createProductReview"),
    path('top/',views.getTopProducts,name="top-products"),
    path('<str:pk>/',views.getProduct,name="product"),
    
]