var giphy_apikey = "dc6zaTOxFJmzC";
var tenor_apikey = "47UF06P156TA";




/******* Button Click Event *******/
document.querySelector(".js-go").addEventListener('click', function () {
    var userInput = getUserInput();
    searchGiphy(userInput);
});

/******* Button Press Enter Event *******/
document.querySelector('.js-userinput').addEventListener('keyup', function (e) {
    if (e.which === 13) {
        var userInput = getUserInput();
        searchGiphy(userInput);
    }
});



/******* Taking Input From the text input box *******/
function getUserInput() {
    var inputValue = document.querySelector('.js-userinput').value;
    return inputValue;
}



/********** Giphy *********/
function searchGiphy(searchQuery) {
    // console.log(searchQuery);
    var url = "https://api.giphy.com/v1/gifs/search?api_key=" + giphy_apikey + "&q=" + searchQuery;


    // AJAX Request
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET', url);
    GiphyAJAXCall.send();

    GiphyAJAXCall.addEventListener('load', function (data) {
        // console.log(data);
        var actualData = data.target.response;
        pushToDOM_giphy(actualData);
    });
}


function pushToDOM_giphy(actualData) {
    var arr = JSON.parse(actualData).data;
    var container = document.querySelector('.js-container');
    var r = 0;
    arr.forEach(element => {
        container.innerHTML = "";
        var src = element.images.fixed_height.url;
        setTimeout(function () {
            container.innerHTML = "<img src='" + src + "' class='container-image' />";
        }, 3000 * r);
        r++;
    });
}