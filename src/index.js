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
let hits = []; // Объявление переменной hits

buttonElement.style.display = 'none';

formElement.addEventListener('submit', function (e) {
  e.preventDefault();

  let searchQuery = e.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notify.warning('Поле ввода пустое или содержит только пробелы');
    return;
  }
  setSearchQuery(searchQuery);
  imageReset();
  buttonElement.hidden = true;
  galleryElement.innerHTML = '';

  getImages().then(function ({hits: newHits, totalHits}) {
    hits = newHits; // Присваивание значений переменной hits
    if (hits.length === 0) {
      Notify.failure('Опааа, вийшла помилка!!');
      buttonElement.style.display = "none";
      return;
    }
    galleryElement.insertAdjacentHTML('beforeend', markup(hits));
    buttonElement.hidden = false;
    buttonElement.style.display = 'block';
  });
});

function initSimpleLightbox() {
  new SimpleLightbox('.gallery a', {
    captionDelay: 200,
    captionsData: 'alt',
  });
}

buttonElement.addEventListener('click', function () {
  pagesNext();
  if (!hits || hits.length === '') {
    Report.info('Извините, но вы достигли конца результатов поиска.');
    buttonElement.hidden = true;
    return;
  }

  galleryElement.insertAdjacentHTML('beforeend', markup(hits));
  buttonElement.hidden = false;
  buttonElement.style.display = 'block';

  initSimpleLightbox();

  // new SimpleLightbox('.gallery a', {
  //   captionDelay: 200,
  //   captionsData: 'alt',
  // });
});
