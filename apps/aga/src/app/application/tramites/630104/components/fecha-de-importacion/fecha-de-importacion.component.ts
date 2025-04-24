
import { Catalogo, CatalogoSelectComponent, InputFecha, ModeloDeFormaDinamica } from "@ng-mf/data-access-user";

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";

import { CommonModule } from '@angular/common';

import { InputFechaComponent } from "@ng-mf/data-access-user";

import { ESTIMADA_RETORNO, FECHA_ESTIMADA_DE_INGRESO, FORMULARIO_FECHA_IMPORTACION } from '../../enums/retorno-importacion-temporal.enum';
import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { FormasDinamicasComponent } from "@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component";
import { TituloComponent } from '@ng-mf/data-access-user';


import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';



@Component({
  selector: 'app-fecha-de-importacion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormasDinamicasComponent,TituloComponent,InputFechaComponent,CatalogoSelectComponent],
  templateUrl: './fecha-de-importacion.component.html',
  styleUrl: './fecha-de-importacion.component.scss',
})
export class FechaDeImportacionComponent implements OnInit, OnDestroy {

  formularioFechaDeImportacion: ModeloDeFormaDinamica[] = FORMULARIO_FECHA_IMPORTACION;
  FechaDeImportacionTemporalFormulario!: FormGroup;

  datosfecha: InputFecha = ESTIMADA_RETORNO;

  datosfechaLimite: InputFecha = FECHA_ESTIMADA_DE_INGRESO;

   private destroyed$ = new Subject<void>();


   estadoSeleccionado!: Tramite630104State;


   constructor(
    private fb: FormBuilder,
    private tramite630104Store: Tramite630104Store,
    private tramite630104Query: Tramite630104Query
  ) {}

  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
 }

 inizializarFormulario(): void {
  this.FechaDeImportacionTemporalFormulario = this.fb.group({
    fechaLimiteRetorno: [this.estadoSeleccionado?.['fechaLimiteRetorno'] || '', Validators.required],
    cuentaProrroga: [this.estadoSeleccionado?.['cuentaProrroga'] || '', Validators.required],
  });
}


  getValorStore(): void {
    this.tramite630104Query.selectTramite630104State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630104Store.setTramite630104State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630104Store.setTramite630104State($event.campo, $event.valor);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
