import { Component, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';

import {
  AlertComponent,
  ConfiguracionColumna,
  Fabricante,
  LASTABLA,
  Otros260303,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';

import { ConsultaioState } from '@ng-mf/data-access-user';

import { FABRICANTE_TABLA, OTROS_TABLA } from '../../../constantes/shared2603/certificados-licencias-permisos.enum';
import { CertificadosLicenciasPermisosService } from '../../../services/shared2603/certificados-licencias-permisos.service';
import { FabricanteModalComponent } from '../fabricante-modal/fabricante-modal.component';


import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ID_PROCEDIMIENTO, PERMISO_DEFINITIVO_TITULO } from '../../../constantes/shared2603/medicos-sin-registrar.enum';
type AllowedValue = string | number | boolean | undefined;

/**
 * TercerosRelacionadosComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, TablaDinamicaComponent, ReactiveFormsModule],
  providers:[BsModalService],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnDestroy {
  /**
   * Indica si el título del programa debe mostrarse.
   */
  @Input() public programTitle: boolean = false;

  /**
   * Referencias a todos los componentes de tabla dinámica para poder limpiar sus selecciones
   */
  @ViewChildren(TablaDinamicaComponent) tablaComponents!: QueryList<TablaDinamicaComponent<unknown>>;

  /**
   * FormGroup que gestiona los controles y las validaciones
   * para la sección de la tabla "Terceros Relacionados".
   * 
   * Este FormGroup contiene la información relacionada con
   * terceros (por ejemplo, fabricante, facturador, proveedor)
   * y se utiliza para enlazar los campos del formulario en
   * la plantilla, permitiendo crear, editar y validar los
   * registros de la tabla "Terceros Relacionados".
   */
  public tercerosRelacionadosTabla!: FormGroup;

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;

  /**
   * Indica si el formulario debe estar deshabilitado (solo lectura).
   */
  @Input() formularioDeshabilitado: boolean = false;

    /**
   * @property
   * @name permisoDefinitivoTitulo
   * @type {number}
   * @description Identificador único del procedimiento actual. Este valor se utiliza para asociar el componente con un trámite específico en el sistema.
   */
  @Input() permisoDefinitivoTitulo: number[] = PERMISO_DEFINITIVO_TITULO;

    /**
   * @property
   * @name idProcedimiento
   * @type {number}
   * @description Identificador único del procedimiento actual. Este valor se utiliza para asociar el componente con un trámite específico en el sistema.
   */
  @Input() idProcedimiento : number[] = ID_PROCEDIMIENTO;

  /**
   * Una referencia a la instancia del modal de Bootstrap.
   * Esto se utiliza para controlar e interactuar con el cuadro de diálogo modal.
   */
  bsModalRef?: BsModalRef;

  /**
   * Una propiedad pública que contiene los datos o la configuración para el componente.
   * Se le asigna el valor de `LASTABLA`, que probablemente sea una constante o variable
   * definida en otra parte de la aplicación.
   */
  public TEXTOS = LASTABLA;
  /**
   * Un arreglo que contiene los datos de los fabricantes (Fabricante).
   * Esto se utiliza para gestionar y mostrar información relacionada con los fabricantes
   * en el contexto de la aplicación.
   */
  public fabricanteTablaDatos: Fabricante[] = [];
  /**
   * Un arreglo de objetos `Fabricante` que representa los datos para la tabla "facturador".
   * Esta propiedad se utiliza para almacenar y gestionar la lista de fabricantes o entidades relacionadas
   * que se muestran en la tabla dentro del componente.
   */
  public facturadorTablaDatos: Fabricante[] = [];
  /**
   * Un arreglo de objetos `Fabricante` que representa los datos para la tabla de proveedores.
   * Esto se utiliza para almacenar y gestionar la lista de fabricantes o proveedores relacionados.
   */
  public proveedorTablaDatos: Fabricante[] = [];
  /**
   * Contiene un arreglo de objetos `Fabricante` que representa los datos del certificado analítico.
   * Esta propiedad se utiliza para gestionar y mostrar información relacionada con los fabricantes
   * en el contexto de la aplicación.
   */
  public certificadoAnaliticoTablaDatos: Fabricante[] = [];
  /**
   * Representa una colección de objetos "Otros" utilizada para almacenar datos para el componente.
   * Este arreglo se inicializa como vacío y puede ser llenado con instancias del tipo `Otros`.
   */
  public otrosTablaDatos: Otros260303[] = [];
  /**
   * Representa el tipo de selección de casilla de verificación utilizado en la tabla.
   * Esto se asigna desde la enumeración `TablaSeleccion.CHECKBOX`.
   */
  public checkbox = TablaSeleccion.CHECKBOX;
  
  /**
   * Objeto de configuración para la tabla "Fabricante".
   * Esto se utiliza para definir las configuraciones y propiedades de la tabla
   * en el componente "Terceros Relacionados".
   */
  public configuracionFabricante = FABRICANTE_TABLA;
  /**
   * Objeto de configuración para la tabla "Otros".
   * Esta propiedad se inicializa con la constante `OTROS_TABLA`,
   * que define la estructura y configuraciones para la tabla.
   */
  public configuracionOtros = OTROS_TABLA;

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<Fabricante>[] = TercerosRelacionadosComponent.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionFacturadorTabla: ConfiguracionColumna<Fabricante>[] = TercerosRelacionadosComponent.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionProveedorTabla: ConfiguracionColumna<Fabricante>[] = TercerosRelacionadosComponent.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionCertificadoAnaliticoTabla: ConfiguracionColumna<Fabricante>[] = TercerosRelacionadosComponent.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionOtrosTabla: ConfiguracionColumna<Otros260303>[] = TercerosRelacionadosComponent.generateConfiguracionTabla(this.configuracionOtros);

  /**
   * Notificador para destruir observables activos.
   */
  private destroyed$ = new Subject<void>();
  

  /**
   * Constructor del componente TercerosRelacionadosComponent.
   *
   * Inicializa el formulario reactivo para la sección de terceros relacionados.
   * Los valores de los inputs `consultaState`, `formularioDeshabilitado` y `idProcedimiento` pueden ser utilizados para controlar el estado y comportamiento del formulario.
   *
   * @param certificadosLicenciasSvc Servicio para manejar operaciones relacionadas con certificados, licencias y permisos.
   * @param modalService Servicio para gestionar cuadros de diálogo modales.
   * @param fb FormBuilder para crear y gestionar formularios reactivos.
   *
   * El formulario se inicializa vacío y se puede configurar dinámicamente según los datos recibidos.
   */
  constructor(
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
    private modalService: BsModalService,
    private fb: FormBuilder
    ) {
      this.tercerosRelacionadosTabla = this.fb.group({});
  }

  /**
   * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * Este método inicializa el componente obteniendo datos para varias tablas, incluyendo:
   * - Fabricante
   * - Facturador
   * - Proveedor
   * - Certificado Analítico
   * - Otros
   *
   * Se invoca cada método correspondiente para recuperar y poblar los datos de las respectivas tablas.
   */


  /**
   * Crea una copia profunda del objeto proporcionado.
   * 
   * Este método serializa el objeto a una cadena JSON y luego lo analiza de nuevo a un nuevo objeto,
   * creando efectivamente una copia profunda. Tenga en cuenta que este enfoque puede no manejar funciones,
   * valores indefinidos o referencias circulares correctamente.
   * 
   * @param obj - El objeto que se va a copiar profundamente. Por defecto es un objeto vacío.
   * @returns Una copia profunda del objeto proporcionado.
   */
  public static deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Recupera los datos para la tabla de fabricantes realizando una llamada al servicio.
   * Se suscribe a la respuesta del método `getFabricanteDatos` del servicio,
   * crea una copia profunda de la respuesta y la asigna a la propiedad `fabricanteTablaDatos`.
   *
   * @returns {void}
   */
  public getFabricanteTablaDatos(): void {
    this.certificadosLicenciasSvc.getFabricanteDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATA = TercerosRelacionadosComponent.deepCopy<Fabricante[]>(response);
      this.fabricanteTablaDatos = DATA;
    });
  }

  /**
   * Recupera los datos para la tabla "Facturador" realizando una llamada al servicio para obtener los datos.
   * La respuesta se copia profundamente para garantizar la inmutabilidad y luego se asigna a la propiedad `facturadorTablaDatos`.
   *
   * @remarks
   * Este método se suscribe al observable devuelto por el método `getFacturadorDatos`
   * del servicio `certificadosLicenciasSvc`. La respuesta se procesa para evitar la mutación
   * directa de los datos originales.
   */
  public getFacturadorTablaDatos(): void {
    this.certificadosLicenciasSvc.getFacturadorDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATA = TercerosRelacionadosComponent.deepCopy<Fabricante[]>(response);
      this.facturadorTablaDatos = DATA;
    });
  }

  /**
   * Recupera los datos de proveedores desde el servicio y los asigna a la propiedad `proveedorTablaDatos`.
   * 
   * Este método llama al método `getProveedorDatos` del servicio `certificadosLicenciasSvc`,
   * se suscribe al observable y realiza una copia profunda de la respuesta antes de asignarla
   * a la propiedad `proveedorTablaDatos`.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  public getProveedorTablaDatos(): void {
    this.certificadosLicenciasSvc.getProveedorDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATA = TercerosRelacionadosComponent.deepCopy<Fabricante[]>(response);
      this.proveedorTablaDatos = DATA;
    });
  }

  /**
   * Recupera los datos del certificado analítico y los asigna a la propiedad `certificadoAnaliticoTablaDatos`.
   * 
   * Este método llama al método `getCertificadoDatos` del servicio para obtener los datos,
   * crea una copia profunda de la respuesta y la almacena en la propiedad `certificadoAnaliticoTablaDatos`.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  public getCertificadoAnaliticoTablaDatos(): void {
    this.certificadosLicenciasSvc.getCertificadoDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATA = TercerosRelacionadosComponent.deepCopy<Fabricante[]>(response);
      this.certificadoAnaliticoTablaDatos = DATA;
    });
  }

  /**
   * Recupera datos adicionales del servicio `certificadosLicenciasSvc` y actualiza la propiedad `otrosTablaDatos`.
   * 
   * Este método se suscribe al observable `getOtrosDatos` del servicio, realiza una copia profunda de la respuesta
   * y asigna los datos copiados a la propiedad `otrosTablaDatos`.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  public getOtrosTablaDatos(): void {
    this.certificadosLicenciasSvc.getOtrosDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATA = TercerosRelacionadosComponent.deepCopy<Otros260303[]>(response);
      this.otrosTablaDatos = DATA;
    });
  }


/**
 * Genera la configuración de columnas para una tabla dinámica.
 * 
 * @template T - El tipo de los datos que se mostrarán en la tabla.
 * @param datosArray - Un arreglo de objetos que contiene el encabezado y la clave de cada columna.
 * @returns Un arreglo de configuraciones de columna para la tabla.
 */
