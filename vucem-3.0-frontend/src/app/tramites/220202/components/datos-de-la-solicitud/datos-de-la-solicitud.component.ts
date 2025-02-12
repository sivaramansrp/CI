import { Component, OnInit } from '@angular/core';

import { Datos_De_Tabla, Datos_de_fila } from '../../../../core/models/220202/fitosanitario.model';

import { INSTRUCCION_DOBLE_CLIC } from '../../../../shared/constantes/220202/fitosanitario.enums';

import { HttpClient } from '@angular/common/http';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Catalogo, RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';



/**
 * @Componente DatosDeLaSolicitudComponent
 * @description Componente para la sección de datos de la solicitud en el formulario de fitosanitarios.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit {
  /**
     * @description Indica si el panel de detalle está colapsado o no.
     * @type {boolean}
     */
  colapsable: boolean = false;

  /**
   * @description Datos para las columnas de la tabla.
   * Cada elemento del array representa una columna y contiene la información
   * para mostrar en la cabecera y las celdas de la tabla.
   * @type {any[]}
   */
  mesaColumnas: any[] = [{
    tbodyData: ['Establecimiento 1', '123-456-7890', 'correo', 'Actividad 1', 'Otro detalle', 'Certificado 001', 'Domicilio 1'],
  }];

  /**
   * @description Rango de días seleccionados.
   * Este array contiene las fechas seleccionadas por el usuario
   * para filtrar la información mostrada en la tabla.
   * @type {string[]}
   */
  selectRangoDias: string[] = [];

  /**
   * @description Instrucción para el doble clic.
   * Este string contiene el mensaje que se muestra al usuario
   * indicando que debe hacer doble clic en una celda para ver más detalles.
   * @type {string}
   */
  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;

  /**
   * @description Datos para el cuerpo de la tabla.
   * Este array contiene la información que se muestra en las celdas de la tabla,
   * excluyendo la cabecera.
   * @type {any[]}
   */
  mesaCuerpo: any[] = [];

  /**
   * @description Datos de las filas de la tabla.
   * Este array de objetos contiene la información de cada fila de la tabla.
   * Cada objeto representa una fila y contiene las propiedades necesarias
   * para mostrar los datos en las celdas.
   * @type {Datos_de_fila[]}
   */
  tablaDeDatosDeCelda: Datos_de_fila[] = [];

  /**
   * @description Formulario para los datos del trámite.
   * Este `FormGroup` contiene los controles para los campos del formulario
   * relacionados con los datos del trámite.
   * @type {FormGroup}
   */
  procedureData: FormGroup;

  /**
   * @description Lista de aduanas.
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de aduanas en el formulario.
   * @type {Catalogo[]}
   */
  aduanaList: Catalogo[];

  /**
   * @description Lista de establecimientos agropecuarios.
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de establecimientos agropecuarios en el formulario.
   * @type {Catalogo[]}
   */
  agropecuariaList: Catalogo[];

  /**
   * @description Lista de puntos de verificación.
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de puntos de verificación en el formulario.
   * @type {Catalogo[]}
   */
  puntoList: Catalogo[];

  /**
   * @description Lista de regímenes.
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de regímenes en el formulario.
   * @type {Catalogo[]}
   */
  regimeList: Catalogo[];

  /**
   * @description Lista de productos.
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de productos en el formulario.
   * @type {Catalogo[]}
   */
  productoList: Catalogo[];

  /**
   * @description Lista de usos.
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de usos en el formulario.
   * @type {Catalogo[]}
   */
  usoList: Catalogo[];

  /**
   * @description Lista de unidades de medida de cantidad (UMC).
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de UMC en el formulario.
   * @type {Catalogo[]}
   */
  umcList: Catalogo[];

  /**
   * @description Lista de NICO (Número de Identificación Comercial).
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de NICO en el formulario.
   * @type {Catalogo[]}
   */
  nicoList: Catalogo[];

  /**
   * @description Lista de fracciones arancelarias.
   * Este array contiene los objetos `Catalogo` que se utilizan
   * para poblar el selector de fracciones arancelarias en el formulario.
   * @type {Catalogo[]}
   */
  arancelariaList: Catalogo[];

  /**
   * @description Formulario principal.
   * Este `FormGroup` contiene todos los controles del formulario.
   * @type {FormGroup}
   */
  forma: FormGroup;

  /**
   * @description Formulario para las mercancías.
   * Este `FormGroup` se utiliza para gestionar los controles
   * relacionados con la información de las mercancías.
   * @type {FormGroup}
   */
  mercanciaForma: FormGroup;

  /**
   * @description Formulario para el transporte.
   * Este `FormGroup` contiene los controles para los campos del formulario
   * relacionados con la información de transporte.
   * @type {FormGroup}
   */
  formularioDeTransporte: FormGroup;
  /**
    * @constructor
    * @param {HttpClient} httpServicios - Servicio HttpClient para realizar peticiones HTTP.
    * @param {FormBuilder} fb - Servicio FormBuilder para crear y gestionar formularios reactivos.
    */
  constructor(private readonly httpServicios: HttpClient,
    private readonly fb: FormBuilder
  ) {
    this.mesaColumnasData();
  }
  /**
 * @description Inicializa el componente.
 * Este método se llama automáticamente después de que se crea el componente.
 * Llama a otros métodos para obtener los datos iniciales que se mostrarán en el formulario y la tabla.
 * @method ngOnInit
 * @returns {void}
 */
  ngOnInit(): void {
    this.obtenerTodosLosDatosDeLaLista();
    this.obtenerTablaCelulaValor();
  }
  /**
   * @description Crea los campos del formulario y los agrupa en un `FormGroup`.
   * Inicializa el formulario principal (`forma`) con los controles para los datos de la solicitud,
   * incluyendo un `FormArray` para las mercancías.
   * @method createFromFields
   * @returns {void}
   */
  createFromFields() {
    this.forma = this.fb.group({
      aduana: [''],
      agropecuaria: [''],
      punto: [''],
      guia: [''],
      regimen: [''],
      ferrocarril: [''],
      mercancias: this.fb.array([]),
      aduanaMercancia: [''],
      requisito: [''],
      numCertificadoInternacional: [''],
      arancelaria: [''],
      descFraccionArancelaria: [{ value: '', disabled: true }],
      nico: [''],
      descNico: [{ value: '', disabled: true }],
      descripcion: [''],
      cantidadUMT: [''],
      umt: [{ value: '', disabled: true }],
      cantidadUMC: [''],
      umc: [''],
      uso: [''],
      producto: [''],
    });
    const mercanciasArray = this.forma.get('mercancias') as FormArray;
    mercanciasArray.push(this.fb.group({
      seleccionado: [''], // Checkbox
      noPartida: [''],
      tipoRequisito: [''],
      requisito: [''],
      numCertificadoInternacional: [''],
      fraccionArancelaria: [''],
      descFraccion: [''],
      nico: ['']
    }));
  }
  /**
   * @description Obtiene todos los datos para las listas de opciones (selects) del formulario.
   * Este método llama a las funciones individuales para obtener los datos de cada lista:
   * aduana, agropecuaria, punto, régimen, arancelaria, NICO, producto, unidad de medida de cantidad (UMC) y uso.
   * @method obtenerTodosLosDatosDeLaLista
   * @returns {void}
   */
  obtenerTodosLosDatosDeLaLista() {
    this.getaduanaLista();
    this.getagropecuariaLista();
    this.getPuntoLista();
    this.getRegimenLista();
    this.getAduanaLista();
    this.getArancelariaLista();
    this.getNicoLista();
    this.getAduanaLista();
    this.getNicoLista();
    this.getProductoLista();
    this.getUmCLista();
    this.getusoLista();
  }
  /**
 * @description Obtiene la lista de table desde un archivo JSON.
 * @method obtenerTablaCelulaValor
 */
  obtenerTablaCelulaValor() {
    this.httpServicios.get<Datos_De_Tabla>('../../../../../assets/json/220202/solicitud.json').subscribe((data) => {
      this.tablaDeDatosDeCelda = data?.data;
    });
  }
  /**
* @description Obtiene la lista de table desde un archivo JSON.
* @method mesaColumnasData
*/

  mesaColumnasData() {
    this.httpServicios.get<any>('../../../../../assets/json/220202/contenidodetabla.json').subscribe((data) => {
      let val = data.data;
      this.mesaColumnas = val[0].header;
    });
  }
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
  /**
* @description Obtiene la lista de aduanlist desde un archivo JSON.
* @method getaduanaLista
*/
  getaduanaLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/aduana_de_ingreso.json').subscribe((data): void => {
      const datos = data?.data;
      this.aduanaList = datos as Catalogo[];
    });
  }
  /**
* @description Obtiene la lista de agropecuaria desde un archivo JSON.
* @method getagropecuariaLista
*/
  getagropecuariaLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/aduana_de_ingreso.json').subscribe((data): void => {
      const datos = data?.data;
      this.agropecuariaList = datos as Catalogo[];
    });
  }
  /**
* @description Obtiene la lista de Punto desde un archivo JSON.
* @method getPuntoLista
*/
  getPuntoLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/punto.json').subscribe((data): void => {
      const datos = data?.data;
      this.puntoList = datos as Catalogo[];
    });
  }
  /**
* @description Obtiene la lista de Regimen desde un archivo JSON.
* @method getRegimenLista
*/
  getRegimenLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/regimen.json').subscribe((data): void => {
      const datos = data?.data;
      this.regimeList = datos as Catalogo[];
    });
  }
  /**
* @description Obtiene la lista de Aduana desde un archivo JSON.
* @method getAduanaLista
*/
  getAduanaLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/aduana_de_ingreso.json').subscribe((data): void => {
      const datos = data?.data;
      this.aduanaList['catalogos'] = datos as Catalogo[];
    });
  }
  /**
* @description Obtiene la lista de Arancelaria desde un archivo JSON.
* @method getArancelariaLista
*/
  getArancelariaLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.arancelariaList = datos as Catalogo[];
    });
  }
  /**
* @description Obtiene la lista de NICo desde un archivo JSON.
* @method getNicoLista
*/

  getNicoLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.nicoList = datos as Catalogo[];
    });
  }
  /**
* @description Obtiene la lista de Umc desde un archivo JSON.
* @method getUmCLista
*/
  getUmCLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.umcList = datos as Catalogo[];
    });
  }
  /**
 * @description Obtiene la lista de uso desde un archivo JSON.
 * @method getusoLista
 */
  getusoLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.usoList = datos as Catalogo[];
    });
  }
  /**
   * @description Obtiene la lista de productos desde un archivo JSON.
   * @method getProductoLista
   */
  getProductoLista() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/nombre.json').subscribe((data): void => {
      const datos = data?.data;
      this.productoList = datos as Catalogo[];
    });
  }
}
