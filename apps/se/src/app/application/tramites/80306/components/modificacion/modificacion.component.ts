import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Solicitud80306State, Tramite80306Store } from '../../../../estados/tramites/tramite80306.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CONFIGURACION_MODIFICACION } from '../../constantes/modificacion.enum';
import { CommonModule } from '@angular/common';
import { DatosDelModificacion } from '../../estados/models/datos-tramite.model';
import { ImmerModificacionService } from '../../service/immer-modificacion.service';
import { Tramite80306Query } from '../../../../estados/queries/tramite80306.query';

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
  styleUrl: './modificacion.component.scss',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private solicitudService: ImmerModificacionService,
    private tramite80306Store: Tramite80306Store,
    private tramite80306Query: Tramite80306Query
  ) {}

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
  public derechoState: Solicitud80306State = {} as Solicitud80306State;

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
    this.tramite80306Query.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = {
            ...this.derechoState,
            ...seccionState,
          };
        })).subscribe();
    this.inicializarFormulario();
    this.loadDatosModificacion();
    this.loadDatosTablaData();
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
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
        (this.tramite80306Store.setDatosModificacion as (valor: unknown) => void)(datos);
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
    this.solicitudService.getDatosTableData().pipe(takeUntil(this.destroyNotifier$)).subscribe((data) =>
    {
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
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite80306Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite80306Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

}
