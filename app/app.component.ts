import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { clipService } from './Components/clips/clipService';
import { videoClip, reelVideo, reelVideoClip } from './Entity/videoClip';

//Service
import { EmitterService } from './Service/emitterService';

@Component({
  moduleId: __moduleName,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [clipService, EmitterService]
})
export class AppComponent implements OnInit {

  constructor() {

  }
  ngOnInit() {

  }
  linkId: string = "clips-reel-link";
  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true,

  }
}
