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
import { DoorManager } from './doors/doorManager'
import { movePlayerTo } from '~system/RestrictedActions'

export function main() {

    dclu.setup({
        ecs: ecs,
        Logger: null
    })
    setupUi()

    new Building() 
    new DoorManager()

    const communicationChannel = new PeerToPeerChannel()
    ClassroomManager.Initialise(communicationChannel, true)

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

    
     movePlayerTo({newRelativePosition: Vector3.create(38,10,5)})
}

export function addScreen(_position: Vector3, _rotation: Quaternion, _scale: Vector3, _parent: ecs.Entity): void {
    ClassroomManager.AddScreen(_position, _rotation, _scale, _parent)
  }