const fs = require('fs/promises');

const contactsFilePath = __dirname + '/contacts.json';

const listContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
    console.log('contactsData:', contactsData); // Agrega esta línea
    return JSON.parse(contactsData);
  } catch (error) {
    console.error('Error reading contacts file:', error.message);
    return [];
  }
};

const getContactById = async (contactId) => {
  const parsedContactId = String(contactId); // Convert contact ID to a string
  console.log('Searching for contact with ID:', parsedContactId); // Log the contact ID being searched for

  const contacts = await listContacts(); 

  const contact = contacts.find((contact) => {
    return contact.id === parsedContactId;
  });

  if (!contact) {
    console.error('Contact with ID', parsedContactId, 'not found'); 
    return null;
  }
  console.log('Found contact:', contact); 
  return contact;
};



const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsFilePath, JSON.stringify(updatedContacts, null, 2), 'utf-8');
  return updatedContacts.length !== contacts.length;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  console.log('Current contacts:', contacts);

  // Genera un ID único utilizando la función existente
  const newContactId = generateUniqueId();

  // Crea el nuevo contacto con el ID único
  const newContact = {
    id: newContactId,
    ...body,
  };

  contacts.push(newContact);

  console.log('New contact:', newContact);

  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
  return newContact;
};


const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
    return updatedContact;
  }

  return null;
};

// Función para generar un ID único
const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);


// Exporta las funciones
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};