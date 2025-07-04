import { CATALOGOS_ID, InputFecha } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud32502State, Tramite32502Store } from '../../../../estados/tramites/tramite32502.store';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { AvisoService } from '../../services/aviso.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
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
      habilitado: true,
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
  public seccionState!: Solicitud32502State;

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
    * Indica si el formulario está en modo solo lectura.
    * Cuando es `true`, los campos del formulario no se pueden editar.
    */
    esFormularioSoloLectura: boolean = false;

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
     ,private consultaioQuery: ConsultaioQuery) {
          /**
       * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
       *
       * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
       * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
       * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
       */
          this.consultaioQuery.selectConsultaioState$
          .pipe(
            takeUntil(this.destroy$),
            map((seccionState: { readonly: boolean }) => {
              this.esFormularioSoloLectura = seccionState.readonly;
              this.guardarDatosFormulario();
            })
          )
          .subscribe()
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
    this.inicializarEstadoFormulario();
    this.inicializaCatalogos();
    this.tramite32502Query.select()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.seccionState = state;
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
    this.tramite32502Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroy$),
      map((seccionState) => {
        this.seccionState = seccionState;
      })
    )
    .subscribe()
    this.FormSolicitud = this.fb.group({
      adaceForm: this.fb.group({
      adace: [
        { value: this.seccionState?.adace || 'Centro', disabled: true }
      ]
      }),
      extranjeroAvisoAgace: this.fb.group({
      razonSocial: [
        this.seccionState?.razonSocial || '',
        Validators.required
      ],
      rfc: [
        this.seccionState?.rfc,
        Validators.required
      ],
      rfcExtranjero: [
        this.seccionState?.rfcExtranjero,
        Validators.required
      ]
      }),
      mercanciaST: this.fb.group({
      cveFraccionArancelaria: [
        this.seccionState?.cveFraccionArancelaria,
        Validators.required
      ],
      reglaFraccion: [
        this.seccionState?.reglaFraccion,
        Validators.required
      ],
      nico: [
        this.seccionState?.nico,
        Validators.required
      ],
      valorUSD: [
        this.seccionState?.valorUSD,
        Validators.required
      ],
      marca: [
        this.seccionState?.marca,
        Validators.required
      ],
      peso: [
        this.seccionState?.peso,
        Validators.required
      ],
      fechaInicio: [
        this.seccionState?.fechaInicio,
        Validators.required
      ],
      numeroSerie: [
        this.seccionState?.numeroSerie,
        Validators.required
      ],
      descripcionMercancia: [
        this.seccionState?.descripcionMercancia,
        Validators.required
      ]
      }),
      direccionST: this.fb.group({
      informacionExtra: [
        this.seccionState?.informacionExtra,
        Validators.required
      ],
      entidadFederativa: [
        this.seccionState?.entidadFederativa,
        Validators.required
      ],
      delegacionMunicipio: [
        this.seccionState?.delegacionMunicipio,
        Validators.required
      ],
      colonia: [
        this.seccionState?.colonia,
        Validators.required
      ],
      calle: [
        this.seccionState?.calle,
        Validators.required
      ],
      numeroExterior: [
        this.seccionState?.numeroExterior,
        Validators.required
      ],
      numeroInterior: [
        this.seccionState?.numeroInterior,
        Validators.required
      ],
      codigoPostal: [
        this.seccionState?.codigoPostal,
        [
        Validators.required,
        Validators.maxLength(5)
        ]
      ]
      }),
      pedimentoST: this.fb.group({
      patenteAutorizacion: [
        this.seccionState?.patenteAutorizacion,
        [Validators.required, Validators.maxLength(4)]
      ],
      rfcAgenteAduanal: [
        this.seccionState?.rfcAgenteAduanal,
        [Validators.required, Validators.maxLength(12)]
      ],
      numeroPedimento: [
        this.seccionState?.numeroPedimento,
        Validators.required
      ],
      claveAduana: [
        this.seccionState?.claveAduana,
        Validators.required
      ]
      })
    });
    if (this.esFormularioSoloLectura) {
      this.FormSolicitud.disable();
      this.esFormularioSoloLectura=true;
    } else {
      this.FormSolicitud.enable();
    }
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
    const FRACCION_ARANCELATIA = this.mercanciaST.get('cveFraccionArancelaria')?.value;
    this.tramite32502Store.setCveFraccionArancelaria(FRACCION_ARANCELATIA);
    if (this.esFormularioSoloLectura) {
      this.FormSolicitud.disable();
    } else {
      this.FormSolicitud.enable();
    }
  }

  /**
   * Selecciona la fracción regla.
   */
  fraccionReglaSeleccion(): void {
    const REGLAFRACCION = this.mercanciaST.get('reglaFraccion')?.value;
    this.tramite32502Store.setFraccionRegla("reglaFraccion",REGLAFRACCION);
  }

  /**
   * Selecciona la Entidad Federativa.
   */
  onEntidadFederativaChange(): void {
    const ENTIDADFEDERATIVA = this.mercanciaST.get('entidadFederativa')?.value;
    this.tramite32502Store.setFraccionRegla("entidadFederativa",ENTIDADFEDERATIVA);
  }

  /**
   * Selecciona la Num Pedimento.
   */
  sanitizarNumeroPedimento(): void {
    const NUMPEDIMENTO = this.mercanciaST.get('numeroPedimento')?.value;
    this.tramite32502Store.setFraccionRegla("numeroPedimento",NUMPEDIMENTO);
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup): void {
    const VALORES = {
      razonSocial: form.get('razonSocial')?.value,
      rfc: form.get('rfc')?.value,
      rfcExtranjero: form.get('rfcExtranjero')?.value,
      cveFraccionArancelaria: form.get('cveFraccionArancelaria')?.value,
      reglaFraccion: form.get('reglaFraccion')?.value,
      nico: form.get('nico')?.value,
      valorUSD: form.get('valorUSD')?.value,
      marca: form.get('marca')?.value,
      peso: form.get('peso')?.value,
      fechaInicio: form.get('fechaInicio')?.value,
      numeroSerie: form.get('numeroSerie')?.value,
      descripcionMercancia: form.get('descripcionMercancia')?.value,
      informacionExtra: form.get('informacionExtra')?.value,
      entidadFederativa: form.get('entidadFederativa')?.value,
      delegacionMunicipio: form.get('delegacionMunicipio')?.value,
      colonia: form.get('colonia')?.value,
      calle: form.get('calle')?.value,
      numeroExterior: form.get('numeroExterior')?.value,
      numeroInterior: form.get('numeroInterior')?.value,
      codigoPostal: form.get('codigoPostal')?.value,
      patenteAutorizacion: form.get('patenteAutorizacion')?.value,
      rfcAgenteAduanal: form.get('rfcAgenteAduanal')?.value,
      numeroPedimento: form.get('numeroPedimento')?.value,
      claveAduana: form.get('claveAduana')?.value,
      nombre: form.get('nombre')?.value,
      primerApellido: form.get('primerApellido')?.value,
      segundoApellido: form.get('segundoApellido')?.value,
      adace: form.get('adace')?.value,
    };
    this.tramite32502Store.establecerDatos(VALORES);
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
    this.mercanciaST.patchValue({
      fechaInicio: nuevo_valor
    });
    this.tramite32502Store.setFechaInicio(nuevo_valor);
  }

  /**
 * Inicializa el estado del formulario.
 * 
 * Este método evalúa si el formulario debe ser inicializado en modo solo lectura o en modo editable.
 * 
 * 1. Si el formulario está en modo solo lectura (`esFormularioSoloLectura`):
 *    - Llama al método `guardarDatosFormulario` para cargar los datos y deshabilitar el formulario.
 * 
 * 2. Si el formulario no está en modo solo lectura:
 *    - Llama al método `obtenerDatosFormulario` para cargar los datos del estado actual.
 * 
 * Este método es útil para configurar el estado inicial del formulario y sincronizarlo
 * con los datos del estado global de la aplicación.
 * 
 * @returns {void}
 */
inicializarEstadoFormulario(): void {
  if (this.esFormularioSoloLectura) {
    this.guardarDatosFormulario();
  } else {
    this.crearFormSolicitud();
  }
}

  /**
* Carga los datos del formulario y actualiza su estado.
* 
* Este método realiza las siguientes acciones:
* 
* 1. Llama al método `obtenerDatosFormulario` para cargar los datos del estado actual.
* 2. Llama al método `crearFormulario` para inicializar el formulario reactivo con los datos obtenidos.
* 3. Evalúa si el formulario está en modo solo lectura (`esFormularioSoloLectura`):
*    - Si está en modo solo lectura, deshabilita el formulario utilizando el método `disable`.
*    - Si no está en modo solo lectura, habilita el formulario utilizando el método `enable`.
* 
* Este método es útil para sincronizar los datos del formulario con el estado global de la aplicación
* y configurar su estado (habilitado o deshabilitado) según corresponda.
* 
* @returns {void}
*/
guardarDatosFormulario(): void {
  this.crearFormSolicitud();
}
}
