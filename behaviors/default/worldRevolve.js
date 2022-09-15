class WorldPawn  {
    setup() {
        this.subscribe(this.id, "3dModelLoaded", "loaded");
    }
    loaded() {
        let avatarActor = this.actor.queryCards().find((c) => c.playerId === this.viewId);
        let avatar = Microverse.GetPawn(avatarActor.id);
        this.worldLoaded = true;
        // this is dubious from object oriented stand point to assign a value into a foreign object
        avatar.worldLoaded = true;
        if (avatar.avatarLoaded && this.worldLoaded) {
            this.publish(avatar.id, "startSwoopAnimation");
            //Microverse.sendToShell("hud", {joystick: false});
        }
    }
}
export default {
    modules: [
        /* ... */
        {
            name: "WorldPawn",
            pawnBehaviors: [WorldPawn],
        },
    ]
}