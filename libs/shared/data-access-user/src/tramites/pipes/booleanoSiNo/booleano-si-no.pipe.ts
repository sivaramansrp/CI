import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanoSiNo',
  standalone: true,
})
export class BooleanoSiNoPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'SI' : 'NO';
  }
}
