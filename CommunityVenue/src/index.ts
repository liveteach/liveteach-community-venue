import {
  Animator,
  AudioSource,
  AvatarAttach,
  engine,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  pointerEventsSystem,
  Transform,
  VisibilityComponent
} from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { initAssetPacks } from '@dcl/asset-packs/dist/scene-entrypoint'

// You can remove this if you don't use any asset packs
initAssetPacks(engine, pointerEventsSystem, {
  Animator,
  AudioSource,
  AvatarAttach,
  Transform,
  VisibilityComponent,
  GltfContainer
})


export function main() {
  let TeachingCommunityVenue = engine.addEntity()
Transform.create(TeachingCommunityVenue, {
    position: Vector3.create(0,0.02,0),
    rotation: Quaternion.fromEulerDegrees(0,180,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityVenue, {src:"models/TeachingCommunityVenue.glb"})

let TeachingCommunityWelcomeZoneInterior = engine.addEntity()
Transform.create(TeachingCommunityWelcomeZoneInterior, {
    position: Vector3.create(0,0.02,0),
    rotation: Quaternion.fromEulerDegrees(0,180,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityWelcomeZoneInterior, {src:"models/TeachingCommunityWelcomeZoneInterior.glb"})

let TeachingCommunityInteriorLectureTheatre01 = engine.addEntity()
Transform.create(TeachingCommunityInteriorLectureTheatre01, {
    position: Vector3.create(0,0.02,0),
    rotation: Quaternion.fromEulerDegrees(0,180,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityInteriorLectureTheatre01, {src:"models/TeachingCommunityInteriorLectureTheatre01.glb"})

let TeachingCommunityInteriorLectureTheatre02 = engine.addEntity()
Transform.create(TeachingCommunityInteriorLectureTheatre02, {
    position: Vector3.create(0,0.02,0),
    rotation: Quaternion.fromEulerDegrees(0,180,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityInteriorLectureTheatre02, {src:"models/TeachingCommunityInteriorLectureTheatre02.glb"})

let TeachingCommunityInteriorTeachingRoom01 = engine.addEntity()
Transform.create(TeachingCommunityInteriorTeachingRoom01, {
    position: Vector3.create(0,0.02,0),
    rotation: Quaternion.fromEulerDegrees(0,180,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityInteriorTeachingRoom01, {src:"models/TeachingCommunityInteriorTeachingRoom01.glb"})

let TeachingCommunityInteriorTeachingRoomLobby = engine.addEntity()
Transform.create(TeachingCommunityInteriorTeachingRoomLobby, {
    position: Vector3.create(0,0.02,0),
    rotation: Quaternion.fromEulerDegrees(0,180,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityInteriorTeachingRoomLobby, {src:"models/TeachingCommunityInteriorTeachingRoomLobby.glb"})

let TeachingCommunityInteriorTeachingRoom02 = engine.addEntity()
Transform.create(TeachingCommunityInteriorTeachingRoom02, {
    position: Vector3.create(0,0.02,0),
    rotation: Quaternion.fromEulerDegrees(0,180,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityInteriorTeachingRoom02, {src:"models/TeachingCommunityInteriorTeachingRoom02.glb"})


}