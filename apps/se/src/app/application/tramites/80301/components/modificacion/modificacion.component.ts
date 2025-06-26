import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Subject, map, takeUntil } from 'rxjs';

import {
  ConfiguracionColumna,
  ConsultaioQuery,
  ConsultaioState,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent
} from '@ng-mf/data-access-user';
import { Solicitud80301State, Tramite80301Store } from '../../estados/tramite80301.store';

import { CONFIGURACION_MODIFICACION } from '../../constantes/modificacion.enum';
import { DatosDelModificacion } from '../../models/datos-tramite.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite80301Query } from '../../estados/tramite80301.query';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.css',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private tramite80301Store: Tramite80301Store,
    private tramite80301Query: Tramite80301Query,
    private consultaioQuery: ConsultaioQuery,
  ) {}  


  /**
* Indica si el formulario se encuentra en modo solo lectura.
* Si es `true`, los controles del formulario estarán deshabilitados para evitar modificaciones.
*/
  esFormularioSoloLectura: boolean = false

  /**
 * @property {ConsultaioState} consultaDatos
 * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
 */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;
  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  modificacionForm!: FormGroup;

  /**
   * Observable para notificar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   * Contiene los datos relacionados con la modificación del trámite.
   */
  public derechoState: Solicitud80301State = {} as Solicitud80301State;

  /**
   * Representa la tabla de selección utilizada en el componente de modificación.
   * Esta tabla se utiliza para gestionar y mostrar los datos seleccionados
   * en el contexto de los trámites específicos.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de las columnas de la tabla dinámica.
   * Define las propiedades de cada columna, como encabezado, clave y orden.
   */
  public encabezadoDeTabla: ConfiguracionColumna<DatosDelModificacion>[] = CONFIGURACION_MODIFICACION;

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: DatosDelModificacion[] = [];

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario, carga los datos de modificación y los datos de la tabla.
   */
  ngOnInit(): void {
    this.tramite80301Query.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.derechoState = {
          ...this.derechoState,
          ...seccionState,
        };
      })).subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario()
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.loadDatosModificacion();
    this.loadDatosTablaData();
  }



  donanteDomicilio(): void {
    this.modificacionForm = this.fb.group({
      rfc: [
        this.derechoState?.datosModificacion.rfc,
        [Validators.required, Validators.maxLength(20)]
      ],

      federal: [
        this.derechoState?.datosModificacion.federal,
        [Validators.maxLength(100)]
      ],
      tipo: [
        this.derechoState?.datosModificacion.federal,
        [Validators.maxLength(100)]
      ],
      programa: [
        this.derechoState?.datosModificacion.federal,
        [Validators.maxLength(100)]
      ]
    });
    this.inicializarEstadoFormulario();
  }


  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosDelFormulario();
    } else {
      this.datosDeAvisoForm()
    }
  }

  guardarDatosDelFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.modificacionForm.disable();
    } else {
      this.modificacionForm.enable();
    }
  }
  /**
   * Inicializa el formulario reactivo con los valores actuales del estado.
   */
  inicializarFormulario(): void {
    this.modificacionForm = this.fb.group({
      rfc: [this.derechoState?.datosModificacion?.rfc, []],
      federal: [this.derechoState?.datosModificacion?.federal, []],
      tipo: [this.derechoState?.datosModificacion?.tipo, []],
      programa: [this.derechoState?.datosModificacion?.programa, []],
    });
  }

  /**
   * Carga los datos de modificación desde el servicio.
   * Actualiza el estado del trámite y los valores del formulario.
   */
  loadDatosModificacion(): void {
    this.solicitudService.getDatosModificacion().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      (this.tramite80301Store.setDatosModificacion as (valor: unknown) => void)(datos);
      this.setFormValues();
    });
  }

  /**
   * Cargar datos de la tabla.
   *
   * Este método obtiene los datos de la tabla desde el servicio `datosTramiteService`
   * y los almacena en la propiedad `datosTabla`. Utiliza `takeUntil` para cancelar la suscripción
   * cuando el componente se destruye, evitando fugas de memoria.
   *
   * @example
   * // Llamar al método para cargar los datos de la tabla
   * this.loadDatosTablaData();
   */
  loadDatosTablaData(): void {
    this.solicitudService.getDatosTableData().pipe(takeUntil(this.destroyNotifier$)).subscribe((data) => {
      this.datosTabla = data;
    });
  }

  /**
   * Establece los valores del formulario utilizando los datos de modificación.
   */
  setFormValues(): void {
    this.modificacionForm.get('rfc')?.setValue(this.derechoState?.datosModificacion?.rfc);
    this.modificacionForm.get('federal')?.setValue(this.derechoState?.datosModificacion?.federal);
    this.modificacionForm.get('tipo')?.setValue(this.derechoState?.datosModificacion?.tipo);
    this.modificacionForm.get('programa')?.setValue(this.derechoState?.datosModificacion?.programa);
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite80301Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite80301Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Alterna el estado de un registro en la tabla entre 'Baja' y 'Activada'.
   *
   * @param event - Contiene el registro de la tabla (`row`) y la columna (`column`) que se desea modificar.
   *
   * @remarks
   * Este método busca el índice del registro en la tabla `datosTabla` utilizando el identificador (`id`) del registro proporcionado.
   * Luego, cambia el valor de la propiedad `desEstatus` del registro encontrado:
   * - Si el estado actual es 'Baja', se cambia a 'Activada'.
   * - Si el estado actual es diferente de 'Baja', se cambia a 'Baja'.
   *
   * @example
   * ```typescript
   * const registro = { id: 1, desEstatus: 'Baja' };
   * this.valorDeAlternancia({ row: registro, column: 'desEstatus' });
   * // Ahora, registro.desEstatus será 'Activada'.
   * ```
   */// eslint-disable-next-line @typescript-eslint/no-explicit-any
  valorDeAlternancia(event: any): void {
    const ROW = event.row; // Obtiene el registro de la fila.
    const INDEX = this.datosTabla.findIndex((x) => x.id === ROW.id); // Busca el índice del registro en la tabla.
    // Alterna el estado entre 'Baja' y 'Activada'.
    this.datosTabla[INDEX].desEstatus = this.datosTabla[INDEX].desEstatus === 'Baja' ? 'Activada' : 'Baja';
  }

  datosDeAvisoForm(): void {
    if (this.esFormularioSoloLectura && this.modificacionForm) {
      this.modificacionForm.get('rfc')?.disable();
      this.modificacionForm.get('federal')?.disable();
      this.modificacionForm.get('tipo')?.disable();
      this.modificacionForm.get('programa')?.disable();
    }
  }
  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica la destrucción del componente.
    this.destroyNotifier$.complete(); // Completa el observable para evitar fugas de memoria.
  }

}