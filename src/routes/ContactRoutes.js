const express = require("express");
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  });
  
  router.get("/", authMiddleware, async (req, res) => {

    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  });
  
  router.post("/", authMiddleware, async (req, res) => {
    const { name, email, phone, gender } = req.body;
  
    const newContact = new Contact({
      user: req.user.id,
      name,
      email,
      phone,
      gender,
    });
  
    await newContact.save();
    res.json(newContact);
  });
  
  router.put("/:id", authMiddleware, async (req, res) => {

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedContact);
  });
  
  router.delete("/:id", authMiddleware, async (req, res) => {
    
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  });
  
  module.exports = router;