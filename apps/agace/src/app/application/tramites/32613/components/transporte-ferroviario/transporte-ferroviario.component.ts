import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { InputRadioComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { LISTADO_DE_SOCIO_COMERCIAL_CERTIFICADO, TEMPLATE_3_ARRAY, TRANSPORTE_FERROVARIO } from '../../constantes/constantes32613.enum';
import { CommonModule } from '@angular/common';
import { DatosComunesTresComponent } from '../../../../shared/components/datos-comunes-tres/datos-comunes-tres.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { RowTypeFormInputComponent } from '../../../../shared/components/row-type-form-input/row-type-form-input.component';

@Component({
  selector: 'app-transporte-ferroviario',
  standalone: true,
  imports: [
    CommonModule,
    DatosComunesTresComponent,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent,
    InputRadioComponent,
    PagoDeDerechosComponent,
    RowTypeFormInputComponent
  ],
  templateUrl: './transporte-ferroviario.component.html',
  styleUrl: './transporte-ferroviario.component.scss',
})
export class TransporteFerroviarioComponent implements OnInit, AfterViewInit{

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  @ViewChild('customTemplate3') customTemplate3!: TemplateRef<unknown>;

  @ViewChild('customTemplate4') customTemplate4!: TemplateRef<unknown>;

  @ViewChild('customTemplate5') customTemplate5!: TemplateRef<unknown>;

  @ViewChild('customTemplate6') customTemplate6!: TemplateRef<unknown>;

  public templateMap: Record<string, TemplateRef<unknown>> = {}; 

  public transporteFerroviarioForm!: FormGroup;

  /** Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroupUno`*/
  get ninoFormGroupUno(): FormGroup {
    return this.transporteFerroviarioForm.get('ninoFormGroupUno') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroupDos`*/
  get ninoFormGroupDos(): FormGroup {
    return this.transporteFerroviarioForm.get('ninoFormGroupDos') as FormGroup;
  }

  public formDataUno = TRANSPORTE_FERROVARIO;
  
  public formDataDos = LISTADO_DE_SOCIO_COMERCIAL_CERTIFICADO;

  public mostrarAlertaUno: boolean = false;

  public mostrarTemplate3: boolean = false;

  public mostrarTemplate3Alerta: boolean = false;

  public mostrarTemplate4: boolean = false;

  public mostrarTemplate5: boolean = false;

  public mostrarTemplate6: boolean = false;

  /** Modelo para la opción de tipo sí/no representado como radio button */
  public sinoOpciones = [
    {
      "label": "Sí Autorizo",
      "value": 1
    },
    {
      "label": "No Autorizo",
      "value": 2
    }
  ];

  public clasificacionInformacionOpciones = [
    {
      "label": "Publica",
      "value": 1
    },
    {
      "label": "Privada",
      "value": 2
    }
  ];

  public template3Array = TEMPLATE_3_ARRAY;
  
  public customTemplate3Form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
  ) {
    // Constructor de la clase TransporteFerroviarioComponent
  }

  ngOnInit(): void {
    this.initializeForm(); 
    Array.from({ length: 3 }).forEach(() => this.addCorreoTelefonoGroup());
    this.initializeCustomTemplate3Form();
  }

  initializeCustomTemplate3Form(): void {
      this.template3Array.forEach(campo => {
        if (typeof campo.formControlName === 'string') {
          this.customTemplate3Form.addControl(
            campo.formControlName,
            new FormControl('', campo.required ? Validators.required : [])
          );
        }
      });
    }

  /**
   * Inicializa el formulario de Transporte Ferroviario con los controles necesarios.
   * Este método se llama al iniciar el componente.
   */
  initializeForm(): void {
    this.transporteFerroviarioForm = this.formBuilder.group({
      ninoFormGroupUno: this.formBuilder.group({}),
      ninoFormGroupDos:this.formBuilder.group({}),
      senaleRadioInput: this.formBuilder.control({value: '', disabled: true}),
      unidadesPropias: this.formBuilder.control(''),
      unidadesArrendadas: this.formBuilder.control(''),
      reconocimientoMutuo: this.formBuilder.control(''),
      paginaTextInput: this.formBuilder.control('', [Validators.required]),
      correoTextInput: this.formBuilder.control('', [Validators.required]),
      correosTelefonicos: this.formBuilder.array([], this.atLeastOneTelefonoFilled()),
      clasificacionInformacion: this.formBuilder.control(''),
    });
  }

  createCorreoTelefonoGroup(): FormGroup {
    return this.formBuilder.group({
      correoLada: [''],
      correoTelefono: ['']
    });
  }

  addCorreoTelefonoGroup(): void {
    (this.transporteFerroviarioForm.get('correosTelefonicos') as FormArray).push(this.createCorreoTelefonoGroup());
  }

  get correosTelefonicos(): FormArray {
    return this.transporteFerroviarioForm.get('correosTelefonicos') as FormArray;
  }

  // eslint-disable-next-line class-methods-use-this
  public atLeastOneTelefonoFilled(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const ARRAY = formArray as FormArray;

      const ANY_FILLED = ARRAY.controls.some(group => {
        const CORREO_LADA = group.get('correoLada')?.value?.trim();
        const CORREO_TELEFONO = group.get('correoTelefono')?.value?.trim();
        return CORREO_LADA || CORREO_TELEFONO;
      });

      return ANY_FILLED ? null : { atLeastOneRequired: true };
    };
  }


  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.templateMap = {
        customSection1: this.customTemplate1,
        customSection2: this.customTemplate2,
        customSection3: this.customTemplate3,
        customSection4: this.customTemplate4,
        customSection5: this.customTemplate5,
        customSection6: this.customTemplate6
      };
    });
  }

  establecerCambioDeValorUno(event: {campo: string, valor: object | string| number }): void {
    if (event.campo === 'senaleSiSuSolicitud') {
      if (event.valor === 1) {
        this.transporteFerroviarioForm.get('senaleRadioInput')?.disable();
      } else {
        this.transporteFerroviarioForm.get('senaleRadioInput')?.enable();
      }
    }

    if (event.campo === 'indiqueSiCuentaCarga') {
      if (event.valor) {
        this.mostrarAlertaUno = true;
      } else {
        this.mostrarAlertaUno = false;
      }
    }

    if (event.campo === 'senaleSiLaFechaServicio') {
      if (event.valor) {
        this.mostrarTemplate3 = true;
      } else {
        this.mostrarTemplate3 = false;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  cambioReconocimientoMutuo(event: string | number): void {
    if (event) {
      // console.log(event);
    }
  }

  establecerCambioDeValorDos(event: {campo: string, valor: object | string| number }): void {
    if (event.campo === 'paginaElectronica') {
      if (event.valor === 'Si') {
        this.mostrarTemplate4 = true;
      } else {
        this.mostrarTemplate4 = false;
      }
    }

    if (event.campo === 'correoElectronico') {
      if (event.valor === 'Si') {
        this.mostrarTemplate5 = true;
      } else {
        this.mostrarTemplate5 = false;
      }
    }
    
    if (event.campo === 'telefono') {
      if (event.valor === 'Si') {
        this.mostrarTemplate6 = true;
      } else {
        this.mostrarTemplate6 = false;
      }
    }

  }

  /**
  * compo doc
  * @method esValido
  * @description 
  * Verifica si un campo específico del formulario es válido.
  * @param field El nombre del campo que se desea validar.
  * @returns {boolean | null} Un valor booleano que indica si el campo es válido.
  */
  public esValido(campo: string): boolean | null {
    return this.validacionesService.isValid(this.transporteFerroviarioForm, campo);
  }

  // eslint-disable-next-line class-methods-use-this
  emitirCambioValor(event: any): void {
    if (event) {
    // console.log(event)
    }
  }

  customTemplate3Events(event: {campo: string, valor: string | number}): void {
    if (event.campo === 'unidadesArrendadas' && event.valor) {
      this.mostrarTemplate3Alerta = true;
    }
  }
}
