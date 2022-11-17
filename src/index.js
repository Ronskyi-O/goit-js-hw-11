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
    <ul class="gallery__list">
        <li class="gallery__item">
            <div class="gallery__image-thumb">
                <a href=""><img src=" " alt="" title="" class="image" /></a>
            </div>
            <ul class="gallery__info info">
                <li class="info__item">
                    <h2 class="info__name"></h2>
                    <p class="info__value"></p>
                </li>
                <li class="info__item">
                    <h2 class="info__name"></h2>
                    <p class="info__value"></p>
                </li>
                <li class="info__item">
                    <h2 class="info__name"></h2>
                    <p class="info__value"></p>
                </li>
                <li class="info__item">
                    <h2 class="info__name"></h2>
                    <p class="info__value"></p>
                </li>
            </ul>
        </li>
    </ul>
        `).join('')
    getEl('.gallery').insertAdjacentHTML('beforeend', markup)
}