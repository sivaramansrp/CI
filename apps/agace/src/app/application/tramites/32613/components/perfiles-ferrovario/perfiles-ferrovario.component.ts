import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INFORMACION_GENERAL, OEA_TEMPLATE_ARRAY, OTROS_PROGRAMAS_TEMPLATE_ARRAY, PIP_TEMPLATE_ARRAY, TEMPLATE_1_ARRAY, TEMPLATE_2_ARRAY } from '../../constantes/constantes32613.enum';
import { RubroTransporteFerrovario32613State, Tramite32613Store } from '../../../../estados/tramites/tramite32613.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CapacitacionEnSeguridadComponent } from '../capacitacion-en-seguridad/capacitacion-en-seguridad.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { ControlesDeAccesoFisicaComponent } from '../controles-de-acceso-fisica/controles-de-acceso-fisica.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { GestionAduaneraComponent } from '../gestion-aduanera/gestion-aduanera.component';
import { ManejoEInvestigacionComponent } from '../manejo-e-investigacion/manejo-e-investigacion.component';
import { PlaneacionDeLaSeguridadComponent } from '../planeacion-de-la-seguridad/planeacion-de-la-seguridad.component';
import { RowTypeFormInput } from '../../../../shared/models/row-type-form-input.model';
import { RowTypeFormInputComponent } from '../../../../shared/components/row-type-form-input/row-type-form-input.component';
import { SeccionDinamica } from '@libs/shared/data-access-user/src/core/models/shared/seccion-dinamica.model';
import { SeccionDinamicaComponent } from '../../../../shared/components/seccion-dinamica/seccion-dinamica.component';
import { SeguridadDeLaInformacionComponent } from '../seguridad-de-la-informacion/seguridad-de-la-informacion.component';
import { SeguridadDeLosEquiposComponent } from '../seguridad-de-los-equipos/seguridad-de-los-equipos.component';
import { SeguridadDeProcesosComponent } from '../seguridad-de-procesos/seguridad-de-procesos.component';
import { SeguridadDelPersonalComponent } from '../seguridad-del-personal/seguridad-del-personal.component';
import { SeguridadFisicaComponent } from '../seguridad-fisica/seguridad-fisica.component';
import { SociosComercialsComponent } from '../socios-comercials/socios-comercials.component';
import { Tramite32613Query } from '../../../../estados/queries/tramite32613.query';

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
export class PerfilesFerrovarioComponent implements OnInit, AfterViewInit, OnDestroy {

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
      componentClase: GestionAduaneraComponent
    },
    {
      titulo: '7. Seguridad de los equipos ferrovarios de arrastre y vías férreas.',
      componentClase: SeguridadDeLosEquiposComponent
    },
    {
      titulo: '8. Seguridad del personal',
      componentClase: SeguridadDelPersonalComponent
    },
    {
      titulo: '9. Seguridad de la información y documentación',
      componentClase: SeguridadDeLaInformacionComponent
    },
    {
      titulo: '10. Capacitación en seguridad y concientización',
      componentClase: CapacitacionEnSeguridadComponent
    },
    {
      titulo: '11. Manejo e investigación de incidentes',
      componentClase: ManejoEInvestigacionComponent
    }
  ];

  /** Estado de la solicitud de la tramite 32613.*/
  public rubroTransporteFerrovariostate!: RubroTransporteFerrovario32613State;

  /** Subject para notificar la destrucción del componente.*/
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;

  constructor(
    private fb: FormBuilder,
    private tramite32613Store: Tramite32613Store,
    private tramite32613Query: Tramite32613Query,
    private consultaQuery: ConsultaioQuery,
  ) {
    //
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
    Array.from({ length: 3 }).forEach(() => this.addOtrasCertificacionesGroup());
    this.initializeCustomTemplate1Form(this.template1Array, this.customTemplate1Form);
    this.initializeCustomTemplate1Form(this.template2Array, this.customTemplate2Form);
    this.initializeCustomTemplate1Form(this.template3Array, this.customTemplate3Form);
    this.initializeCustomTemplate1Form(this.template4Array, this.customTemplate4Form);
    this.initializeCustomTemplate1Form(this.template5Array, this.customTemplate5Form);
    this.asignarValorCondicional();
  }

  asignarValorCondicional(): void {
    if (this.rubroTransporteFerrovariostate) {
      const CUSTOMS_TRADE_PARTNERSHIP = this.rubroTransporteFerrovariostate?.['customsTradePartnership'];
      const PIP = this.rubroTransporteFerrovariostate?.['pip'];
      const OEA = this.rubroTransporteFerrovariostate?.['oea'];
      const OTROS_PROGRAMAS = this.rubroTransporteFerrovariostate?.['otosProgramas'];

        if (CUSTOMS_TRADE_PARTNERSHIP === 'Si') {
          this.mostarCustomtemplate2 = true;
        } else {
          this.mostarCustomtemplate2 = false;
        }

        if (PIP === 'Si') {
          this.mostarCustomtemplate3 = true;
        } else {
          this.mostarCustomtemplate3 = false;
        }

        if (OEA === 'Si') {
          this.mostarCustomtemplate4 = true;
        } else {
          this.mostarCustomtemplate4 = false;
        }

        if (OTROS_PROGRAMAS === 'Si') {
          this.mostarCustomtemplate5 = true;
        } else {
          this.mostarCustomtemplate5 = false;
        }

        this.customTemplate1Form.patchValue({
          antiguedad: this.rubroTransporteFerrovariostate['antiguedad'],
          actividadPreponderante: this.rubroTransporteFerrovariostate['actividadPreponderante'],
          tipoDeServicio: this.rubroTransporteFerrovariostate['tipoDeServicio'],
          noDeEmbarquesEXP: this.rubroTransporteFerrovariostate['noDeEmbarquesEXP'],
          noDeEmbarquesIMP: this.rubroTransporteFerrovariostate['noDeEmbarquesIMP'],
          numeroDeEmpleados: this.rubroTransporteFerrovariostate['numeroDeEmpleados'],
          superficieDeLa: this.rubroTransporteFerrovariostate['superficieDeLa'],
        });

        this.customTemplate2Form.patchValue({
          nivel: this.rubroTransporteFerrovariostate['nivel'],
          ctpatAcc: this.rubroTransporteFerrovariostate['ctpatAcc'],
          tipoDeServicioCarga: this.rubroTransporteFerrovariostate['tipoDeServicioCarga'],
          mic: this.rubroTransporteFerrovariostate['mic'],
          fechaDeUltima: this.rubroTransporteFerrovariostate['fechaDeUltima']
        });

        this.customTemplate3Form.patchValue({
          numeroRegistro: this.rubroTransporteFerrovariostate['numeroRegistro']
        });

        this.customTemplate4Form.patchValue({
          nombreDelProgramaPais: this.rubroTransporteFerrovariostate['nombreDelProgramaPais'],
          oea_numeroRegistro: this.rubroTransporteFerrovariostate['oea_numeroRegistro']
        });

        this.customTemplate5Form.patchValue({
          nombreDelPrograma: this.rubroTransporteFerrovariostate['nombreDelPrograma'],
          otros_numeroRegistro: this.rubroTransporteFerrovariostate['otros_numeroRegistro'],
          vigencia: this.rubroTransporteFerrovariostate['vigencia']
        });

        if(this.rubroTransporteFerrovariostate?.['otrasCertificaciones']) {
          const VALORES = this.rubroTransporteFerrovariostate['otrasCertificaciones'];
          if (Array.isArray(VALORES)) {
            VALORES.forEach((item, index) => {
              const GRUPO = this.otrasCertificaciones.at(index);
              if (GRUPO) {
                GRUPO.patchValue({
                  nombre: item.nombre || '',
                  categoria: item.categoria || '',
                  vigencia: item.vigencia || ''
                });
              }
            });
          }
      }
    }
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

    if (this.consultaState.readonly) {
      form.disable();
    }
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
    const GRUPO = this.createOtrasCertificacionesGroup();
    if (this.consultaState?.readonly) {
      GRUPO.disable();
    }
    this.otrasCertificaciones.push(GRUPO);
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
    if (event) {
      this.tramite32613Store.setDynamicFieldValue(event.campo, event.valor);
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

  customTemplateEvents(event: {campo: string, valor: string | number}): void {
    if (event) {
      this.tramite32613Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  textValorCambio(event: Event, campo: string, index?: number): void {
    const OTRAS_ARRAY = this.perfilesFerrovarioForm.get('otrasCertificaciones') as FormArray;
    if (typeof index === 'number') {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      OTRAS_ARRAY.at(index).get(campo)?.setValue(INPUT_ELEMENT.value);
      const ARRAY_VALOR = OTRAS_ARRAY.getRawValue();
      this.tramite32613Store.setDynamicFieldValue('otrasCertificaciones', ARRAY_VALOR);
    }
  }

  /** Este método es parte del ciclo de vida del componente y se ejecuta automáticamente cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones activas y evitar fugas de memoria en la aplicación.*/
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
