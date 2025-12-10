export async function handler(event, context) {
  const API_KEY = process.env.NEWS_API_KEY;
  
  const params = event.queryStringParameters || {};
  const q = params.q || "";
  const pageSize = params.pageSize || 20;
  
  // Categorías válidas de NewsAPI
  const categorias = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"
  ];
  
  let url = "";
  
  // Si q coincide con una categoría real → usar top-headlines
  if (categorias.includes(q)) {
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${q}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  }
  // Si NO coincide → usar everything
  else {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=${pageSize}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
    
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: e.message })
    };
  }
}