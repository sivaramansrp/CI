import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Destinatario } from '../../models/destinatario.model';
import { ElementRef } from '@angular/core';
import { Fabricante } from '../../models/fabricante.model';
import { Proveedor } from '../../models/proveedor.model';
import { Facturador } from '../../models/facturador.model';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
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
 * Componente TercerosRelacionadosComponent.
 * Gestiona la información relacionada con destinatarios y fabricantes en el flujo de la solicitud.
 */
@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * Textos utilizados en la vista del componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Configuración para la selección de filas en la tabla de destinatarios.
   * Utiliza selección con checkbox.
   */
  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * @description Variable que almacena el tipo seleccionado para realizar una acción específica.
   * Se utiliza principalmente en el contexto de confirmación de eliminación de mercancías.
   * 
   * @type {string}
   */
  seleccionadoTipo: string = '';

  /**
   * @description Referencia al elemento del modal de confirmación.
   * Este modal se utiliza para confirmar la eliminación de mercancías o SCIAN.
   * 
   * @type {ElementRef}
   */
  @ViewChild('modalConfirmar') modalConfirmarElement!: ElementRef;

  /**
   * Configuración de las columnas de la tabla de destinatarios.
   */
  destinatarioConfiguracionTabla: ConfiguracionColumna<Destinatario>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Destinatario) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: Destinatario) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: Destinatario) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: Destinatario) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Destinatario) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: Destinatario) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: Destinatario) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Destinatario) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: Destinatario) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Destinatario) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Destinatario) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Destinatario) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Destinatario) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: Destinatario) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Destinatario) => item.codigo,
      orden: 15,
    },
  ];

  /**
   * Datos de los destinatarios.
   */
  destinatarioDatos: Destinatario[] = [];

  /**
   * Configuración para la selección de filas en la tabla de fabricantes.
   */
  fabricanteSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla de fabricantes.
   */
  fabricanteConfiguracionTabla: ConfiguracionColumna<Fabricante>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Fabricante) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: Fabricante) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: Fabricante) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: Fabricante) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Fabricante) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: Fabricante) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: Fabricante) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Fabricante) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: Fabricante) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Fabricante) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Fabricante) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Fabricante) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Fabricante) => item.codigo,
      orden: 15,
    },
  ];

  /**
   * Datos de los fabricantes.
   */
  fabricanteDatos: Fabricante[] = [];

  proveedorConfiguracionTabla: ConfiguracionColumna<Proveedor>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Fabricante) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: Fabricante) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: Fabricante) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: Fabricante) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Fabricante) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: Fabricante) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: Fabricante) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Fabricante) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: Fabricante) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Fabricante) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Fabricante) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Fabricante) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Fabricante) => item.codigo,
      orden: 15,
    },
  ];

  proveedorDatos: Proveedor[] = [];

  proveedorSeleccionTabla = TablaSeleccion.CHECKBOX;

  facturadorConfiguracionTabla: ConfiguracionColumna<Facturador>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Fabricante) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: Fabricante) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: Fabricante) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: Fabricante) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Fabricante) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: Fabricante) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: Fabricante) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Fabricante) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: Fabricante) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Fabricante) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Fabricante) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Fabricante) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Fabricante) => item.codigo,
      orden: 15,
    },
  ];

  facturadorDatos: Facturador[] = [];

  facturadorSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Lista de destinatarios seleccionados.
   */
  selectedDestinatario: Destinatario[] = [];

  selectedFabricante: Fabricante[] = [];

  selectedProveedor: Proveedor[] = [];

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
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modalAgregarDestinatario') modalElement!: ElementRef;

  /**
   * Constructor del componente.
   * Inicializa los servicios y obtiene las listas de destinatarios y fabricantes.
   * @param solicitudDatosService - Servicio para manejar datos de la solicitud.
   * @param solicitud260910Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260910Query - Consulta para observar cambios en el estado de la solicitud.
   */
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query
  ) {
    this.obtenerDestinatarioListo();
    this.obtenerFabricanteListo();
    this.obtenerProveedorListo();
    this.obtenerFacturadorListo();
  }

  /**
   * Método del ciclo de vida de Angular.
   * Se ejecuta cuando el componente se inicializa.
   * Suscribe a cambios en el estado de la solicitud y actualiza los datos de destinatarios.
   */
  ngOnInit(): void {
    this.solicitud260910Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
          console.log('respuesta', respuesta);
          this.destinatarioDatos = this.solicitud260910State.destinatarioDatos;
          this.fabricanteDatos = this.solicitud260910State.fabricanteDatos;
          this.proveedorDatos = this.solicitud260910State.proveedorDatos;
          this.facturadorDatos = this.solicitud260910State.facturadorDatos;
        })
      )
      .subscribe();
  }

  /**
   * Obtiene la lista de destinatarios disponibles desde el servicio
   * y actualiza los datos en el estado almacenado.
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
   * Obtiene la lista de fabricantes disponibles desde el servicio
   * y almacena los datos en el componente.
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
   * Abre el modal para modificar mercancías.
   */
  openModificarDestinatario(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre el modal para modificar fabricantes.
   * 
   * @remarks
   * Este método utiliza la referencia al elemento del modal (`modalElement`) 
   * para crear una instancia del modal de Bootstrap y mostrarlo en pantalla.
   * 
   * @method
   * @returns {void} Este método no retorna ningún valor.
   */
  openModificarFabricante(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  openModificarProveedor(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  openModificarFacturador(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre el modal para agregar nuevas mercancías.
   */
  agregarDestinatario(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  agregarFabricante(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  agregarProveedor(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  agregarFacturador(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Obtiene los datos seleccionados de destinatarios desde el evento emitido.
   * @param evento - Lista de fabricantes seleccionados.
   */
  getDestinatarioDatos(evento: Destinatario[]): void {
    this.selectedDestinatario = evento;
  }

  /**
   * @method getFabricanteDatos
   * @description Actualiza la propiedad `selectedDestinatario` con los datos proporcionados por el evento.
   * @param {Fabricante[]} evento - Lista de objetos de tipo `Fabricante` que se utilizarán para actualizar el destinatario seleccionado.
   */
  getFabricanteDatos(evento: Fabricante[]): void {
    this.selectedFabricante = evento;
  }

  getProveedorDatos(evento: Fabricante[]): void {
    this.selectedProveedor = evento;
  }

  getFacturadorDatos(evento: Fabricante[]): void {
    this.selectedFacturador = evento;
  }
  /**
   * Elimina una mercancía seleccionada de la lista almacenada.
   * Si hay destinatarios seleccionados, elimina el primero de la lista.
   */
  eliminarDestinatario(): void {
    if (this.selectedDestinatario.length > 0) {
      this.solicitud260910Store.removeDestinatarioDato(
        this.selectedDestinatario[0]
      );
    }
  }

  /**
   * Elimina un fabricante seleccionado de la lista.
   * 
   * @remarks
   * Este método verifica si hay un fabricante seleccionado en la lista 
   * (`selectedFabricante`). Si existe al menos uno, elimina el primer 
   * elemento seleccionado utilizando el método `removeFabricanteDato` 
   * del store `solicitud260910Store`.
   * 
   * @method
   * @returns {void} Este método no retorna ningún valor.
   */
  eliminarFabricante(): void {
    if (this.selectedFabricante.length > 0) {
      this.solicitud260910Store.removeFabricanteDato(
        this.selectedFabricante[0]
      );
    }
  }

  eliminarProveedor(): void {
    if (this.selectedProveedor.length > 0) {
      this.solicitud260910Store.removeProveedorDato(
        this.selectedProveedor[0]
      );
    }
  }

  eliminarFacturador(): void {
    if (this.selectedFacturador.length > 0) {
      this.solicitud260910Store.removeFacturadorDato(
        this.selectedFacturador[0]
      );
    }
  }

  confirmarEliminar(tipo: string): void {
    this.seleccionadoTipo = tipo;
    if (this.modalConfirmarElement) {
      const MODAL_CONFIRMAR_INSTANCE = new Modal(this.modalConfirmarElement.nativeElement);
      MODAL_CONFIRMAR_INSTANCE.show();
    }
  }

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
   * Método del ciclo de vida de Angular.
   * Se ejecuta cuando el componente se destruye.
   * Libera los recursos relacionados con las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
