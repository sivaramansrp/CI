import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CONFIGURACION_AGREGAR, CONFIGURACION_IDIQUESI, CONFIGURACION_MODIFICAR, CONFIGURACION_SOCIEDADES, MANDATARIOS_DEL_AGENT } from '../../constants/sociedades-tabla.enum';
import { CONFIGURACION_INSTALACIONES, CONFIGURACION_INSTALACIONES_TABLA, DatosDeLasInstalaciones, ENLACE_TABLA, Instalaciones, MANDATARIOS_DE_AGENTE_ADUANAL, MandatariosDeAgenteAduanal, Sociedades } from '../../models/sociedades.model';
import { Component, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { EsquemaDeCertificacionService } from '../../services/esquema-de-certificacion.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

/**
 * Componente para la gestión y visualización de tablas relacionadas con sociedades,
 * instalaciones y mandatarios en el trámite 32612.
 *
 * - Permite mostrar y manipular datos de sociedades, instalaciones y mandatarios.
 * - Integra formularios dinámicos para agregar, modificar y consultar información.
 * - Utiliza servicios para obtener datos desde la API y gestiona el estado de solo lectura.
 * - Proporciona funcionalidad para abrir modales y emitir cambios de valor.
 *
 * @example
 * <app-sociedades-tabla></app-sociedades-tabla>
 *
 * @remarks
 * Este componente es standalone y utiliza varios servicios y stores para la gestión de datos.
 *
 * @see EsquemaDeCertificacionService
 * @see Tramite32612Store
 * @see Tramite32612Query
 * @see ConsultaioQuery
 */
@Component({
  selector: 'app-sociedades-tabla',
  standalone: true,
  providers: [BsModalService],
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    TituloComponent,
    FormasDinamicasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './sociedades-tabla.component.html',
  styleUrl: './sociedades-tabla.component.scss',
})
export class SociedadesTablaComponent implements OnInit,OnDestroy {

  /**
   * Subject utilizado para notificar y completar las suscripciones cuando el componente se destruye.
   * Garantiza la limpieza adecuada de los observables para evitar fugas de memoria.
   * Normalmente se utiliza con el operador `takeUntil` de RxJS en los hooks del ciclo de vida del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Referencia al modal actualmente abierto.
   * Se utiliza para controlar e interactuar con la instancia del modal.
   * Opcional; será undefined si no hay ningún modal abierto.
   */
  modalRef?: BsModalRef;
  /**
   * Representa el modo de selección de casillas de verificación para la tabla.
   * Utiliza el valor `CHECKBOX` del enum `TablaSeleccion` para habilitar la funcionalidad de selección mediante casillas de verificación.
   */
  public checkbox = TablaSeleccion.CHECKBOX;
  /**
   * Configuración de las columnas para la tabla de sociedades.
   * Utiliza la constante `ENLACE_TABLA` para definir la estructura y propiedades de cada columna.
   *
   * @type {ConfiguracionColumna<Sociedades>[]}
   */
  public configuracionTabla: ConfiguracionColumna<Sociedades>[] = ENLACE_TABLA;
  /**
   * Un arreglo que contiene los datos de las sociedades.
   * Cada elemento representa una sociedad y es de tipo `Sociedades`.
   * Se utiliza para almacenar y gestionar la lista de sociedades mostradas en la tabla.
   */
  public sociedadesDatos: Sociedades[] = [];
  /**
   * Configuración de las columnas para la tabla de sociedades, basada en la estructura de datos de las instalaciones.
   *
   * Utiliza la constante `CONFIGURACION_INSTALACIONES` para definir las columnas que se mostrarán en la tabla.
   *
   * @type {ConfiguracionColumna<DatosDeLasInstalaciones>[]}
   * @see CONFIGURACION_INSTALACIONES
   */
  public configuracionDatosTabla: ConfiguracionColumna<DatosDeLasInstalaciones>[] = CONFIGURACION_INSTALACIONES;
  /**
   * Almacena la lista de datos de instalaciones para el componente.
   * Cada elemento del arreglo representa los detalles de una instalación específica.
   *
   * @type {DatosDeLasInstalaciones[]}
   */
  public instalacionesDatos: DatosDeLasInstalaciones[] = [];
  /**
   * Un FormGroup anidado que representa la estructura del formulario para agregar sociedades.
   * 
   * @remarks
   * El FormGroup externo (`agregarSociedadesForma`) contiene un único FormGroup anidado
   * llamado `agregarSociedadesFormGroup`, el cual puede ser extendido para incluir controles
   * de formulario relacionados con sociedades.
   *
   * @example
   * // Acceder al grupo de formulario anidado
   * const grupoAnidado = agregarSociedadesForma.get('agregarSociedadesFormGroup');
   */
  public agregarSociedadesForma: FormGroup = new FormGroup({
    agregarSociedadesFormGroup: new FormGroup({})
  });
  /**
   * Grupo de formulario que representa la estructura para agregar un nuevo elemento.
   * Contiene un grupo de formulario anidado llamado `agregarFormGroup` para controles adicionales.
   */
  public agregarForma: FormGroup = new FormGroup({
    agregarFormGroup: new FormGroup({})
  });
  /**
   * Holds the configuration object for sociedades (societies) data.
   * 
   * This property is initialized with the value of `CONFIGURACION_SOCIEDADES`,
   * which defines the structure and settings for displaying or managing
   * sociedades information within the component.
   *
   * @see CONFIGURACION_SOCIEDADES
   */
  public agregarSociedadesDatos = CONFIGURACION_SOCIEDADES;
  /**
   * Objeto de configuración para agregar datos a la tabla.
   * 
   * Esta propiedad utiliza la constante `CONFIGURACION_AGREGAR` para definir
   * la configuración y estructura para agregar nuevas entradas en la tabla de sociedades.
   * 
   * @see CONFIGURACION_AGREGAR
   */
  public agregarDatos = CONFIGURACION_AGREGAR;
  /**
   * Configuración de las columnas para la tabla de instalaciones.
   * 
   * Utiliza la constante `CONFIGURACION_INSTALACIONES_TABLA` para definir
   * las columnas que se mostrarán en la tabla de instalaciones, especificando
   * el tipo de datos de cada columna mediante el tipo genérico `ConfiguracionColumna<Instalaciones>`.
   *
   * @see CONFIGURACION_INSTALACIONES_TABLA
   * @type {ConfiguracionColumna<Instalaciones>[]}
   */
  public configuracionInstalaciones: ConfiguracionColumna<Instalaciones>[] = CONFIGURACION_INSTALACIONES_TABLA;
  /**
   * Un arreglo que contiene la lista de instalaciones asociadas al componente.
   * Cada elemento del arreglo es de tipo `Instalaciones`.
   */
  public instalaciones: Instalaciones[] = [];
  /**
   * Grupo de formulario que representa la sección "Indique Sí".
   * 
   * Este grupo de formulario contiene un `indiqueSiFormGroup` anidado como un `FormGroup` vacío.
   * Puede ser extendido para incluir controles de formulario o grupos anidados adicionales según sea necesario.
   */
  public indiqueSiFormGroup: FormGroup = new FormGroup({
    indiqueSiFormGroup: new FormGroup({})
  });
  /**
   * Almacena el objeto de configuración para la sección "Indique Sí".
   * 
   * Esta propiedad se inicializa con el valor de `CONFIGURACION_IDIQUESI`,
   * que contiene la configuración y opciones relevantes para la visualización de datos del componente.
   */
  public indiqueDatos = CONFIGURACION_IDIQUESI;
  /**
   * Configuración de las columnas para la tabla de mandatarios de agente aduanal.
   * Utiliza el arreglo `MANDATARIOS_DE_AGENTE_ADUANAL` para definir las columnas
   * que se mostrarán en la tabla, basado en el tipo `ConfiguracionColumna<MandatariosDeAgenteAduanal>`.
   */
  public configuracionMandatariosTabla: ConfiguracionColumna<MandatariosDeAgenteAduanal>[] = MANDATARIOS_DE_AGENTE_ADUANAL;
  /**
   * Almacena la lista de "Mandatarios de Agente Aduanal" asociados al contexto actual.
   * 
   * Cada elemento del arreglo representa los datos de un mandatario individual.
   * Esta propiedad se utiliza normalmente para mostrar o gestionar los mandatarios dentro del componente.
   */
  public mandatariosDatos: MandatariosDeAgenteAduanal[] = [];
  /**
   * Grupo de formulario que representa los mandatarios del agente.
   * 
   * Este grupo de formulario contiene un FormGroup anidado llamado `mandatariosDelAgenteFormGroup`,
   * que puede utilizarse para gestionar y validar los datos relacionados con los mandatarios del agente.
   */
  public mandatariosDelAgenteFormGroup: FormGroup = new FormGroup({
    mandatariosDelAgenteFormGroup: new FormGroup({})
  });
  /**
   * Contiene la lista de mandatarios asociados al agente.
   * Los datos provienen de la constante `MANDATARIOS_DEL_AGENT`.
   * Se utiliza para mostrar o procesar información sobre los mandatarios del agente en el componente.
   */
  public mandatariosDelAgenteDatos = MANDATARIOS_DEL_AGENT;
  /**
   * Representa el estado actual de la solicitud para el trámite 32612.
   * 
   * Esta propiedad contiene toda la información relevante sobre la solicitud,
   * incluyendo su estado, datos asociados y cualquier cambio realizado durante
   * el ciclo de vida de la aplicación.
   *
   * @type {Solicitude32612State}
   */
  public solicitudeState!: Solicitude32612State;
  /**
   * Grupo de formulario principal para el componente, que contiene un `modificarFormGroup` anidado.
   * 
   * @remarks
   * Este grupo de formulario sirve como raíz para gestionar los controles de formulario y la validación
   * dentro del componente. El `modificarFormGroup` se inicializa como un `FormGroup` vacío y puede ser
   * llenado con controles según sea necesario para las operaciones de modificación.
   */
  public forma: FormGroup = new FormGroup({
    modificarFormGroup: new FormGroup({}),
  });
  /**
   * Objeto de configuración para modificar datos en el componente SociedadesTabla.
   * 
   * Esta propiedad contiene los ajustes definidos en `CONFIGURACION_MODIFICAR`, que
   * se utilizan para controlar el comportamiento y la apariencia de la funcionalidad de modificación.
   *
   * @see CONFIGURACION_MODIFICAR
   */
  public modificarDatos = CONFIGURACION_MODIFICAR;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando se establece en `true`, los campos del formulario no son editables.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Crea una instancia de SociedadesTablaComponent.
   * 
   * @param modalService - Servicio para gestionar modales de Bootstrap.
   * @param esquemaDeCertificacionSvc - Servicio para manejar esquemas de certificación.
   * @param tramite32612Store - Store para gestionar el estado relacionado con el trámite 32612.
   * @param tramite32612Query - Query para acceder al estado del trámite 32612.
   * @param consultaioQuery - Query para acceder al estado de Consultaio.
   * 
   * Se suscribe al observable del estado de Consultaio y actualiza la propiedad
   * `esFormularioSoloLectura` según el flag `readonly` en el estado. La suscripción
   * se cancela automáticamente cuando el componente se destruye.
   */
  constructor(
    @Inject(BsModalService)
    private modalService: BsModalService,
    private esquemaDeCertificacionSvc: EsquemaDeCertificacionService,
    private tramite32612Store: Tramite32612Store,
    private tramite32612Query: Tramite32612Query,
    private consultaioQuery: ConsultaioQuery
  ) {
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos del componente.
   * 
   * - Se suscribe al observable `selectSolicitude$` de `tramite32612Query` para actualizar la propiedad `solicitudeState`.
   * - Inicializa la tabla de sociedades llamando a `getSociedadesTabla()`.
   * - Obtiene los datos de instalaciones llamando a `getDatosDeLasInstalacionesDatos()`.
   *
   * @remarks
   * Este método es invocado automáticamente por Angular cuando el componente es inicializado.
   */
  ngOnInit(): void {
    this.tramite32612Query.selectSolicitude$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeState = seccionState;
        })
      ).subscribe();
    this.getSociedadesTabla();
    this.getDatosDeLasInstalacionesDatos();
    this.getMandatariosDeAgenteTablaDatos();
  }

  /**
   * Obtiene la instancia de `FormGroup` asociada al control 'agregarSociedadesFormGroup'
   * desde el grupo de formulario padre `agregarSociedadesForma`.
   *
   * @returns El `FormGroup` correspondiente a 'agregarSociedadesFormGroup'.
   */
  get agregarSociedadesFormGroup(): FormGroup {
    return this.agregarSociedadesForma.get('agregarSociedadesFormGroup') as FormGroup;
  }

  /**
   * Obtiene la instancia de `FormGroup` asociada al control 'agregarFormGroup'
   * desde el grupo de formulario padre `agregarForma`.
   *
   * @returns El `FormGroup` correspondiente a 'agregarFormGroup'.
   */
  get agregarFormGroup(): FormGroup {
    return this.agregarForma.get('agregarFormGroup') as FormGroup;
  }

  /**
   * Obtiene el 'indiqueSiFormGroup' anidado como un FormGroup desde el grupo padre 'indiqueSiFormGroup'.
   *
   * @returns {FormGroup} La instancia del FormGroup anidado asociada a 'indiqueSiFormGroup'.
   */
  get indiqueSiDatos(): FormGroup {
    return this.indiqueSiFormGroup.get('indiqueSiFormGroup') as FormGroup;
  }
  /**
   * Obtiene el 'modificarFormGroup' como un FormGroup desde el formulario principal.
   * 
   * @returns La instancia de FormGroup asociada a 'modificarFormGroup'.
   */
  get modificarFormGroup(): FormGroup {
    return this.forma.get('modificarFormGroup') as FormGroup;
  }

  /**
   * Obtiene los datos para la tabla de "sociedades" desde el servicio de esquema de certificación.
   * Se suscribe al observable y asigna la respuesta a `sociedadesDatos`.
   * Maneja los errores durante el proceso de obtención de datos.
   *
   * @remarks
   * El método utiliza el operador `takeUntil` de RxJS para cancelar automáticamente la suscripción cuando se emite `destroyNotifier$`.
   */
  public getSociedadesTabla(): void {
    this.esquemaDeCertificacionSvc.getSociedadesTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.sociedadesDatos = API_RESPONSE;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }

  /**
   * Obtiene los datos de instalaciones desde el servicio de certificación y los asigna a `instalacionesDatos`.
   * Se suscribe al observable retornado por `getDatosDeLasInstalaciones`, y asegura la cancelación de la suscripción
   * utilizando `takeUntil` con `destroyNotifier$`.
   *
   * Maneja la respuesta de la API realizando una clonación profunda antes de la asignación.
   * El manejo de errores se realiza en el callback `error`.
   */
  public getDatosDeLasInstalacionesDatos(): void {
    this.esquemaDeCertificacionSvc.getDatosDeLasInstalaciones().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.instalacionesDatos = API_RESPONSE;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }

  /**
   * Obtiene la lista de "mandatarios" asociados a un agente y actualiza la fuente de datos del componente.
   *
   * Este método llama al servicio `getMandatariosDeAgenteTabla`, se suscribe a su observable
   * y asigna la respuesta a la propiedad `mandatariosDatos`. También asegura la cancelación
   * adecuada de la suscripción utilizando el observable `destroyNotifier$` para evitar fugas de memoria.
   *
   * El manejo de errores se realiza en el callback de error de la suscripción.
   */
  getMandatariosDeAgenteTablaDatos(): void {
    this.esquemaDeCertificacionSvc.getMandatariosDeAgenteTabla().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.mandatariosDatos = API_RESPONSE;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }

  /**
   * Abre un cuadro de diálogo modal utilizando la referencia de plantilla proporcionada.
   *
   * @param template - La referencia de la plantilla que se mostrará dentro del modal.
   * @remarks
   * El modal se muestra con tamaño grande (clase `modal-lg`).
   */
  public abrirModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-lg',});
  }

  /**
   * Emite un cambio de valor para un campo específico actualizando el store.
   *
   * @param event - Un objeto que contiene el nombre del campo (`campo`) y su nuevo valor (`valor`).
   *                La propiedad `campo` especifica qué campo se debe actualizar y la propiedad `valor`
   *                proporciona el nuevo valor para ese campo.
   */
  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  /**
   * Método del ciclo de vida que se llama cuando el componente es destruido.
   * Emite un valor y completa el subject `destroyNotifier$` para limpiar las suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
