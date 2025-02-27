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
import { DatosPasos } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { DATOS_GENERALES_SOCIOS } from 'libs/shared/data-access-user/src/tramites/constantes/120601/datos-generales-socios-tabledata.enum';
import { DATOS_GENERALES_EXTRANJEROS } from 'libs/shared/data-access-user/src/tramites/constantes/120601/datos-generales-socios-tabledata.enum';

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
/**
 * Component for managing general partner data.
 */
export class DatosGeneralesSociosComponent implements OnInit {

  /** Form for user request submission */
  FormSolicitud!: FormGroup;

  /** Form to store total row count */
  formForTotalCount!: FormGroup;

  /** Steps for wizard navigation */
  pasos: ListaPasosWizard[] = PASOS;

  /** Current step index */
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
  tablecheckbox = TablaSeleccion.CHECKBOX;

  /**
   * Índice de la fila seleccionada en la tabla. Por defecto, se inicializa en 1.
   */
  selectedRow: number = 1;

  /** Table configuration for partners */
  configuracionTabla = DATOS_GENERALES_SOCIOS;

  /** Table configuration for foreign partners */
  configuracionTabla_Extranjeros = DATOS_GENERALES_EXTRANJEROS;

  /** Data array for partners */
  datos_Socios = [
    {
      a: "DIP150930L51",
      b: "DESARROLLOS INMOBILIARIOS PUENTE DE CANTERA SA DE CV",
      c: "",
      d: "",
      e: "",
    }
  ];

  /** Data array for foreign partners */
  datos_Extranjeros = [];

  /**
   * Constructor - initializes form builder.
   * @param fb - FormBuilder instance
   */
  constructor(private fb: FormBuilder) { }

  /**
   * Lifecycle hook - initializes component and forms.
   */
  ngOnInit(): void {
    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        exentoDePago: ['No', Validators.required],
        exentoDePagos: ['No', Validators.required],
      }),
    });

    this.formForTotalCount = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
    });

    const TOTAL_ROW_COUNT = this.datos_Socios.length;
    this.formForTotalCount.patchValue({ recuentoTotalDeFilas: TOTAL_ROW_COUNT });
  }
}
