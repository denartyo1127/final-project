
import { loadHeaderFooter } from "./utils.mjs";
import ContactForm from "./Contact.mjs";

loadHeaderFooter();

const contact = new ContactForm("contact-form", "form-feedback");
contact.init();