import { Building } from './building'
import * as dclu from '@dclu/dclu-liveteach'
import * as ecs from "@dcl/sdk/ecs"
import { setupUi } from './ui'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Podium } from './podium/podium'
import { ClassroomManager, ControllerUI } from '@dclu/dclu-liveteach/src/classroom'
import { PeerToPeerChannel } from "@dclu/dclu-liveteach/src/classroom/comms/peerToPeerChannel";
import * as classroom1Config from "./classroomConfigs/classroom1Config.json"
import * as classroom2Config from "./classroomConfigs/classroom2Config.json"
import * as classroom3Config from "./classroomConfigs/classroom3Config.json"
import * as classroom4Config from "./classroomConfigs/classroom4Config.json"
import { DoorManager } from './doors/doorManager'
import { SeatingData } from './SeatingData'
import { LiftManager } from './lifts/liftManager'
import { AudioManager } from './audio/audioManager'
import { GetCurrentRealmResponse, getCurrentRealm } from "~system/EnvironmentApi"
import { InteractiveModel } from "../contentUnits/InteractiveModel/interactiveModel"
import { Poll } from "../contentUnits/poll/poll"
import { Quiz } from "../contentUnits/quiz/quiz"
import { BakeryGame } from '../contentUnits/Bakery/bakeryGame'
import { DeepLinkingSpawner } from './teleport/deepLinkingSpawner'
import { TeleporterBoard } from './teleport/teleporterBoard'

let devLiveTeachContractAddress: string = "0xf44b11C7c7248c592d0Cc1fACFd8a41e48C52762"
let devTeachersContractAddress: string = "0x15eD220A421FD58A66188103A3a3411dA9d22295"

