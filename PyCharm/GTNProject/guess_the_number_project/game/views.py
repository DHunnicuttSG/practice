from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Game, Round
from .serializers import GameSerializer, RoundSerializer
import random

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        secret_number = ''.join(random.sample('0123456789', 4))
        game = Game.objects.create(secret_number=secret_number)
        serializer = self.get_serializer(game)
        return Response(serializer.data)

class RoundViewSet(viewsets.ModelViewSet):
    queryset = Round.objects.all()
    serializer_class = RoundSerializer

    def create(self, request, *args, **kwargs):
        game_id = request.data.get('game')
        guess = request.data.get('guess')
        game = Game.objects.get(id=game_id)
        bulls, cows = self.calculate_bulls_and_cows(game.secret_number, guess)
        round = Round.objects.create(game=game, guess=guess, bulls=bulls, cows=cows)
        serializer = self.get_serializer(round)
        return Response(serializer.data)

    def calculate_bulls_and_cows(self, secret, guess):
        bulls = sum(1 for s, g in zip(secret, guess) if s == g)
        cows = sum(1 for g in guess if g in secret) - bulls
        return bulls, cows

# new game = /gtn/games/
# new guess = gtn/rounds/  need game and guess in request body
