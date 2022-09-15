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

        //this.shape.children.forEach((c) => this.shape.remove(c));
        //this.shape.children = [];
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
        //this.left_dots = [];
        //this.right_dots = [];
        // if (this.shape.children.length === 0) {
        //     //for i in range....

        //     let geometry = new Microverse.THREE.CircleGeometry(.1,8);
        //     let material = new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xD86508});
        //     this.obj = new Microverse.THREE.Mesh(geometry, material);
        //     this.shape.add(this.obj);
        // }
        //this.listen("motes", "createMotes");

        this.upTranslation = this.actor._translation; // Storing Current and Pressed Translations (Avoids Errors)
        //this.downTranslation = [this.actor._translation[0], this.actor._translation[1], this.actor._translation[2] - 0.1];
        
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
            // here[0] = this.random()*6-3;
            // here[1] = this.random()*4+.7;
            // here[2] = this.random()*12-6;
            // if(i<5){
            //     here[1]+=dotDist;
            // }else{
            //     here[0]+= dotDist*Math.sin(sign*angle);
            //     here[1]+= dotDist*Math.cos(sign*angle);
            // }
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
        //if(this.currDot == 0){
        this.left_dots.forEach((d)=>{
            let pos = d.position;
            let randOpac = ((this.now()+(pos.x*pos.y*pos.z)*1000) * 75 + 74) % (2**(16)+1);
            d.material.opacity = Math.min(0.6,Math.max(0,(randOpac/(2**(16)+1)-.5)*.1+d.material.opacity));
            //console.log(pos);
            // if(pos.y<.7){
            //     d.position.set(pos.x,4.7,pos.z);
            // }else{
            //     d.position.set(pos.x,pos.y-.01,pos.z);
            // }
            //console.log(":)");
        });
        //}
        //console.log(this.currDot);
        // this.left_dots[this.currDot].material.emissive.set(this.green);
        // this.currDot+=1;
        // this.currDot = this.currDot%this.left_dots.length;
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
        }
    ]
}