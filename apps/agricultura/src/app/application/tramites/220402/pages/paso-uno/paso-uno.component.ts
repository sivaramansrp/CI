import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { map, takeUntil } from 'rxjs/operators';

import {
  ConsultaioQuery,
  ConsultaioState,
  SolicitanteComponent
} from '@ng-mf/data-access-user';

import { AgregarDestinatarioComponent } from '../../components/agregar-destinatario/agregar-destinatario.component';
import { PagoDeDerechoComponent } from '../../components/pago-de-derecho/pago-de-derecho.component';
import { TransporteComponent } from '../../components/transporte/transporte.component';

import { CapturaSolicitudeService } from '../../services/captura-solicitud.service';



/**
 * Componente PasoUnoComponent para la vista del trámite 220402.
 *
 * Este componente gestiona los formularios, tabs y validaciones del paso uno del trámite 220402.
 * Incluye referencias a componentes hijos, grupos de formularios y métodos de validación.
 *
 * @component
 */

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice de la pestaña activa. Se recibe como input y controla la navegación entre tabs.
   */
  @Input() indice: number = 1;

  /**
   * Referencia al componente hijo de solicitud, utilizada para acceder a sus métodos y propiedades.
   */
  @ViewChild('solicitudComp', { static: false }) solicitudComp!: SolicitanteComponent;

  /**
   * Referencia al componente hijo de transporte, utilizada para acceder a sus métodos y propiedades.
   */
  @ViewChild('transporteComp', { static: false }) transporteComp!: TransporteComponent;

  /**
   * Referencia al componente hijo de pago de derechos, utilizada para acceder a sus métodos y propiedades.
   */
  @ViewChild('pagoDerechoComp', { static: false }) pagoDerechoComp!: PagoDeDerechoComponent;

  /**
   * Referencia al componente hijo de destinatario, utilizada para acceder a sus métodos y propiedades.
   */
  @ViewChild('destinatarioComp', { static: false }) destinatarioComp!: AgregarDestinatarioComponent;
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * FormGroup para el primer tab del formulario.
   * Contiene los controles y validaciones específicas del tab 1.
   *
   * @type {FormGroup}
   */
  public formGroupTab1: FormGroup = new FormGroup({
    // Ejemplo de control, reemplaza con los controles reales
    campo1: new FormControl('', Validators.required)
  });
  /**
   * FormGroup para el segundo tab del formulario.
   * Contiene los controles y validaciones específicas del tab 2.
   *
   * @type {FormGroup}
   * @memberof PasoUnoComponent
   */
  public formGroupTab2: FormGroup = new FormGroup({
    // Ejemplo de control, reemplaza con los controles reales
    campo2: new FormControl('', Validators.required)
  });

  /**
   * Indica si existen datos de respuesta del servidor para actualizar el formulario.
   *
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones.
   *
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();
  /**
   * Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   *
   * @type {ConsultaioState}
   */
  consultaDatos!: ConsultaioState;

  /**
   * Selecciona una pestaña específica estableciendo el índice correspondiente.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Constructor de la clase PasoUnoComponent.
   *
   * @param {CapturaSolicitudeService} solocitud220402Service Servicio para la gestión de la solicitud 220402.
   * @param {ConsultaioQuery} consultaQuery Query para consultar el estado de la consulta actual.
   * @param {ChangeDetectorRef} cdr Servicio para la detección de cambios manual en la vista.
   */
  constructor(
    private solocitud220402Service: CapturaSolicitudeService,
    private consultaQuery: ConsultaioQuery,
    private cdr: ChangeDetectorRef
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   *
   * Realiza la suscripción al estado de consulta y actualiza los datos del formulario según corresponda.
   * Utiliza el operador `takeUntil` para cancelar las suscripciones cuando el componente se destruye.
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
   *
   * @returns {void}
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
          this.cdr.detectChanges();
        }
      });
  }

  
/**
 * Valida los formularios del paso actual y marca los campos inválidos como tocados para mostrar errores de validación.
 *
 * @returns {boolean} `true` si el formulario es válido, `false` en caso contrario.
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
  /**
   * Valida todos los formularios de los tabs y componentes hijos del paso uno.
   * Marca todos los controles como tocados para mostrar errores de validación.
   *
   * @returns {boolean} `true` si todos los formularios son válidos, `false` en caso contrario.
   */
public validarTodosLosFormularios(): boolean {
  let isValid = true;



  /**
   * Función auxiliar para validar un FormGroup.
   * Marca todos los controles como tocados y verifica la validez del grupo.
   *
   * @param {FormGroup | undefined} formGroup Grupo de formulario a validar.
   * @returns {boolean} `true` si el grupo es válido, `false` en caso contrario.
   */
  const VALIDAR_GRUPO_FORMULARIO = (formGroup: FormGroup | undefined): boolean => {
    if (formGroup) {
      Object.values(formGroup.controls).forEach(control => control.markAsTouched());
      if (!formGroup.valid) {
        return false;
      }
    }
    return true;
  };

  /**
   * Función auxiliar para validar un formulario de componente hijo.
   * Marca todos los controles como tocados, ejecuta la función mostrarErrores si existe y verifica la validez del formulario.
   *
   * @param {FormGroup | undefined} form Formulario del componente hijo a validar.
   * @param {() => void} [mostrarErrores] Función opcional para mostrar errores en el componente hijo.
   * @returns {boolean} `true` si el formulario es válido, `false` en caso contrario.
   */
  const VALIDAR_FORMULARIO_HIJO = (form: FormGroup | undefined, mostrarErrores?: () => void): boolean => {
    if (form) {
      form.markAllAsTouched();
      if (typeof mostrarErrores === 'function') {
        mostrarErrores();
      }
      if (!form.valid) {
        return false;
      }
    }
    return true;
  };



  // Validación de los formularios principales
  if (!VALIDAR_GRUPO_FORMULARIO(this.formGroupTab1)) {
    isValid = false;
  }
  if (!VALIDAR_GRUPO_FORMULARIO(this.formGroupTab2)) {
    isValid = false;
  }

  // Validación de los formularios de componentes hijos
  if (!VALIDAR_FORMULARIO_HIJO(this.solicitudComp?.form)) {
    isValid = false;
  }
  if (!VALIDAR_FORMULARIO_HIJO(this.transporteComp?.transporteForm, this.transporteComp?.mostrarErrores)) {
    isValid = false;
  }
  if (!VALIDAR_FORMULARIO_HIJO(this.pagoDerechoComp?.FormSolicitud, this.pagoDerechoComp?.mostrarErrores)) {
    isValid = false;
  }
  if (!VALIDAR_FORMULARIO_HIJO(this.destinatarioComp?.destinatarioForm, this.destinatarioComp?.mostrarErrores)) {
    isValid = false;
  }

  return isValid;
}
  /**
   * Devuelve la validez de todos los formularios del paso uno.
   *
   * @returns {{ tab1Valid: boolean; tab2Valid: boolean }} Objeto con la validez de los formularios tab1 y tab2.
   */
  static obtenerValidacionTotalFormularios(): { tab1Valid: boolean; tab2Valid: boolean } {
    // Reemplace la lógica de abajo con la lógica real de validación de formularios
    return {
      tab1Valid: true,
      tab2Valid: true
    };
  }
  /**
   * Método que se ejecuta al destruir el componente.
   *
   * Emite un valor al `destroyNotifier$` y lo completa para cancelar todas las suscripciones activas y evitar fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}