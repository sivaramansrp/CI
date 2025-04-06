import { Component } from '@angular/core';
import * as formData from '@libs/shared/theme/assets/json/140104/cupos-disponibles.json';
import { CuposDisponibles, CertificadosDisponibles } from '../../models/cancelacion-de-certificados.model';
import { Catalogo, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
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
  styleUrl: './cancelacion-de-certificados.component.scss',
})
export class CancelacionDeCertificadosComponent implements OnInit, OnDestroy {
  /**
   * Formulario para capturar los datos de la solicitud.
   */
  mostrarDetalleDelCupo: boolean = false;
  regimenAduaneroList: Catalogo[] = [];
  mecanismoAsignacionList: Catalogo[] = [];
  tratadoBloqueComercialList: Catalogo[] = [];
  nombreProductoList: Catalogo[] = [];
  nombreSubproductoList: Catalogo[] = [];
  representacionFederalList: Catalogo[] = [];
  /**
   * Sujeto para gestionar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyNotificationSubject$ = new Subject<void>();
  /**
   * Formulario para capturar el motivo de cancelación.
   */
  /**
   * Configuración de las columnas de la tabla de solicitudes de cancelación.
   */
  configuracionColumnasCuposDisponibles: ConfiguracionColumna<CuposDisponibles>[] = [
    { encabezado: 'Cupo', clave: (fila) => fila.cupo, orden: 1 },
    { encabezado: 'Nombre de producto', clave: (fila) => fila.nombre_de_producto, orden: 2 },
    { encabezado: 'Nombre del subproducto', clave: (fila) => fila.nombre_del_subproducto, orden: 3 },
    { encabezado: 'Mecanismo de asignación', clave: (fila) => fila.mecanismo_de_asignación, orden: 4 },
    { encabezado: 'Tipo cupo', clave: (fila) => fila.tipo_cupo, orden: 5 },
  ];
  configuracionColumnasCertificadosDisponibles: ConfiguracionColumna<CertificadosDisponibles>[] = [
    { encabezado: 'Folio del oficio de certificado', clave: (fila) => fila.folio_del_oficio_de_certificado, orden: 1 },
    { encabezado: 'Nombre, Denominación o Razón Social', clave: (fila) => fila.nombre_denominacion_o_razon_social, orden: 2 },
    { encabezado: 'Estado', clave: (fila) => fila.estado, orden: 3 },
    { encabezado: 'Fabricante', clave: (fila) => fila.fabricante, orden: 4 },
    { encabezado: 'Importador', clave: (fila) => fila.importador, orden: 5 },
    { encabezado: 'Unidad primaria', clave: (fila) => fila.unidad_primaria, orden: 6 },
    { encabezado: 'Monto expedido', clave: (fila) => fila.monto_expedido, orden: 7 },
    { encabezado: 'Monto a cancelar', clave: (fila) => fila.monto_a_cancelar, orden: 8 },
    { encabezado: 'Monto utilizado', clave: (fila) => fila.monto_utilizado, orden: 9 },
  ];
  configuracionColumnasCertificadosACancelar: ConfiguracionColumna<CertificadosDisponibles>[] = [
    { encabezado: 'Folio del oficio de certificado', clave: (fila) => fila.folio_del_oficio_de_certificado, orden: 1 },
    { encabezado: 'Nombre, Denominación o Razón Social', clave: (fila) => fila.nombre_denominacion_o_razon_social, orden: 2 },
    { encabezado: 'Estado', clave: (fila) => fila.estado, orden: 3 },
    { encabezado: 'Fabricante', clave: (fila) => fila.fabricante, orden: 4 },
    { encabezado: 'Importador', clave: (fila) => fila.importador, orden: 5 },
    { encabezado: 'Unidad primaria', clave: (fila) => fila.unidad_primaria, orden: 6 },
    { encabezado: 'Monto expedido', clave: (fila) => fila.monto_expedido, orden: 7 },
    { encabezado: 'Monto a cancelar', clave: (fila) => fila.monto_a_cancelar, orden: 8 },
    { encabezado: 'Monto utilizado', clave: (fila) => fila.monto_utilizado, orden: 9 },
  ];
  /**
  * Configuración para la selección de filas en la tabla.
  */
  tipoSeleccionSolicitud: TablaSeleccion = TablaSeleccion.CHECKBOX;
 
  
  cuposDisponiblesTabla: CuposDisponibles[] = [];
  CertificadosDisponiblesTabla: CertificadosDisponibles[] = [];
  CertificadosACancelarTabla: CertificadosDisponibles[] = [];
  /**
   * Indica si el usuario tiene permiso para realizar ciertas acciones.
   */
  public datosDePermiso: boolean = false;

