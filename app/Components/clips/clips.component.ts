import { Component, OnInit, Input } from '@angular/core';

import { clipService } from './clipService';
import { videoClip } from '../../Entity/videoClip';
import { EmitterService } from '../../Service/emitterService'

@Component({
    moduleId: __moduleName,
    selector: 'clips',
    templateUrl: 'clips.component.html',
    styles: [`.row{
        padding:5px;
    }`]
})
export class ClipsComponent implements OnInit {
    constructor(private _clipService: clipService) {
    }
    clips: Array<videoClip>;
    ngOnInit(): void {
        this._clipService.getClips().subscribe(p => {
            this.clips = p;
        }, error => console.log(error));
    }

    @Input() id: string;

    onReelVideoAdded(value: videoClip) {
        EmitterService.get(this.id).emit(value);
    }
}