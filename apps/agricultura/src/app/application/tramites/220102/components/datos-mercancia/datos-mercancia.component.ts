import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {Subject, map , takeUntil } from 'rxjs';

import { AGREGAR, EDITAR, IMPORTANTE } from '../../constantes/fitosanitario.enum';
import { AlertComponent, Catalogo,CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';

import { MercanciaForm } from '../../models/fitosanitario.model';

import { CommonModule } from '@angular/common';
import { DatosMercanciaService } from '../../services/datos-mercancia/datos-mercancia.service';

import {ConsultaioQuery} from '@ng-mf/data-access-user'

/**
 * @component
 * @selector app-datos-mercancia
 * @templateUrl ./datos-mercancia.component.html
 * @styleUrl ./datos-mercancia.component.css
 * @class DatosMercanciaComponent
 * @implements OnInit
 * @implements OnDestroy
 * @description Componente para la gestión de los datos de la mercancía fitosanitaria.
 */
@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
  standalone:true,
  imports:[ReactiveFormsModule, FormsModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent, AlertComponent,CommonModule]
})
export class DatosMercanciaComponent implements OnInit, OnDestroy,AfterViewInit {
  /**
    * @property {TablaSeleccion} tipoSeleccionarParaTabla
    * @description Tipo de selección para la tabla de solicitudes.
    */
  tipoSeleccionarParaTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @property {ConfiguracionColumna<MercanciaForm>[]} configuracionParaEncabezadoDeTabla
   * @description Configuración de columnas para la tabla principal de mercancías.
   */
  configuracionParaEncabezadoDeTabla: ConfiguracionColumna<MercanciaForm>[] = [
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 1 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccionArancelaria, orden: 2 },
    { encabezado: 'Descripción de la mercancía', clave: (fila) => fila.descripcion, orden: 3 },
    { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (fila) => fila.umt, orden: 4 },
    { encabezado: 'Cantidad UMT', clave: (fila) => fila.cantidadUMT, orden: 5 },
    { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (fila) => fila.umc, orden: 6 },
    { encabezado: 'Cantidad UMC', clave: (fila) => fila.cantidadUMC, orden: 7 },
    { encabezado: 'Nombre común', clave: (fila) => fila.nombreComun, orden: 8 },
    { encabezado: 'Nombre científico', clave: (fila) => fila.nombreCientifico, orden: 9 },
    { encabezado: 'Uso', clave: (fila) => fila.uso, orden: 10 },
    { encabezado: 'País de origen', clave: (fila) => fila.paisOrigen, orden: 11 },
    { encabezado: 'País de procedencia', clave: (fila) => fila.paisProcedencia, orden: 12 },
    { encabezado: 'Tipo de producto', clave: (fila) => fila.tipoProducto, orden: 13 },
  ];

  /**
   * @property {string} importante
   * @description Constante que representa la etiqueta de "Importante".
   */
  importante: string = IMPORTANTE.Importante;

  /**
   * @property {MercanciaForm[]} cuerpoTabla
   * @description Arreglo que contiene los datos de la mercancía para la tabla.
   */
  cuerpoTabla: MercanciaForm[] = [
  ];

  /**
   * @property {FormGroup} formMercancia
   * @description Formulario reactivo para la captura de datos de la mercancía.
   */
  formMercancia!: FormGroup;

  /**
   * @property {boolean} estadoChecker
   * @description Variable para controlar el estado de visibilidad de un elemento (ej. un formulario).
   */
  estadoChecker: boolean = false;

  /**
   * @private
   * @property {Subject<void>} destroyNotifier$
   * @description Subject para notificar la destrucción del componente y desuscribir observables.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @property {Catalogo[]} catalogoNombreComun
   * @description Catálogo para el select de nombre común.
   */
  catalogoNombreComun: Catalogo[] = [];

  /**
   * @property {Catalogo[]} catalogoNombreCientifico
   * @description Catálogo para el select de nombre científico.
   */
  catalogoNombreCientifico: Catalogo[] = [];

  /**
  * @property {Catalogo[]} catalogoUso
  * @description Catálogo para el select de uso.
  */
  catalogoUso: Catalogo[] = [];

  /**
  * @property {Catalogo[]} catalogoPaisOrigen
  * @description Catálogo para el select de país de origen.
  */
  catalogoPaisOrigen: Catalogo[] = [];

  /**
  * @property {Catalogo[]} catalogoPaisProcedencia
  * @description Catálogo para el select de país de procedencia.
  */
  catalogoPaisProcedencia: Catalogo[] = [];

  /**
  * @property {Catalogo[]} catalogoTipoProducto
  * @description Catálogo para el select de tipo de producto.
  */
  catalogoTipoProducto: Catalogo[] = [];

  /**
  * @property {Catalogo[]} catalogoUmc
  * @description Catálogo para el select de unidad de medida de comercialización (UMC).
  */
  catalogoUmc: Catalogo[] = [];
  /**
  * @property {MercanciaForm[]} listaDeTablasSeleccionadas
  * @description es una propiedad de tipo array que almacena una lista de objetos de tipo.
  */
  listaDeTablasSeleccionadas: MercanciaForm[] = [];
    /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * @constructor
   * @param {FormBuilder} fb Servicio para la construcción de formularios reactivos.
   * @param {DatosMercanciaService} datosMercanciaService Servicio para obtener datos de la mercancía.
   */
  constructor(private readonly fb: FormBuilder, private readonly datosMercanciaService: DatosMercanciaService, private readonly cdr: ChangeDetectorRef, private readonly consultaioQuery: ConsultaioQuery
  ) {
     this.consultaioQuery.selectConsultaioState$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.esFormularioSoloLectura = seccionState.readonly;
            })
          )
          .subscribe();
    this.obtenerNombreComun();
    this.obtenerNombreCientifico();
    this.obtenerUso();
    this.obtenerPaisProcedencia();
    this.obtenerTipoProducto();
    this.obtenerPaisOrigen();
    this.obtenerUmc();
  }

  /**
   * @method ngOnInit
   * @lifecycle OnInit
   * @description Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario de la mercancía y suscribe a los cambios para realizar validaciones.
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.datosMercanciaService.obtenerDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        if (Array.isArray(data?.datos)) {
          this.cuerpoTabla = data.datos as MercanciaForm[];
        } else {
          this.cuerpoTabla = [];
        }
      });


  }
/**
 * @descripcion
 * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
 * 
 * Habilita o deshabilita el formulario `formMercancia` según el valor de `esFormularioSoloLectura`.
 * Si el formulario está en modo solo lectura, se desactiva para evitar modificaciones.
 */
  ngAfterViewInit(): void {
    if(this.esFormularioSoloLectura){
      this.formMercancia.disable();
    }
    else{
      this.formMercancia.enable();
    }
  }

  /**
   * @method crearFormulario
   * @description Método para crear e inicializar el formulario reactivo de la mercancía.
   * Define los controles del formulario y sus validadores.
   * @returns {void}
   */
  crearFormulario():void {
    this.formMercancia = this.fb.group({
      id: [null],
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
   * @method obtenerNombreComun
   * @description Obtiene la lista de nombres comunes desde un archivo JSON a través del servicio.
   * Suscribe al observable para actualizar el catálogo de nombres comunes.
   * @returns {void}
   */
  obtenerNombreComun():void {
    this.datosMercanciaService.obtenerSelectorList('nombrecomun.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.catalogoNombreComun = data;
    })
  }

  /**
  * @method obtenerNombreCientifico
  * @description Obtiene la lista de nombres científicos desde un archivo JSON a través del servicio.
  * Suscribe al observable para actualizar el catálogo de nombres científicos.
  * @returns {void}
  */
  obtenerNombreCientifico():void {
    this.datosMercanciaService.obtenerSelectorList('nombrecientifico.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.catalogoNombreCientifico = data;
    })
  }

  /**
  * @method obtenerUso
  * @description Obtiene la lista de usos desde un archivo JSON a través del servicio.
  * Suscribe al observable para actualizar el catálogo de usos.
  * @returns {void}
  */
  obtenerUso():void {
    this.datosMercanciaService.obtenerSelectorList('uso.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.catalogoUso = data;
    })
  }

  /**
  * @method obtenerPaisOrigen
  * @description Obtiene la lista de países de origen desde un archivo JSON a través del servicio.
  * Suscribe al observable para actualizar el catálogo de países de origen.
  * @returns {void}
  */
  obtenerPaisOrigen():void {
    this.datosMercanciaService.obtenerSelectorList('paisorigen.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.catalogoPaisOrigen = data;
    })
  }

  /**
  * @method obtenerPaisProcedencia
  * @description Obtiene la lista de países de procedencia desde un archivo JSON a través del servicio.
  * Suscribe al observable para actualizar el catálogo de países de procedencia.
  * @returns {void}
  */
  obtenerPaisProcedencia():void {
    this.datosMercanciaService.obtenerSelectorList('paisprocedencia.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.catalogoPaisProcedencia = data;
    })
  }

  /**
  * @method obtenerTipoProducto
  * @description Obtiene la lista de tipos de producto desde un archivo JSON a través del servicio.
  * Suscribe al observable para actualizar el catálogo de tipos de producto.
  * @returns {void}
  */
  obtenerTipoProducto():void {
    this.datosMercanciaService.obtenerSelectorList('tipoproducto.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.catalogoTipoProducto = data;
    })
  }

  /**
  * @method obtenerUmc
  * @description Obtiene la lista de unidades de medida de comercialización (UMC) desde un archivo JSON a través del servicio.
  * Suscribe al observable para actualizar el catálogo de UMCs.
  * @returns {void} 
  */
  obtenerUmc():void {
    this.datosMercanciaService.obtenerSelectorList('umc.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.catalogoUmc = data;
    })
  }



  /**
   * @method establecerValoresStore
   * @param {string} [campo] Campo específico que desencadenó la acción.
   * @description Método para establecer valores en el formulario de mercancía basado en el campo que se modificó.
   * Actualmente, solo establece la descripción de la fracción arancelaria y la UMT si el campo es 'fraccionArancelaria'.
   * @returns {void}
   */
  establecerValoresStore(
    campo?: string
  ): void {
    if (campo === 'fraccionArancelaria') {
      this.formMercancia.patchValue({
        descripcionFraccionArancelaria: 'CR-123456',
        umt: 'Dependencia-34'
      });
    }
  }

  /**
   * @method almacenarDatoEnTabla
   * @param {string} nombre Acción que se va a realizar ('add' para agregar).
   * @description Método para almacenar los datos del formulario en la tabla de mercancías.
   * Si el nombre es 'add', agrega el valor actual del formulario al arreglo `cuerpoTabla` y cambia el estado del formulario.
   * Luego, limpia los datos del formulario.
   * @returns {void}
   */
  almacenarDatoEnTabla(nombre: string):void {
    this.estadoChecker = !this.estadoChecker;
    if (nombre === AGREGAR) {
      this.formMercancia.patchValue({
        id: Math.floor(Math.random() * 90) + 10
      })
      this.cuerpoTabla.push(this.formMercancia.value as MercanciaForm);
      this.datosMercanciaService.actualizarFormularioMovilizacion(this.cuerpoTabla as MercanciaForm[]);
      this.datosMercanciaService.botonDesactivarCampos(this.cuerpoTabla.length > 0 ? true : false)
    }
    else if (nombre === EDITAR) {
      const ARTICULOACTUALIZADO = this.formMercancia.value as MercanciaForm;
      const IDACTUALIZADO = ARTICULOACTUALIZADO.id;
      this.cuerpoTabla = this.cuerpoTabla.map(item =>
        item.id === IDACTUALIZADO ? ARTICULOACTUALIZADO : item
      );
      this.datosMercanciaService.actualizarFormularioMovilizacion(this.cuerpoTabla as MercanciaForm[]);
    }

    this.limpiarDatosFormulario();
  }

  /**
   * @method limpiarDatosFormulario
   * @description Método para resetear los valores del formulario de la mercancía.
   * @returns {void}
   */
  limpiarDatosFormulario():void {
    this.cdr.detectChanges();
    this.formMercancia.reset();
  }


  /**
   * @method onListaDeFilaSeleccionada
   * @description Método que recibe las filas seleccionadas de la tabla y las almacena en la propiedad `listaDeTablasSeleccionadas`.
   * @param {MercanciaForm[]} filasSeleccionadas - Lista de las filas seleccionadas en la tabla.
   * @returns {void}
   */
  onListaDeFilaSeleccionada(filasSeleccionadas: MercanciaForm[]): void {
    this.listaDeTablasSeleccionadas = filasSeleccionadas;
  }

  /**
   * @method eliminarElementoSeleccionado
   * @description Método que elimina el elemento seleccionado de la tabla basado en el ID del mismo. 
   * Si el ID del elemento está presente en `listaDeTablasSeleccionadas`, se realiza la eliminación tanto en la lista como en el servicio correspondiente.
   * @returns {void}
   */
  eliminarElementoSeleccionado(): void {
    const ID = this.listaDeTablasSeleccionadas[0]?.id;
    if (ID !== undefined) {
      const INDICE = this.cuerpoTabla.findIndex(item => item.id === ID);
      if (INDICE !== -1) {
        this.cuerpoTabla.splice(INDICE, 1);
        this.datosMercanciaService.actualizarFormularioMovilizacion(this.cuerpoTabla);
        if (this.cuerpoTabla.length === 0) {
          this.datosMercanciaService.botonDesactivarCampos(false)
        }
        else {
          this.datosMercanciaService.botonDesactivarCampos(true);
        }
      }
    }
  }

  /**
   * @method seleccionarParaModificacion
   * @description Método que permite seleccionar un elemento de la tabla para modificar sus datos. 
   * Cuando se selecciona una fila, los valores del formulario (`formMercancia`) se llenan con los datos de ese elemento.
   * @returns {void}
   */
  seleccionarParaModificacion(): void {
    this.estadoChecker = true;
    const ID = this.listaDeTablasSeleccionadas[0]?.id;
    if (ID !== undefined) {
      const VALOR = this.cuerpoTabla.filter(item => item.id === ID);
      this.formMercancia.patchValue(VALOR[0]);
    }
  }

  /**
  * @method ngOnDestroy
  * @lifecycle OnDestroy
  * @description Método del ciclo de vida que se ejecuta cuando el componente es destruido.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
