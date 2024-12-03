import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from './db';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    const getContact = async () => {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    getContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'contacts', id);
    await updateDoc(docRef, contact);
    navigate(`/contact/${id}`); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditContact;
