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

function displayEstimate() {
    const listElement = document.getElementById("quote-items");
    const totalElement = document.getElementById("total-price");
    
    console.log("Checking for elements:", { listElement, totalElement });

    const quoteData = JSON.parse(localStorage.getItem("auto-quote")) || [];
    console.log("Current Data in LocalStorage:", quoteData);

    if (!listElement || !totalElement) {
        console.error("Could not find the summary elements in the DOM!");
        return;
    }

    // ... (rest of your display code)
}

window.addEventListener("quoteUpdated", () => {
    console.log("SUCCESS: 'quoteUpdated' event received!");
    displayEstimate();
});

// At the very top of main.js, outside of any other functions
window.addEventListener("DOMContentLoaded", () => {
    displayEstimate(); // Run once on load
});

window.addEventListener("quoteUpdated", displayEstimate);

// Put this in your main.js
const updateUI = () => {
    const listElement = document.getElementById("quote-items");
    const totalElement = document.getElementById("total-price");

    // Check if elements exist
    if (!listElement || !totalElement) return;

    const quoteData = JSON.parse(localStorage.getItem("auto-quote")) || [];
    
    // Update List
    listElement.innerHTML = quoteData.map(item => `
        <div style="display: flex; justify-content: space-between; padding: 5px 0; color: white;">
            <span>${item.service}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join("");

    // Update Total
    const total = quoteData.reduce((sum, item) => sum + (item.price || 0), 0);
    totalElement.textContent = `$${total.toFixed(2)}`;
};

// Listen for the event from ServiceList.mjs
window.addEventListener("quoteUpdated", updateUI);

// Run it once immediately to show existing items
if (document.readyState === "complete") {
    updateUI();
} else {
    window.addEventListener("load", updateUI);
}

