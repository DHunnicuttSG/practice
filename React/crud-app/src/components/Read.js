import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReadContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get('http://contactlist.us-east-1.elasticbeanstalk.com/contacts');
      setContacts(response.data);
    };
    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.contactId}>
            {contact.contactId}: {contact.firstName} {contact.lastName} ({contact.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadContacts;
