import React, { useState } from 'react';
import axios from 'axios';

const CreateContact = ({ onContactCreated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { firstName, lastName, company, phone, email };
    await axios.post('http://contactlist.us-east-1.elasticbeanstalk.com/contact', newContact);
    ContactCreated();
  };

  const ContactCreated = () => {
    setFirstName('')
    setLastName('')
    setCompany('')
    setPhone('')
    setEmail('')
  } 

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
        <br></br>
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br></br>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      <button type="submit">Create Contact</button>
    </form>
  );
};

export default CreateContact;
