import * as formData from '@libs/shared/theme/assets/json/140105/datos-del-formulario.json';
import { AfterViewInit,ElementRef,ViewChild } from '@angular/core';
import {CategoriaMensaje,TipoNotificacionEnum} from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Cancelacion } from '../../models/cancelacion-de-solicitus.model';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DesistimientoQuery } from '../../estados/desistimiento-de-permiso.query';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import {Notificacion} from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-cancelacion-de-solicitud',
  templateUrl: './cancelacion-de-solicitud.component.html',
  styleUrl: './cancelacion-de-solicitud.component.scss',
})


export class CancelacionDeSolicitudComponent implements OnInit, OnDestroy,AfterViewInit {
  /**
   * Formulario para capturar los datos de la solicitud.
   */
  solicitudForm?: FormGroup;
  /**
   * Sujeto para gestionar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyNotificationSubject$ = new Subject<void>();
  /**
   * Formulario para capturar el motivo de cancelación.
   */
  public cancelacionForm!: FormGroup;

    /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @descripcion
   * Instancia del modal de modificación.
   */
  modalInstanceDos!: Modal;

  /**
   * Instancia del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  modalInstances: Modal | null = null;

  // Store values - subscribed at component level like 80205
  /**
   * RFC del solicitante obtenido del store.
   */
  rfcSolicitante: string = '';

  /**
   * Clave de entidad federativa obtenida del store.
   */
  claveEntidadFederativa: string = '09';

  /**
   * ID del tipo de trámite obtenido del store.
   */
  idTipoTramite: number = 140105;

  

  /**
   * Configuración de las columnas de la tabla de solicitudes de cancelación.
   */
  configuracionColumnasSolicitud: ConfiguracionColumna<Cancelacion>[] = [
    { encabezado: 'Folio trámite', clave: (fila) => fila.folioTramite, orden: 1 },
    { encabezado: 'Tipo solicitud', clave: (fila) => fila.tipoDeSolicitud, orden: 2 },
    { encabezado: 'Régimen', clave: (fila) => fila.regimen, orden: 3 },
    { encabezado: 'Clasificación régimen', clave: (fila) => fila.cdr, orden: 4 },
    { encabezado: 'Condición de la mercancía', clave: (fila) => fila.condicionDeLaMercancia, orden: 5 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 6 },
    { encabezado: 'Unidad de medida', clave: (fila) => fila.umt, orden: 7 },
    { encabezado: 'Cantidad solicitada', clave: (fila) => fila.cantidad, orden: 8 },
    { encabezado: 'Valor solicitado', clave: (fila) => fila.usd, orden: 9 },
  ];
   /**
   * Configuración para la selección de filas en la tabla.
   */
  tipoSeleccionSolicitud: TablaSeleccion = TablaSeleccion.CHECKBOX;
  /**
   * Almacena los registros de cancelación para mostrar en la tabla.
   */
  cuerpoTablaCancelacion: Cancelacion[] = [];

  cuerpoTablaSeleccionado: Cancelacion[] = [];

  /**
   * Referencia al elemento del modal para buscar mercancías.
   *
   * Se utiliza para abrir o cerrar el modal de búsqueda.
   */
  @ViewChild('modalBuscar') modalBuscar!: ElementRef;

  
  /**
   * Indica si el usuario tiene permiso para realizar ciertas acciones.
   */
  public datosDePermiso: boolean = false;

  /**
   * @descripcion
   * Referencia al elemento del modal de modificación.
   */
  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   *
   * Se utiliza para cerrar el modal de manera programada.
   */
@ViewChild('closeModal') closeModal!: ElementRef;

/**
     * @public
     * @property {Notificacion} nuevaNotificacion
     * @description Representa una nueva notificación que se utilizará en el componente.
     * @command Este campo debe ser inicializado antes de su uso.
     */
public nuevaNotificacion!: Notificacion;
/**
     * @public
     * @property {Notificacion} nuevaNotificacion
     * @description Representa una nueva notificación que se utilizará en el componente.
     * @command Este campo debe ser inicializado antes de su uso.
     */
public nuevaNotificacionUno!: Notificacion;


