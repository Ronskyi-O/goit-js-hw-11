import {fetchImages} from './js/api-service'

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// const axios = require('axios').default;

let getEl = selector => document.querySelector(selector)
let searchImageName = ''

getEl('#search-form').addEventListener('submit', onImputSabmit);
getEl('.load-more').addEventListener('click', loadMore)
function onImputSabmit(event) {
    event.preventDefault();
    searchImageName = event.currentTarget.elements.searchQuery.value;

   fetchImages(searchImageName)
}


function loadMore(event) {
    fetchImages(searchImageName)
}