private static generateConfiguracionTabla<T>(
  datosArray: Array<{ encabezado: string; clave: keyof T }>
): ConfiguracionColumna<T>[] {
  return datosArray.map((field, index) => ({
    // Título de la columna que se mostrará en la tabla
    encabezado: field.encabezado,
    // Función que extrae el valor de la clave correspondiente del objeto de datos
    clave: (item: T): AllowedValue => item[field.clave] as AllowedValue,
    // Orden de la columna en la tabla
    orden: index + 1,
  }));
}

  /**
   * Abre un cuadro de diálogo modal para modificar un registro existente.
   *
   * @param titulo - El título que se mostrará en el cuadro de diálogo modal.
   * @param datosExistentes - Los datos existentes para prellenar el formulario.
   * @param tipoTabla - El tipo de tabla para determinar dónde actualizar los datos.
   */
  public abrirModalParaModificar(titulo: string, datosExistentes: Fabricante | Otros260303, tipoTabla: string): void {
    const INITIAL_STATE: ModalOptions = {
      class: 'modal-xl',
      initialState: {
        titulo: titulo,
        datosExistentes: datosExistentes,
        esModificacion: true
      }
    };
    this.bsModalRef = this.modalService.show(FabricanteModalComponent, INITIAL_STATE);

    this.bsModalRef.content.guardarFabricante.subscribe((datosModificados: Record<string, unknown>) => {
      // Forzar limpieza inmediata y con delay para asegurar actualización de UI
      this.forzarLimpiezaSelecciones();
      
      if (tipoTabla === 'otros') {
        const DATO_ACTUALIZADO = TercerosRelacionadosComponent.mapearDatosOtros(datosModificados);
        this.actualizarTablaConDatosModificados(tipoTabla, datosExistentes, DATO_ACTUALIZADO);
      } else {
        const DATO_ACTUALIZADO = TercerosRelacionadosComponent.mapearDatosFabricante(datosModificados);
        this.actualizarTablaConDatosModificados(tipoTabla, datosExistentes, DATO_ACTUALIZADO);
      }
    });
  }

  /**
   * Mapea los datos del formulario al formato esperado por las tablas Fabricante.
   */
  private static mapearDatosFabricante(nuevoDato: Record<string, unknown>): Fabricante {
    return {
      nombre: (nuevoDato as never)['razonSocial'] || (nuevoDato as never)['denominacionSocial'],
      rfc: (nuevoDato as never)['rfc'],
      curp: (nuevoDato as never)['curp'],
      telefono: (nuevoDato as never)['telefono'],
      correoElectronico: (nuevoDato as never)['correoElectronico'],
      calle: (nuevoDato as never)['calle'],
      numeroExterior: (nuevoDato as never)['numeroExterior'],
      numeroInterior: (nuevoDato as never)['numeroInterior'],
      pais: (nuevoDato as never)['pais'],
      colonia: (nuevoDato as never)['colonia'],
      municipio: (nuevoDato as never)['municipio'],
      localidad: (nuevoDato as never)['localidad'],
      entidadFederativa: 'valor ficticio',
      estado: (nuevoDato as never)['estado'],
      cp: (nuevoDato as never)['codigoPostal']
    };
  }

  /**
   * Mapea los datos del formulario al formato esperado por las tablas Otros.
   */
  private static mapearDatosOtros(nuevoDato: Record<string, unknown>): Otros260303 {
    return {
      tercero: (nuevoDato as never)['terceroNombre'],
      nombre: (nuevoDato as never)['razonSocial'] || (nuevoDato as never)['denominacionSocial'],
      rfc: (nuevoDato as never)['rfc'],
      curp: (nuevoDato as never)['curp'],
      telefono: (nuevoDato as never)['telefono'],
      correoElectronico: (nuevoDato as never)['correoElectronico'],
      calle: (nuevoDato as never)['calle'],
      numeroExterior: (nuevoDato as never)['numeroExterior'],
      numeroInterior: (nuevoDato as never)['numeroInterior'],
      pais: (nuevoDato as never)['pais'],
      colonia: (nuevoDato as never)['colonia'],
      municipio: (nuevoDato as never)['municipio'],
      localidad: (nuevoDato as never)['localidad'],
      entidadFederativa: 'valor ficticio',
      estado: (nuevoDato as never)['estado'],
      cp: (nuevoDato as never)['codigoPostal']
    };
  }

  /**
   * Actualiza la tabla correspondiente con los datos modificados.
   */
  private actualizarTablaConDatosModificados(tipoTabla: string, datosOriginales: Fabricante | Otros260303, datosActualizados: Fabricante | Otros260303): void {
    switch (tipoTabla) {
      case 'fabricante': {
        const INDICE_FABRICANTE = this.fabricanteTablaDatos.findIndex(item => item === datosOriginales);
        if (INDICE_FABRICANTE !== -1) {
          this.fabricanteTablaDatos[INDICE_FABRICANTE] = datosActualizados as Fabricante;
        }
        break;
      }
      case 'facturador': {
        const INDICE_FACTURADOR = this.facturadorTablaDatos.findIndex(item => item === datosOriginales);
        if (INDICE_FACTURADOR !== -1) {
          this.facturadorTablaDatos[INDICE_FACTURADOR] = datosActualizados as Fabricante;
        }
        break;
      }
      case 'proveedor': {
        const INDICE_PROVEEDOR = this.proveedorTablaDatos.findIndex(item => item === datosOriginales);
        if (INDICE_PROVEEDOR !== -1) {
          this.proveedorTablaDatos[INDICE_PROVEEDOR] = datosActualizados as Fabricante;
        }
        break;
      }
      case 'certificadoAnalitico': {
        const INDICE_CERTIFICADO = this.certificadoAnaliticoTablaDatos.findIndex(item => item === datosOriginales);
        if (INDICE_CERTIFICADO !== -1) {
          this.certificadoAnaliticoTablaDatos[INDICE_CERTIFICADO] = datosActualizados as Fabricante;
        }
        break;
      }
      case 'otros': {
        const INDICE_OTROS = this.otrosTablaDatos.findIndex(item => item === datosOriginales);
        if (INDICE_OTROS !== -1) {
          this.otrosTablaDatos[INDICE_OTROS] = datosActualizados as Otros260303;
        }
        break;
      }
      default: {
        console.warn(`Tipo de tabla no reconocido: ${tipoTabla}`);
        break;
      }
    }
  }

  /**
   * Limpia todas las selecciones de las tablas.
   */
  private limpiarSelecciones(): void {
    // Limpiar todas las selecciones de filas inmediatamente
    this.selectedFacturadorRows = [];
    this.selectedFabricanteRows = [];
    this.selectedCertificadoAnaliticoRows = [];
    this.selectedOtrosRows = [];
    this.selectedProveedorRows = [];

    // Usar setTimeout para asegurar que las tablas estén inicializadas
    setTimeout(() => {
      // Limpiar selecciones en todos los componentes de tabla
      if (this.tablaComponents) {
        this.tablaComponents.forEach(tabla => {
          if (tabla && typeof tabla.clearSelection === 'function') {
            tabla.clearSelection();
          }
        });
      }
    }, 0);
  }

  /**
   * Método público para limpiar todas las selecciones.
   * Útil para llamadas externas o para forzar la limpieza de selecciones.
   */
  public limpiarTodasLasSelecciones(): void {
    this.limpiarSelecciones();
    
    // Forzar limpieza adicional con más delay para casos problemáticos
    setTimeout(() => {
      this.limpiarSelecciones();
    }, 100);
  }

  /**
   * Fuerza la limpieza de selecciones en las tablas con un retraso mayor.
   * Útil para casos donde la UI necesita más tiempo para actualizar.
   */
  public forzarLimpiezaSelecciones(): void {
    // Limpieza inmediata
    this.limpiarSelecciones();
    
    // Forzar detección de cambios mediante reasignación de datos
    setTimeout(() => {
      this.forzarActualizacionTablas();
    }, 50);
    
    // Limpieza adicional con delay para asegurar que la UI se actualice
    setTimeout(() => {
      if (this.tablaComponents) {
        this.tablaComponents.forEach(tabla => {
          if (tabla && typeof tabla.clearSelection === 'function') {
            tabla.clearSelection();
          }
        });
      }
    }, 200);
  }

  /**
   * Fuerza la actualización de todas las tablas reasignando los datos.
   * Esto provoca que ngOnChanges se ejecute en las tablas, limpiando sus selecciones.
   */
  private forzarActualizacionTablas(): void {
    // Reasignar arrays para forzar detección de cambios
    this.fabricanteTablaDatos = [...this.fabricanteTablaDatos];
    this.facturadorTablaDatos = [...this.facturadorTablaDatos];
    this.proveedorTablaDatos = [...this.proveedorTablaDatos];
    this.certificadoAnaliticoTablaDatos = [...this.certificadoAnaliticoTablaDatos];
    this.otrosTablaDatos = [...this.otrosTablaDatos];
  }

  /**
   * Abre un cuadro de diálogo modal para gestionar un "Fabricante".
   *
   * @param titulo - El título que se mostrará en el cuadro de diálogo modal.
   */
  public abrirFabricanteModal(titulo: string): void {
    const INITIAL_STATE: ModalOptions = {
      class: 'modal-xl',
      initialState: {
        titulo: titulo
      }
    };
    this.bsModalRef = this.modalService.show(FabricanteModalComponent, INITIAL_STATE);

    this.bsModalRef.content.guardarFabricante.subscribe((nuevoDato: Record<string, unknown>) => {
      // Limpiar selecciones después de agregar nuevo registro
      this.limpiarSelecciones();
      
      if (titulo === 'Agregar fabricante') {
        const DATO = TercerosRelacionadosComponent.mapearDatosFabricante(nuevoDato);
        this.fabricanteTablaDatos = [...this.fabricanteTablaDatos, DATO];
      } else if (titulo === 'Agregar facturador') {
        const DATO = TercerosRelacionadosComponent.mapearDatosFabricante(nuevoDato);
        this.facturadorTablaDatos = [...this.facturadorTablaDatos, DATO];
      } else if (titulo === 'Agregar proveedor/distribuidor') {
        const DATO = TercerosRelacionadosComponent.mapearDatosFabricante(nuevoDato);
        this.proveedorTablaDatos = [...this.proveedorTablaDatos, DATO];
      } else if (titulo === 'Agregar certificado analítico') {
        const DATO = TercerosRelacionadosComponent.mapearDatosFabricante(nuevoDato);
        this.certificadoAnaliticoTablaDatos = [...this.certificadoAnaliticoTablaDatos, DATO];
      } else if (titulo === 'Agregar otros') {
        const DATO = TercerosRelacionadosComponent.mapearDatosOtros(nuevoDato);
        this.otrosTablaDatos = [...this.otrosTablaDatos, DATO];
      }
    });
  }

  public selectedFacturadorRows: Fabricante[] = [];
  public selectedFabricanteRows: Fabricante[] = [];
  public selectedCertificadoAnaliticoRows: Fabricante[] = [];
  public selectedOtrosRows: Otros260303[] = [];
  public selectedProveedorRows: Fabricante[] = [];

  onSeleccionChangeFacturador(selected: Fabricante[]): void {
    this.selectedFacturadorRows = selected;
  }
  modificarFacturador(): void {
    if (this.selectedFacturadorRows.length === 1) {
      const FACTURADOR_SELECCIONADO = this.selectedFacturadorRows[0];
      this.abrirModalParaModificar('Modificar facturador', FACTURADOR_SELECCIONADO, 'facturador');
    }
  }
  eliminarFacturador(): void {
    if (this.selectedFacturadorRows.length) {
      // Filtrar los elementos no seleccionados para mantenerlos en la tabla
      this.facturadorTablaDatos = this.facturadorTablaDatos.filter(
        facturador => !this.selectedFacturadorRows.includes(facturador)
      );
      // Limpiar la selección después de eliminar
      this.selectedFacturadorRows = [];
    }
  }

  onSeleccionChangeFabricante(selected: Fabricante[]): void {
    this.selectedFabricanteRows = selected;
  }
  modificarFabricante(): void {
    if (this.selectedFabricanteRows.length === 1) {
      const FABRICANTE_SELECCIONADO = this.selectedFabricanteRows[0];
      this.abrirModalParaModificar('Modificar fabricante', FABRICANTE_SELECCIONADO, 'fabricante');
    }
  }
  eliminarFabricante(): void {
    if (this.selectedFabricanteRows.length) {
      // Filtrar los elementos no seleccionados para mantenerlos en la tabla
      this.fabricanteTablaDatos = this.fabricanteTablaDatos.filter(
        fabricante => !this.selectedFabricanteRows.includes(fabricante)
      );
      // Limpiar la selección después de eliminar
      this.selectedFabricanteRows = [];
    }
  }

  onSeleccionChangeCertificadoAnalitico(selected: Fabricante[]): void {
    this.selectedCertificadoAnaliticoRows = selected;
  }
  modificarCertificadoAnalitico(): void {
    if (this.selectedCertificadoAnaliticoRows.length === 1) {
      const CERTIFICADO_SELECCIONADO = this.selectedCertificadoAnaliticoRows[0];
      this.abrirModalParaModificar('Modificar certificado analítico', CERTIFICADO_SELECCIONADO, 'certificadoAnalitico');
    }
  }
  eliminarCertificadoAnalitico(): void {
    if (this.selectedCertificadoAnaliticoRows.length) {
      // Filtrar los elementos no seleccionados para mantenerlos en la tabla
      this.certificadoAnaliticoTablaDatos = this.certificadoAnaliticoTablaDatos.filter(
        certificado => !this.selectedCertificadoAnaliticoRows.includes(certificado)
      );
      // Limpiar la selección después de eliminar
      this.selectedCertificadoAnaliticoRows = [];
    }
  }

  onSeleccionChangeOtros(selected: Otros260303[]): void {
    this.selectedOtrosRows = selected;
  }
  modificarOtros(): void {
    if (this.selectedOtrosRows.length === 1) {
      const OTROS_SELECCIONADO = this.selectedOtrosRows[0];
      this.abrirModalParaModificar('Modificar otros', OTROS_SELECCIONADO, 'otros');
    }
  }
  eliminarOtros(): void {
    if (this.selectedOtrosRows.length) {
      // Filtrar los elementos no seleccionados para mantenerlos en la tabla
      this.otrosTablaDatos = this.otrosTablaDatos.filter(
        otros => !this.selectedOtrosRows.includes(otros)
      );
      // Limpiar la selección después de eliminar
      this.selectedOtrosRows = [];
    }
  }

  onSeleccionChangeProveedor(selected: Fabricante[]): void {
    this.selectedProveedorRows = selected;
  }
  modificarProveedor(): void {
    if (this.selectedProveedorRows.length === 1) {
      const PROVEEDOR_SELECCIONADO = this.selectedProveedorRows[0];
      this.abrirModalParaModificar('Modificar proveedor/distribuidor', PROVEEDOR_SELECCIONADO, 'proveedor');
    }
  }
  eliminarProveedor(): void {
    if (this.selectedProveedorRows.length) {
      // Filtrar los elementos no seleccionados para mantenerlos en la tabla
      this.proveedorTablaDatos = this.proveedorTablaDatos.filter(
        proveedor => !this.selectedProveedorRows.includes(proveedor)
      );
      // Limpiar la selección después de eliminar
      this.selectedProveedorRows = [];
    }
  }

  /**
   * Indica si el modal está en modo modificación.
  */
  public esModificacion: boolean = false;

  /**
   * Título dinámico del modal, calculado según el idProcedimiento y el modo.
  */ 
  get tituloModal(): string {
    return TercerosRelacionadosComponent.obtenerNombreDelTitulo(this.idProcedimiento, this.esModificacion);
  }

  /**
   * Obtiene el título adecuado según el idProcedimiento y si es modificación.
   * @param idProcedimiento - El identificador del procedimiento
   * @param esModificacion - Si el modal está en modo modificación
   */
  static obtenerNombreDelTitulo(idProcedimiento: number[] | number, esModificacion?: boolean): string {
    const ID = Array.isArray(idProcedimiento) ? idProcedimiento[0] : idProcedimiento;
    if (ID === 260302 || ID === 260304) {
      return esModificacion ? 'Modificar destinatario (destino final)' : 'Agregar destinatario (destino final)';
    }
    return esModificacion ? 'Modificar fabricante' : 'Agregar fabricante';
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
}
