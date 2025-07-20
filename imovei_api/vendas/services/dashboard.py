from collections import defaultdict
from django.db.models import Sum
from django.db.models.functions import TruncWeek
from ..models import Venda
import datetime

# Função que agrupa as vendas totais por bairro
# Pode receber filtros de data (data_inicio e data_fim)
def get_dados_por_bairro(data_inicio=None, data_fim=None):
    queryset = Venda.objects.all()

    # Aplica filtro por intervalo de datas, se fornecido
    if data_inicio and data_fim:
        queryset = queryset.filter(data_venda__range=[data_inicio, data_fim])

    # Agrupa as vendas por bairro somando a quantidade de vendas
    return list(
        queryset
        .values('bairro')
        .annotate(quantidade=Sum('quantidade'))
        .order_by('bairro')
    )


# Função que agrupa as vendas por semana (domingo como base) e por bairro,
# preenchendo semanas faltantes com valor 0 para manter continuidade no gráfico
# Também pode ser filtrada por intervalo de datas
def get_dados_por_semana_normalizado(data_inicio=None, data_fim=None):
    queryset = Venda.objects.all()

    # Aplica filtro por intervalo de datas, se fornecido
    if data_inicio and data_fim:
        queryset = queryset.filter(data_venda__range=[data_inicio, data_fim])

    # Agrupa vendas por semana e bairro
    dados_raw = (
        queryset
        .annotate(semana=TruncWeek('data_venda'))  # Agrupa pela semana
        .values('semana', 'bairro')
        .annotate(quantidade=Sum('quantidade'))
        .order_by('semana')
    )

    # Reorganiza os dados em dicionário com estrutura: {semana: {bairro: quantidade}}
    agrupado = defaultdict(lambda: defaultdict(int))
    for item in dados_raw:
        semana = item['semana'].strftime('%Y-%m-%d')
        agrupado[semana][item['bairro']] += item['quantidade']

    # Identifica o intervalo de semanas a ser considerado
    semanas = sorted(agrupado.keys())
    if not semanas:
        return []  # Retorna lista vazia se não houver dados

    primeira_data = datetime.datetime.strptime(semanas[0], '%Y-%m-%d')
    ultima_data = datetime.datetime.strptime(semanas[-1], '%Y-%m-%d')

    # Gera uma lista com todas as semanas contínuas entre a primeira e a última
    todas_as_semanas = []
    atual = primeira_data
    while atual <= ultima_data:
        todas_as_semanas.append(atual.strftime('%Y-%m-%d'))
        atual += datetime.timedelta(weeks=1)

    # Identifica todos os bairros presentes nos dados
    todos_bairros = set()
    for bairros in agrupado.values():
        todos_bairros.update(bairros.keys())

    # Constrói a lista de saída, preenchendo com 0 onde não houver dados
    lista = []
    for semana in todas_as_semanas:
        linha = {'semana': semana}
        for bairro in todos_bairros:
            linha[bairro] = agrupado[semana][bairro] if bairro in agrupado[semana] else 0
        lista.append(linha)

    return lista