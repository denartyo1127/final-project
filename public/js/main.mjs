import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./externalServices.mjs";
import ServiceList from "./ServiceList.mjs";
import fetchDailyQuote from "./QuoteAPI.mjs";
import QuoteList from "./QuoteList.mjs";

// Initialize UI
loadHeaderFooter(".");
fetchDailyQuote();

// Initialize Services
const dataSource = new ExternalServices();
const listElement = document.querySelector("#service-list");
const myList = new ServiceList(dataSource, listElement);

myList.init();

const quoteElement = document.querySelector("#quote-items");
const totalElement = document.querySelector("#total-price");
const myQuote = new QuoteList("auto-quote", quoteElement, totalElement);

myQuote.init();

// Function to handle filtering
document.querySelector(".filter-controls").addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
        const category = e.target.dataset.category;
        const allServices = await dataSource.getServices();
        
        const filtered = category === "all" 
            ? allServices 
            : allServices.filter(s => s.category === category);
            
        myList.renderList(filtered);
    }
});

// Function to refresh the UI in the Estimate Summary box
function updateEstimateSummary() {
    const summaryElement = document.querySelector(".estimate-summary");
    const quoteData = JSON.parse(localStorage.getItem("auto-quote")) || [];
    
    // Calculate total
    const total = quoteData.reduce((sum, item) => sum + item.price, 0);

    // Build the list of services
    const itemsHtml = quoteData.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span>${item.service}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join("");

    // Update the HTML inside the box
    summaryElement.innerHTML = `
        <h3 style="border-bottom: 1px solid white; padding-bottom: 10px;">Estimate Summary</h3>
        <div class="summary-list" style="margin: 15px 0;">
            ${itemsHtml || "<p>No repairs added yet.</p>"}
        </div>
        <hr>
        <p><strong>TOTAL: $${total.toFixed(2)}</strong></p>
    `;
}

// 1. Run it immediately when page loads so it shows existing data
updateEstimateSummary();

// 2. Listen for the event your ServiceList.mjs dispatches
window.addEventListener("quoteUpdated", updateEstimateSummary);