import { Entity, GltfContainer, InputAction, MeshCollider, MeshRenderer, Transform, TransformTypeWithOptionals, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { TeleportLocation, TeleporterLocations } from "./teleporterLocations";
import { movePlayerTo } from "~system/RestrictedActions";

export class TeleporterBoard {
    entity: Entity

    constructor(_transform: TransformTypeWithOptionals) {
        this.entity = engine.addEntity()

        GltfContainer.create(this.entity, { "src": "models/Building/TeachingCommunityTeleport.glb" })
        Transform.create(this.entity, _transform)

        this.createButton(this.entity, Vector3.create(-0.45,2.48,0.81), TeleporterLocations.ClassRoom1())
        this.createButton(this.entity, Vector3.create(-0.45,2.13,0.81), TeleporterLocations.ClassRoom2())
        this.createButton(this.entity, Vector3.create(-0.45,1.78,0.81), TeleporterLocations.LectureTheatre1())
        this.createButton(this.entity, Vector3.create(-0.45,1.43,0.81), TeleporterLocations.LectureTheatre2())

    } 

    createButton(_parent: Entity, _position:Vector3, _teleportLocation:TeleportLocation){
        let teleportButton: Entity = engine.addEntity()
        Transform.create(teleportButton,{
            parent: _parent,
            position:_position,
            scale: Vector3.create(0.2,0.25,1.1)
        })
        //MeshRenderer.setBox(teleportButton)
        MeshCollider.setBox(teleportButton)

        pointerEventsSystem.onPointerDown(
            {
                entity: teleportButton,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: "Teleport"
                }
            },
            function () {
                movePlayerTo({newRelativePosition:_teleportLocation.position, cameraTarget: _teleportLocation.cameraTarget})
            }
        )
    } 
}