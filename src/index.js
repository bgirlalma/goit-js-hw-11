import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { updateFirstSearch, pagesNext, imageReset, getImages, setSearchQuery } from './js/services-api';
import {markup} from './js/markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

let formElement = document.querySelector('#search-form');
let gallaryElement = document.querySelector('.gallery');
let buttonElement = document.querySelector('.load-more');

buttonElement.style.display = 'none';

formElement.addEventListener('submit', function(e){
    e.preventDefault();

    let searchEl = e.target.searchEl.value.trim();
    if (searchEl === '') {
        Notify.warning('Input field is empty or contains only spaces');
        return;
    }
})
