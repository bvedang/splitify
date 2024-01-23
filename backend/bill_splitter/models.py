from django.db import models

# Create your models here.

class Person(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    initials = models.CharField(max_length=4)

class Item(models.Model):
    name = models.CharField(max_length=255)
    cost = models.DecimalField(max_digits=6, decimal_places=3)
    participants = models.ManyToManyField(Person, related_name='items')

class Bill(models.Model):
    items = models.ManyToManyField(Item, related_name='bills')
    tax = models.DecimalField(max_digits=5, decimal_places=3)
    date = models.DateField()
    payer = models.ForeignKey(Person, on_delete=models.SET_NULL,null=True, related_name='paid_bills')

class Participation(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    share = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.person.initials} - {self.item.name}: {self.share}"

class BillParticipation(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    total_share = models.DecimalField(max_digits=6, decimal_places=2)  # Total per bill, not per item

    def __str__(self):
        return f"{self.person.initials} - {self.bill.date}: {self.total_share}"

    class Meta:
        unique_together = ('bill', 'person')  # Ensures unique combinations of bill and person