  formularioGrupo!: FormGroup;
  myForm: FormGroup;
  montoForm: FormGroup;
  cancelacionForm: FormGroup;

  constructor(private fb: FormBuilder, private servicioDeMensajesService: ServicioDeMensajesService) {
    this.formularioGrupo = new FormGroup({
      regimenAduanero: new FormControl('', Validators.required),
      mecanismoAsignacion: new FormControl('', Validators.required),
      tratadoBloqueComercial: new FormControl(''),
      nombreProducto: new FormControl(''),
      nombreSubproducto: new FormControl(''),
      representacionFederal: new FormControl(''),

    });
    this.myForm = this.fb.group({
      regimenAduanero: [{value: '', disabled: true}],
      descripcionProducto: [{value: '', disabled: true}],
      clasificacionSubproducto: [{value: '', disabled: true}], // Not required based on the image
      unidadMedida: [{value: '', disabled: true}],
      mecanismoAsignacion: [{value: '', disabled: true}],
      tratadoAcuerdo: [{value: '', disabled: true}],
      fraccionesArancelarias: [{value: '', disabled: true}],
      paises: [{value: '', disabled: true}],
      fechaInicioVigencia: [{value: '', disabled: true}],
      fechaFinVigencia: [{value: '', disabled: true}],
      observaciones: [{value: '', disabled: true}],
      fundamentos: [{value: '', disabled: true}]
    });
    this.montoForm = this.fb.group({
      montoAsignado: [{value: '', disabled: true}], // Initial value from the image
      montoDisponible: [{value: '', disabled: true}], // Initial value from the image
      montoExpedido: [{value: '', disabled: true}]    // Initial value from the image
    });
    this.cancelacionForm = this.fb.group({
      razon: [{value: '', disabled: true}], // Initial value from the image
    });
  }
  /**
  * Método que se ejecuta al iniciar el componente.
  * Inicializa los formularios de solicitud y cancelación, 
  * así como sus validaciones. También suscribe a los datos 
  * del servicio de mensajes para actualizar la tabla y los datos
  * de la solicitud de cancelación.
  */
  ngOnInit(): void {
    this.regimenAduaneroList = [{
      id: 0,
      descripcion: 'Exportación',
    },
    {
      id: 1,
      descripcion: 'Importación',
    }];

    this.mecanismoAsignacionList = [{
      id: 0,
      descripcion: 'Asignación directa',
    },
    {
      id: 1,
      descripcion: 'Licitación Publica',
    },
    {
      id: 2,
      descripcion: 'Primero en tiempo primero en derecho',
    },
    {
      id: 3,
      descripcion: 'Prorrateo',
    }
  ];
    
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
  // public eliminarRegistro(event: Event): void {
  //   this.cuposDisponiblesTabla = [];
  //   this.servicioDeMensajesService.actualizarDatosForma(this.cuposDisponiblesTabla as CuposDisponibles[]);
  // }

  public buscar(event: Event): void{
    this.mostrarDetalleDelCupo = true;
    this.cuposDisponiblesTabla = [formData as CuposDisponibles];
  }
}
