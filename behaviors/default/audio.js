class FooPawn {
    setup() {
        if (!this.audio) {
            this.audio = new Audio("./assets/audio/mixkit-futuristic-sci-fi-computer-ambience-2507.wav");
            this.audio.setAttribute("loop", true);
            this.audio.volume = 0.05;
            document.body.appendChild(this.audio);
            // make sure that it is not visible, perhaps put it behind the ThreeCanvas element.
            // and there are some attributes to set.
            this.audioStarted = false;
            this.audioHandler = () => this.audioStart();
            document.addEventListener("click", this.audioHandler);
            this.subscribe("audio", "toggleAudio", this.audioToggle);
        }
    }
    audioToggle(){
        if (this.audioStarted){
            this.audioPause();
        }
        else{
            this.audioStart();
        }
    }
    audioStart() {
        if (this.audioStarted) {return;}
        this.audioStarted = true;
        if (this.audio) {
            this.audio.play();
        }
        if (this.audioHandler) {
            document.removeEventListener("click", this.audioHandler);
            this.audioHandler = null;
        }
    }
    audioPause() {
        if (this.audio) {
            this.audio.pause();
            this.audioStarted = false
        }
    }
}

class FooMenuPawn {
    setup() {
        let menu = document.body.querySelector("#worldMenu");
        if (menu) {
            let menuItemDiv = document.createElement("div");
            menuItemDiv.innerHTML = `<div id="worldMenu-foo" class="menu-label menu-item">
    <span class="menu-label-text">Turn off Sound</span>
    <div class="menu-icon load-icon"></div>
</div>`;
            let menuItem = menuItemDiv.firstChild;
            menuItem.addEventListener("click", () => {
                 let label = menuItem.querySelector(".menu-label-text");
                 label.textContent = "Turn On Sound" ;
                 this.publish("audio", "toggleAudio");});
            menu.appendChild(menuItem);
            this.menuItem = menuItem;
        }
    }
    teardown() {
        let menu = document.body.querySelector("#worldMenu");
        if (menu) {
            let menuItem = menu.querySelector("#worldMenu-foo");
            if (menuItem) {
                menuItem.remove();
            }
        }
    }
}
/* one behavior module is exported from this file. */

export default {
    modules: [
        {
            name: "audio",
            actorBehaviors: [],
            pawnBehaviors: [FooPawn],
        },
        {
            name: "FooMenu",
            pawnBehaviors: [FooMenuPawn]
        }
    ]
}

/* globals Microverse */