import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Catalogo, ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';

import { Subject, takeUntil } from 'rxjs';

import { OperacionService } from '../../services/operacion.service';

import { Personas, Solicitar } from '../../models/personas.module';

/**
 * @component
 * @name OperacionesDeComercioExteriorComponent
 * @description Componente encargado de gestionar las operaciones de comercio exterior.
 * Proporciona un formulario para seleccionar una operación y obtiene una lista de opciones
 * de países desde un servicio.
 * 
 * @implements OnInit, OnDestroy
 * 
 * @example
 * <app-operaciones-de-comercio-exterior></app-operaciones-de-comercio-exterior>
 */
@Component({
  selector: 'app-operaciones-de-comercio-exterior',
  templateUrl: './operaciones-de-comercio-exterior.component.html',
  styleUrl: './operaciones-de-comercio-exterior.component.scss',
})

export class OperacionesDeComercioExteriorComponent implements OnInit,OnDestroy {
  /**
 * @property {FormGroup} miformulario - Formulario reactivo utilizado para gestionar las operaciones.
 * @property {Catalogo[]} optionsPaisList - Lista de opciones de países obtenida desde el servicio.
 * @property {Subject<void>} destroyNotifier$ - Sujeto utilizado para manejar la destrucción de suscripciones.
 */

  miformulario!: FormGroup;
  periodoForm!: FormGroup;
  optionsPaisList:Catalogo[]=[];
  periodoList:Catalogo[]=[]; 
   private destroyNotifier$: Subject<void> = new Subject();
   tipoPersonasSeleccion: TablaSeleccion = TablaSeleccion.UNDEFINED;
   configuracionPersonasColumnas: ConfiguracionColumna<Personas>[] = [
    { encabezado: 'RFC', clave: (fila) => fila.RFC, orden: 1 },
    { encabezado: 'CURP', clave: (fila) => fila.CURP, orden: 2 },
    { encabezado: 'Nombre', clave: (fila) => fila.Nombre, orden: 3 },
    { encabezado: 'Primer apellido', clave: (fila) => fila.Primer_apellido, orden: 4 },
    { encabezado: 'Segundo apellido', clave: (fila) => fila.Segundo_apellido, orden: 5 },
    { encabezado: 'Correo electrónico', clave: (fila) => fila.Correo_electronico, orden: 6 },
  ];
  tipoSolicitarSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;
  configuracionSolicitarColumnas: ConfiguracionColumna<Solicitar>[] = [
    { encabezado: 'Periodo', clave: (fila) => fila.Periodo, orden: 1 },
    { encabezado: 'Fechas sobre el periodo', clave: (fila) => fila.Fechas_sobre_el_periodo, orden: 2 },
  ];
  acciones:string[] =[];
  cuerpoPersonasTablaFila: Personas[] = [];  
  cuerpoSolicitarTablaFila: Solicitar[] = [];  
   /**
 * @constructor
 * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
 * @param {OperacionService} operacionService - Servicio para obtener datos relacionados con operaciones.
 * @description Inicializa el componente y obtiene la lista de operaciones al crearlo.
 */
  constructor(private readonly fb: FormBuilder,private readonly operacionService: OperacionService) { 
    this.getOperacionList();
    this.getPersonasTableeData();
    this.getperiodoList();
  }
/**
 * @method ngOnInit
 * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 * Configura el formulario reactivo.
 */
  ngOnInit(): void {
  this.miformulario = this.fb.group({
  operacion:['',Validators.required],
  });
  this.periodoForm =this.fb.group({
    periodo: ['', Validators.required],
    periodoInicial: ['', Validators.required],
    periodoFinal: ['', Validators.required]
  });
  }
  /**
 * @method getOperacionList
 * @description Obtiene la lista de opciones de países desde el servicio `OperacionService`.
 * Suscribe a los datos y los asigna a la propiedad `optionsPaisList`.
 */
  getOperacionList(): void {
    this.operacionService.obtenerSelectorList('optionsPais.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.optionsPaisList = data;
    })
  }
  getperiodoList(): void {
    this.operacionService.obtenerSelectorList('periodo.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.periodoList = data;
    })
  }

  getPersonasTableeData() :void{
    this.operacionService.obtenerTablerList('personas.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.cuerpoPersonasTablaFila = data;
    })
  }





  /**
 * @method ngOnDestroy
 * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 * Completa el `Subject` para evitar fugas de memoria en las suscripciones.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
