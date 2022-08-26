import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import LoadMoreBtn from './js/load-more';


import NewsApiService from './js/fetch-photos';


const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('.search-form input'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});


const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', (onSearch));
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();
    newsApiService.query = refs.input.value.trim();
    console.log(newsApiService.query);

  if (newsApiService.query === '') {
        clearArticlesContainer()
        return
    };    

  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();   
}

function fetchArticles() {
  loadMoreBtn.disable();
    newsApiService.fetchArticles().then(result => {
      appendArticlesMarkup(result);
      loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(result) {
     if (result.length < 1) {
           Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.'); 
   } else if(result.length < 40){
            const markup = result
    .map((item) => {
      return `<a href="${item.largeImageURL}"><div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes<br>${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views<br>${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments<br>${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads<br>${item.downloads}</b>
    </p>
  </div>
</div></a>`;
    })
    .join("");
    
       refs.gallery.insertAdjacentHTML('beforeend', markup);
   let lightbox = new SimpleLightbox('.gallery a');
       Notiflix.Notify.info("We're sorry, but you've reached the end of search results."); 
     } else {
            const markup = result
    .map((item) => {
      return `<a href="${item.largeImageURL}"><div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes<br>${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views<br>${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments<br>${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads<br>${item.downloads}</b>
    </p>
  </div>
</div></a>`;
    })
    .join("");
    
       refs.gallery.insertAdjacentHTML('beforeend', markup);
       let lightbox = new SimpleLightbox('.gallery a');
         loadMoreBtn.show();
     }     
    console.log(result);
}


function clearArticlesContainer() {
  refs.gallery.innerHTML = '';
  loadMoreBtn.hide();
}
