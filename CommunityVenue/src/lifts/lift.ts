import { Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/sdk/math";
import * as utils from '@dcl-sdk/utils'

export class Lift {

    lift:Entity
    minHeight:number
    maxHeight:number
    goingUp:boolean = true
    goingDown:boolean = false
    liftSpeed: number = 2

    pauseLiftTime:number = 1
    currentPauseLiftTime:number = 0

    inLift:boolean = false

    stops:number[] = []

    constructor(_position:Vector3, _rotation:Quaternion,_minHeight:number, _maxHeight:number, _stops:number[]){
        this.lift = engine.addEntity()

        this.stops = _stops
 
        this.minHeight = _minHeight
        this.maxHeight = _maxHeight

        GltfContainer.create(this.lift, {src: "models/Building/lift.glb"})
  
        Transform.create(this.lift,{
            position: Vector3.create(_position.x,this.minHeight,_position.z),
        })

      //  utils.triggers.enableDebugDraw(true)
  
        utils.triggers.addTrigger(
            this.lift,
            utils.NO_LAYERS,
            utils.LAYER_1,
            [{type:'box', position:Vector3.create(0,1,0),scale: Vector3.create(2,3,2)}],
            ()=>{
                // enter
                this.inLift = true
            },
            ()=>{
                // exit
                this.inLift = false
            },
            Color3.Red()
        )
    }  

    update(_dt:number){

        if(!this.inLift){
            this.currentPauseLiftTime = 0
        } else if(this.currentPauseLiftTime>0){
            this.currentPauseLiftTime-=_dt
            return
        }

        let playerPos = Transform.get(engine.PlayerEntity).position

        // Lift movement
        if(this.goingUp && this.inLift){
            Transform.getMutable(this.lift).position.y += _dt * this.liftSpeed
        } else if (this.goingDown && this.inLift){
            Transform.getMutable(this.lift).position.y -= _dt * this.liftSpeed
        }

        // Cap heights
        if(Transform.get(this.lift).position.y > this.maxHeight){
            Transform.getMutable(this.lift).position.y = this.maxHeight
            if(this.goingUp && this.inLift){
                this.currentPauseLiftTime = this.pauseLiftTime
            }
            this.goingUp = false
        }

        if(Transform.get(this.lift).position.y < this.minHeight){
            Transform.getMutable(this.lift).position.y = this.minHeight
            if(this.goingDown && this.inLift){
                this.currentPauseLiftTime = this.pauseLiftTime
            }
            this.goingDown = false 
        }

        // Player detection
        if(this.inLift){
            if(Transform.get(this.lift).position.y > this.maxHeight-0.2){
                if(!this.goingUp && !this.goingDown){
                    this.goingDown = true
                }
            }

            if(Transform.get(this.lift).position.y < this.minHeight+0.2){
                if(!this.goingUp && !this.goingDown){
                    this.goingUp = true
                }
            }
        } else {
            // Only do this if the player is standing on the floors

            let playerY = Number(Transform.get(engine.PlayerEntity).position.y.toFixed(2))
            let withinHeight:boolean = false
            
            this.stops.forEach(stop => {
                //console.log("PlayerY: " + playerY)
                if(playerY==stop){
                    withinHeight = true
                }
            });

            if(withinHeight){
                Transform.getMutable(this.lift).position.y = playerY-0.8 
            }
        }
        
        
        // else {
        //     // If player is a lower than the lift go get them
        //     if(playerPos.y+3<this.maxHeight){
        //         this.goingDown = true
        //         this.goingUp = false
        //     }

        //     // Same for above 
        //     if(playerPos.y-3>this.minHeight){
        //         this.goingUp = true
        //         this.goingDown = false
        //     }
        // }

    }
}