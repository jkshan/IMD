import { Component, OnInit, Input } from '@angular/core';

import { ReelVideo, ReelVideoClip, VideoClip } from '../../Entity/videoClip';
import { TimeCode } from '../../Entity/timeCode';

import { EmitterService } from '../../Service/emitterService';
import { NotificationsService } from 'angular2-notifications';

@Component({
    moduleId: __moduleName,
    selector: 'reel',
    templateUrl: 'reelClips.component.html'
})
export class ReelClipsComponent implements OnInit {

    reel: ReelVideo;
    @Input() id: string;

    constructor(private _notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.reel = new ReelVideo();
        EmitterService.get(this.id).subscribe((clip: any) => this.addReelClip(clip));
    }

    addReelClip(value: VideoClip) {
        if (this.reel.Clips === undefined || this.reel.Clips.length === 0) {
            this.reel.Clips = new Array<ReelVideoClip>();
            this.reel.Clips.push((<ReelVideoClip>value));
            this.reel.Clips[0].order = 1;
            this.reel.Duration = value.Duration;
            this._notificationService.success(value.Name, 'Added To Reel');
        } else {
            if (this.reel.Clips[0].Standard !== value.Standard) {
                this._notificationService.error('Info: ' + value.Name, 'Cannot add Video of Diffrent Standard');
            } else if (this.reel.Clips[0].Definition !== value.Definition) {
                this._notificationService.error('Info: ' + value.Name, 'Cannot add Video of Diffrent Definition');
            } else {
                if (this.reel.Clips.find(i => i.Id === value.Id)) {
                    this._notificationService.info('Info', 'Video :' + value.Name + ' is already part of Reel');
                    return;
                }
                this.reel.Clips.push((<ReelVideoClip>value));
                this.reel.Clips[this.reel.Clips.length - 1].order = this.reel.Clips.length;
                this.reel.Duration = TimeCode.add(this.reel.Duration, value.Duration);
                this._notificationService.success(value.Name, 'Added To Reel');
            }
        }
    }

    removeReelClip(value: ReelVideoClip) {
        let index = this.reel.Clips.indexOf(value);
        this.reel.Clips.splice(index, 1);
        this.reel.Duration = TimeCode.subtract(this.reel.Duration, value.Duration);
        this.reel.Clips.forEach((i, newIndex) => {
            i.order = newIndex + 1;
        });
        this._notificationService.info('Info', 'Video: ' + value.Name + ' is removed from Reel');
        console.log(this.reel.Clips);
    }
}
