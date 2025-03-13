import { CATALOGOS_ID, Catalogo, FECHA_SALIDA, InputFecha, PeximService, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, merge } from 'rxjs';

import { Solicitud110204State, Tramite110204Store, } from '../../estados/tramite110204.store';


/**
 * Componente para la vista de la solicitud de la sección de "130118".
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {

  /**
   * Lista de catálogos de régimen de mercancía.
   */
  regimenMercancia!: Catalogo[];

  /**
   * Lista de catálogos de clasificación de régimen.
   */
  clasifiRegimen!: Catalogo[];

  /**
   * Lista de catálogos de fracción arancelaria.
   */
  fraccionArancelaria!: Catalogo[];

  /**
   * Lista de catálogos de NICO.
   */
  nico!: Catalogo[];

  /**
   * Lista de catálogos de país de origen.
   */
  paisOrigen!: Catalogo[];

  /**
   * Lista de catálogos de país de destino.
   */
  paisDestino!: Catalogo[];

  /**
   * Lista de catálogos de estado.
   */
  estado!: Catalogo[];

  /**
   * Lista de catálogos de molino.
   */
  molino!: Catalogo[];

  /**
   * Lista de catálogos de unidad de medida tarifaria.
   */
  unidadMedidaTarifaria!: Catalogo[];

  /**
   * Lista de catálogos de representación federal.
   */
  representacionFederal!: Catalogo[];

  /**
   * Estado de la solicitud.
   */
  public solicitudState: Solicitud110204State | undefined;

  /**
   * Indica si la persona física es visible.
   */
  isVisibleFisica: boolean = false;

  /**
   * Indica si la persona moral es visible.
   */
  isVisibleMoral: boolean = false;

  /**
   * Fecha final de entrada.
   */
  fechaFinalInput: InputFecha = FECHA_SALIDA;

  /**
   * Formulario principal de la solicitud.
   */
  FormSolicitud!: FormGroup;

  /**
   * Constructor del componente.
   * @param peximService Servicio para obtener datos de PEXIM.
   * @param fb FormBuilder para crear formularios.
   * @param validacionesService Servicio para validaciones de formularios.
   * @param tramite110204Store Almacén de estado para el trámite 130118.
   */
  constructor(
    private peximService: PeximService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    public tramite110204Store: Tramite110204Store
  ) {
    // Inicializar el formulario principal
    this.crearFormSolicitud();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes acciones:
   * 1. Inicializa los catálogos necesarios para el formulario.
   * 2. Selecciona los valores iniciales para los catálogos de régimen de mercancía, 
   *    clasificación de régimen, fracción arancelaria, NICO, país de origen, país de destino, 
   *    estado, molino, unidad de medida tarifaria y representación federal.
   * 3. Muestra los campos correspondientes a la persona seleccionada (física o moral).
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.regimenMercanciaSeleccion();
    this.clasifiRegimenSeleccion();
    this.fraccionArancelariaSeleccion();
    this.nicoSeleccion();
    this.paisOrigenSeleccion();
    this.paisDestinoSeleccion();
    this.estadoSeleccion();
    this.molinoSeleccion();
    this.unidadMedidaTarifariaSeleccion();
    this.representacionFederalSeleccion();

    this.muestraCamposPersona();

  }

  /**
   * Obtiene el grupo de formulario 'datosRegimen' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'datosRegimen'.
   */
  get datosRegimen(): FormGroup {
    return this.FormSolicitud.get('datosRegimen') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'datosMercancia' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'datosMercancia'.
   */
  get datosMercancia(): FormGroup {
    return this.FormSolicitud.get('datosMercancia') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'datosProducto' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'datosProducto'.
   */
  get datosProducto(): FormGroup {
    return this.FormSolicitud.get('datosProducto') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'registroFederal' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'registroFederal'.
   */
  get registroFederal(): FormGroup {
    return this.FormSolicitud.get('registroFederal') as FormGroup;
  }

  /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) === true;
  }

  /**
   * Método para crear el formulario principal de la solicitud.
   */
  crearFormSolicitud(): void {
    this.FormSolicitud = this.fb.group({
      datosRegimen: this.fb.group({
        regimenMercancia: [
          this.solicitudState?.regimenMercancia,
          [Validators.required]
        ],
        clasifiRegimen: [
          this.solicitudState?.clasifiRegimen,
          Validators.required
        ]
      }),
      datosMercancia: this.fb.group({
        valueTA: [
          this.solicitudState?.valueTA,
          [
            Validators.required,
            Validators.maxLength(1000)
          ],
        ],
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          Validators.required
        ],
        nico: [
          this.solicitudState?.nico,
          Validators.required
        ],
        unidadMedidaTarifaria: [
          this.solicitudState?.unidadMedidaTarifaria,
          Validators.required
        ],
        cantidadTarifaria: [
          this.solicitudState?.cantidadTarifaria,
          [
            Validators.required,
            Validators.maxLength(17),
            Validators.min(0),
            Validators.max(parseFloat('99999999999999.99')),
            Validators.pattern(/^(\d{1,14})(\.\d{1,2})?$/)
          ]
        ],
        valorFacturaUSD: [
          this.solicitudState?.valorFacturaUSD,
          [
            Validators.required,
            Validators.maxLength(17),
            Validators.min(0),
            Validators.max(parseFloat('99999999999999.99')),
            Validators.pattern(/^(\d{1,14})(\.\d{1,2})?$/)
          ]
        ],
        precioUnitarioUSD: [
          { value: this.solicitudState?.precioUnitarioUSD, disabled: true }
        ],
        paisOrigen: [
          this.solicitudState?.paisOrigen,
          Validators.required
        ],
        paisDestino: [
          this.solicitudState?.paisDestino,
          Validators.required
        ],
        lote: [
          this.solicitudState?.lote,
          [
            Validators.required,
            Validators.maxLength(60)
          ]
        ],
        fechaSalida: [
          { value: this.solicitudState?.fechaSalida, disabled: true }
        ],
        observaciones: [
          this.solicitudState?.observaciones,
          [Validators.maxLength(250)]],
        observacionMerc: this.solicitudState?.observacionMerc
      }),
      datosProducto: this.fb.group({
        tipoPersona: [
          this.solicitudState?.tipoPersona,
          Validators.required
        ],
        nombre: [
          this.solicitudState?.nombre,
          [
            Validators.required,
            Validators.maxLength(200)
          ]
        ],
        apellidoPaterno: [
          this.solicitudState?.apellidoPaterno,
          [
            Validators.required,
            Validators.maxLength(200)
          ]
        ],
        apellidoMaterno: [
          this.solicitudState?.apellidoMaterno,
          [
            Validators.maxLength(200)
          ]
        ],
        razonSocial: [
          this.solicitudState?.razonSocial,
          [
            Validators.required,
            Validators.maxLength(250)
          ]
        ],
        molino: [
          this.solicitudState?.molino,
          [
            Validators.required
          ],
        ],
        domicilio: [
          this.solicitudState?.domicilio,
          [
            Validators.required,
            Validators.maxLength(1000)
          ]
        ]
      }),
      registroFederal: this.fb.group({
        estado: [
          this.solicitudState?.estado,
          Validators.required
        ],
        representacionFederal: [
          this.solicitudState?.representacionFederal,
          Validators.required
        ]
      })
    });
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const REGIMEN_MERCANCIA$ = this.peximService
      .getRegimenMercancia(CATALOGOS_ID.CAT_REGIMEN_MERCANCIA)
      .pipe(
      map((resp) => {
        this.regimenMercancia = resp.data;
      })
      );

    const CLASIFI_REGIMEN$ = this.peximService
      .getClasifiRegimen(CATALOGOS_ID.CAT_CLASIFI_REGIMEN)
      .pipe(
      map((resp) => {
        this.clasifiRegimen = resp.data;
      })
      );

    const FRACCION_ARANCELARIA$ = this.peximService
      .getFraccionArancelariaCatalogo(CATALOGOS_ID.CAT_FRACCION_ARANCELARIA)
      .pipe(
        map((resp) => {
          this.fraccionArancelaria = resp.data;
        })
      );

    const NICO$ = this.peximService
      .getNicoCatalogo(CATALOGOS_ID.CAT_NICO)
      .pipe(
      map((resp) => {
        this.nico = resp.data;
      })
      );

    const UNIDAD_MEDIDA_TARIFARIA$ = this.peximService
      .getUnidadMedidaTarifariaCatalogo(CATALOGOS_ID.CAT_UNIDAD_MEDIDA_TARIFARIA)
      .pipe(
      map((resp) => {
        this.unidadMedidaTarifaria = resp.data;
      })
      );

    const PAIS_ORIGEN$ = this.peximService
      .getPaisOrigenCatalogo(CATALOGOS_ID.CAT_PAIS_ORIGEN)
      .pipe(
      map((resp) => {
        this.paisOrigen = resp.data;
      })
      );

    const PAIS_DESTINO$ = this.peximService
      .getPaisDestinoCatalogo(CATALOGOS_ID.CAT_PAIS_DESTINO)
      .pipe(
      map((resp) => {
        this.paisDestino = resp.data;
      })
      );

    const MOLINO$ = this.peximService
      .getMolinoCatalogo(CATALOGOS_ID.CAT_MOLINO)
      .pipe(
      map((resp) => {
        this.molino = resp.data;
      })
      );

    const ESTADO$ = this.peximService
      .getEstadoCatalogo(CATALOGOS_ID.CAT_ESTADO)
      .pipe(
      map((resp) => {
        this.estado = resp.data;
      })
      );

    const REPRESENTACION_FEDERAL$ = this.peximService
      .getRepresentacionFederal(CATALOGOS_ID.CAT_REPRESENTACION_FEDERAL)
      .pipe(
      map((resp) => {
        this.representacionFederal = resp.data;
      })
      );

    merge(
      REGIMEN_MERCANCIA$,
      CLASIFI_REGIMEN$,
      FRACCION_ARANCELARIA$,
      NICO$,
      UNIDAD_MEDIDA_TARIFARIA$,
      PAIS_ORIGEN$,
      PAIS_DESTINO$,
      MOLINO$,
      ESTADO$,
      REPRESENTACION_FEDERAL$
    ).subscribe();
  }

  /**
   * Selecciona el régimen de mercancía.
   */
  regimenMercanciaSeleccion(): void {
    const REGIMEN_MERCANCIA = this.FormSolicitud.get('regimenMercancia')?.value;
    this.tramite110204Store.setRegimenMercancia(REGIMEN_MERCANCIA);
  }

  /**
   * Selecciona la clasificación de régimen.
   */
  clasifiRegimenSeleccion(): void {
    const CLASIFI_REGIMEN = this.FormSolicitud.get('clasifiRegimen')?.value;
    this.tramite110204Store.setClasifiRegimen(CLASIFI_REGIMEN);
  }

  /**
   * Selecciona la fracción arancelaria.
   */
  fraccionArancelariaSeleccion(): void {
    const FRACCION_ARANCELARIA = this.FormSolicitud.get('fraccionArancelaria')?.value;
    this.tramite110204Store.setFraccionArancelaria(FRACCION_ARANCELARIA);
  }

  /**
   * Selecciona el NICO.
   */
  nicoSeleccion(): void {
    const NICO = this.FormSolicitud.get('nico')?.value;
    this.tramite110204Store.setNico(NICO);
  }

  /**
   * Selecciona la unidad de medida tarifaria.
   */
  unidadMedidaTarifariaSeleccion(): void {
    const UNIDAD_MEDIDA_TARIFARIA$ = this.FormSolicitud.get('unidadMedidaTarifaria')?.value;
    this.tramite110204Store.setUnidadMedidaTarifaria(UNIDAD_MEDIDA_TARIFARIA$);
  }

  /**
   * Selecciona el país de origen.
   */
  paisOrigenSeleccion(): void {
    const PAIS_ORIGEN = this.FormSolicitud.get('paisOrigen')?.value;
    this.tramite110204Store.setPaisOrigen(PAIS_ORIGEN);
  }

  /**
   * Selecciona el país de destino.
   */
  paisDestinoSeleccion(): void {
    const PAIS_DESTINO = this.FormSolicitud.get('paisDestino')?.value;
    this.tramite110204Store.setPaisDestino(PAIS_DESTINO);
  }

  /**
   * Selecciona el molino.
   */
  molinoSeleccion(): void {
    const MOLINO = this.FormSolicitud.get('molino')?.value;
    this.tramite110204Store.setMolino(MOLINO);
  }

  /**
   * Selecciona el estado.
   */
  estadoSeleccion(): void {
    const ESTADO = this.FormSolicitud.get('estado')?.value;
    this.tramite110204Store.setEstado(ESTADO);
  }

  /**
   * Selecciona la representación federal.
   */
  representacionFederalSeleccion(): void {
    const REPRESENTACION_FEDERAL = this.FormSolicitud.get('representacionFederal')?.value;
    this.tramite110204Store.setRepresentacionFederal(REPRESENTACION_FEDERAL);
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
   * Método para escapar comillas dobles en una cadena.
   * @param value Cadena a escapar.
   * @returns {string} Cadena con comillas escapadas.
   */
 // eslint-disable-next-line class-methods-use-this
 escapeHtmlQuotes(value: string): string {
    return value ? value.replace(/"/g, '&#34;') : '';
  }

  /**
   * Método para mostrar los campos correspondientes a la persona seleccionada.
   * @returns void
   */
  muestraCamposPersona(): void {
    const RAZON_SOCIAL = this.FormSolicitud.get('datosProducto.razonSocial')?.value;
    const NOMBRE = this.FormSolicitud.get('datosProducto.nombre')?.value;

    if (RAZON_SOCIAL !== '' || RAZON_SOCIAL !== null) {
      this.personaMoral();
      this.FormSolicitud.get('datosProducto.tipoPersona')?.setValue('pmoral');
    } else if (NOMBRE !== '' || RAZON_SOCIAL !== null) {
      this.personaFisica();
      this.FormSolicitud.get('datosProducto.tipoPersona')?.setValue('pfisica');
    }
  }

  /**
   * Método para mostrar los campos correspondientes a una persona moral.
   * @returns void
   */
  personaMoral(): void {
    this.isVisibleFisica = false;
    this.isVisibleMoral = true;

    // Restablecer los valores y desactivar campos para "Persona Moral"
    this.FormSolicitud.get('datosProducto.nombre')?.setValue('');
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.setValue('');
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.setValue('');
    this.FormSolicitud.get('datosProducto.razonSocial')?.setValue('');
    this.FormSolicitud.get('datosProducto.razonSocial')?.enable();

    this.FormSolicitud.get('datosProducto.nombre')?.disable();
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.disable();
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.disable();
  }

  /**
   * Método para mostrar los campos correspondientes a una persona física.
   * @returns void
   */
  personaFisica(): void {
    this.isVisibleFisica = true;
    this.isVisibleMoral = false;

    // Restablecer los valores y habilitar campos para "Persona Física"
    this.FormSolicitud.get('datosProducto.razonSocial')?.setValue('');
    this.FormSolicitud.get('datosProducto.razonSocial')?.disable();

    this.FormSolicitud.get('datosProducto.nombre')?.enable();
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.enable();
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.enable();
  }

  /**
   * Función para calcular el precio por unidad.
   */
  calcularUmtPrecioUnitario(): void {
    this.calcularPrecioUnitarioUSD();
  }

  /**
   * Función para calcular el precio unitario en USD.
   */
  calcularPrecioUnitarioUSD(): void {
    const CANTIDAD_UMT = this.FormSolicitud.get('datosMercancia.cantidadTarifaria')?.value;
    const MERCANCIA_AVISO = this.FormSolicitud.get('datosMercancia.valorFacturaUSD')?.value;

    if (CANTIDAD_UMT !== null && CANTIDAD_UMT.toString().length >= 1 &&
    MERCANCIA_AVISO !== null && MERCANCIA_AVISO.toString().length >= 1) {

      if (CANTIDAD_UMT === 0 || CANTIDAD_UMT.toString().length === 0) {
        this.FormSolicitud.get('precioUnitarioAcero')?.setValue('0');
      } else {
        const FACTOR = 10000000;
        let resultPrecioUni: number;

        if ((MERCANCIA_AVISO * 1000) < CANTIDAD_UMT) {
          resultPrecioUni = 0;
        } else {
            const RESULT_PRECIO_UNI_AUX = this.trunCar(
            (MERCANCIA_AVISO * FACTOR) / CANTIDAD_UMT / FACTOR
            );
          resultPrecioUni = RESULT_PRECIO_UNI_AUX;
        }
        this.FormSolicitud.get('datosMercancia.precioUnitarioUSD')?.setValue(resultPrecioUni);
      }
    }
  }

  /**
   * Función para truncar la parte decimal a dos decimales.
   * @param num Número a truncar.
   * @returns {number} Número truncado.
   */
 // eslint-disable-next-line class-methods-use-this
 trunCar(num: number): number {
    const NUM_STR = num.toString();
    if (NUM_STR.indexOf('.') !== -1) {
      const NUM_ARR = NUM_STR.split('.');
      if (NUM_ARR.length === 1) {
        return Number(num);
      } 
        return parseFloat(NUM_ARR[0] + '.' + NUM_ARR[1].slice(0, 3));
      
    } 
      return Number(num);
    
  }

  /**
   * Método para cambiar la fecha final.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.datosMercancia.get('fechaFinal')?.setValue(nuevo_valor);
    this.datosMercancia.get('fechaFinal')?.markAsUntouched();
  }
}
