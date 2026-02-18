
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
      callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("partials/Header.html");
  const footerTemplate = await loadTemplate("partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function updateCartCount() {
  const quote = JSON.parse(localStorage.getItem("auto-quote")) || [];
  const countElement = document.querySelector("#quote-count");
  if (countElement) {
    countElement.textContent = quote.length;
  }
}