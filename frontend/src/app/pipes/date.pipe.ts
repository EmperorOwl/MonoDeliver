import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true,
})
export class DatePipe implements PipeTransform {
  transform(value: string): string {
    return new Date(value).toLocaleString('en-GB');
  }
}
