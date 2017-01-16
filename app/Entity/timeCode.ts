export class timeCode {
    hours: number;
    minutes: number;
    seconds: number;
    frames: number;
    frameRate: number;

    constructor(private timeCode: string, private standard: string) {
        var timeCodeArray = timeCode.split(':');
        if (timeCodeArray.length != 4) {
            console.log("Invalid timecode Value" + timeCode);
            throw new Error("Invalid timecode Value" + timeCode);
        }
        if (["PAL", "NTSC"].indexOf(standard) == -1) {
            console.log("Invalid video standard");
            throw new Error("Invalid video standard");
        }

        this.hours = this.convertToInt(timeCodeArray[0]);
        this.minutes = this.convertToInt(timeCodeArray[1]);
        this.seconds = this.convertToInt(timeCodeArray[2]);
        this.frames = this.convertToInt(timeCodeArray[3]);
        if (this.standard == "PAL") {
            this.frameRate = 25;
        } else if (this.standard == "NTSC") {
            this.frameRate = 30;
        }
    }

    private convertToInt(input: string): number {
        return parseInt(input, 10);
    }

    public getTimeCodeAsString(): string {
        return this.zeroPad(this.hours) + ":" + this.zeroPad(this.minutes) + ":" + this.zeroPad(this.seconds) + ":" + this.zeroPad(this.frames);
    }

    private getFrameCount(): number {
        return (((this.hours * 3600) + (this.minutes * 60) + this.seconds) * this.frameRate) + this.frames;
    }

    private updateFromFrameCount(): void {
        var frame_count = this.frames;
        this.hours = frame_count / (3600 * this.frameRate);
        if (this.hours > 23) {
            this.hours = this.hours % 24;
            frame_count = frame_count - (23 * 3600 * this.frameRate);
        }
        this.minutes = (frame_count % (3600 * this.frameRate)) / (60 * this.frameRate);
        this.seconds = ((frame_count % (3600 * this.frameRate)) % (60 * this.frameRate)) / this.frameRate;
        this.frames = ((frame_count % (3600 * this.frameRate)) % (60 * this.frameRate)) % this.frameRate;
        this.hours = Math.floor(this.hours);
        this.minutes = Math.floor(this.minutes);
        this.seconds = Math.floor(this.seconds);
        this.frames = Math.floor(this.frames);
        this.timeCode = this.getTimeCodeAsString();
    }

    private zeroPad(value: number): string {
        var pad = (value < 10) ? "0" : "";
        return pad + value;
    }

    public static add(first: timeCode, second: timeCode): timeCode {
        if (first.standard != second.standard) {
            console.log("Video standard should match to add the timecode");
            throw new Error("Video standard should match to add the timecode");
        }
        var newTimeCode: timeCode = new timeCode("00:00:00:00", first.standard);
        newTimeCode.frames = first.getFrameCount() + second.getFrameCount();
        newTimeCode.updateFromFrameCount();
        return newTimeCode;
    }

    public static subtract(first: timeCode, second: timeCode): timeCode {
        if (first.standard != second.standard) throw new Error("Video standard should match to subtract the timecode");

        var newTimeCode: timeCode = new timeCode("00:00:00:00", first.standard);
        newTimeCode.frames = first.getFrameCount() + (second.getFrameCount() * -1);
        newTimeCode.updateFromFrameCount();
        return newTimeCode;
    }
}
