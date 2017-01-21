import { Pipe } from '@angular/core';
import { TimeCode } from '../Entity/timeCode';
@Pipe({
    name: 'TimeCode'
})
export class TimeCodePipe {
    transform(value: TimeCode) {
        if (value) {
             return value.getTimeCodeAsString();
        }
    }
}
