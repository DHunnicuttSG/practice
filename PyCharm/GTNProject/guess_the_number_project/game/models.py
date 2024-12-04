from django.db import models

from django.db import models

class Game(models.Model):
    secret_number = models.CharField(max_length=4)
    created_at = models.DateTimeField(auto_now_add=True)

class Round(models.Model):
    game = models.ForeignKey(Game, related_name='rounds', on_delete=models.CASCADE)
    guess = models.CharField(max_length=4)
    bulls = models.IntegerField()
    cows = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

