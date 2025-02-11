import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';

import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import estadofisico from '../../../../../assets/json/301/estado-fisico-options.json';
import franccionArancelaria from '../../../../../assets/json/301/fraccion-arancelaria-options.json';
import nico from '../../../../../assets/json/301/nico-options.json';

/**
 * Componente `InformacionDeLaComponent`
 * 
 * Este componente se encarga de gestionar un formulario con información relevante 
 * sobre productos químicos. Los usuarios deben ingresar datos como fracción arancelaria, 
 * nombre químico, estado físico, etc. El formulario tiene campos con validaciones y 
 * deshabilita o habilita campos adicionales según las selecciones del usuario.
 * 
 * @component
 * @example
 * <app-informacion-de-la></app-informacion-de-la>
 */
@Component({
  selector: 'app-informacion-de-la',
  templateUrl: './informacion-de-la.component.html',
  styleUrls: ['./informacion-de-la.component.scss'],
  imports: [TituloComponent, ReactiveFormsModule, CommonModule, BtnContinuarComponent],
  standalone: true
})
export class InformacionDeLaComponent implements OnInit, OnDestroy {

  /** 
   * Formulario reactivo para capturar la información del producto químico.
   * Este formulario contiene múltiples campos con validaciones como 'fraccionArancelaria', 'nombreQuimico', entre otros.
   * 
   * @type {FormGroup}
   */
  informacionDeLaform!: FormGroup;

  /** 
   * Lista de opciones de fracción arancelaria cargadas desde un archivo JSON.
   * 
   * @type {Array}
   */
  fraccionArancelariaOptions = franccionArancelaria;

  /** 
   * Lista de opciones de NICO cargadas desde un archivo JSON.
   * 
   * @type {Array}
   */
  nicoOptions = nico;

  /** 
   * Lista de opciones de estado físico del producto, cargadas desde un archivo JSON.
   * 
   * @type {Array}
   */
  estadoFisicoOptions = estadofisico;

  /** 
   * Índice del paso actual, utilizado para navegar a través de pasos en el formulario.
   * 
   * @type {number}
   */
  indice: number = 1;

  /** 
   * Objeto que contiene la información sobre los pasos de la navegación.
   * 
   * @type {Object}
   */
  datosPasos: any = {
    indice: this.indice,
    txtBtnSig: 'Continuar',
  }

  /** 
   * Sujeto de tipo `ReplaySubject` que se utiliza para gestionar la destrucción del componente.
   * 
   * @public
   * @type {ReplaySubject<boolean>}
   */
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Constructor del componente `InformacionDeLaComponent`.
   * 
   * Inicializa el formulario reactivo a través del servicio `FormBuilder` de Angular.
   * 
   * @param {FormBuilder} formbuilt - Instancia de FormBuilder para crear formularios reactivos.
   */
  constructor(private formbuilt: FormBuilder) { }

  /**
   * Método del ciclo de vida `ngOnInit()`.
   * Este método se ejecuta cuando el componente se inicializa.
   * 
   * - Crea el formulario `informacionDeLaform` y configura sus validaciones.
   * - Escucha los cambios en los campos `fraccionArancelaria` y `nico` para habilitar o deshabilitar campos asociados.
   * 
   * @memberof InformacionDeLaComponent
   */
  ngOnInit(): void {
    // Inicializa el formulario reactivo con validaciones
    this.informacionDeLaform = this.formbuilt.group({
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: '', disabled: true }],
      nico: ['', Validators.required],
      descripcionNico: [{ value: '', disabled: true }],
      nombreQuimico: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      numeroCAS: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      acondicionamiento: ['', Validators.required]
    });

    // Escucha los cambios en el campo `fraccionArancelaria`
    this.informacionDeLaform.get('fraccionArancelaria')?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        if (value) {
          this.informacionDeLaform.get('descripcionFraccion')?.enable();
        } else {
          this.informacionDeLaform.get('descripcionFraccion')?.disable();
        }
      });

    // Escucha los cambios en el campo `nico`
    this.informacionDeLaform.get('nico')?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        if (value) {
          this.informacionDeLaform.get('descripcionNico')?.enable();
        } else {
          this.informacionDeLaform.get('descripcionNico')?.disable();
        }
      });
  }

  /**
   * Método para manejar el envío del formulario.
   * 
   * Este método verifica si el formulario es válido antes de continuar.
   * Si el formulario es inválido, no realiza ninguna acción.
   * 
   * @memberof InformacionDeLaComponent
   */
  onSubmit(): void {
    if (this.informacionDeLaform.invalid) {
      return;
    }
    // Aquí puede incluirse la lógica para procesar el formulario
  }

  /**
   * Método para registrar el valor del índice (evento de algún paso).
   * Este método está preparado para manejar un evento y realizar algún procesamiento adicional.
   * 
   * @param {unknown} event - El evento a registrar o procesar.
   * @memberof InformacionDeLaComponent
   */
  getValorIndice(event: unknown): void {
    // Lógica para manejar el evento, si es necesario
    return;
  }

  /**
   * Método del ciclo de vida `ngOnDestroy()`.
   * 
   * Este método se ejecuta cuando el componente se destruye. Limpia los recursos y
   * completa el sujeto `destroyed$` para evitar fugas de memoria.
   * 
   * @memberof InformacionDeLaComponent
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
