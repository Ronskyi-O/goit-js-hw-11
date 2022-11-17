export function fetchImages(searchImageName) {
    const url = `https://pixabay.com/api/?key=31359912-5b88546d239f41508b7e3830d&q=${searchImageName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
    return fetch(url)
            .then(response => response.json())
            .then(console.log);
    }