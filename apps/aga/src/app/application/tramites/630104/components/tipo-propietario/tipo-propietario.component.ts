import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from "@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component";

import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { Catalogo, ModeloDeFormaDinamica, REGEX_NOMBRE } from '@libs/shared/data-access-user/src';

import { FORMULARIO_DATOS_PROPIETARIO } from '../../enums/retorno-importacion-temporal.enum';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';

import { SolicitanteComponent,TituloComponent, } from "@ng-mf/data-access-user";

import { Subject, takeUntil } from 'rxjs';

import { CatalogoSelectComponent } from "@ng-mf/data-access-user";


import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';


@Component({
  selector: 'app-tipo-propietario',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, CatalogoSelectComponent,SolicitanteComponent, TituloComponent, ReactiveFormsModule, SolicitanteComponent],
  templateUrl: './tipo-propietario.component.html',
  styleUrls: ['./tipo-propietario.component.scss'],
})
export class TipoPropietarioComponent implements OnInit,OnDestroy {

  ajustarValidadoresSegunValor(): void {
    const TIPO_DE_PROPIETARIO = this.tipoPropietarioFormulario.get('tipoDePropietario')?.value;
    if (TIPO_DE_PROPIETARIO === '1') {
      this.limpiarValidadores(['razonSocial']);
      this.establecerValidadores(['nombre', 'apellidoPaterno'], Validators.required);
    } else if (TIPO_DE_PROPIETARIO === '2') {
      this.limpiarValidadores(['nombre', 'apellidoPaterno']);
      this.establecerValidadores(['razonSocial'], Validators.required);
    }
  }


  /**
   * Formulario reactivo para gestionar los datos del propietario.
   */
  propietarioOpciones: Catalogo[]= [];
  tipoDePropietarioOpciones: Catalogo[] = [];

    formularioDatosTipoPropietario: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_PROPIETARIO;
  tipoPropietarioFormulario!: FormGroup;
    /**
     * Estado seleccionado del trámite 630303.
     */
    estadoSeleccionado!: Tramite630104State;
  private destroyed$ = new Subject<void>();
  constructor(private fb: FormBuilder,private tramite630104Store: Tramite630104Store,
      private tramite630104Query: Tramite630104Query,private equipoEInstrumentosMusicalesService: EquipoEInstrumentosMusicalesService) {
   //
  }
 
  
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
    this.getPropietario();
    this.getTipoDePropietario();
    this.ajustarValidadoresSegunValor();
  
  }
  inicializarFormulario() : void {
    this.tipoPropietarioFormulario = this.fb.group({
      propietario: [this.estadoSeleccionado?.['propietario'] || '', Validators.required],
      tipoDePropietario: [this.estadoSeleccionado?.['tipoDePropietario'] || '', Validators.required],
      nombre: [this.estadoSeleccionado?.['nombre'] || '',[Validators.required,Validators.pattern(REGEX_NOMBRE)]],
      apellidoPaterno: [this.estadoSeleccionado?.['apellidoPaterno'] || '',[Validators.required,Validators.pattern(REGEX_NOMBRE)]],
      apellidoMaterno: [this.estadoSeleccionado?.['apellidoMaterno'] || '',Validators.pattern(REGEX_NOMBRE)],
      razonSocial: [this.estadoSeleccionado?.['razonSocial'] || '',[Validators.required,Validators.pattern(REGEX_NOMBRE)]],
    });
  }
    /**
     * Obtiene el estado actual del trámite desde el store.
     */
    getValorStore(): void {
      this.tramite630104Query.selectTramite630104State$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.estadoSeleccionado = data;
        });
    }

    getPropietario(): void {
      this.equipoEInstrumentosMusicalesService
        .getPropietario()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.propietarioOpciones = data;
        });
    }

    getTipoDePropietario(): void {
      this.equipoEInstrumentosMusicalesService
        .getTipoDePropietario()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.tipoDePropietarioOpciones = data;
          });
    }

    establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
      if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
        this.tramite630104Store.setTramite630104State($event.campo, ($event.valor as { id: unknown }).id);
      } else {
        this.tramite630104Store.setTramite630104State($event.campo, $event.valor);
      }
    }

    // 👉 Establece validadores a un conjunto de campos del formulario
establecerValidadores(campos: string[], validador: ValidatorFn | ValidatorFn[]):void {
  campos.forEach(nombreCampo => {
    const CAMPO = this.tipoPropietarioFormulario.get(nombreCampo);
    CAMPO?.setValidators(validador); // Asigna el/los validador(es)
    CAMPO?.updateValueAndValidity(); // Actualiza el estado de validez
  });
}

// 👉 Elimina todos los validadores de un conjunto de campos del formulario
limpiarValidadores(campos: string[]):void {
  campos.forEach(nombreCampo => {
    const CAMPO = this.tipoPropietarioFormulario.get(nombreCampo);
    CAMPO?.clearValidators(); // Quita todos los validadores
    CAMPO?.updateValueAndValidity(); // Actualiza el estado de validez
  });
}

  
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete()
     }
}
