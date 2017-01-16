import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { reelVideo, reelVideoClip, videoClip } from '../../Entity/videoClip';
import { timeCode } from '../../Entity/timeCode';

import { EmitterService } from '../../Service/emitterService'
import { NotificationsService } from 'angular2-notifications';

@Component({
    moduleId: __moduleName,
    selector: 'reel',
    templateUrl: 'reelClips.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ReelClipsComponent implements OnInit {
    reel: reelVideo;

    constructor(private _notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.reel = new reelVideo();
        EmitterService.get(this.id).subscribe((clip: any) => this.addReelClip(clip));
    }

    @Input() id: string;

    addReelClip(value: videoClip) {
        if (this.reel.Clips == undefined || this.reel.Clips.length == 0) {
            this.reel.Clips = new Array<reelVideoClip>();
            this.reel.Clips.push((<reelVideoClip>value));
            this.reel.Clips[0].order = 1;
            this.reel.Duration = value.Duration;
            this._notificationService.success(value.Name, "Added To Reel")
        } else {
            if (this.reel.Clips[0].Standard != value.Standard) {
                this._notificationService.error("Error: " + value.Name, "Cannot add Video of Diffrent Standard");
            } else if (this.reel.Clips[0].Definition != value.Definition) {
                this._notificationService.error("Error: " + value.Name, "Cannot add Video of Diffrent Definition");
            } else {
                if (this.reel.Clips.find(i => i.Id == value.Id)) {
                    this._notificationService.info("Info", "Video :" + value.Name + " is already part of Reel")
                    return;
                }
                this.reel.Clips.push((<reelVideoClip>value));
                this.reel.Clips[this.reel.Clips.length - 1].order = this.reel.Clips.length;
                this.reel.Duration = timeCode.add(this.reel.Duration, value.Duration);
                this._notificationService.success(value.Name, "Added To Reel");
            }
        }
    }

    removeReelClip(value: reelVideoClip) {
        var index = this.reel.Clips.indexOf(value);
        this.reel.Clips.splice(index, 1);
        this.reel.Duration = timeCode.subtract(this.reel.Duration, value.Duration);
        this.reel.Clips.forEach((i, newIndex) => {
            i.order = newIndex + 1;
        });
        console.log(this.reel.Clips);
    }
}