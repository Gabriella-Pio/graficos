# vendas/views.py
from django.http import JsonResponse
from .models import Venda
from django.db.models import Count
from django.db.models import Sum
from collections import defaultdict
import datetime
from django.db.models.functions import TruncWeek

def vendas_por_bairro(request):
    dados = (
        Venda.objects
        .values('bairro')
        .annotate(quantidade=Sum('quantidade'))  # <-- Aqui somamos as quantidades
        .order_by('bairro')
    )
    return JsonResponse(list(dados), safe=False)

def vendas_por_semana(request):
    vendas = Venda.objects.all()

    dados = defaultdict(lambda: defaultdict(int))

    for venda in vendas:
        semana = venda.data_venda - datetime.timedelta(days=venda.data_venda.weekday())
        chave_semana = semana.strftime('%Y-%m-%d')
        dados[chave_semana][venda.bairro] += venda.quantidade

    # Reorganizar para formato que o Recharts entende
    resultado = []
    for semana, bairros in sorted(dados.items()):
        entrada = {'semana': semana}
        entrada.update(bairros)
        resultado.append(entrada)

    return JsonResponse(resultado, safe=False)
