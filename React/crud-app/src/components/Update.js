import React, { useState } from 'react';
import axios from 'axios';

const UpdateContact = () => {
  const [contactId, setContactId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://contactlist.us-east-1.elasticbeanstalk.com/contact/${contactId}`, 
        { firstName, lastName, company, phone, email });
      console.log('Data updated:', response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={contactId}
        onChange={(e) => setContactId(e.target.value)}
        placeholder="Contact Id"
      />
      <br></br>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <br></br>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <br></br>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
      />
      <br></br>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
      /><br></br>
            <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      /><br></br>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateContact;
