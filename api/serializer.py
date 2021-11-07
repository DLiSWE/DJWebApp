from .models import Room
from rest_framework import serializers

#serialize fields for database model to be acceptable in JS,HTML,CSS

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id','code','host','can_pause','votes_to_skip','date_created')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('can_pause', 'votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('can_pause', 'votes_to_skip', 'code')
        