  /**
   * Formulario utilizado para capturar el número de folio del trámite.
   * Este formulario incluye validaciones requeridas y de patrón numérico.
   */
  public busquedaForm!: FormGroup;
  /**
   * Indica si una fila de la tabla está seleccionada.
   * Cuando es `true`, significa que al menos una fila ha sido seleccionada por el usuario.
   * Esto puede ser útil para habilitar o deshabilitar acciones basadas en la selección.
   * */
  esRowSelected: boolean = false;
  
  /**
   * Indica si se está en el proceso de eliminación de registros.
   * Cuando es `true`, significa que el usuario ha iniciado una acción para eliminar uno o más registros.
   * Esto puede activar la visualización de un modal de confirmación o habilitar opciones relacionadas con la eliminación.
   * */
  esEliminarDos: boolean = false;
  /**
   * Constructor del componente.
   * 
   * @param fb Servicio para la creación de formularios reactivos.
   * @param servicioDeMensajesService Servicio para la gestión de mensajes y datos compartidos.
   * @param consultaQuery Consulta para obtener el estado de la sección de consulta.
   * @param desistimientoQuery Consulta para obtener el motivo de cancelación.
   */
  constructor(
    private fb: FormBuilder,
    private servicioDeMensajesService: ServicioDeMensajesService,
    private consultaQuery: ConsultaioQuery,
    private desistimientoQuery: DesistimientoQuery
  ) { this.establecerBusquedaForm();

  }
   /**
   * Método que se ejecuta al iniciar el componente.
   * Inicializa los formularios de solicitud y cancelación, 
   * así como sus validaciones. También suscribe a los datos 
   * del servicio de mensajes para actualizar la tabla y los datos
   * de la solicitud de cancelación.
   */
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      folioTramite: ['', Validators.required],
      tipoSolicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      clasificacionRegimen: ['', Validators.required],
      condicionMercancia: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      cantidadSolicitada: ['', [Validators.required]],
      valorSolicitado: ['', [Validators.required]],
    });
    this.cancelacionForm = this.fb.group({
     motivoCancelacion: ['', [Validators.required, Validators.maxLength(250)]],
    });
    
    // Initialize store with user data if needed
    this.initializeStoreData();
    
    // Subscribe to store values like 80205
    this.suscribirseAStoreData();

    this.servicioDeMensajesService.datos$.subscribe((datos) => {
      this.datosDePermiso = datos;
      if (this.datosDePermiso) {
        this.cuerpoTablaCancelacion = [formData as Cancelacion];
        this.servicioDeMensajesService.actualizarDatosForma(this.cuerpoTablaCancelacion as Cancelacion[]);
        this.desistimientoQuery.selectMotivoCancelacion$ 
         .pipe(takeUntil(this.destroyNotificationSubject$))
      .subscribe(data => {
          this.cancelacionForm.patchValue({
      motivoCancelacion: data,
    });       
      });  
     
      }
    });


     // Suscripción a los datos del servicio para llenar la tabla
    this.servicioDeMensajesService.obtenerDatos()
      .pipe(takeUntil(this.destroyNotificationSubject$))
      .subscribe(data => {
        if (Array.isArray(data?.datos)) {
          this.cuerpoTablaCancelacion = data.datos as Cancelacion[];
          this.cancelacionForm.patchValue({
            motivoCancelacion: data.motivoCancelacion,
          });       
        } else {
          this.cuerpoTablaCancelacion = [];
        }
      });

      
      this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotificationSubject$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa los datos del store con información del usuario si están vacíos.
   * Esto asegura que tengamos los datos necesarios para el payload.
   */
  private initializeStoreData(): void {
    this.desistimientoQuery.selectTramite$
      .pipe(takeUntil(this.destroyNotificationSubject$))
      .subscribe((storeData) => {
        // Si el RFC está vacío, podemos establecer un valor predeterminado o obtenerlo de otro lugar
        if (!storeData.rfc) {
          // Aquí podrías obtener el RFC de:
          // 1. Un servicio de autenticación
          // 2. Session storage
          // 3. Un servicio de usuario global
          // 4. O pedir al usuario que lo ingrese
          
          // Por ejemplo, podrías hacer:
          // const userRfc = this.authService.getCurrentUserRfc();
          // if (userRfc) {
          //   this.servicioDeMensajesService.actualizarEstadoFormulario({ rfc: userRfc });
          // }
          
          // Para development, puedes usar un RFC de prueba:
          // this.servicioDeMensajesService.actualizarEstadoFormulario({ rfc: "AAL0409235E6" });
        }

        // Inicializar clave_entidad_federativa si está vacía
        if (!storeData.claveEntidadFederativa) {
          // Podrías obtener esto de:
          // 1. Ubicación del usuario
          // 2. Configuración del sistema
          // 3. Selección del usuario
          // 4. Servicio de geolocalización
          
          // Ejemplo:
          // const userState = this.locationService.getUserState();
          // if (userState) {
          //   this.servicioDeMensajesService.actualizarEstadoFormulario({ 
          //     claveEntidadFederativa: userState 
          //   });
          // }
        }

        // Inicializar idTipoTramite si está vacío o incorrecto
        if (!storeData.idTipoTramite || storeData.idTipoTramite !== 140105) {
          // Este valor generalmente es fijo para cada componente/trámite
          // pero podría venir de:
          // 1. Configuración del componente
          // 2. Parámetros de la ruta
          // 3. Configuración del sistema
          
          // Para este trámite específico, asegurar que sea 140105:
          this.servicioDeMensajesService.actualizarEstadoFormulario({ 
            idTipoTramite: 140105 
          });
        }
      });
  }

  /**
   * Suscribe a los valores del store y los mantiene actualizados en propiedades locales.
   * Similar al patrón usado en 80205 suscribirseAFields().
   */
  private suscribirseAStoreData(): void {
    this.desistimientoQuery.selectTramite$
      .pipe(
        takeUntil(this.destroyNotificationSubject$),
        map((state) => ({
          rfc: state.rfc,
          claveEntidadFederativa: state.claveEntidadFederativa,
          idTipoTramite: state.idTipoTramite,
        }))
      )
      .subscribe((storeValues) => {
        this.rfcSolicitante = storeValues.rfc || '';
        this.claveEntidadFederativa = storeValues.claveEntidadFederativa || '09';
        this.idTipoTramite = storeValues.idTipoTramite || 140105;
      });
  }

   /**
   * @description Actualiza las ventas totales en el store y recalcula el reporte.
   * @param evento - Evento del input para capturar el valor introducido.
   */
   motivoCancelacion(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.servicioDeMensajesService.actualizarEstadoFormulario({ motivoCancelacion: VALUE }); 
  }


  /**
   * Muestra el formulario modal para buscar mercancías.
   * Inicializa la instancia del modal si no está creada y luego lo muestra.
   * @return void
   * */
  showForm():void{
    if (this.modalBuscar) {
      if (!this.modalInstances) {
        this.modalInstances = new Modal(this.modalBuscar.nativeElement);
      }
    }
    this.modalInstances?.show();
  }

   /**
   * Inicializa el formulario de búsqueda de trámites.
   * Contiene el campo `tramite` con validaciones de requerido y solo números.
   */
   public establecerBusquedaForm(): void {
    this.busquedaForm = this.fb.group({
      tramite: ['', [Validators.required,]]
    });
  }
  
  /**
   * Cierra el modal activo.
   *
   * Este método utiliza la referencia al botón de cierre del modal para cerrarlo
   * y resetea el estado de validación del formulario de mercancía.
   */
  cerrarModal(): void {
   
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    
    }

    if (this.modalInstances) {
      this.modalInstances.hide();
    }
   
  }

   /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de que la vista del componente se haya inicializado.
   * Inicializa el modal de modificación.
   */
   ngAfterViewInit(): void {
    if (this.modifyModal) {
      this.modalInstanceDos = new Modal(this.modifyModal.nativeElement);
    }
  }

   /**
   * @descripcion
   * Abre el modal de modificación con los datos seleccionados.
   * @param disponiblesDatos - Los datos seleccionados para modificación.
   */
   abrirModificarModal(): void {
    const TRAMITEVALUE = this.busquedaForm.get('tramite')?.value;
 
    if (!TRAMITEVALUE || TRAMITEVALUE === '') {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'action',
        titulo: '',
        mensaje: "El Folio de Trámite es un dato requerido",
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return 
    }
    if(TRAMITEVALUE.length < 25){
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'action',
        titulo: '',
        mensaje: "El Folio de Trámite no puede ser menor de 25 carácteres",
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return 
    }
     if(TRAMITEVALUE.length > 25){
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'action',
        titulo: '',
        mensaje: "El Folio de Trámite no puede ser mayor de 25 carácteres",
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return 
    }
    if(this.modalInstanceDos) {
      this.modalInstanceDos.show();
    }
  
    }

  /**
   * Busca permisos para cancelación basado en el folio del trámite.
   * @method buscarPermisoCancelacion
   */
  buscarPermisoCancelacion(event?: Event): void {
    // Prevenir la propagación del evento para evitar activar la validación del formulario padre
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    // Validar el formulario antes de proceder
    if (this.busquedaForm.invalid) {
      this.busquedaForm.markAllAsTouched();
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'action',
        titulo: '',
        mensaje: "El Folio de Trámite es un dato requerido",
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    const TRAMITE_VALUE = this.busquedaForm.get('tramite')?.value;

    // Validar longitud del folio
    if (TRAMITE_VALUE.length !== 25) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'action',
        titulo: '',
        mensaje: "El Folio de Trámite debe tener exactamente 25 caracteres",
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    // Validar que tengamos los datos necesarios del store
    if (!this.rfcSolicitante) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'action',
        titulo: '',
        mensaje: "No se encontraron los datos del solicitante. Intente recargar la página.",
        cerrar: false,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      return;
    }

    // Crear el payload para la búsqueda de permisos usando propiedades locales actualizadas del store
    const PAYLOAD = {
      id_solicitud: TRAMITE_VALUE, // Send folio as string from form input
      rfc_solicitante: this.rfcSolicitante, // Get RFC from local property (updated from store)
      clave_entidad_federativa: this.claveEntidadFederativa, // Get from local property (updated from store)
      id_tipo_tramite: this.idTipoTramite // Get from local property (updated from store)
    };

    // Call the service to search for the permit
    this.servicioDeMensajesService.buscarPermisoCancelacion(PAYLOAD)
      .pipe(takeUntil(this.destroyNotificationSubject$))
      .subscribe({
            next: (response) => {
              if (response.codigo === '00' && response.datos) {
                // Handle successful response
                this.datosDePermiso = true;
                this.cuerpoTablaCancelacion = response.datos.datos || [];
                this.servicioDeMensajesService.actualizarDatosForma(this.cuerpoTablaCancelacion);
                this.cerrarModal();
                
                // Show success notification
                this.nuevaNotificacion = {
                  tipoNotificacion: TipoNotificacionEnum.TOASTR,
                  categoria: CategoriaMensaje.EXITO,
                  modo: 'action',
                  titulo: '',
                  mensaje: 'Permiso encontrado exitosamente',
                  cerrar: false,
                  tiempoDeEspera: 2000,
                  txtBtnAceptar: 'Aceptar',
                  txtBtnCancelar: '',
                };
              } else {
                // Handle API error response
                this.nuevaNotificacion = {
                  tipoNotificacion: TipoNotificacionEnum.ALERTA,
                  categoria: CategoriaMensaje.ERROR,
                  modo: 'action',
                  titulo: '',
                  mensaje: response.error || 'No se encontró el permiso especificado',
                  cerrar: false,
                  tiempoDeEspera: 3000,
                  txtBtnAceptar: 'Aceptar',
                  txtBtnCancelar: '',
                };
              }
            },
            error: (error) => {
              // Handle HTTP error response
              let errorMessage = 'El Folio de Trámite que ingresó no pertenece a PEXIM';
              
              // Provide more specific error messages based on the error response
              if (error.status) {
                switch (error.status) {
                  case 400:
                    errorMessage = 'Error en los datos enviados. Verifique el formato del folio.';
                    break;
                  case 401:
                    errorMessage = 'No tiene autorización para realizar esta consulta.';
                    break;
                  case 404:
                    errorMessage = 'El Folio de Trámite que ingresó no fue encontrado en el sistema.';
                    break;
                  case 500:
                    errorMessage = 'Error interno del servidor. Intente nuevamente más tarde.';
                    break;
                  default:
                    if (error.error?.mensaje) {
                      errorMessage = error.error.mensaje;
                    } else if (error.message) {
                      errorMessage = error.message;
                    }
                }
              }

              this.nuevaNotificacion = {
                tipoNotificacion: TipoNotificacionEnum.ALERTA,
                categoria: CategoriaMensaje.ERROR,
                modo: 'action',
                titulo: '',
                mensaje: errorMessage,
                cerrar: false,
                tiempoDeEspera: 3000,
                txtBtnAceptar: 'Aceptar',
                txtBtnCancelar: '',
              };
            }
          });

    // Fallback: For development/testing - show mock data if service is not available
    // Comment this out when the actual API is ready
    // this.datosDePermiso = true;
    // this.cuerpoTablaCancelacion = [formData as Cancelacion];
    // this.servicioDeMensajesService.actualizarDatosForma(this.cuerpoTablaCancelacion);
    // this.cerrarModal();
  }

  

   /**
   * @descripcion
   * Cierra el modal de modificación.
   */
   cerrarModificarModal(): void {
    if (this.modalInstances) {
      this.modalInstances.hide();
      this.busquedaForm.reset();
    }
    if (this.modalInstanceDos) {
    
      this.modalInstanceDos.hide();
    }
  }


  /**
   * Método que se ejecuta al destruir el componente.
   * Limpia los datos de permiso en el servicio de mensajes
   * para evitar posibles fugas de memoria o actualizaciones 
   * innecesarias cuando el componente ya no está activo.
   */
  ngOnDestroy(): void {
    this.servicioDeMensajesService.establecerDatosDePermiso(false);
    this.destroyNotificationSubject$.next();
    this.destroyNotificationSubject$.complete();
  }

  /**
   * Método que se ejecuta al realizar una búsqueda.
   * Envía un mensaje al servicio para indicar que se ha iniciado una búsqueda.
   * 
   * @param event Evento que desencadena la búsqueda.
   */

  public busqueda(_event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(true);
  }

   /**
   * Obtiene los datos del subfabricante por eliminar.
   * @method cueroEliminar
   * @param {SubfabricanteDireccionModelo[]} event - Evento con los datos del subfabricante por eliminar.
   */
   cuerpoTablaSelectionEliminar(
    event: Cancelacion[]
  ): void {
    this.cuerpoTablaSeleccionado = event;
  }

  
    /**
   * Método para cerrar el modal de confirmación.
   * @returns {void}
   */
    cerrarTabla(): void {
   
      this.esRowSelected = false;
    }

     /**
   * Elimina las empresas nacionales seleccionadas del grid.
   * @method eliminarEmpresasNacionales
   * @return {void}
   */

  cerrarEliminarDos(evento:boolean): void {
    this.esEliminarDos=false;
    if(evento===true){
      this.cuerpoTablaCancelacion = [];
      this.servicioDeMensajesService.actualizarDatosForma(this.cuerpoTablaCancelacion as Cancelacion[]);
      this.cuerpoTablaSeleccionado=[];
     }
    
  }
   /**
   * Método que se ejecuta al eliminar un registro de la tabla.
   * Limpia el contenido de la tabla de cancelación y actualiza los datos 
   * en el servicio de mensajes.
   * 
   * @param event Evento que desencadena la eliminación.
   */
   eliminarRegistro(): void {
    if(this.cuerpoTablaSeleccionado.length === 0){
      this.nuevaNotificacionUno = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'action',
        titulo: '',
        mensaje: "Seleccione un registro a eliminar.",
        cerrar: false,
        tiempoDeEspera: 200,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };  
    this.esRowSelected= true;
    }
      else{
        this.nuevaNotificacionUno= {
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.ALERTA,
          modo: 'modal',
          titulo: '',
          mensaje: '¿Esta seguro que desea eliminar el registro marcado?',
          cerrar: false,
          tiempoDeEspera: 200,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: 'Cancelar',
        };
        this.esEliminarDos = true;
      }
  
   
  }


}
