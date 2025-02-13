import { HoraFormatoDirective } from './hora-formato.directive';
import { ElementRef } from '@angular/core';

describe('HoraFormatoDirective', () => {
  it('should create an instance', () => {
    const elementRef = {} as ElementRef;
    const directive = new HoraFormatoDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
