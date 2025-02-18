/**
 * Componente que representa el formulario de datos de la aduana.
 * 
 *    app-datos-dela
 *  ./datos-dela.component.html
 *  ./datos-dela.component.scss
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { PASOS } from '../../../../shared/constantes/303/pasos.enums';

/**
 * Interfaz que define la estructura de un objeto de acción de botón.
 * 
 * @interface AccionBoton
 * @property {string} accion - La acción a realizar.
 * @property {number} valor - El valor asociado a la acción.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Decorador que define un componente de Angular.
 * 
 * @selector app-datos-dela - El selector CSS que identifica este componente en una plantilla.
 * @templateUrl ./datos-dela.component.html - La URL de la plantilla HTML del componente.
 * @styleUrl ./datos-dela.component.scss - La URL de la hoja de estilos del componente.
 */
@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-dela.component.html',
  styleUrl: './datos-dela.component.scss',
})
export class DatosDelaComponent implements OnInit {
  /**
   * @property datosForm
   * @type {FormGroup}
   *  FormGroup que contiene el formulario de datos.
   */
  datosForm: FormGroup;

  /**
   * @property aduanas
   * @type {Catalogo[]}
   *  Arreglo que almacena los catálogos de aduanas.
   */
  aduanas!: Catalogo[];

  /**
   * @property selectedAduana
   * @type {any}
   *  Aduana seleccionada en el formulario.
   */
  selectedAduana: any;

  /**
   * @property pasos
   * @type {ListaPasosWizard[]}
   *  Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property indice
   * @type {number}
   *  Índice del paso actual en el wizard.
   */
  indice: number = 1;

  /**
   * @property texto
   * @type {string}
   *  Texto del aviso de privacidad.
   */
  texto: string = 'Aviso de Privacidad simplificado';

  /**
   * @property comboAutorizacionIMMEX
   * @type {any[]}
   *  Arreglo para almacenar las opciones del combo de autorización IMMEX.
   */
  comboAutorizacionIMMEX: any[] = [];

  /**
   * @property solicitudForm
   * @type {FormGroup}
   *  FormGroup que contiene el formulario de solicitud.
   */
  solicitudForm: FormGroup;

  /**
   * 
   *  {FormBuilder} fb - Servicio FormBuilder para la creación de formularios.
   *  {CatalogosService} catalogosServices - Servicio para obtener los catálogos.
   */
  constructor(private fb: FormBuilder, private catalogosServices: CatalogosService) {
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        numeroRegistroAmbiental: ['', Validators.required],
        descripcionGenerica1: ['', Validators.required],
        numeroProgramaImmex: ['', Validators.required],
      })
    });
  }

  /**
   * @method isInvalid
   *  {string} id - Identificador del control del formulario.
   * @returns {boolean | null} Verdadero si el control es inválido y ha sido tocado, falso en caso contrario.
   *  Verifica si un control del formulario es inválido y ha sido interactuado por el usuario.
   */
  isInvalid(id: string): boolean | null {
    const control = this.solicitudForm.get('datosdelForm').get(id);
    return control?.invalid && control?.touched;
  }

  /**
   * @method onSubmit
   *  Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.solicitudForm.valid) {
      console.log('Formulario Enviado!', this.solicitudForm.value);
    } else {
      console.log('El formulario es inválido');
    }
  }

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property datosPasos
   * @type {DatosPasos}
   *  Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method ngOnInit
   *  Inicializa el componente.
   */
  ngOnInit(): void {
    this.datosForm = this.fb.group({
      aduanas: [null, Validators.required],
    });
    this.aduanasdata();
  }

  /**
   * @method getValorIndice
   *  {AccionBoton} e - Acción del botón.
   *  Obtiene el valor del índice del paso actual.
   */
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

  /**
   * @method onAduanaSelect
   *  Maneja la selección de una aduana.
   */
  onAduanaSelect(): void {
    this.selectedAduana = this.datosForm.get('aduanas')?.value;
  }

  /**
   * @method aduanasdata
   *  Obtiene los datos de las aduanas desde el servicio de catálogos.
   */
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