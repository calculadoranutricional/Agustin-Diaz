// netlify/functions/news.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    // lee query params que envía el frontend
    const params = event.queryStringParameters || {};
    const q = params.q;
    const country = params.country || 'us';
    const category = params.category || 'business';
    const pageSize = params.pageSize || '30';
    const apiKey = process.env.NEWSAPI_KEY || process.env.REACT_APP_NEWSAPI_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing API key. Set NEWSAPI_KEY in Netlify environment variables.' })
      };
    }
    
    const base = 'https://newsapi.org/v2/top-headlines';
    const url = new URL(base);
    url.searchParams.set('apiKey', apiKey);
    if (q) url.searchParams.set('q', q);
    if (country) url.searchParams.set('country', country);
    if (category) url.searchParams.set('category', category);
    if (pageSize) url.searchParams.set('pageSize', pageSize);
    
    const res = await fetch(url.toString());
    const data = await res.json();
    
    // opcional: filtrar y normalizar aquí si quieres
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) })
    };
  }
};