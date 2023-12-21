import { Entity, GltfContainer, Transform, TransformTypeWithOptionals, engine } from "@dcl/sdk/ecs";

export class TeleporterBoard {
    entity:Entity

    constructor(_transform:TransformTypeWithOptionals){
        this.entity = engine.addEntity()
        
        GltfContainer.create(this.entity, {"src":"models/Building/TeachingCommunityTeleport.glb"})
        Transform.create(this.entity,_transform)
    }
}