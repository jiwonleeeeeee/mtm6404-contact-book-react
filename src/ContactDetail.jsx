import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import db from './db';

const ContactDetail = ({ removeContact }) => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [contact, setContact] = useState(null);

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

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (confirmDelete) {
      const docRef = doc(db, 'contacts', id);
      await deleteDoc(docRef); 
      removeContact(id); 
      navigate('/'); 
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`); 
  };

  const handleGoHome = () => {
    navigate('/');  
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div>
      <h2>Contact Details</h2>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <button onClick={handleDelete}>Delete Contact</button>
      <button onClick={handleEdit}>
        Edit Contact
      </button>
      <button onClick={handleGoHome}>
        Go to the Contact List
      </button>
    </div>
  );
};

export default ContactDetail;
