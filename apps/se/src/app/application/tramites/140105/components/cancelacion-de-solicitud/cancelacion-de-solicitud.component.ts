import * as formData from '@libs/shared/theme/assets/json/140105/datos-del-formulario.json';
import { Cancelacion } from '../../models/cancelacion-de-solicitus.model';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-cancelacion-de-solicitud',
  templateUrl: './cancelacion-de-solicitud.component.html',
  styleUrl: './cancelacion-de-solicitud.component.scss',
})
export class CancelacionDeSolicitudComponent implements OnInit, OnDestroy {
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
   * Indica si el usuario tiene permiso para realizar ciertas acciones.
   */
  public datosDePermiso: boolean = false;

  constructor(private fb: FormBuilder, private servicioDeMensajesService: ServicioDeMensajesService, private consultaQuery: ConsultaioQuery,) { }
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
      motivoCancelacion: ['', Validators.required],
    });

    this.servicioDeMensajesService.datos$.subscribe((datos) => {
      this.datosDePermiso = datos;
      if (this.datosDePermiso) {
        this.cuerpoTablaCancelacion = [formData as Cancelacion];
        this.servicioDeMensajesService.actualizarDatosForma(this.cuerpoTablaCancelacion as Cancelacion[]);
      }
    });

     // Suscripción a los datos del servicio para llenar la tabla
    this.servicioDeMensajesService.obtenerDatos()
      .pipe(takeUntil(this.destroyNotificationSubject$))
      .subscribe(data => {
        if (Array.isArray(data?.datos)) {
          this.cuerpoTablaCancelacion = data.datos as Cancelacion[];
        } else {
          console.error("Expected an array but received:", data?.datos);
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
   * Método que se ejecuta al destruir el componente.
   * Limpia los datos de permiso en el servicio de mensajes
   * para evitar posibles fugas de memoria o actualizaciones 
   * innecesarias cuando el componente ya no está activo.
   */
  ngOnDestroy() {
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

  public busqueda(event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(true);
  }
   /**
   * Método que se ejecuta al eliminar un registro de la tabla.
   * Limpia el contenido de la tabla de cancelación y actualiza los datos 
   * en el servicio de mensajes.
   * 
   * @param event Evento que desencadena la eliminación.
   */
  public eliminarRegistro(event: Event): void {
    this.cuerpoTablaCancelacion = [];
    this.servicioDeMensajesService.actualizarDatosForma(this.cuerpoTablaCancelacion as Cancelacion[]);
  }


}
