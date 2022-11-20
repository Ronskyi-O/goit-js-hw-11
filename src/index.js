import { fetchImages } from './js/api-service'


import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let getEl = selector => document.querySelector(selector)
let searchImageName = ''
let pageCounter = 1

getEl('#search-form').addEventListener('submit', onImputSabmit);
getEl('.load-more').addEventListener('click', loadMore)
// window.addEventListener('scroll', unlimitedScroll)



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
        const totalHits = dataResponse.data.totalHits;

        if (totalHits === 0) {
            Notify.info('Sorry, there are no images matching your search query. Please try again.')
        } else {
            createMarkup(dataResponse);
            showButtonLoadmore();

            if (totalHits < 40) {
                hideButtonLoadmore();
                Notify.info("We're sorry, but you've reached the end of search results.");
            };

            Notify.info(`Hooray! We found ${totalHits} images.`);
            openImage();
        }
    }
    )
    incrementPageCounter();
    

}

function loadMore(event) {
    fetchImages(searchImageName, pageCounter).then(dataResponse => {
            const totalHits = dataResponse.data.totalHits;

        createMarkup(dataResponse);
        incrementPageCounter()
        
            if (pageCounter >= totalHits / 40) {
                hideButtonLoadmore()
                const timerId = setTimeout(() => {
                    Notify.info("We're sorry, but you've reached the end of search results.");
                }, 2000)
        };

        openImage()
        })
    }

function incrementPageCounter() {
    pageCounter++;
}

function resetPagecounter() {
pageCounter = 1
}

function createMarkup(dataResponse) {
    const markup = dataResponse.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
         <a href="${largeImageURL}" >
    <div class="photo-card">
    <img class="image" src="${webformatURL}" title="${tags}" loading="lazy" />
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
        </div>
        
    </div></a>
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

function openImage() {
    const options = {
        aptionsData: "alt",
        captionDelay: "250",
    }
    var lightbox = new SimpleLightbox('.gallery a', options );
    lightbox.refresh();
}

// function unlimitedScroll() {
//     const { scrollHeight, scrollTop, clientHeight } = document.documentElement
        
//     if (scrollTop === scrollHeight - clientHeight) {
//         fetchImages(searchImageName, pageCounter).then(dataResponse => {
//             const totalHits = dataResponse.data.totalHits;

//             createMarkup(dataResponse);
//             incrementPageCounter()
        
//             if (pageCounter >= totalHits / 40) {
//                 hideButtonLoadmore()
//                 const timerId = setTimeout(() => {
//                     Notify.info("We're sorry, but you've reached the end of search results.");
//                 }, 2000)
//             };

//             openImage()
//         })
//     }
// }