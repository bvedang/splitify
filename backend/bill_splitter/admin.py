from django.contrib import admin
from bill_splitter.models import Person, Item, Bill,Participation, BillParticipation

# Register your models here.

admin.site.register(Person)
admin.site.register(Item)
admin.site.register(Bill)
admin.site.register(Participation)
admin.site.register(BillParticipation)