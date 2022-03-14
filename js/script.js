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

let blocksContainer = document.querySelector('.memory-container');

let duration = 500;

let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());

let audio;

let second = document.getElementById('second');

let minute = document.getElementById('minute');

let myInterv;

myBtn.addEventListener('click', () => {

    myInterv = setInterval(() => {

        countUp();
    
    }, 500)

})


function countUp() {
    
    second.innerHTML = second.innerHTML < 10 ? `0${parseInt(second.innerHTML) + 1}` : parseInt(second.innerHTML) + 1; 

    if (second.innerHTML == 60) {
        minute.innerHTML =` 0${parseInt(minute.innerHTML) + 1}`;
        second.innerHTML = '00';
    }
}

shuffle(orderRange);

blocks.forEach((element, index) => {
    element.style.order = orderRange[index]; 
    element.addEventListener('click', function() {
        flipBlock(element);
    });
});

function shuffle(array) {

    let curr = array.length,
        tmp,
        random;
    
    while (curr > 0) {
        
        random = Math.floor(Math.random() * curr);

        curr -= 1;

        tmp = array[curr];
        array[curr] = array[random];
        array[random] = tmp;
    }

    return array;

}

function flipBlock(blockEle) {
    
    let hasMatch;

    blockEle.classList.add('isflipped');

    let flippedAll = blocks.filter(flipBlock => flipBlock.classList.contains('isflipped'));

    if (flippedAll.length == 2)
    {
        stopClick();

        isMatch(flippedAll[0], flippedAll[1]);
    }
    if (minute.innerHTML == 01)
    {
        clearInterval(myInterv);

    }
    hasMatch  = blocks.filter(block => block.classList.contains('has-match'));

    if (hasMatch.length == blocks.length && second.innerHTML < 60) {
        clearInterval(myInterv);
    } 
}

function stopClick() {
    
    blocksContainer.classList.add('blocking');
    
    setTimeout(() => {
        blocksContainer.classList.remove('blocking');
    }, duration);
}

function isMatch(firstBlock, secondBlock)
{
    let numTry = document.querySelector('.wrong span');

    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        
        secondBlock.classList.remove('isflipped');
        firstBlock.classList.remove('isflipped');
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        audio = new Audio('../audio/success.mp3');
        audio.play();
        audio.currentSrc('');
        
    }
    else {
        numTry.innerHTML = parseInt(numTry.textContent) + 1;
        
        setTimeout(() => {
            
            secondBlock.classList.remove('isflipped');
            firstBlock.classList.remove('isflipped');
            
        }, duration);

        audio = new Audio('../audio/falied.mp3');
        audio.play();
        audio.currentSrc('');
    }
}