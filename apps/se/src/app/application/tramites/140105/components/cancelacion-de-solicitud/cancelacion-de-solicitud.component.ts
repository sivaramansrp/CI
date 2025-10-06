import * as formData from '@libs/shared/theme/assets/json/140105/datos-del-formulario.json';
import { AfterViewInit,ElementRef,ViewChild } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Cancelacion } from '../../models/cancelacion-de-solicitus.model';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DesistimientoQuery } from '../../estados/desistimiento-de-permiso.query';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
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
   * Formulario utilizado para capturar el número de folio del trámite.
   * Este formulario incluye validaciones requeridas y de patrón numérico.
   */
  public busquedaForm!: FormGroup;

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
      tramite: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
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
    if (this.busquedaForm.invalid) {
      this.busquedaForm.markAllAsTouched();
      return;
    }
    else if(this.modalInstanceDos) {
      this.modalInstanceDos.show();
    }
  
    }

  

   /**
   * @descripcion
   * Cierra el modal de modificación.
   */
   cerrarModificarModal(): void {
    if (this.modalInstances) {
      this.modalInstances.hide();
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
   * Método que se ejecuta al eliminar un registro de la tabla.
   * Limpia el contenido de la tabla de cancelación y actualiza los datos 
   * en el servicio de mensajes.
   * 
   * @param event Evento que desencadena la eliminación.
   */
  public eliminarRegistro(_event: Event): void {
    this.cuerpoTablaCancelacion = [];
    this.servicioDeMensajesService.actualizarDatosForma(this.cuerpoTablaCancelacion as Cancelacion[]);
  }


}
