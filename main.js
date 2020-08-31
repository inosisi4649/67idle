var gameData = {
    point: 0,
    pointPerClick: 1,
    rankcost: 67,
    rank: 1
}

// Load save
var savegame = JSON.parse(localStorage.getItem("sixtysevenIdlesave"))
if (savegame !== null) {
    gameData = savegame
}

function makePoint() {
    gameData.point += gameData.pointPerClick
    document.getElementById("pointbank").innerHTML = "You have " + gameData.point + " Points."
}

function buyRank() {
    if (gameData.point >= gameData.rankcost) {
        gameData.point -= gameData.rankcost
        gameData.rank += 1
        gameData.rankcost = rankcost * (Math.log(rank+1) / Math.log(2.0))
        document.getElementById("pointbank").innerHTML = "You have " + gameData.point + " Points."
        document.getElementById("perClickUpgrade").innerHTML = "Rankup! (Currently Rank " + gameData.rank + ") Cost: " + gameData.rankcost + " Points"
    }
}

var mainGameLoop = window.setInterval(function() {
    makePoint()
    }, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("sixtysevenIdlesave", JSON.stringify(gameData))
  }, 10000)

var value = Math.log(10.0) / Math.log(2.0);