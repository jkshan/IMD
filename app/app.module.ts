import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';

// Components
import { AppComponent } from './app.component';
import { ClipsComponent } from './Components/clips/clips.component';
import { ClipComponent } from './Components/clip/clip.component';
import { ReelClipsComponent } from './Components/reelClips/reelClips.component';

// Filters
import { TimeCodePipe } from './Filters/timeCodePipe';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, SimpleNotificationsModule],
  declarations: [AppComponent, ClipsComponent, ClipComponent, ReelClipsComponent, TimeCodePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
