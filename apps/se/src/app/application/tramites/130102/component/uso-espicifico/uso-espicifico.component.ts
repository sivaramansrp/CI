/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @module UsoEspicificoComponent
 * @description Componente para el formulario de Uso Específico, permitiendo al usuario ingresar información sobre el uso específico de un producto, incluyendo la fracción arancelaria y una descripción.
 */

import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from "libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

import fraccionOptionJson from 'libs/shared/theme/assets/json/130102/fracciónarancelaria-options.json';

import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs'; 

@Component({
  selector: 'app-uso-espicifico',
  standalone: true,
  imports: [TituloComponent, CatalogoSelectComponent, TableComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './uso-espicifico.component.html',
  styleUrl: './uso-espicifico.component.scss'
})
export class UsoEspicificoComponent implements OnInit {

  /**
   * @description Formulario para el uso específico.
   * @type {FormGroup}
   */
  usoEspicificoForm!: FormGroup;

  /**
   * @description Columnas para la tabla de fracciones arancelarias.
   * @type {string[]}
   */
  tableColumns = [
    'Fracción arancelaria',
    'Descripción'
  ];

  /**
   * @description Datos de ejemplo para la tabla.
   * @type {any[]}
   */
  tableData = [
    {
      tbodyData: [
        '980200011',
        'Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar) ',
      ]
    },
    {
      tbodyData: [
        '01039101',
        'Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizara ta mercancia a importar) ',
      ]
    }
  ];

  /**
   * @description Opciones del catálogo de fracción arancelaria.
   * @type {Catalogo[]}
   */
  catalogos: Catalogo[] = fraccionOptionJson;

  public solicitudState!: Solicitud130102State;
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @param {FormBuilder} formbuilt Servicio para construir el formulario.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private formbuilt: FormBuilder,
    private tramite130102Store: Tramite130102Store,
    private tramite130102Query: Tramite130102Query
  ) { 
    // constructor
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y configura el formulario con reglas de validación.
   * @memberof UsoEspicificoComponent
   */
  ngOnInit(): void {

    this.tramite130102Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {  
        console.log('Solicitud130102State', seccionState);
        this.solicitudState = seccionState;
      })
    )
    .subscribe();

    this.usoEspicificoForm = this.formbuilt.group({
      fracciónarancelaria: [ this.solicitudState?.fracciónarancelaria, Validators.required],
      descripción: [{ value: '', disabled: true }]
    });
  }

    /**
   * Asigna un valor del formulario al store.
   *
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Campo del formulario a obtener.
   * @param {keyof Tramite130102Store} metodoNombre - Método del store donde se guardará el valor.
   */
   setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130102Store): void {
      const valor = form.get(campo)?.value;
      (this.tramite130102Store[metodoNombre] as (value: any) => void)(valor);
    }

  /**
   * @method obtenerRequisitosFraccionArancelariaEsquema
   * @description Actualiza el formulario con el ID y la descripción de la fracción arancelaria seleccionada.
   * @memberof UsoEspicificoComponent
   */
  obtenerRequisitosFraccionArancelariaEsquema(): void {
    this.usoEspicificoForm.get('descripción')?.setValue('Descripción fraccion PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar) ');
  }
}