import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DIRECTOS } from '../../constantes/empleados.enum';
import { FECHA_DE_CEDULA } from '../../constantes/empleados.enum';
import { FECHA_DE_FIRMA } from '../../constantes/empleados.enum';
import { FECHA_FIN_VIGENCIA } from '../../constantes/empleados.enum';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Location } from '@angular/common';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ComplementarState, ComplementarStore } from '../../../estados/tramites/complementar.store';
import { ComplementarQuery } from '../../../estados/queries/complementar.query';
import { map, Subject, takeUntil } from 'rxjs';

/**
 * Componente para gestionar la información de empleados.
 * @class EmpleadosComponent
 */
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent implements OnInit {
  /**
   * Formulario para gestionar la información de empleados.
   * @property {FormGroup} empleadosForm
   */
  empleadosForm!: FormGroup;
/**
   * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: ComplementarState;
  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Indica si el campo de razón social está deshabilitado.
   * @property {boolean} disableRazonSocial
   */
  disableRazonSocial: boolean = true;

  /**
   * Opciones disponibles para cédulas.
   * @property {Array} cedulasOptions
   */
  cedulasOptions = [];

  /**
   * Tipo de selección para la tabla de empleados directos.
   * @property {TablaSeleccion} directosTablaSeleccion
   */
  directosTablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de encabezados para la tabla de empleados directos.
   * @property {any} directosEncabezado
   */
  directosEncabezado = DIRECTOS;

  /**
   * Datos para la tabla de empleados directos.
   * @property {Array} directosDatos
   */
  directosDatos = [];

  /**
   * Configuración de la fecha de cédula.
   * @property {any} fetchaDeCedula
   */
  fetchaDeCedula = FECHA_DE_CEDULA;

  /**
   * Configuración de la fecha de firma.
   * @property {any} fetchaDeFirma
   */
  fetchaDeFirma = FECHA_DE_FIRMA;

  /**
   * Configuración de la fecha de fin de vigencia.
   * @property {any} fetchaFinVigencia
   */
  fetchaFinVigencia = FECHA_FIN_VIGENCIA;

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para construcción de formularios
   */
  constructor(public fb: FormBuilder, private ubicaccion: Location,private complementarStore: ComplementarStore,
        private complementarQuery: ComplementarQuery) {
   
  }
  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
   this.crearFormularioEmpleados();
  }
  /**
   * Crea el formulario de empleados.
   * @method crearFormularioEmpleados
   * @returns {void}
   */
  crearFormularioEmpleados(): void {
     this.complementarQuery.selectSolicitud$
              .pipe(
                takeUntil(this.destroyNotifier$),
                map((seccionState) => {
                  this.solicitudState = seccionState as ComplementarState;
                })
              )
              .subscribe();
    this.empleadosForm = this.fb.group({
      totalDeEmpleados: [this.solicitudState.totalDeEmpleados, Validators.required],
  directos: [this.solicitudState.directos],
  indirectos: [this.solicitudState.indirectos],
  directo: [this.solicitudState.directo],
  cedula: [this.solicitudState.cedula],
  fechaCedula: [this.solicitudState.fechaCedula],
  indirectosDatos: [this.solicitudState.indirectosDatos],
  contrato: [this.solicitudState.contrato],
  objeto: [this.solicitudState.objeto],
  fechaFirma: [ this.solicitudState.fechaFirma],
  fechaFinVigencia: [this.solicitudState.fechaFinVigencia],
  rfcEmpresa: [this.solicitudState.rfcEmpresa],
  razonSocial: [this.solicitudState.razonSocial]
    });
  }

  /**
   * Vuelve a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regrasar(): void {
    this.ubicaccion.back();
  }
   /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
   cambiofetchaDeCedula(nuevo_valor: string): void {
    this.empleadosForm.patchValue({
      fechaCedula: nuevo_valor,
    });
    this.complementarStore.setFechaCedula(nuevo_valor);
  }
   /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
   cambiofetchaDeFirma(nuevo_valor: string): void {
    this.empleadosForm.patchValue({
      fechaFirma: nuevo_valor,
    });
    this.complementarStore.setFechaFirma(nuevo_valor);
  }
   /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
   cambiofechaFinVigencia(nuevo_valor: string): void {
    this.empleadosForm.patchValue({
      fechaFinVigencia: nuevo_valor,
    });
    this.complementarStore.setFechaFinVigencia(nuevo_valor);
  }
   /**
   * Método que actualiza el store con los valores del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof ComplementarStore): void {
    const VALOR = form.get(campo)?.value;
    (this.complementarStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }
}
