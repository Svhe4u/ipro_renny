
from django.urls import path, include
from django.conf.urls.static import static
from product_app import authView, views
from django.conf import settings

urlpatterns = [
    path('api/auth/', authView.authCheckService),
    path('api/whois/', views.checkService),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
