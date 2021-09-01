const key = '26a4652a73ef47efbcd56d7fbec40cf8';
//26a4652a73ef47efbcd56d7fbec40cf8
const source = 'bbc-news';
const spinner = document.getElementById('spinner');
const searchResult = document.getElementById('search-result');

const loadTopHeadlines = () => {
    spinner.classList.remove('d-none');
    fetch(`https://gnews.io/api/v4/top-headlines?token=b80e379d2347c52bba31e5f4244eef72&lang=en`)
        .then(response => response.json())
        .then(data => displayTopHeadlines(data.articles))
}
loadTopHeadlines();

const displayTopHeadlines = articles => {
    const topHeadlines = document.getElementById('top-headlines');
    topHeadlines.innerHTML = `<h2 class="mb-3">Top Headlines</h2>`;
    for (const article of articles) {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'shadow');
        card.innerHTML = `
        <div class="card">
            <img src="${article.image}" class="card-img-top" alt="...">
            <div class="card-body">
             <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <p class="text-danger"><span class="fw-bold">Source:</span> ${article.source.name}</p>
             <a target="_blank" href="${article.url}" class="btn btn-outline-primary">Read more</a>
            </div>
        </div>
        `;
        topHeadlines.appendChild(card);
    }
    spinner.classList.add('d-none');
}
const loadSearchResult = () => {
    const searchFiled = document.getElementById('search-field');
    const searchVal = searchFiled.value;
    // clear data
    searchFiled.value = '';
    searchResult.textContent = '';
    if (searchVal == '') {
        searchResult.innerHTML = `<h2 class="result mb-3">please search a news title!</h2>`;
    } else {
        spinner.classList.remove('d-none');
        fetch(`https://gnews.io/api/v4/search?q=${searchVal}&token=b80e379d2347c52bba31e5f4244eef72&lang=en`)
            .then(response => response.json())
            .then(data => displaySearchResult(data.articles))
    }
}

const displaySearchResult = articles => {
    searchResult.textContent = '';
    if (articles.length === 0) {
        spinner.classList.add('d-none');
        searchResult.innerHTML = `<h2 class="result mb-3">No Result Found</h2>`;
    } else {
        searchResult.classList.add('d-none');
        searchResult.innerHTML = `<h2 class="result mb-3">Your Search Result</h2>`;
        for (const article of articles) {
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3', 'shadow');
            card.innerHTML = `
        <div class="card">
            <img src="${article.image}" class="card-img-top" alt="">
            <div class="card-body">
             <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <p class="text-danger"><span class="fw-bold">Source:</span> ${article.source.name}</p>
             <a target="_blank" href="${article.url}" class="btn btn-outline-primary">Read more</a>
            </div>
        </div>
        `;
            searchResult.appendChild(card);
        }
        spinner.classList.add('d-none');
        searchResult.classList.remove('d-none');
    }
}