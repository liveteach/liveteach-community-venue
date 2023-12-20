import { IContentUnit } from "@dclu/dclu-liveteach/src/contentUnits";
import { Kitchen } from "./kitchen";
import { Quaternion, Vector3 } from "@dcl/sdk/math";

export class BakeryGame implements IContentUnit{
    kitchen:Kitchen = null
    
    constructor() { 
        
    }

    start(_data: any): void {
        if(this.kitchen!=null){
            this.kitchen.destroy()
        }

        this.kitchen = new Kitchen({
            position:Vector3.create(37.2,12.9,16.5), 
            rotation: Quaternion.fromEulerDegrees(0,180,0) 
        })
    }  

    end(): void {
        if(this.kitchen!=null){
            this.kitchen.destroy()
        }
    }

    update(_data: any): void {
     
    }
}