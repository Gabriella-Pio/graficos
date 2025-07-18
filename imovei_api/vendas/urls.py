# vendas/urls.py
from django.urls import path
from . import views


urlpatterns = [
    path('bairro/', views.vendas_por_bairro, name='vendas_por_bairro'),
    path('semana/', views.vendas_por_semana, name='vendas_por_semana'),
]
