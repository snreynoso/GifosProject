var myApp = myApp || {};
var gifoSearchArray = [];
var numGifSearch = 24;
var numGifSuggest = 4;

let favoritesIdArray = [];

let favorites = localStorage.getItem('favorites');

if (favorites != null) {
    favoritesIdArray = JSON.parse(favorites);
    console.log(favoritesIdArray);
}

const GIPHY_KEY = '2256WmPycPBqyzJaDx6Gzx0IoZspB7Ml';

// SEARCH FUNCTIONS
async function gifoSearch(keyword) {
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
                        <div id="${gifArray[i].id}" class="icon-like" onclick="myApp.EventHandlers.addRemoveFavorite(this.id)"></div>
                        <div class="icon-download"></div>
                        <div class="icon-max"></div>
                    </div>
                </div>
            </div>`;

        if (favoritesIdArray.indexOf(gifArray[i].id) != -1) {
            let icon = document.getElementById(gifArray[i].id);
            icon.classList.replace('icon-like', 'icon-like__active');
        }
    }

    //favoritesIdArray.forEach(element => {
    //    let icon = document.getElementById(element);
    //    icon.classList.replace('icon-like', 'icon-like__active');
    //});
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

    displaySearchGrid(gifoSearchArray, 0, numGifSearch / 2); // Show the rest of gifs (from #1 to #12)

    gifosElement.innerHTML +=
        `<div>
            <p id="see-more" onclick="myApp.EventHandlers.seeMore()" class="sec-search-display__see-more">VER MAS</p>
        </div>`;
}

// TRENDING FUNCTIONS
async function gifoTrending() {
    let url = `http://api.giphy.com/v1/gifs/trending?&api_key=${GIPHY_KEY}&limit=3`;
    let response = await fetch(url);
    let gifsPromise = await response.json();
    return gifsPromise;
}

function displayTrending(gifsPromise) {
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
                                <div id="${element.id}" class="icon-like" onclick="myApp.EventHandlers.addRemoveFavorite(this.id)"></div>
                                <div class="icon-download"></div>
                                <div class="icon-max"></div>
                            </div>
                        </div>
                    </div>`;

        if (favoritesIdArray.indexOf(element.id) != -1) {
            let icon = document.getElementById(element.id);
            icon.classList.replace('icon-like', 'icon-like__active');
        }
    });

    let parent = document.querySelector('#arrow-left');
    parent.after(gifHTML);
    cont = 0;

    //console.log(favoritesIdArray);

    //favoritesIdArray.forEach(element => {
    //    let icon = document.getElementById(element);
    //    icon.classList.replace('icon-like', 'icon-like__active');
    //});
}

async function gifoSuggest(keycode) {
    let url = `http://api.giphy.com/v1/gifs/search/tags?&api_key=${GIPHY_KEY}&q=${keycode}&limit=${numGifSuggest}`;
    //let url = `http://api.giphy.com/v1/tags/related/${keycode}?&api_key=${GIPHY_KEY}&limit=4`;
    let response = await fetch(url);
    let suggestedWord = await response.json();
    return suggestedWord;
}

function autocomplete() { // From w3school example adapted to my web page
    let inp = document.querySelector('#myInput');
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        let arr = [];

        gifoSuggest(val)
            .then(suggestedWords => {

                for (let i = 0; i < suggestedWords.data.length; i++) {
                    arr[i] = suggestedWords.data[i].name;
                }

                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;

                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");

                /*append the DIV element as a child of the autocomplete container:*/
                //this.parentNode.appendChild(a);
                document.querySelector('#append-list').appendChild(a);

                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function (e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }

            let keyword = document.querySelector("#myInput").value;
            gifoSearch(keyword)
                .then(gifsPromise => displaySearch(gifsPromise, keyword))
                .catch(err => console.log('Error gifs search promise: ' + err));
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

// MAIN APP FUNCTION
myApp.EventHandlers = {
    // CLICK EVENTS
    changeModeDark: function () {
        document.body.classList.toggle("dark");
    },
    cleanSearch: function () {
        document.querySelector("#myInput").value = "";
    },
    searchGifoSubmitClick: function () {
        let keyword = document.querySelector('#myInput').value;
        gifoSearch(keyword, GIPHY_KEY)
            .then(gifsPromise => displaySearch(gifsPromise, keyword))
            .catch(err => console.log('Error gifs search promise: ' + err));
    },
    seeMore: function () {
        displaySearchGrid(gifoSearchArray, numGifSearch / 2, numGifSearch); // Show the rest of gifs (from #13 to #24)
        document.querySelector('#see-more').remove();
    },
    addRemoveFavorite: function (elementId) {
        let icon = document.getElementById(elementId);
        let indexId = favoritesIdArray.indexOf(elementId);

        if (indexId != -1) {
            favoritesIdArray.splice(indexId, 1);
            localStorage.setItem('favorites', JSON.stringify(favoritesIdArray));
            icon.classList.replace('icon-like__active', 'icon-like');
        } else {
            favoritesIdArray.push(elementId);
            localStorage.setItem('favorites', JSON.stringify(favoritesIdArray));
            icon.classList.replace('icon-like', 'icon-like__active');
        }
    }
};

//myApp.EventHandlers.searchGifoSubmitKeypress();

myApp.EventHandlers.cleanSearch();

autocomplete();

gifoTrending()
    .then(gifsPromise => displayTrending(gifsPromise))
    .catch(err => console.log('Error gifs trending promise: ' + err));


