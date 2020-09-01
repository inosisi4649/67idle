var gameData = {
    point: 0,
    pointPerClick: 1,
    clickupgradecost: 1,
    rankcost: 67,
    rank: 0,
    rankpoint: 0,
    clickpoint: 0,
    automatic: false
}

// Load save
var savegame = JSON.parse(localStorage.getItem("sixtysevenIdlesave"))
if (savegame !== null) {
    gameData = savegame
}

tab("pointMenu")
pointreload()
if (gameData.automatic == true) {
    document.getElementById("automatic").style.display = "inline_block"
    document.getElementById("unlockauto").innerHTML = "Already Bought"
}else{
    document.getElementById("automatic").style.display = "none"
    document.getElementById("unlockauto").innerHTML = "Unlock Autoclicker. Cost: 1 RP"
}


function clickPoint(){
    gameData.point += gameData.pointPerClick
    gameData.clickpoint += gameData.pointPerClick
    pointreload()

}

function makePoint() {
    gameData.point += gameData.pointPerClick
    pointreload()
}

function clickUpgrade() {
    if (gameData.rankpoint >= gameData.clickupgradecost) {
        gameData.rankpoint -= gameData.clickupgradecost
        gameData.pointPerClick *= 2
        gameData.clickupgradecost *= 2
        pointreload()
    }
}

function unlockauto() {
    if (gameData.rankpoint >= 1) {
        gameData.rankpoint -= 1
        gameData.automatic = true
        document.getElementById("automatic").style.display = "inline-block"
        document.getElementById("unlockauto").innerHTML = "Already Bought"
        pointreload()
    }
}

function buyRank() {
    if (gameData.point >= gameData.rankcost) {
        gameData.point -= gameData.rankcost
        gameData.rank += 1
        gameData.rankpoint += 1
        gameData.rankcost = Math.floor(gameData.rankcost*1.2)
        pointreload()
    }
}

function pointreload() {
    document.getElementById("pointbank").innerHTML = "You have " + gameData.point + " Points."
    document.getElementById("rankpointbank").innerHTML = "You have " + gameData.rankpoint + " Rank Points."
    document.getElementById("rankup").innerHTML = "Rankup! (Currently Rank " + gameData.rank + ") Cost: " + gameData.rankcost + " Points"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Click Power. Cost: " + gameData.clickupgradecost + " RP"
}
function tab(tab) {
    // hide all your tabs, then show the one the user selected.
    document.getElementById("pointMenu").style.display = "none"
    document.getElementById("rankMenu").style.display = "none"
    document.getElementById("autoMenu").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
  }

var mainGameLoop = window.setInterval(function() {
    }, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("sixtysevenIdlesave", JSON.stringify(gameData))
  }, 10000)