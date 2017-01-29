import { Component, OnInit, Input } from '@angular/core';

import { ClipService } from './clipService';
import { VideoClip } from '../../Entity/videoClip';
import { EmitterService } from '../../Service/emitterService';

@Component({
    moduleId: __moduleName,
    selector: 'clips',
    templateUrl: 'clips.component.html'
})
export class ClipsComponent implements OnInit {
    clips: Array<VideoClip>;
    @Input() id: string;

    constructor(private _clipService: ClipService) {
    }

    ngOnInit(): void {
        this._clipService.getClips().subscribe(p => {
            this.clips = p;
        }, error => console.log(error));
    }

    onReelVideoAdded(value: VideoClip) {
        EmitterService.get(this.id).emit(value);
    }
}
