class DustActor {
    setup(){
        this.listen("motes", "saveMotes")
        
    }
    saveMotes(motes){
        this.motes = motes;
    }
}
class DustPawn {
    setup() {
        this.stepnum = 0;
        if (this.left_dots) {
            this.left_dots.forEach((d) => d.removeFromParent());
        }
        this.motes = this.actor.motes;
        if(this.motes){
            this.createMotes(this.motes);
        }else{
            let scope = this.actor._cardData.myScope;
            let arrLen = scope=="middle"?5:50;
            this.motes = Array();
            this.left_dots =   [...Array(arrLen).keys()].map((i) => {
                this.motes.push([this.random()*6-3,this.random()*4+.7,this.random()*12-6]);
            });
            this.say("motes", this.motes);
            this.createMotes(this.motes);
        }
        this.upTranslation = this.actor._translation; // Storing Current and Pressed Translations (Avoids Errors)
    }

    createMotes(motes){
        console.log("motes pawn");
        let scope = this.actor._cardData.myScope;
        let sign = scope=="left"?-1:1;
        let arrLen = scope=="middle"?5:50;
        let angle = Math.PI*4/12;
        let here = [0,0,0]
        let dotDist = 0.3
        let geometry = new Microverse.THREE.SphereGeometry(.02,32,32);
        this.left_dots =   [...Array(arrLen).keys()].map((i) => {
            let material =  new Microverse.THREE.MeshStandardMaterial({emissive: this.actor._cardData.color || 0xFFFFFF, side: Microverse.THREE.DoubleSide});
            material.transparent = true;
            material.opacity = this.random()*0.6;
            let dot = new Microverse.THREE.Mesh(geometry, material);
            here = motes[i];
            dot.position.set(here[0], here[1], here[2]);
            dot.rotation.set(0,0,0)
            this.shape.add(dot);
            return dot;
        });
        console.log('ok');
        if(!this.stepping){
            this.stepping = true;
            this.step();
        }

    }

    step(){
        if(!this.stepping){
            return;
        }
        this.left_dots.forEach((d)=>{
            let pos = d.position;
            let randOpac = ((this.now()+(pos.x*pos.y*pos.z)*1000) * 75 + 74) % (2**(16)+1);
            d.material.opacity = Math.min(0.6,Math.max(0,(randOpac/(2**(16)+1)-.5)*.1+d.material.opacity));
        });
        this.stepnum = (this.stepnum+1)%10;
        this.future(100).step();
    }

    teardown() {
        if (this.bloomPass) {
            this.service("ThreeRenderManager").composer.removePass(this.bloomPass);
            this.bloomPass = null;
        }
    }

}



export default {
    modules: [
        {
            name: "TutorialGif",
            actorBehaviors: [DustActor],
            pawnBehaviors: [DustPawn],
        },


    ]
}