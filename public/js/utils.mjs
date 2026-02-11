// Function to render a template into a parent element
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
      callback(data);
  }
}

// Function to fetch an HTML file and return it as text
async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// The main function you'll call on every page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("partials/Header.html");
  const footerTemplate = await loadTemplate("partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, null, updateCartCount);
  renderWithTemplate(footerTemplate, footerElement);
}

export function updateCartCount() {
  const quote = JSON.parse(localStorage.getItem("auto-quote")) || [];
  const countElement = document.querySelector("#quote-count");
  if (countElement) {
    countElement.textContent = quote.length;
  }
}