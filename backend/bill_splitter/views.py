from rest_framework import viewsets
from bill_splitter.models import Person, Item, Bill, Participation, BillParticipation
from bill_splitter.serializers import PersonSerializer, ItemSerializer, BillSerializer,ParticipationSerializer, BillParticipationSerializer

# Create your views here.
class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class ParticipationViewSet(viewsets.ModelViewSet):
    queryset = Participation.objects.all()
    serializer_class = ParticipationSerializer

class BillParticipationViewSet(viewsets.ModelViewSet):
    queryset = BillParticipation.objects.all()
    serializer_class = BillParticipationSerializer