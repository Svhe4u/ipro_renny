
from django.urls import path, include
from product_app import authView, views


urlpatterns = [
    path('api/auth/', authView.authCheckService),
    path('api/whois/', views.checkService),
]
