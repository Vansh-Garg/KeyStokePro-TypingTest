let a = document.querySelectorAll('li.as');
let choice = document.querySelectorAll('.ch');
let choiceCont = document.getElementById('choice')

let space = document.getElementById('space');
let text = document.querySelectorAll('.text1');
let corr = document.querySelectorAll('.red');
let res = document.getElementById('result');
let elem = document.getElementById('timer');
let restart = document.getElementById('restart');
let i = 0;
let ele = 0;
let timerRunning = false;
let timerId;
let startTime = 0;
let timerCompleted = false;
let correctLetter = 0;
let totalLetter = 0;
let word = 0;
let timeLeft = 30;
let activeClass = 2;
let correctWord = timeLeft;
let cursCount = 0
let Smallparagraphs = "there was something special about this little creature donna couldnt quite pinpoint what it was but she knew with all her heart that it was true it wasnt a matter of if she was going to try and save it but a matter of how she was going to save it she went back to the car to get a blanket and when she returned the creature was gone what if dogs were racist would they care about fur color son only play with other tan dogs or maybe it would depend on breed honey only play with other german shepards never poodles better yet it could depend on occupation im a sled dog while youre only a running companion leave me alone maybe the neighborhood they live in could be the way they choose which dogs to associate with and which to shun size could be the determining factor see how tall that dog is they are probably dumb luckily dogs dont discriminate just watch at a dog park big black and white dogs wag their tails and play with tiny tan dogs a service dog chases after the same ball as the offduty police dog so if dogs dont discriminate then why do we"
text.forEach(element => {
    element.innerText = generateRandomString()
});

document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key === "Enter") {
        resetTest();
        return;
    }
    if (!timerRunning && isCorrectFirstChar(event.key)) {
        timerRunning = true;
        startTimer();
    }

    if (timerRunning && !timerCompleted) {
        if (event.key != " ") {
            totalLetter += 1;
        }
        let textContent = text[ele].innerText;
        let letter = textContent.charAt(i);

        a.forEach(element => {

            if (event.key.toLowerCase() == element.innerHTML || event.key == " ") {
                if (letter == event.key) {
                    choiceCont.style.visibility = "hidden"
                    corr[cursCount].classList.add("active1")
                    if (event.key != " ") {
                        correctLetter += 1;
                    }
                    if (event.key == " ") {
                        word += 1;
                    }
                    setTimeout(() => {
                        if (event.key != " ") {
                            element.classList.add("key");
                        } else {
                            space.classList.add('key');
                        }
                    }, 222);
                    setTimeout(() => {
                        element.classList.remove("key");
                    }, 444);
                } else if (letter == "" && event.key == " ") {
                    setTimeout(() => {
                        space.classList.add('key');
                    }, 222);
                    setTimeout(() => {
                        space.classList.remove("key");
                    }, 444);
                }
                else {
                    setTimeout(() => {
                        if (event.key != " ") {
                            element.classList.add("wrongkey");
                        } else {
                            space.classList.add('wrongkey');
                        }
                    }, 222);
                    setTimeout(() => {
                        element.classList.remove("wrongkey");
                    }, 444);
                }
            }
        });

        if (letter == " " && event.key == " ") {
            corr[ele].innerHTML += "&nbsp;";
        }
        if (letter == event.key) {
            corr[ele].innerText += letter;
            i = i + 1;
        }
        if (letter == "") {

            ele += 1;
            i = 0;
            corr[cursCount].classList.remove("active1")
            cursCount += 1
        }
    }
});

let getTime = () => {
    choice.forEach((ch, index) => {
        ch.addEventListener('click', () => {
            if (!timerRunning) {
                timeLeft = parseInt(choice[index].innerText);
                correctWord = timeLeft;
                updateActiveClass(index);
            }
        });
    });
};

function updateActiveClass(index) {
    choice[index].classList.toggle("active");
    choice[activeClass].classList.toggle("active");
    activeClass = index;
}


getTime();

function startTimer() {
    timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft === 0) {
            clearTimeout(timerId);
            timerCompleted = true;
            doSomething();
        } else {
            elem.innerHTML = timeLeft;
            timeLeft--;
        }
    }
}

function doSomething() {
    let accuracy = ((correctLetter / totalLetter) * 100).toFixed(2);
    word = word / 35;
    word = word === 0 ? 1 : word;
    let wpm = ((word * 60) / correctWord).toFixed(2);

    elem.classList.toggle("hidden");
    choiceCont.style.visibility = "visible"
    res.innerText = `WPM: ${wpm} | Accuracy: ${accuracy}%`;
    res.classList.toggle("hidden");
}
function resetTest() {
    corr.forEach(x => x.classList.remove("active1"));
    corr[0].classList.add('active1')
    clearTimeout(timerId);
    choiceCont.style.visibility = "visible"
    timerRunning = false;
    timerCompleted = false;
    correctLetter = 0;
    totalLetter = 0;
    word = 0;
    activeClass = 2;
    cursCount = 0
    timeLeft = 30;
    correctWord = timeLeft;
    elem.classList.remove("hidden");
    res.classList.add("hidden")
    i = 0;
    ele = 0;
    elem.innerHTML = "&nbsp;";
    res.innerText = "";
    text.forEach(t => t.innerHTML = t.innerHTML.replace(/<[^>]+>/g, ''));
    corr.forEach(c => c.innerHTML = "");
    choice.forEach(c => c.classList.remove("active"));

    choice[2].classList.add("active")
    space.classList.remove('key', 'wrongkey');
    text.forEach(element => {
        element.innerText = generateRandomString()
    });

}


restart.addEventListener('click', resetTest);

function isCorrectFirstChar(key) {
    let firstChar = text[0].innerText.charAt(0);
    return key.toLowerCase() === firstChar.toLowerCase();
}





function generateRandomString() {
    const words = Smallparagraphs.split(" ");

    let suitableStartingWords = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i].length <= 51) {
            suitableStartingWords.push(i);
        }
    }

    const randomStartingWordIndex = suitableStartingWords[Math.floor(Math.random() * suitableStartingWords.length)];
    const startingWord = words[randomStartingWordIndex];
    const remainingCharacters = 51 - startingWord.length;

    const generatedString = startingWord + Smallparagraphs.substr(randomStartingWordIndex + 1, remainingCharacters);

    return generatedString;
}
