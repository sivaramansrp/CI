import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { PASOS } from '../../../../shared/constantes/303/pasos.enums';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';
import { map } from 'rxjs/operators';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-dela.component.html',
  styleUrl: './datos-dela.component.scss',
})
export class DatosDelaComponent implements OnInit {
  datosForm: FormGroup;
  aduanas!: Catalogo[];
  selectedAduana: any;
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;
  texto:string = 'Aviso de Privacidad simplificado'

  /**
   * @property comboAutorizacionIMMEX
   * @type any[]
   * @description Arreglo para almacenar las opciones del combo de autorización IMMEX. Actualmente no se utiliza en el código proporcionado, pero se declara.
   */
  comboAutorizacionIMMEX: any[] = [];

  /**
   * @property solicitudForm
   * @type {FormGroup}
   * @description FormGroup que contiene el formulario de solicitud.
   */
  solicitudForm: FormGroup;

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio FormBuilder para la creación de formularios.
   */
  constructor(private fb: FormBuilder,private catalogosServices: CatalogosService) {
    /**
     * @description Inicialización del formulario de solicitud con validadores requeridos.
     */
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        /**
         * @property numeroRegistroAmbiental
         * @type {FormControl}
         * @description Control para el número de registro ambiental.
         * @required
         */
        numeroRegistroAmbiental: ['', Validators.required],
        /**
         * @property descripcionGenerica1
         * @type {FormControl}
         * @description Control para la descripción genérica 1.
         * @required
         */
        descripcionGenerica1: ['', Validators.required],
        /**
         * @property numeroProgramaImmex
         * @type {FormControl}
         * @description Control para el número de programa IMMEX.
         * @required
         */
        numeroProgramaImmex: ['', Validators.required],
      })
    });
  }

  /**
   * @method isInvalid
   * @param {string} id - Identificador del control del formulario.
   * @returns {boolean | null} Verdadero si el control es inválido y ha sido tocado, falso en caso contrario.
   * @description Verifica si un control del formulario es inválido y ha sido interactuado por el usuario.
   */
  isInvalid(id: string): boolean | null {
    const control = this.solicitudForm.get('datosdelForm').get(id);
    return control?.invalid && control?.touched;
  }

  /**
   * @method onSubmit
   * @description Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.solicitudForm.valid) {
      console.log('Formulario Enviado!', this.solicitudForm.value);
    } else {
      console.log('El formulario es inválido');
    }
  }

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };


  ngOnInit(): void {
    this.datosForm = this.fb.group({
      aduanas: [null, Validators.required],
    });
    this.aduanasdata();
  }

  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
  onAduanaSelect(): void {
    this.selectedAduana = this.datosForm.get('aduanas')?.value;
  }

  aduanasdata(): void {
    console.log('ngoninit start');
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_ADUANAS).subscribe({
      next: (resp) => {
        console.log('API Response:', resp);
        if (resp.length > 0) {
          this.aduanas = resp;
        }
      },
      error: (err) => console.error('API Error:', err),
      complete: () => console.log('API Call Completed'),
    });
  }
}
