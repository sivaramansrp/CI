import { CommonModule } from '@angular/common';
import { InputCheckComponent } from './components/input-check/input-check.component';
import { NgModule } from '@angular/core';
import { SoloNumerosDirective } from './directives/solo-numeros/solo-numeros.directive';
import { UppercaseDirective } from './directives/Uppercase/uppercase.directive';


@NgModule({
  declarations: [
    SoloNumerosDirective,
  ],
  imports: [
    CommonModule,
    InputCheckComponent,
    UppercaseDirective,
],
  exports: [
    UppercaseDirective,
    SoloNumerosDirective,
  ]
})
export class SharedModule { }
