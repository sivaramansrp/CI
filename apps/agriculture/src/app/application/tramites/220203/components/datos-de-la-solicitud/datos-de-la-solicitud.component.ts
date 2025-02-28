import { Component, OnDestroy } from '@angular/core';
import { MENSAJE_DOBLE_CLIC } from 'libs/shared/data-access-user/src/core/enums/220203/importacion-de-acuicultura.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { ImportacionDeAcuiculturaService } from 'libs/shared/data-access-user/src/core/services/220203/importacion-de-acuicultura.service';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';

interface DatoTabla {
  solicitud: string;
  fechaCreacion: string;
  mercancia: string;
  cantidad: number; // O string, dependiendo del tipo de dato
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
export class DatosDeLaSolicitudComponent implements OnDestroy {
  /**
   * @description Mensaje que se muestra en una alerta al hacer doble clic.
   */
  alertMessage: string = MENSAJE_DOBLE_CLIC;

  /**
   * @description Tipo de selección para la tabla principal.
   */
  tipoSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description Tipo de selección para la tabla de solicitudes.
   */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * @description Datos de la tabla de solicitudes.
   */
  cuerpoTablasoli: DatoTabla[] = [];

  /**
   * @description Configuración de columnas para la tabla principal.
   */
  configuracionColumnas: ConfiguracionColumna<any>[] = [
    { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },
    { encabezado: 'Tipo de requisito', clave: (fila) => fila.tipoRequisito, orden: 2 },
    { encabezado: 'Requisito', clave: (fila) => fila.requisito, orden: 3 },
    { encabezado: 'Número de Certificado Internacional', clave: (fila) => fila.numeroCertificado, orden: 4 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 5 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccion, orden: 6 },
    { encabezado: 'Nico', clave: (fila) => fila.nico, orden: 7 },
  ];

  /**
   * @description Configuración de columnas para la tabla de solicitudes.
   */
  configuracionColumnasoli: ConfiguracionColumna<any>[] = [
    { encabezado: 'Solicitud', clave: (fila) => fila.solicitud, orden: 1 },
    { encabezado: 'Fecha Creación', clave: (fila) => fila.fechaCreacion, orden: 2 },
    { encabezado: 'Mercancía', clave: (fila) => fila.mercancia, orden: 3 },
    { encabezado: 'Cantidad', clave: (fila) => fila.cantidad.toString(), orden: 4 },
    { encabezado: 'Proveedor', clave: (fila) => fila.proveedor, orden: 5 },
  ];

  /**
   * @description Indica si la sección es colapsable.
   */
  colapsable: boolean = false;

  /**
   * @description Grupo de formularios para los datos de la mercancía.
   */
  datosMercanciaFormGroup!: FormGroup;

  /**
   * @description Lista de catálogos para las aduanas de ingreso.
   */
  aduanaDeIngresoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las oficinas de inspección.
   */
  oficinaInspeccionList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los puntos de inspección.
   */
  puntoInspeccionList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los tipos de requisitos.
   */
  tipoRequisitoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las fracciones arancelarias.
   */
  arancelariaList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los regímenes.
   */
  regimenList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los NICO (Números de Identificación Comercial).
   */
  nicoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para las UMC (Unidades de Medida Comercial).
   */
  umcList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los usos.
   */
  usoList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los países de origen.
   */
  paisDeOrigenList: Catalogo[] = [];

  /**
   * @description Lista de catálogos para los países de procedencia.
   */
  paisDeProcedenciaList: Catalogo[] = [];

  /**
   * @description Encabezados comunes para la tabla principal.
   */
  encabezadosComunesTabla: string[] = ["No. partida", "Tipo de requisito", "Requisito", "Número de Certificado Internacional", "Fracción arancelaria", "Descripción de la fracción", "Nico"];

  /**
   * @description Encabezados de la tabla de detalles.
   */
  detalleTable: string[] = ["Nombre científico"];

  /**
   * @description Datos de la tabla de detalles.
   */
  detallecuerpoTabla: string[] = [];

  /**
   * @description Datos de la tabla principal.
   */
  cuerpoTabla: string[] = [];

  /**
   * @description Indica si se debe mostrar la barra de desplazamiento.
   */
  myScrollbarValue: boolean = true;

  /**
   * @description Constructor del componente.
   * @param fb Servicio para construir formularios.
   * @param importacionDeAcuiculturaServices Servicio para obtener datos de catálogos.
   */
  constructor(private readonly fb: FormBuilder, private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService) {
    this.createFromGroup();
    this.obtenerCatalogosTransporte();
  }

  /**
   * @description Crea el grupo de formularios para los datos de la mercancía.
   */
  createFromGroup() {
    this.datosMercanciaFormGroup = this.fb.group({
      realizarGroup: this.fb.group({
        aduanaIngreso: ['', Validators.required],
        oficinaInspeccion: ['', Validators.required],
        puntoInspeccion: ['', Validators.required],
        numeroGuia: ['', Validators.required],
        regimen: ['', Validators.required]
      }),
      mercanciaGroup: this.fb.group({
        tipoRequisito: ['', Validators.required],
        requisito: ['', Validators.required],
        numeroCertificadoInternacional: ['', Validators.required],
        numeroOficioCasoEspecial: [''],
        fraccionArancelaria: ['', Validators.required],
        descripcionFraccionArancelaria: [{ value: '', disabled: true }, Validators.required],
        nico: ['', Validators.required],
        descripcionNico: [{ value: '', disabled: true }, Validators.required],
        descripcion: [''],
        cantidadUMT: ['', Validators.required],
        umt: [{ value: '', disabled: true }, Validators.required],
        cantidadUMC: ['', Validators.required],
        umc: ['', Validators.required],
        uso: ['', Validators.required],
        numeroDeLote: ['', Validators.required],
        faseDeDesarrollo: ['', Validators.required],
        especie: ['', Validators.required],
        paisDeOrigen: ['', Validators.required],
        paisDeProcedencia: ['', Validators.required]
      }),
      detalles: this.fb.group({
        nombreCientifico: ['', Validators.required]
      })
    })



  }
  /**
  * @description Obtiene los datos del catálogo de transporte.
  */

  obtenerCatalogosTransporte() {
    this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('transporte.json').subscribe((data => {
      this.aduanaDeIngresoList = data.data as Catalogo[];
    }));
  }  /**
  * @description Obtiene los datos del catálogo de transporte.
  */  ngOnDestroy(): void {
    this.importacionDeAcuiculturaServices.actualizarDatosMercancia(this.datosMercanciaFormGroup.value);
  }
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

}
