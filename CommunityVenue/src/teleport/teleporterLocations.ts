import { Vector3 } from "@dcl/sdk/math";

export class TeleportLocation{
    constructor(public position:Vector3, public cameraTarget:Vector3){}
}

export class TeleporterLocations{
    static LectureTheatre1():TeleportLocation{
        return new TeleportLocation(Vector3.create(12.66,8.2,29.51),Vector3.create(13,8.2,43.97))
    }
    static LectureTheatre2():TeleportLocation{
        return new TeleportLocation(Vector3.create(35.5,8.2,29.5),Vector3.create(35.5,8.2,43.97))
    }
    static ClassRoom1():TeleportLocation{
        return new TeleportLocation(Vector3.create(38.3,9,5),Vector3.create(38.3,9,19.25))
    }
    static ClassRoom2():TeleportLocation{
        return new TeleportLocation(Vector3.create(38.3,15,5),Vector3.create(38.3,15,19.25))
    }
}