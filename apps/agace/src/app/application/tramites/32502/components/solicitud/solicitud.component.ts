import { CATALOGOS_ID, InputFecha } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud32502State, Tramite32502Store } from '../../../../estados/tramites/tramite32502.store';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { AvisoService } from '../../services/aviso.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';
import { Tramite32502Query } from '../../../../estados/queries/tramite32502.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';


/**
 * Componente para la vista de la solicitud de la sección de "32502".
 */
@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl:'./solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
    /**
   * Representa la fecha de inicio ingresada por el usuario.
   * 
   * @type {InputFecha}
   * @default FECHA_INGRESO
   */
    public fechaInicioInput: InputFecha = {
      labelNombre: 'Fecha Aproximada Importacion',
      required: false,
      habilitado: false,
    };

  /**
   * Lista de catálogos de fracción arancelaria.
   */
  fraccionArancelaria!: Catalogo[];

  /**
   * Lista de catálogos de fracción regla.
   */
  fraccionRegla!: Catalogo[];
  

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32502State;

  /**
   * Formulario principal de la solicitud.
   */
  FormSolicitud!: FormGroup;

  /**
   * Mensaje declaración de responsabilidad solidaria.
   * @property {string} declaracionDeResponsabilidadSolidaria - Mensaje mostrado declaración de responsabilidad solidaria.
   */
  declaracionDeResponsabilidadSolidaria : string = TEXTOS.DECLARACION_DE_RESPONSABILIDAD_SOLIDARIA;
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Constructor del componente.
   * @param avisoService Servicio para obtener datos de PEXIM.
   * @param fb FormBuilder para crear formularios.
   * @param validacionesService Servicio para validaciones de formularios.
   * @param tramite32502Store Almacén de estado para el trámite 32502.
   */
  constructor(
    private avisoService: AvisoService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    public tramite32502Store: Tramite32502Store,
     private tramite32502Query: Tramite32502Query
  ) {
    // Inicializar el formulario principal
    this.crearFormSolicitud();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes acciones:
   * 1. Inicializa los catálogos necesarios para el formulario.
   * 2. Selecciona los valores iniciales para los catálogos de fraccian de arancelaria, regla.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
    this.tramite32502Query.select()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.solicitudState = state;
        this.crearFormSolicitud();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Obtiene el grupo de formulario 'adaceForm' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'adaceForm'.
   */
  get adaceForm(): FormGroup {
    return this.FormSolicitud.get('adaceForm') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'extranjeroAvisoAgace' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'extranjeroAvisoAgace'.
   */
  get extranjeroAvisoAgace(): FormGroup {
    return this.FormSolicitud.get('extranjeroAvisoAgace') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'mercanciaST' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'mercanciaST'.
   */
  get mercanciaST(): FormGroup {
    return this.FormSolicitud.get('mercanciaST') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'direccionST' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'direccionST'.
   */
  get direccionST(): FormGroup {
    return this.FormSolicitud.get('direccionST') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'pedimentoST' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'pedimentoST'.
   */
  get pedimentoST(): FormGroup {
    return this.FormSolicitud.get('pedimentoST') as FormGroup;
  }

  /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Método para crear el formulario principal de la solicitud.
   */
  crearFormSolicitud(): void {
    this.FormSolicitud = this.fb.group({
      adaceForm: this.fb.group({
        adace: [
          { value: this.solicitudState?.adace || 'Centro', disabled: true }
        ]
      }),
      extranjeroAvisoAgace: this.fb.group({
        razonSocial: [
          this.solicitudState?.razonSocial || '',
          Validators.required
        ],
        rfc: [
          this.solicitudState?.rfc,
          Validators.required
        ],
        rfcExtranjero: [
          this.solicitudState?.rfcExtranjero,
          Validators.required
        ]
      }),
      mercanciaST: this.fb.group({
        cveFraccionArancelaria: [
          this.solicitudState?.cveFraccionArancelaria,
          Validators.required
        ],
        reglaFraccion: [
          this.solicitudState?.reglaFraccion,
          Validators.required
        ],
        nico: [
          this.solicitudState?.nico,
          Validators.required
        ],
        valorUSD: [
          this.solicitudState?.valorUSD,
          Validators.required
        ],
        marca: [
          this.solicitudState?.marca,
          Validators.required
        ],
        peso: [
          this.solicitudState?.peso,
          Validators.required
        ],
        fechaInicio: [
          this.solicitudState?.fechaInicio,
          Validators.required
        ],
        numeroSerie: [
          this.solicitudState?.numeroSerie,
          Validators.required
        ],
        descripcionMercancia: [
          this.solicitudState?.descripcionMercancia,
          Validators.required
        ]
      }),
      direccionST: this.fb.group({
        informacionExtra: [
          this.solicitudState?.informacionExtra,
          Validators.required
        ],
        entidadFederativa: [
          this.solicitudState?.entidadFederativa,
          Validators.required
        ],
        delegacionMunicipio: [
          this.solicitudState?.delegacionMunicipio,
          Validators.required
        ],
        colonia: [
          this.solicitudState?.colonia,
          Validators.required
        ],
        calle: [
          this.solicitudState?.calle,
          Validators.required
        ],
        numeroExterior: [
          this.solicitudState?.numeroExterior,
          Validators.required
        ],
        numeroInterior: [
          this.solicitudState?.numeroInterior,
          Validators.required
        ],
        codigoPostal: [
          this.solicitudState?.codigoPostal,
          Validators.required
        ]
      }),
      pedimentoST: this.fb.group({
        patenteAutorizacion: [
          this.solicitudState?.patenteAutorizacion,
          Validators.required
        ],
        rfcAgenteAduanal: [
          this.solicitudState?.rfcAgenteAduanal,
          Validators.required
        ],
        numeroPedimento: [
          this.solicitudState?.numeroPedimento,
          Validators.required
        ],
        claveAduana: [
          this.solicitudState?.claveAduana,
          Validators.required
        ]
      })
    });
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  public inicializaCatalogos(): void {

    const FRACCION_ARANCELATIA$ = this.avisoService
      .getFraccionArancelariaCatalogo(CATALOGOS_ID.CAT_FRACCION_ARANCELARIA)
      .pipe(
        map((resp) => {
          this.fraccionArancelaria = resp.data;
        })
      );

    const REGLA_ARANCELARIA$ = this.avisoService
      .getFraccionReglaCatalogo(CATALOGOS_ID.CAT_FRACCION_ARANCELARIA)
      .pipe(
        map((resp) => {
          this.fraccionRegla = resp.data;
        })
      );

    merge(
      FRACCION_ARANCELATIA$,
      REGLA_ARANCELARIA$
    ).subscribe();
  }


  /**
   * Selecciona la fracción arancelaria.
   */
  fraccionArancelariaSeleccion(): void {
    const FRACCION_ARANCELATIA = this.FormSolicitud.get('fraccionArancelaria')?.value;
    this.tramite32502Store.setCveFraccionArancelaria(FRACCION_ARANCELATIA);
  }

  /**
   * Selecciona la fracción regla.
   */
  fraccionReglaSeleccion(): void {
    const REGLAFRACCION = this.FormSolicitud.get('reglaFraccion')?.value;
    this.tramite32502Store.setFraccionRegla(REGLAFRACCION);
  }

  /**
   * Selecciona la Entidad Federativa.
   */
  onEntidadFederativaChange(): void {
    const ENTIDADFEDERATIVA = this.FormSolicitud.get('reglaFraccion')?.value;
    this.tramite32502Store.setFraccionRegla(ENTIDADFEDERATIVA);
  }

  /**
   * Selecciona la Num Pedimento.
   */
  sanitizarNumeroPedimento(): void {
    const NUMPEDIMENTO = this.FormSolicitud.get('reglaFraccion')?.value;
    this.tramite32502Store.setFraccionRegla(NUMPEDIMENTO);
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: string): void {
  const VALOR = form.get(campo)?.value;

  const METHODMAP: Record<string, (value: string | number | boolean) => void> = {
    setRazonSocial: (value) => this.tramite32502Store.setRazonSocial(String(value)),
    setRfcExtranjero: (value) => this.tramite32502Store.setRfcExtranjero(String(value)),
    setFraccionArancelaria: (value) => this.tramite32502Store.setCveFraccionArancelaria(String(value)),
    setFraccionRegla: (value) => this.tramite32502Store.setReglaFraccion(String(value)),
    setEntidadFederativa: (value) => this.tramite32502Store.setEntidadFederativa(String(value)),
    setNumeroPedimento: (value) => this.tramite32502Store.setNumeroPedimento(String(value)),
    setFechaInicio: (value) => this.tramite32502Store.setFechaInicio(String(value)),
    setRfc: (value) => this.tramite32502Store.setRfc(String(value)),
    setDescripcionMercancia: (value) => this.tramite32502Store.setDescripcionMercancia(String(value)),
    setInformacionExtra: (value) => this.tramite32502Store.setInformacionExtra(String(value)),
    setDelegacionMunicipio: (value) => this.tramite32502Store.setDelegacionMunicipio(String(value)),
    setColonia: (value) => this.tramite32502Store.setColonia(String(value)),
    setCalle: (value) => this.tramite32502Store.setCalle(String(value)),
    setNumeroExterior: (value) => this.tramite32502Store.setNumeroExterior(String(value)),
    setNumeroInterior: (value) => this.tramite32502Store.setNumeroInterior(String(value)),
    setCodigoPostal: (value) => this.tramite32502Store.setCodigoPostal(String(value)),
    setPatenteAutorizacion: (value) => this.tramite32502Store.setPatenteAutorizacion(String(value)),
    setRfcAgenteAduanal: (value) => this.tramite32502Store.setRfcAgenteAduanal(String(value)),
    setClaveAduana: (value) => this.tramite32502Store.setClaveAduana(String(value)),
    setNombre: (value) => this.tramite32502Store.setNombre(String(value)),
    setPrimerApellido: (value) => this.tramite32502Store.setPrimerApellido(String(value)),
    setSegundoApellido: (value) => this.tramite32502Store.setSegundoApellido(String(value)),
    setAdace: (value) => this.tramite32502Store.setAdace(String(value)),
    setNico: (value) => this.tramite32502Store.setNico(String(value)),
    setValorUSD: (value) => this.tramite32502Store.setValorUSD(String(value)),
    setMarca: (value) => this.tramite32502Store.setMarca(String(value)),
    setPeso: (value) => this.tramite32502Store.setPeso(String(value)),
    setNumeroSerie: (value) => this.tramite32502Store.setNumeroSerie(String(value)),
  };

  if (METHODMAP[metodoNombre]) {
    METHODMAP[metodoNombre](VALOR);
  } else {
    console.error(`El método ${metodoNombre} no existe en el mapa de métodos.`);
  }
}



  /**
   * Método para validar el formulario.
   * @returns void
   */
  validarFormulario(): void {
    if (this.FormSolicitud.invalid) {
      this.FormSolicitud.markAllAsTouched();
    }
  }

  /**
   * Cambia la fecha de ingreso a un nuevo valor.
   *
   * @param nuevo_valor - El nuevo valor de la fecha de ingreso en formato de cadena.
   * 
   * Este método actualiza el valor de 'fechaInicio' en el formulario 'mercanciaST',
   * marca el campo como no tocado y también actualiza la fecha de inicio en el 
   * store 'tramite32502Store'.
   */
  public cambioFechaDeIngreso(nuevo_valor: string): void {
    this.mercanciaST.get('fechaInicio')?.setValue(nuevo_valor);
    this.mercanciaST.get('fechaInicio')?.markAsUntouched();
    this.tramite32502Store.setFechaInicio(nuevo_valor);
  }
}
