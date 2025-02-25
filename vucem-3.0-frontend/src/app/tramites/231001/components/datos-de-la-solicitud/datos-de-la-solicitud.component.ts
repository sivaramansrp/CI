/**
 * Componente que representa el formulario de datos de la aduana.
 * 
 *    app-datos-dela
 *  ./datos-dela.component.html
 *  ./datos-dela.component.scss
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';

import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { PASOS } from '../../../../shared/constantes/303/pasos.enums';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

/**
 * Decorador que define un componente de Angular.
 * 
 *  app-datos-dela - El selector CSS que identifica este componente en una plantilla.
 * ./datos-dela.component.html - La URL de la plantilla HTML del componente.
 * ./datos-dela.component.scss - La URL de la hoja de estilos del componente.
 */
@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDelaSolicitudeComponent implements OnInit {
  
  /**
   *  datosForm
   * @type {FormGroup}
   *  FormGroup que contiene el formulario de datos.
   */
  datosForm: FormGroup;

  /**
   *  aduanas
   * @type {Catalogo[]}
   *  Arreglo que almacena los catálogos de aduanas.
   */
  aduanas!: Catalogo[];

  /**
   *  selectedAduana
   * @type {string | number}
   *  Aduana seleccionada en el formulario.
   */
  selectedAduana: string | number;

  /**
   *  pasos
   * @type {ListaPasosWizard[]}
   *  Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   *  indice
   * @type {number}
   *  Índice del paso actual en el wizard.
   */
  indice: number = 1;

  /**
   *  texto
   * @type {string}
   *  Texto del aviso de privacidad.
   */
  texto: string = 'Aviso de Privacidad simplificado';

  /**
   *  solicitudForm
   * @type {FormGroup}
   *  FormGroup que contiene el formulario de solicitud.
   */
  solicitudForm: FormGroup;

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Servicio FormBuilder para la creación de formularios.
   * @param {CatalogosService} catalogosServices - Servicio para obtener los catálogos.
   */
  constructor(public fb: FormBuilder, private catalogosServices: CatalogosService) {
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        numeroRegistroAmbiental: ['', Validators.required],
        descripcionGenerica1: ['', Validators.required],
        numeroProgramaImmex: ['', Validators.required],
      })
    });
  }

  /**
   * Verifica si un control del formulario es inválido y ha sido interactuado por el usuario.
   * @param {string} id - Identificador del control del formulario.
   * @returns {boolean | null} Verdadero si el control es inválido y ha sido tocado, falso en caso contrario.
   */
  isInvalid(id: string): boolean | null {
    const control = this.solicitudForm.get('datosdelForm').get(id);
    return control?.invalid && control?.touched;
  }

  /**
   * Maneja el envío del formulario.
   */

  // TODO
  onSubmit(): void {
    if (this.solicitudForm.valid) {
    } else {
    }
  }

  /**
   * Referencia al componente del wizard.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.datosForm = this.fb.group({
      aduanas: [null, Validators.required],
    });
    this.aduanasdata();
  }

  /**
   * Maneja la selección de una aduana.
   */
  onAduanaSelect(): void {
    this.selectedAduana = this.datosForm.get('aduanas')?.value;
  }

  /**
   * Obtiene los datos de las aduanas desde el servicio de catálogos.
   */
  aduanasdata(): void {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_ADUANAS).subscribe({
      next: (resp) => {
        if (resp.length > 0) {
          this.aduanas = resp;
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    });
  }
}