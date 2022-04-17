from django.shortcuts import render
from rest_framework import generics

from .models import Entry
from .serializers import EntrySerializer

class ListEntry(generics.ListCreateAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

class DetailEntry(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer


# Create your views here.
