let totalDuration = 25 * 60; // Duração inicial (25 minutos em segundos)
let remainingTime = totalDuration;
let timerId = null; // Armazena o ID do temporizador
let isRunning = false; // Indica se o temporizador está rodando ou não

const timeDisplay = document.getElementById("time");
const progress = document.getElementById("progress");
const btn = document.querySelector(".btn");
const reset = document.querySelector("#reset");


function updateTimeDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Atualiza o progresso visual
function updateProgress() {
    const percentage = (1 - remainingTime / totalDuration) * 100;
    progress.style.background = `conic-gradient(
        #EB6154 ${percentage}%,
        transparent ${percentage}% 100%
    )`;
}

// Inicia o temporizador
function startTimer() {
    reset.style.visibility = "visible"; // Torna o botão visível
    reset.style.opacity = "1"; // Aplica a transição de visibilidade
    if (timerId !== null) return; // Evita iniciar múltiplos temporizadores

    timerId = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateTimeDisplay();
            updateProgress();
        } else {
            stopTimer(); // Para o temporizador ao terminar
        }
    }, 1000);
}

// Para o temporizador
function stopTimer() {
  
    clearInterval(timerId); // Para o temporizador
    timerId = null; // Reseta o ID
    isRunning = false;
    
    btn.innerHTML = "Start"; // Reseta o texto do botão
   
}

// Alterna o estado do temporizador
btn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
      
        btn.innerHTML = "Break";
      
       
        startTimer();
    } else {

        stopTimer();
    }
});

// Botões para alternar entre modos (Pomodoro, Short Break, Long Break)
document.getElementById("pom").addEventListener("click", () => {
    stopTimer();
    totalDuration = 25 * 60;
    remainingTime = totalDuration;
    updateTimeDisplay();

});

document.getElementById("short").addEventListener("click", () => {
    stopTimer();
    totalDuration = 5 * 60;
    remainingTime = totalDuration;
    updateTimeDisplay();
});

document.getElementById("long").addEventListener("click", () => {
    stopTimer();
    totalDuration = 15 * 60;
    remainingTime = totalDuration;
    updateTimeDisplay();
});

// Botão para resetar o temporizador
reset.addEventListener("click", () => {
  reset.style.visibility = "hidden"; // Torna o botão visível
  reset.style.opacity = "0"; // Aplica a transição de visibilidade
  stopTimer(); // Para o temporizador
  remainingTime = totalDuration; // Reseta o tempo
  updateTimeDisplay(); // Atualiza o tempo no display
  updateProgress(); // Atualiza o progresso visual
});
// Seleciona todos os botões
const buttons = document.querySelectorAll('.btn-nav');

// Adiciona um evento de clique para cada botão
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe "active" de todos os botões
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona a classe "active" ao botão clicado
        button.classList.add('active');
    });
});
