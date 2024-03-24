// Elementen selecteren en variabelen initialiseren
const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const hearts = document.querySelectorAll('.hearts img')
let lives = 3    
let score = 0
// Een van mijn belangrijkste bronnen voor dit project was mijn broer Sam Whitehead. Hij studeert computer sciences en heeft met kleine dingen geholpen
// Audiobestanden initialiseren
const smash = new Audio('/assets/smash.mp3')
const smashmoan = new Audio('/assets/smash-moan.mp3')

// Functie om een hart (leven) te verwijderen
function removeHeart() {
    if (lives > 0) {
        lives--;
        hearts[lives].style.opacity = '0'; 
        if (lives === 0) {
            window.location.href = 'lose.html';
        }
    }
}


function run(){
    const i = Math.floor(Math.random() * holes.length); // Selecteer een willekeurig gat-index
    const hole = holes[i]; // Selecteer het gat-element op basis van de index
    let timer = null; // Timer variabele voor het regelen van verschijnen en verdwijnen van mol

    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'assets/mole.png'

    // Event listener voor klik op mol
    img.addEventListener('click', () => {
        score += 10;
        smash.play();
        smashmoan.play();
        scoreEl.textContent = score;
        img.src = 'assets/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 500);

        if (score >= 1000) {
            window.location.href = 'win.html';
        }
    });


    hole.appendChild(img); 

    // Timeout in voor het verdwijnen van de mol
    timer = setTimeout(() => {
        hole.removeChild(img); 
        removeHeart(); 
        run(); 
    }, 1500);
}

run();

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'; 
    cursor.style.left = e.pageX + 'px'; 
});

window.addEventListener('mousedown', () => {
    cursor.classList.add('active'); 
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});