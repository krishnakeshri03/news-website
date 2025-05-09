const apiKey = 'eed2215244754e40bed495b7db094a6c'; // 🔑 Replace this with your real API key
const newsContainer = document.getElementById('news-container');

// Load news by category and country
function loadNews(category = 'general', country = 'in') {
  if (!country) country = 'in'; // Ensure country always has a value

  // World news fix
  if (category === 'world') {
    country = 'us';
    category = 'general';
  }

  // Technology from India sometimes fails — fallback to US
  if (category === 'technology' && country === 'in') {
    country = 'us';
  }

  newsContainer.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading...</p></div>';

  fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => renderArticles(data.articles))
    .catch(error => {
      console.error('Error fetching news:', error);
      newsContainer.innerHTML = '<p>Could not load news. Please try again later.</p>';
    });
}

// Search by keyword
function searchNews() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  newsContainer.innerHTML = '<div class="loading"><div class="spinner"></div><p>Searching...</p></div>';

  fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => renderArticles(data.articles))
    .catch(error => {
      console.error('Search failed:', error);
      newsContainer.innerHTML = '<p>Search failed. Try again later.</p>';
    });
}

// Render articles
function renderArticles(articles) {
  newsContainer.innerHTML = '';
  // if (!articles || articles.length === 0) {
  //   newsContainer.innerHTML = '<p>No articles found.</p>';
  //   return;
  // }
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = '<p>No articles found for this category.</p>';
    return;
  }

  articles.forEach(article => {
    const div = document.createElement('div');
    div.className = 'article';

    div.innerHTML = `
      <h2>${article.title}</h2>
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x250'}" alt="Article Image">
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(div);
  });
}

// Load default category on page load
loadNews('general', 'in');
