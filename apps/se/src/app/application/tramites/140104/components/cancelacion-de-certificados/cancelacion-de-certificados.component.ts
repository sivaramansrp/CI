import { Component } from '@angular/core';
import * as formData from '@libs/shared/theme/assets/json/140105/datos-del-formulario.json';
import { Cancelacion } from '../../models/cancelacion-de-certificados.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cancelacion-de-certificados',
  templateUrl: './cancelacion-de-certificados.component.html',
  styleUrl: './cancelacion-de-certificados.component.css',
})
export class CancelacionDeCertificadosComponent implements OnInit, OnDestroy {
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

  formularioGrupo!: FormGroup;

  constructor(private fb: FormBuilder, private servicioDeMensajesService: ServicioDeMensajesService) { }
  /**
  * Método que se ejecuta al iniciar el componente.
  * Inicializa los formularios de solicitud y cancelación, 
  * así como sus validaciones. También suscribe a los datos 
  * del servicio de mensajes para actualizar la tabla y los datos
  * de la solicitud de cancelación.
  */
  ngOnInit(): void {
    this.formularioGrupo = new FormGroup({
      regimenAduanero: new FormControl('', Validators.required),
      mecanismoAsignacion: new FormControl('', Validators.required),
      tratadoBloqueComercial: new FormControl(''),
      nombreProducto: new FormControl(''),
      nombreSubproducto: new FormControl(''),
      representacionFederal: new FormControl(''),
    });
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
