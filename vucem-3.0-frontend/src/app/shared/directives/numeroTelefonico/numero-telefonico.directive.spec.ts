import { NumeroTelefonicoDirective } from './numero-telefonico.directive';
import { ElementRef } from '@angular/core';

describe('NumeroTelefonicoDirective', () => {
  it('should create an instance', () => {
    const elementRef = {} as ElementRef;
    const directive = new NumeroTelefonicoDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
