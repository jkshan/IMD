import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { videoClip } from '../../Entity/videoClip';
import { TimeCodePipe } from '../../Filters/timeCodePipe'

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
    constructor() { }

    ngOnInit() { }

    @Input() clip: videoClip;

    @Output() reelVideoAdded: EventEmitter<videoClip> =
    new EventEmitter<videoClip>();

    addToReel(value: videoClip) {
        this.reelVideoAdded.emit(value);
    }

}