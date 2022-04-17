from django.db import models

class Entry(models.Model):
    Date = models.DateField()
    Title = models.CharField(max_length=200)
    Count = models.IntegerField()
    Distance = models.IntegerField()

    def __str__(self):
        return self.Title

# Create your models here.
