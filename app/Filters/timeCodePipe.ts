import { Pipe } from '@angular/core';
import { timeCode } from '../Entity/timeCode';
@Pipe({
    name: 'TimeCode'
})
export class TimeCodePipe {
    transform(value: timeCode) {
        if (value) {
             return value.getTimeCodeAsString();
        }
    }
}
