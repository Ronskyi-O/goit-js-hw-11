!function(){function e(e){var t="https://pixabay.com/api/?key=31359912-5b88546d239f41508b7e3830d&q=".concat(e,"&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1");return fetch(t).then((function(e){return e.json()})).then(console.log)}var t=function(e){return document.querySelector(e)},n="";t("#search-form").addEventListener("submit",(function(t){t.preventDefault(),e(n=t.currentTarget.elements.searchQuery.value)})),t(".load-more").addEventListener("click",(function(t){e(n)}))}();
//# sourceMappingURL=index.b70084ea.js.map
