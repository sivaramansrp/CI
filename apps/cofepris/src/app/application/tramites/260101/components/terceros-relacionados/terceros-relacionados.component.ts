import {
  AlertComponent,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { Destinatario } from '../../models/destinatario.model';
import { ElementRef } from '@angular/core';
import { Fabricante } from '../../models/fabricante.model';
import { FabricanteComponent } from '../fabricante/fabricante.component';
import { Modal } from 'bootstrap';
import { ModificarDestinatarioComponent } from '../modificar-destinatario/modificar-destinatario.component';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101State } from '../../estados/tramites260101.store';
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
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    AlertComponent,
    TituloComponent,
    ModificarDestinatarioComponent,
    FabricanteComponent,
  ],
})
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  /**
   * Textos utilizados en la vista del componente.
   */
  TEXTOS = TEXTOS;

  MODAL_INSTANCE!: Modal;

  MODAL_INSTANCE_FABRICANTE!: Modal;

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
   * Lista de destinatarios seleccionados.
   */
  selectedFabricante: Fabricante[] = [];

  modificarDestinatario: Fabricante[] = [];

  modificarFabricante: Fabricante[] = [];

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
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalFabricanteElement!: ElementRef;

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
          // this.destinatarioDatos = this.solicitud260101State.destinatarioDatos;
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

  seleccionDestinatarioDatos(evento: Fabricante[]): void {
    this.selectedDestinatario = evento;
  }

  /**
   * Abre el modal para modificar mercancías.
   */
  openModificarMercancias(): void {
    if (this.selectedDestinatario.length === 0) {
      if (this.modalElement) {
        this.modificarDestinatario = this.selectedDestinatario;
        this.MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
        this.MODAL_INSTANCE.show();
      }
    }
  }

  /**
   * Abre el modal para agregar nuevas mercancías.
   */
  agregarMercancias(): void {
    if (this.modalElement) {
      this.MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      this.MODAL_INSTANCE.show();
    }
  }

    cerrarModal(evento: Destinatario): void {
    if (this.selectedDestinatario.length > 0) {
      this.destinatarioDatos.forEach((destinatario, index) => {
        if (this.destinatarioDatos[index].rfc === evento.rfc) {
          this.destinatarioDatos[index].nombre = evento.nombre;
          this.destinatarioDatos[index].curp = evento.curp;
          this.destinatarioDatos[index].telefono = evento.telefono;
          this.destinatarioDatos[index].correoElectronico =
            evento.correoElectronico;
          this.destinatarioDatos[index].calle = evento.calle;
          this.destinatarioDatos[index].numeroExterior = evento.numeroExterior;
          this.destinatarioDatos[index].numeroInterior = evento.numeroInterior;
          this.destinatarioDatos[index].pais = evento.pais;
          this.destinatarioDatos[index].colonia = evento.colonia;
          this.destinatarioDatos[index].municipio = evento.municipio;
          this.destinatarioDatos[index].localidad = evento.localidad;
          this.destinatarioDatos[index].estado = evento.estado;
          this.destinatarioDatos[index].estado2 = evento.estado2;
          this.destinatarioDatos[index].codigo = evento.codigo;
        }
      });
      this.MODAL_INSTANCE.hide();
    } else {
      this.destinatarioDatos.push(evento);
    }
  }

  seleccionFabricanteDatos(evento: Fabricante[]): void {
    this.selectedFabricante = evento;
  }

  agregarModalFabricante(): void {
    if (this.modalFabricanteElement) {
      this.MODAL_INSTANCE_FABRICANTE = new Modal(
        this.modalFabricanteElement.nativeElement
      );
      this.MODAL_INSTANCE_FABRICANTE.show();
    }
  }

  modificarModalFabricante(): void {
    if (this.selectedFabricante.length === 0) {
      if (this.modalFabricanteElement) {
        this.modificarDestinatario = this.selectedDestinatario;
        this.MODAL_INSTANCE_FABRICANTE = new Modal(
          this.modalFabricanteElement.nativeElement
        );
        this.MODAL_INSTANCE_FABRICANTE.show();
      }
    }
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

    cerrarFabricanteModal(evento: Fabricante): void {
    if (this.selectedFabricante.length > 0) {
      this.fabricanteDatos.forEach((fabricante, index) => {
        if (this.fabricanteDatos[index].rfc === evento.rfc) {
          this.fabricanteDatos[index].nombre = evento.nombre;
          this.fabricanteDatos[index].curp = evento.curp;
          this.fabricanteDatos[index].telefono = evento.telefono;
          this.fabricanteDatos[index].correoElectronico =
            evento.correoElectronico;
          this.fabricanteDatos[index].calle = evento.calle;
          this.fabricanteDatos[index].numeroExterior = evento.numeroExterior;
          this.fabricanteDatos[index].numeroInterior = evento.numeroInterior;
          this.fabricanteDatos[index].pais = evento.pais;
          this.fabricanteDatos[index].colonia = evento.colonia;
          this.fabricanteDatos[index].municipio = evento.municipio;
          this.fabricanteDatos[index].localidad = evento.localidad;
          this.fabricanteDatos[index].estado = evento.estado;
          this.fabricanteDatos[index].estado2 = evento.estado2;
          this.fabricanteDatos[index].codigo = evento.codigo;
        }
      });
      this.MODAL_INSTANCE.hide();
    } else {
      this.fabricanteDatos.push(evento);
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
