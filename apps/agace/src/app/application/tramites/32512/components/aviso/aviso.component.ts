import { AlertComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FECHA_DESTRUCCION_MERCANCIA } from '../../constantes/solicitud.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-aviso',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    InputFechaComponent,
    NotificacionesComponent,
  ],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
})
export class AvisoComponent implements OnInit, OnDestroy {
  aviosForm!: FormGroup;
  destroyNotifier$: Subject<void> = new Subject();

   fechaDestruccionMercancia: InputFecha = FECHA_DESTRUCCION_MERCANCIA;
   
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.aviosForm = this.fb.group({});
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  actualizarEntidadFederativa(evento: Catalogo): void{
    console.log(evento);
  }

  actualizarFechaFinVigencia1(evento : string): void{
    console.log(evento)
  }
}
