import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Catalogo, ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';

import { MENSAJE_DOBLE_CLIC } from '../../constantes/220203/importacion-de-acuicultura.enum';

import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

import { Subject, takeUntil } from 'rxjs';
import { DatosMercancia220203 } from '../../models/220203/importacion-de-acuicultura.module';

interface DatoTabla {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number; // O string, dependiendo del tipo de dato
  proveedor: string;
}
interface Fila {
  noPartida: string;
  tipoRequisito: string;
  requisito: string;
  numeroCertificado: string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  nico: string;
}
interface FilaSolicitud {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proveedor: string;
}
/**
 * @description Componente para gestionar los datos de la solicitud de importación de acuicultura.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnDestroy, OnInit {
  private destroyNotifier$ = new Subject<void>();

  /**
   * @description Mensaje que se muestra en una alerta al hacer doble clic.
   * @type {string}
   */
  alertMessage: string = MENSAJE_DOBLE_CLIC;

  /**
   * @description Tipo de selección para la tabla principal.
   * @type {TablaSeleccion}
   */
  tipoSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description Tipo de selección para la tabla de solicitudes.
   * @type {TablaSeleccion}
   */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * @description Datos de la tabla de solicitudes.
   * @type {DatoTabla[]}
   */
  cuerpoTablasoli: DatoTabla[] = [];

  /**
   * @description Configuración de columnas para la tabla principal.
   * @type {ConfiguracionColumna<Fila>[]}
   */
  configuracionColumnas: ConfiguracionColumna<Fila>[] = [
    { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },
    { encabezado: 'Tipo de requisito', clave: (fila) => fila.tipoRequisito, orden: 2 },
    { encabezado: 'Requisito', clave: (fila) => fila.requisito, orden: 3 },
    { encabezado: 'Número de Certificado Internacional', clave: (fila) => fila.numeroCertificado, orden: 4 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 5 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccion, orden: 6 },
    { encabezado: 'Nico', clave: (fila) => fila.nico, orden: 7 },
  ];

  /**
   * @description Datos de la tabla de detalles.
   * @type {Fila[]}
   */
  cuerpoTablaFila: Fila[] = [];

  /**
   * @description Configuración de columnas para la tabla de solicitudes.
   * @type {ConfiguracionColumna<FilaSolicitud>[]}
   */
  configuracionColumnasoli: ConfiguracionColumna<FilaSolicitud>[] = [
    { encabezado: 'Solicitud', clave: (fila) => fila.solicitud, orden: 1 },
    { encabezado: 'Fecha Creación', clave: (fila) => fila.fechaCreacion, orden: 2 },
    { encabezado: 'Mercancía', clave: (fila) => fila.mercancia, orden: 3 },
    { encabezado: 'Cantidad', clave: (fila) => fila.cantidad.toString(), orden: 4 },
    { encabezado: 'Proveedor', clave: (fila) => fila.proveedor, orden: 5 },
  ];

  /**
   * @description Indica si la sección es colapsable.
   * @type {boolean}
   */
  colapsable: boolean = false;

  /**
   * @description Grupo de formularios para los datos de la mercancía.
   * @type {FormGroup}
   */
  datosMercanciaFormGroup!: FormGroup;

  /**
   * @description Lista de catálogos para las aduanas de ingreso.
   * @type {Catalogo[]}
   */
  aduanaDeIngresoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las oficinas de inspección.
   * @type {Catalogo[]}
   */
  oficinaInspeccionList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los puntos de inspección.
   * @type {Catalogo[]}
   */
  puntoInspeccionList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los tipos de requisitos.
   * @type {Catalogo[]}
   */
  tipoRequisitoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las fracciones arancelarias.
   * @type {Catalogo[]}
   */
  arancelariaList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los regímenes.
   * @type {Catalogo[]}
   */
  regimenList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los NICO (Números de Identificación Comercial).
   * @type {Catalogo[]}
   */
  nicoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las UMC (Unidades de Medida Comercial).
   * @type {Catalogo[]}
   */
  umcList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los usos.
   * @type {Catalogo[]}
   */
  usoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los países de origen.
   * @type {Catalogo[]}
   */
  paisDeOrigenList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los países de procedencia.
   * @type {Catalogo[]}
   */
  paisDeProcedenciaList: Catalogo[] = [];

  /**
   * @description Encabezados de la tabla de detalles.
   * @type {string[]}
   */
  detalleTable: string[] = ["Nombre científico"];

  /**
   * @description Datos de la tabla de detalles.
   * @type {string[]}
   */
  detallecuerpoTabla: string[] = [];

  /**
   * @description Datos de la tabla principal.
   * @type {FilaSolicitud[]}
   */
  cuerpoTabla: FilaSolicitud[] = [];
  datosMercanciaStore: DatosMercancia220203 = {} as DatosMercancia220203;
  /**
   * @description Datos de la tabla de solicitudes.
   * @type {FilaSolicitud[]}
   */
  cuerpoTablaSolicitud: FilaSolicitud[] = [];

  /**
   * @description Indica si se debe mostrar la barra de desplazamiento.
   * @type {boolean}
   */
  myScrollbarValue: boolean = true;

  /**
   * @description Constructor del componente.
   * @param {FormBuilder} fb Servicio para construir formularios.
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaServices Servicio para obtener datos de catálogos.
   */
  constructor(private readonly fb: FormBuilder, private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService) {
    this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      console.log(datos)
      this.datosMercanciaStore = datos.datosMercancia;
    })
    this.createFromGroup();
    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosArancelaria();
    this.obtenerCatalogosUMC();
    this.obtenerCatalogosUMT();
    this.obtenerCatalogosUSO();
  }

  /**
   * @description Crea el grupo de formularios para los datos de la mercancía.
   */
  createFromGroup() {
    this.datosMercanciaFormGroup = this.fb.group({
      realizarGroup: this.fb.group({
        aduanaIngreso: [this.datosMercanciaStore.realizarGroup.aduanaIngreso || '', Validators.required],
        oficinaInspeccion: [this.datosMercanciaStore.realizarGroup.oficinaInspeccion || '', Validators.required],
        puntoInspeccion: [this.datosMercanciaStore.realizarGroup.puntoInspeccion || '', Validators.required],
        numeroGuia: [this.datosMercanciaStore.realizarGroup.numeroGuia || ''],
        regimen: [this.datosMercanciaStore.realizarGroup.regimen || '', Validators.required]
      }),
      mercanciaGroup: this.fb.group({
        tipoRequisito: [this.datosMercanciaStore.mercanciaGroup.tipoRequisito || '', Validators.required],
        requisito: [this.datosMercanciaStore.mercanciaGroup.requisito || '', Validators.required],
        numeroCertificadoInternacional: [this.datosMercanciaStore.mercanciaGroup.numeroCertificadoInternacional || '', Validators.required],
        numeroOficioCasoEspecial: [this.datosMercanciaStore.mercanciaGroup.numeroOficioCasoEspecial || ''],
        fraccionArancelaria: [this.datosMercanciaStore.mercanciaGroup.fraccionArancelaria, Validators.required],
        descripcionFraccionArancelaria: [{ value: this.datosMercanciaStore.mercanciaGroup.descripcionFraccionArancelaria || '', disabled: true }, Validators.required],
        nico: [this.datosMercanciaStore.mercanciaGroup.nico || '', Validators.required],
        descripcionNico: [{ value: this.datosMercanciaStore.mercanciaGroup.descripcionNico || '', disabled: true }, Validators.required],
        descripcion: [this.datosMercanciaStore.mercanciaGroup.descripcion || '', Validators.required],
        cantidadUMT: [this.datosMercanciaStore.mercanciaGroup.cantidadUMT || '', Validators.required],
        umt: [{ value: this.datosMercanciaStore.mercanciaGroup.umt || '', disabled: true }, Validators.required],
        cantidadUMC: [this.datosMercanciaStore.mercanciaGroup.cantidadUMC || '', Validators.required],
        umc: [this.datosMercanciaStore.mercanciaGroup.umc || '', Validators.required],
        uso: [this.datosMercanciaStore.mercanciaGroup.uso || '', Validators.required],
        numeroDeLote: [this.datosMercanciaStore.mercanciaGroup.numeroDeLote || '', Validators.required],
        faseDeDesarrollo: [this.datosMercanciaStore.mercanciaGroup.faseDeDesarrollo || '', Validators.required],
        especie: [this.datosMercanciaStore.mercanciaGroup.especie || '', Validators.required],
        paisDeOrigen: [this.datosMercanciaStore.mercanciaGroup.paisDeOrigen || '', Validators.required],
        paisDeProcedencia: [this.datosMercanciaStore.mercanciaGroup.paisDeProcedencia || '', Validators.required]
      }),
      detalles: this.fb.group({
        nombreCientifico: [this.datosMercanciaStore.detalles.nombreCientifico || '']
      })
    });
  }

  ngOnInit(): void {
    this.datosMercanciaFormGroup.statusChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((changes) => {
        this.verificarEstadoDelBoton();
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Obtiene los datos del catálogo de transporte.
   */
  obtenerCatalogosTransporte() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.aduanaDeIngresoList = data.data as Catalogo[];
        this.tipoRequisitoList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Obtiene los datos del catálogo de arancelaria.
   */
  obtenerCatalogosArancelaria() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.oficinaInspeccionList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Obtiene los datos del catálogo de UMC.
   */
  obtenerCatalogosUMC() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('aduana_de_ingreso.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.umcList = data.data as Catalogo[];
        this.arancelariaList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Obtiene los datos del catálogo de UMT.
   */
  obtenerCatalogosUMT() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('empresa.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.regimenList = data.data as Catalogo[];
        this.nicoList = data.data as Catalogo[];
        this.puntoInspeccionList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Obtiene los datos del catálogo de USO.
   */
  obtenerCatalogosUSO() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('oficina_de_inspeccion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.usoList = data.data as Catalogo[];
        this.paisDeOrigenList = data.data as Catalogo[];
        this.paisDeProcedenciaList = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Muestra o esconde la sección colapsable.
   */
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  /**
   * @description Verifica el estado del formulario y habilita o deshabilita el botón según su validez.
   */
  verificarEstadoDelBoton() {
    const DATOS = {
      dataDeLaSolicitud: false,
    };
    if (this.datosMercanciaFormGroup.valid) {
      DATOS.dataDeLaSolicitud = true;
    }
    this.importacionDeAcuiculturaServices.actualizarFormaValida(DATOS);
  }

  /**
   * @description Guarda los valores en el store.
   * @param form El formulario que contiene los valores.
   * @param campo El campo a guardar en el store.
   */
  setValoresStore(
    form?: FormGroup,
    campo?: string,
  ): void {
    if (campo == 'fraccionArancelaria') {
      this.datosMercanciaFormGroup.get('mercanciaGroup')?.patchValue({
        descripcionFraccionArancelaria: 'Nuevo valor para descripcion',
      });
    }
    else if (campo == 'nico') {
      this.datosMercanciaFormGroup.get('mercanciaGroup')?.patchValue({
        descripcionNico: 'Nuevo valor para descripcionNico',
      });
    }
    else if (campo == 'cantidadUMT') {
      this.datosMercanciaFormGroup.get('mercanciaGroup')?.patchValue({
        umt: 'Nuevo valor para cantidadUMT',
      });
    }
    const VALOR = this.datosMercanciaFormGroup.value;
    (this.importacionDeAcuiculturaServices.actualizarDatosMercancia as (value: DatosMercancia220203) => void)(
      VALOR
    );
  }

  /**
   * @description Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}