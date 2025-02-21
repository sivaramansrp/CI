import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './directives/Uppercase/uppercase.directive';
import { InputCheckComponent } from './components/input-check/input-check.component';
import { SoloNumerosDirective } from './directives/solo-numeros/solo-numeros.directive';
import { BooleanoSiNoPipe } from './pipes/booleanoSiNo/booleano-si-no.pipe';

@NgModule({
  declarations: [
    SoloNumerosDirective,
  ],
  imports: [
    CommonModule,
    InputCheckComponent,
    forwardRef(() => UppercaseDirective),
   ],
  exports: [
    SoloNumerosDirective,
  ]
})
export class SharedModule { }
