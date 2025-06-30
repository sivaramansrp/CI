import * as formData from '@libs/shared/theme/assets/json/140105/datos-del-formulario.json';
import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-busqueda-folio',
  templateUrl: './busqueda-folio.component.html',
  styleUrl: './busqueda-folio.component.scss',
})
/**
 * @component BusquedaFolioComponent
 * @description
 * Componente encargado de gestionar la búsqueda de trámites por folio y la visualización de los detalles del permiso correspondiente.
 * Permite realizar búsquedas, mostrar detalles en modo solo lectura, agregar datos y cancelar acciones relacionadas con la consulta de trámites.
 * Utiliza formularios reactivos para la validación y presentación de datos, y se comunica con servicios para el manejo de mensajes y estados.
 *
 * @example
 * <app-busqueda-folio></app-busqueda-folio>
 *
 * @see ServicioDeMensajesService
 * @see FormBuilder
 * @see ConsultaioQuery
 */
export class BusquedaFolioComponent implements OnDestroy {
  public busquedaForm!: FormGroup;
  public detalleDelPermisoForm!: FormGroup;
  public detalleDelPermiso: boolean = false;
   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

    /**
   * Notificador para destruir las suscripciones al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  constructor(private servicioDeMensajesService: ServicioDeMensajesService, private fb: FormBuilder,
    private consultaQuery: ConsultaioQuery,
  ) {
    this.establecerBusquedaForm();
    this.estableDetalleDelPermisoForm();
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

    
    /**
     * Inicializa el estado del formulario de detalles del permiso.
     * Si el formulario de detalles no está inicializado, lo establece.
     */
    inicializarEstadoFormulario(): void {
      if (!this.detalleDelPermisoForm) {
        this.estableDetalleDelPermisoForm();
      }
    }


  /**
   * Método que se ejecuta al realizar una búsqueda.
   * Valida si el formulario de búsqueda es válido. Si es inválido, marca todos los campos como tocados.
   * Si el formulario es válido, muestra el detalle del permiso y establece los datos correspondientes.
   * 
   * @param event Evento que desencadena la búsqueda.
   */

  public buscar(_event: Event): void {
    if (this.busquedaForm.invalid) {
      this.busquedaForm.markAllAsTouched();
      // alert('El formulario contiene errores. Por favor, corrígelos antes de continuar.');
      return;
    }

    this.detalleDelPermiso = true;
    this.establecerFormularioDeDetallesDe();
  }

   /**
   * Método que se ejecuta al agregar datos.
   * Envía un mensaje indicando que los datos del permiso han sido establecidos.
   * 
   * @param event Evento que desencadena la acción de agregar.
   */

  public agregar(_event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(false);
    this.servicioDeMensajesService.establecerDatosDePermiso(true);
  }

  /**
   * Método que se ejecuta al cancelar la visualización del detalle del permiso.
   * Establece la variable detalleDelPermiso a false, ocultando el detalle.
   * 
   * @param event Evento que desencadena la acción de cancelar.
   */

  public detalleCancelar(_event: Event): void {
    this.detalleDelPermiso = false;
  }

  /**
   * Método que se ejecuta al cancelar la acción de búsqueda.
   * Envía un mensaje para indicar que se ha cancelado la búsqueda.
   * 
   * @param event Evento que desencadena la cancelación de la acción.
   */

  public cancelar(_event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(false);
  }

  /**
   * Método para establecer el formulario de búsqueda con su validación.
   * Inicializa el formulario de búsqueda con un campo 'tramite' que es obligatorio 
   * y solo acepta números.
   */
  public establecerBusquedaForm(): void {
    this.busquedaForm = this.fb.group({
      tramite: ['', [Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]]
    });
  }

   /**
   * Método para establecer el formulario del detalle del permiso.
   * Inicializa los campos del formulario como deshabilitados y vacíos.
   */
  public estableDetalleDelPermisoForm(): void {
    this.detalleDelPermisoForm = this.fb.group({
      folioTramite: [{ value: '', disabled: true }],
      tipoDeSolicitud: [{ value: '', disabled: true }],
      regimen: [{ value: '', disabled: true }],
      condicionDeLaMercancia: [{ value: '', disabled: true }],
      umt: [{ value: '', disabled: true }],
      cantidad: [{ value: '', disabled: true }],
      cdr: [{ value: '', disabled: true }],
      usd: [{ value: '', disabled: true }],
      fraccionArancelaria: [{ value: '', disabled: true }],
      descripcionDeLaMercancia: [{ value: '', disabled: true }],
      procedencia: [{ value: '', disabled: true }],
      mercancia: [{ value: '', disabled: true }],
      beneficioQueSeObtiene: [{ value: '', disabled: true }],
      observaciones: [{ value: '', disabled: true }],
    });
  }

   /**
   * Método para establecer los valores en el formulario de detalles de permiso.
   * Se utiliza para actualizar el formulario con los datos correspondientes al detalle de la solicitud.
   */
  public establecerFormularioDeDetallesDe(): void {
    this.detalleDelPermisoForm.patchValue(formData);
  }

    // Método que se ejecuta cuando se destruye el componente
  ngOnDestroy(): void {
    // Liberamos los recursos y notificamos a todos los observadores
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
