import expressAsyncHandler from "express-async-handler";
import { Contact } from "../model/contactModel.js";

const getContacts = expressAsyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const getContact = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Page not found!");
  }
  res.status(200).json(contact);
});

const createContact = expressAsyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Fileds are required!");
  }

  const nameAvailable = await Contact.findOne({ name });
  const emailAvailable = await Contact.findOne({ email });
  const phoneAvailable = await Contact.findOne({ phone });

  if (nameAvailable) {
    res.status(409);
    throw new Error("Name already exist!");
  } else if (emailAvailable) {
    res.status(409);
    throw new Error("Email already exist!");
  } else if (phoneAvailable) {
    res.status(409);
    throw new Error("Phone already exist!");
  } else {
    const contact = await Contact.create({
      name,
      email,
      phone,
    });
    res.status(201).json(contact);
  }
});

const updateContact = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body);

  if (!updateContact) {
    res.status(404);
    throw new Error("Page not found!");
  }

  const contact = await Contact.find();
  res.status(202).json(contact);
});

const deleteContact = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletecontact = await Contact.findByIdAndDelete(id);

  if (!deletecontact) {
    res.status(404);
    throw new Error("Page not found!");
  }
  res.status(202).send("Contact deleted.");
});

export { getContact, getContacts, createContact, updateContact, deleteContact };
