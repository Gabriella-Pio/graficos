from django.db import models

# Create your models here.
class Venda(models.Model):
    bairro = models.CharField(max_length=100)
    quantidade = models.IntegerField()
    data_venda = models.DateField()  # já existe


    def __str__(self):
        return f"{self.bairro} - {self.quantidade} - {self.data_venda} vendas"