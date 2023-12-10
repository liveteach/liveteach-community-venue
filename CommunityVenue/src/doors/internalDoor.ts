import { Entity, engine, Transform, GltfContainer, Animator, InputAction, pointerEventsSystem } from "@dcl/sdk/ecs"
import { Vector3, Quaternion } from "@dcl/sdk/math"
import { movePlayerTo } from "~system/RestrictedActions"
import * as utils from '@dcl-sdk/utils'
import { AudioManager } from "../audio/audioManager"

export class InternalDoor {
    entity: Entity
    opened: boolean = true
    blockClick: boolean = false

    constructor(_position: Vector3, _rotation: Vector3) {

        this.entity = engine.addEntity()

        Transform.create(this.entity, {
            position: _position,
            rotation: Quaternion.fromEulerDegrees(_rotation.x, _rotation.y, _rotation.z)
        })

        GltfContainer.create(this.entity, { src: "models/Building/InternalDoor.glb" })

        let self = this

        pointerEventsSystem.onPointerDown(
            {
                entity: this.entity,
                opts: {
                    button: InputAction.IA_POINTER, 
                    hoverText: "Interact"
                }
            },
            function () { 
                if(!self.blockClick){
                    self.blockClick = true
                    if(self.opened){
                        self.close() 
                    } else {
                        self.open()
                    }
                    utils.timers.setTimeout(() => {
                        self.blockClick = false
                    }, 1300);
                }
            }
        )

        Animator.create(this.entity, {
            states: [
                {
                    clip: 'DoorOpen',
                    playing: false,
                    loop: false,
                    speed: 4
                },
                {
                    clip: 'DoorClose',
                    playing: false,
                    loop: false,
                    speed: 4
                },
            ], 
        })

        this.close()
    }

    open() {
        if (!this.opened) {
            this.opened = true
            Animator.playSingleAnimation(this.entity, "DoorOpen",false)
            AudioManager.playSwingDoor(Transform.get(this.entity).position)
        }
    }

    close() {
        if (this.opened) {
            this.opened = false
            Animator.playSingleAnimation(this.entity, "DoorClose",false)
            AudioManager.playSwingDoor(Transform.get(this.entity).position)
        }
    }
}