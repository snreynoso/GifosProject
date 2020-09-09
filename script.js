var myApp = myApp || {};
var gifoSearchArray = [];
var numGifSearch = 24;

const GIPHY_KEY = '2256WmPycPBqyzJaDx6Gzx0IoZspB7Ml';

// SEARCH FUNCTIONS
async function gifoSearch(keyword, GIPHY_KEY) {
    let url = `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=${numGifSearch}`;

    let response = await fetch(url);
    let gifsPromise = await response.json();

    return gifsPromise;
}

function displaySearchGrid(gifArray, init, finish) {
    let gifoGridElement = document.querySelector('#gifo-grid');

    for (let i = init; i < finish; i++) {
        let gifoImg = new Image();

        gifoImg.src = gifArray[i].images.original.url;
        let gifoUser = gifArray[i].username;
        let gifoTitle = gifArray[i].title;

        gifoGridElement.innerHTML +=
            `<div id="gifo-search-${i + 1}" class="gifo-card card-search">
                <img class="gifo-card__gif card-search" src=${gifoImg.src} alt="gifo search ${i + 1}">
                <div class="gifo-card__middle">
                    <h2 class="gifo-card__user"> ${gifoUser} </h2>
                    <h2 class="gifo-card__title"> ${gifoTitle} </h2>
                    <div class="gifo-card__icons-group">
                        <div class="icon-like"></div>
                        <div class="icon-download"></div>
                        <div class="icon-max"></div>
                    </div>
                </div>
            </div>`;
    }
}

function displaySearch(gifsPromise, keyword) {
    for (let i = 0; i < numGifSearch; i++) {
        gifoSearchArray[i] = gifsPromise.data[i];
    }

    let gifosElement = document.querySelector('#gifos');

    gifosElement.innerHTML = ''; // Clean the div before to add new grid of gifos

    gifosElement.innerHTML +=
        `<div class="sec-search-display__line-top-result"></div>
            <h2 class="sec-search-display__title-result">${keyword}</h2>
        <div id="gifo-grid" class="sec-search-display__grid"></div>`;

    displaySearchGrid(gifoSearchArray, 0, numGifSearch / 2);

    gifosElement.innerHTML +=
        `<div>
            <p id="see-more" onclick="myApp.EventHandlers.seeMore()" class="sec-search-display__see-more">VER MAS</p>
        </div>`;
    cont = 0;
}

// TRENDING FUNCTIONS
async function gifoTrending(GIPHY_KEY) {
     let url = `http://api.giphy.com/v1/gifs/trending?&api_key=${GIPHY_KEY}&limit=3`;

    let response = await fetch(url);
    let gifsPromise = await response.json();

    return gifsPromise;
}

function displayTrending(gifsPromise){
    let cont = 0;
    var gifHTML = [];

    gifsPromise.data.forEach(element => {
        cont++;

        let gifoImg = new Image();
        gifoImg.src = element.images.original.url;
        let gifoUser = element.username;
        let gifoTitle = element.title;

        let gifoTrending = document.querySelector(`#gifo-trendig-${cont}`);

        gifoTrending.innerHTML +=
            `<img class="gifo-card__gif card-trending" src=${gifoImg.src} alt="gifo trending ${cont}">
                        <div class="gifo-card__middle">
                            <h2 class="gifo-card__user"> ${gifoUser} </h2>
                            <h2 class="gifo-card__title"> ${gifoTitle} </h2>
                            <div class="gifo-card__icons-group">
                                <div class="icon-like"></div>
                                <div class="icon-download"></div>
                                <div class="icon-max"></div>
                            </div>
                        </div>
                    </div>`;
    });

    let parent = document.querySelector('#arrow-left');
    parent.after(gifHTML);
    cont = 0;
}

// MAIN APP FUNCTIONS
myApp.EventHandlers = {
    // CLICK EVENTS
    changeModeDark: function () {
        document.body.classList.toggle("dark");
    },
    cleanSearch: function () {
        document.querySelector("#search").value = "";
    },
    searchGifoSubmitClick: function () {
        let keyword = document.querySelector("#search").value;
        //gifoSearch(keyword, GIPHY_KEY);
        gifoSearch(keyword, GIPHY_KEY)
            .then(gifsPromise => displaySearch(gifsPromise, keyword))
            .catch(err => console.log('Error gifs search promise: ' + err));
    },
    seeMore: function () {
        displaySearchGrid(gifoSearchArray, numGifSearch / 2, numGifSearch);
        document.querySelector('#see-more').remove();
    },

    // KEYPRESS EVENTS
    searchGifoSubmitKeypress: function () {
        document
            .querySelector("#search").addEventListener("keypress", function (e) {
                var keycode = e.code;
                if (keycode == "Enter") {
                    let keyword = document.querySelector("#search").value;
                    //gifArrayGlobal = gifoSearch(keyword, GIPHY_KEY);
                    gifoSearch(keyword, GIPHY_KEY)
                        .then(gifsPromise => displaySearch(gifsPromise, keyword))
                        .catch(err => console.log('Error gifs search promise: ' + err));
                    //console.log('gifArrayGlobal: ' + gifArrayGlobal);
                } else {
                    //Funcion gifo sugerencias
                    console.log('Sugerencias...');
                }
            });
    },
};

myApp.EventHandlers.searchGifoSubmitKeypress();

gifoTrending(GIPHY_KEY)
    .then(gifsPromise => displayTrending(gifsPromise))
    .catch(err => console.log('Error gifs trending promise: ' + err));
