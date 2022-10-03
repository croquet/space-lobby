class FooPawn {
    setup() {
        if (!this.audio) {
            this.audio = new Audio("./assets/audio/mixkit-futuristic-sci-fi-computer-ambience-2507.wav");
            this.audio.setAttribute("loop", true);
            document.body.appendChild(this.audio);
            // make sure that it is not visible, perhaps put it behind the ThreeCanvas element.
            // and there are some attributes to set.
            this.audioStarted = false;
            this.audioHandler = () => this.audioStart();
            document.addEventListener("click", this.audioHandler);
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
        }
    ]
}

/* globals Microverse */
