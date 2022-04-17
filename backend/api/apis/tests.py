from django.test import TestCase
from .models import Entry

class EntryModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Entry.objects.create(Title='First entry')
        Entry.objects.create(Date='20.01.2022')

    def test_title_content(self):
        entry = Entry.objects.get(id=1)
        expected = f'{entry.Title}'
        self.AssertEquals(expected, 'First Entry')

    def test_date_content(self):
        entry = Entry.objects.get(id=2)
        expected = entry.Date
        self.AssertEquals(expected, "20.01.2022")

# Create your tests here.
