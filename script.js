var myApp = myApp || {};
const GIPHY_KEY = '2256WmPycPBqyzJaDx6Gzx0IoZspB7Ml';

// FUNCTION SEARCH GIFO
function gifoSearch(keyword, GIPHY_KEY) {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=12`)
        .then(res => res.json())
        .then(gif => {

            let cont = 0;

            let gifosElement = document.querySelector('#gifos');

            gifosElement.innerHTML = ''; // Clean the div before to add new grid of gifos

            gifosElement.innerHTML +=
                `<div class="sec-search-display__line-top-result"></div>
                 <h2 class="sec-search-display__title-result">${keyword}</h2>
                 <div id="gifo-grid" class="sec-search-display__grid"></div>`;

            let gifoGridElement = document.querySelector('#gifo-grid');

            gif.data.forEach(element => {
                cont++;
                let gifoImg = new Image();
                gifoImg.src = element.images.original.url;
                let gifoUser = element.username;
                let gifoTitle = element.title;

                gifoGridElement.innerHTML +=
                    `<div id="gifo-search-${cont}" class="gifo-card">
                            <img class="gifo-card__gif card-search" src=${gifoImg.src} alt="gifo search ${cont}">
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

            gifosElement.innerHTML +=
                `<div>
                    <p class="sec-search-display__see-more">VER MAS</p>
                </div>`;
            cont = 0;
        });
}

function gifoTrending(GIPHY_KEY) {
    fetch(`http://api.giphy.com/v1/gifs/trending?&api_key=${GIPHY_KEY}&limit=3`)
        .then(res => res.json())
        .then(gif => {

            let cont = 0;
            var gifHTML = [];

            gif.data.forEach(element => {
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
            //let div = document.createElement('div');
            //div.setAttribute('id', 'gifos-trending');
            //divo.setAttribute('class', 'sec-search-display');
            parent.after(gifHTML);

            cont = 0;
        });

}

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
        gifoSearch(keyword, GIPHY_KEY);
    },

    // KEYPRESS EVENTS
    searchGifoSubmitKeypress: function () {
        document
            .querySelector("#search").addEventListener("keypress", function (e) {
                var keycode = e.code;
                if (keycode == "Enter") {
                    let keyword = document.querySelector("#search").value;
                    gifoSearch(keyword, GIPHY_KEY);
                    console.log('Yendo a buscar gifo: ' + keyword);
                } else {
                    //Funcion gifo sugerencias
                    console.log('Sugerencias...');
                }
            });
    },
};

myApp.EventHandlers.searchGifoSubmitKeypress();

gifoTrending(GIPHY_KEY);
