import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMPORTANTE } from '../../constantes/fitosanitario.enum';
import { Catalogo, ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MercanciaForm } from '../../models/fitosanitario.model';
import { Subject, takeUntil } from 'rxjs';
import { DatosMercanciaService } from '../../services/datos-mercancia/datos-mercancia.service';

@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {
  /**
    * @description Tipo de selección para la tabla de solicitudes.
    * @type {TablaSeleccion}
    */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description Configuración de columnas para la tabla principal.
   * @type {ConfiguracionColumna<Fila>[]}
   */
  configuracionColumnasoli: ConfiguracionColumna<MercanciaForm>[] = [
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 1 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccionArancelaria, orden: 2 },
    { encabezado: 'Descripción de la mercancía', clave: (fila) => fila.descripcion, orden: 3 }, // Usando "descripcion" aquí
    { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (fila) => fila.umt, orden: 4 }, // Usando "umt" aquí
    { encabezado: 'Cantidad UMT', clave: (fila) => fila.cantidadUMT, orden: 5 },
    { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (fila) => fila.umc, orden: 6 }, // Usando "umc" aquí
    { encabezado: 'Cantidad UMC', clave: (fila) => fila.cantidadUMC, orden: 7 },
    { encabezado: 'Nombre común', clave: (fila) => fila.nombreComun, orden: 8 }, // Usando "nombreComun" aquí
    { encabezado: 'Nombre científico', clave: (fila) => fila.nombreCientifico, orden: 9 },
    { encabezado: 'Uso', clave: (fila) => fila.uso, orden: 10 },
    { encabezado: 'País de origen', clave: (fila) => fila.paisOrigen, orden: 11 },
    { encabezado: 'País de procedencia', clave: (fila) => fila.paisProcedencia, orden: 12 },
    { encabezado: 'Tipo de producto', clave: (fila) => fila.tipoProducto, orden: 13 },
  ];

  IMPORTANTES: string = IMPORTANTE.Importante;

  cuerpoTabla: MercanciaForm[] = [];

  formMercancia!: FormGroup;

  estadoChecker: boolean = true;

  private destroyNotifier$ = new Subject<void>();
  /**
    * Configuración para el select de aduana de ingreso. --220102
    * @property {Catalogo} nombreComunCatalogo
    */
  nombreComunCatalogo: Catalogo[] = [];
  /**
    * Configuración para el select de aduana de ingreso. --220102
    * @property {Catalogo} nombreCientificoCatalog
    */
  nombreCientificoCatalog: Catalogo[] = [];
  /**
  * Configuración para el select de aduana de ingreso. --220102
  * @property {Catalogo} nombreCientificoCatalog
  */
  usoCatalog: Catalogo[] = [];
  /**
* Configuración para el select de aduana de ingreso. --220102
* @property {Catalogo} paisOrigenCatalog
*/
  paisOrigenCatalog: Catalogo[] = [];
  /**
* Configuración para el select de aduana de ingreso. --220102
* @property {Catalogo} paisProcedenciaCatalog
*/
  paisProcedenciaCatalog: Catalogo[] = [];
  /**
* Configuración para el select de aduana de ingreso. --220102
* @property {Catalogo} tipoProductoCatalog
*/
  tipoProductoCatalog: Catalogo[] = [];
  /**
* Configuración para el select de aduana de ingreso. --220102
* @property {Catalogo} tipoProductoCatalog
*/
  umcCatalog: Catalogo[] = [];

  constructor(private readonly fb: FormBuilder, private readonly datosMercanciaService: DatosMercanciaService) {
    this.getnombreComun();
    this.getnombreCientifico();
    this.getUso();
    this.getpaisProcedencia();
    this.gettipoProducto();
    this.getpaisOrigen();
    this.getUmc();
  }
  ngOnInit(): void {

    this.formMercancia?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((changes) => {
      if (this.formMercancia.valid) {
        this.cuerpoTabla.push(this.formMercancia.value as MercanciaForm);

        this.estadoChecker = false;
        console.log(this.cuerpoTabla)
      }
    })
  }
  crearDesdeDatos() {
    this.formMercancia = this.fb.group({
      nombreComun: ['', Validators.required],
      nombreCientifico: ['', Validators.required],
      uso: ['', Validators.required],
      paisOrigen: ['', Validators.required],
      paisProcedencia: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccionArancelaria: ['', Validators.required],
      cantidadUMT: [''],
      umt: [''],
      cantidadUMC: ['', Validators.required],
      umc: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }
  /**
   * @description Obtiene la lista de aduanas desde un archivo JSON.
   * @method getnombreComun
   * @returns {void}
   */
  getnombreComun() {
    this.datosMercanciaService.obtenerSelectorList('nombrecomun.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.nombreComunCatalogo = data;
    })
  }
  /**
 * @description Obtiene la lista de aduanas desde un archivo JSON.
 * @method getnombreComun
 * @returns {void}
 */
  getnombreCientifico() {
    this.datosMercanciaService.obtenerSelectorList('nombrecientifico.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.nombreCientificoCatalog = data;
    })
  }
  /**
* @description Obtiene la lista de aduanas desde un archivo JSON.
* @method getnombreComun
* @returns {void}
*/
  getUso() {
    this.datosMercanciaService.obtenerSelectorList('uso.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.usoCatalog = data;
    })
  }
  /**
* @description Obtiene la lista de aduanas desde un archivo JSON.
* @method getnombreComun
* @returns {void}
*/
  getpaisOrigen() {
    this.datosMercanciaService.obtenerSelectorList('paisorigen.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.paisOrigenCatalog = data;
    })
  }
  /**
* @description Obtiene la lista de aduanas desde un archivo JSON.
* @method getnombreComun
* @returns {void}
*/
  getpaisProcedencia() {
    this.datosMercanciaService.obtenerSelectorList('paisprocedencia.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.paisProcedenciaCatalog = data;
    })
  }
  /**
* @description Obtiene la lista de aduanas desde un archivo JSON.
* @method gettipoProducto
* @returns {void}
*/
  gettipoProducto() {
    this.datosMercanciaService.obtenerSelectorList('tipoproducto.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.tipoProductoCatalog = data;
    })
  }

  /**
* @description Obtiene la lista de aduanas desde un archivo JSON.
* @method gettipoProducto
* @returns {void}
*/
  getUmc() {
    this.datosMercanciaService.obtenerSelectorList('umc.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.umcCatalog = data;
    })
  }
  openDatosPara() {
    this.crearDesdeDatos();
    this.estadoChecker = !this.estadoChecker;
  }

  setValoresStore(
    campo?: string
  ): void {
    if (campo === 'fraccionArancelaria') {
      this.formMercancia.patchValue({
        descripcionFraccionArancelaria: 'CR-123456',
        umt: 'Dependencia-34',
      });
    }

  }
  /**
 * @description Limpia las suscripciones activas cuando el componente es destruido.
 * Este método se llama automáticamente cuando el componente es destruido para evitar fugas de memoria.
 * @method ngOnDestroy
 * @returns {void}
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
