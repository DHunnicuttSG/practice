import http.server
import json
import mysql.connector
from urllib.parse import urlparse, parse_qs

# Database connection
db_config = {
    'user': 'root',
    'password': 'RootRoot',
    'host': 'localhost',
    'database': 'contactlist2'
}

class ContactList:
    def __init__(self):
        self.conn = mysql.connector.connect(**db_config)
        self.cursor = self.conn.cursor(dictionary=True)
        
        
    def create_contact(self, name, phone, email):
        query = "INSERT INTO contacts (name, phone, email) VALUES (%s, %s, %s);"
        self.cursor.execute(query, (name, phone, email))
        self.conn.commit()
        return {"id": self.cursor.lastrowid, "name": name, "phone": phone, "email": email}

    def read_contacts(self):
        self.cursor.execute("SELECT * FROM contacts;")
        return self.cursor.fetchall()

    def update_contact(self, contact_id, new_phone=None, new_email=None):
        query = "UPDATE contacts SET phone = %s, email = %s WHERE id = %s;"
        self.cursor.execute(query, (new_phone, new_email, contact_id))
        self.conn.commit()
        return self.cursor.rowcount > 0

    def delete_contact(self, contact_id):
        query = "DELETE FROM contacts WHERE id = %s;"
        self.cursor.execute(query, (contact_id,))
        self.conn.commit()
        return self.cursor.rowcount > 0

    def checkConn(self):
        if self.conn.is_connected:
            print("Connection established")
        else:
            print("No connection")

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
            contact_id = query.get('id', [None])[0]
            if contact_id:
                content_length = int(self.headers['Content-Length'])
                put_data = self.rfile.read(content_length)
                data = json.loads(put_data)
                updated = contact_list.update_contact(contact_id, data.get('phone'), data.get('email'))
                if updated:
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"message": "Contact updated successfully"}).encode())
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
            contact_id = query.get('id', [None])[0]
            if contact_id and contact_list.delete_contact(contact_id):
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
Explanation:

Database Connection: Establishes a connection to the MySQL database using mysql.connector.
ContactList Class: Manages CRUD operations on the MySQL database.
create_contact: Inserts a new contact into the database.
read_contacts: Retrieves all contacts from the database.
update_contact: Updates an existing contact in the database.
delete_contact: Deletes a contact from the database.
RequestHandler Class: Handles HTTP requests for the CRUD operations.
do_GET: Handles reading contacts.
do_POST: Handles creating a new contact.
do_PUT: Handles updating an existing contact.
do_DELETE: Handles deleting a contact.
run Function: Starts the HTTP server on the specified port (default is 8080).
Running the Application
Save the code to a file, e.g., contactListAPI.py.
Run the script using Python: python contactListAPI.py.
Use tools like curl or Postman to interact with the API.
'''