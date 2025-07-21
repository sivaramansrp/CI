import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';

import { CATALOGOS_ID, Catalogo, ConsultaioQuery, ConsultaioState, FECHA_SALIDA, InputFecha, REGEX_ONCE_ENTEROS_DOS_DECIMALES, REGEX_ONCE_ENTEROS_TRES_DECIMALES, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Solicitud130118State, Tramite130118Store } from '../../estados/tramites/tramite130118.store';
import { PeximService } from '../../service/pexim.service';
import { Tramite130118Query } from '../../estados/queries/tramite130118.query';

/**
 * Componente para la vista de la solicitud de la sección de "130118".
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  standalone: false,
})
/*eslint class-methods-use-this: ["error", { "exceptMethods": ["truncar"] }] */
export class SolicitudComponent implements OnInit, OnDestroy {

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
  public solicitudState!: Solicitud130118State;

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
   * Cadena utilizada para escapar comillas dobles en HTML.
   */
  escaparHtml!: string;

  /**
   * Estado de la consulta.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Subject para destruir notificador y cancelar suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param peximService Servicio para obtener datos de PEXIM.
   * @param fb FormBuilder para crear formularios.
   * @param validacionesService Servicio para validaciones de formularios.
   * @param tramite130118Store Almacén de estado para el trámite 130118.
   * @param tramite130118Query Consulta de almacén para el procedimiento 130118.
   * @param consultaioQuery Consulta para obtener el estado de consulta.
   */
  constructor(
    private peximService: PeximService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite130118Store: Tramite130118Store,
    private tramite130118Query: Tramite130118Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa catálogos, suscripciones y muestra los campos correspondientes a la persona seleccionada.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
    this.inicializarEstadoFormulario();

    this.tramite130118Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();

    this.crearFormSolicitud();
    this.regimenMercanciaSeleccion();
    this.clasifiRegimenSeleccion();
    this.fraccionArancelariaSeleccion();
    this.nicoSeleccion();
    this.paisOrigenSeleccion();
    this.paisDestinoSeleccion();
    this.estadoSeleccion();
    this.unidadMedidaTarifariaSeleccion();
    this.representacionFederalSeleccion();
    this.muestraCamposPersona();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormSolicitud();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.crearFormSolicitud();
    if (this.esFormularioSoloLectura) {
      this.FormSolicitud.disable();
    } else {
      this.FormSolicitud.enable();
    }
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
        regimenMercancia: [this.solicitudState?.regimenMercancia],
        clasifiRegimen: [{ value: this.solicitudState?.clasifiRegimen, disabled: true }]
      }),
      datosMercancia: this.fb.group({
        valueTA: [{ value:this.solicitudState?.valueTA, disabled : this.esFormularioSoloLectura},[Validators.maxLength(1000), Validators.pattern(/^[^~`^]*$/)]],
        fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, Validators.required],
        nico: [this.solicitudState?.nico, Validators.required],
        unidadMedidaTarifaria: [this.solicitudState?.unidadMedidaTarifaria, Validators.required],
        cantidadTarifaria: [{value:this.solicitudState?.cantidadTarifaria, disabled : this.esFormularioSoloLectura}, [Validators.min(0), Validators.max(999999999.99), Validators.pattern(REGEX_ONCE_ENTEROS_DOS_DECIMALES)]],
        valorFacturaUSD: [{value:this.solicitudState?.valorFacturaUSD,disabled : this.esFormularioSoloLectura},  [Validators.min(0), Validators.max(999999999.999), Validators.pattern(REGEX_ONCE_ENTEROS_TRES_DECIMALES)]],
        precioUnitarioUSD: [ { value: this.solicitudState?.precioUnitarioUSD, disabled: true }],
        paisOrigen: [this.solicitudState?.paisOrigen, Validators.required],
        paisDestino: [this.solicitudState?.paisDestino, Validators.required],
        lote: [{value:this.solicitudState?.lote,disabled : this.esFormularioSoloLectura},  [Validators.maxLength(60)]],
        fechaSalida: [{value:this.solicitudState?.fechaSalida,disabled : this.esFormularioSoloLectura}, [Validators.required]],
        observaciones: [{value:this.solicitudState?.observaciones,disabled : this.esFormularioSoloLectura}, [Validators.maxLength(250)]],
        observacionMerc: this.solicitudState?.observacionMerc
      }),
      datosProducto: this.fb.group({
        tipoPersona: [{value:this.solicitudState?.tipoPersona,disabled : this.esFormularioSoloLectura}],
        nombre: [{value: this.solicitudState?.nombre}, [Validators.required, Validators.maxLength(200)]],
        apellidoPaterno: [{value: this.solicitudState?.apellidoPaterno}, [Validators.required, Validators.maxLength(200)]],
        apellidoMaterno: [{value: this.solicitudState?.apellidoMaterno}, [Validators.maxLength(200)]],
        razonSocial: [{value:this.solicitudState?.razonSocial,disabled : this.esFormularioSoloLectura} , [Validators.required,Validators.maxLength(250)]],
        domicilio: [{value:this.solicitudState?.domicilio,disabled : this.esFormularioSoloLectura}, [Validators.maxLength(1000)]]
      }),
      registroFederal: this.fb.group({
        estado: [this.solicitudState?.estado, Validators.required],
        representacionFederal: [this.solicitudState?.representacionFederal, Validators.required]
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
      ESTADO$,
      REPRESENTACION_FEDERAL$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Establece los valores en el store de tramite130118.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130118Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130118Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Selecciona el régimen de mercancía y lo actualiza en el store.
   */
  regimenMercanciaSeleccion(): void {
    const REGIMEN_MERCANCIA = this.FormSolicitud.get('datosRegimen.regimenMercancia')?.value;
    this.tramite130118Store.setRegimenMercancia(REGIMEN_MERCANCIA);
  }

  /**
   * Selecciona la clasificación de régimen y la actualiza en el store.
   */
  clasifiRegimenSeleccion(): void {
    const CLASIFI_REGIMEN = this.FormSolicitud.get('datosRegimen.clasifiRegimen')?.value;
    this.tramite130118Store.setClasifiRegimen(CLASIFI_REGIMEN);
  }

  /**
   * Selecciona la fracción arancelaria y la actualiza en el store.
   */
  fraccionArancelariaSeleccion(): void {
    const FRACCION_ARANCELARIA = this.FormSolicitud.get('datosMercancia.fraccionArancelaria')?.value;
    this.tramite130118Store.setFraccionArancelaria(FRACCION_ARANCELARIA);
  }

  /**
   * Selecciona el NICO y lo actualiza en el store.
   */
  nicoSeleccion(): void {
    const NICO = this.FormSolicitud.get('datosMercancia.nico')?.value;
    this.tramite130118Store.setNico(NICO);
  }

  /**
   * Selecciona la unidad de medida tarifaria y la actualiza en el store.
   */
  unidadMedidaTarifariaSeleccion(): void {
    const UNIDAD_MEDIDA_TARIFARIA = this.FormSolicitud.get('datosMercancia.unidadMedidaTarifaria')?.value;
    this.tramite130118Store.setUnidadMedidaTarifaria(UNIDAD_MEDIDA_TARIFARIA);
  }

  /**
   * Selecciona el país de origen y lo actualiza en el store.
   */
  paisOrigenSeleccion(): void {
    const PAIS_ORIGEN = this.FormSolicitud.get('datosMercancia.paisOrigen')?.value;
    this.tramite130118Store.setPaisOrigen(PAIS_ORIGEN);
  }

  /**
   * Selecciona el país de destino y lo actualiza en el store.
   */
  paisDestinoSeleccion(): void {
    const PAIS_DESTINO = this.FormSolicitud.get('datosMercancia.paisDestino')?.value;
    this.tramite130118Store.setPaisDestino(PAIS_DESTINO);
  }

  /**
   * Selecciona el estado y lo actualiza en el store.
   */
  estadoSeleccion(): void {
    const ESTADO = this.FormSolicitud.get('registroFederal.estado')?.value;
    this.tramite130118Store.setEstado(ESTADO);
  }

  /**
   * Selecciona la representación federal y la actualiza en el store.
   */
  representacionFederalSeleccion(): void {
    const REPRESENTACION_FEDERAL = this.FormSolicitud.get('registroFederal.representacionFederal')?.value;
    this.tramite130118Store.setRepresentacionFederal(REPRESENTACION_FEDERAL);
  }

  /**
   * Método para validar el formulario.
   * @returns boolean
   */
  validarFormulario(): boolean {
    if (this.FormSolicitud.invalid) {
      this.FormSolicitud.markAllAsTouched();
    }
    return this.FormSolicitud.valid;
  }

  /**
   * Método para escapar comillas dobles en una cadena.
   * @param value Cadena a escapar.
   * @returns {string} Cadena con comillas escapadas.
   */
  escapeHtmlQuotes(value: string): string {
    this.escaparHtml = '&#34;';
    return value ? value.replace(/"/g, this.escaparHtml) : '';
  }

  /**
   * Método para mostrar los campos correspondientes a la persona seleccionada.
   * Determina si se debe mostrar la sección de persona física o moral.
   */
  muestraCamposPersona(): void {
    const RAZONSOCIAL = this.FormSolicitud.get('datosProducto.razonSocial')?.value;
    const NOMBRE = this.FormSolicitud.get('datosProducto.nombre')?.value;

    if (RAZONSOCIAL) {
      this.personaMoral();
      this.FormSolicitud.get('datosProducto.tipoPersona')?.setValue('pmoral');
    } else if (NOMBRE) {
      this.personaFisica();
      this.FormSolicitud.get('datosProducto.tipoPersona')?.setValue('pfisica');
    }
  }

  /**
   * Método para mostrar los campos correspondientes a una persona moral.
   * Deshabilita y limpia los campos de persona física.
   */
  personaMoral(): void {
    this.isVisibleFisica = false;
    this.isVisibleMoral = true;

    // Restablecer los valores y desactivar campos para "Persona Moral"
    this.FormSolicitud.get('datosProducto.nombre')?.setValue('');
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.setValue('');
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.setValue('');
    
      if (!this.esFormularioSoloLectura) {
    this.FormSolicitud.get('datosProducto.razonSocial')?.enable();
  }
    this.FormSolicitud.get('datosProducto.nombre')?.disable();
    this.FormSolicitud.get('datosProducto.apellidoPaterno')?.disable();
    this.FormSolicitud.get('datosProducto.apellidoMaterno')?.disable();
  }

  /**
   * Método para mostrar los campos correspondientes a una persona física.
   * Habilita los campos de persona física y deshabilita los de persona moral.
   */
  personaFisica(): void {
    this.isVisibleFisica = true;
    this.isVisibleMoral = false;

    // Restablecer los valores y habilitar campos para "Persona Física"
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
   * Calcula el precio unitario a partir de la cantidad y el valor de la factura.
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
          const RESULT_PRECIO_UNIAUX = this.truncar(
            (MERCANCIA_AVISO * FACTOR) / CANTIDAD_UMT / FACTOR
          );
          resultPrecioUni = RESULT_PRECIO_UNIAUX;
        }
        this.FormSolicitud.get('datosMercancia.precioUnitarioUSD')?.setValue(resultPrecioUni);

        this.tramite130118Store.setPrecioUnitarioUSD(resultPrecioUni);
      }
    }
  }

  /**
   * Función para truncar la parte decimal a dos decimales.
   * @param num Número a truncar.
   * @returns {number} Número truncado.
   */
  truncar(num: number): number {
    const NUMSTR = num.toString();
    if (NUMSTR.indexOf('.') !== -1) {
      const NUMARR = NUMSTR.split('.');
      if (NUMARR.length === 1) {
        return Number(num);
      }
      return parseFloat(NUMARR[0] + '.' + NUMARR[1].slice(0, 3));
    }
    return Number(num);
  }

  /**
   * Método para cambiar la fecha final.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.datosMercancia.patchValue({
      fechaSalida: nuevo_valor,
    });
    this.tramite130118Store.setFechaSalida(nuevo_valor);
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}