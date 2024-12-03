import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import db from './db';  
import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import ContactDetail from './ContactDetail';
import NewContact from './NewContact';
import EditContact from './EditContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getContacts = async () => {
      const contactsCollection = collection(db, 'contacts');
      const contactSnapshot = await getDocs(contactsCollection);
      const contactList = contactSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const sortedContacts = contactList.sort((a, b) => a.lastName.localeCompare(b.lastName));

      setContacts(sortedContacts);
    };

    getContacts();
  }, []);

  const removeContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Router>
      <div className="App">
        <h1>Contact Book</h1>
        <div className="search-container">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <Link to="/new" className="add-contact-link">Add New Contact</Link>
        <Routes>
          <Route path="/" element={<ContactList contacts={filteredContacts} />} />
          <Route path="/contact/:id" element={<ContactDetail removeContact={removeContact} />} />
          <Route path="/new" element={<NewContact setContacts={setContacts} />} /> 
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  );
}

const ContactList = ({ contacts }) => (
  <div>
    <h2>Contact List</h2>
    <ul>
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        contacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))
      )}
    </ul>
  </div>
);

export default App;
