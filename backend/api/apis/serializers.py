from rest_framework import serializers
from .models import Entry

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'Title',
            'Date',
            'Count',
            'Distance'
        )
        model = Entry