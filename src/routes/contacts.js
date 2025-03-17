const express = require('express');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { fullName, gender, email, phoneNumber } = req.body;

  try {
    const newContact = new Contact({ fullName, gender, email, phoneNumber, user: req.user.id });
    await newContact.save();
    res.json(newContact);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { fullName, gender, email, phoneNumber } = req.body;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    contact = await Contact.findByIdAndUpdate(req.params.id, { fullName, gender, email, phoneNumber }, { new: true });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;