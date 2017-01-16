import { timeCode } from './timeCode';

/**
 * videoClip
 */
export class videoClip {
    Id: string;
    Name: string;
    Description: string;
    Standard: string;
    Definition: string;
    StartTimecode: string;
    EndTimecode: string;
    Duration: timeCode;
}

export class reelVideoClip extends videoClip {
    order: number;
}

export class reelVideo {
    Name: string;
    Clips: Array<reelVideoClip>;
    Duration: timeCode;
    constructor() {
        this.Clips = new Array<reelVideoClip>();
    }
}
