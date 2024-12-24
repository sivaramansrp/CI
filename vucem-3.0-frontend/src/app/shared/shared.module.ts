import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './directives/Uppercase/uppercase.directive';
import { InputCheckComponent } from './components/input-check/input-check.component';

@NgModule({
  declarations: [
    UppercaseDirective,
  ],
  imports: [
    CommonModule,
    InputCheckComponent
   ],
  exports: [
    UppercaseDirective
  ]
})
export class SharedModule { }
