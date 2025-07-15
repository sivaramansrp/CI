import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, MenuConfig, Props, SeccionLibQuery, SeccionLibState, SeccionLibStore } from "@ng-mf/data-access-user";
import { DATOS_EXPORTACION, DATOS_EXPORTADOR, DATOS_FEDERAL, DATOS_MERCANCIA, DATOS_PRODUCTOR, DATOS_REALIZAR } from '../../constants/permiso-importacion-modification.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosGrupos } from "../../models/permiso-importacion-modification.model";
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { InputConfig } from '@ng-mf/data-access-user';
import { InputFechaComponent } from "@ng-mf/data-access-user";
import { InputRadioComponent } from "@ng-mf/data-access-user";
import { InputTypes } from '@ng-mf/data-access-user';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite130120Query } from '../../estados/permiso-importacion.query';



@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputFechaComponent, InputRadioComponent, CatalogoSelectComponent],
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  /**
   * Configuración de los grupos y campos del formulario.
   */
  configuracion: InputConfig[] = [
    {
      title: 'Datos del trámite a realizer',
      formGroupName: 'datosRealizer',
      menu: [
        // 0
        {
          inputType: InputTypes.SELECT,
          props: DATOS_REALIZAR[0] as unknown as Props,
          class: 'col-md-8',
        },
        // 1
        {
          inputType: InputTypes.SELECT,
          props: DATOS_REALIZAR[1] as unknown as Props,
          class: 'col-md-8',
        }
      ],
    },
    // 1
    {
      title: 'Datos de la mercancía',
      formGroupName: 'datosMercanica',
      menu: [
        // 0
        {
          inputType: InputTypes.TEXTAREA,
          props: DATOS_MERCANCIA[0] as unknown as Props,
          class: 'col-md-8',
        },
        // 1
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[1] as unknown as Props,
          class: 'col-md-8',
        },
        // 2
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[2] as unknown as Props,
          class: 'col-md-8',
        },
        // 3
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[3] as unknown as Props,
          class: 'col-md-8',
        },
        // 4
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[4] as unknown as Props,
          class: 'col-md-8',
        },
        // 5
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[5] as unknown as Props,
          class: 'col-md-4',
        },
        // 6
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[6] as unknown as Props,
          class: 'col-md-4',
        },
        // 7
        {
          inputType: InputTypes.DATE,
          props: DATOS_MERCANCIA[7] as unknown as Props,
          class: 'col-md-4',
        },
        // 8
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[8] as unknown as Props,
          class: 'col-md-4',
        },
        // 9
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[9] as unknown as Props,
          class: 'col-md-4',
        },
        // 10
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[10] as unknown as Props,
          class: 'col-md-4',
        },
        // 11
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[11] as unknown as Props,
          class: 'col-md-4',
        },
        // 12
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[12] as unknown as Props,
          class: 'col-md-4',
        },
        // 13
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[13] as unknown as Props,
          class: 'col-md-8',
        },
        // 14
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[14] as unknown as Props,
          class: 'col-md-8',
        },
        // 15
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[15] as unknown as Props,
          class: 'col-md-4',
        },
        // 16
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[16] as unknown as Props,
          class: 'col-md-4',
        },
        // 17
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[17] as unknown as Props,
          class: 'col-md-4',
        },
        // 18
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[18] as unknown as Props,
          class: 'col-md-4',
        },
        // 19
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[19] as unknown as Props,
          class: 'col-md-8',
        },
        // 20
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[20] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
    // 2
    {
      title: 'Documento de salida del país de exportación',
      formGroupName: 'datosExporta',
      menu: [
        // 0
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[0] as unknown as Props,
          class: 'col-md-4',
        },
        // 1
        {
          inputType: InputTypes.DATE,
          props: DATOS_EXPORTACION[1] as unknown as Props,
          class: 'col-md-4',
        },
        // 2
        {
          inputType: InputTypes.TEXTAREA,
          props: DATOS_EXPORTACION[2] as unknown as Props,
          class: 'col-md-8',
        },
        // 3
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[3] as unknown as Props,
          class: 'col-md-4',
        },
        // 4
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[4] as unknown as Props,
          class: 'col-md-4',
        },
        // 5
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[5] as unknown as Props,
          class: 'col-md-4',
        },
        // 6
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[6] as unknown as Props,
          class: 'col-md-4',
        },
      ],
    },
    // 3
    {
      title: 'Datos del productor',
      formGroupName: 'datosProductor',
      menu: [
        // 0
        {
          inputType: InputTypes.RADIO,
          props: DATOS_PRODUCTOR[0] as unknown as Props,
          class: 'col-md-8',
        },
        // 1
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[1] as unknown as Props,
          class: 'col-md-8',
        },
        // 2
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[2] as unknown as Props,
          class: 'col-md-8',
        },
        // 3
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[3] as unknown as Props,
          class: 'col-md-8',
        },
        // 4
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[4] as unknown as Props,
          class: 'col-md-8',
        },
        // 5
        {
          inputType: InputTypes.TEXTAREA,
          props: DATOS_PRODUCTOR[5] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
    // 4
    {
      title: 'Datos del exportador',
      formGroupName: 'datosExportador',
      menu: [
        // 0
        {
          inputType: InputTypes.RADIO,
          props: DATOS_EXPORTADOR[0] as unknown as Props,
          class: 'col-md-8',
        },
        // 1
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[1] as unknown as Props,
          class: 'col-md-8',
        },
        // 2
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[2] as unknown as Props,
          class: 'col-md-8',
        },
        // 3
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[3] as unknown as Props,
          class: 'col-md-8',
        },
        // 4
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[4] as unknown as Props,
          class: 'col-md-8',
        },
        // 5
        {
          inputType: InputTypes.TEXTAREA,
          props: DATOS_EXPORTADOR[5] as unknown as Props,
          class: 'col-md-8',
        },
        // 6
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[6] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
    {
      title: 'Representacion federal',
      formGroupName: 'datosFederal',
      menu: [
        // 0
        {
          inputType: InputTypes.SELECT,
          props: DATOS_FEDERAL[0] as unknown as Props,
          class: 'col-md-8',
        },
        // 1
        {
          inputType: InputTypes.SELECT,
          props: DATOS_FEDERAL[1] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
  ];
/**
 * Datos fiscales dinámicos.
 */
fiscal: FormularioDinamico[] = [];

/**
 * Formulario principal reactivo.
 */
formulario!: FormGroup;

/**
 * Objeto para eventos personalizados.
 */
evento = {};

/**
 * Tipos de input disponibles.
 */
inputTypes = InputTypes;

/**
 * Notificador para destruir suscripciones.
 */
public destroyNotifier$: Subject<void> = new Subject();

/**
 * Estado de la sección actual.
 */
private seccionState!: SeccionLibState;

/**
 * Incremento para el campo "otro umc".
 */
private otroUmcIncrement = 0;

/**
 * Tipo de persona seleccionada para el productor.
 */
tipoPersonaProductor: string = 'Física';

/**
 * Tipo de persona seleccionada para el exportador.
 */
tipoPersonaExportador: string = 'Física';
  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   *
   * @type {boolean}
   * @memberof TercerosRelacionadosContenedoraComponent
   * @default false
   */
  esFormularioSoloLectura: boolean = false;

  enableConversion: boolean = false;

  solicitudState!: DatosGrupos;
  isVisible= false;

  /**
   * Constructor del componente DatosDeLaSolicitudComponent.
   * Inicializa el formulario y configura los grupos de formularios basados en la configuración proporcionada.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param catalogosServicios - Servicio para obtener catálogos.
   * @param seccionStore - Store para manejar el estado de la sección.
   * @param seccionQuery - Query para obtener el estado de la sección.
   * @param permisoImportacionStore - Store para manejar el estado del permiso de importación.
   * @param tramiteQuery - Query para obtener datos del trámite.
   * @param store - Store para actualizar datos de grupos.
   * @param consultaQuery - Query para modo solo lectura.
   */

  constructor(
    public fb: FormBuilder,
    public catalogosServicios: CatalogosService,
    public seccionStore: SeccionLibStore,
    public seccionQuery: SeccionLibQuery,
    public permisoImportacionStore: PermisoImportacionStore,
    public tramiteQuery: Tramite130120Query,
    public store: PermisoImportacionStore,
    public consultaQuery: ConsultaioQuery
  ) {
    this.tramiteQuery.select().pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((storeValue) => {
      if (storeValue) {
        this.solicitudState = storeValue;
        if (
          storeValue.datosProductor &&
          storeValue.datosProductor.persona_tipo
        ) {
          this.tipoPersonaProductor = storeValue.datosProductor.persona_tipo;
        }
         if (
          storeValue.datosExportador &&
          storeValue.datosExportador.persona_tipo
        ) {
          this.tipoPersonaExportador = storeValue.datosExportador.persona_tipo;
        }
      }
    });
    this.crearFormulario();
  }

  /**
   * Inicializa el componente, configura los grupos del formulario y suscriptores.
   */
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
    this.seccionQuery.selectSeccionState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.seccionState = seccionState;
          })
        )
        .subscribe();
    this.seccionStore.establecerSeccion([false]);
    const IS_VALID = this.formulario.get('datosRealizer')?.valid &&
        this.formulario.get('datosMercanica')?.valid &&
        this.formulario.get('datosExporta')?.valid &&
        this.formulario.get('datosProductor')?.valid &&
        this.formulario.get('datosExportador')?.valid &&
        this.formulario.get('datosFederal')?.valid;
       
    if(IS_VALID) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true])
    }

    this.formulario.valueChanges.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((formValue) => {
      this.permisoImportacionStore.actualizarDatosGrupos(formValue);
      this.setFormGroupValidity();
    });

    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
  }

  /**
   * Crea el formulario principal e inicializa los subgrupos.
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      datosRealizer: this.fb.group({
        régimen: [this.solicitudState.datosRealizer.régimen, Validators.required],
        classifición_régimen: [this.solicitudState.datosRealizer.classifición_régimen, Validators.required]
      }),
      datosMercanica: this.fb.group({
        cantidad_umc: [this.solicitudState.datosMercanica.cantidad_umc],
        cantidad_umt: [this.solicitudState.datosMercanica.cantidad_umt],
        descripción: [this.solicitudState.datosMercanica.descripción],
        factor_conversión: [this.solicitudState.datosMercanica.factor_conversión],
        factura_fecha: [this.solicitudState.datosMercanica.factura_fecha],
        factura_número: [this.solicitudState.datosMercanica.factura_número],
        fracción: [this.solicitudState.datosMercanica.fracción],
        marca: [this.solicitudState.datosMercanica.marca],
        moneda_comercialización: [this.solicitudState.datosMercanica.moneda_comercialización],
        nico: [this.solicitudState.datosMercanica.nico],
        otro_umc: [this.solicitudState.datosMercanica.otro_umc],
        país_exportador: [this.solicitudState.datosMercanica.país_exportador],
        país_origen: [this.solicitudState.datosMercanica.país_origen],
        precio_unitario_usd: [this.solicitudState.datosMercanica.precio_unitario_usd],
        tipo_entrada: [this.solicitudState.datosMercanica.tipo_entrada],
        umc: [this.solicitudState.datosMercanica.umc],
        umt: [this.solicitudState.datosMercanica.umt],
        valor_factura: [this.solicitudState.datosMercanica.valor_factura],
        valor_factura_usd: [this.solicitudState.datosMercanica.valor_factura_usd],
        valor_total_factura: [this.solicitudState.datosMercanica.valor_total_factura],
        valor_total_factura_usd: [this.solicitudState.datosMercanica.valor_total_factura_usd],
      }),
      datosExporta: this.fb.group({
        cantidad_umt: [this.solicitudState.datosExporta.cantidad_umt],
        código_arancelario: [this.solicitudState.datosExporta.código_arancelario],
        descripción: [this.solicitudState.datosExporta.descripción],
        fecha_documento: [this.solicitudState.datosExporta.fecha_documento],
        número_documento: [this.solicitudState.datosExporta.número_documento],
        precio_unitario_usd: [this.solicitudState.datosExporta.precio_unitario_usd],
        valor_usd: [this.solicitudState.datosExporta.valor_usd],
      }),
      datosProductor: this.fb.group({
        denominación_razón_social: [this.solicitudState.datosProductor.denominación_razón_social],
        domicilio: [this.solicitudState.datosProductor.domicilio],
        persona_tipo: [this.solicitudState.datosProductor.persona_tipo],
        personales_nombre: [this.solicitudState.datosProductor.personales_nombre],
        primer_apellido: [this.solicitudState.datosProductor.primer_apellido],
        segundo_apellido: [this.solicitudState.datosProductor.segundo_apellido],
      }),
      datosExportador: this.fb.group({
        denominación_razón_social: [this.solicitudState.datosExportador.razón_social],
        domicilio: [this.solicitudState.datosExportador.domicilio],
        observaciones: [this.solicitudState.datosExportador.observaciones],
        persona_tipo: [this.solicitudState.datosExportador.persona_tipo],
        personales_nombre: [this.solicitudState.datosExportador.personales_nombre],
        primer_apellido: [this.solicitudState.datosExportador.primer_apellido],
        segundo_apellido: [this.solicitudState.datosExportador.segundo_apellido],
      }),
      datosFederal: this.fb.group({
        entidad_federativa: [this.solicitudState.datosFederal.entidad_federativa],
        representacion_federal: [this.solicitudState.datosFederal.representacion_federal],
      }),
    });
  }
  
  /**
   * Inicializa un grupo de formulario con controles y validadores.
   * @param configuracion Configuración de los campos.
   * @param nombreGrupo Nombre del grupo.
   * @param indiceGrupo Índice del grupo.
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
     let initialValue: string | number | null | undefined = '';
     if(campo.props.campo === 'factor_conversión') {
      initialValue = '1';
     }
     else if (campo.props.campo === 'cantidad_umt') {
      initialValue = '0.00';
     }
    if (nombreGrupo === 'datosMercanica' && menuIndex === 11) {
      initialValue = 1;
    }

    GRUPO.addControl(
      CONTROL_NAME,
      this.fb.control({ value: initialValue, disabled: campo.props.disabled }, VALIDATORS)
    );
    if (campo.inputType === InputTypes.SELECT) {
      this.obtenerValoresCatalogo(indiceGrupo, menuIndex, CONTROL_NAME);
    }
  });
  }

  /**
   * Obtiene los valores del catálogo y actualiza la configuración.
   * @param indiceGrupo Índice del grupo.
   * @param indiceMenu Índice del menú.
   * @param clave Clave del catálogo.
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
   * Genera validadores de Angular a partir de una lista de reglas.
   * @param validadores Lista de reglas.
   * @returns Arreglo de validadores.
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
   * Maneja el cambio de la fecha de factura.
   * @param evento Nueva fecha.
   */
  fechaCambiado(evento: string): void {
    this.formulario.patchValue({
        datosMercanica: { factura_fecha: evento },
      });
    this.permisoImportacionStore.setFacturaFecha(evento);
    this.setFormGroupValidity();
  }

  /**
   * Maneja el cambio de la fecha del documento de exportación.
   * @param evento Nueva fecha.
   */
  fechaDocumento(evento: string): void {
    this.formulario.patchValue({
        datosExportador: { fecha_documento: evento },
      });
    this.permisoImportacionStore.setFecha_documento(evento);
    this.setFormGroupValidity();
  }

  /**
   * Maneja la selección de un catálogo.
   * @param controlPath Ruta del control.
   * @param evento Valor seleccionado.
   */
  seleccionCatalogo(controlPath: string, evento: Event): void {
    this.formulario.get(controlPath)?.setValue(evento);

    const CONTROL = this.formulario.get(controlPath);
    if (CONTROL) {
      CONTROL.setValue(evento);
      CONTROL.markAsDirty();
      CONTROL.markAsTouched();
      this.permisoImportacionStore.actualizarDatosGrupos(this.formulario.value);
      this.setFormGroupValidity();
    }
  }

  /**
   * Establece valores en el store a partir del formulario.
   * @param form Formulario reactivo.
   * @param subformName Nombre del subformulario.
   * @param campo Campo a actualizar.
   * @param metodoNombre Método del store.
   */
  setValoresStore(
    form: FormGroup,
    subformName: string | FormGroup,
    campo: string,
    metodoNombre: keyof PermisoImportacionStore
  ): void {
    const CONTROL = form.get(`${subformName}.${campo}`);
    const VALOR = CONTROL?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);

    if (CONTROL) {
      CONTROL.markAsDirty();
      CONTROL.markAsTouched();
    }
    this.setFormGroupValidity();
    this.permisoImportacionStore.actualizarDatosGrupos(this.formulario.value);
  }

  /**
   * Maneja el cambio de UMC y actualiza el campo correspondiente.
   */
  onUmcChange(
    form: FormGroup,
    subformName: string | FormGroup,
    campo: string,
    metodoNombre: keyof PermisoImportacionStore,
    ): void {
  this.setValoresStore(form, subformName, campo, metodoNombre);

  const CONTROL = form.get(`${subformName}.${campo}`);
  const VALOR = CONTROL?.value;
  const UMCCATALOG = this.configuracion[1].menu[8].props.catalogos;
  if (UMCCATALOG && UMCCATALOG.length > 0) {
    const SELECTED = UMCCATALOG.find((item: {id: number, descripcion: string} ) => item.id === Number(VALOR));
    this.enableConversion = true
    if (SELECTED) {
      this.otroUmcIncrement = 10 * Number(SELECTED.id);
      const OTROUMCCONTROL = this.formulario.get('datosMercanica')?.get(this.configuracion[1].menu[9].props.campo);
      if (OTROUMCCONTROL) {
        OTROUMCCONTROL.setValue(this.otroUmcIncrement);
        OTROUMCCONTROL.markAsDirty();
        OTROUMCCONTROL.markAsTouched();
      }
    }
    const FACTORINPUT = document.getElementById('factor_conversión') as HTMLInputElement | null;
    if (FACTORINPUT) {
      FACTORINPUT.readOnly = false;
    }
  }
}


  /**
   * Calcula y actualiza la cantidad UMT en base a la cantidad UMC y el factor de conversión.
   */
  onCantidadUmcOrFactorChange(): void {
    const CANTIDAD_UMC = parseFloat(this.formulario.get('datosMercanica')?.get(this.configuracion[1].menu[10].props.campo)?.value);
    let FACTORCONVERSION = parseFloat(this.formulario.get('datosMercanica')?.get(this.configuracion[1].menu[11].props.campo)?.value);
    if (isNaN(FACTORCONVERSION)) {
      FACTORCONVERSION = 1;
    }
    const FACTORCONVERSIONCONTROL = this.formulario.get('datosMercanica')?.get('factor_conversión');
    FACTORCONVERSIONCONTROL?.setValue(FACTORCONVERSION);
    FACTORCONVERSIONCONTROL?.markAsDirty();
    FACTORCONVERSIONCONTROL?.markAsTouched();
    if (!isNaN(CANTIDAD_UMC) && !isNaN(FACTORCONVERSION)) {
      const RESULTADO = (CANTIDAD_UMC * FACTORCONVERSION).toFixed(2);
      const CANTIDAD_UMT_CONTROL = this.formulario.get('datosMercanica')?.get(this.configuracion[1].menu[12].props.campo);
      if (CANTIDAD_UMT_CONTROL) {
        CANTIDAD_UMT_CONTROL.setValue(RESULTADO);
        CANTIDAD_UMT_CONTROL.markAsDirty();
        CANTIDAD_UMT_CONTROL.markAsTouched();
      }
    }
  }

  /**
   * Calcula y actualiza el valor de factura en USD.
   */
  setMercanciaImportar(): void {
    const DATOSMERCANICA = this.formulario.get('datosMercanica');
    if (!DATOSMERCANICA) { return;}

    const VALOR_FACTURA = parseFloat(DATOSMERCANICA.get('valor_factura')?.value);
    const MONDEDACOMERCIALIZACION = DATOSMERCANICA.get('moneda_comercialización')?.value;

    let valorFacturaUsd = VALOR_FACTURA;
    if (MONDEDACOMERCIALIZACION) {
      valorFacturaUsd = VALOR_FACTURA * 3.27;
    }

    const VALORFACTURAUSDCONTROL = DATOSMERCANICA.get('valor_factura_usd');
    const PRECIOUNITARIOUSDCONTROL = DATOSMERCANICA.get('precio_unitario_usd');

    if (VALORFACTURAUSDCONTROL) {
      VALORFACTURAUSDCONTROL.setValue(valorFacturaUsd, { emitEvent: false });
      VALORFACTURAUSDCONTROL.markAsDirty();
      VALORFACTURAUSDCONTROL.markAsTouched();
    }
    if (PRECIOUNITARIOUSDCONTROL) {
      PRECIOUNITARIOUSDCONTROL.setValue(0, { emitEvent: false });
      PRECIOUNITARIOUSDCONTROL.markAsDirty();
      PRECIOUNITARIOUSDCONTROL.markAsTouched();
    }
  }

  /**
   * Calcula y actualiza el valor total de la mercancía en USD.
   */
  setTotalMercanciaImportar(): void {
    const DATOSMERCANICA = this.formulario.get('datosMercanica');
    if (!DATOSMERCANICA) { return; }

    const VALORTOTALFACTURA = parseFloat(DATOSMERCANICA.get('valor_total_factura')?.value);
    const RESULTADO = VALORTOTALFACTURA * 3.27;

    const VALORTOTALFACTURAUSDCONTROL = DATOSMERCANICA.get('valor_total_factura_usd');
    if (VALORTOTALFACTURAUSDCONTROL) {
      VALORTOTALFACTURAUSDCONTROL.setValue(RESULTADO, { emitEvent: false });
      VALORTOTALFACTURAUSDCONTROL.markAsDirty();
      VALORTOTALFACTURAUSDCONTROL.markAsTouched();
    }
  }

  /**
   * Cambia el valor seleccionado de un radio button.
   * @param claveRadio Clave del radio.
   * @param groupIndex Índice del grupo.
   * @param menuIndex Índice del menú.
   * @param evento Valor seleccionado.
   */
  cambioValorRadio(claveRadio: string, groupIndex: number, menuIndex: number, evento: string | number): void {
    this.configuracion[groupIndex].menu[menuIndex].props.radioSelectedValue = evento;
  }

  /**
   * Actualiza la validez de todos los grupos del formulario.
   */
  setFormGroupValidity(): void {
    const GRUPOS = ['datosRealizer', 'datosMercanica', 'datosExporta', 'datosProductor', 'datosExportador', 'datosFederal'];
    const ALLVALID = GRUPOS.every(grupo => {
      const GROUPCONTROL = this.formulario.get(grupo);
      return GROUPCONTROL && GROUPCONTROL.valid;
    });

    if (ALLVALID) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    }
  }

  /**
   * Maneja el cambio de tipo de persona para el productor y actualiza validadores y store.
   * @param value Nuevo tipo de persona.
   */
  onTipoPersonaProductorChange(value: string | number): void {
  this.tipoPersonaProductor = String(value);
  const GRUPO = this.formulario.get('datosProductor') as FormGroup;

  this.permisoImportacionStore.setPersona_tipo(this.tipoPersonaProductor);

  // Siempre requerido
  GRUPO.get('persona_tipo')?.setValidators([Validators.required]);
  GRUPO.get('persona_tipo')?.updateValueAndValidity();

  // Limpiar todos los validadores y valores primero
  GRUPO.get('personales_nombre')?.clearValidators();
  GRUPO.get('personales_nombre')?.setValue('');
  GRUPO.get('primer_apellido')?.clearValidators();
  GRUPO.get('primer_apellido')?.setValue('');
  GRUPO.get('segundo_apellido')?.clearValidators();
  GRUPO.get('segundo_apellido')?.setValue('');
  GRUPO.get('denominación_razón_social')?.clearValidators();
  GRUPO.get('denominación_razón_social')?.setValue('');
  GRUPO.get('domicilio')?.clearValidators();
  GRUPO.get('domicilio')?.setValue('');

  // Asignar validadores y limpiar solo los campos no visibles
  if (this.tipoPersonaProductor === 'Física') {
    GRUPO.get('personales_nombre')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('primer_apellido')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('segundo_apellido')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
    // "denominación_razón_social" no visible, limpiar valor y validadores
    GRUPO.get('denominación_razón_social')?.setValue('');
    GRUPO.get('denominación_razón_social')?.clearValidators();
    this.permisoImportacionStore.setDenominación_razón_social('');
  } else if (this.tipoPersonaProductor === 'Moral') {
    GRUPO.get('denominación_razón_social')?.setValidators([Validators.required, Validators.maxLength(250)]);
    GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
    // Los personales y apellidos no visibles, limpiar valor y validadores
    GRUPO.get('personales_nombre')?.setValue('');
    GRUPO.get('personales_nombre')?.clearValidators();
    GRUPO.get('primer_apellido')?.setValue('');
    GRUPO.get('primer_apellido')?.clearValidators();
    GRUPO.get('segundo_apellido')?.setValue('');
    GRUPO.get('segundo_apellido')?.clearValidators();
    this.permisoImportacionStore.setPersonales_nombre('');
    this.permisoImportacionStore.setPrimer_apellido('');
    this.permisoImportacionStore.setSegundo_apellido('');
  } else if (this.tipoPersonaProductor === 'Ninguno') {
    GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
    // Todos los demás no visibles, limpiar valor y validadores
    GRUPO.get('personales_nombre')?.setValue('');
    GRUPO.get('personales_nombre')?.clearValidators();
    GRUPO.get('primer_apellido')?.setValue('');
    GRUPO.get('primer_apellido')?.clearValidators();
    GRUPO.get('segundo_apellido')?.setValue('');
    GRUPO.get('segundo_apellido')?.clearValidators();
    GRUPO.get('denominación_razón_social')?.setValue('');
    GRUPO.get('denominación_razón_social')?.clearValidators();
    this.permisoImportacionStore.setPersonales_nombre('');
    this.permisoImportacionStore.setPrimer_apellido('');
    this.permisoImportacionStore.setSegundo_apellido('');
    this.permisoImportacionStore.setDenominación_razón_social('');
  }

  // Actualizar validez de todos los controles
  Object.keys(GRUPO.controls).forEach(key => GRUPO.get(key)?.updateValueAndValidity());
  this.setFormGroupValidity();
}

  /**
   * Maneja el cambio de tipo de persona para el exportador y actualiza validadores y store.
   * @param value Nuevo tipo de persona.
   */
  onTipoPersonaExportadorChange(value: string | number): void {
  this.tipoPersonaExportador = String(value);
  const GRUPO = this.formulario.get('datosExportador') as FormGroup;

  this.permisoImportacionStore.setExportadorPersona_tipo(this.tipoPersonaExportador);

  // Siempre requerido
  GRUPO.get('persona_tipo')?.setValidators([Validators.required]);
  GRUPO.get('persona_tipo')?.updateValueAndValidity();

  // Limpiar todos los validadores y valores primero
  GRUPO.get('personales_nombre')?.clearValidators();
  GRUPO.get('personales_nombre')?.setValue('');
  GRUPO.get('primer_apellido')?.clearValidators();
  GRUPO.get('primer_apellido')?.setValue('');
  GRUPO.get('segundo_apellido')?.clearValidators();
  GRUPO.get('segundo_apellido')?.setValue('');
  GRUPO.get('denominación_razón_social')?.clearValidators();
  GRUPO.get('denominación_razón_social')?.setValue('');
  GRUPO.get('domicilio')?.clearValidators();
  GRUPO.get('domicilio')?.setValue('');
  GRUPO.get('observaciones')?.clearValidators();
  GRUPO.get('observaciones')?.setValue('');

  if (this.tipoPersonaExportador === 'Física') {
    GRUPO.get('personales_nombre')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('primer_apellido')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('segundo_apellido')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('observaciones')?.setValidators([Validators.maxLength(4000)]);
    // "denominación_razón_social" no visible, limpiar valor y validadores
    GRUPO.get('denominación_razón_social')?.setValue('');
    GRUPO.get('denominación_razón_social')?.clearValidators();
    this.permisoImportacionStore.setExportadorDenominación_razón_social('');
  } else if (this.tipoPersonaExportador === 'Moral') {
    GRUPO.get('denominación_razón_social')?.setValidators([Validators.required, Validators.maxLength(250)]);
    GRUPO.get('domicilio')?.setValidators([Validators.required, Validators.maxLength(200)]);
    GRUPO.get('observaciones')?.setValidators([Validators.maxLength(4000)]);
    // Los personales y apellidos no visibles, limpiar valor y validadores
    GRUPO.get('personales_nombre')?.setValue('');
    GRUPO.get('personales_nombre')?.clearValidators();
    GRUPO.get('primer_apellido')?.setValue('');
    GRUPO.get('primer_apellido')?.clearValidators();
    GRUPO.get('segundo_apellido')?.setValue('');
    GRUPO.get('segundo_apellido')?.clearValidators();
    this.permisoImportacionStore.setExportadorPersonales_nombre('');
    this.permisoImportacionStore.setExportadorPrimer_apellido('');
    this.permisoImportacionStore.setExportadorSegundo_apellido('');
  }

  // Actualizar validez de todos los controles
  Object.keys(GRUPO.controls).forEach(key => GRUPO.get(key)?.updateValueAndValidity());
  this.setFormGroupValidity();
}

  /**
   * Limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}