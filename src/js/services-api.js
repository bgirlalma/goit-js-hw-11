import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38170214-8c71bc4e5e037f06482b3b999';
let searchQuery = '';
let currentPage = 1;

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
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 40,
  };
  try {
    let {data} = await axios.get(BASE_URL, { params: options });
    return data;
  } catch (error) {
    Notify.failure(error.message);
  }
}
export function setSearchQuery(newQuery) {
  searchQuery = newQuery;
}