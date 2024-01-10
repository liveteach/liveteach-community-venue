import { AudioSource, Entity, MeshRenderer, Transform, engine } from "@dcl/sdk/ecs";
import { Vector3 } from "@dcl/sdk/math";
import { AudioEntity } from "./audioEntity";

export class AudioManager {

  static slideDoorEntity: AudioEntity
  static swingDoorEntity: AudioEntity
  static elevatorAudio: AudioEntity
  static drawOpen: AudioEntity
  static drawClose: AudioEntity
  static ovenDoorOpen: AudioEntity
  static ovenDoorClose: AudioEntity
  static dialTurn: AudioEntity
  static success: AudioEntity

  constructor() {

    // Building
    AudioManager.slideDoorEntity = new AudioEntity("audio/sliding-doors.mp3", 0.75, 3)
    AudioManager.swingDoorEntity = new AudioEntity("audio/swingDoor.mp3", 1, 1)
    AudioManager.elevatorAudio = new AudioEntity("audio/floatingElevator.wav", 0.75, 1)
  }

  static playSlideDoor(_position: Vector3): void {
    AudioManager.slideDoorEntity.playSound(_position)
  }

  static playSwingDoor(_position: Vector3): void {
    AudioManager.swingDoorEntity.playSound(_position)
  }

  static playElevator(_position: Vector3): void {
    AudioManager.elevatorAudio.playSound(_position)
  }
} 