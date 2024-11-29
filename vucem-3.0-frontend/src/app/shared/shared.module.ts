import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './components/wizard/wizard.component';



@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    WizardComponent
  ],
  exports: [
    WizardComponent
  ]
})
export class SharedModule { }
