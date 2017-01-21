import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VideoClip } from '../../Entity/videoClip';

@Component({
    moduleId: __moduleName,
    selector: 'clip',
    templateUrl: 'clip.component.html',
    styles: [`.row{
        padding:5px;        
        border: 1px solid black;
    }`]
})
export class ClipComponent implements OnInit {

    @Input() clip: VideoClip;
    @Output() reelVideoAdded: EventEmitter<VideoClip> =
    new EventEmitter<VideoClip>();

    constructor() { }

    ngOnInit() { }

    addToReel(value: VideoClip) {
        this.reelVideoAdded.emit(value);
    }

}
