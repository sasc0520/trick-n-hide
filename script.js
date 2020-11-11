window.addEventListener("load", startScreen);
let liv;
let point;
let myRandom;
gameEnd = false;
let gameTime;

function startScreen() {
    console.log("startScreen");
    //    gemmer begge slutskærme
    document.querySelector("#level_complete").classList.add("hide_screen");
    document.querySelector("#game_over").classList.add("hide_screen");
    //    gemmer begge slutskærmes knapper
    document.querySelector("#playagain_sprite").removeEventListener("click", popupwindow);
    document.querySelector("#playagain_sprite1").removeEventListener("click", popupwindow);
    //    nutlstiller liv og point
    liv = 3;
    point = 0;
    //    fortæller at spillet ikke er slut
    gameEnd = false;
    //    fortæller hvordan liv og point vises, hjertet som liv får fjernet hide klassen for at kunne vises
    document.querySelector("#heart" + liv).classList.remove("hide");
    document.querySelector("#point").textContent = point;
    //    viser startskærm og lytter efter klik på startknap som tager videre til popupvindue
    document.querySelector("#start").classList.remove("hide_screen");
    document.querySelector("#startbutton_sprite").addEventListener("click", popupwindow);

}

function popupwindow() {
    console.log("popupwindow");
    //    start knap nummer 2 vises, velkomst lyd spilles, startskærm gemmes, startknap 1 eventlisterner fjernes, viser popup, startknap 2 lyttes efter klik
    document.querySelector("#startknap_sprite").classList.remove("hide_screen");
    document.querySelector("#hejmeddig").play();
    document.querySelector("#start").classList.add("hide_screen");
    document.querySelector("#startbutton_sprite").removeEventListener("click", startGame);
    document.querySelector("#popupwindow_container").classList.remove("hide_screen");
    document.querySelector("#startknap_sprite").addEventListener("click", startGame);

}

function startGame() {
    console.log("startGame");

    //    timer for spilets tidsrum

    clearTimeout(gameTime);
    //    timer sættes til 20 sekunder, i milisekunder
    gameTime = setTimeout(stopSpillet, 20000);


    //    genstarter timer animation
    document.querySelector("#time_sprite").classList.remove("shrink");
    document.querySelector("#time_sprite").offsetHeight;
    document.querySelector("#time_sprite").classList.add("shrink");

    //    popupvindue gemmes, eventlistener fjernes på startknap 2, startknap 2 gemmes
    document.querySelector("#popupwindow_container").classList.add("hide_screen");
    document.querySelector("#startknap_sprite").removeEventListener("click", startGame);
    document.querySelector("#startknap_sprite").classList.add("hide_screen");

    //    fjerner startskærmen
    startAnimation();
    unpauseGame();

}


function startAnimation() {
    //starter popup animationerne
    console.log("startAnimation");
    document.querySelector("#kat_container1").classList.add("popup");
    document.querySelector("#vampyr_container1").classList.add("popup");
    document.querySelector("#spoegelse_container1").classList.add("popup");
    document.querySelector("#djaevel_container1").classList.add("popup");
    document.querySelector("#frujensen_container1").classList.add("popup");
    document.querySelector("#hrjensen_container1").classList.add("popup");

    //    animationend tilføjes, så animationerne henvises til funktionen moveELement
    document.querySelector("#kat_container1").addEventListener("animationend", moveElement);
    document.querySelector("#vampyr_container1").addEventListener("animationend", moveElement);
    document.querySelector("#spoegelse_container1").addEventListener("animationend", moveElement);
    document.querySelector("#djaevel_container1").addEventListener("animationend", moveElement);
    document.querySelector("#frujensen_container1").addEventListener("animationend", moveElement);
    document.querySelector("#hrjensen_container1").addEventListener("animationend", moveElement);

    //figurer gøres klikbare
    document.querySelector("#kat_container1").addEventListener("click", goodClick);
    document.querySelector("#vampyr_container1").addEventListener("click", goodClick);
    document.querySelector("#spoegelse_container1").addEventListener("click", goodClick);
    document.querySelector("#djaevel_container1").addEventListener("click", goodClick);
    document.querySelector("#frujensen_container1").addEventListener("click", badClick);
    document.querySelector("#hrjensen_container1").addEventListener("click", badClick);
}

function stopAnimation() {
    console.log("stopAnimation");

    document.querySelector("#kat_container1").classList.add("popup");
    document.querySelector("#vampyr_container1").classList.add("popup");
    document.querySelector("#spoegelse_container1").classList.add("popup");
    document.querySelector("#djaevel_container1").classList.add("popup");
    document.querySelector("#frujensen_container1").classList.add("popup");
    document.querySelector("#hrjensen_container1").classList.add("popup");

    //    animationend fjernes så figurerne stopper med at rykke sig forshellige steder hen
    document.querySelector("#kat_container1").removeEventListener("animationend", moveElement);
    document.querySelector("#vampyr_container1").removeEventListener("animationend", moveElement);
    document.querySelector("#spoegelse_container1").removeEventListener("animationend", moveElement);
    document.querySelector("#djaevel_container1").removeEventListener("animationend", moveElement);
    document.querySelector("#frujensen_container1").removeEventListener("animationend", moveElement);
    document.querySelector("#hrjensen_container1").removeEventListener("animationend", moveElement);

    document.querySelector("#kat_container1").addEventListener("click", goodClick);
    document.querySelector("#vampyr_container1").addEventListener("click", goodClick);
    document.querySelector("#spoegelse_container1").addEventListener("click", goodClick);
    document.querySelector("#djaevel_container1").addEventListener("click", goodClick);
    document.querySelector("#frujensen_container1").addEventListener("click", badClick);
    document.querySelector("#hrjensen_container1").addEventListener("click", badClick);
}

