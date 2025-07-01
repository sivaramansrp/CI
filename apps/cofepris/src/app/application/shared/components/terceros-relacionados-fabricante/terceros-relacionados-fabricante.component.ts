import {
  AlertComponent,
  ConfiguracionColumna,
  Fabricante,
  LASTABLA,
  Otros,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FABRICANTE_TABLA,
  OTROS_TABLA,
} from '../../constantes/terceros-relacionados-fabricante.enum';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TercerosRelacionadosFebService } from '../../services/tereceros-relacionados-feb.service';

/**
 * TercerosRelacionadosComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-terceros-relacionados-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './terceros-relacionados-fabricante.component.html',
  styleUrl: './terceros-relacionados-fabricante.component.scss',
})
export class TercerosRelacionadosFabricanteComponent implements OnInit, OnDestroy{
  @Input() programTitle: boolean = false;
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
  public configuracionFabricante = FABRICANTE_TABLA;
  /**
   * Objeto de configuración para la tabla "Otros".
   * Esta propiedad se inicializa con la constante `OTROS_TABLA`,
   * que define la estructura y configuraciones para la tabla.
   */
  public configuracionOtros = OTROS_TABLA;

  /**
   * Una propiedad pública que contiene los datos o la configuración para el componente.
   * Se le asigna el valor de `LASTABLA`, que probablemente sea una constante o variable
   * definida en otra parte de la aplicación.
   */
  public TEXTOS = LASTABLA;
   /**
    * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
    */
      private destroy$ = new Subject<void>();

        /**
   * Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param tercerosService Servicio para obtener los datos de fabricantes y otros relacionados.
   */
  constructor(private tercerosService: TercerosRelacionadosFebService, private consultaioQuery: ConsultaioQuery){
        this.consultaioQuery.selectConsultaioState$
            .pipe(
              takeUntil(this.destroy$),
              map((seccionState)=>{
                this.esFormularioSoloLectura = seccionState.readonly; 
              })
            )
            .subscribe()
  }

  /**
   * @inheritdoc
   * 
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Realiza las siguientes acciones:
   * - Solicita los datos de la tabla de fabricantes a través del servicio `tercerosService`
   *   y los asigna a la variable `fabricanteTablaDatos` al recibir la respuesta.
   * - Solicita los datos de la tabla de otros a través del servicio `tercerosService`
   *   y los asigna a la variable `otrosTablaDatos` al recibir la respuesta.
   * Ambas suscripciones se gestionan utilizando `takeUntil` para evitar fugas de memoria
   * cuando el componente se destruye.
   */
  ngOnInit(): void {
    this.tercerosService.getFabricanteTabla()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Fabricante[]) => {
        this.fabricanteTablaDatos= response;
     });

    this.tercerosService.getOtrosTabla()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Otros[]) => {
        this.otrosTablaDatos=response;
     });
  }

  /**
   * Configuración de la tabla para los fabricantes relacionados.
   *
   * @type {ConfiguracionColumna<Fabricante>[]} Configuración de las columnas de la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<Fabricante>[] =
    this.generateConfiguracionTabla(this.configuracionFabricante);
  /**
   * @public
   * @property {ConfiguracionColumna<Fabricante>[]} configuracionFacturadorTabla
   *
   * Configuración de la tabla para los fabricantes relacionados.
   * Este arreglo se genera dinámicamente utilizando la configuración proporcionada
   * por `configuracionFabricante` a través del método `generateConfiguracionTabla`.
   */
  public configuracionFacturadorTabla: ConfiguracionColumna<Fabricante>[] =
    this.generateConfiguracionTabla(this.configuracionFabricante);
  /**
   * Configuración de la tabla para "Proveedor".
   *
   * Esta configuración se genera dinámicamente utilizando la configuración `configuracionFabricante`
   * a través del método `generateConfiguracionTabla`.
   */
  public configuracionProveedorTabla: ConfiguracionColumna<Fabricante>[] =
    this.generateConfiguracionTabla(this.configuracionFabricante);
  /**
   * Configuración de la tabla para el certificado analítico relacionado con los fabricantes.
   *
   * Esta propiedad utiliza la configuración proporcionada por `configuracionFabricante`
   * para generar las columnas necesarias en la tabla.
   *
   * @type {ConfiguracionColumna<Fabricante>[]} - Arreglo de configuraciones de columnas para la tabla.
   */
  public configuracionCertificadoAnaliticoTabla: ConfiguracionColumna<Fabricante>[] =
    this.generateConfiguracionTabla(this.configuracionFabricante);
  /**
   * Configuración de la tabla para los datos de "Otros".
   *
   * @type {ConfiguracionColumna<Otros>[]} Configuración de las columnas de la tabla.
   */
  public configuracionOtrosTabla: ConfiguracionColumna<Otros>[] =
    this.generateConfiguracionTabla(this.configuracionOtros);
    
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, class-methods-use-this
  generateConfiguracionTabla(datosArray: any): ConfiguracionColumna<any>[] {
    const FIELDS: Array<{ encabezado: string; clave: keyof Fabricante }> =
      datosArray;
    return FIELDS.map((field, index) => ({
      encabezado: field.encabezado,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clave: (item: any) => item[field.clave],
      orden: index + 1,
    }));
  }

    /**
   * Ciclo de vida `OnDestroy`.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
