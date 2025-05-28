
import { AlertComponent, ConfiguracionColumna, Fabricante, LASTABLA, Otros, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FABRICANTE_TABLA, OTROS_TABLA } from '../../services/certificados-licencias-permisos.enum';
import { Subject, takeUntil } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { CommonModule } from '@angular/common';
import { FabricanteModalComponent } from '../fabricante-modal/fabricante-modal.component';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';

/**
 * TercerosRelacionadosComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, TablaDinamicaComponent],
  providers:[BsModalService],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit,OnDestroy {

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
  public otrosTablaDatos: Otros[] = [];
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
  public configuracionTabla: ConfiguracionColumna<Fabricante>[] = this.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionFacturadorTabla: ConfiguracionColumna<Fabricante>[] = this.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionProveedorTabla: ConfiguracionColumna<Fabricante>[] = this.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionCertificadoAnaliticoTabla: ConfiguracionColumna<Fabricante>[] = this.generateConfiguracionTabla(this.configuracionFabricante);
  public configuracionOtrosTabla: ConfiguracionColumna<Otros>[] = this.generateConfiguracionTabla(this.configuracionOtros);

  /**
   * Notificador para destruir observables activos.
   */
  private destroyed$ = new Subject<void>();
  

  /**
   * Constructor del componente TercerosRelacionadosComponent.
   * 
   * @param certificadosLicenciasSvc - Servicio para manejar operaciones relacionadas con certificados, licencias y permisos.
   * @param modalService - Servicio para gestionar cuadros de diálogo modales.
   */
  constructor(
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
    private modalService: BsModalService
    ) {
      //
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
  ngOnInit(): void {
    this.getFabricanteTablaDatos();
    this.getFacturadorTablaDatos();
    this.getProveedorTablaDatos();
    this.getCertificadoAnaliticoTablaDatos();
    this.getOtrosTablaDatos();
  }

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
    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/explicit-function-return-type
    public deepCopy(obj = {}) {
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
      const DATA = this.deepCopy(response);
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
      const DATA = this.deepCopy(response);
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
      const DATA = this.deepCopy(response);
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
      const DATA = this.deepCopy(response);
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
      const DATA = this.deepCopy(response);
      this.otrosTablaDatos = DATA;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /**
   * Genera un arreglo de configuración para una tabla basado en el arreglo de datos proporcionado.
   *
   * @template T - El tipo de los objetos en la tabla.
   * @param datosArray - Un arreglo de objetos que contiene la configuración de las columnas de la tabla.
   * Cada objeto debe tener las siguientes propiedades:
   *   - `encabezado`: El texto del encabezado para la columna.
   *   - `clave`: La clave de la propiedad en el objeto de datos que se mostrará en la columna.
   * @returns Un arreglo de configuraciones de columnas, donde cada configuración incluye:
   *   - `encabezado`: El texto del encabezado para la columna.
   *   - `clave`: Una función que obtiene el valor de la clave especificada de un objeto de datos.
   *   - `orden`: El orden de la columna, comenzando desde 1.
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  private generateConfiguracionTabla(datosArray: any): ConfiguracionColumna<any>[] {
    const FIELDS: Array<{ encabezado: string, clave: keyof Fabricante }> = datosArray;
    return FIELDS.map((field, index) => ({
      encabezado: field.encabezado,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clave: (item: any) => item[field.clave],
      orden: index + 1
    }));
  }

  /**
   * Abre un cuadro de diálogo modal para gestionar un "Fabricante".
   *
   * @param titulo - El título que se mostrará en el cuadro de diálogo modal.
   */
  public abrirFabricanteModal(titulo: string): void {
    const INITIAL_STATE: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        titulo: titulo
      }
    };
    this.bsModalRef = this.modalService.show(FabricanteModalComponent, INITIAL_STATE);
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
