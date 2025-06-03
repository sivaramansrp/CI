/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @module UsoEspicificoComponent
 * @description Componente para el formulario de Uso Específico, permitiendo al usuario ingresar información sobre el uso específico de un producto, incluyendo la fracción arancelaria y una descripción.
 */

import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from "libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

import fraccionOptionJson from 'libs/shared/theme/assets/json/130102/fracciónarancelaria-options.json';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';

import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs'; 
import { FormularioRegistroService } from '../../services/octava-temporal.service';

import { ConsultaioQuery, TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';
import { FRACCIONES_ANARCIA_TABLA } from '../../constantes/octava-temporal.enum';
import { FraccionArancelariaProsec } from '../../models/octava-temporal.model';

@Component({
  selector: 'app-uso-especifico',
  standalone: true,
  imports: [TituloComponent, CatalogoSelectComponent, TableComponent, ReactiveFormsModule, CommonModule,TablaDinamicaComponent],
  templateUrl: './uso-especifico.component.html',
  styleUrl: './uso-especifico.component.scss'
})
export class UsoEspicificoComponent implements OnInit {
   /**
       * @property {TablaSeleccion} tablaSeleccion
       * @description Tabla de selección para la tabla de cupos.
       */
      tablaSeleccion = TablaSeleccion;
  /*
    * @description Configuración de la tabla para mostrar las fracciones arancelarias.
    * @type {TablaDinamicaComponent}
    */
    
    configuracionTabla =FRACCIONES_ANARCIA_TABLA;
/**
 * @description Lista de fracciones arancelarias PROSEC.
 * @type {FraccionArancelariaProsec[]}
 */
     datosSocios: FraccionArancelariaProsec[] = [];

  /**
   * @description Formulario para el uso específico.
   * @type {FormGroup}
   */
  usoEspicificoForm!: FormGroup;


  /**
   * @description Opciones del catálogo de fracción arancelaria.
   * @type {Catalogo[]}
   */
  catalogos: Catalogo[] = fraccionOptionJson;

  /**
   * Estado actual de la solicitud 130102, obtenido desde el store.
    **/
  public solicitudState!: Solicitud130102State;

  /**
   * Observable utilizado para cancelar suscripciones al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
/*
   * Indica si el formulario es de solo lectura.
   */
   esFormularioSoloLectura: boolean = false;

  /**
   * @constructor
   * @param {FormBuilder} formbuilt Servicio para construir el formulario.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private formbuilt: FormBuilder,
    private tramite130102Store: Tramite130102Store,
    private tramite130102Query: Tramite130102Query,
    private formularioRegistroService: FormularioRegistroService,
    private consultaioQuery: ConsultaioQuery
  ) { 
   this.consultaioQuery.selectConsultaioState$
         .pipe(
           takeUntil(this.destroyNotifier$),
           map((seccionState) => {
             this.esFormularioSoloLectura = seccionState.readonly;
            
             this.inicializarEstadoFormulario();
           })
         )
         .subscribe();
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y configura el formulario con reglas de validación.
   * @memberof UsoEspicificoComponent
   */
  ngOnInit(): void {
this.inicializarEstadoFormulario();
      this.formularioRegistroService.getFraccionesUsoEspecifico().subscribe(data => {
      this.datosSocios = data;
    });
    this.formularioRegistroService.registrarFormulario('usoEspicificoForm', this.usoEspicificoForm);
  }

  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado del formulario según si es de solo lectura o editable.
   * @memberof UsoEspicificoComponent
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
   
  }
  /*
    * Guarda los datos del formulario y ajusta su estado según si es de solo lectura o no.
    * @returns void
    * */
   guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.usoEspicificoForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.usoEspicificoForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }
  /**
   * @method inicializarFormulario
   * @description Inicializa el formulario reactivo y sus validaciones.
   * @memberof UsoEspicificoComponent
   */
  inicializarFormulario():void{
      this.tramite130102Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {  
        this.solicitudState = seccionState;
      })
    )
    .subscribe();

    this.usoEspicificoForm = this.formbuilt.group({
      fraccionArancelariaProsec: [ this.solicitudState?.fraccionArancelariaProsec, Validators.required],
      descripción: ['',Validators.required,UsoEspicificoComponent.noLeadingSpacesValidator],

    });
       if (this.esFormularioSoloLectura) {
    this.usoEspicificoForm.disable();
  }
  }
    /**
   * Asigna un valor del formulario al store.
   *
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Campo del formulario a obtener.
   * @param {keyof Tramite130102Store} metodoNombre - Método del store donde se guardará el valor.
   */
   setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130102Store): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite130102Store[metodoNombre] as (value: string | number | boolean) => void)(VALOR);
    }

  /**
   * @method obtenerRequisitosFraccionArancelariaEsquema
   * @description Actualiza el formulario con el ID y la descripción de la fracción arancelaria seleccionada.
   * @memberof UsoEspicificoComponent
   */
  obtenerRequisitosFraccionArancelariaEsquema(): void {
    this.usoEspicificoForm.get('descripción')?.setValue('Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar) ');
  }

  /**
  * Validador que verifica que el valor del campo no tenga espacios al inicio ni al final.
  * 
  * @param control - Control del formulario a validar.
  * @returns Un objeto con el error 'leadingSpaces' si hay espacios al inicio o final, o null si es válido.
  */
  private static noLeadingSpacesValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  }

}