function goodClick() {
    console.log("goodClick");
    //    sådan at den samme lyd ve dgod klik ikke spilles hver eneste gang man trykker
    if (Math.random() < 0.5) {
        document.querySelector("#good").play();
    } else {
        document.querySelector("#good2").play();
    }

    //animation ved klik
    this.classList.add("pause_fade");

    //så den ikke kan trykkes på igen med det samme
    this.removeEventListener("click", goodClick);

    //point vises
    point++;
    document.querySelector("#point").textContent = point;

    //elementet henvises til moveElement funktionen
    this.addEventListener("animationend", moveElement);

    //figur gøres klikbar igen
    this.addEventListener("click", goodClick);


}

function badClick() {
    console.log("badClick");
    //    dårlig lyd spilles
    document.querySelector("#bad").play();

    //animation ved klik
    this.classList.add("pause_fade");

    //så den ikke kan trykkes på igen med det samme
    this.removeEventListener("click", badClick);

    //et hjerte fjernes for at simulere at liv forsvinder 
    document.querySelector("#heart" + liv).classList.add("hide");
    liv--;
    console.log(liv);

    //figur henvises til moveElement
    this.addEventListener("animationend", moveElement);
    this.addEventListener("click", badClick);

    //hvis sætninger til når man ingen flere liv har, så føres man til game over 
    if (liv <= 0) {
        stopSpillet();
    }

}

function moveElement() {
    console.log("moveElement");
    //animationer fjernes, så elementet kan flyttes
    this.classList.remove("popup");
    this.classList.remove("pause_fade");

    //de 10 forskellige positioner
    this.classList.remove("position1");
    this.classList.remove("position2");
    this.classList.remove("position3");
    this.classList.remove("position4");
    this.classList.remove("position5");
    this.classList.remove("position6");
    this.classList.remove("position7");
    this.classList.remove("position8");
    this.classList.remove("position9");
    this.classList.remove("position10");

    //myRandom defineres som et tal mellem 1 og 10
    myRandom = Math.floor(Math.random() * 10 + 1);
    this.classList.add("position" + myRandom);

    //timeout som gør at figurerne skifter position efter 1 sekund (samme tid som animation duration)
    setTimeout(startAnimation, 1000);
}

function stopSpillet() {
    console.log("stopSpillet");
    //    eventlistener på klik fjernes
    document.querySelector("#kat_container1").removeEventListener("click", goodClick);
    document.querySelector("#vampyr_container1").removeEventListener("click", goodClick);
    document.querySelector("#spoegelse_container1").removeEventListener("click", goodClick);
    document.querySelector("#djaevel_container1").removeEventListener("click", goodClick);
    document.querySelector("#frujensen_container1").removeEventListener("click", badClick);
    document.querySelector("#hrjensen_container1").removeEventListener("click", badClick);
    //    tjekker om der er 10 point eller højere, hvis så går den til vind og hvis ikke går den til  gamover 
    if (gameEnd == false) {
        if (point >= 10) {
            youWin();
        } else {
            gameOver();
        }
    }
}


function pauseGame() {
    console.log("pauseGame");
    //    pause animation tilføjes alle elementer
    document.querySelector("#kat_container1").classList.add("paused");
    document.querySelector("#vampyr_container1").classList.add("paused");
    document.querySelector("#spoegelse_container1").classList.add("paused");
    document.querySelector("#djaevel_container1").classList.add("paused");
    document.querySelector("#frujensen_container1").classList.add("paused");
    document.querySelector("#hrjensen_container1").classList.add("paused");

}

function unpauseGame() {
    console.log("unpauseGame");
    //    pause animation fjernes fra alle elementer
    document.querySelector("#kat_container1").classList.remove("paused");
    document.querySelector("#vampyr_container1").classList.remove("paused");
    document.querySelector("#spoegelse_container1").classList.remove("paused");
    document.querySelector("#djaevel_container1").classList.remove("paused");
    document.querySelector("#frujensen_container1").classList.remove("paused");
    document.querySelector("#hrjensen_container1").classList.remove("paused");

}


function gameOver() {
    console.log('Game over');
    //    fortæller at spillet er slut
    gameEnd = true;
    //    fjerner hide fra de tre hjerter
    document.querySelector("#heart1").classList.remove("hide");
    document.querySelector("#heart2").classList.remove("hide");
    document.querySelector("#heart3").classList.remove("hide");
    //    gameover lyd afspilles
    document.querySelector("#gameover").play();
    //    gameover skærm vises og start igen knap vises
    document.querySelector("#game_over").classList.remove("hide_screen");
    document.querySelector("#playagain_sprite").addEventListener("click", startScreen);
    //    shrink animation fjernes for at kunne genstartes senere
    document.querySelector("#time_sprite").classList.remove("shrink");

    stopAnimation();
    pauseGame();
}

function youWin() {
    console.log('You won');
    //    fortæller at spillet er slut
    gameEnd = true;
    //    fjerner de tre hjerter
    document.querySelector("#heart1").classList.remove("hide");
    document.querySelector("#heart2").classList.remove("hide");
    document.querySelector("#heart3").classList.remove("hide");
    //    victory lyd afspilles
    document.querySelector("#youwin").play();
    //    victory skærm vises, spil igen knap vises
    document.querySelector("#level_complete").classList.remove("hide_screen");
    document.querySelector("#playagain_sprite1").addEventListener("click", startScreen);
    //    shrink animation fjernes for at kunne genstartes senere
    document.querySelector("#time_sprite").classList.remove("shrink");

    stopAnimation();
    pauseGame();
}
