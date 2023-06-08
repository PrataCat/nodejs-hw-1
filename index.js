const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

var color = require("colors");
color.setTheme({
  info: "green",
  warn: "yellow",
  error: "red",
});

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      console.log(color.info("Request completed successfully."));

      break;

    case "get":
      const contact = await getContactById(id);
      console.log(color.info(`Your contact: ${contact.name}`));

      break;

    case "add":
      await addContact(name, email, phone);

      break;

    case "remove":
      const deletedContact = await removeContact(id);
      if (deletedContact) {
        console.log(color.info(`Contact deleted: ${deletedContact}`));
      } else {
        throw new Error(color.warn(`Contact not found.`));
      }

      break;

    default:
      console.log(color.error("Unknown action!"));
  }
};

invokeAction(argv);
