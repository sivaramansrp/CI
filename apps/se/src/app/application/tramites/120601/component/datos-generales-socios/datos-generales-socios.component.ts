import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TableComponent, TituloComponent } from '@ng-mf/data-access-user';
// eslint-disable-next-line sort-imports
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';

import { AlertComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';

import { DatosPasos, datosSociosTable } from '@ng-mf/data-access-user';

import { DATOS_GENERALES_EXTRANJEROS } from '@ng-mf/data-access-user';
import { DATOS_GENERALES_SOCIOS } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';

/**
 * Componente para gestionar los datos generales de socios.
 */
@Component({
  selector: 'app-datos-generales-socios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, BtnContinuarComponent, InputRadioComponent, AlertComponent, TableComponent, TablaDinamicaComponent],
  templateUrl: './datos-generales-socios.component.html',
  styleUrl: './datos-generales-socios.component.scss',
})
export class DatosGeneralesSociosComponent implements OnInit {

  /** Formulario para la solicitud del usuario */
  FormSolicitud!: FormGroup;

  /** Formulario para almacenar el recuento total de filas */
  formularioParaConteoTotal!: FormGroup;

  /** Pasos para la navegación en el asistente */
  pasos: ListaPasosWizard[] = PASOS;

  /** Índice del paso actual */
  indice: number = 1;

  /**
   * Objeto que almacena la configuración de los pasos del formulario.
   * Contiene el número total de pasos, el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Define el tipo de selección de la tabla como casilla de verificación (checkbox).
   */
  tablaCasilla = TablaSeleccion.CHECKBOX;

  /**
   * Índice de la fila seleccionada en la tabla. Por defecto, se inicializa en 1.
   */
  filaSeleccionada: number = 1;

  /** Configuración de la tabla para socios */
  configuracionTabla = DATOS_GENERALES_SOCIOS;

  /** Configuración de la tabla para socios extranjeros */
  configuracionTabla_Extranjeros = DATOS_GENERALES_EXTRANJEROS;

  /** Array de datos para socios */
  datosSocios = datosSociosTable;

  /** Array de datos para socios extranjeros */
  datos_Extranjeros = [];

  /**
   * Constructor - inicializa el form builder.
   * @param fb - Instancia de FormBuilder
   */
  constructor(private fb: FormBuilder, private store: Tramite120601Store, private query: Tramite120601Query) {
    // Si es necesario, se puede agregar aquí la lógica del constructor.
  }

  /**
   * Hook del ciclo de vida - inicializa el componente y los formularios.
   */
  ngOnInit(): void {
    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        nacionalidad: ['No', Validators.required],
        persona: ['No', Validators.required],
        cadenaDependencia: ['', Validators.required]
      }),
    });

    this.formularioParaConteoTotal = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
    });

    const TOTAL_ROW_COUNT = this.datosSocios.length;
    this.formularioParaConteoTotal.patchValue({ recuentoTotalDeFilas: TOTAL_ROW_COUNT });

    this.query.selectNacionalidad$.subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosImportadorExportador: {
          nacionalidad: data
        }
      })
    });

    this.query.selectPersona$.subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosImportadorExportador: {
          persona: data
        }
      })
    });

    this.query.selectCadenaDependencia$.subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosImportadorExportador: {
          cadenaDependencia: data
        }
      })
    });

  }

  enCambioNacionalidad() {
    this.store.setNacionalidad(this.FormSolicitud.get(['datosImportadorExportador', 'nacionalidad'])?.value);
  }

  enCambioPersona() {
    this.store.setPersona(this.FormSolicitud.get(['datosImportadorExportador','persona'])?.value);
  }

  enCambioCadenaDependencia() {
    this.store.setCadenaDependencia(this.FormSolicitud.get(['datosImportadorExportador','cadenaDependencia'])?.value);
  }
}
