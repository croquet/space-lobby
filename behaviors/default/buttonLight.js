
class ButtonLightActor { // Buttons Move Door
    setup() {
        this.occupier = undefined;
        this.listen("pressButton", "pressButton");
        //this.subscribe("global", "change_color","pressButton");
        this.scope = this._cardData.myScope;
        this.level = this._cardData.level;
        //.material.color.set(0xFF330B);
    }

    pressButton(data) {
        let {scope, color, direction} = data;
        if(this.scope == scope){
            this.say("updateColor", {color: color, direction: direction});
        }
    }
}
class ButtonLightPawn {
    setup() {
        //this.shape.children.forEach((c) => this.shape.remove(c));
        //this.shape.children = [];
        if (this.left_dots) {
            this.left_dots.forEach((d) => d.removeFromParent());
        }
        console.log(this.shape);
        //this.shape[0].material.color.set(0xFF330B);
        let scope = this.actor._cardData.myScope;
        this.listen("updateColor", "updateColor");
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        this.subscribe("global", "change_color","updateColor");
    }

    modelLoaded() {
        this.shape.children[0].traverse((mesh) => {
            if (mesh.material) {
               mesh.material.emissive.set(0xFF330B);
            }
        });
    }


    updateColor(data) {
        let {scope, color, direction} = data;
        if (this.scope == scope){
            this.shape.children[0].traverse((mesh) => {
                if (mesh.material) {
                   mesh.material.emissive.set(0x00FF00);
                }
            });
        }
        //let {color, direction} = data;
        //this.material.color.set(color);
    }
}


/* Three behavior modules are exported from this file. */

export default {
    modules: [
        {
            name: "ButtonLight",
            actorBehaviors: [ButtonLightActor],
            pawnBehaviors: [ButtonLightPawn],
        }
    ]
}

/* globals Microverse */
