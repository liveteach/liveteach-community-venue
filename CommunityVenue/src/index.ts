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
    position: Vector3.create(48,0.02,48),
    rotation: Quaternion.fromEulerDegrees(0,0,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityVenue, {src:"models/TeachingCommunityVenue.glb"})

let TeachingCommunityWelcomeZoneInterior = engine.addEntity()
Transform.create(TeachingCommunityWelcomeZoneInterior, {
    position: Vector3.create(48,0.02,48),
    rotation: Quaternion.fromEulerDegrees(0,0,0),
    scale: Vector3.create(1,1,1)
})
GltfContainer.create(TeachingCommunityWelcomeZoneInterior, {src:"models/TeachingCommunityWelcomeZoneInterior.glb"})
}