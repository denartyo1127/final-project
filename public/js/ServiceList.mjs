
function serviceCardTemplate(service) {
  return `<li class="service-card">
    <h3>${service.service}</h3>
    <p class="category">${service.category}</p>
    <p class="price">Estimate: $${service.price.toFixed(2)}</p>
    <p class="time">⏳ ${service.estimatedTime}</p>
    <button class="details-btn" data-id="${service.id}">View Details</button>
    <button class="add-to-quote" data-id="${service.id}">Add to Estimate</button>
  </li>`;
}

export default class ServiceList {
  constructor(dataSource, listElement) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getServices();
    this.renderList(list);
  }

  renderList(list) {
    this.listElement.innerHTML = ""; // Clear existing content
    const htmlStrings = list.map(serviceCardTemplate);
    this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // Add event listeners to all "Add to Estimate" buttons
    const buttons = document.querySelectorAll(".add-to-quote");
    buttons.forEach(button => {
      button.addEventListener("click", (e) => {
        const serviceId = e.target.dataset.id;
        const service = list.find(item => item.id === serviceId);
        this.addToQuote(service);
      });
    });
  }

  addToQuote(service) {
    let currentQuote = JSON.parse(localStorage.getItem("auto-quote")) || [];
    currentQuote.push(service);
    localStorage.setItem("auto-quote", JSON.stringify(currentQuote));
    window.dispatchEvent(new Event("quoteUpdated"));
    alert(`${service.service} added to your estimate!`);
    
  }
}