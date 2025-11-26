import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { ConsultaService } from '../../service/consulta.service';
import { DatosdelasolicitudComponent } from '../../../../shared/components/shared2607/datos-del/datos-de-la-solicitud.component';
import { Solicitud260702Query } from '../../../../shared/estados/queries/shared2607/tramites260702.query';
import { Solicitud260702Store } from '../../../../shared/estados/stores/shared2607/tramites260702.store';
 
/**
 * Componente que representa el primer paso del trámite.
 *
 * Este componente agrupa los subcomponentes de solicitante, datos de la solicitud,
 * pago de derechos, terceros relacionados y trámites asociados, y administra la
 * navegación entre las pestañas del asistente.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo que contiene los campos del primer paso del trámite.
   */
  pasoUnoForm: FormGroup;
 
/**
 * Referencia al componente hijo "DatosdelasolicitudComponent" para acceder a sus métodos y propiedades.
 */
 @ViewChild(DatosdelasolicitudComponent)datosdelasolicitudComponent!: DatosdelasolicitudComponent;
 /**
  * Notificador utilizado para cancelar suscripciones al destruir el componente.
  * Ayuda a prevenir fugas de memoria en flujos observables.
  */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
   /**
     * Estado de la consulta, utilizado para manejar el estado de la aplicación.
     */
  public consultaState!: ConsultaioState;
  /**
   * Indica si los datos de respuesta están disponibles.
   * Se utiliza para determinar si se deben mostrar los datos del formulario o no.
   */
  public esDatosRespuesta: boolean = false;
  
    /** Indicadores booleanos que validan el estado de los componentdatos de la solicitud */
  private isDatosDeLaSolicitudComponentValid: boolean = false;
  /**
   * Tipo de persona seleccionada.
   *
   * Representa el tipo de persona (por ejemplo, física o moral) que se selecciona.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona. */
  persona: FormularioDinamico[] = [];

  /*** Configuración del formulario dinámico para el domicilio fiscal.*/
  domicilioFiscal: FormularioDinamico[] = [];

    /** Indica si el botón continuar ha sido activado para ejecutar las validaciones del formulario. */
  @Input() isContinuarTriggered: boolean = false;
  /**
   * Índice de la pestaña actual del asistente.
   */
  indice: number = 1;
/**
 * Indica si el formulario es de solo lectura.
 */
  public idProcedimiento: number = 260704;
  /**
     * Constructor del componente.
     *
     * Se utiliza para la inyección de dependencias.
     */
  constructor(
    private fb: FormBuilder,
    private consultaQuery: ConsultaioQuery,
    private consulta: ConsultaService,
    private solicitud260704Store:Solicitud260702Store,
    private solicitud260704Query:Solicitud260702Query
  ) {
    this.pasoUnoForm = this.fb.group({
      folioDeDesistimiento: [''],
      folioOriginal: ['']
    });
  }
 /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se pueden realizar tareas de configuración inicial, pero en este caso lanza un error indicando que no está implementado.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }
  this.solicitud260704Store.setContinuarTriggered(false);
  }
  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormularios(): void {
    this.consulta
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.consulta.actualizarEstadoFormulario(resp);
        }
      });
  }
  
  /**
   * Selecciona una pestaña del asistente.
   *
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

   /**
   * Maneja el cambio de validez del formulario.
   * 
   * @param event - Valor booleano que indica si el formulario es válido o no.
   * Establece el estado de validez del formulario 'datosDelSolicitude' en el store de solicitud260703.
   */
  onFormValidityChange(event:boolean):void {
   this.solicitud260704Store.setFormValidity('datosDelSolicitude', event);
  }
  /**
   * Valida los formularios relacionados con la solicitud actual.
   * 
   * Esta función verifica la validez del componente de datos de la solicitud
   * accediendo al estado actual de `solicitud260703Query` y consultando la propiedad
   * `formValidity.datosDelSolicitude`. Si la propiedad no está definida, retorna `false`.
   * 
   * @returns {boolean} `true` si el formulario de datos de la solicitud es válido, `false` en caso contrario.
   */
  public validarFormularios(): boolean { 

     return this.datosdelasolicitudComponent?.validarFormularios() ?? false;

  }
/**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Aquí se pueden realizar tareas de limpieza, pero en este caso lanza un error indicando que no está implementado.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
