import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INFORMACION_GENERAL, OEA_TEMPLATE_ARRAY, OTROS_PROGRAMAS_TEMPLATE_ARRAY, PIP_TEMPLATE_ARRAY, TEMPLATE_1_ARRAY, TEMPLATE_2_ARRAY } from '../../constantes/constantes32613.enum';
import { CommonModule } from '@angular/common';
import { ControlesDeAccesoFisicaComponent } from '../controles-de-acceso-fisica/controles-de-acceso-fisica.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { PlaneacionDeLaSeguridadComponent } from '../planeacion-de-la-seguridad/planeacion-de-la-seguridad.component';
import { RowTypeFormInput } from '../../../../shared/models/row-type-form-input.model';
import { RowTypeFormInputComponent } from '../../../../shared/components/row-type-form-input/row-type-form-input.component';
import { SeccionDinamica } from '@libs/shared/data-access-user/src/core/models/shared/seccion-dinamica.model';
import { SeccionDinamicaComponent } from '../../../../shared/components/seccion-dinamica/seccion-dinamica.component';
import { SeguridadFisicaComponent } from '../seguridad-fisica/seguridad-fisica.component';
import { SociosComercialsComponent } from '../socios-comercials/socios-comercials.component';
import { SeguridadDeProcesosComponent } from '../seguridad-de-procesos/seguridad-de-procesos.component';

@Component({
  selector: 'perfiles-ferrovario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    RowTypeFormInputComponent,
    SeccionDinamicaComponent
  ],
  templateUrl: './perfiles-ferrovario.component.html',
  styleUrl: './perfiles-ferrovario.component.scss',
})
export class PerfilesFerrovarioComponent implements OnInit, AfterViewInit {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  @ViewChild('customTemplate3') customTemplate3!: TemplateRef<unknown>;

  @ViewChild('customTemplate4') customTemplate4!: TemplateRef<unknown>;

  @ViewChild('customTemplate5') customTemplate5!: TemplateRef<unknown>;

  @ViewChild('customTemplate6') customTemplate6!: TemplateRef<unknown>;

  public perfilesFerrovarioForm!: FormGroup;

  public formDataInformacionGeneral = INFORMACION_GENERAL;

  public template1Array = TEMPLATE_1_ARRAY;

  public template2Array = TEMPLATE_2_ARRAY;

  public template3Array = PIP_TEMPLATE_ARRAY;

  public template4Array = OEA_TEMPLATE_ARRAY;

  public template5Array = OTROS_PROGRAMAS_TEMPLATE_ARRAY;

  public customTemplate1Form: FormGroup = new FormGroup({});

  public customTemplate2Form: FormGroup = new FormGroup({});

  public customTemplate3Form: FormGroup = new FormGroup({});

  public customTemplate4Form: FormGroup = new FormGroup({});

  public customTemplate5Form: FormGroup = new FormGroup({});

  public templateMap: Record<string, TemplateRef<unknown>> = {};

  public mostarCustomtemplate2: boolean = false;

  public mostarCustomtemplate3: boolean = false;

  public mostarCustomtemplate4: boolean = false;

  public mostarCustomtemplate5: boolean = false;

  public perfilesSecciones: SeccionDinamica[] = [
    {
      titulo: '1. Planeación de la seguridad en la cadena de suministros',
      componentClase: PlaneacionDeLaSeguridadComponent
    },
    {
      titulo: '2. Seguridad física',
      componentClase: SeguridadFisicaComponent
    },
    {
      titulo: '3. Controles de acceso física',
      componentClase: ControlesDeAccesoFisicaComponent
    },
    {
      titulo: '4. Socios comerciales',
      componentClase: SociosComercialsComponent
    },
    {
      titulo: '5. Seguridad de procesos',
      componentClase: SeguridadDeProcesosComponent
    },
    {
      titulo: '6. Gestión aduanera',
      // componentClase: DatosComunesTresComponent
    },
    {
      titulo: '7. Seguridad de los equipos ferrovarios de arrastre y vías férreas.',
      // componentClase: DatosComunesTresComponent
    },
    {
      titulo: '8. Seguridad del personal',
      // componentClase: DatosComunesTresComponent
    },
    {
      titulo: '9. Seguridad de la información y documentación',
      // componentClase: DatosComunesTresComponent
    },
    {
      titulo: '10. Capacitación en seguridad y concientización',
      // componentClase: DatosComunesTresComponent
    },
    {
      titulo: '11. Manejo e investigación de incidentes',
      // componentClase: DatosComunesTresComponent
    }
  ];

  constructor(
    private fb: FormBuilder
  ) {
    //
  }

  ngOnInit(): void {
    this.initializeForm();
    Array.from({ length: 3 }).forEach(() => this.addOtrasCertificacionesGroup());
    this.initializeCustomTemplate1Form(this.template1Array, this.customTemplate1Form);
    this.initializeCustomTemplate1Form(this.template2Array, this.customTemplate2Form);
    this.initializeCustomTemplate1Form(this.template3Array, this.customTemplate3Form);
    this.initializeCustomTemplate1Form(this.template4Array, this.customTemplate4Form);
    this.initializeCustomTemplate1Form(this.template5Array, this.customTemplate5Form);
  }

  // eslint-disable-next-line class-methods-use-this
  initializeCustomTemplate1Form(array: RowTypeFormInput[], form: FormGroup): void {
    array.forEach(campo => {
      if (typeof campo.formControlName === 'string') {
        form.addControl(
          campo.formControlName,
          new FormControl('', campo.required ? Validators.required : [])
        );
      }
    });
  }

  initializeForm(): void {
    this.perfilesFerrovarioForm = this.fb.group({
      ninoFormGroup: this.fb.group({}),
      otrasCertificaciones: this.fb.array([]),
    })
  }

  createOtrasCertificacionesGroup(): FormGroup {
    return this.fb.group({
      nombre: [''],
      categoria: [''],
      vigencia: ['']
    });
  }

  addOtrasCertificacionesGroup(): void {
    (this.perfilesFerrovarioForm.get('otrasCertificaciones') as FormArray).push(this.createOtrasCertificacionesGroup());
  }

  get otrasCertificaciones(): FormArray {
    return this.perfilesFerrovarioForm.get('otrasCertificaciones') as FormArray;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`*/
  get ninoFormGroup(): FormGroup {
    return this.perfilesFerrovarioForm.get('ninoFormGroup') as FormGroup;
  }

  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    if (event.campo === 'customsTradePartnership') {
      if (event.valor === 'Si') {
        this.mostarCustomtemplate2 = true;
      } else {
        this.mostarCustomtemplate2 = false;
      }
    }

    if (event.campo === 'pip') {
      if (event.valor === 'Si') {
        this.mostarCustomtemplate3 = true;
      } else {
        this.mostarCustomtemplate3 = false;
      }
    }

    if (event.campo === 'oea') {
      if (event.valor === 'Si') {
        this.mostarCustomtemplate4 = true;
      } else {
        this.mostarCustomtemplate4 = false;
      }
    }

    if (event.campo === 'otosProgramas') {
      if (event.valor === 'Si') {
        this.mostarCustomtemplate5 = true;
      } else {
        this.mostarCustomtemplate5 = false;
      }
    }
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
}
