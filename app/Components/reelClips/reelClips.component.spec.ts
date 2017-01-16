import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { TimeCodePipe } from '../../Filters/timeCodePipe';
import { reelVideo, videoClip, reelVideoClip } from '../../Entity/videoClip';
import { timeCode } from '../../Entity/timeCode';

import { ReelClipsComponent } from './reelClips.component';

describe('ReelClipsComponent', function () {
  let comp: ReelClipsComponent;
  let fixture: ComponentFixture<ReelClipsComponent>;
  let PALSDVideo: reelVideoClip = {
    "order": 0,
    "Id": "Clip4",
    "Name": "Chrysler",
    "Description": "Clint Eastwood recounts how the automotive industry survived the Great Recession.",
    "Standard": "PAL",
    "Definition": "SD",
    "StartTimecode": "00:00:00:00",
    "EndTimecode": "00:00:10:14",
    "Duration": new timeCode("00:00:10:14", "PAL")
  };
  let PALHDVideo: reelVideoClip = {
    "order": 0,
    "Id": "Clip8",
    "Name": "Captain America: The First Avenger",
    "Description": "Video Promo",
    "Standard": "PAL",
    "Definition": "HD",
    "StartTimecode": "00:00:00:00",
    "EndTimecode": "00:00:20:10",
    "Duration": new timeCode("00:00:20:10", "PAL")
  };
  let NTSCSDVideo: reelVideoClip = {
    "order": 0,
    "Id": "Clip6",
    "Name": "Pepsi",
    "Description": "People in the Middles Ages try to entertain their king (Elton John) for a Pepsi. While the first person fails, a mysterious person (Season 1 X Factor winner Melanie Amaro) wins the Pepsi by singing Aretha Franklin's \"Respect\". After she wins, she overthrows the king and gives Pepsi to all the town.",
    "Standard": "NTSC",
    "Definition": "SD",
    "StartTimecode": "00:00:00:00",
    "EndTimecode": "00:00:20:00",
    "Duration": new timeCode("00:00:20:00", "NTSC")
  };
  let NTSCHDVideo: reelVideoClip = {
    "order": 0,
    "Id": "Clip9",
    "Name": "Volkswagen \"Black Beetle",
    "Description": "A computer­generated black beetle runs fast, as it is referencing the new Volkswagen model.",
    "Standard": "NTSC",
    "Definition": "HD",
    "StartTimecode": "00:00:00:00",
    "EndTimecode": "00:00:30:00",
    "Duration": new timeCode("00:00:30:00", "NTSC")
  };

  let allPALSDVideos: Array<reelVideoClip> = [
    {
      "order": 0,
      "Id": "Clip1",
      "Name": "Bud Light",
      "Description": "A factory is working on the new Bud Light Platinum.",
      "Standard": "PAL",
      "Definition": "SD",
      "StartTimecode": "00:00:00:00",
      "EndTimecode": "00:00:30:12",
      "Duration": new timeCode("00:00:30:12", "PAL")
    }, {
      "order": 0,
      "Id": "Clip3",
      "Name": "Audi",
      "Description": "A group of vampires are having a party in the woods. The vampire in charge of drinks (blood types) arrives in his Audi. The bright lights of the car kills all of the vampires, with him wondering where everyone went afterwards.",
      "Standard": "PAL",
      "Definition": "SD",
      "StartTimecode": "00:00:00:00",
      "EndTimecode": "00:01:30:00",
      "Duration": new timeCode("00:01:30:00", "PAL")
    }, {
      "order": 0,
      "Id": "Clip4",
      "Name": "Chrysler",
      "Description": "Clint Eastwood recounts how the automotive industry survived the Great Recession.",
      "Standard": "PAL",
      "Definition": "SD",
      "StartTimecode": "00:00:00:00",
      "EndTimecode": "00:00:10:14",
      "Duration": new timeCode("00:00:10:14", "PAL")
    }];

  let allNTSCSDVideos: Array<reelVideoClip> = [
    {
      "order": 0,
      "Id": "Clip6",
      "Name": "Pepsi",
      "Description": "People in the Middles Ages try to entertain their king (Elton John) for a Pepsi. While the first person fails, a mysterious person (Season 1 X Factor winner Melanie Amaro) wins the Pepsi by singing Aretha Franklin's \"Respect\". After she wins, she overthrows the king and gives Pepsi to all the town.",
      "Standard": "NTSC",
      "Definition": "SD",
      "StartTimecode": "00:00:00:00",
      "EndTimecode": "00:00:20:00",
      "Duration": new timeCode("00:00:20:00", "NTSC")
    }, {
      "order": 0,
      "Id": "Clip5",
      "Name": "Fiat",
      "Description": "A man walks through a street to discover a beautiful woman (Catrinel Menghia) standing on a parking space, who proceeds to approach and seduce him, when successfully doing so he then discovered he was about to kiss a Fiat 500 Abarth.",
      "Standard": "NTSC",
      "Definition": "SD",
      "StartTimecode": "00:00:00:00",
      "EndTimecode": "00:00:18:11",
      "Duration": new timeCode("00:00:18:11", "NTSC")
    }, {
      "order": 0,
      "Id": "Clip2",
      "Name": "M&M's",
      "Description": "At a party, a brown­shelled M&M is mistaken for being naked. As a result, the red M&M tears off its skin and dances to \"Sexy and I Know It\" by LMFAO.",
      "Standard": "NTSC",
      "Definition": "SD",
      "StartTimecode": "00:00:00:00",
      "EndTimecode": "00:00:15:27",
      "Duration": new timeCode("00:00:15:27", "NTSC")
    }];


 
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SimpleNotificationsModule],
      declarations: [TimeCodePipe, ReelClipsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelClipsComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should not allow to add video of different standard', () => {
    comp.reel = new reelVideo();
    comp.reel.Name = "ReelTest for different standard";
    comp.reel.Duration = new timeCode("00:00:00:00", "PAL");

    //Add PAL SD Video first
    //Which will make the reel to be PAL SD
    comp.addReelClip(PALSDVideo);

    //Add NTSC SD Video
    // The Video should not get added to the reel
    comp.addReelClip(NTSCSDVideo);

    //Add NTSC HD Video
    // The Video should not get added to the reel
    comp.addReelClip(NTSCHDVideo);

    expect(comp.reel.Clips.length).toBe(1);
  });


  it('should not allow to add video of different Definition', () => {
    comp.reel = new reelVideo();
    comp.reel.Name = "ReelTest for different Definition";
    comp.reel.Duration = new timeCode("00:00:00:00", "PAL");

    //Add PAL SD Video First
    //Which will make the reel to be PAL SD
    comp.addReelClip(PALSDVideo);

    //Add PAL HD Video
    // The Video should not get added to the reel
    comp.addReelClip(PALHDVideo);

    expect(comp.reel.Clips.length).toBe(1);
  });

  it('Adding All the PAL SD Video', () => {
    comp.reel = new reelVideo();
    comp.reel.Name = "ReelTest for different Definition";
    comp.reel.Duration = new timeCode("00:00:00:00", "PAL");

    //Add All PAL SD Video
    allPALSDVideos.forEach(value => comp.addReelClip(value));

    expect(comp.reel.Duration.getTimeCodeAsString()).toBe("00:02:11:01");
  });

  it('Adding All the NTSC SD Video', () => {
    comp.reel = new reelVideo();
    comp.reel.Name = "ReelTest for different Definition";
    comp.reel.Duration = new timeCode("00:00:00:00", "PAL");

    //Add All NTSC SD Video
    allNTSCSDVideos.forEach(value => comp.addReelClip(value));

    expect(comp.reel.Duration.getTimeCodeAsString()).toBe("00:00:54:08");
  });
});
