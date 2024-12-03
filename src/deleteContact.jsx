import { doc, deleteDoc } from "firebase/firestore";
import db from './db'; 

export const deleteContact = async (contactId) => {
  try {
    const contactRef = doc(db, "contacts", contactId); 
    await deleteDoc(contactRef); 
    console.log("Contact has been deleted successfully!");
  } catch (error) {
    console.error("Error deleting contacts: ", error);
  }
};
