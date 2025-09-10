import { Catalogo } from '@libs/shared/data-access-user/src';
import { CertificadosDisponibles } from '../../models/cancelacion-de-certificados.model';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CuposDisponibles } from '../../models/cancelacion-de-certificados.model';
import { DesistimientoQuery } from '../../estados/desistimiento-de-permiso.query';
import { FormBuilder} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy} from '@angular/core';
import { OnInit } from '@angular/core';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import certificadosACancelarDatos from '@libs/shared/theme/assets/json/140104/certificados-a-cancelar.json';
import certificadosDisponiblesDatos from '@libs/shared/theme/assets/json/140104/certificados-disponibles.json';
import { map } from 'rxjs';

import catalogoDatos from '@libs/shared/theme/assets/json/140104/catalogos.json';
import mecanismoAsignacionDatos from '@libs/shared/theme/assets/json/140104/mecanismo-asignacion.json';
import regimenAduaneroListDatos from '@libs/shared/theme/assets/json/140104/regimen-aduanero-list.json';

import { Tramite140104State, Tramite140104Store } from '../../estados/Tramite140104.store';
import { Tramite140104Query } from '../../estados/Tramite140104.query';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-cancelacion-de-certificados',
  templateUrl: './cancelacion-de-certificados.component.html',
  styleUrl: './cancelacion-de-certificados.component.scss',
})
export class CancelacionDeCertificadosComponent implements OnInit, OnDestroy {

  /**
   * Bandera para mostrar el detalle del cupo seleccionado.
   */
  mostrarDetalleDelCupo: boolean = false;

  /**
   * Listado de opciones para el campo Régimen Aduanero.
   */
  regimenAduaneroList: Catalogo[] = [];

  /**
   * Listado de opciones para el campo Mecanismo de Asignación.
   */
  mecanismoAsignacionList: Catalogo[] = [];

  /**
   * Listado de opciones para el campo Tratado o Bloque Comercial.
   */
  tratadoBloqueComercialList: Catalogo[] = [];

  /**
   * Listado de opciones para el campo Nombre del Producto.
   */
  nombreProductoList: Catalogo[] = [];

  /**
   * Listado de opciones para el campo Nombre del Subproducto.
   */
  nombreSubproductoList: Catalogo[] = [];

  /**
   * Listado de opciones para el campo Representación Federal.
   */
  representacionFederalList: Catalogo[] = [];

  /**
   * Sujeto para controlar el ciclo de vida del componente y evitar fugas de memoria en suscripciones.
   */
  private destroyNotificationSubject$ = new Subject<void>();

  /**
   * Configuración de columnas para la tabla de Cupos Disponibles.
   */
  configuracionColumnasCuposDisponibles: ConfiguracionColumna<CuposDisponibles>[] = [
    { encabezado: 'Cupo', clave: (fila) => fila.cupo, orden: 1 },
    { encabezado: 'Nombre de producto', clave: (fila) => fila.nombre_de_producto, orden: 2 },
    { encabezado: 'Nombre del subproducto', clave: (fila) => fila.nombre_del_subproducto, orden: 3 },
    { encabezado: 'Mecanismo de asignación', clave: (fila) => fila.mecanismo_de_asignación, orden: 4 },
    { encabezado: 'Tipo cupo', clave: (fila) => fila.tipo_cupo, orden: 5 },
  ];

  /**
   * Configuración de columnas para la tabla de Certificados Disponibles.
   */
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

  /**
   * Configuración de columnas para la tabla de Certificados a Cancelar.
   */
  configuracionColumnasCertificadosACancelar: ConfiguracionColumna<CertificadosDisponibles>[] = [...this.configuracionColumnasCertificadosDisponibles];

  /**
   * Tipo de selección habilitada en la tabla.
   */
  tipoSeleccionSolicitud: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos cargados en la tabla de cupos disponibles.
   */
  cuposDisponiblesTabla: CuposDisponibles[] = [];

  /**
   * Datos cargados en la tabla de certificados disponibles.
   */
  CertificadosDisponiblesTabla: CertificadosDisponibles[] = [];

  /**
   * Datos cargados en la tabla de certificados a cancelar.
   */
  CertificadosACancelarTabla: CertificadosDisponibles[] = [];

  /**
   * Indica si el usuario tiene permisos habilitados.
   */
  datosDePermiso: boolean = false;

  /**
   * Formulario principal del componente.
   */
  formularioGrupo!: FormGroup;

  /**
   * Formulario para datos generales del cupo.
   */
  detalleDelCupoForm: FormGroup;

  /**
   * Formulario para mostrar montos asociados.
   */
  montoForm: FormGroup;
   /**
   * compodoc
   * property {Solicitud260211State} solicitudState
   * description Estado actual de la solicitud.
   */
  public solicitudState!: Tramite140104State;
  /**
   * Formulario para la cancelación (motivo de cancelación).
   */
  cancelacionForm: FormGroup;

