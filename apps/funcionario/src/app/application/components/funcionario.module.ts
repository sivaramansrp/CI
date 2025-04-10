
import { CommonModule } from '@angular/common';
// multiple - Import multiple members.
import { NgModule, forwardRef } from '@angular/core';
// multiple - Import multiple members.
import { CatalogoSelectComponent, CatalogosService, FirmaPageComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FuncionarioRoutingModule } from './funcionario-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    forwardRef(() => CatalogoSelectComponent),
    forwardRef(() => FirmaPageComponent),
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService,
    CatalogosService
  ]
})
export class FuncionarioModule { }
