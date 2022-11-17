import {fetchImages} from './js/api-service'

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

let getEl = selector => document.querySelector(selector)
let searchImageName = ''
let pageCounter = 1

getEl('#search-form').addEventListener('submit', onImputSabmit);
getEl('.load-more').addEventListener('click', loadMore)


function onImputSabmit(event) {
    event.preventDefault();
    searchImageName = event.currentTarget.elements.searchQuery.value;

    resetPagecounter()
    fetchImages(searchImageName, pageCounter).then(dataResponse => console.log(dataResponse))
    incrementPageCounter()
}

function loadMore(event) {
    fetchImages(searchImageName, pageCounter).then(dataResponse => console.log(dataResponse))
     incrementPageCounter()
}

function incrementPageCounter() {
    pageCounter++;
}

function resetPagecounter() {
pageCounter = 1
}


function createMarkup(dataResponse) {
    const markup = dataResponse.map(image => `
    <div class="photo-card">
        <img src="" alt="" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
            </p>
            <p class="info-item">
                <b>Views</b>
            </p>
            <p class="info-item">
                <b>Comments</b>
            </p>
            <p class="info-item">
                <b>Downloads</b>
            </p>
        </div>
    </div>
        `).join('')
    getEl('.gallery').insertAdjacentHTML('beforeend', markup)
}