import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { VideoClip } from '../../Entity/videoClip';
import { TimeCode } from '../../Entity/timeCode';

@Injectable()
export class ClipService {

    constructor(private _http: Http) {

    }

    getClips(): Observable<VideoClip[]> {
        return this._http.get('data/data.json')
            .map((res: Response) => <VideoClip[]>res.json())
            .do(data => data.forEach((value) => {
                value.Duration = new TimeCode(value.EndTimecode, value.Standard);
            }))
            .catch((error) => error || 'Server Error');
    }
}