      /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  constructor(private fb: FormBuilder, private servicioDeMensajesService: ServicioDeMensajesService,
        private consultaQuery: ConsultaioQuery,
    private desistimientoQuery: DesistimientoQuery,
    private tramite140104Store: Tramite140104Store,
    private tramite140104Query: Tramite140104Query,

  ) {
     // Suscripción al estado de la solicitud
    this.tramite140104Query.selectTramite$
      .pipe(
        takeUntil(this.destroyNotificationSubject$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    // Formulario de búsqueda    
    this.formularioGrupo = new FormGroup({
      regimenAduanero: new FormControl(this.solicitudState.regimenAduanero, Validators.required),
      mecanismoAsignacion: new FormControl(this.solicitudState.mecanismoAsignacion, Validators.required),
      tratadoBloqueComercial: new FormControl(this.solicitudState.tratadoBloqueComercial),
      nombreProducto: new FormControl(this.solicitudState.nombreProducto),
      nombreSubproducto: new FormControl(this.solicitudState.nombreSubproducto),
      representacionFederal: new FormControl(this.solicitudState.representacionFederal),
    });

    // Formulario para datos del producto
    this.detalleDelCupoForm = this.fb.group({
      regimenAduanero: [{ value: '', disabled: true }],
      descripcionProducto: [{ value: '', disabled: true }],
      clasificacionSubproducto: [{ value: '', disabled: true }],
      unidadMedida: [{ value: '', disabled: true }],
      mecanismoAsignacion: [{ value: '', disabled: true }],
      tratadoAcuerdo: [{ value: '', disabled: true }],
      fraccionesArancelarias: [{ value: '', disabled: true }],
      paises: [{ value: '', disabled: true }],
      fechaInicioVigencia: [{ value: '', disabled: true }],
      fechaFinVigencia: [{ value: '', disabled: true }],
      observaciones: [{ value: '', disabled: true }],
      fundamentos: [{ value: '', disabled: true }]
    });

    // Formulario para los montos asociados al certificado
    this.montoForm = this.fb.group({
      montoAsignado: [{ value: '', disabled: true }],
      montoDisponible: [{ value: '', disabled: true }],
      montoExpedido: [{ value: '', disabled: true }]
    });

    // Formulario para motivo de cancelación
    this.cancelacionForm = this.fb.group({
      razon: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.mecanismoAsignacionList = mecanismoAsignacionDatos as Catalogo[];
    this.regimenAduaneroList = regimenAduaneroListDatos as Catalogo[];
    this.tratadoBloqueComercialList=catalogoDatos as Catalogo[];
    this.nombreProductoList=catalogoDatos as Catalogo[];
    this.nombreSubproductoList=catalogoDatos as Catalogo[];
    this.representacionFederalList=catalogoDatos as Catalogo[];
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotificationSubject$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.servicioDeMensajesService.establecerDatosDePermiso(false);
    this.destroyNotificationSubject$.next();
    this.destroyNotificationSubject$.complete();
  }

  /**
   * Ejecuta la acción de búsqueda y notifica a otros componentes a través del servicio de mensajes.
   */
  public busqueda(_event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(true);
  }

  /**
   * Ejecuta la acción de buscar registros y muestra los datos precargados en las tablas.
   */
  public buscar(_event: Event): void {
 if (!this.formularioGrupo.valid) {
      this.servicioDeMensajesService.establecerMostrarAlerta(true);    
    } else {
      this.servicioDeMensajesService.establecerMostrarAlerta(false);    
    this.mostrarDetalleDelCupo = true;     
     const ESTADO_DATOS = this.tramite140104Query.getValue();
     this.cuposDisponiblesTabla = [
        {
          cupo: '001',
          nombre_de_producto: ESTADO_DATOS.nombreProducto,
          nombre_del_subproducto: ESTADO_DATOS.nombreSubproducto,
          mecanismo_de_asignación: ESTADO_DATOS.mecanismoAsignacion,
          tipo_cupo: 'Anual'
        }
      ]
    this.CertificadosDisponiblesTabla = [certificadosDisponiblesDatos as CertificadosDisponibles];
    this.CertificadosACancelarTabla = [certificadosACancelarDatos as CertificadosDisponibles];
    }
  }
 /**
   * compodoc
   * method setValoresStore
   * description Actualiza el valor de un campo en el almacén de estado.
   * Este método se utiliza para sincronizar los valores del formulario con el estado global de la aplicación.
   * param {FormGroup} form - El formulario reactivo que contiene los datos.
   * param {string} campo - El nombre del campo que se desea actualizar.
   * param {keyof Sanitario260211Store} metodoNombre - El método del almacén que se invocará para actualizar el valor.
   * returns {void}
   */
 setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite140104Store): void {
  const VALOR = form.get(campo)?.value; // Obtener el valor del campo especificado del formulario.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (this.tramite140104Store[metodoNombre] as (value: any) => void)(VALOR); 
 }

  /**
   * Maneja la selección de registros. Envía un mensaje de selección activa y limpia la intención de devolver facturas.
   */
  public seleccionar(_event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(true);
    this.servicioDeMensajesService.enviarDevolverFacturasMensaje(false);
  }

  /**
   * Marca los certificados seleccionados como listos para devolución.
   */
  public devlover(_event: Event): void {
    this.servicioDeMensajesService.enviarMensaje(true);
    this.servicioDeMensajesService.enviarDevolverFacturasMensaje(true);
  }
}
