from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.fields import BooleanField
from .serializer import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

#Create view classes here
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

#Get room and code value. Create session if not exist.
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'
    
    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code Parameter not found'}, status=status.HTTP_400_BAD_REQUEST)

#Join room function
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        #create user id using session_key if doesn't exist
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            #if not room_result.exists()
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    #Serialize data to create the room view if doesn't exist
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            can_pause = serializer.data.get('can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            #if (len(queryset) > 0)
            if queryset.exists():
                room = queryset[0]
                room.can_pause = can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['can_pause', 'votes_to_skip'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, can_pause=can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class UsersInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {"code": self.request.session.get("room_code")}
        return JsonResponse(data, status=status.HTTP_200_OK)

class LeaveRoom(APIView):
    #if host leaves room, delete room code as well
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(host=host_id)
            #if not room_results.exists():
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()

        return Response({'Message':'Success'}, status=status.HTTP_200_OK)

#allow host to change settings while inside the room. Make user host is the one changing.
#TODO: Allow host to give authorization to other user to allow setting changes
class UpdateRoomView(APIView):
    serializer_class = UpdateRoomSerializer
    #Accept updated setting values and apply to Room View
    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        #if serializer is valid, set values to fields
        if serializer.is_valid():
            can_pause = serializer.data.get('can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'Error': 'Room not Found'}, status=status.HTTP_404_NOT_FOUND)

            room = queryset[0]
            user_id = self.request.session.session_key
            #make sure the person updating is the one who created by comparing user_id and host that was found from queryset[0]
            if room.host != user_id:
                return Response({'message': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)
        
            room.can_pause = can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['can_pause', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)
