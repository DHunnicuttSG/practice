from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['first_name', 'last_name', 'email', 'phone_number']

class ContactForm2(forms.Form):
    first_name = forms.CharField(label='First Name: ', max_length=100)
    last_name = forms.CharField(label='Last Name: ', max_length=100)
    email = forms.EmailField(label='Email: ')
    phone_number = forms.CharField(label='Phone: ')
