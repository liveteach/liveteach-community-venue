import { engine, Transform, GltfContainer } from "@dcl/sdk/ecs"
import { Vector3, Quaternion } from "@dcl/sdk/math"

export class Building {
    constructor() {
        let TeachingCommunityVenue = engine.addEntity()
        Transform.create(TeachingCommunityVenue, {
            position: Vector3.create(0, 0.02, 0),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(TeachingCommunityVenue, { src: "models/Building/TeachingCommunityVenue.glb" })

        let TeachingCommunityWelcomeZoneInterior = engine.addEntity()
        Transform.create(TeachingCommunityWelcomeZoneInterior, {
            position: Vector3.create(0, 0.02, 0),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(TeachingCommunityWelcomeZoneInterior, { src: "models/Building/TeachingCommunityWelcomeZoneInterior.glb" })

        let TeachingCommunityInteriorLectureTheatre01 = engine.addEntity()
        Transform.create(TeachingCommunityInteriorLectureTheatre01, {
            position: Vector3.create(0, 0.02, 0),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(TeachingCommunityInteriorLectureTheatre01, { src: "models/Building/TeachingCommunityInteriorLectureTheatre01.glb" })

        let TeachingCommunityInteriorLectureTheatre02 = engine.addEntity()
        Transform.create(TeachingCommunityInteriorLectureTheatre02, {
            position: Vector3.create(0, 0.02, 0),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(TeachingCommunityInteriorLectureTheatre02, { src: "models/Building/TeachingCommunityInteriorLectureTheatre02.glb" })

        let TeachingCommunityInteriorTeachingRoom01 = engine.addEntity()
        Transform.create(TeachingCommunityInteriorTeachingRoom01, {
            position: Vector3.create(0, 0.02, 0),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(TeachingCommunityInteriorTeachingRoom01, { src: "models/Building/TeachingCommunityInteriorTeachingRoom01.glb" })

        let TeachingCommunityInteriorTeachingRoomLobby = engine.addEntity()
        Transform.create(TeachingCommunityInteriorTeachingRoomLobby, {
            position: Vector3.create(0, 0.02, 0),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(TeachingCommunityInteriorTeachingRoomLobby, { src: "models/Building/TeachingCommunityInteriorTeachingRoomLobby.glb" })

        let TeachingCommunityInteriorTeachingRoom02 = engine.addEntity()
        Transform.create(TeachingCommunityInteriorTeachingRoom02, {
            position: Vector3.create(0, 0.02, 0),
            rotation: Quaternion.fromEulerDegrees(0, 180, 0),
            scale: Vector3.create(1, 1, 1)
        })
        GltfContainer.create(TeachingCommunityInteriorTeachingRoom02, { src: "models/Building/TeachingCommunityInteriorTeachingRoom02.glb" })

    }
}