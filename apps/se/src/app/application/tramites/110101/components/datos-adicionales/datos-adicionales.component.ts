import { AlertComponent, CONDICIONES_JUEGOS_SURTIDOS, CONDICIONES_JUEGOS_SURTIDOS_ALIANZA, CategoriaMensaje, ConsultaioQuery, InputRadioComponent, MENSAJE_DE_SELECCION, Notificacion } from '@ng-mf/data-access-user';
import { CatalogosTramiteService } from '../../services/catalogo.service';

import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { PROTESTA } from '@ng-mf/data-access-user';
import { REQUERIDO } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';

import { OPCIONES, RADIO_OPCIONS, SELECCIONAR_TRANSFORMACION} from '../constante110101.enum';
import { MensajePantallaService } from '../../services/validaciones-tabs.service';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
* Este componente se utiliza para mostrar la forma del datos adicionales. - 110101
*/
@Component({
  selector: 'app-datos-adicionales',
  templateUrl: './datos-adicionales.component.html',
  styleUrl: './datos-adicionales.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    TooltipModule
  ]
})
export class DatosAdicionalesComponent implements OnInit, OnDestroy {

  /**
     * Notificación actual que se muestra en el componente.
     *
     * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
     * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
     */
    public nuevaNotificacion!: Notificacion;

  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   *
   * @property {FormGroup} formulario - El formulario del componente.
   */
  public formulario!: FormGroup;

  /**
 * **Subject para manejar la destrucción de suscripciones**
 *
 * - Se utiliza para cancelar las suscripciones activas cuando el componente o servicio es destruido.
 * - Evita fugas de memoria al asegurarse de que las suscripciones se cancelen correctamente.
 * - Se emite un valor en `ngOnDestroy` y luego se completa.
 *
 * @private
 */
  private destroy$ = new Subject<void>();

  /**
   * Representa la entidad seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'CatalogosSelect'.
   *
   * @property {CatalogosSelect} entidad - La entidad seleccionada.
   */
  public entidad!: Catalogo[];

  /**
   * Representa la representación seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'CatalogosSelect'.
   *
   * @property {CatalogosSelect} representacion - La representación seleccionada.
   */

  public representacion!: Catalogo[];
  /**
    * Una cadena que representa la clase CSS para una alerta de información.
    * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
    */
  public infoAlert = 'alert-info';
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Indica si se está realizando una actualización de la consulta.
   * 
   * @default false
   */
  actualizacionCounsulta: boolean = false;

  /**
    * Una constante que contiene textos adicionales para el componente.
    * Se utiliza para almacenar datos adicionales relacionados con el componente.
    */
  public textos?: string;

  /**
   * Representa el estado actual del solicitante para el trámite 110101.
   * Esta propiedad contiene toda la información relevante y el estado del solicitante.
   */
  public solicitudeState!: Solicitante110101State;

  /**
   * Opciones disponibles para el grupo de radio.
   */
  public radioOpcions = RADIO_OPCIONS;

  /**
   * Opciones para el campo de radio (Si/No).
   */
  public opciones = OPCIONES;

  /**
   * Opciones para seleccionar el tipo de proceso (Transformación/Ensamble o montaje).
   */
  public seleccionarTransformacion = SELECCIONAR_TRANSFORMACION;

  /**
   * Indica si se deben mostrar los campos adicionales relacionados con la opción de exportador autorizado.
   * Cuando es `true`, se despliegan los campos adicionales en la interfaz; cuando es `false`, permanecen ocultos.
   *
   * @default false
   */
  public mostrarCampos: boolean = false;

  /**
   * Vista instancia de proceso de transformación
   * Cuando es 'true', permite ver la vista de proceso de transformación.
   */
  isProcesoTransformacion: boolean = false;

  /**
   * Mensaje de alerta para selección de proceso de transformación de la mercancía
   * @property {string} mensajeDeSeleccion - Contiene el mensaje para selección de proceso de transformación
   */
  mensajeDeSeleccion = MENSAJE_DE_SELECCION;

  /**
   * Vista instancia de juegos o surtidos
   * Cuando es 'true', permite ver la vista de juegos o surtidos
   */
  isJuegosSurtidos: boolean = false;

  /**
   * Mensaje de alerta para juegos o surtidos
   * @property {string} condiciones - Contiene las condiciones para juegos o surtidos
   */
  condiciones = CONDICIONES_JUEGOS_SURTIDOS;

  /**
   * Mensaje de alerta para juegos o surtidos México - Panamá
   * @property {string} condicionAlianza - Contiene las condiciones para juegos o surtidos México - Panamá
   */
  condicionAlianza = CONDICIONES_JUEGOS_SURTIDOS_ALIANZA;

  /** Variable para validar el formulario */
  validarFormulario: boolean = false;

