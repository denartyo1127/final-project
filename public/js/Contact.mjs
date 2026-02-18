export default class ContactForm {
  constructor(formId, feedbackId) {
    this.formElement = document.getElementById(formId);
    this.feedbackElement = document.getElementById(feedbackId);
  }

  init() {
    // Listen for the "Send Message" button click
    this.formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    // Gather all the form data into a clean object
    const formData = new FormData(this.formElement);
    const data = Object.fromEntries(formData.entries());

    if (data.message.length < 5) {
      this.displayMessage("Please tell us a bit more about what your vehicle needs.", "error");
      return;
    }

    console.log("New Inquiry for Auto Shop:", data);
    this.displayMessage("Success! We've received your request and will contact you soon.", "success");
    
    this.formElement.reset();
  }

  displayMessage(message, type) {
    this.feedbackElement.textContent = message;
    this.feedbackElement.className = type;
    this.feedbackElement.classList.remove('hidden');
  }
}