const axios = require('axios').default;

export async function fetchImages(searchImageName, page) {
    const url = `https://pixabay.com/api/?key=31359912-5b88546d239f41508b7e3830d&q=${searchImageName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    try {
        const response = await axios.get(url);
        const dataResponse = response.data.hits;
        return dataResponse;
    } catch(error) {
        console.log(error);
    }

}  