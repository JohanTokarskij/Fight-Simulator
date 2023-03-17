let playerOneName
while (true){
    playerOneName = prompt("Ange namn för spealre ett (1 till 10 tecken):")
    if (playerOneName.length<1 || playerOneName.length>10){
        alert("Namnet ska vara mellan 1 och 10 tecken")
    } else {
        break
    }
}

const namnArr = ["Hulk", "Captain America", "Iron Man"]
const playerTwoName = namnArr[Math.floor(Math.random()*namnArr.length)]

const targetOne = document.getElementById("targetPlayerOneId")
const targetTwo = document.getElementById("targetPlayerTwoId")
const wageOne = document.getElementById("wageP1Id")
const wageTwo = document.getElementById("wageP2Id")
const targetResult = document.getElementById("resultId")
const highDmgBt = document.getElementById("highDmgId")
const lowDmgBt = document.getElementById("lowDmgId")
const roundTarget = document.getElementById("roundId")
let balance = document.getElementById("balanceId")

wageOne.placeholder = `... ${playerOneName}`
wageTwo.placeholder = `... ${playerTwoName}`

wageOne.addEventListener("input",() => wageTwo.value="")
wageTwo.addEventListener("input",() => wageOne.value="")

let balanceCount=0

const fightSimulator = () =>{
    const minRounds = 1
    const maxRounds = 10
    let numRounds
    while(true){
        numRounds = parseInt(prompt(`Ange antal rundor (${minRounds} till ${maxRounds}):`))
        if (isNaN(numRounds) || numRounds<minRounds || numRounds>maxRounds) {
            alert(`Vänligen ange ett nummer mellan ${minRounds} och ${maxRounds}.`);
        } else{
            break
        }
        
    }
    targetResult.innerHTML=""
    let playerOneHp = 100
    let playerTwoHp = 100
    let round = 1
    roundTarget.innerHTML=round

    targetOne.innerHTML=`${playerOneName} HP: ${playerOneHp}`
    targetTwo.innerHTML=`${playerTwoName} HP: ${playerTwoHp}`

    let highDmgKick = () => {
        let playerOneKick = Math.random()<0.8?0:Math.floor(Math.random()*21+80)
        let playerTwoKick = Math.random()<0.5
                            ?(Math.random()<0.8?0:Math.floor(Math.random()*21+80))
                            :(Math.random()<0.8?Math.floor(Math.random()*20+1):0)
        playerOneHp-=playerTwoKick
        targetOne.innerHTML=`${playerOneName} HP: ${playerOneHp}`
        playerTwoHp-=playerOneKick
        targetTwo.innerHTML=`${playerTwoName} HP: ${playerTwoHp}`
        round+=1
        roundTarget.innerHTML=round
        if(playerOneHp<=0||playerTwoHp<=0||round>numRounds){
            endGame()
        }
    }
    let lowDmgKick = () => {
        let playerOneKick = Math.random()<0.8?Math.floor(Math.random()*20+1):0
        let playerTwoKick = Math.random()<0.5
                            ?(Math.random()<0.8?0:Math.floor(Math.random()*21+80))
                            :(Math.random()<0.8?Math.floor(Math.random()*20+1):0)
        playerOneHp-=playerTwoKick
        targetOne.innerHTML=`${playerOneName} HP: ${playerOneHp}`
        playerTwoHp-=playerOneKick
        targetTwo.innerHTML=`${playerTwoName} HP: ${playerTwoHp}`
        round+=1
        roundTarget.innerHTML=round
        if(playerOneHp<=0||playerTwoHp<=0||round>numRounds){
            endGame()
        }
    }

    let endGame = () => {
        roundTarget.innerHTML=""
        highDmgBt.removeEventListener("click", highDmgKick)
        lowDmgBt.removeEventListener("click", lowDmgKick)
        if (playerOneHp>playerTwoHp){
          result=`Vinnaren är ${playerOneName}`
          balanceCount+=wageOne.value-wageTwo.value
          wageOne.value=""
          wageTwo.value=""
        } else if(playerOneHp<playerTwoHp) {
          result=`Vinnaren är ${playerTwoName}`
          balanceCount+=wageTwo.value-wageOne.value
          wageOne.value=""
          wageTwo.value=""
        } else{
          result=`Det blev oavgjord!`
          wageOne.value=""
          wageTwo.value=""
        }
        targetResult.innerHTML=`${result}`
        balance.innerHTML = balanceCount
      }
    

    highDmgBt.addEventListener("click", highDmgKick)
    lowDmgBt.addEventListener("click", lowDmgKick)
    
}
    
document.getElementById("playId").addEventListener("click", fightSimulator)








