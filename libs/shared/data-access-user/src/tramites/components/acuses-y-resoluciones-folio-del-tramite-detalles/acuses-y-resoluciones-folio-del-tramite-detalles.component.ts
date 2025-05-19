import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../titulo/titulo.component';

export interface BotonDeAccion {
  etiqueta: string;
  clase: string;
  metodo: string;
  urlAccion: string;
}
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
  implements OnInit, OnChanges
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

  @Input() public botonesAcciones: BotonDeAccion[] = [];

  /**
   * Datos del formulario que se recibirán como entrada.
   */
  @Input() public datosDeFormulario = {};

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
  ngOnChanges(): void {
    if (this.datosDeFormulario) {
      this.acusesYResolucionesFormGroup.setValue(this.datosDeFormulario);
    }
  }

  /**
   * Navega a la URL del procedimiento asociado.
   *
   * Este método redirige al usuario a la página correspondiente al procedimiento
   * utilizando la URL almacenada en `this.procedureUrl`.
   *
   * @method desistir
   *
   * Comentarios:
   * Acusa y resoluciones son los componentes comunes a todos los procedimientos.
   * Los botones de este componente se habilitarán o deshabilitarán según la lógica y las reglas comerciales y la
   * integración con los servicios restantes.
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

  /**
   * @method solicitarCancelacion
   * @description Navega a la URL del procedimiento especificado para solicitar la cancelación.
   * @memberof AcusesYResolucionesFolioDelTramiteDetallesComponent
   * @returns {void} No retorna ningún valor.
   *
   * Comentarios:
   * Acusa y resoluciones son los componentes comunes a todos los procedimientos.
   * Los botones de este componente se habilitarán o deshabilitarán según la lógica y las reglas comerciales y la
   * integración con los servicios restantes.
   */
  public solicitarCancelacion(): void {
    this.router.navigate([this.procedureUrl]);
  }

  /**
   * Navega a la URL especificada en `procedureRegresorUrl` para solicitar la modificación
   * del trámite actual.
   *
   * @remarks
   * Este método utiliza el servicio de enrutamiento para redirigir al usuario
   * a la página correspondiente donde puede realizar la solicitud de modificación.
   *
   * @method solicitarModificacion
   *
   * Comentarios:
   * Acusa y resoluciones son los componentes comunes a todos los procedimientos.
   * Los botones de este componente se habilitarán o deshabilitarán según la lógica y las reglas comerciales y la
   * integración con los servicios restantes.
   *
   */
  public solicitarModificacion(): void {
    this.router.navigate([this.procedureRegresorUrl]);
  }

  public alHacerClickEnBoton(urlAccion: string): void {
    this.router.navigate([urlAccion]);
  }
}
