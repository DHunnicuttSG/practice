from django.test import TestCase, Client
from .models import Contact
from django.urls import reverse


class BasicTests(TestCase):
    def test_1(self):
        self.assertTrue(1 == 1)
        self.assertFalse(1 == 2)

    # def test_2(self):
    #     try:
    #         print("hello")
    #         raise Exception('Failure in test_2')
    #     except Exception as e:
    #         self.fail(e)

    # test our model


class TestModels(TestCase):
    # def setUp(self):
    #     '''
    #     Can use to set up before each test
    #     '''

    def test_model_Contacts(self):
        my_contact = Contact.objects.create(
            first_name='Test first name',
            last_name='test last name',
            email='test1@testing.com',
            phone_number='123-456-7890'
        )

        self.assertEqual(my_contact.first_name, 'Test first name')
        self.assertTrue(isinstance(my_contact, Contact))


class testViews(TestModels):
    def setUp(self):
        self.client = Client()

        self.my_contact = Contact.objects.create(
            first_name='Test first name entry',
            last_name='test last name entry',
            email='test@testing.com',
            phone_number='123-456-7890'
        )

        #set up urls
        self.contact_list = reverse('contact_list')
        self.contact_create = reverse('contact_create')
        self.contact_update = reverse('contact_update', args=[self.my_contact.id])
        self.contact_delete = reverse('contact_delete', args=[self.my_contact.id])

    def test_get_contact_list(self):
        # mock the response
        response = self.client.get(self.contact_list)

        # print(response)
        # write assertions
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'contacts/contact_list.html')

    def test_create_contact(self):

        response = self.client.post(self.contact_create,
               {
                        'first_name': 'Test2 first name',
                        'last_name': 'test2 last name',
                        'email': 'test2@testing.com',
                        'phone_number': '123-123-2222'
                    })
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Contact.objects.count(), 2)
        self.assertEqual(Contact.objects.last().first_name, 'Test2 first name')

    def test_update_contact(self):
        response = self.client.post(self.contact_update,
                    {
                        'first_name': 'Test2 first name',
                        'last_name': 'test2 last name',
                        'email': 'update@testing.com',
                        'phone_number': '123-123-2222'
                    })
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Contact.objects.first().first_name, 'Test2 first name')
        self.assertEqual(Contact.objects.count(), 1)

    def test_delete_contact(self):
        response = self.client.post(self.contact_delete)

        self.assertEqual(response.status_code, 302)
        self.assertEqual(Contact.objects.count(), 0)
