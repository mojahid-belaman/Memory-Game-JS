let myVar = document.querySelector('.splash-screen span');


myVar.addEventListener('click', function () {
    var myPrompt = prompt('What Is Your Name ?');

    if (myPrompt == null || myPrompt == "")
        document.querySelector('.name span').innerHTML = 'Unknown';
    else {    
        document.querySelector('.name span').innerHTML = myPrompt;
    }
    document.querySelector('.splash-screen').remove();
})



