var gameData = {
    point: 0,
    pointPerClick: 1,
    clickupgradecost: 1,
    rankcost: 67,
    rank: 0,
    rankpoint: 0,
    clickpoint: 0,
    automatic: false,
    autospeed: 1000,
    autopower: 1,
    autospeedcost: 10,
    autopowercost: 10,
    autoticks: 0,
    rpmulti: 1,
    rpmulticost: 5,
    speedmulti: 1,
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


function clickPoint() {
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
    if (gameData.rankpoint >= 1 && gameData.automatic == false) {
        gameData.rankpoint -= 1
        gameData.automatic = true
        document.getElementById("automatic").style.display = "inline-block"
        document.getElementById("unlockauto").innerHTML = "Already Bought"
        pointreload()
    }
}

function buyautospeed() {
    if (gameData.point >= gameData.autospeedcost) {
        gameData.point -= gameData.autospeedcost
        gameData.autospeed = Math.floor(gameData.autospeed/1.05)
        gameData.autospeedcost = Math.floor(gameData.autospeedcost*1.2)
        pointreload()
    }
}

function buyautopower() {
    if (gameData.point >= gameData.autopowercost) {
        gameData.point -= gameData.autopowercost
        gameData.autopower += 1
        gameData.autopowercost = Math.floor(gameData.autopowercost*1.2)
        pointreload()
    }
}

function buyRank() {
    if (gameData.point >= gameData.rankcost) {
        gameData.point -= gameData.rankcost
        gameData.rank += 1
        gameData.rankpoint += gameData.rpmulti
        gameData.rankcost = Math.floor(gameData.rankcost*1.2)
        pointreload()
    }
}

function rpmulti() {
    if (gameData.rankpoint >= gameData.rpmulticost) {
        gameData.rankpoint -= gameData.rpmulticost
        gameData.rpmulticost *= 5
        gameData.rpmulti *= 2
        pointreload()
    }
}

function givepoint(num){
    gameData.point += num
}

function pointreload() {
    document.getElementById("pointbank").innerHTML = "You have " + gameData.point + " Points."
    document.getElementById("rankpointbank").innerHTML = "You have " + gameData.rankpoint + " Rank Points."
    document.getElementById("rankup").innerHTML = "Rankup! (Currently Rank " + gameData.rank + ") Cost: " + gameData.rankcost + " Points"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Click Power. Cost: " + gameData.clickupgradecost + " RP"
    document.getElementById("autospeed").innerHTML = "Upgrade Autoclicker Speed. Cost: "+ gameData.autospeedcost +" Points"
    document.getElementById("autopower").innerHTML = "Upgrade Autoclicker Power. Cost: "+ gameData.autopowercost +" Points"
    document.getElementById("nowautospeed").innerHTML = "Now Autoclick Speed is " + gameData.autospeed + " ms."
    document.getElementById("nowautopower").innerHTML = "Now Autoclick Power is " + gameData.autopower 
    document.getElementById("rpmulti").innerHTML = "×2 RP Multiplier. Cost: "+ gameData.rpmulticost +" RP"
}

function tab(tab) {
    // hide all your tabs, then show the one the user selected.
    document.getElementById("pointMenu").style.display = "none"
    document.getElementById("rankMenu").style.display = "none"
    document.getElementById("autoMenu").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
  }

var autotick = window.setInterval(function() {
    gameData.autoticks += 20
    pointreload()
    if(gameData.autoticks>=gameData.autospeed && gameData.automatic == true){
        gameData.point = gameData.point + (gameData.autopower * gameData.pointPerClick * gameData.speedmulti)
        gameData.autoticks = 0
    }
    if(gameData.autospeed < 50){
        gameData.autospeed = 50
        gameData.speedmulti *= 1.05
    }
}, 20)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("sixtysevenIdlesave", JSON.stringify(gameData))
  }, 10000)