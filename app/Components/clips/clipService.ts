import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { videoClip } from '../../Entity/videoClip';
import { timeCode } from '../../Entity/timeCode';

@Injectable()
export class clipService {

    constructor(private _http: Http) {

    }

    getClips(): Observable<videoClip[]> {
        return this._http.get("data/data.json")
            .map((res: Response) => <videoClip[]>res.json())
            .do(data => data.forEach((value) => {
                value.Duration = new timeCode(value.EndTimecode,value.Standard);
            }))
            .catch((error) => error || 'Server Error');
    }
}