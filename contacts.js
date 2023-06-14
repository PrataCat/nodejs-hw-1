const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");
var color = require("colors");
color.setTheme({
  info: "green",
  warn: "yellow",
  fail: "red",
});

const contactsPath = path.join(__dirname, "db", "contacts.json");
// const contactsPath = path.resolve(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const id = String(contactId);
  const chosenContact = JSON.stringify(contacts.find((item) => item.id === id));

  if (chosenContact) {
    console.log(color.info(`Your contact: ${chosenContact}`));
  } else {
    console.log(color.fail(`Such contact doesn't exists`));
  }
  return chosenContact || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };

  if (contacts.some((item) => item.phone === newContact.phone)) {
    return console.log(color.warn("This contact already exists."));
  } else {
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts));
    console.log(color.info("Contact added."));

    return newContact;
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.filter((item) => item.id === contactId);
  const contactInfo = JSON.stringify(deletedContact[0]);

  if (deletedContact[0]) {
    const updatedContacts = contacts.filter((item) => item.id !== contactId);
    await writeFile(contactsPath, JSON.stringify(updatedContacts));

    console.log(color.info(`Contact deleted: ${contactInfo} `));
    return deletedContact;
  } else {
    console.log(color.fail("Contact not found."));
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
