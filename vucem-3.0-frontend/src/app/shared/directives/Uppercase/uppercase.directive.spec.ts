import { UppercaseDirective } from './uppercase.directive';
import { ElementRef } from '@angular/core';

describe('UppercaseDirective', () => {
  it('should create an instance', () => {
    const elementRef = {} as ElementRef;
    const directive = new UppercaseDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
