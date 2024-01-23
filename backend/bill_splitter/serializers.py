from rest_framework import serializers
from bill_splitter.models import Person, Item, Bill,Participation, BillParticipation

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ["id","firstName","lastName","initials"]

class ItemSerializer(serializers.ModelSerializer):
    participants = PersonSerializer(many=True, read_only=True)
    class Meta:
        model = Item
        fields = ['id', 'description', 'cost', 'participants']

class BillSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    payer = PersonSerializer(read_only=True)
    class Meta:
        model = Bill
        fields = ['id', 'items', 'tax', 'date', 'payer']

class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = '__all__'

class BillParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillParticipation
        fields = '__all__'