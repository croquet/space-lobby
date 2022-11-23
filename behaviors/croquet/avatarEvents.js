class AvatarPawn {
    setup() {
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        if (!this.isMyPlayerPawn) {return;}
        //if(!window.birdEyeDone){
        //Microverse.sendToShell("hud", {joystick: false});}
        //this.lookTo(-0.3, 0, [0, 0, 0]);

        this.addFirstResponder("pointerTap", {ctrlKey: true, altKey: true}, this);
        this.addEventListener("pointerTap", this.pointerTap);

        this.addFirstResponder("pointerDown", {ctrlKey: true, altKey: true}, this);
        this.addLastResponder("pointerDown", {}, this);
        this.addEventListener("pointerDown", this.pointerDown);

        this.addFirstResponder("pointerMove", {ctrlKey: true, altKey: true}, this);
        this.addLastResponder("pointerMove", {}, this);
        this.addEventListener("pointerMove", this.pointerMove);

        this.addLastResponder("pointerUp", {ctrlKey: true, altKey: true}, this);
        this.addEventListener("pointerUp", this.pointerUp);

        this.addLastResponder("pointerWheel", {ctrlKey: true, altKey: true}, this);
        this.addEventListener("pointerWheel", this.pointerWheel);

        this.removeEventListener("pointerDoubleDown", "onPointerDoubleDown");
        this.addFirstResponder("pointerDoubleDown", {shiftKey: true}, this);
        this.addEventListener("pointerDoubleDown", this.addSticky);

        this.addLastResponder("keyDown", {ctrlKey: true}, this);
        this.addEventListener("keyDown", this.keyDown);

        this.addLastResponder("keyUp", {ctrlKey: true}, this);
        this.addEventListener("keyUp", this.keyUp);

        //this.subscribe(this.id, "3dModelLoaded", "loaded");
        //this.subscribe(this.id, "3dModelLoaded", "swoopLoaded");
        this.subscribe(this.id, "startSwoopAnimation", "birdeye");

        this.angle = 0;//270;
        this.swoopPath = "egg";
        this.r = 0;
        //this.birdeye();
        let helmet = this.shape.children.find((c) => c.name === "helmet");
        if (helmet){
            this.modelLoaded();
        }
    }

    loaded() {
        this.avatarLoaded = true;
        if (this.isMyPlayerPawn) {this.swoopLoaded();}
        let helmet = this.shape.children.find((c) => c.name === "clearHelmet");
        if (helmet) {helmet.removeFromParent();}

        let circle = new Microverse.THREE.SphereGeometry(.6,32,32);
        //circle.rotateX(-Math.PI / 2);
        //let material = new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xFFFFFF, side: Microverse.THREE.FrontSide});//new Microverse.THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1, transparent: true});
        let material = new Microverse.THREE.MeshPhysicalMaterial({roughness: 0, metalness: 0, transmission:0.8, color: 0xFFFFFF,})
        material.transparent = true;
        //material.opacity = 0.2;
        ///matertial.reflectivity = 0.5;
        helmet = new Microverse.THREE.Mesh(circle, material);
        this.createCard({
            layers: ["pointer"],
            name: "clearHelmet",
            dataLocation: "32A2hwB1ddi7RtdJib48p18ReSbxC8yRF3BdLYGW_Q-MWkZGQkEIHR1UW15XQRxHQRxRQF1DR1dGHFtdHUcdSGdGRWJ9SHRHfWEDeVtVf2hbBwELSnR2dQoCAB1bXRxRQF1DR1dGHF9bUUBdRFdAQVccXl1RU15WV0RWV1RTR15GHR9IeHwGeFhAC0pCV3YASFVZa1QDfEJfWFZGXEUDdnpxanxLA1xFBGd7BVkdVlNGUx1XUEN1QVFZWktGX2ZZc3kGe1dVWG1jCgFUWHFjAHthZARCCwZtVUBBV1Vj",
            dataScale: [10, 10, 10],
            fileName: "/avatar_helmet.glb",
            modelType: "glb",
            shadow: true,
            singleSided: true,
            parent: this,
            type: "3d",
        });
        helmet.position.set(0, .2, 0);
        helmet.name = "clearHelmet";

        //this.shape.add(helmet);
    }

    modelLoaded() {
        this.avatarLoaded = true;
        if (this.isMyPlayerPawn) {this.swoopLoaded();}
        if (this.shape.children.length === 1) {
            this.load();
        }
    }
    load() {
        let helmet = this.shape.children.find((c) => c.name === "helmet");
        if (helmet) {
            helmet.removeFromParent();
        }
        let dataLocation = "./assets/3D/avatar_helmet.glb";
        this._model3dLoading = dataLocation;
        let assetManager = this.service("AssetManager").assetManager;
        this.getBuffer(dataLocation).then((buffer) => {
            assetManager.setCache(dataLocation, buffer, this.id);
            return assetManager.load(buffer, "glb", Microverse.THREE);
        }).then((obj) => {
            if (dataLocation !== this._model3dLoading) {
                console.log("model load has been superseded");
                return;
            }
            obj.name = "helmet";
            obj.position.set(0, -.1, 0);
            obj.rotation.set(-.6, Math.PI, 0);
            obj.scale.set(0.6,0.6,0.6);
            obj.traverse((mesh) => {
                if (mesh.material) {
                    mesh.material.side = Microverse.THREE.FrontSide;
                }
            });
            this.shape.add(obj);
        });
    }

    swoopLoaded(){
        this.avatarLoaded = true;
        if (this.avatarLoaded && this.worldLoaded) {
            this.publish(this.id, "startSwoopAnimation");
            //Microverse.sendToShell("hud", {joystick: false});
        }
    }

    birdeye(){
        if(window.birdEyeDone){
            Microverse.sendToShell("hud", {joystick: true});
            return;
        }
        Microverse.sendToShell("hud", {joystick: false});
        let th = 0;
        let z = 0;
        let x = 0;
        let y = 0;
        if(this.angle>=359){
            this.swoopPath =  "return";
            if(this.r<1){
                this.lookTo(-0.3, 0, [0,0,0]);
                Microverse.sendToShell("hud", {joystick: true});
                window.birdEyeDone = true;
                return;  // Finish Swoop Animation
            }
            z = this.r;
            y = this.r/2;
            this.r-=.5;
        }
        //this.lookTo(-0.3, 0, [r*Math.sin(this.angle*Math.PI/180), 0, r*3*Math.cos(this.angle*Math.PI/180)]);
        if(this.swoopPath == "figeight"){
            if(this.angle<200){
                th = -(this.angle)*Math.PI/180
                z = 10*Math.sqrt(5*Math.cos(this.angle*Math.PI/180)**2+Math.sin(this.angle*Math.PI/180)**2)
                this.angle+=1;
            }else{
                th = Math.PI/2
                z = 5;
                x = this.angle/-10 + 36;
                this.angle+=1;
            }
        }
        if(this.swoopPath == "egg"){
            if(this.r >9){
                th = (this.angle)*Math.PI/180;
                z = this.r*(3*Math.cos(th)**2+2*Math.sin(th)**2+2*Math.cos(th+Math.PI));
                x = 0;
                this.angle+=1;
            }else{
                z = this.r;
                y = this.r/2;
                this.r +=.5;
            }
            y = this.r/2;
        }
        this.lookTo(-0.3, th, [x,y,z]);
        //console.log(th, z);
        // if((this.angle<90&&this.angle>15)||(this.angle<345&&this.angle>270)){
        //     console.log('fast', this.angle);
        //     this.angle+=1;
        // }else{
        //     this.angle+=.5;
        // }
        
        this.future(10).birdeye();
    }

    orbit(){
    }

    // updateMotion(dx, dy) {
    //     if(this.swoopPath == "return"){
    //         return;
    //     }
    //     const JOYSTICK_V = 0.000030;
    //     const MAX_V = 0.015;
    //     const MAX_SPIN = 0.0004;
    //     let v = dy * JOYSTICK_V;
    //     v = Math.min(Math.max(v, -MAX_V), MAX_V);
    //     const yaw = dx * (this.isMobile ? -2.5 * MAX_SPIN : -MAX_SPIN);
    //     this.spin = q_euler(0, yaw ,0);
    //     this.velocity = [0, 0, v];
    //     this.maybeLeavePresentation();
    // }

    teardown() {
        if (!this.isMyPlayerPawn) {return;}
        console.log("avatar event handler detached");
        this.removeFirstResponder("pointerTap", {ctrlKey: true, altKey: true}, this);
        this.removeEventListener("pointerTap", this.pointerTap);

        this.removeFirstResponder("pointerDown", {ctrlKey: true, altKey: true}, this);
        this.removeLastResponder("pointerDown", {}, this);
        this.removeEventListener("pointerDown", this.pointerDown);

        this.removeFirstResponder("pointerMove", {ctrlKey: true, altKey: true}, this);
        this.removeLastResponder("pointerMove", {}, this);
        this.removeEventListener("pointerMove", this.pointerMove);

        this.removeLastResponder("pointerUp", {ctrlKey: true, altKey: true}, this);
        this.removeEventListener("pointerUp", this.pointerUp);

        this.removeLastResponder("pointerWheel", {ctrlKey: true, altKey: true}, this);
        this.removeEventListener("pointerWheel", this.pointerWheel);

        this.removeEventListener("pointerDoubleDown", "onPointerDoubleDown");
        this.removeFirstResponder("pointerDoubleDown", {shiftKey: true}, this);
        this.removeEventListener("pointerDoubleDown", this.addSticky);

        this.removeLastResponder("keyDown", {ctrlKey: true}, this);
        this.removeEventListener("keyDown", this.keyDown);

        this.removeLastResponder("keyUp", {ctrlKey: true}, this);
        this.removeEventListener("keyUp", this.keyUp);
    }
}

export default {
    modules: [
        {
            name: "AvatarEventHandler",
            pawnBehaviors: [AvatarPawn],
        }
    ]
}

/* globals Microverse */
/*
class LoadPawn {
    setup() {
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
    }
    modelLoaded() {
        if (this.shape.children.length === 1) {
            this.load();
        }
    }
    load() {
        let helmet = this.shape.children.find((c) => c.name === "helmet");
        if (helmet) {
            helmet.removeFromParent();
        }
        let dataLocation = "./assets/3D/Drone2.glb";
        this._model3dLoading = dataLocation;
        let assetManager = this.service("AssetManager").assetManager;
        this.getBuffer(dataLocation).then((buffer) => {
            assetManager.setCache(dataLocation, buffer, this.id);
            return assetManager.load(buffer, "glb", Microverse.THREE);
        }).then((obj) => {
            if (dataLocation !== this._model3dLoading) {
                console.log("model load has been superseded");
                return;
            }
            obj.name = "helmet";
            obj.position.set(0, 2, 0);
            this.shape.add(obj);
        });
    }
}
export default {
    modules: [
        {
            name: "GLBLoader",
            pawnBehaviors: [LoadPawn]
        }
    ]
}*/
