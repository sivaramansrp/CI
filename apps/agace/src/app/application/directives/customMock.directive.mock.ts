import { Directive, Input } from '@angular/core';

@Directive({ selector: '[libMyCustom]' })
export class MyCustomDirective {
  @Input() libMyCustom!: string | boolean | number;
}