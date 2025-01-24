import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './directives/Uppercase/uppercase.directive';
import { InputCheckComponent } from './components/input-check/input-check.component';
import { SoloNumerosDirective } from './directives/solo-numeros/solo-numeros.directive';
import { AlertComponent } from "./components/alert/alert.component";

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