  /**
   * Una constante que contiene la cadena de mensaje requerida.
   * Este mensaje se utiliza para indicar que un campo es obligatorio.
   */
  public MENSAJE_REQUERIDO = REQUERIDO;

  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(private fb: FormBuilder,
    private tramite110101Store: Tramite110101Store,
    private solicitanteQuery: Solicitante110101Query,
    private consultaioQuery: ConsultaioQuery,
    private catalogoTramiteService: CatalogosTramiteService,
    private mensajeService: MensajePantallaService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          if (seccionState.update) {
            this.actualizacionCounsulta = seccionState.update;

           }
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$), map((seccionState) => {
      this.solicitudeState = seccionState;
    })).subscribe();
    this.inicializarFormulario();
    this.getEntidadFederativa();
    this.getDeclaracionDatos();
    //validacion para cuando de tab sin el boton de continuar
    if (this.solicitudeState?.validacion_formularios?.validacion_tab_datos_adicionales === false) {
      this.formulario.markAllAsTouched();
      this.mensajeService.mostrarMensaje(true);
    }

    // Inicializa la validación si aún no existe
    if (this.solicitudeState.validacion_formularios.validacion_tab_datos_adicionales === null) {
      this.tramite110101Store.setValidacionFormulario('validacion_tab_datos_adicionales', this.validarFormulario);
    }
    this.formulario.statusChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((_value) => {
          this.validarFormulario = this.formulario.valid;
          this.tramite110101Store.setValidacionFormulario('validacion_tab_datos_adicionales', this.validarFormulario);
        })
      )
      .subscribe(); 
    this.mensajeService.tocarFormulario$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.formulario.markAllAsTouched();
    });
  }

  /**
   * Inicializa el formulario reactivo del componente con los valores por defecto
   * del estado actual `solicitudeState`. El formulario contiene los controles
   * 'entidad' y 'representacion', ambos marcados como requeridos.
   * Este método debe llamarse para configurar el formulario antes de la interacción del usuario.
   */
  public inicializarFormulario(): void {
    this.formulario = this.fb.group({
      entidad: [this.solicitudeState?.entidad, Validators.required],
      representacion: [this.solicitudeState?.representacion, Validators.required],
      metodoSeparacion: [Boolean(this.solicitudeState?.metodoSeparacion)],
      exportadorAutorizado: [Boolean(this.solicitudeState?.exportadorAutorizado)],
      exportadorAutorizadoJPN: [Boolean(this.solicitudeState?.exportadorAutorizadoJPN)],
      informacionRadios: [this.solicitudeState?.informacionRadios],
      informacionRadiosJPN: [this.solicitudeState?.informacionRadiosJPN],
      transformacion53:[this.solicitudeState?.transformacion53],
      descripcionJuegoSurtido: [this.solicitudeState?.juegos_surtidos_tab_procesos],
      juegosSurtidosBooleanMexicoPeru: [this.solicitudeState?.juegosSurtidosBooleanMexicoPeru],
      juegosSurtidosBooleanMexicoPanama: [this.solicitudeState?.juegosSurtidosBooleanMexicoPanama],
      juegosSurtidosBooleanAlianzaPacifico: [this.solicitudeState?.juegosSurtidosBooleanAlianzaPacifico],
      protesto_verdad: [this.solicitudeState?.protesto_verdad, Validators.requiredTrue]
    });
  }

  /**
   * @method getEntidadFederativa
   * @description Obtiene el catálogo de la entidad federativa
   *
   * Recupera y establece la información de la entidad federativa.
   * El objeto de entidad incluye el nombre de la etiqueta, el estado requerido, la opción predeterminada,
   * y un catálogo de opciones disponibles.
   *
   * @returns {void}
   */
  public getEntidadFederativa(): void {
    this.catalogoTramiteService.getCatEntidadesFederativas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            // El backend manda "datos"
            const DATOS = response.datos || [];

          // Transformación a tu respuesta a response Catalogo
          this.entidad = DATOS.map((item, index) => ({
            id: index + 1,
            descripcion: item.descripcion,
            clave: item.clave,
          }));
          
        const VALOR_GUARDADO = this.formulario.get('entidad')?.value;
        if (VALOR_GUARDADO) {
          const OPCION = this.entidad.find(
                (c) => c.clave === VALOR_GUARDADO || c.id === VALOR_GUARDADO);
          
          this.formulario.patchValue({
            entidad: OPCION?.id,
          }, { emitEvent: false }); // IMPORTANTE: evitar bucles
          this.getRepresentacionFederal(OPCION?.clave || '');
          

        }
        }else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: response.error || 'Error catálogo de entidad federativa.',
            mensaje: response.causa || response.mensaje || 'Error catálogo de entidad federativa',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      },
      error: (err) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: CategoriaMensaje.ERROR,
          modo: 'action',
          titulo: 'Error al obtener catálogo de entidad federativa.',
          mensaje: err?.mensaje || 'Error al obtener catálogo de entidad federativa.',
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
      }
    });
  }

  /**
   * @method getRepresentacionFederal
   * @description Obtiene el catálogo de la representación federal.
   * @param cveEntidad - Clave de la entidad federativa para filtrar la representación federal.
   * 
   * Recupera y establece la información de la entidad federativa.
   * El objeto de entidad incluye el nombre de la etiqueta, el estado requerido, la opción predeterminada,
   * y un catálogo de opciones disponibles.
   *
   * @returns {void}
   */
  public getRepresentacionFederal(cveEntidad: string): void {
    this.tramite110101Store.setEntidad(cveEntidad);
    this.catalogoTramiteService.getCatRepresentacionFederal(cveEntidad)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.codigo === CodigoRespuesta.EXITO) {
            // El backend manda "datos"
            const DATOS = response.datos || [];

          // Transformación a tu respuesta a response Catalogo
          this.representacion = DATOS.map((item, index) => ({
            id: index + 1,
            descripcion: item.descripcion,
            clave: item.clave,
          }));
          const VALOR_GUARDADO_REPRESENTACION = this.formulario.get('representacion')?.value;
          const OPCION_REPRESENTACION = this.representacion.find(
            (c) => c.clave === VALOR_GUARDADO_REPRESENTACION || c.id === VALOR_GUARDADO_REPRESENTACION
          );
          this.formulario.patchValue({
            representacion: OPCION_REPRESENTACION?.id
          }, { emitEvent: false }); // IMPORTANTE: evitar bucles
        }else{
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: response.error || 'Error catálogo de representación federal.',
            mensaje: response.causa || response.mensaje || 'Error catálogo de representación federal',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          }
        }
      },
      error: (err) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: CategoriaMensaje.ERROR,
          modo: 'action',
          titulo: 'Error al obtener catálogo de representación federal.',
          mensaje: err?.mensaje || 'Error al obtener catálogo de representación federal.',
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
      }
    });
  }

  /**
   * @method onRepresentacionFederal
   * @description Maneja el evento de selección de una representación federal.
   * @param {Catalogo} selectedOption - La opción seleccionada de representación federal.
   * @returns {void} No retorna ningún valor.
   */
  onRepresentacionFederal(selectedOption: Catalogo): void {
    this.getRepresentacionFederal(selectedOption.clave || '');
  }

  /**
   * Maneja el cambio de selección de representación federal y 
   * actualiza el estado del store con la clave seleccionada.
   *
   * @method onRepresentacionChange
   * @param {Catalogo} event - Objeto del catálogo que representa la opción seleccionada.
   * @returns {void} No retorna ningún valor.
   */
  onRepresentacionChange(event: Catalogo): void {
    this.tramite110101Store.setRepresentacion(event.clave ?? null);
  }

  /**
   * @method getDeclaracionDatos
   * @description Obtiene el catálogo de la declaración de datos.
   * Recupera y establece la información de la declaración de datos.
   * El objeto de declaración de datos incluye el nombre de la etiqueta y la descripción.
   *
   * @returns {void}
   */
  public getDeclaracionDatos(): void {
    this.catalogoTramiteService.getCatDeclaracionDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response.codigo === CodigoRespuesta.EXITO) {          
         this.textos = response.datos?.[0]?.descripcion ?? undefined;
         this.tramite110101Store.clearDeclaraciones();
         this.tramite110101Store.addDeclaraciones(response.datos ?? []);
        }else {
        this.textos = PROTESTA.ADJUNTAR;}
      });
  }
  
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110101Store, campoStore?: string): void {
    const VALOR = form.get(campo)?.value;
    if (metodoNombre === 'setValor' ) {
      const CAMPO = (campoStore) as keyof Solicitante110101State;
      this.tramite110101Store.setValor(CAMPO, VALOR);
    }else{
      (this.tramite110101Store[metodoNombre] as (value: unknown) => void)(VALOR);
    }
  }

  /**
   * Busca un país en la tabla de datos del servicio de solicitud.
   * @param country - El código del país a buscar.
   * @returns true si el país se encuentra en la tabla, false en caso contrario.
   */
  busquedaPaises(country: string): boolean {
  const DATA = this.solicitudeState?.respuestaServicioDatosTabla;
  return Array.isArray(DATA) ? DATA.some(item => item?.cve_pais === country) : false;
}

  /**
   * **Ciclo de vida: Destruye las suscripciones y limpia recursos**
   * 
   * - `this.destroy$.next();` emite un valor para notificar a las suscripciones activas que deben finalizar.
   * - `this.destroy$.complete();` marca el `Subject` como completado, asegurando que no se emitan más valores en el futuro.
   * - Esto previene fugas de memoria al garantizar que las suscripciones dependientes de `takeUntil(this.destroy$)` se cancelen correctamente.
   */
  ngOnDestroy(): void {
    this.destroy$.next(); // Notifica a las suscripciones activas que deben finalizar
    this.destroy$.complete(); // Completa el Subject para evitar futuras emisiones
  }

}
