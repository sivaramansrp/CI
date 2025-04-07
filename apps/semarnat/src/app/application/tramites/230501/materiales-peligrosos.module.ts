import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

import { MaterialesPeligrososRoutingModule } from './materiales-peligrosos-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialesPeligrososRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService],

})
export class MaterialesPeligrososModule {}
