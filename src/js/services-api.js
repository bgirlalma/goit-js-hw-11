import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38170214-8c71bc4e5e037f06482b3b999';
let searchEl = '';
let currentPage = 1;
let total = null;
let firstSearch = true;

export function updateFirstSearch(state) {
  firstSearch = state;
}
export function pagesNext() {
  currentPage = currentPage + 1;
  return getImages();
}
export function imageReset() {
  currentPage = 1;
}
export async function getImages() {
  let options = {
    key: API_KEY,
    q: searchEl,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 40,
  };
  try {
    let response = await axios.get(BASE_URL, { params: options });
    console.log(response);
    total = response.data.total;
    if (firstSearch) {
      updateFirstSearch(false);
    }
    let imageData = response.data.hits.map(hit => {
      return {
        webformatURL: hit.webformatURL.replace('_640', '_360'),
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
        likes: hit.likes,
      };
    });
    return imageData;
  } catch (error) {
    Notify.failure('Опааа, вийшла помилка: ' + error.message);
  }
}
export function setSearchQuery(newQuery) {
  searchEl = newQuery;
}