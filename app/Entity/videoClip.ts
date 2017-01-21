import { TimeCode } from './timeCode';

export class VideoClip {
    Id: string;
    Name: string;
    Description: string;
    Standard: string;
    Definition: string;
    StartTimecode: string;
    EndTimecode: string;
    Duration: TimeCode;
}

export class ReelVideoClip extends VideoClip {
    order: number;
}

export class ReelVideo {
    Name: string;
    Clips: Array<ReelVideoClip>;
    Duration: TimeCode;
    constructor() {
        this.Clips = new Array<ReelVideoClip>();
    }
}
