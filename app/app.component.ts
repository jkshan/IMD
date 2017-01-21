import { Component, OnInit } from '@angular/core';

import { ClipService } from './Components/clips/clipService';

// Service
import { EmitterService } from './Service/emitterService';

@Component({
  moduleId: __moduleName,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [ClipService, EmitterService]
})
export class AppComponent implements OnInit {

  linkId: string = 'clips-reel-link';

  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
  };

  constructor() {

  }

  ngOnInit() {

  }
}
