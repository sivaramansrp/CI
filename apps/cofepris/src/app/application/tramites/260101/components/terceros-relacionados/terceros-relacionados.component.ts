import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AlertComponent,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Destinatario } from '../../models/destinatario.model';
import { Fabricante } from '../../models/fabricante.model';
import { FabricanteComponent } from '../fabricante/fabricante.component';
import { Modal } from 'bootstrap';
import { ModificarDestinatarioComponent } from '../modificar-destinatario/modificar-destinatario.component';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { TEXTOS } from '../../constantes/constantes';

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
export class TercerosRelacionadosComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  /**
   * Textos utilizados en la vista del componente.
   */
  TEXTOS = TEXTOS;

  MODAL_INSTANCE!: Modal;

  MODAL_INSTANCE_FABRICANTE!: Modal;

  inputSelectionDestinatario: number = -1;

  /**
   * Configuración para la selección de filas en la tabla de destinatarios.
   * Utiliza selección con checkbox.
   */
  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla de destinatarios.destinatarioDatos
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
      clave: (item: Destinatario) => item.paisNombre,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Destinatario) => item.coloniaNombre,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Destinatario) => item.municipioNombre,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Destinatario) => item.localidadNombre,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Destinatario) => item.estadoNombre,
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (item: Destinatario) => item.estado2,
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (item: Destinatario) => item.codigoNombre,
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
      clave: (item: Fabricante) => item.paisNombre,
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (item: Fabricante) => item.coloniaNombre,
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (item: Fabricante) => item.municipioNombre,
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (item: Fabricante) => item.localidadNombre,
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (item: Fabricante) => item.estadoNombre,
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
  selectedDestinatario: Destinatario[] = [];

  modificarDestinatario: Destinatario[] = [];

  /**
   * Lista de destinatarios seleccionados.
   */
  selectedFabricante: Fabricante[] = [];

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
  @ViewChild('modalAgregarMercancias', { static: false })
  modalElement!: ElementRef;

  /**
   * Referencia al elemento del modal para agregar mercancías.
   */
  @ViewChild('modalFabricante', { static: false })
  modalFabricanteElement!: ElementRef;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

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
    public solicitud260101Query: Solicitud260101Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
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

  ngAfterViewInit(): void {
    if (this.modalElement?.nativeElement) {
      this.MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
    }

    if (this.modalFabricanteElement?.nativeElement) {
      this.MODAL_INSTANCE_FABRICANTE = new Modal(
        this.modalFabricanteElement.nativeElement
      );
    }
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

  seleccionDestinatarioDatos(evento: Destinatario[]): void {
    this.selectedDestinatario = evento;
  }

  /**
   * Abre el modal para modificar mercancías.
   */
  openModificarMercancias(): void {
    if (this.selectedDestinatario.length > 0) {
      this.solicitud260101Store.setTipoPersona(
        this.selectedDestinatario[0].tipoPersona
      );
      this.solicitud260101Store.setModificarRFC(
        this.selectedDestinatario[0].rfc
      );
      this.solicitud260101Store.setDenominacionNombre(
        this.selectedDestinatario[0].nombre
      );
      this.solicitud260101Store.setDenominacion(
        this.selectedDestinatario[0].denominacion
      );
      this.solicitud260101Store.setDenominacionApellidoMaterno(
        this.selectedDestinatario[0].apellidoMaterno
      );
      this.solicitud260101Store.setDenominacionApellidoPaterno(
        this.selectedDestinatario[0].apellidoPaterno
      );
      this.solicitud260101Store.setDomicilioPais(
        this.selectedDestinatario[0].pais
      );
      this.solicitud260101Store.setDomicilioEstado(
        this.selectedDestinatario[0].estado
      );
      this.solicitud260101Store.setDomicilioMunicipio(
        this.selectedDestinatario[0].municipio
      );
      this.solicitud260101Store.setDomicilioLocalidad(
        this.selectedDestinatario[0].localidad
      );
      this.solicitud260101Store.setDomicilioCodigo(
        this.selectedDestinatario[0].codigo
      );
      this.solicitud260101Store.setDomicilioColonia(
        this.selectedDestinatario[0].colonia
      );
      this.solicitud260101Store.setDomicilioCalle(
        this.selectedDestinatario[0].calle
      );
      this.solicitud260101Store.setDomicilioNumeroExterior(
        this.selectedDestinatario[0].numeroExterior
      );
      this.solicitud260101Store.setDomicilioNumeroInterior(
        this.selectedDestinatario[0].numeroInterior
      );
      this.solicitud260101Store.setDomicilioLada(
        this.selectedDestinatario[0].lada
      );
      this.solicitud260101Store.setDomicilioTelefono(
        this.selectedDestinatario[0].telefono
      );
      this.solicitud260101Store.setDomicilioCorreoElectronico(
        this.selectedDestinatario[0].correoElectronico
      );
      if (this.MODAL_INSTANCE) {
        this.solicitud260101Store.setModificarDestinatario(true);
        this.inputSelectionDestinatario = -1;
        this.MODAL_INSTANCE.show();
      }
    }
  }

  /**
   * Abre el modal para agregar nuevas mercancías.
   */
  agregarMercancias(): void {
    if (this.modalElement) {
      this.modificarDestinatario = [];
      if (this.MODAL_INSTANCE) {
        this.solicitud260101Store.setModificarDestinatario(false);
        this.MODAL_INSTANCE.show();
      }
    }
  }

  cerrarMercanciasModal(evento: Destinatario): void {
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
          this.destinatarioDatos[index].paisNombre = evento.paisNombre;
          this.destinatarioDatos[index].colonia = evento.colonia;
          this.destinatarioDatos[index].coloniaNombre = evento.coloniaNombre;
          this.destinatarioDatos[index].municipio = evento.municipio;
          this.destinatarioDatos[index].municipioNombre =
            evento.municipioNombre;
          this.destinatarioDatos[index].localidad = evento.localidad;
          this.destinatarioDatos[index].localidadNombre =
            evento.localidadNombre;
          this.destinatarioDatos[index].estado = evento.estado;
          this.destinatarioDatos[index].estadoNombre = evento.estadoNombre;
          this.destinatarioDatos[index].estado2 = evento.estado2;
          this.destinatarioDatos[index].codigo = evento.codigo;
          this.destinatarioDatos[index].codigoNombre = evento.codigoNombre;
        }
      });
    } else {
      this.destinatarioDatos.push(evento);
    }
    if (this.MODAL_INSTANCE) {
      this.solicitud260101Store.setModificarDestinatario(false);
      this.MODAL_INSTANCE.hide();
    }
  }

  seleccionFabricanteDatos(evento: Fabricante[]): void {
    this.selectedFabricante = evento;
  }

  agregarModalFabricante(): void {
    if (this.MODAL_INSTANCE_FABRICANTE) {
      this.solicitud260101Store.setModificarFabricante(false);
      this.MODAL_INSTANCE_FABRICANTE.show();
    }
  }

  modificarModalFabricante(): void {
    if (this.selectedFabricante.length > 0) {
      this.solicitud260101Store.setTercerosNacionalidad(
        this.selectedFabricante[0].tercerosNacionalidad
      );
      this.solicitud260101Store.setTercerosTipoPersona(
        this.selectedFabricante[0].tipoPersona
      );
      this.solicitud260101Store.setTercerosRFC(this.selectedFabricante[0].rfc);
      this.solicitud260101Store.setTercerosDenominacionNombre(
        this.selectedFabricante[0].nombre
      );
      this.solicitud260101Store.setTercerosDenominacion(
        this.selectedFabricante[0].denominacion
      );
      this.solicitud260101Store.setTercerosApellidoMaterno(
        this.selectedFabricante[0].apellidoMaterno
      );
      this.solicitud260101Store.setTercerosApellidoPaterno(
        this.selectedFabricante[0].apellidoPaterno
      );
      this.solicitud260101Store.setTercerosPais(
        this.selectedFabricante[0].pais
      );
      this.solicitud260101Store.setTercerosEstado(
        this.selectedFabricante[0].estado
      );
      this.solicitud260101Store.setTercerosMunicipio(
        this.selectedFabricante[0].municipio
      );
      this.solicitud260101Store.setTercerosLocalidad(
        this.selectedFabricante[0].localidad
      );
      this.solicitud260101Store.setTercerosCodigo(
        this.selectedFabricante[0].codigo
      );
      this.solicitud260101Store.setTercerosColonia(
        this.selectedFabricante[0].colonia
      );
      this.solicitud260101Store.setTercerosCalle(
        this.selectedFabricante[0].calle
      );
      this.solicitud260101Store.setTercerosNumeroExterior(
        this.selectedFabricante[0].numeroExterior
      );
      this.solicitud260101Store.setTercerosNumeroInterior(
        this.selectedFabricante[0].numeroInterior
      );
      this.solicitud260101Store.setTercerosLada(
        this.selectedFabricante[0].lada
      );
      this.solicitud260101Store.setTercerosTelefono(
        this.selectedFabricante[0].telefono
      );
      this.solicitud260101Store.setTercerosCorreoElectronico(
        this.selectedFabricante[0].correoElectronico
      );
      if (this.MODAL_INSTANCE_FABRICANTE) {
        this.solicitud260101Store.setModificarFabricante(true);
        this.inputSelectionDestinatario = -1;
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
          this.fabricanteDatos[index].tercerosNacionalidad =
            evento.tercerosNacionalidad;
          this.fabricanteDatos[index].tipoPersona = evento.tipoPersona;
          this.fabricanteDatos[index].nombre = evento.nombre;
          this.fabricanteDatos[index].apellidoMaterno = evento.apellidoMaterno;
          this.fabricanteDatos[index].apellidoPaterno = evento.apellidoPaterno;
          this.fabricanteDatos[index].curp = evento.curp;
          this.fabricanteDatos[index].telefono = evento.telefono;
          this.fabricanteDatos[index].correoElectronico =
            evento.correoElectronico;
          this.fabricanteDatos[index].calle = evento.calle;
          this.fabricanteDatos[index].numeroExterior = evento.numeroExterior;
          this.fabricanteDatos[index].numeroInterior = evento.numeroInterior;
          this.fabricanteDatos[index].pais = evento.pais;
          this.fabricanteDatos[index].paisNombre = evento.paisNombre;
          this.fabricanteDatos[index].colonia = evento.colonia;
          this.fabricanteDatos[index].coloniaNombre = evento.coloniaNombre;
          this.fabricanteDatos[index].municipio = evento.municipio;
          this.fabricanteDatos[index].municipioNombre = evento.municipioNombre;
          this.fabricanteDatos[index].localidad = evento.localidad;
          this.fabricanteDatos[index].localidadNombre = evento.localidadNombre;
          this.fabricanteDatos[index].estado = evento.estado;
          this.fabricanteDatos[index].estadoNombre = evento.estadoNombre;
          this.fabricanteDatos[index].estado2 = evento.estado2;
          this.fabricanteDatos[index].codigo = evento.codigo;
          this.fabricanteDatos[index].codigoNombre = evento.codigoNombre;
        }
      });
    } else {
      this.fabricanteDatos.push(evento);
    }
    if (this.MODAL_INSTANCE_FABRICANTE) {
      this.MODAL_INSTANCE_FABRICANTE.hide();
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
