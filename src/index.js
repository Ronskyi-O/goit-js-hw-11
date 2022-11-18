import {fetchImages} from './js/api-service'

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let getEl = selector => document.querySelector(selector)
let searchImageName = ''
let pageCounter = 1

getEl('#search-form').addEventListener('submit', onImputSabmit);
getEl('.load-more').addEventListener('click', loadMore)


function onImputSabmit(event) {
    event.preventDefault();
    searchImageName = event.currentTarget.elements.searchQuery.value;

    if (searchImageName === '' || searchImageName === ' ') {
        return Notify.info('Please, enter something.')
    }

    resetPagecounter()
    clearMarkup()
    hideButtonLoadmore()
    fetchImages(searchImageName, pageCounter).then(dataResponse => {
        if (dataResponse.length === 0) {
            Notify.info('Sorry, there are no images matching your search query. Please try again.')
        } else {
            createMarkup(dataResponse);
            showButtonLoadmore()
            console.log(dataResponse);
        }
        }
        )
    incrementPageCounter()
    
    
}

function loadMore(event) {
    fetchImages(searchImageName, pageCounter).then(dataResponse => createMarkup(dataResponse))
     incrementPageCounter()
}

function incrementPageCounter() {
    pageCounter++;
}

function resetPagecounter() {
pageCounter = 1
}

function createMarkup(dataResponse) {
    const markup = dataResponse.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
    <div class="photo-card">
    <a href="${largeImageURL}" >
    <img class="image" src="${webformatURL}" alt="${tags}" title="" loading="lazy" />
    <div class="info">
            <p class="info-item">
                <b>Likes</b>
                ${likes}
            </p>
            <p class="info-item">
                <b>Views</b>
                ${views}
            </p>
            <p class="info-item">
                <b>Comments</b>
                ${comments}
            </p>
            <p class="info-item">
                <b>Downloads</b>
                ${downloads}
            </p>
        </div></a>
        
    </div>
        `}).join('');
    getEl('.gallery').insertAdjacentHTML('beforeend', markup)


}

function clearMarkup() {
    getEl('.gallery').innerHTML = '';
}

function showButtonLoadmore() {
    getEl('.load-more').classList.remove("is-hidden")
}

function hideButtonLoadmore(params) {
    getEl('.load-more').classList.add("is-hidden")
}