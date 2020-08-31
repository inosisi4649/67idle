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
document.getElementById("pointbank").innerHTML = "You have " + gameData.point + " Points."
document.getElementById("perClickUpgrade").innerHTML = "Rankup! (Currently Rank " + gameData.rank + ") Cost: " + gameData.rankcost + " Points"

function makePoint() {
    gameData.point += gameData.pointPerClick
    document.getElementById("pointbank").innerHTML = "You have " + gameData.point + " Points."
}

function cheat(string) {
    if (string == "lotpoint") {
        gameData.point += 1000000000000000000000000000000000
    }
}

function buyRank() {
    if (gameData.point >= gameData.rankcost) {
        gameData.point -= gameData.rankcost
        gameData.rank += 1
        gameData.rankcost = Math.floor(gameData.rankcost*1.2)
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