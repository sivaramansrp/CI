import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from "@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component";

import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { Catalogo, ModeloDeFormaDinamica, REGEX_NOMBRE } from '@libs/shared/data-access-user/src';

import { FORMULARIO_DATOS_NOMBRE } from '../../enums/retorno-importacion-temporal.enum';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';

import { SolicitanteComponent,TituloComponent, } from "@ng-mf/data-access-user";

import { Subject, takeUntil } from 'rxjs';

import { CatalogoSelectComponent } from "@ng-mf/data-access-user";


import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';
@Component({
  selector: 'app-datos-del-nombre',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, CatalogoSelectComponent,SolicitanteComponent, TituloComponent, ReactiveFormsModule, SolicitanteComponent],
  templateUrl: './datos-del-nombre.component.html',
  styleUrl: './datos-del-nombre.component.scss',
})
export class DatosDelNombreComponent implements OnInit,OnDestroy {

  ajustarValidadoresSegunValor($event:Catalogo): void {
    if ($event.descripcion ==='Persona Fisica Nacion') {
      this.limpiarValidadores(['razonSocial']);
      this.establecerValidadores(['nombre', 'apellidoPaterno'], Validators.required);
    } else if ($event.descripcion ==='') {
      this.limpiarValidadores(['nombre', 'apellidoPaterno']);
      this.establecerValidadores(['razonSocial'], Validators.required);
    }
  }

  
    /**
     * Formulario reactivo para gestionar los datos del propietario.
     */
    propietarioOpciones: Catalogo[]= [];
  
    //tipoDePropietarioOpciones: Catalogo[] = [];

    consultarPorRFC: Catalogo[]= [];

    tipoDeRepresentanteOpciones: Catalogo[] = [];
  
      formularioDatosTipoPropietario: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_NOMBRE;
      datisDelNombre!: FormGroup;
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
      this.getconsultarPorRFC();
      this.getTipoDeRepresentante();
    
    }
    inicializarFormulario() : void {
      this.datisDelNombre = this.fb.group({
        consultarPorRFC: [this.estadoSeleccionado?.['consultarPorRFC'] || '', Validators.required],
        tipoDeRepresentante: [this.estadoSeleccionado?.['tipoDeRepresentante'] || '', Validators.required],
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

      getconsultarPorRFC(): void {
        this.equipoEInstrumentosMusicalesService
        .getconsultarPorRFC()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.consultarPorRFC = data;
       });
      }
  
     getTipoDeRepresentante(): void {
        this.equipoEInstrumentosMusicalesService
          .getTipoDeRepresentante()
          .pipe(takeUntil(this.destroyed$))
          .subscribe((data) => {
            this.tipoDeRepresentanteOpciones = data;
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
      const CAMPO = this.datisDelNombre.get(nombreCampo);
      CAMPO?.setValidators(validador); // Asigna el/los validador(es)
      CAMPO?.updateValueAndValidity(); // Actualiza el estado de validez
    });
  }
  
  // 👉 Elimina todos los validadores de un conjunto de campos del formulario
  limpiarValidadores(campos: string[]):void {
    campos.forEach(nombreCampo => {
      const CAMPO = this.datisDelNombre.get(nombreCampo);
      CAMPO?.clearValidators(); // Quita todos los validadores
      CAMPO?.updateValueAndValidity(); // Actualiza el estado de validez
    });
  }
  
    
      ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete()
       }
  }
  
