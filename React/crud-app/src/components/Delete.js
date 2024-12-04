import React, { useState } from 'react';
import axios from 'axios';


const DeleteContact = () => {
  const [contactId, setContactId] = useState('');
  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://contactlist.us-east-1.elasticbeanstalk.com/contact/${contactId}`);
      console.log('Data deleted');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <form>
    <input
      type="text"
      placeholder="Contact Id"
      value={contactId}
      onChange={(e) => setContactId(e.target.value)}
    />
    <button onClick={handleDelete}>Delete</button>
    </form>
  );
};

export default DeleteContact;
