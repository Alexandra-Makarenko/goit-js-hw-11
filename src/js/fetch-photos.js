const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29482519-7d7042a408157712b5334bdf2'
// const FILTER = 'dogs'

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
     this.page = 1;
  }


  async fetchArticles() {
  try {
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
    const result = response.data.hits;
    console.log(response.data.totalHits)
    this.incrementPage();
    return result;
  } catch (error) {
    console.log(error)
   }
}

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}