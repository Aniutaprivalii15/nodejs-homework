const contacts = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      if (!id) {
        console.log("Contact ID is required.");
        break;
      }
      const selectedContact = await contacts.getContactById(id);
      console.log(selectedContact);
      break;
    case "add":
      if (!name || !email || !phone) {
        console.log("Name, email, and phone are required.");
        break;
      }
      const newContact = await contacts.addContact({ name, email, phone });
      console.log("New contact:", newContact);
      break;
    case "remove":
      if (!id) {
        console.log("Contact ID is required.");
        break;
      }
      const deletedContact = await contacts.removeContact(id);
      console.log("Deleted contact:", deletedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);