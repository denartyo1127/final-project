export default async function fetchDailyQuote() {
  const quoteElement = document.querySelector("#daily-quote");
  
  try {
    //proxy to avoid CORS issues with ZenQuotes
    const response = await fetch("https://corsproxy.io/?https://zenquotes.io/api/random");
    const data = await response.json();
    
    // ZenQuotes returns an array: [{ q: "Quote", a: "Author", h: "..." }]
    const quote = data[0];

    quoteElement.innerHTML = `
      <blockquote class="quote-text">
        "${quote.q}"
        <cite>— ${quote.a}</cite>
      </blockquote>
    `;
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteElement.innerHTML = `<p>"The best way to predict the future is to create it." — Manual Backup</p>`;
  }
}