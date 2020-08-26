var myApp = myApp || {};

myApp.EventHandlers = {
    // CLICK EVENTS
    changeModeDark: function () {
        document.body.classList.toggle("dark");
    },
    cleanSearch:function() {
        document.querySelector("#search").value = "";
    },
    searchGifoSubmitClick: function () {
        let keyword = document.querySelector("#search").value;
        //Funcion gifo search
        console.log('Yendo a buscar gifo: ' + keyword);
    },

    // KEYPRESS EVENTS
    searchGifoSubmitKeypress: function () {
        document
            .querySelector("#search").addEventListener("keypress", function (e) {
                var keycode = e.code;
                if (keycode == "Enter") {
                    let keyword = document.querySelector("#search").value;
                    //Funcion gifo search
                    console.log('Yendo a buscar gifo: ' + keyword);
                } else {
                    //Funcion gifo sugerencias
                    console.log('Sugerencias...');
                }
            });
    },
};

myApp.EventHandlers.searchGifoSubmitKeypress();

// GIPHY
/*
document.querySelector("#btn-search").addEventListener("click", function () {
    var keyword = document.querySelector("#search").value;
    Giphy.getUrlAsync(keyword, function (videoURL) {
        document.querySelector("#video-search").src = videoURL;
    });
});

document
    .querySelector("#btn-search-noc")
    .addEventListener("click", function () {
        var keyword = document.querySelector("#search").value;
        Giphy.getUrlAsync(keyword, function (videoURL) {
            document.querySelector("#video-search").src = videoURL;
        });
    });

class Giphy {
    constructor(keyword) {
        this.keyword = keyword;
        this.endpoint = "http://api.giphy.com/v1/gifs";
        this.api_key = "2256WmPycPBqyzJaDx6Gzx0IoZspB7Ml";
    }

    getGifUrl(callback) {
        var xhr = new XMLHttpRequest();

        xhr.open(
            "GET",
            this.endpoint +
            "/translate?api_key=" +
            this.api_key +
            "&limit:12&s=" +
            this.keyword
        );
        xhr.responseType = "json";
        xhr.onload = function () {
            callback(this.response.data.images.original.mp4);
        };
        xhr.send();
    }
    // Factory Static Method (This function is going to create an Object of this class=Giphy)
    // 1st This factory is going to return the url gif video
    // 2nd is oging to be execute in Async mode
    // The function calback is going to be executed after the search of the gif video in giphy
    static getUrlAsync(keyword, callback) {
        return new Giphy(keyword).getGifUrl(callback);
    }
}
*/