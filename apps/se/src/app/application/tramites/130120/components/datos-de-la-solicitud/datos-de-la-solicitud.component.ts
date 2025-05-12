import { CatalogoSelectComponent, MenuConfig, Props, SeccionLibQuery, SeccionLibState, SeccionLibStore } from "@ng-mf/data-access-user";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DATOS_EXPORTACION, DATOS_EXPORTADOR, DATOS_MERCANCIA, DATOS_PRODUCTOR, DATOS_REALIZAR } from '../../constants/permiso-importacion-modification.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { InputConfig } from '@ng-mf/data-access-user';
import { InputFechaComponent } from "@ng-mf/data-access-user";
import { InputRadioComponent } from "@ng-mf/data-access-user";
import { InputTypes } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";


@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputFechaComponent, InputRadioComponent, CatalogoSelectComponent],
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  
  configuracion: InputConfig[] = [
    {
      title: 'Datos del trámite a realizer',
      formGroupName: 'datosRealizer',
      menu: [
        {
          inputType: InputTypes.SELECT,
          props: DATOS_REALIZAR[0] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_REALIZAR[1] as unknown as Props,
          class: 'col-md-8',
        }
      ],
    },
    {
      title: 'Datos de la mercancia',
      formGroupName: 'datosMercanica',
      menu: [
        {
          inputType: InputTypes.TEXTAREA,
          props: DATOS_MERCANCIA[0] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[1] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[2] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[3] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[4] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[5] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[6] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.DATE,
          props: DATOS_MERCANCIA[7] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[8] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[9] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[10] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[11] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[12] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[13] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[14] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[15] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[16] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[17] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[18] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[19] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[20] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
    {
      title: 'Documento de salida del pais de exportacion',
      formGroupName: 'datosExporta',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[0] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.DATE,
          props: DATOS_EXPORTACION[1] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXTAREA,
          props: DATOS_EXPORTACION[2] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[3] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[4] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[5] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[6] as unknown as Props,
          class: 'col-md-4',
        },
      ],
    },
    {
      title: 'Datos del productor',
      formGroupName: 'datosProductor',
      menu: [
        {
          inputType: InputTypes.RADIO,
          props: DATOS_PRODUCTOR[0] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[1] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[2] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[3] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[4] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXTAREA,
          props: DATOS_PRODUCTOR[5] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
    {
      title: 'Datos del exportador',
      formGroupName: 'datosExportador',
      menu: [
        {
          inputType: InputTypes.RADIO,
          props: DATOS_EXPORTADOR[0] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [] as unknown as Props,
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[1] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[2] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[3] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[4] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXTAREA,
          props: DATOS_EXPORTADOR[5] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[6] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
  ];
  fiscal: FormularioDinamico[] = [];
  formulario!: FormGroup;
  evento = {};
  inputTypes = InputTypes;

  private destroyNotifier$: Subject<void> = new Subject();

  private seccionState!: SeccionLibState;

  constructor(private fb: FormBuilder, private catalogosServicios: CatalogosService,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    const PERSONA_EXPORTADOR = [
      {
        "label": "Física",
        "value": "Física"
      },
      {
        "label": "Moral",
        "value": "Moral"
      }
    ];
    const PERSONA_PRODUCTOR = [
      {
        "label": "Física",
        "value": "Física"
      },
      {
        "label": "Moral",
        "value": "Moral"
      },
      {
        "label": "Ninguno",
        "value": "Ninguno"
      }
    ];
    this.configuracion[3].menu[0].props.radioOptions = PERSONA_PRODUCTOR;
    this.configuracion[3].menu[0].props.radioSelectedValue = PERSONA_PRODUCTOR[0].value;
    this.configuracion[4].menu[0].props.radioOptions = PERSONA_EXPORTADOR;
    this.configuracion[4].menu[0].props.radioSelectedValue = PERSONA_EXPORTADOR[0].value;
    this.configuracion.forEach((eachConfig: InputConfig, groupIndex: number) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName, groupIndex);
    });
    this.seccionQuery.selectSeccionState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.seccionState = seccionState;
          })
        )
        .subscribe();
    this.seccionStore.establecerSeccion([false]);
    const isValid = this.formulario.get('datosRealizer')?.valid &&
        this.formulario.get('datosMercanica')?.valid &&
        this.formulario.get('datosExporta')?.valid &&
        this.formulario.get('datosProductor')?.valid &&
        this.formulario.get('datosExportador')?.valid;

    if(isValid) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true])
    }
  }
  
  /**
   * Crea el formulario principal e inicializa los subgrupos.
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      datosRealizer: this.fb.group({}),
      datosMercanica: this.fb.group({}),
      datosExporta: this.fb.group({}),
      datosProductor: this.fb.group({}),
      datosExportador: this.fb.group({}),
    });
  }
  
  /**
   * Inicializa un grupo de formularios con controles basados en la configuración proporcionada.
   * @param configuracion - La configuración para los controles del formulario.
   * @param nombreGrupo - El nombre del grupo de formularios.
   * @param indiceGrupo - El índice del grupo en la matriz de configuración.
   */
  inicializarFormGroup(
    configuracion: MenuConfig[],
    nombreGrupo: string,
    indiceGrupo: number,
  ): void {
    const GRUPO = this.formulario.get(nombreGrupo) as FormGroup;
    configuracion.forEach((campo: MenuConfig, menuIndex: number) => {
      const VALIDATORS = campo.props.validators ? DatosDeLaSolicitudComponent.getValidators(campo.props.validators) : [Validators.required];
      const CONTROL_NAME = campo.props.campo;
      GRUPO.addControl(
        CONTROL_NAME,
        this.fb.control({ value: '', disabled: campo.props.disabled }, VALIDATORS)
      );
      if (campo.inputType === InputTypes.SELECT) {
        this.obtenerValoresCatalogo(indiceGrupo, menuIndex, CONTROL_NAME);
      }
    });
  }

  /**
   * Obtiene los valores del catálogo y actualiza la configuración.
   * @param indiceGrupo - El índice del grupo en la matriz de configuración.
   * @param indiceMenu - El índice del menú en el grupo.
   * @param clave - La clave para obtener los valores del catálogo.
   */
  obtenerValoresCatalogo(indiceGrupo: number, indiceMenu: number, clave: string): void {
    this.catalogosServicios
      .getCatalogo(clave)
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((resp) => {
          if (resp.length > 0) {
            this.configuracion[indiceGrupo].menu[indiceMenu].props.catalogos = resp;
          }
        })
      )
      .subscribe();
  }

  /**
   * Genera una matriz de validadores de formularios basada en los patrones proporcionados.
   * @param validadores - Una matriz de patrones regex que se utilizarán para la validación.
   * @returns Una matriz de validadores de formularios.
   */
  static getValidators(validadores: string[]): ValidatorFn[] {
    const FORM_VALIDATORS: ValidatorFn[] = [];
    validadores.forEach((validadore) => {
      if (validadore === 'required') {
        FORM_VALIDATORS.push(Validators.required);
      } else if (validadore.includes('maxLength')) {
        const MAX = validadore.split(':')[1];
        FORM_VALIDATORS.push(Validators.maxLength(Number(MAX)));
      } else if (validadore.includes('pattern')) {
        const PATTERN = validadore.split(':')[1];
        FORM_VALIDATORS.push(Validators.pattern(PATTERN));
      }
    });
    return FORM_VALIDATORS;
  }

  /**
   * Maneja el evento de cambio para la entrada de fecha.
   * @param evento - El nuevo valor de la fecha como cadena.
   */
  fechaCambiado(evento: string): void {
    // Manejar cambio de fecha
    this.evento = evento;
  }

  /**
   * Maneja el evento de selección para un catálogo.
   * @param nombreControlFormulario - El nombre del control del formulario a actualizar.
   * @param evento - El valor seleccionado del catálogo.
   */
  seleccionCatalogo(nombreControlFormulario: string, evento: Event): void {
    this.formulario.get(nombreControlFormulario)?.setValue(evento);
  }

  /**
   * Maneja el evento de cambio para una entrada de radio.
   * @param claveRadio - La clave de la entrada de radio.
   * @param evento - El nuevo valor de la entrada de radio.
   */
  cambioValorRadio(claveRadio: string, groupIndex: number, menuIndex: number, evento: string | number): void {
    this.configuracion[groupIndex].menu[menuIndex].props.radioSelectedValue = evento;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}