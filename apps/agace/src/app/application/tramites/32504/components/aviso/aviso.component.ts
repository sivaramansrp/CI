import { BotonAccionesTipos, InputTypes } from '@ng-mf/data-access-user';
import { CARGO_TIPO, DATOS_EMPRESA } from '../../constants/aviso.enum';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormaValidators, InputConfig, MenuConfig, Props } from '@ng-mf/data-access-user';
import { AvisoDatosService } from '../../services/aviso-datos.service';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { CatalogosService } from '@ng-mf/data-access-user';
import { ColumnasTabla } from '../../models/aviso.model';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { InputFechaComponent } from "@ng-mf/data-access-user";
import { InputRadioComponent } from "@ng-mf/data-access-user";
import { LabelValueDatos } from '@ng-mf/data-access-user';
import { ManualAvisoComponent } from '../manual-aviso/manual-aviso.component';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite32504Store } from '../../estados/tramite32504.store';
import { map } from 'rxjs';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, ManualAvisoComponent, CargaMasivaComponent, TablaDinamicaComponent],
  providers: [AvisoDatosService],
  standalone: true,
})
export class AvisoComponent implements OnInit {
  configuracion: InputConfig[] = [
    {
      title: 'Datos de la empresa IMMEX que transfiere y presenta el aviso, asi como del mes al que corresponde',
      formGroupName: 'datosEmpresa',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EMPRESA[0] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EMPRESA[1] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_EMPRESA[2] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_EMPRESA[3] as unknown as Props,
          class: 'col-md-4',
        }
      ],
    },
    {
      title: 'Tipo de carga',
      formGroupName: 'cargaTipo',
      menu: [
        {
          inputType: InputTypes.RADIO,
          props: CARGO_TIPO[0] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
  ];
  fiscal: FormularioDinamico[] = [];
  formulario!: FormGroup;
  tableData: {
    headers: {
      encabezado: string,
      clave: (ele: ColumnasTabla) => string,
      orden: number
    }[],
    data: [],
  } = {
      headers:
      [
        { encabezado: 'RFC', clave: (ele: ColumnasTabla) => ele.rfc, orden: 1 },
        {
          encabezado: 'Nombre comercial',
          clave: (ele: ColumnasTabla) => ele.nombreComercial,
          orden: 2,
        },
        {
          encabezado: 'Entidad federativa',
          clave: (ele: ColumnasTabla) => ele.entidadFederativa,
          orden: 3,
        },
        {
          encabezado: 'Alcaldía o Municipio',
          clave: (ele: ColumnasTabla) => ele.alcaldioOMuncipio,
          orden: 4,
        },
        {
          encabezado: 'Colonia',
          clave: (ele: ColumnasTabla) => ele.colonia,
          orden: 5,
        },
      ],
      data: []
    };
  esManualAsivoAgregarClicked = false;
  botonAccionesTipos = BotonAccionesTipos;
  TablaSeleccion = TablaSeleccion;
  evento = {};
  inputTypes = InputTypes;
  cargaTipo = {
    MANUAL: 'manual',
    CARGA_MASIVA: 'carga_masiva',
  };

  constructor(
    private fb: FormBuilder,
    private catalogosServicios: CatalogosService,
    private store: Tramite32504Store,
    private avisoDatosService: AvisoDatosService,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.configuracion.forEach((eachConfig: InputConfig, groupIndex: number) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName, groupIndex);
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
      const VALIDATORS = campo.props.validators ? AvisoComponent.obtenerValidadores(campo.props.validators) : [Validators.required];
      const CONTROL_NAME = campo.props.campo ? campo.props.campo : campo.props.labelNombre;
      GRUPO.addControl(
        CONTROL_NAME,
        this.fb.control({ value: '', disabled: campo.props.disabled }, VALIDATORS)
      );
      if (campo.inputType === InputTypes.SELECT) {
        // Utilice la siguiente línea una vez que la API funcione bien para obtener los valores del catálogo
        // this.obtenerValoresCatalogo(indiceGrupo, menuIndex, CONTROL_NAME);
      }
      if (campo.inputType === InputTypes.RADIO) {
        this.getRadioData(campo.props.jsonDataFileName, (data) => {
          this.configuracion[1].menu[0].props.radioOptions = data;
          this.configuracion[1].menu[0].props.radioSelectedValue = data[0].value;
        });
      }
    });
  }

  /**
  * Obtenga las opciones de entrada de radio del servicio
  * @param fileName - Este es el nombre del archivo json que necesitamos para las opciones
  * @param callback - Función de devolución de llamada donde se establece la opción en el menú
  */
  getRadioData(fileName: string, callback: (data: LabelValueDatos[]) => void): void {
    this.avisoDatosService.getDatos(fileName)
      .subscribe((data) => {
        callback(data);
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
        map((resp) => {
          if (resp.length > 0) {
            this.configuracion[indiceGrupo].menu[indiceMenu].props.catalogos = resp;
          }
        })
      )
      .subscribe();
  }

  /**
   * Crea el formulario principal e inicializa los subgrupos.
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      datosEmpresa: this.fb.group({}),
      cargaTipo: this.fb.group({}),
      manualDatos: this.fb.group({}),
    });
  }

  /**
   * Genera una matriz de validadores de formularios basada en los patrones proporcionados.
   * @param validadores - Una matriz de patrones regex que se utilizarán para la validación.
   * @returns Una matriz de validadores de formularios.
   */
  static obtenerValidadores(validadores: string[]): ValidatorFn[] {
    const FORM_VALIDATORS: ValidatorFn[] = [];
    validadores.forEach((validadore) => {
      if (validadore === FormaValidators.REQUIRED) {
        FORM_VALIDATORS.push(Validators.required);
      } else if (validadore.includes(FormaValidators.MAX_LENGTH)) {
        const MAX = validadore.split(':')[1];
        FORM_VALIDATORS.push(Validators.maxLength(Number(MAX)));
      } else if (validadore.includes(FormaValidators.PATTERN)) {
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

  /**
   * La función maneja las acciones del botón.
   * @param accione - Parámetro que tiene la acción de ser del tipo BotonAccionesTipos.
   */
  accionesBotones(accione: BotonAccionesTipos): void {
    switch (accione) {
      case BotonAccionesTipos.AGREGAR:
        this.esManualAsivoAgregarClicked = true;
        break;
      case BotonAccionesTipos.ELIMINAR:
        
        break;
      case BotonAccionesTipos.MODIFICAR:
        
        break;
    
      default:
        break;
    }
  }

  onSubmit(): void {
    this.store.setDatosEmpresa(this.formulario.value.datosEmpresa);
    this.store.setCargaTipo(this.formulario.value.cargaTipo);
  }
}
