class AvatarPawn {
    setup() {
        this.subscribe(this.id, "3dModelLoaded", "modelLoaded");
        if (!this.isMyPlayerPawn) {return;}

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

export class WalkerPawn {
    walkTerrain(vq) {
        let walkLayer = this.service("ThreeRenderManager").threeLayer("walk");
        if (!walkLayer) return vq;

        let collideList = walkLayer.filter(obj => obj.collider);
        if (collideList.length === 0) {return vq;}
        return this.collideBVH(collideList, vq);
    }

    checkPortal(vq, _time, _delta) {
        let collided = this.collidePortal(vq);
        return [vq, collided];
    }

    checkFall(vq, _time, _delta) {
        if (!this.isFalling) {return [vq, false];}
        let v = vq.v;
        v = [v[0], v[1] - this.fallDistance, v[2]];
        this.isFalling = false;
        if (v[1] < this.maxFall) {
            this.goHome();
            return [{v: [0, 0, 0], q: [0, 0, 0, 1]}, true];
        }
        return [{v: v, q: vq.q}, false];
    }

    backoutFromFall(vq, _time, _delta) {
        if (!this.checkFloor(vq)) {
            // if the new position leads to a position where there is no walkable floor below
            // it tries to move the avatar the opposite side of the previous good position.
            vq.v = Microverse.v3_lerp(this.lastCollideTranslation, vq.v, -1);
        } else {
            this.lastCollideTranslation = vq.v;
        }
        return [vq, false];
    }

    bvh(vq, time, _delta) {
        let collide_throttle = this.collide_throttle || 50;

        if ((this.actor.fall || this.spectator) && time - this.lastCollideTime > collide_throttle) {
            this.lastCollideTime = time;
            let result = this.checkFall(vq);
            if (result[1]) {return result;}
            vq = this.walkTerrain(result[0]);
        }
        return [vq, false];
    }
}

export default {
    modules: [
        {
            name: "AvatarEventHandler",
            pawnBehaviors: [AvatarPawn],
        },
        {
            name: "BuiltinWalker",
            pawnBehaviors: [WalkerPawn],
        }
    ]
}

/* globals Microverse */
