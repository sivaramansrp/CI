import {
  AlertComponent,
  ConfiguracionColumna,
  Fabricante,
  LASTABLA,
  Otros,
  TablaSeleccion
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from "@ng-mf/data-access-user";
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261103.store';
import { FABRICANTE_TABLA } from '../../../../shared/constantes/terceros-relacionados-fabricante.enum';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service';
import { OTROS_TABLA } from '../../../../shared/constantes/terceros-relacionados-fabricante.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';



/**
 * TercerosRelacionadosComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-terceros-relacionados-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './terceros-relacionados-fabricante.component.html',
  styleUrl: './terceros-relacionados-fabricante.component.scss',
})
export class TercerosRelacionadosFabricanteComponent implements OnInit, OnDestroy{
  /**
  * Estado seleccionado del trámite 261103
  * Contiene los datos actuales del trámite seleccionados desde el store.
  */ 
  estadoSeleccionado!: DatosProcedureState;

  /**
   * Notificador para destruir observables activos.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Un arreglo que contiene los datos de los fabricantes (Fabricante).
   * Esto se utiliza para gestionar y mostrar información relacionada con los fabricantes
   * en el contexto de la aplicación.
   */
   
  public fabricanteTablaDatos: Fabricante[] = [];

  /**
   * Representa el tipo de selección de casilla de verificación utilizado en la tabla.
   * Esto se asigna desde la enumeración `TablaSeleccion.CHECKBOX`.
   */
  public checkbox = TablaSeleccion.CHECKBOX;
  /**
   * Un arreglo de objetos `Fabricante` que representa los datos para la tabla "facturador".
   * Esta propiedad se utiliza para almacenar y gestionar la lista de fabricantes o entidades relacionadas
   * que se muestran en la tabla dentro del componente.
   */
  public facturadorTablaDatos: Fabricante[] = [];

  /**
   * Representa una colección de objetos "Otros" utilizada para almacenar datos para el componente.
   * Este arreglo se inicializa como vacío y puede ser llenado con instancias del tipo `Otros`.
   */
  public otrosTablaDatos: Otros[] = [];

  /**
   * Objeto de configuración para la tabla "Fabricante".
   * Esto se utiliza para definir las configuraciones y propiedades de la tabla
   * en el componente "Terceros Relacionados".
   */
  public configuracionFabricante: Array<{ encabezado: string; clave: keyof Fabricante }> = FABRICANTE_TABLA as Array<{ encabezado: string; clave: keyof Fabricante }>;
  /**
   * Objeto de configuración para la tabla "Otros".
   * Esta propiedad se inicializa con la constante `OTROS_TABLA`,
   * que define la estructura y configuraciones para la tabla.
   */
  public configuracionOtros: Array<{ encabezado: string; clave: keyof Fabricante }> = OTROS_TABLA as Array<{ encabezado: string; clave: keyof Fabricante }>;

  /**
   * Una propiedad pública que contiene los datos o la configuración para el componente.
   * Se le asigna el valor de `LASTABLA`, que probablemente sea una constante o variable
   * definida en otra parte de la aplicación.
   */
  public TEXTOS = LASTABLA;

  /**
   * Configuración de la tabla para los fabricantes relacionados.
   *
   * @type {ConfiguracionColumna<Fabricante>[]} Configuración de las columnas de la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<Fabricante>[] =
    TercerosRelacionadosFabricanteComponent.generateConfiguracionTabla(this.configuracionFabricante);
  /**
   * @public
   * @property {ConfiguracionColumna<Fabricante>[]} configuracionFacturadorTabla
   *
   * Configuración de la tabla para los fabricantes relacionados.
   * Este arreglo se genera dinámicamente utilizando la configuración proporcionada
   * por `configuracionFabricante` a través del método `generateConfiguracionTabla`.
   */
  public configuracionFacturadorTabla: ConfiguracionColumna<Fabricante>[] =
    TercerosRelacionadosFabricanteComponent.generateConfiguracionTabla(this.configuracionFabricante);
  /**
   * Configuración de la tabla para "Proveedor".
   *
   * Esta configuración se genera dinámicamente utilizando la configuración `configuracionFabricante`
   * a través del método `generateConfiguracionTabla`.
   */
  public configuracionProveedorTabla: ConfiguracionColumna<Fabricante>[] =
    TercerosRelacionadosFabricanteComponent.generateConfiguracionTabla(this.configuracionFabricante);
  /**
   * Configuración de la tabla para el certificado analítico relacionado con los fabricantes.
   *
   * Esta propiedad utiliza la configuración proporcionada por `configuracionFabricante`
   * para generar las columnas necesarias en la tabla.
   *
   * @type {ConfiguracionColumna<Fabricante>[]} - Arreglo de configuraciones de columnas para la tabla.
   */
  public configuracionCertificadoAnaliticoTabla: ConfiguracionColumna<Fabricante>[] =
    TercerosRelacionadosFabricanteComponent.generateConfiguracionTabla(this.configuracionFabricante);
  /**
   * Configuración de la tabla para los datos de "Otros".
   *
   * @type {ConfiguracionColumna<Otros>[]} Configuración de las columnas de la tabla.
   */
  public configuracionOtrosTabla: ConfiguracionColumna<Otros>[] =
    TercerosRelacionadosFabricanteComponent.generateConfiguracionTabla(this.configuracionOtros);

  listaFilaFabricante: Fabricante[] = [];
  listaFilaFacturador: Fabricante[] = [];
  listaFilaProveedor: Fabricante[] = [];
  listaFilaCertificado: Fabricante[] = [];
  listaFilaOtros: Otros[] = [];

    constructor(
      private datosProcedureQuery : DatosProcedureQuery,
      private consultaioQuery: ConsultaioQuery,
      private servicio: ModificacionPermisoImportacionMedicamentosService
    ) {
      this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
    }

    /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene datos de catálogos.
   */
  ngOnInit(): void {
    this.datosProcedureQuery.selectSeccionState$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((estado: DatosProcedureState) => {
      this.estadoSeleccionado = estado;
    });
    this.obtenerTablaDatos();
    this.obtenerOtrosTablaDatos();
  }


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
  static generateConfiguracionTabla<T>(datosArray: Array<{ encabezado: string; clave: keyof T }>): ConfiguracionColumna<T>[] {
    const FIELDS: Array<{ encabezado: string; clave: keyof T }> =
      datosArray;
    return FIELDS.map((field, index) => ({
      encabezado: field.encabezado,
      clave: (item: T) => item[field.clave] as string | number | boolean | undefined,
      orden: index + 1,
    }));
  }


  /**
   * Obtiene los datos de la tabla de fabricantes y los asigna a las propiedades correspondientes.
   * 
   * Llama al servicio para recuperar los datos de la tabla de fabricantes (`Fabricante[]`) y los asigna tanto a 
   * `fabricanteTablaDatos` como a `facturadorTablaDatos`. El observable se gestiona para cancelar la suscripción 
   * cuando el componente se destruye, evitando fugas de memoria.
   */
  public obtenerTablaDatos():void {
    this.servicio.getTablaDatos().pipe(
      takeUntil(this.destroyed$),
    ).subscribe((datos: Fabricante[]) => {
      this.fabricanteTablaDatos = datos;
      this.facturadorTablaDatos = datos;
    });
  }

  /**
   * Obtiene los datos de la tabla de otros y los asigna a la propiedad correspondiente.
   *
   * Llama al servicio para recuperar los datos de la tabla de otros (`Otros[]`) y los asigna a
   * `otrosTablaDatos`. El observable se gestiona para cancelar la suscripción
   * cuando el componente se destruye, evitando fugas de memoria.
   */

  public obtenerOtrosTablaDatos():void {
    this.servicio.getOtrosTablaDatos().pipe(
      takeUntil(this.destroyed$),
    ).subscribe((datos: Otros[]) => {
      this.otrosTablaDatos = datos;
    });
  }

  /**
   * Maneja la actualización de filas para diferentes tipos de listas de terceros relacionados.
   * 
   * @param fila - Array de objetos Fabricante o Otros que representan las filas seleccionadas.
   * @param tipoLista - El tipo de lista a actualizar ('fabricante', 'facturador', 'proveedor', 'certificado', 'otros').
   */
  manejarFila(fila: Fabricante[] | Otros[], tipoLista: 'fabricante' | 'facturador' | 'proveedor' | 'certificado' | 'otros'): void {
    switch (tipoLista) {
      case 'fabricante':
        this.listaFilaFabricante = fila as Fabricante[];
        break;
      case 'facturador':
        this.listaFilaFacturador = fila as Fabricante[];
        break;
      case 'proveedor':
        this.listaFilaProveedor = fila as Fabricante[];
        break;
      case 'certificado':
        this.listaFilaCertificado = fila as Fabricante[];
        break;
      case 'otros':
        this.listaFilaOtros = fila as Otros[];
        break;
      default:
        // Opcionalmente maneja valores inesperados
        break;
    }
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
