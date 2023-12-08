import { Building } from './building'
import * as dclu from '@dclu/dclu-liveteach'
import * as ecs from "@dcl/sdk/ecs"
import { setupUi } from './ui'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { DisplayPanel } from './displayPanel'
import { Podium } from './podium/podium'
import { ClassroomManager } from '@dclu/dclu-liveteach/src/classroom'
import { PeerToPeerChannel } from "@dclu/dclu-liveteach/src/classroom/comms/peerToPeerChannel";
import * as classroom1Config from "./classroomConfigs/classroom1Config.json"
import * as classroom2Config from "./classroomConfigs/classroom2Config.json"
import * as classroom3Config from "./classroomConfigs/classroom3Config.json"
import * as classroom4Config from "./classroomConfigs/classroom3Config.json"
import { DoorManager } from './doors/doorManager'
import { movePlayerTo } from '~system/RestrictedActions'
import { SeatingData } from './SeatingData'
import { LiftManager } from './lifts/liftManager'

export function main() {

    dclu.setup({
        ecs: ecs,
        Logger: null
    })
    setupUi()

    new Building() 
    new LiftManager()
    new DoorManager()

    const communicationChannel = new PeerToPeerChannel()
    ClassroomManager.Initialise(communicationChannel, null, null, true)

    // Add wallet address here for testing
    //ClassroomManager.AddTestTeacherAddress("0x0ced09e3728f7682e0fedf50f5fe1fe2e59add7b")

    //////////// Class 1 ////////////
    ClassroomManager.RegisterClassroom(classroom1Config)
    const podium1 = new Podium(Vector3.create(16,6.9,30.3), Vector3.create(0,-90,0))
    addScreen(Vector3.create(0.35, 1.7, -0.06), Quaternion.fromEulerDegrees(45, 90, 0), Vector3.create(0.2, 0.2, 0.2), podium1.entity)
    addScreen(Vector3.create(11.9,7,45.58), Quaternion.fromEulerDegrees(0, 0, 0), Vector3.create(8.15,8.15,8.15),null)

    //////////// Class 2 ////////////
    ClassroomManager.RegisterClassroom(classroom2Config)
    const podium2 = new Podium(Vector3.create(33,6.9,30.3), Vector3.create(0,-90,0))
    addScreen(Vector3.create(0.35, 1.7, -0.06), Quaternion.fromEulerDegrees(45, 90, 0), Vector3.create(0.2, 0.2, 0.2), podium2.entity)
    addScreen(Vector3.create(36.9,7,45.58), Quaternion.fromEulerDegrees(0, 0, 0), Vector3.create(8.15,8.15,8.15),null)

    //////////// Class 3 ////////////
    ClassroomManager.RegisterClassroom(classroom3Config)
    const podium3 = new Podium(Vector3.create(32,6.9,16.8), Vector3.create(0,90,0))
    addScreen(Vector3.create(0.35, 1.7, -0.06), Quaternion.fromEulerDegrees(45, 90, 0), Vector3.create(0.2, 0.2, 0.2), podium3.entity)
    addScreen(Vector3.create(39.15,9.73,20.5), Quaternion.fromEulerDegrees(0,0,0), Vector3.create(4.1,4.1,4.1),null)

    //////////// Class 4 ////////////
    ClassroomManager.RegisterClassroom(classroom4Config)
    const podium4 = new Podium(Vector3.create(32,6.9+6.1,16.8), Vector3.create(0,90,0))
    addScreen(Vector3.create(0.35, 1.7, -0.06), Quaternion.fromEulerDegrees(45, 90, 0), Vector3.create(0.2, 0.2, 0.2), podium4.entity)
    addScreen(Vector3.create(39.15,9.73+6.1,20.5), Quaternion.fromEulerDegrees(0,0,0), Vector3.create(4.1,4.1,4.1),null)
    
    // Add seating 
     let seatingData: SeatingData = new SeatingData()

    // Apply offset
    let offset = Vector3.create(0, 0.2, 0)
    seatingData.seats.forEach((seat,index) => {
        // update ids after combining
        seat.id = index
        seat.position = Vector3.add(seat.position, offset)
        seat.lookAtTarget = Vector3.create(seat.position.x,seat.position.y,seat.position.z+5)
    });

    //Debugging  
    // seatingData.seats.forEach(seat => {
    //   let entity: ecs.Entity = ecs.engine.addEntity()
    //   ecs.Transform.create(entity, {position:seat.position, rotation: Quaternion.fromEulerDegrees(seat.rotation.x,seat.rotation.y,seat.rotation.z)})
    //   ecs.MeshRenderer.setBox(entity)
    // });

    new dclu.seating.SeatingController(seatingData, Vector3.create(12, -50, 19), Vector3.create(10, 7, 12), true)
}

export function addScreen(_position: Vector3, _rotation: Quaternion, _scale: Vector3, _parent: ecs.Entity): void {
    ClassroomManager.AddScreen(_position, _rotation, _scale, _parent)
  }