import { Quaternion, Vector3 } from "@dcl/sdk/math";
import { Lift } from "./lift";
import { engine } from "@dcl/sdk/ecs";

export class LiftManager {
    static lifts:Lift[] = []
    
    constructor(){
        LiftManager.lifts.push(new Lift(Vector3.create(28.235,0,19.08),Quaternion.fromEulerDegrees(0,0,0),0.1,13.1,[0.9,7.71,13.81]))

        engine.addSystem(this.update)
    }

    update(dt:number){
        LiftManager.lifts.forEach(lift => {
            lift.update(dt)
        }); 
    }
}    