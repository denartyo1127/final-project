export default class QuoteList {
  constructor(key, listElement, totalElement) {
    this.key = key; // The localStorage key (e.g., 'auto-quote')
    this.listElement = listElement;
    this.totalElement = totalElement;
  }

  init() {
    this.updateUI();
    window.addEventListener("quoteUpdated", () => this.updateUI());
    const list = JSON.parse(localStorage.getItem(this.key)) || [];
    this.renderQuoteList(list);
    this.calculateTotal(list);
  }

  renderQuoteList(list) {
    if (list.length === 0) {
      this.listElement.innerHTML = "<p>Your estimate is empty. Add some services!</p>";
      return;
    }

    const htmlStrings = list.map(item => `
      <div class="quote-item">
        <span>${item.service}</span>
        <span class="item-price">$${item.price.toFixed(2)}</span>
        <button class="remove-item" data-id="${item.id}">❌</button>
      </div>
    `);
    
    this.listElement.innerHTML = htmlStrings.join("");

    // Add listeners to remove items if the user changes their mind
    this.listElement.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", (e) => this.removeItem(e.target.dataset.id));
    });
  }

  calculateTotal(list) {
    const total = list.reduce((sum, item) => sum + item.price, 0);
    this.totalElement.textContent = `$${total.toFixed(2)}`;
  }

  removeItem(id) {
    let list = JSON.parse(localStorage.getItem(this.key));
    // Remove only the first instance found with that ID
    const index = list.findIndex(item => item.id === id);
    if (index > -1) {
        list.splice(index, 1);
    }
    localStorage.setItem(this.key, JSON.stringify(list));
    this.init(); // Re-render everything
  }
}