import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ClipsComponent } from './Components/clips/clips.component';
import { ClipComponent } from './Components/clip/clip.component';
import { ReelClipsComponent } from './Components/reelClips/reelClips.component';
import { TimeCodePipe } from './Filters/timeCodePipe';

import { SimpleNotificationsModule } from 'angular2-notifications';

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SimpleNotificationsModule, HttpModule],
      declarations: [AppComponent, ClipComponent, TimeCodePipe, ClipsComponent, ReelClipsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  // it('should have expected <h1> text', () => {
  //   fixture.detectChanges();
  //   const h1 = de.nativeElement;
  //   expect(h1.innerText).toMatch(/angular/i,
  //     '<h1> should say something about "Angular"');
  // });
});
