import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

import { ConsumoPersonalRoutingModule } from './consumo-personal-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsumoPersonalRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService],
})
export class ConsumoPersonalModule {}
