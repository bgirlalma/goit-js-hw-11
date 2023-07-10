import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { updateFirstSearch, pagesNext, imageReset, getImages, setSearchQuery } from './js/services-api';
import {markup} from './js/markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

let formElement = document.querySelector('#search-form');
let galleryElement = document.querySelector('.gallery');
let buttonElement = document.querySelector('.load-more');

buttonElement.style.display = 'none';

formElement.addEventListener('submit', function(e){
    e.preventDefault();

    let searchEl = e.target.searchEl.value.trim();
    if (searchEl === '') {
        Notify.warning('Input field is empty or contains only spaces');
        return;
    }

    setSearchQuery(searchEl);
    imageReset();
    updateFirstSearch(true);
    buttonElement.hidden = true;
    galleryElement.innerHTML = '';

    getImages().then( function(data) {
        if(data.length === 0) {
            Notify.failure('Nothing found by Your request');
            buttonElement.style.display = 'none';
            return;
        }

    galleryElement.insertAdjacentHTML('beforeend', markup(data));
     new SimpleLightbox('.gallery a', {
      captionDelay: 200,
      captionsData: 'alt',
    });
    buttonElement.hidden = false;
    buttonElement.style.display = 'block';
});
    e.target.searchEl.value = '';
});

buttonElement.addEventListener('click', function(){
    pagesNext().then(function(data) {
        if(data.length === ''){
            Report.info("We're sorry, but you've reached the end of search results.");
            buttonElement.hidden = true;
            return;
        }
        galleryElement.insertAdjacentHTML('beforeend', markup(data));
        new SimpleLightbox('.gallery a', {
            captionDelay: 200,
            captionsData: 'alt',
        });
    });
});
