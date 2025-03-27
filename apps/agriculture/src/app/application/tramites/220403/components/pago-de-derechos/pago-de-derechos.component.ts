import {
  CatalogosService,
  FormularioDinamico,
  InputConfig,
  InputTypes,
  LabelValueDatos,
  MenuConfig,
  Props,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { DATOS_PAGO_DERECHOS } from '../../constants/input-datos-config';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { PagoDerechos } from '../../models/acuicola.module';
import { Tramite220403Query } from '../../estados/tramite220403.query';
import { Tramite220403Store } from '../../estados/tramite220403.store';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  private destroyNotifier$: Subject<void> = new Subject();
  pagoDecheros!: PagoDerechos;
  configuracion: InputConfig[] = [
    {
      title: 'Pago de derechos',
      formGroupName: 'pagoDerechos',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PAGO_DERECHOS[0] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PAGO_DERECHOS[1] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PAGO_DERECHOS[2] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PAGO_DERECHOS[3] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.DATE,
          props: DATOS_PAGO_DERECHOS[4] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PAGO_DERECHOS[5] as unknown as Props,
          class: 'col-md-4',
        }
      ],
    },
  ];
  fiscal: FormularioDinamico[] = [];
  formulario!: FormGroup;
  evento = {};
  inputTypes = InputTypes;

  constructor(
    private fb: FormBuilder,
    private catalogosServicios: CatalogosService,
    private exportaccionAcuicolaServcios: ExportaccionAcuicolaService,
    private tramite220403Query: Tramite220403Query,
    private tramite220403store: Tramite220403Store,
  ) {
    this.crearFormulario();
  }

  /**
   * Crea el formulario principal e inicializa los subgrupos.
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      pagoDerechos: this.fb.group({}),
    });
  }

  ngOnInit(): void {
    this.configuracion.forEach((eachConfig: InputConfig, groupIndex: number) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName, groupIndex);
    });

    this.tramite220403Query.setPagoDerechos$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((state) => {
        this.formulario.get('pagoDerechos')?.patchValue(state);
      })
    )
    .subscribe();
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
    indiceGrupo: number
  ): void {
    const GRUPO = this.formulario.get(nombreGrupo) as FormGroup;
    configuracion.forEach((campo: MenuConfig, menuIndex: number) => {
      const VALIDATORS = campo.props.validators
        ? PagoDeDerechosComponent.getValidators(campo.props.validators)
        : [Validators.required];
      const CONTROL_NAME = campo.props.campo;
      GRUPO.addControl(
        CONTROL_NAME,
        this.fb.control(
          { value: '', disabled: campo.props.disabled },
          VALIDATORS
        )
      );
      if (campo.inputType === InputTypes.SELECT) {
        this.obtenerValoresCatalogo(indiceGrupo, menuIndex, CONTROL_NAME);
      }
      if (campo.inputType === InputTypes.RADIO) {
        this.getRadioData(campo.props.jsonDataFileName, (data) => {
          this.configuracion[1].menu[0].props.radioOptions = data;
          this.configuracion[1].menu[0].props.radioSelectedValue =
            data[0].value;
        });
      }
    });
  }

  /**
   * Obtenga las opciones de entrada de radio del servicio
   * @param fileName - Este es el nombre del archivo json que necesitamos para las opciones
   * @param callback - Función de devolución de llamada donde se establece la opción en el menú
   */
  getRadioData(
    fileName: string,
    callback: (data: LabelValueDatos[]) => void
  ): void {
    this.exportaccionAcuicolaServcios.getDatos(fileName).subscribe((data) => {
      callback(data);
    });
  }

  /**
   * Obtiene los valores del catálogo y actualiza la configuración.
   * @param indiceGrupo - El índice del grupo en la matriz de configuración.
   * @param indiceMenu - El índice del menú en el grupo.
   * @param clave - La clave para obtener los valores del catálogo.
   */
  obtenerValoresCatalogo(
    indiceGrupo: number,
    indiceMenu: number,
    clave: string
  ): void {
    this.catalogosServicios
      .getCatalogo(clave)
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((resp) => {
          if (resp.length > 0) {
            this.configuracion[indiceGrupo].menu[indiceMenu].props.catalogos =
              resp;
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
  cambioValorRadio(
    claveRadio: string,
    groupIndex: number,
    menuIndex: number,
    evento: string | number
  ): void {
    this.configuracion[groupIndex].menu[menuIndex].props.radioSelectedValue =
      evento;
  }

  onSubmit(): void {
    this.tramite220403store.setDatosRealizar(this.formulario.value.datosRealizar);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
