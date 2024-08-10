const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from the array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if the author is empty and add 'Unknown'
    if (!quote.author) {
        quote.author = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check if the quote is too long and add a class for styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set the quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes/';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Post Quote to Twitter
function tweetQuote() {
    const twitterUrl = `https://x.com/intent/post?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
