export async function handler(event, context) {
  const API_KEY = process.env.NEWS_API_KEY;
  
  const params = event.queryStringParameters || {};
  const category = params.q || "general";
  const pageSize = params.pageSize || 20;
  
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  
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
      body: JSON.stringify({
        error: "Server error",
        details: e.message
      })
    };
  }
}