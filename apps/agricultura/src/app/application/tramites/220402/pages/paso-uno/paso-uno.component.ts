import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { CapturaSolicitudeService } from '../../services/captura-solicitud.service';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Componente para la vista de la paso-uno de la sección de "220402".
 */

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  @Input() indice: number = 1;
  @ViewChild('solicitudComp', { static: false }) solicitudComp: any;
  @ViewChild('transporteComp', { static: false }) transporteComp: any;
  @ViewChild('pagoDerechoComp', { static: false }) pagoDerechoComp: any;
  @ViewChild('destinatarioComp', { static: false }) destinatarioComp: any;
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Form groups para cada tab (debes ajustar los controles según tus necesidades) */
  public formGroupTab1: FormGroup = new FormGroup({
    // Ejemplo de control, reemplaza con los controles reales
    campo1: new FormControl('', Validators.required)
  });
  public formGroupTab2: FormGroup = new FormGroup({
    // Ejemplo de control, reemplaza con los controles reales
    campo2: new FormControl('', Validators.required)
  });

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
  * @property {ConsultaioState} consultaDatos
  * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
  */
  consultaDatos!: ConsultaioState;

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  constructor(
    private solocitud220402Service: CapturaSolicitudeService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
  /**
   * @method ngOnInit
   * @description Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes acciones:
   * - Se suscribe al observable `selectConsultaioState$` del servicio `ConsultaioQuery` para obtener el estado actual de la consulta.
   * - Actualiza la propiedad `consultaDatos` con el estado recibido.
   * - Si la propiedad `update` de `consultaDatos` es verdadera, llama al método `guardarDatosFormulario` para cargar y guardar los datos del formulario.
   * - En caso contrario, establece la propiedad `esDatosRespuesta` como verdadera.
   * 
   * Utiliza el operador `takeUntil` para cancelar las suscripciones cuando el componente se destruye, evitando fugas de memoria.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaDatos = seccionState;
    })).subscribe();
    if (this.consultaDatos.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud220402Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud220402Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  
/**
 * Valida los formularios del paso actual y marca los campos inválidos como tocados para mostrar errores de validación.
 */
public validarFormularios(): boolean {
  let isValid = true;

  if (this.indice === 1 && this.solicitante?.form) {
    if (this.solicitante.form.invalid) {
      this.solicitante.form.markAllAsTouched();
      isValid = false;
    }
  }
  return isValid;
}
public validarTodosLosFormularios(): boolean {
  let isValid = true;

  if (this.formGroupTab1) {
    Object.values(this.formGroupTab1.controls).forEach(control => control.markAsTouched());
    if (!this.formGroupTab1.valid) isValid = false;
  }
  if (this.formGroupTab2) {
    Object.values(this.formGroupTab2.controls).forEach(control => control.markAsTouched());
    if (!this.formGroupTab2.valid) isValid = false;
  }

  if (this.solicitudComp && this.solicitudComp.FormSolicitud) {
    this.solicitudComp.FormSolicitud.markAllAsTouched();
    if (typeof this.solicitudComp.mostrarErrores === 'function') {
      this.solicitudComp.mostrarErrores();
    }
    if (!this.solicitudComp.FormSolicitud.valid) isValid = false;
  }

  if (this.transporteComp && this.transporteComp.transporteForm) {
    this.transporteComp.transporteForm.markAllAsTouched();
    if (typeof this.transporteComp.mostrarErrores === 'function') {
      this.transporteComp.mostrarErrores();
    }
    if (!this.transporteComp.transporteForm.valid) isValid = false;
  }

  if (this.pagoDerechoComp && this.pagoDerechoComp.FormSolicitud) {
    this.pagoDerechoComp.FormSolicitud.markAllAsTouched();
    if (typeof this.pagoDerechoComp.mostrarErrores === 'function') {
      this.pagoDerechoComp.mostrarErrores();
    }
    if (!this.pagoDerechoComp.FormSolicitud.valid) isValid = false;
  }

  if (this.destinatarioComp && this.destinatarioComp.destinatarioForm) {
    this.destinatarioComp.destinatarioForm.markAllAsTouched();
    if (typeof this.destinatarioComp.mostrarErrores === 'function') {
      this.destinatarioComp.mostrarErrores();
    }
    if (!this.destinatarioComp.destinatarioForm.valid) isValid = false;
  }
  return isValid;
}
  /**
   * Devuelve la validez de todos los formularios del paso uno.
   * Debe devolver un objeto con las propiedades tab1Valid y tab2Valid.
   */
  obtenerValidacionTotalFormularios(): { tab1Valid: boolean; tab2Valid: boolean } {
    // Reemplace la lógica de abajo con la lógica real de validación de formularios
    return {
      tab1Valid: true,
      tab2Valid: true
    };
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}