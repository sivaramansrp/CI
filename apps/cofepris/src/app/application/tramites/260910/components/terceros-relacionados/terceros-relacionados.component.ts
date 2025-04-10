import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Destinatario } from '../../models/destinatario.model';
import { ElementRef } from '@angular/core';
import { Fabricante } from '../../models/fabricante.model';
import { Facturador } from '../../models/facturador.model';
import { Modal } from 'bootstrap';
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
   * Representa una nueva instancia de notificación asociada con el componente.
   * Esta propiedad se utiliza para gestionar y almacenar datos de notificaciones.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description Referencia al elemento del modal de confirmación.
   * Este modal se utiliza para confirmar la eliminación de mercancías o SCIAN.
   * 
   * @type {ElementRef}
   */
  @ViewChild('modal-confirmar') modalConfirmarElement!: ElementRef;

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

  /**
   * Configuración de las columnas de la tabla de proveedores.
   * Define las propiedades que se mostrarán en la tabla de proveedores.
   */
  proveedorConfiguracionTabla: ConfiguracionColumna<Proveedor>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (item: Proveedor) => item.nombre,
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (item: Proveedor) => item.rfc,
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (item: Proveedor) => item.curp,
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (item: Proveedor) => item.telefono,
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (item: Proveedor) => item.correoElectronico,
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (item: Proveedor) => item.calle,
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (item: Proveedor) => item.numeroExterior,
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (item: Proveedor) => item.numeroInterior,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (item: Proveedor) => item.pais,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Proveedor) => item.colonia,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Proveedor) => item.municipio,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Proveedor) => item.localidad,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Proveedor) => item.estado,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: Proveedor) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Proveedor) => item.codigo,
      orden: 15,
    },
  ];

  /**
   * Datos de los proveedores.
   * 
   * @description
   * Esta propiedad almacena la lista de proveedores que se mostrarán en la tabla.
   * Los datos son obtenidos desde el servicio correspondiente y actualizados en el estado.
   * 
   * @type {Proveedor[]}
   */
  proveedorDatos: Proveedor[] = [];

  /**
   * Configuración para la selección de filas en la tabla de proveedores.
   * Utiliza selección con checkbox.
   */
  proveedorSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * @description
   * Configuración de columnas para la tabla de facturadores relacionados.
   * Define los encabezados, claves y el orden de las columnas que se mostrarán en la tabla.
   *
   * @type {ConfiguracionColumna<Facturador>[]}
   *
   * @property {string} encabezado - El título que se mostrará en la cabecera de la columna.
   * @property {Function} clave - Una función que recibe un objeto de tipo `Fabricante` y devuelve el valor correspondiente a la columna.
   * @property {number} orden - El orden en el que se mostrará la columna en la tabla.
   *
   * @example
   * // Ejemplo de uso:
   * facturadorConfiguracionTabla.forEach(columna => {
   *   console.log(columna.encabezado, columna.clave(fabricante), columna.orden);
   * });
   */
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

  /**
   * Datos de los facturadores.
   * 
   * @description
   * Esta propiedad almacena la lista de facturadores que se mostrarán en la tabla.
   * Los datos son obtenidos desde el servicio correspondiente y actualizados en el estado.
   * 
   * @type {Facturador[]}
   */
  facturadorDatos: Facturador[] = [];

  /**
   * Configuración para la selección de filas en la tabla de facturadores.
   * Utiliza selección con checkbox.
   */
  facturadorSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Lista de destinatarios seleccionados.
   */
  selectedDestinatario: Destinatario[] = [];

  /**
   * Lista de fabricantes seleccionados.
   * 
   * @description
   * Esta propiedad almacena los fabricantes seleccionados en la tabla.
   * Los datos seleccionados se actualizan a través de eventos emitidos por la tabla.
   * 
   * @type {Fabricante[]}
   */
  selectedFabricante: Fabricante[] = [];

  /**
   * Lista de proveedores seleccionados.
   * 
   * @description
   * Esta propiedad almacena los proveedores seleccionados en la tabla.
   * Los datos seleccionados se actualizan a través de eventos emitidos por la tabla.
   * 
   * @type {Proveedor[]}
   */
  selectedProveedor: Proveedor[] = [];

  /**
   * Lista de facturadores seleccionados.
   * 
   * @description
   * Esta propiedad almacena los facturadores seleccionados en la tabla.
   * Los datos seleccionados se actualizan a través de eventos emitidos por la tabla.
   * 
   * @type {Facturador[]}
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
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modal-agregar-destinatario') modalElement!: ElementRef;

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

  /**
   * Obtiene la lista de Proveedor disponibles desde el servicio
   * y almacena los datos en el componente.
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
   * Obtiene la lista de Facturador disponibles desde el servicio
   * y almacena los datos en el componente.
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
   * Obtiene los datos seleccionados de destinatarios desde el evento emitido.
   * @param evento - Lista de destinatarios seleccionados.
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

  /**
   * Obtiene los datos seleccionados de Proveedor desde el evento emitido.
   * @param evento - Lista de Proveedor seleccionados.
   */
  getProveedorDatos(evento: Fabricante[]): void {
    this.selectedProveedor = evento;
  }

  /**
   * Obtiene los datos seleccionados de Facturador desde el evento emitido.
   * @param evento - Lista de Facturador seleccionados.
   */
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

  /**
   * Elimina una mercancía seleccionada de la lista almacenada.
   * Si hay Proveedor seleccionados, elimina el primero de la lista.
   */
  eliminarProveedor(): void {
    if (this.selectedProveedor.length > 0) {
      this.solicitud260910Store.removeProveedorDato(
        this.selectedProveedor[0]
      );
    }
  }

  /**
   * Elimina una mercancía seleccionada de la lista almacenada.
   * Si hay Facturador seleccionados, elimina el primero de la lista.
   */
  eliminarFacturador(): void {
    if (this.selectedFacturador.length > 0) {
      this.solicitud260910Store.removeFacturadorDato(
        this.selectedFacturador[0]
      );
    }
  }

  /**
   * @description Muestra un modal de confirmación para eliminar un elemento relacionado con el tipo especificado.
   * @param {string} tipo - El tipo de elemento que se desea eliminar.
   * @returns {void}
   * @example
   * // Llamar al método para confirmar la eliminación de un tipo específico
   * this.confirmarEliminar('tipoEjemplo');
   * 
   * @remarks
   * Este método utiliza la instancia de `Modal` para mostrar un modal de confirmación.
   * Asegúrese de que `modalConfirmarElement` esté correctamente inicializado antes de llamar a este método.
   */
  confirmarEliminar(tipo: string): void {
    this.seleccionadoTipo = tipo;
    this.abrirModal();
  }

  /**
   * Elimina un elemento de la lista de pedimentos en la posición especificada.
   * 
   * @param {number} i - El índice del elemento a eliminar.
   * 
   * @remarks
   * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
   * y se abre el modal para mostrar un aviso al usuario.
   */
  public abrirModal(): void {
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
    }
  }

  /**
   * Selecciona el tipo de acción a realizar según el tipo proporcionado.
   * 
   * @param tipo - Una cadena que indica el tipo de acción a ejecutar. 
   *               Puede ser uno de los siguientes valores:
   *               - 'fabricante': Ejecuta la función `eliminarFabricante`.
   *               - 'destinatario': Ejecuta la función `eliminarDestinatario`.
   *               - 'proveedor': Ejecuta la función `eliminarProveedor`.
   *               - 'facturador': Ejecuta la función `eliminarFacturador`.
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
   * Método del ciclo de vida de Angular.
   * Se ejecuta cuando el componente se destruye.
   * Libera los recursos relacionados con las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
