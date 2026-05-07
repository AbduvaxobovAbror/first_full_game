const player = document.getElementById("player")
const obstacle = document.getElementById("obstacle")
const scoreText = document.getElementById("score")

const menu = document.getElementById("menu")
const game = document.getElementById("game")

const gameOverDiv = document.getElementById("gameOver")
const finalScore = document.getElementById("finalScore")

let selectedCharacter = ""
let jumping = false
let score = 0

// 🐾 SELECT CHARACTER
function selectChar(img){
  selectedCharacter = img.src

  document.querySelectorAll(".characters img").forEach(i=>{
    i.style.border = "2px solid transparent"
  })

  img.style.border = "2px solid yellow"
}

// ▶ START GAME
function startGame(){

  if(!selectedCharacter){
    alert("Select character!")
    return
  }

  menu.style.display = "none"
  game.style.display = "block"

  player.style.backgroundImage = `url(${selectedCharacter})`

  runGame()
}

// 🎮 GAME LOGIC
function runGame(){

  document.addEventListener("keydown", jump)

  function jump(){

    if(jumping) return
    jumping = true

    let pos = 0

    let up = setInterval(()=>{

      if(pos >= 180){

        clearInterval(up)

        let down = setInterval(()=>{

          if(pos <= 0){
            clearInterval(down)
            jumping = false
          }

          pos -= 10
          player.style.bottom = pos + "px"

        },20)

      }

      pos += 10
      player.style.bottom = pos + "px"

    },20)
  }

  // 📦 OBSTACLE
  let obstacleX = 900

  let move = setInterval(()=>{

    obstacleX -= 6
    obstacle.style.left = obstacleX + "px"

    if(obstacleX < -60){
      obstacleX = 900
    }

  },20)

  // 💀 GAME LOOP (NO HIGH SCORE HERE!)
  let loop = setInterval(()=>{

    score++
    scoreText.innerText = score

    let p = player.getBoundingClientRect()
    let o = obstacle.getBoundingClientRect()

    if(
      p.right > o.left + 10 &&
      p.left < o.right - 10 &&
      p.bottom > o.top + 10
    ){

      gameOverDiv.style.display = "flex"
      finalScore.innerHTML = `Score: ${score}`

      // 🏆 SAVE HIGH SCORE ONLY
      let high = Number(localStorage.getItem("highScore")) || 0

      if(score > high){
        localStorage.setItem("highScore", score)
      }

      clearInterval(loop)
      clearInterval(move)
    }

  },50)

}