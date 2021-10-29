from .models import dbModel
from rest_framework import serializers

class dbModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = dbModel
        fields = ('field1', 'field2', 'blfield3', 'intfield', 'datefield')