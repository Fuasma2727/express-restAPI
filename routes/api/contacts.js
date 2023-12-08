const express = require('express');
const router = express.Router();
const {getAllTasks, createTask, updateTask, deleteTask, deleteAll, updateState} = require('../../controllers/task.controller');
const Joi = require('joi'); // Importa Joi
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts');

// Esquema de validación para los datos del contacto
const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$')).required(),
});

// Ruta GET /api/contacts
/*router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    console.error('Error listing contacts:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});*/

// Ruta GET /api/contacts/:contactId
router.get("/", getAllTasks);
/*router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return; // Return here to avoid sending a duplicate response
    }

    res.json(contact);
  } catch (error) {
    console.error('Error getting contact by ID:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});*/

// Ruta POST /api/contacts
router.post("/", createTask)


/*router.post('/', async (req, res, next) => {
  const { body } = req;

  // Validar los datos del contacto
  const { error } = contactSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error adding contact:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});*/

// Ruta DELETE /api/contacts/:contactId
router.delete("/all",deleteAll);
router.delete("/:id", deleteTask);


/*router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await removeContact(contactId);
    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error('Error removing contact:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});*/

// Ruta PUT /api/contacts/:contactId

router.put("/:id", updateTask);
router.patch("/:id/favorite", updateState);



/*router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  // Validar los datos del contacto
  const { error } = contactSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedContact = await updateContact(contactId, body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error('Error updating contact:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});*/

module.exports = router;
