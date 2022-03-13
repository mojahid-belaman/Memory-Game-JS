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

let duration = 1000;

let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());

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
    
    blockEle.classList.add('isflipped');

    let flippedAll = blocks.filter(flipBlock => flipBlock.classList.contains('isflipped'));

    if (flippedAll.length == 2)
    {
        stopClick();

        isMatch(flippedAll[0], flippedAll[1]);
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

        document.getElementById('success').play();
    }
    else {
        numTry.innerHTML = parseInt(numTry.textContent) + 1;

        setTimeout(() => {
            
            secondBlock.classList.remove('isflipped');
            firstBlock.classList.remove('isflipped');
        }, duration);

        document.getElementById('failed').play();
    }
}