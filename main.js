const changeModeBtn = document.getElementById('mode');

if (localStorage.theme === "advanced") {
    document.documentElement.classList.add('advanced');
    changeModeBtn.textContent = "NORMAL MODE";
}

function toggleTheme() {
    const isAdvanced = document.documentElement.classList.contains("advanced");

    if (isAdvanced) {
        document.documentElement.classList.remove("advanced");
        localStorage.theme = "normal";
        changeModeBtn.textContent = "ADVANCED MODE";
    } else {
        document.documentElement.classList.add("advanced");
        localStorage.theme = "advanced";
        changeModeBtn.textContent = "NORMAL MODE";
    }
}

changeModeBtn.addEventListener('click', () => {
    toggleTheme();
});




const closedBtns = document.querySelectorAll('.closedBtn');
const rulesBtn = document.getElementById('rules');
const ruleOverlay = document.querySelector('.ruleOverlay')
const ruleOverlayChild = ruleOverlay.querySelector('.ruleOverlay>div');


closedBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        ruleOverlay.classList.add('hidden');
        ruleOverlayChild.classList.remove('opacity-100');
        ruleOverlayChild.classList.add('opacity-0');
    });
});

rulesBtn.addEventListener('click', () => {
    ruleOverlay.classList.remove('hidden');
    setTimeout(() => {
        ruleOverlayChild.classList.remove('opacity-0');
        ruleOverlayChild.classList.add('opacity-100');
    }, 10);
});



const pickPhase = document.getElementById('phase-pick');
const resultPhase = document.getElementById('phase-result');
const background = document.querySelector('.background');

const score = document.querySelector(".score");

const options = pickPhase.querySelectorAll('.optionShell');

let userChoice, computerChoice, resultCode, counter=0;


options.forEach((item) => {
    item.addEventListener('click', () => {

        const name = item.dataset.name;
        userChoice = name;

        pickPhase.classList.add('hidden');
        resultPhase.classList.remove('hidden');
        
        const innerHTML = `
            <div class="flex flex-wrap justify-evenly items-center lg:justify-center lg:space-x-15">

                <div class="relative z-10">
                    <div id="youPicked">
                        <div class="renderOutline ${name}Color animate-wiggle">
                            <div class="renderCore">
                            <img class="lg:h-20" src="images/icon-${name}.svg">
                            </div>
                        </div>
                        <p class="text-white customBarlow text-sm py-5 lg:text-lg">YOU PICKED</p>
                    </div>
                </div>

                <div class="relative z-10 basic-full sm:basic-auto sm:order-none order-last">
                    <div id="result" class=" opacity-0 transition-all duration-300 lg:hidden">
                        <div class="flex flex-col items-center space-y-3 my-15">
                            <p class="customBarlow text-4xl text-center text-white">
                                
                            </p>
                            <button id="playagainBtn" 
                                class="customBarlow text-midnight-950 bg-white 
                                rounded-sm px-13 py-2 cursor-pointer">
                                PLAY AGAIN
                            </button>
                        </div>
                    </div>
                </div>

                <div class="relative z-1">
                    <div id="housePicked">
                        <div class="renderOutlinehide animate-wiggle">
                            <div class="renderCorehide">
                            </div>
                        </div>
                        <p class="text-white customBarlow text-sm py-5 lg:text-lg">THE HOUSE PICKED</p>
                    </div>
                </div>

            </div>
        `;

        resultPhase.insertAdjacentHTML('afterbegin', innerHTML);

        randomPick();


        setTimeout(() => {
            const result = document.getElementById('result');
            result.classList.remove('lg:hidden');

            setTimeout(() => {
                result.classList.remove('opacity-0');
                result.classList.add('opacity-100');

                if (resultCode==-1) {
                    resultPhase.querySelector("#housePicked").children[0].classList.add("winEffect");
                    counter--;
                    score.children[1].textContent = counter;
                } else if (resultCode==1) {
                    resultPhase.querySelector("#youPicked").children[0].classList.add("winEffect")
                    counter++;
                    score.children[1].textContent = counter;
                }
            },50)
            playAgain()
        },1900)
    });
})

function randomPick() {
    let randNum;
    if (localStorage.theme === "advanced") {
        randNum = Math.floor(Math.random()*5);
    } else randNum = Math.floor(Math.random()*3);

    const name = options[randNum].dataset.name;
    computerChoice = name;

    resultCode = getResult(userChoice, computerChoice);
    if (resultCode==0) {
        document.getElementById('result').children[0].children[0].textContent = "DRAW!";
    } else if (resultCode==1) {
        document.getElementById('result').children[0].children[0].textContent = "YOU WIN";
    } else {
        document.getElementById('result').children[0].children[0].textContent = "YOU LOSE";
    }


    const housePicked = resultPhase.querySelector('#housePicked');
    setTimeout(() => {
        housePicked.children[0].classList.remove('renderOutlinehide', 'animate-wiggle');
        housePicked.children[0].children[0].classList.remove('renderCorehide');

        housePicked.children[0].classList.add(`${name}Color`, `renderOutline`);
        housePicked.children[0].children[0].classList.add(`${name}`, `renderCore`);
        housePicked.children[0].children[0].insertAdjacentHTML('beforeend', `<img class="lg:h-20" src="images/icon-${name}.svg">`)
        
    },1500);
}



function playAgain() {
    const playagainBtn = resultPhase.querySelector('#playagainBtn');

    playagainBtn.addEventListener('click', () => {
        resultPhase.querySelector('#phase-result>div').remove();
        pickPhase.classList.remove('hidden');
        resultPhase.classList.add('hidden');
    })
}

const beats = {
    scissors: ["paper", "lizard"],
    paper: ["rock", "spock"],
    rock: ["scissors", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"]
}

function getResult(player, computer) {
    if (player === computer) return 0;
    if (beats[player].includes(computer)) return 1;
    return -1;
}

