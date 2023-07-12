import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  pagesNext,
  imageReset,
  getImages,
  setSearchQuery,
} from './js/services-api';
import { markup } from './js/markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

let formElement = document.querySelector('#search-form');
let galleryElement = document.querySelector('.gallery');
let buttonElement = document.querySelector('.load-more');

buttonElement.style.display = 'none';

formElement.addEventListener('submit', function (e) {
  e.preventDefault();

  let searchQuery = e.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notify.warning('Input field is empty or contains only spaces');
    return;
  }
  setSearchQuery(searchQuery);
  imageReset();
  buttonElement.hidden = true;
  galleryElement.innerHTML = '';

  getImages().then(function ({hits, totalHits}) {
    if (hits.length === 0) {
      Notify.failure('Опааа, вийшла помилка!!');
      buttonElement.style.display = "none";
      return;
    }
    galleryElement.insertAdjacentHTML('beforeend', markup(hits));
    buttonElement.hidden = false;
    buttonElement.style.display = 'block';
  });

buttonElement.addEventListener('click', function () {
  pagesNext()
    if (!hits || dhits.length === '') {
      Report.info("We're sorry, but you've reached the end of search results.");
      buttonElement.hidden = true;
      return;
    }

    galleryElement.insertAdjacentHTML('beforeend', markup(hits));
    buttonElement.hidden = false;
    buttonElement.style.display = 'block';
  });

  new SimpleLightbox('.gallery a', {
    captionDelay: 200,
    captionsData: 'alt',
  });
  });

