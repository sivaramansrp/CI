import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, ConsultaioQuery, ConsultaioState, TablaDinamicaComponent, TablaSeleccion, TituloComponent, doDeepCopy, esValidArray, esValidObject } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Solicitud80302State, Tramite80302Store } from '../../../../estados/tramites/tramite80302.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CONFIGURACION_MODIFICACION } from '../../constantes/modificacion.enum';
import { CommonModule } from '@angular/common';
import { Planta } from '../../estados/models/plantas-consulta.model';
import { SolicitudService } from '../../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite80302Query } from '../../../../estados/queries/tramite80302.query';

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
    private tramite80302Store: Tramite80302Store,
    private tramite80302Query: Tramite80302Query,
    private consultaioQuery: ConsultaioQuery,
    private toastr: ToastrService 
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
  public derechoState: Solicitud80302State = {} as Solicitud80302State;

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
  public encabezadoDeTabla: ConfiguracionColumna<Planta>[] = CONFIGURACION_MODIFICACION as ConfiguracionColumna<Planta>[];

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: Planta[] = [];

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
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario, carga los datos de modificación y los datos de la tabla.
   */
  ngOnInit(): void {
    this.tramite80302Query.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),
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
      })
    )
    .subscribe();
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
        (this.tramite80302Store.setDatosModificacion as (valor: unknown) => void)(datos);
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
    const PAYLOAD ={
      "rfc": "AAL970927390",
      "idPrograma": "121119",
      "tipoPrograma": "TICPSE.PROSEC",
      "folioPrograma": "9415",
      "discriminator": "80302"
    }
    this.solicitudService
      .obtenerListaDomicilios(PAYLOAD) // Llama al servicio para obtener los datos de operaciones.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data) => {
          if(esValidObject(data)) {
            const RESPONSE = doDeepCopy(data);
            if(esValidArray(RESPONSE.datos?.plantas)) {
              this.datosTabla = RESPONSE.datos?.plantas.filter(
                (obj: Planta) => Object.values(obj).some(value => value !== null)
              ); // Almacena los datos de operaciones.
              this.tramite80302Store.setModificacionDatos(this.datosTabla);
            }
          }
        },
        () => {
          this.toastr.error('Error al cargar las operaciones'); // Manejo de errores.
        }
      );
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
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite80302Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite80302Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Alterna el estado de un registro en la tabla entre 'Baja' y 'Activada'.
   *
   * @param row - El registro de la tabla que se desea modificar. Debe contener un identificador único (`id`).
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
   * this.valorDeAlternancia(registro);
   * // Ahora, registro.desEstatus será 'Activada'.
   * ```
   */
  
  valorDeAlternancia(event: unknown): void {
    if (event && typeof event === 'object' && 'row' in event) {
      const ROW = (event as { row: Planta }).row;
      const INDEX = this.datosTabla.findIndex((x) => x.idPlanta === ROW.idPlanta);
      this.updateTablaData(this.datosTabla[INDEX]);
    }
  }

  /**
   * Actualiza los datos de la tabla enviando la información modificada al servicio.
   * @param datos - Los datos de la planta que se van a actualizar.
   */
  updateTablaData(datos: Planta): void {
    const PAYLOAD ={
      plantas: [datos],
      idFraccion: "1",
      status: datos.estatus ? "true" : "false",
      tipoFraccion: "Plantas",
      idSolicitud: "202744086"
    }
    this.solicitudService
      .actualizarDomicilios(PAYLOAD) // Llama al servicio para obtener los datos de operaciones.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data) => {
          if(esValidObject(data)) {
            const RESPONSE = doDeepCopy(data);
            if(esValidArray(RESPONSE.datos?.plantas)) {
              this.datosTabla = RESPONSE.datos?.plantas.filter(
                (obj: Planta) => Object.values(obj).some(value => value !== null)
              ); // Almacena los datos de operaciones.
            }
          }
        },
        () => {
          this.toastr.error('Error al cargar las operaciones'); // Manejo de errores.
        }
      );
  }
}
