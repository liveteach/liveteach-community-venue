import { Transform, engine } from "@dcl/sdk/ecs";
import { Door } from "./door";
import { Vector3 } from "@dcl/sdk/math";

export class DoorManager {

    doors:Door[] = []

    constructor(){
        //Load doors
        this.doors.push(new Door(Vector3.create(2.345,0,8.93),Vector3.create(0,0,0)))
        this.doors.push(new Door(Vector3.create(8.705,0,0.2),Vector3.create(0,90,0)))
        this.doors.push(new Door(Vector3.create(38.66,0,1.345),Vector3.create(0,90,0)))
        this.doors.push(new Door(Vector3.create(38.66,0,19.635),Vector3.create(0,90,0)))

        engine.addSystem(this.update.bind(this))
    }

    update(){
        let playerPos:Vector3 = Transform.get(engine.PlayerEntity).position

        this.doors.forEach(door => {
            let distance = Vector3.distance(playerPos,Transform.get(door.entity).position)
            if(distance<5){
                door.open()
            } else if (distance > 9){
                door.close()
            }
        });
    }
} 