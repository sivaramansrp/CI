import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputFecha,  } from '@libs/shared/data-access-user/src';
import {TituloComponent } from '../titulo/titulo.component';

/**
 * Configuración para el campo de fecha inicial.
 */
export const FECHA_INICIO: InputFecha = {
  labelNombre: 'Fecha inicial',
  required: true,
  habilitado: true,
};

/**
 * Configuración para el campo de fecha final.
 */
export const FECHA_FINAL: InputFecha = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};

/**
 * Componente para gestionar los detalles de acuses y resoluciones por folio de trámite.
 */
@Component({
  selector: 'acuses-y-resoluciones-folio-del-tramite-detalles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, RouterModule],
  templateUrl:
    './acuses-y-resoluciones-folio-del-tramite-detalles.component.html',
  styleUrls: [
    './acuses-y-resoluciones-folio-del-tramite-detalles.component.scss',
  ],
})
export class AcusesYResolucionesFolioDelTramiteDetallesComponent
  implements OnInit
{
  /**
   * Formulario reactivo para gestionar los datos de acuses y resoluciones.
   */
  public acusesYResolucionesFormGroup!: FormGroup;

  /**
   * Configuración del campo de fecha inicial.
   */
  public fechaInicioInput: InputFecha = FECHA_INICIO;

  /**
   * Configuración del campo de fecha final.
   */
  public fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * URL del procedimiento para la navegación.
   */
  @Input() public procedureUrl = '';

  /**
   * URL para regresar al procedimiento anterior.
   */
  @Input() public procedureRegresorUrl = '';

  /**
   * Constructor de la clase.
   * @param formBuilder Servicio para construir formularios reactivos.
   * @param router Servicio para la navegación entre rutas.
   */
  public constructor(
    protected readonly formBuilder: FormBuilder,
    public router: Router
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo con campos deshabilitados.
   */
  public ngOnInit(): void {
    this.acusesYResolucionesFormGroup = this.formBuilder.group({
      folio: [{ value: '', disabled: true }],
      dependencia: [{ value: '', disabled: true }],
      fechaInicial: [{ value: '', disabled: true }],
      fechaFinal: [{ value: '', disabled: true }],
      unidadAdministrativaORepresentacionFederal: [
        { value: '', disabled: true },
      ],
      tipoDeSolicitud: [{ value: '', disabled: true }],
      estatusDeLaSolicitud: [{ value: '', disabled: true }],
      diasHabilesTranscurridos: [{ value: '', disabled: true }],
    });
  }

  /**
   * Navega a la página de acuses y resoluciones.
   */
  public desistir(): void {
    this.router.navigate([this.procedureUrl]);
  }

  /**
   * Navega a la página anterior del procedimiento.
   */
  public regresar(): void {
    this.router.navigate([this.procedureRegresorUrl]);
  }
}