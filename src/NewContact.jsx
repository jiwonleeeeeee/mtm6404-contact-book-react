import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from './db';
import { useNavigate } from 'react-router-dom';

const NewContact = ({ setContacts }) => {  
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactsCollection = collection(db, 'contacts');
    const docRef = await addDoc(contactsCollection, formData);  

    setContacts((prevContacts) => [
      ...prevContacts,
      { id: docRef.id, ...formData }
    ]);

    setFormData({ firstName: '', lastName: '', email: '' });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default NewContact;