export function main() {
    const communicationChannel = new PeerToPeerChannel()

    let useDev = false;
    if (useDev) {
        ClassroomManager.Initialise(communicationChannel, devLiveTeachContractAddress, devTeachersContractAddress, false)
    }
    else {
        // mainnet
        ClassroomManager.Initialise(communicationChannel, undefined, undefined, false)
    }

    //////////// Class 1 - Lecture Theatre 1 (left) ////////////
    ClassroomManager.RegisterClassroom(classroom1Config)
    const podium1 = new Podium(Vector3.create(16, 6.9, 30.3), Vector3.create(0, -90, 0))
    addScreen(classroom1Config.classroom.guid, Vector3.create(0.35, 1.7, -0.06), Quaternion.fromEulerDegrees(45, 90, 0), Vector3.create(0.2, 0.2, 0.2), podium1.entity)
    addScreen(classroom1Config.classroom.guid, Vector3.create(11.9, 7, 45.58), Quaternion.fromEulerDegrees(0, 0, 0), Vector3.create(8.15, 8.15, 8.15), null)

    //////////// Class 2 - Lecture Theatre 2 (right) ////////////
    ClassroomManager.RegisterClassroom(classroom2Config)
    const podium2 = new Podium(Vector3.create(33, 6.9, 30.3), Vector3.create(0, -90, 0))
    addScreen(classroom2Config.classroom.guid, Vector3.create(0.35, 1.7, -0.06), Quaternion.fromEulerDegrees(45, 90, 0), Vector3.create(0.2, 0.2, 0.2), podium2.entity)
    addScreen(classroom2Config.classroom.guid, Vector3.create(36.9, 7, 45.58), Quaternion.fromEulerDegrees(0, 0, 0), Vector3.create(8.15, 8.15, 8.15), null)

    //////////// Class 3 - Classroom 1 (bottom) ////////////
    ClassroomManager.RegisterClassroom(classroom3Config)
    const podium3 = new Podium(Vector3.create(32, 6.9, 16.8), Vector3.create(0, 90, 0))
    addScreen(classroom3Config.classroom.guid, Vector3.create(0.35, 1.7, -0.06), Quaternion.fromEulerDegrees(45, 90, 0), Vector3.create(0.2, 0.2, 0.2), podium3.entity)
    addScreen(classroom3Config.classroom.guid, Vector3.create(39.15, 9.73, 20.5), Quaternion.fromEulerDegrees(0, 0, 0), Vector3.create(4.1, 4.1, 4.1), null)

    //////////// Class 4 - Classroom 2 (top) ////////////
    ClassroomManager.RegisterClassroom(classroom4Config)
    const podium4 = new Podium(Vector3.create(32, 6.9 + 6.1, 16.8), Vector3.create(0, 90, 0))
    addScreen(classroom4Config.classroom.guid, Vector3.create(0.35, 1.7, -0.06), Quaternion.fromEulerDegrees(45, 90, 0), Vector3.create(0.2, 0.2, 0.2), podium4.entity)
    addScreen(classroom4Config.classroom.guid, Vector3.create(39.15, 9.73 + 6.1, 20.5), Quaternion.fromEulerDegrees(0, 0, 0), Vector3.create(4.1, 4.1, 4.1), null)


    //Register content units
    ClassroomManager.RegisterContentUnit("poll", new Poll())
    ClassroomManager.RegisterContentUnit("quiz", new Quiz())
    ClassroomManager.RegisterContentUnit("interactive_model", new InteractiveModel())
    ClassroomManager.RegisterContentUnit("bakery", new BakeryGame())

    new DeepLinkingSpawner() // Spawn the user at their class room if they come from a URL with their class room ID


    dclu.setup({
        ecs: ecs,
        Logger: null
    })
    setupUi()

    new AudioManager()
    new Building()
    new LiftManager()
    new DoorManager()

    // Add seating 
    let seatingData: SeatingData = new SeatingData()

    // Apply offset
    let offset = Vector3.create(0, 0.2, 0)
    seatingData.seats.forEach((seat, index) => {
        // update ids after combining
        seat.id = index
        seat.position = Vector3.add(seat.position, offset)
        seat.lookAtTarget = Vector3.create(seat.position.x, seat.position.y, seat.position.z + 5)
    });

    // Teleporters
    new TeleporterBoard({ // Main Entrance
        position: Vector3.create(20, 0, 11.5),
        rotation: Quaternion.fromEulerDegrees(0, 180, 0)
    })
    new TeleporterBoard({ // Back Entrance
        position: Vector3.create(26.5, 0, 12.4),
        rotation: Quaternion.fromEulerDegrees(0, 0, 0)
    })
    new TeleporterBoard({ // Between Theatre 1&2
        position: Vector3.create(23.5, 6.8, 30.1),
        rotation: Quaternion.fromEulerDegrees(0, 90, 0)
    })
    new TeleporterBoard({ // Class room 1 hall
        position: Vector3.create(26.6, 6.8, 11.53),
        rotation: Quaternion.fromEulerDegrees(0, 0, 0)
    })
    new TeleporterBoard({ // Class room 2 hall
        position: Vector3.create(26.6, 12.9, 11.53),
        rotation: Quaternion.fromEulerDegrees(0, 0, 0)
    })


    //ControllerUI.Show()

    //Debugging  
    // seatingData.seats.forEach(seat => {
    //   let entity: ecs.Entity = ecs.engine.addEntity()
    //   ecs.Transform.create(entity, {position:seat.position, rotation: Quaternion.fromEulerDegrees(seat.rotation.x,seat.rotation.y,seat.rotation.z)})
    //   ecs.MeshRenderer.setBox(entity)
    // });

    new dclu.seating.SeatingController(seatingData, Vector3.create(12, -50, 19), Vector3.create(10, 7, 12), true)
}

export function addScreen(_guid: string, _position: Vector3, _rotation: Quaternion, _scale: Vector3, _parent: ecs.Entity): void {
    ClassroomManager.AddScreen(_guid, _position, _rotation, _scale, _parent)
}