import { CONFIGURACION_COLUMNAS_DESTINATARIO, CONFIGURACION_COLUMNAS_ENTIDAD, CONFIGURACION_COLUMNAS_FABRICANTE, CONFIGURACION_COLUMNAS_PROVEEDOR } from '../../constantes/260910-enum';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { Destinatario } from '../../models/destinatario.model';
import { ElementRef } from '@angular/core';
import { Fabricante } from '../../models/fabricante.model';
import { Facturador } from '../../models/facturador.model';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor.model';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { Solicitud260910State } from '../../estados/tramites260910.store';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../constantes/constantes';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar terceros relacionados en una solicitud.
 * 
 * Este componente maneja las operaciones CRUD para destinatarios, fabricantes, 
 * proveedores y facturadores asociados a una solicitud.
 */
@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * Textos estáticos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Configuración de selección para tabla de destinatarios.
   */
  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Tipo seleccionado para acciones de eliminación.
   */
  seleccionadoTipo: string = '';

  /**
   * Configuración para notificaciones del componente.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Referencia al elemento del modal de confirmación.
   */
  @ViewChild('modal-confirmar') modalConfirmarElement!: ElementRef;

  /**
   * Configuración de columnas para tabla de destinatarios.
   */
  destinatarioConfiguracionTabla = CONFIGURACION_COLUMNAS_DESTINATARIO;

  /**
   * Datos de destinatarios.
   */
  destinatarioDatos: Destinatario[] = [];

  /**
   * Configuración de selección para tabla de fabricantes.
   */
  fabricanteSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para tabla de fabricantes.
   */
  fabricanteConfiguracionTabla = CONFIGURACION_COLUMNAS_FABRICANTE;

  /**
   * Datos de fabricantes.
   */
  fabricanteDatos: Fabricante[] = [];

  /**
   * Configuración de columnas para tabla de proveedores.
   */
  proveedorConfiguracionTabla = CONFIGURACION_COLUMNAS_PROVEEDOR;

  /**
   * Datos de proveedores.
   */
  proveedorDatos: Proveedor[] = [];

  /**
   * Configuración de selección para tabla de proveedores.
   */
  proveedorSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para tabla de facturadores.
   */
  facturadorConfiguracionTabla = CONFIGURACION_COLUMNAS_ENTIDAD; 

  /**
   * Datos de facturadores.
   */
  facturadorDatos: Facturador[] = [];

  /**
   * Configuración de selección para tabla de facturadores.
   */
  facturadorSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Destinatarios seleccionados.
   */
  selectedDestinatario: Destinatario[] = [];

  /**
   * Fabricantes seleccionados.
   */
  selectedFabricante: Fabricante[] = [];

  /**
   * Proveedores seleccionados.
   */
  selectedProveedor: Proveedor[] = [];

  /**
   * Facturadores seleccionados.
   */
  selectedFacturador: Facturador[] = [];

  /**
   * Controlador para manejar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud.
   */
  solicitud260910State: Solicitud260910State = {} as Solicitud260910State;

  /**
   * Referencia al elemento del modal de destinatarios.
   */
  @ViewChild('modal-agregar-destinatario') modalElement!: ElementRef;

  /**
   * Estado actual de la consulta.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si el formulario es de solo lectura.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param solicitudDatosService Servicio para datos de solicitud
   * @param solicitud260910Store Almacén para estado de solicitud
   * @param solicitud260910Query Consulta para estado de solicitud
   * @param consultaQuery Consulta para estado de consulta
   */
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query,
    private consultaQuery: ConsultaioQuery
  ) {
    this.obtenerDestinatarioListo();
    this.obtenerFabricanteListo();
    this.obtenerProveedorListo();
    this.obtenerFacturadorListo();
  }

  /**
   * Inicialización del componente.
   */
  ngOnInit(): void {
    this.suscribirEstadoSolicitud();
    this.configurarSuscripcionEstadoConsulta();
  }

  /**
   * Suscripción a cambios en el estado de la solicitud.
   */
  private suscribirEstadoSolicitud(): void {
    this.solicitud260910Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
          this.destinatarioDatos = this.solicitud260910State.destinatarioDatos;
          this.fabricanteDatos = this.solicitud260910State.fabricanteDatos;
          this.proveedorDatos = this.solicitud260910State.proveedorDatos;
          this.facturadorDatos = this.solicitud260910State.facturadorDatos;
        })
      )
      .subscribe();
  }

  /**
   * Configura la suscripción al estado de consulta.
   */
  private configurarSuscripcionEstadoConsulta(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState?.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Obtiene lista de destinatarios desde el servicio.
   */
  obtenerDestinatarioListo(): void {
    this.solicitudDatosService
      .obtenerDestinatarioListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Destinatario[]) => {
          this.destinatarioDatos = respuesta;
          this.solicitud260910Store.setDestinatarioDatos(respuesta);
        },
      });
  }

  /**
   * Obtiene lista de fabricantes desde el servicio.
   */
  obtenerFabricanteListo(): void {
    this.solicitudDatosService
      .obtenerFabricanteListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Fabricante[]) => {
          this.fabricanteDatos = respuesta;
          this.solicitud260910Store.setFabricanteDatos(respuesta);
        },
      });
  }

  /**
   * Obtiene lista de proveedores desde el servicio.
   */
  obtenerProveedorListo(): void {
    this.solicitudDatosService
      .obtenerProveedorListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Proveedor[]) => {
          this.proveedorDatos = respuesta;
          this.solicitud260910Store.setProveedorDatos(respuesta);
        },
      });
  }

  /**
   * Obtiene lista de facturadores desde el servicio.
   */
  obtenerFacturadorListo(): void {
    this.solicitudDatosService
      .obtenerFacturadorListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Facturador[]) => {
          this.facturadorDatos = respuesta;
          this.solicitud260910Store.setFacturadorDatos(respuesta);
        },
      });
  }

  /**
   * Actualiza destinatarios seleccionados.
   * @param evento Lista de destinatarios seleccionados
   */
  getDestinatarioDatos(evento: Destinatario[]): void {
    this.selectedDestinatario = evento;
  }

  /**
   * Actualiza fabricantes seleccionados.
   * @param evento Lista de fabricantes seleccionados
   */
  getFabricanteDatos(evento: Fabricante[]): void {
    this.selectedFabricante = evento;
  }

  /**
   * Actualiza proveedores seleccionados.
   * @param evento Lista de proveedores seleccionados
   */
  getProveedorDatos(evento: Proveedor[]): void {
    this.selectedProveedor = evento;
  }

  /**
   * Actualiza facturadores seleccionados.
   * @param evento Lista de facturadores seleccionados
   */
  getFacturadorDatos(evento: Facturador[]): void {
    this.selectedFacturador = evento;
  }

  /**
   * Elimina destinatario seleccionado.
   */
  eliminarDestinatario(): void {
    if (this.selectedDestinatario.length > 0) {
      this.solicitud260910Store.removeDestinatarioDato(
        this.selectedDestinatario[0]
      );
    }
  }

  /**
   * Elimina fabricante seleccionado.
   */
  eliminarFabricante(): void {
    if (this.selectedFabricante.length > 0) {
      this.solicitud260910Store.removeFabricanteDato(
        this.selectedFabricante[0]
      );
    }
  }

  /**
   * Elimina proveedor seleccionado.
   */
  eliminarProveedor(): void {
    if (this.selectedProveedor.length > 0) {
      this.solicitud260910Store.removeProveedorDato(
        this.selectedProveedor[0]
      );
    }
  }

  /**
   * Elimina facturador seleccionado.
   */
  eliminarFacturador(): void {
    if (this.selectedFacturador.length > 0) {
      this.solicitud260910Store.removeFacturadorDato(
        this.selectedFacturador[0]
      );
    }
  }

  /**
   * Prepara la eliminación de un tipo específico de tercero.
   * @param tipo Tipo de tercero a eliminar
   */
  confirmarEliminar(tipo: string): void {
    this.seleccionadoTipo = tipo;
    this.configurarNotificacion();
  }

  /**
   * Configura la notificación para la eliminación.
   */
  private configurarNotificacion(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Avisos',
      mensaje: '¿Confirma la eliminación los registros marcados?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Ejecuta la acción de eliminación según el tipo seleccionado.
   * @param tipo Tipo de tercero a eliminar
   */
  seleccionaTipo(tipo: string): void {
    if (tipo === 'fabricante') {
      this.eliminarFabricante();
    } else if (tipo === 'destinatario') {
      this.eliminarDestinatario();
    } else if (tipo === 'proveedor') {
      this.eliminarProveedor();
    } else if (tipo === 'facturador') {
      this.eliminarFacturador();
    }
  }

  /**
   * Destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}