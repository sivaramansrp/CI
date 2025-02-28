import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  DatosSubcontratista,
  InfoRegistro,
  SubfacrintaTablaModelo,
} from '../../modelos/submanufacturer-extension';
import { SUBFACRINTATABLACONFIGURACION } from '../../constantes/submanufabricnats-tabla-configuracion.enum';
import { SubManufacturerService } from '../../servicios/servicios-submanufacturer-service';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

/**
 * @fileoverview Componente para la gestión de empresas submanufactureras.
 * Este componente maneja la lógica y la presentación del formulario de empresas submanufactureras,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module empresasSubmanufactureras --80207
 */

/**
 * Componente para la gestión de empresas submanufactureras.
 * @class EmpresasSubmanufacturerasComponent --80207
 * @implements {OnInit, OnDestroy}
 */

@Component({
  selector: 'app-empresas-submanufactureras',
  templateUrl: './empresas-submanufactureras.component.html',
  styleUrls: ['./empresas-submanufactureras.component.scss'],
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
})
export class EmpresasSubmanufacturerasComponent implements OnInit, OnDestroy {
  /**
   * Formulario para la información de registro.
   * @property {FormGroup} formularioInfoRegistro
   */
  formularioInfoRegistro!: FormGroup;

  /**
   * Formulario para los datos del subcontratista.
   * @property {FormGroup} formularioDatosSubcontratista
   */
  formularioDatosSubcontratista!: FormGroup;

  /**
   * Información de registro obtenida del servicio.
   * @property {InfoRegistro} infoRegistro
   */
  infoRegistro!: InfoRegistro;

  /**
   * Datos del subcontratista obtenidos del servicio.
   * @property {DatosSubcontratista} datosSubcontratista
   */
  datosSubcontratista!: DatosSubcontratista;

  /**
   * Lista de estados obtenida del servicio.
   * @property {Catalogo[]} estadoCatalogo
   */

  estadoCatalogo: Catalogo[] = [];

  /**
   * Tipo de selección de la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla de subfabricantes.
   * @property {ConfiguracionColumna<SubfacrintaTablaModelo>[]} configuracionTabla
   */
  configuracionTabla: ConfiguracionColumna<SubfacrintaTablaModelo>[] =
    SUBFACRINTATABLACONFIGURACION;

  /**
   * Datos del subfabricante seleccionado.
   * @property {SubfacrintaTablaModelo[]} datosDelSubfabricanteSeleccionado
   */
  datosDelSubfabricanteSeleccionado: SubfacrintaTablaModelo[] = [];

  /**
   * Agregar los datos del subfabricante seleccionado.
   * @property {SubfacrintaTablaModelo[]} datosSubfabricanteParaSerAgregados
   */
  datosSubfabricanteParaSerAgregados: SubfacrintaTablaModelo[] = [];

  /**
   * Datos de la tabla de subfabricantes disponibles.
   * @property {SubfacrintaTablaModelo[]} datosTablaSubfabricantesDisponibles
   */
  datosTablaSubfabricantesDisponibles: SubfacrintaTablaModelo[] = [];

  /**
   * Lista de subfabricantes por eliminar.
   * @property {SubfacrintaTablaModelo[]} listaDeSubfabricantesPorEliminar
   */
  listaDeSubfabricantesPorEliminar: SubfacrintaTablaModelo[] = [];

  /**
   * Arreglo de suscripciones para gestionar la limpieza de recursos.
   * @property {Subscription[]} arregloDeSuscripciones
   */
  arregloDeSuscripciones: Subscription[] = [];

