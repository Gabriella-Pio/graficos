# vendas/urls.py
from django.urls import path
from . import views


urlpatterns = [
    path('vendas/', views.vendas_agrupadas, name='vendas_agrupadas'),
]
