    const cursor = document.querySelector('.cursor')
    const holes = [...document.querySelectorAll('.hole')]
    const scoreEl = document.querySelector('.score span')
    const hearts = document.querySelectorAll('.hearts img')
    let lives = 3    
    let score = 0

    const smash = new Audio('/assets/smash.mp3')
    const smashmoan = new Audio('/assets/smash-moan.mp3')

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
        const i = Math.floor(Math.random() * holes.length)
        const hole = holes[i]
        let timer = null

        const img = document.createElement('img')
        img.classList.add('mole')
        img.src = 'assets/mole.png'

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

        hole.appendChild(img)

        timer = setTimeout(() => {
            hole.removeChild(img)
            removeHeart()
            run()
        }, 1500)
    }
    run()



    window.addEventListener('mousemove', e => {
        cursor.style.top = e.pageY + 'px'
        cursor.style.left = e.pageX + 'px'
    })
    window.addEventListener('mousedown', () => {
        cursor.classList.add('active')
    })
    window.addEventListener('mouseup', () => {
        cursor.classList.remove('active')
    })

    