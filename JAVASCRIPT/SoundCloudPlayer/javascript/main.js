

/******** SoundCLoud_API *******/
var SoundCloudAPI = {};

SoundCloudAPI.init = function () {
    SC.initialize({
        client_id: 'gm55QhEUd3ZaSUB6eVrf3vxNKtJu59Mn'
    });
}


// find all sounds of buskers licensed under 'creative commons share alike'
SoundCloudAPI.getTrack = function (query) {
    SC.get('/tracks', {
        q: query
    }).then(function (tracks) {
        // console.log(tracks);
        tracks.forEach(track => {

            var title = track.title;
            var trackPNG = track.artwork_url || 'https://loremflickr.com/320/240';
            var trackURL = track.permalink_url;

            SoundCloudAPI.renderTracks(title, trackPNG, trackURL);
        });
    });
}


SoundCloudAPI.renderTracks = function (title, trackPNG, trackURL) {
    //card
    var card = document.createElement('div');
    card.classList.add('card');
    var searchResult = document.querySelector('.js-search-results'); //////////
    searchResult.appendChild(card); ///////////////


    //card -> imgdiv
    var imgDiv = document.createElement('div');
    imgDiv.classList.add('image');
    card.appendChild(imgDiv); /////////////////////
    imgDiv.innerHTML = '<img class="image_img" src="' + trackPNG + '">';

    //card -> contentdiv
    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    card.appendChild(contentDiv); //////////

    //card -> contentdiv -> headerdiv
    var header = document.createElement('div');
    header.classList.add('header');
    contentDiv.appendChild(header); /////////////////
    header.innerHTML = '<a href="' + trackURL + '" target="_blank">' + title + '</a>';

    //card -> buttondiv
    var buttonDiv = document.createElement('div');
    buttonDiv.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
    card.appendChild(buttonDiv); //////////////
    buttonDiv.innerHTML = '<i class="add icon"></i>';
    buttonDiv.innerHTML += '<span>Add to playlist</span>';

    buttonDiv.addEventListener('click', function () {
        SoundCloudAPI.getEmbed(trackURL);
    });



    // contentDiv.appendChild(header);


    // card.appendChild(imgDiv);
    // card.appendChild(contentDiv);
    // card.appendChild(buttonDiv);


    // var searchResult = document.querySelector('.js-search-results');
    // searchResult.appendChild(card);
}

// Add to playlist feature
SoundCloudAPI.getEmbed = function (trackURL) {
    SC.oEmbed(trackURL, { auto_play: true, maxheight: 200 }).then(function (oEmbed) {
        // console.log(oEmbed.html);
        var sideBar = document.querySelector('.js-playlist');

        var box = document.createElement('div');
        box.innerHTML = oEmbed.html;
        sideBar.insertBefore(box, sideBar.firstChild);
        localStorage.setItem("key", sideBar.innerHTML);
    });
}



SoundCloudAPI.init();

/*******  Button Click Event  *******/
document.querySelector(".js-submit").addEventListener('click', function () {
    var userInput = getUserInput();
    document.querySelector('.js-search-results').innerHTML = "";
    SoundCloudAPI.getTrack(userInput);
});

/*******  Button Press Enter Event  *******/
document.querySelector('.js-search').addEventListener('keyup', function (e) {
    if (e.which === 13) {
        var userInput = getUserInput();
        document.querySelector('.js-search-results').innerHTML = "";
        SoundCloudAPI.getTrack(userInput);
    }
});

document.querySelector(".js-reset-button").addEventListener('click', function () {
    sideBar.innerHTML = "";
    localStorage.clear();
});

/*******  Taking Input From the text input box  *******/
function getUserInput() {
    var inputValue = document.querySelector('.js-search').value;
    return inputValue;
}

var sideBar = document.querySelector(".col-left");
sideBar.innerHTML = localStorage.getItem("key");
