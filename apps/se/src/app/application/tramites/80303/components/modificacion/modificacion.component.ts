import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  EMPRESA_SUBMANUFACTURERA_ENCABEZADO_DE_TABLA,
  EmpresaSubmanufacturera,
} from '../../models/modificacion-programa-immex-baja-submanufacturera.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.scss',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones activas y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario reactivo utilizado para gestionar los datos de modificación.
   * Este formulario contiene los controles necesarios para capturar y validar
   * la información requerida en el proceso de modificación.
   */
  modificacionForm!: FormGroup;
  /**
   * Configuración para la tabla de submanufactureras.
   * 
   * Esta configuración incluye el tipo de selección de la tabla y 
   * los encabezados definidos para la tabla de empresas submanufactureras.
   * 
   * Propiedades:
   * - `tipoSeleccionTabla`: Define el tipo de selección que se utilizará en la tabla.
   * - `configuracionTabla`: Contiene la configuración de los encabezados de la tabla.
   */
  submanufacturerasTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.BUTTON,
    configuracionTabla: EMPRESA_SUBMANUFACTURERA_ENCABEZADO_DE_TABLA,
  };

  /**
   * Arreglo que almacena datos de empresas submanufactureras.
   * 
   * Este arreglo se utiliza para gestionar y mostrar información
   * relacionada con las empresas submanufactureras en la tabla de datos.
   */
  submanufacturerasTablaDatos: EmpresaSubmanufacturera[] = [];

  constructor(
    private fb: FormBuilder,
    public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService,
    public tramite80303Querry: Tramite80303Query
  ) {}

  ngOnInit(): void {
    this.crearFormaulario();
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      'submanufacturerasTablaDatos',
      '/80303/subManufacturerasTablaDatos.json'
    );

    this.tramite80303Querry.selectTramiteState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.submanufacturerasTablaDatos = state.submanufacturerasTablaDatos;
      });
  }

  /**
   * Crea y configura un formulario reactivo para la modificación de datos.
   * 
   * Este método inicializa un formulario con campos predefinidos y deshabilitados,
   * incluyendo información como RFC, representación federal, tipo de modificación
   * y programa de modificación. Los valores de los campos están establecidos de 
   * manera predeterminada y no son editables por el usuario.
   */
  crearFormaulario(): void {
    this.modificacionForm = this.fb.group({
      rfc: [{ value: 'AAL0409235E6', disabled: true }],
      representacionFederal: [{ value: 'CULIACAN', disabled: true }],
      tipoModificacion: [{ value: 'Baja', disabled: true }],
      modificacionPrograma: [
        { value: 'Empresa submanufacturera', disabled: true },
      ],
    });
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