  /**
   * Controla la visualización de la tabla de subfabricantes disponibles.
   * @property {BehaviorSubject<boolean>} mostrarTablaSubfabricantesDisponibles$
   */
  mostrarTablaSubfabricantesDisponibles$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  /**
   * Controla la visualización de la tabla de subfabricantes seleccionados.
   * @property {Boolean} mostrarTablaSubfabricantesSeleccionadas
   */
  mostrarTablaSubfabricantesSeleccionadas: boolean = false;

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {SubManufacturerService} subManufacturerDatoService - Servicio para obtener datos de submanufactureras.
   */
  constructor(
    private fb: FormBuilder,
    private subManufacturerDatoService: SubManufacturerService
  ) {
    this.inicializarFormularioInfoRegistro();
  }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.inicializarFormularioInfoRegistro();
    this.inicializarFormularioDatosSubcontratista();
    this.getDatos();
    this.obtenerListaEstado();
  }

  /**
   * Obtiene los datos de registro y subcontratista desde el servicio y actualiza los formularios correspondientes.
   * @method getDatos
   */
  getDatos(): void {
    const SUSCRIPCIÓN = this.subManufacturerDatoService
      .getDatos()
      .subscribe((response) => {
        if (response) {
          this.infoRegistro = response.infoRegistro;
          this.datosSubcontratista = response.datosSubcontratista;
          this.inicializarFormularioInfoRegistro();
          this.inicializarFormularioDatosSubcontratista();
        }
      });

    this.arregloDeSuscripciones.push(SUSCRIPCIÓN);
  }

  /**
   * Inicializa el formulario de información de registro con los datos obtenidos o con valores vacíos si no hay datos disponibles.
   * @method inicializarFormularioInfoRegistro
   */
  inicializarFormularioInfoRegistro(): void {
    if (this.infoRegistro) {
      this.formularioInfoRegistro = this.fb.group({
        modalidad: [{ value: this.infoRegistro.modalidad, disabled: true }],
        folio: [{ value: this.infoRegistro.folio, disabled: true }],
        año: [{ value: this.infoRegistro.año, disabled: true }],
      });
    } else {
      this.formularioInfoRegistro = this.fb.group({
        modalidad: [{ value: '', disabled: true }],
        folio: [{ value: '', disabled: true }],
        año: [{ value: '', disabled: true }],
      });
    }
  }

  /**
   * Inicializa el formulario de datos del subcontratista con los datos obtenidos o con valores vacíos si no hay datos disponibles.
   * @method inicializarFormularioDatosSubcontratista
   */
  inicializarFormularioDatosSubcontratista(): void {
    if (this.datosSubcontratista) {
      this.formularioDatosSubcontratista = this.fb.group({
        rfc: [this.datosSubcontratista.rfc, Validators.required],
        estado: [this.datosSubcontratista.estado, Validators.required],
      });
    } else {
      this.formularioDatosSubcontratista = this.fb.group({
        rfc: ['', Validators.required],
        estado: ['', Validators.required],
      });
    }
  }

  /**
   * Obtiene la lista de estados desde el servicio y actualiza la propiedad estadoCatalogo.
   * @method obtenerListaEstado
   */
  obtenerListaEstado(): void {
    const SUSCRIPCIÓN = this.subManufacturerDatoService
      .obtenerListaEstado()
      .subscribe((response) => {
        if (response) {
          this.estadoCatalogo = response.data;
        }
      });
    this.arregloDeSuscripciones.push(SUSCRIPCIÓN);
  }

  /**
   * Obtiene la lista de subfabricantes disponibles desde el servicio y actualiza las cabeceras y datos de la tabla correspondiente.
   * @method obtenerSubfabricantesDisponibles
   */
  obtenerSubfabricantesDisponibles(): void {
    const SUSCRIPCIÓN = this.subManufacturerDatoService
      .getSubfabricantesDisponibles()
      .subscribe((response: SubfacrintaTablaModelo[]) => {
        if (response) {
          this.datosTablaSubfabricantesDisponibles = response;
          this.mostrarTablaSubfabricantesDisponibles$.next(true);
        }
      });
    this.arregloDeSuscripciones.push(SUSCRIPCIÓN);
  }

  /**
   * Obtiene el registro seleccionado de la tabla de subfabricantes disponibles.
   * @method obtenerRegistroSeleccionado
   * @param {SubfacrintaTablaModelo[]} event - Evento con los datos del registro seleccionado.
   */
  obtenerRegistroSeleccionado(event: SubfacrintaTablaModelo[]): void {
    if (event.length > 0) {
      this.datosDelSubfabricanteSeleccionado = event;
    } else {
      this.mostrarTablaSubfabricantesSeleccionadas = false;
      this.datosDelSubfabricanteSeleccionado = [];
    }
  }

  /**
   * Realiza una búsqueda de subfabricantes disponibles.
   * @method realizarBusqueda
   */
  realizarBusqueda(): void {
    this.obtenerSubfabricantesDisponibles();
  }

  /**
   * Agrega plantas a la lista de subfabricantes seleccionados.
   * @method agregarPlantas
   */
  agregarPlantas(): void {
    this.datosSubfabricanteParaSerAgregados =
      this.datosDelSubfabricanteSeleccionado;
    if (
      this.datosSubfabricanteParaSerAgregados &&
      this.datosSubfabricanteParaSerAgregados.length > 0
    ) {
      this.mostrarTablaSubfabricantesSeleccionadas = true;
      //Implementar la llamada a la API posterior para los datos del subfabricante seleccionado
    }
  }

  /**
   * Obtiene los datos del subfabricante por eliminar.
   * @method datosDelSubfabricantePorEliminar
   * @param {SubfacrintaTablaModelo[]} event - Evento con los datos del subfabricante por eliminar.
   */
  datosDelSubfabricantePorEliminar(event: SubfacrintaTablaModelo[]): void {
    this.listaDeSubfabricantesPorEliminar = event;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy():void {
    this.arregloDeSuscripciones.forEach((suscripcion) =>
      suscripcion.unsubscribe()
    );
    this.mostrarTablaSubfabricantesDisponibles$.next(false);
    this.mostrarTablaSubfabricantesSeleccionadas = false;
  }
}
