const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOver = document.querySelector('.game-over');
const reiniciar = document.querySelector('.reiniciar');
let death = new Audio('sounds/death-sound.mp3');
let som = new Audio('sounds/100point.mp3');
let plim = new Audio('sounds/plim.mp3')
death.volume = 0.2;
plim.volume = 0.3;

let pontos = 0;
let perdeu = false;

const jump = () => {
    mario.classList.add('jump');
    plim.play();

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

  pipe.style.animation = 'pipeAnimation 900ms infinite linear';

  const jump = () => {
    mario.classList.add('jump');
    plim.play();

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 600);
}
}

function atualizarPagina() {
    location.reload();
}

function contarPonto() {
    if (!perdeu) {
      pontos++;
      document.getElementById('pontosParaContar').textContent = "SCORE:" + pontos;

      if (pontos % 99 === 0) {
        realizarAcaoApos100Pontos();
      }

    } else if(perdeu) {
      clearInterval(intervalId);
    }
  }

  function realizarAcaoApos100Pontos() {
    som.play();
}

  
  const intervalId = setInterval(contarPonto, 100);

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');


    if (pontos == 100) {
      pipe.style.animation = 'pipeAnimation 930ms infinite linear';
      
    }

    if (pontos == 200) {
      pipe.style.animation = 'pipeAnimation 860ms infinite linear';
      
    }

    


    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){

        perdeu = true;

        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;


        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        gameOver.style.display = 'initial';
        reiniciar.style.display = 'initial';

        clearInterval(loop);

        document.addEventListener('keydown', atualizarPagina);
        document.addEventListener('click', atualizarPagina);


    }
    if(perdeu == true){
        death.play();
    }

},10);



document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

document.addEventListener('click', jump);



    

