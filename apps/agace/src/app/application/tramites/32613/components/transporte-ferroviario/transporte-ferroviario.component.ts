import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { InputRadioComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { LISTADO_DE_SOCIO_COMERCIAL_CERTIFICADO, TEMPLATE_3_ARRAY, TRANSPORTE_FERROVARIO } from '../../constantes/constantes32613.enum';
import { RubroTransporteFerrovario32613State, Tramite32613Store } from '../../../../estados/tramites/tramite32613.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { DatosComunesTresComponent } from '../../../../shared/components/datos-comunes-tres/datos-comunes-tres.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { RowTypeFormInputComponent } from '../../../../shared/components/row-type-form-input/row-type-form-input.component';
import { Tramite32613Query } from '../../../../estados/queries/tramite32613.query';

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
export class TransporteFerroviarioComponent implements OnInit, AfterViewInit, OnDestroy{

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

  /** Estado de la solicitud de la tramite 32613.*/
  public rubroTransporteFerrovariostate!: RubroTransporteFerrovario32613State;

  /** Subject para notificar la destrucción del componente.*/
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;

  constructor(
    private formBuilder: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite32613Store: Tramite32613Store,
    private tramite32613Query: Tramite32613Query,
    private consultaQuery: ConsultaioQuery,
  ) {
    // Constructor de la clase TransporteFerroviarioComponent
  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          // this.consultaState = seccionState;
          this.consultaState = {...seccionState, update: true, readonly: true }
        })
      )
      .subscribe();

    this.tramite32613Query.selectRubroTransporteFerrovario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.rubroTransporteFerrovariostate = seccionState;
        })
      )
      .subscribe();

    this.initializeForm(); 
    Array.from({ length: 3 }).forEach(() => this.addCorreoTelefonoGroup());
    this.initializeCustomTemplate3Form();
    this.asignarValorCondicional();
  }

  asignarValorCondicional(): void {
    const SENALE_SI_SOLICITUD = this.rubroTransporteFerrovariostate?.['senaleSiSuSolicitud'];
    const INDIQUE_SI_CUENTA_CARGA = this.rubroTransporteFerrovariostate?.['indiqueSiCuentaCarga'];
    const SENALE_SI_LA_FECHA_SERVICIO = this.rubroTransporteFerrovariostate?.['senaleSiLaFechaServicio'];
    const UNIDADES_ARRENDADAS = this.rubroTransporteFerrovariostate?.['unidadesArrendadas'];
    const PAGINA_ELECTRONICA = this.rubroTransporteFerrovariostate?.['paginaElectronica'];
    const CORREO_ELECTRONICO = this.rubroTransporteFerrovariostate?.['correoElectronico'];
    const TELEFONO = this.rubroTransporteFerrovariostate?.['telefono'];

    if (SENALE_SI_SOLICITUD === 1 || SENALE_SI_SOLICITUD === undefined || SENALE_SI_SOLICITUD === null) {
      this.transporteFerroviarioForm.get('senaleRadioInput')?.disable();
    } else if (SENALE_SI_SOLICITUD === 2) {
      this.transporteFerroviarioForm.get('senaleRadioInput')?.enable();
    }

    if (INDIQUE_SI_CUENTA_CARGA) {
      this.mostrarAlertaUno = true;
    } else {
      this.mostrarAlertaUno = false;
    }

    if (SENALE_SI_LA_FECHA_SERVICIO) {
      this.mostrarTemplate3 = true;
    } else {
      this.mostrarTemplate3 = false;
    }

    if (PAGINA_ELECTRONICA === 'Si') {
      this.mostrarTemplate4 = true;
    } else {
      this.mostrarTemplate4 = false;
    }

    if (CORREO_ELECTRONICO === 'Si') {
      this.mostrarTemplate5 = true;
    } else {
      this.mostrarTemplate5 = false;
    }
    
    if (TELEFONO === 'Si') {
      this.mostrarTemplate6 = true;
    } else {
      this.mostrarTemplate6 = false;
    }
    
    this.transporteFerroviarioForm.patchValue({
      senaleRadioInput: this.rubroTransporteFerrovariostate['senaleRadioInput'],
      reconocimientoMutuo: this.rubroTransporteFerrovariostate['reconocimientoMutuo'],
      paginaTextInput: this.rubroTransporteFerrovariostate['paginaTextInput'],
      correoTextInput: this.rubroTransporteFerrovariostate['correoTextInput'],
      clasificacionInformacion: this.rubroTransporteFerrovariostate['clasificacionInformacion']
    });

    this.customTemplate3Form.patchValue({
      unidadesPropias: this.rubroTransporteFerrovariostate['unidadesPropias'],
      unidadesArrendadas: this.rubroTransporteFerrovariostate['unidadesArrendadas'],
    })

    if (UNIDADES_ARRENDADAS) {
      this.mostrarTemplate3Alerta = true;
    }

    if(this.rubroTransporteFerrovariostate?.['correosTelefonicos']) {
      const VALORES = this.rubroTransporteFerrovariostate['correosTelefonicos'];
      if (Array.isArray(VALORES)) {
        VALORES.forEach((item, index) => {
          const GRUPO = this.correosTelefonicos.at(index);
          if (GRUPO) {
            GRUPO.patchValue({
              correoLada: item.correoLada || '',
              correoTelefono: item.correoTelefono || ''
            });
          }
        });
      }
    }

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

      if (this.consultaState.readonly) {
        this.customTemplate3Form.get('unidadesPropias')?.disable();
        this.customTemplate3Form.get('unidadesArrendadas')?.disable();
      }
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
      reconocimientoMutuo: this.formBuilder.control(''),
      paginaTextInput: this.formBuilder.control('', [Validators.required]),
      correoTextInput: this.formBuilder.control('', [Validators.required]),
      correosTelefonicos: this.formBuilder.array([], this.atLeastOneTelefonoFilled()),
      clasificacionInformacion: this.formBuilder.control(''),
    });

    if (this.consultaState.readonly) {
      this.transporteFerroviarioForm.get('reconocimientoMutuo')?.disable();
      this.transporteFerroviarioForm.get('clasificacionInformacion')?.disable();
      this.transporteFerroviarioForm.get('paginaTextInput')?.disable();
      this.transporteFerroviarioForm.get('correoTextInput')?.disable();
    }

    if (this.consultaState.update) {
      this.transporteFerroviarioForm.patchValue({
        senaleRadioInput: this.rubroTransporteFerrovariostate['senaleRadioInput'],
        reconocimientoMutuo: this.rubroTransporteFerrovariostate['reconocimientoMutuo'],
        paginaTextInput: this.rubroTransporteFerrovariostate['paginaTextInput'],
        correoTextInput: this.rubroTransporteFerrovariostate['correoTextInput'],
        clasificacionInformacion: this.rubroTransporteFerrovariostate['clasificacionInformacion']
      })
    }
  }

  createCorreoTelefonoGroup(): FormGroup {
    return this.formBuilder.group({
      correoLada: [''],
      correoTelefono: ['']
    });
  }

  addCorreoTelefonoGroup(): void {
    const GRUPO = this.createCorreoTelefonoGroup();
    if (this.consultaState?.readonly) {
      GRUPO.disable();
    }
    this.correosTelefonicos.push(GRUPO);
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
    if (event) {
      this.tramite32613Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  radioValorCambio(event: string | number, campo: string): void {
    if (event) {
      this.tramite32613Store.setDynamicFieldValue(campo, event);
    }
  }

  textValorCambio(event: Event, campo: string, index?: number): void {
    const CORREOS_ARRAY = this.transporteFerroviarioForm.get('correosTelefonicos') as FormArray;
    if (typeof index === 'number') {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      CORREOS_ARRAY.at(index).get(campo)?.setValue(INPUT_ELEMENT.value);
      const ARRAY_VALOR = CORREOS_ARRAY.getRawValue();
      this.tramite32613Store.setDynamicFieldValue('correosTelefonicos', ARRAY_VALOR);
    } else {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      this.tramite32613Store.setDynamicFieldValue(campo, INPUT_ELEMENT.value);
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

    if (event) {
      this.tramite32613Store.setDynamicFieldValue(event.campo, event.valor);
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

  emitirCambioValor(event: {campo: string, valor: string | number | object}): void {
    if (event) {
      this.tramite32613Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  customTemplate3Events(event: {campo: string, valor: string | number}): void {
    if (event.campo === 'unidadesArrendadas' && event.valor) {
      this.mostrarTemplate3Alerta = true;
    }
    if (event) {
      this.tramite32613Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  /** Este método es parte del ciclo de vida del componente y se ejecuta automáticamente cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones activas y evitar fugas de memoria en la aplicación.*/
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
