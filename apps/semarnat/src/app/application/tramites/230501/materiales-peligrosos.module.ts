import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MaterialesPeligrososRoutingModule } from './materiales-peligrosos-routing.module';
import { NgModule } from '@angular/core';

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
