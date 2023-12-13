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

  constructor() {

    // Building
    AudioManager.slideDoorEntity = new AudioEntity("audio/sliding-doors.mp3", 0.75, 3)
    AudioManager.swingDoorEntity = new AudioEntity("audio/swingDoor.mp3", 1, 1)
    AudioManager.elevatorAudio = new AudioEntity("audio/floatingElevator.wav", 0.75, 1)

    // Bakery
    AudioManager.drawOpen = new AudioEntity("audio/drawOpen.mp3", 0.75, 2)
    AudioManager.drawClose = new AudioEntity("audio/drawClose.mp3", 0.75, 2)
    AudioManager.ovenDoorOpen = new AudioEntity("audio/ovenOpen.mp3", 0.5, 1)
    AudioManager.ovenDoorClose = new AudioEntity("audio/ovenClose.mp3", 0.5, 1)

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

  static playDrawOpen(_position: Vector3): void {
    AudioManager.drawOpen.playSound(_position)
  }

  static playDrawClose(_position: Vector3): void {
    AudioManager.drawClose.playSound(_position)
  }

  static playOvenOpen(_position: Vector3): void {
    AudioManager.ovenDoorOpen.playSound(_position)
  }

  static playOvenClose(_position: Vector3): void {
    AudioManager.ovenDoorClose.playSound(_position)
  }

} 