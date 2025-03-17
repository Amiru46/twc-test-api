const Contact = require("../models/Contact");


exports.createContact = async (req, res) => {
    try {
      const { name, phone, email, gender } = req.body;
      const contact = new Contact({ 
        name, 
        phone, 
        email,
        gender,
        user: req.user.id 
      });
  
      await contact.save();
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ error: "Error creating contact" });
    }
  };

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contacts" });
  }
};


exports.updateContact = async (req, res) => {
    try {
      const contact = await Contact.findOne({
        _id: req.params.id,
        user: req.user.id
      });
      if (!contact) return res.status(404).json({ error: "Contact not found" });
      
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedContact);
    } catch (error) {
      res.status(500).json({ error: "Error updating contact" });
    }
  };

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting contact" });
  }
};
