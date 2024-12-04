import React, { useState } from 'react';
import CreateContact from './CreateContact';
import ReadContacts from './ReadContacts';
import UpdateContact from './UpdateContact';
import DeleteContact from './DeleteContact';
import axios from 'axios';

const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const refreshContacts = async () => {
    const response = await axios.get('http://contactlist.us-east-1.elasticbeanstalk.com/contacts');
    setContacts(response.data);
  };

  return (
    <div>
      <h1>Contact Management</h1>
      <CreateContact onContactCreated={refreshContacts} />
      <ReadContacts contacts={contacts} />
      {selectedContact && (
        <UpdateContact contact={selectedContact} onContactUpdated={refreshContacts} />
      )}
      {contacts.map((contact) => (
        <DeleteContact key={contact.id} contactId={contact.id} onContactDeleted={refreshContacts} />
      ))}
    </div>
  );
};

export default Main;
