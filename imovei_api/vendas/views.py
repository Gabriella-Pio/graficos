from django.http import JsonResponse
from .services.dashboard import get_dados_por_bairro, get_dados_por_semana_normalizado

def vendas_agrupadas(request):
    # Pega parâmetros GET
    data_inicio = request.GET.get('data_inicio')
    data_fim = request.GET.get('data_fim')

    return JsonResponse({
        'por_bairro': get_dados_por_bairro(data_inicio, data_fim),
        'por_semana': get_dados_por_semana_normalizado(data_inicio, data_fim),
    }, safe=False)
