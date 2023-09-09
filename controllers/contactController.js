const asyncHandler = require("express-async-handler");

const Contact=require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access Private

const getContacts = asyncHandler(async (req, res) => {
   const contacts=await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

//@desc Create contact
//@route POST /api/contacts
//@access Private
const CreateContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new error("Please fill all fields");
  }
  const contact= await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });
  res.status(201).json(contact);
});


//@desc Create contact
//@route PUT /api/contacts/id
//@access Private
const UpdateContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error('Contact not found');
  }
  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error('Not authorized to update other users contacts');
  }
  const updatedContact= await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updatedContact);
});


//@desc Get contact
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
});



//@desc Delete contact
//@route Delete /api/contacts/:id
//@access Private
const DeleteContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error('Contact not found');
  }
  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error('Not authorized to update other users contacts');
  }
  await Contact.deleteOne({_id:req.params.id});
  res.status(200).json(contact);
});


module.exports = {
  getContacts,
  CreateContact,
  getContact,
  UpdateContact,
  DeleteContact,
};
