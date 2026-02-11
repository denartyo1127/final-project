import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./externalServices.mjs";
import ServiceList from "./ServiceList.mjs";
import fetchDailyQuote from "./QuoteAPI.mjs";
import QuoteList from "./QuoteList.mjs";

// Initialize UI
loadHeaderFooter();
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
            
        myList.renderList(filtered); // Refresh the view with the filtered data
    }
});