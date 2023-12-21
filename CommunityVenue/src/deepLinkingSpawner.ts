import { Transform, engine } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { getExplorerConfiguration } from "~system/EnvironmentApi";
import { movePlayerTo } from "~system/RestrictedActions";

export class DeepLinkingSpawner {
    teleportLocation:Vector3
    teleportCameraTarget:Vector3
    teleported:boolean = false
    canTeleport:boolean = false

    constructor() {
        // See if the users URL has a class room ID. If it does take them to that class room.
        getExplorerConfiguration({}).then((data) => {
            if (data.clientUri.includes("classid")) {
                // Yep, we got one. Load it.
                var keyValPairs = [];
                var params = {};
                keyValPairs = data.clientUri.split('&');
                keyValPairs.forEach(pairNum => {
                    var key = pairNum.split('=')[0];
                    if (key.length) {  
                        if (typeof params[key] === 'undefined') {
                            params[key] = [];
                        }
                        params[key].push(pairNum.split('=')[1]);
                    }
                });

                switch (params["classid"][0]) {
                    case "c73c16d2-e2a7-4acc-bdda-fb2205b5d634" : // LECTURE THEATRE 1
                        this.teleportLocation = Vector3.create(12.66,8.2,29.51)
                        this.teleportCameraTarget = Vector3.create(13,8.2,43.97)
                        this.canTeleport = true
                        break
                    case "acbe1e1a-29e6-4dc3-a73d-375f1c756185" : // LECTURE THEATRE 2
                        this.teleportLocation = Vector3.create(35.5,8.2,29.5)
                        this.teleportCameraTarget = Vector3.create(35.5,8.2,43.97)
                        this.canTeleport = true
                        break
                    case "9222a104-9eae-41b4-87b1-ec4b9116e47b" : // CLASSROOM 1
                        this.teleportLocation = Vector3.create(38.3,9,5)
                        this.teleportCameraTarget = Vector3.create(38.3,9,19.25)
                        this.canTeleport = true
                        break
                    case "424c8594-8fe0-4240-af9b-02f8c19a2929" : // CLASSROOM 2
                        this.teleportLocation = Vector3.create(38.3,15,5)
                        this.teleportCameraTarget = Vector3.create(38.3,15,19.25)
                        this.canTeleport = true
                        break
                }  
            }
        })
        engine.addSystem(this.update.bind(this))
    }

    update(_dt:number){
        if(!this.teleported && this.canTeleport){
            // Try and teleport
            if(Transform.get(engine.PlayerEntity).position.y != 0){
                // Teleport
                movePlayerTo({newRelativePosition:this.teleportLocation,cameraTarget:this.teleportCameraTarget})
                if(Transform.get(engine.PlayerEntity).position.y>2){
                    this.teleported = true // We moved from the bottom floor
                }
            }

        }
    }
}