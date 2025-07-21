import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { PaginaDestinatarioDatos, Solicitud260101State } from '../../estados/tramites260101.store';
import { Component } from '@angular/core';
import { Destinatario } from '../../models/destinatario.model';
import { ElementRef } from '@angular/core';
import { Fabricante } from '../../models/fabricante.model';
import { Modal } from 'bootstrap';
import { ModificarDestinatarioComponent } from '../modificar-destinatario/modificar-destinatario.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
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
  standalone:true,
  imports:[
      TablaDinamicaComponent,
      AlertComponent,
      TituloComponent,
      ModificarDestinatarioComponent
    ]
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
   * Lista de destinatarios seleccionados.
   */
  selectedDestinatario: Fabricante[] = [];

  /**
   * Controlador para manejar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud.
   */
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;

  /**
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;


  /**
   * Número total de elementos en la tabla.
  */
  totalItems: number = 0;

  /**
   * Cantidad de elementos por página en la paginación.
  */
  itemsPerPage: number = 5;

  /**
   * Página actual de la paginación.
  */
  currentPage: number = 1;

  /**
   * Constructor del componente.
   * Inicializa los servicios y obtiene las listas de destinatarios y fabricantes.
   * @param solicitudDatosService - Servicio para manejar datos de la solicitud.
   * @param solicitud260101Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260101Query - Consulta para observar cambios en el estado de la solicitud.
   */
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query
  ) {
    this.obtenerDestinatarioListo();
    this.obtenerFabricanteListo();
  }

  /**
   * Método del ciclo de vida de Angular.
   * Se ejecuta cuando el componente se inicializa.
   * Suscribe a cambios en el estado de la solicitud y actualiza los datos de destinatarios.
   */
  ngOnInit(): void {
    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260101State) => {
          this.solicitud260101State = respuesta;
          this.destinatarioDatos = this.solicitud260101State.destinatarioDatos?.datos;
          this.totalItems = this.solicitud260101State.destinatarioDatos?.totalRecords;
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
        next: (respuesta: PaginaDestinatarioDatos) => {
          this.destinatarioDatos = respuesta.datos;
          this.solicitud260101Store.setDestinatarioDatos(respuesta);
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
        },
      });
  }

  /**
   * Abre el modal para modificar mercancías.
   */
  openModificarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre el modal para agregar nuevas mercancías.
   */
  agregarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Obtiene los datos seleccionados de destinatarios desde el evento emitido.
   * @param evento - Lista de fabricantes seleccionados.
   */
  getDestinatarioDatos(evento: Fabricante[]): void {
    this.selectedDestinatario = evento;
  }

  /**
   * Elimina una mercancía seleccionada de la lista almacenada.
   * Si hay destinatarios seleccionados, elimina el primero de la lista.
   */
  eliminarMercancias(): void {
    if (this.selectedDestinatario.length > 0) {
      this.solicitud260101Store.removeDestinatarioDato(
        this.selectedDestinatario[0]
      );
    }
  }

  /**
   * Método que se ejecuta cuando se cambia de página en la paginación.
   * @param {number} page - Número de la página seleccionada.
   */
  onPageChange(page: number):void {
    // Note: add API call logic to fetch the data based on selected page
    this.currentPage = page;
  }

  /**
   * Método que se ejecuta cuando cambia el número de elementos por página.
   * @param {number} itemsPerPage - Número de elementos a mostrar por página.
   */
  onItemsPerPageChange(itemsPerPage: number):void{
    // Note: add API call logic to fetch the data based on selected page
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
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
