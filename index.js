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
      await listContacts();
      console.table(contacts);
      console.log(color.info("Request completed successfully."));

      break;

    case "get":
      await getContactById(id);

      break;

    case "add":
      await addContact(name, email, phone);

      break;

    case "remove":
      await removeContact(id);

      break;

    default:
      console.log(color.error("Unknown action!"));
  }
};

invokeAction(argv);
