import http.server
import json
from urllib.parse import urlparse, parse_qs

class Contact:
    def __init__(self, name, phone, email):
        self.name = name
        self.phone = phone
        self.email = email

    def to_dict(self):
        return {"name": self.name, "phone": self.phone, "email": self.email}

class ContactList:
    def __init__(self):
        self.contacts = []

    def create_contact(self, name, phone, email):
        new_contact = Contact(name, phone, email)
        self.contacts.append(new_contact)
        return new_contact.to_dict()

    def read_contacts(self):
        return [contact.to_dict() for contact in self.contacts]

    def update_contact(self, name, new_phone=None, new_email=None):
        for contact in self.contacts:
            if contact.name == name:
                if new_phone:
                    contact.phone = new_phone
                if new_email:
                    contact.email = new_email
                return contact.to_dict()
        return None

    def delete_contact(self, name):
        for contact in self.contacts:
            if contact.name == name:
                self.contacts.remove(contact)
                return True
        return False

contact_list = ContactList()

class RequestHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/contacts":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(contact_list.read_contacts()).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/contacts":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            new_contact = contact_list.create_contact(data['name'], data['phone'], data['email'])
            self.send_response(201)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(new_contact).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_PUT(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == "/contacts":
            query = parse_qs(parsed_path.query)
            name = query.get('name', [None])[0]
            if name:
                content_length = int(self.headers['Content-Length'])
                put_data = self.rfile.read(content_length)
                data = json.loads(put_data)
                updated_contact = contact_list.update_contact(name, data.get('phone'), data.get('email'))
                if updated_contact:
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps(updated_contact).encode())
                else:
                    self.send_response(404)
                    self.end_headers()
            else:
                self.send_response(400)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def do_DELETE(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == "/contacts":
            query = parse_qs(parsed_path.query)
            name = query.get('name', [None])[0]
            if name and contact_list.delete_contact(name):
                self.send_response(200)
                self.end_headers()
            else:
                self.send_response(404)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

def run(server_class=http.server.HTTPServer, handler_class=RequestHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == "__main__":
    run()


'''
Explanation
Contact Class: Represents a contact with name, phone, and email attributes.

ContactList Class: Manages a list of contacts and provides methods to create, read, update, and 
delete contacts.

RequestHandler Class: Handles HTTP requests for the CRUD operations.
    do_GET: Handles reading contacts.
    do_POST: Handles creating a new contact.
    do_PUT: Handles updating an existing contact.
    do_DELETE: Handles deleting a contact.

run Function: Starts the HTTP server on the specified port (default is 8080).

Running the Application
    Save the code to a file, e.g., ContactListAPI.py.
    Run the script using Python: python ContactListAPI.py.

Use tools like curl, Thunder Client or Postman to interact with the API.
'''