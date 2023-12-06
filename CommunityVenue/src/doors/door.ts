import { Animator, Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs";
import { Quaternion, Vector3 } from "@dcl/sdk/math";

export class Door {

    entity: Entity
    opened: boolean = true

    constructor(_position: Vector3, _rotation: Vector3) {

        this.entity = engine.addEntity()

        Transform.create(this.entity, {
            position: _position,
            rotation: Quaternion.fromEulerDegrees(_rotation.x, _rotation.y, _rotation.z)
        })

        GltfContainer.create(this.entity, { src: "models/Building/Doors.glb" })

        Animator.create(this.entity, {
            states: [
                {
                    clip: 'OpenDoor',
                    playing: false,
                    loop: false,
                    speed: 4
                },
                {
                    clip: 'CloseDoor',
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
            Animator.playSingleAnimation(this.entity, "OpenDoor")
        }
    }

    close() {
        if (this.opened) {
            this.opened = false
            Animator.playSingleAnimation(this.entity, "CloseDoor")
        }
    }
}