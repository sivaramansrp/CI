import { AlertComponent, CatalogoSelectComponent, InputFecha, InputFechaComponent, REGEX_ALFANUMERICO_CON_ESPACIOS, REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR, REGEX_NUMERICO_CON_PUNTO, REGEX_NUMEROS, REGEX_REEMPLAZAR, REGEX_SOLO_NUMEROS, SOLO_ALFANUMERICO, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { AvisoTabla, AvisoTablaDatos, Catalogo, CatalogoLista, MercanciaTabla, MercanciaTablaDatos } from "../../models/aviso-traslado.model";
import { FECHA_INGRESO, TEXTOS, TIPACA, TIPAVI } from "../../constants/aviso-traslado.enum";
import { AvisoTrasladoService } from "../../services/aviso-traslado.service";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Modal } from 'bootstrap';
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { Tramite32503Query } from "../../../../estados/queries/tramite32503.query";
import { Tramite32503State } from "../../../../estados/tramites/tramite32503.store";
import { Tramite32503Store } from "../../../../estados/tramites/tramite32503.store";
import { Validators } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { map } from "rxjs";
import { takeUntil } from "rxjs";
@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputFechaComponent,
    CatalogoSelectComponent, TablaDinamicaComponent, AlertComponent
  ],
  standalone: true,
})
export class AvisoComponent implements OnInit, OnDestroy {
  avisoFormulario!: FormGroup;
  public destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite32503State;
  public fechaInicioInput: InputFecha = FECHA_INGRESO;
  entidadFederativa: Catalogo[] = [];
  delegacionMunicipio: Catalogo[] = [];
  colonia: Catalogo[] = [];
  tablaSeleccion = TablaSeleccion;
  tablaDeDatos: {
    encabezadas: {
      encabezado: string,
      clave: (ele: AvisoTabla) => string,
      orden: number
    }[],
    datos: AvisoTabla[],
  } = {
      encabezadas: [
        { encabezado: 'RFC', clave: (ele: AvisoTabla) => ele.rfc, orden: 1 },
        {
          encabezado: 'Nombre comercial',
          clave: (ele: AvisoTabla) => ele.nombreComercial,
          orden: 2,
        },
        {
          encabezado: 'Entidad federativa',
          clave: (ele: AvisoTabla) => ele.entidadFederativa,
          orden: 3,
        },
        {
          encabezado: 'Alcaldía o Municipio',
          clave: (ele: AvisoTabla) => ele.alcaldioOMuncipio,
          orden: 4,
        },
        {
          encabezado: 'Colonia',
          clave: (ele: AvisoTabla) => ele.colonia,
          orden: 5,
        },
      ],
      datos: []
    };
  filaSeleccionadaLista: AvisoTabla[] = [];
  @ViewChild('modalDomicilio') modalDomicilio!: ElementRef;
  @ViewChild('closeDomicilio') public closeDomicilio!: ElementRef;
  @ViewChild('modalMercancia') modalMercancia!: ElementRef;
  @ViewChild('closeMercancia') public closeMercancia!: ElementRef;
  domicilioFormulario!: FormGroup;
  tablaDeMercancia: {
    encabezadas: {
      encabezado: string,
      clave: (ele: MercanciaTabla) => string,
      orden: number
    }[],
    datos: MercanciaTabla[],
  } = {
      encabezadas: [
        { encabezado: 'Fracción arancelaria', clave: (ele: MercanciaTabla) => ele.claveFraccionArancelaria, orden: 1 },
        {
          encabezado: 'NICO',
          clave: (ele: MercanciaTabla) => ele.nico,
          orden: 2,
        },
        {
          encabezado: 'Unidad de medida',
          clave: (ele: MercanciaTabla) => ele.claveUnidadMedida,
          orden: 3,
        },
        {
          encabezado: 'Cantidad',
          clave: (ele: MercanciaTabla) => ele.cantidad,
          orden: 4,
        },
        {
          encabezado: 'Valor USD',
          clave: (ele: MercanciaTabla) => ele.valorUSD,
          orden: 5,
        },
        {
          encabezado: 'Descripción de la Mercancía',
          clave: (ele: MercanciaTabla) => ele.descripcionMercancia,
          orden: 6,
        },
        {
          encabezado: 'Proceso llevará',
          clave: (ele: MercanciaTabla) => ele.descripcionProceso,
          orden: 6,
        }, {
          encabezado: 'Número de exportación',
          clave: (ele: MercanciaTabla) => ele.numPedimentoExportacion,
          orden: 6,
        },
        {
          encabezado: 'Número de importación',
          clave: (ele: MercanciaTabla) => ele.numPedimentoImportacion,
          orden: 6,
        }
      ],
      datos: []
    };
  filaSeleccionadaMercanciaLista: MercanciaTabla[] = [];
  mercanciaFormulario!: FormGroup;
  fraccionArancelaria: Catalogo[] = [];
  unidadMedida: Catalogo[] = [];
  TIPAVI = TIPAVI;
  TIPACA = TIPACA;
  TEXTOS = TEXTOS;


  constructor(
    public fb: FormBuilder,
    public store: Tramite32503Store,
    public tramiteQuery: Tramite32503Query,
    public avisoTrasladoService: AvisoTrasladoService,
    private validacionesService: ValidacionesFormularioService,
    // eslint-disable-next-line no-empty-function
  ) { }
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
          console.log(this.tramiteState);
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.inicializarDomicilioFormulario();
    this.cargarFederativa();
    this.cargarMunicipio();
    this.cargarColonias();
    this.inicializarMercanciaFormulario();
    this.cargarFraccionArancelaria();
    this.cargarUnidadMedida();
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite32503Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  public cargarFraccionArancelaria(): void {
    this.avisoTrasladoService
      .obtenerFraccionArancelaria()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.fraccionArancelaria = datos.datos;
        }
      );
  }
  public cargarUnidadMedida(): void {
    this.avisoTrasladoService
      .obtenerUnidadMedida()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.unidadMedida = datos.datos;
        }
      );
  }
  public cargarFederativa(): void {
    this.avisoTrasladoService
      .obtenerFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.entidadFederativa = datos.datos;
        }
      );
  }
  public cargarMunicipio(): void {
    this.avisoTrasladoService
      .obtenerMunicipio()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.delegacionMunicipio = datos.datos;
        }
      );
  }
  public cargarColonias(): void {
    this.avisoTrasladoService
      .obtenerColonias()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.colonia = datos.datos;
        }
      );
  }
  public cargarAvisoTabla(): void {
    this.avisoTrasladoService
      .obtenerAvisoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: AvisoTablaDatos) => {
          this.tablaDeDatos.datos = datos.datos;
        }
      );
  }
  public cargarMercanciaTabla(): void {
    this.avisoTrasladoService
      .obtenerMercanciaTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: MercanciaTablaDatos) => {
          this.tablaDeMercancia.datos = datos.datos;
        }
      );
  }
  inicializarFormulario(): void {
    this.avisoFormulario = this.fb.group({
      adaceFormulario: this.fb.group({
        adace: [{ value: this.tramiteState?.avisoFormulario?.adace, disabled: true }, [Validators.required]]
      }),
      datosEmpresa: this.fb.group({
        valorProgramaImmex: [this.tramiteState?.avisoFormulario?.valorProgramaImmex, [Validators.required, Validators.maxLength(9), Validators.pattern(SOLO_ALFANUMERICO)]],
        valorAnioProgramaImmex: [this.tramiteState?.avisoFormulario?.valorAnioProgramaImmex, [Validators.required, Validators.maxLength(4), Validators.pattern(SOLO_ALFANUMERICO)]],
      }),
      datosAviso: this.fb.group({
        tipoAviso: [this.tramiteState?.avisoFormulario?.tipoAviso, [Validators.required]],
        idTransaccion: [this.tramiteState?.avisoFormulario?.idTransaccion, [Validators.maxLength(25), Validators.pattern(SOLO_ALFANUMERICO)]],
        motivoProrroga: [this.tramiteState?.avisoFormulario?.motivoProrroga, [Validators.required, Validators.maxLength(250)]],
        fechaTranslado: [{ value: this.tramiteState?.avisoFormulario?.fechaTranslado, disabled: true }, Validators.required],
      }),
      direccionOrigen: this.fb.group({
        nombreComercial: [this.tramiteState?.avisoFormulario?.nombreComercial, [Validators.maxLength(250)]],
        claveEntidadFederativa: [this.tramiteState?.avisoFormulario?.claveEntidadFederativa, [Validators.required]],
        claveDelegacionMunicipio: [this.tramiteState?.avisoFormulario?.claveDelegacionMunicipio, [Validators.required]],
        claveColonia: [this.tramiteState?.avisoFormulario?.claveColonia, [Validators.required]],
        calle: [this.tramiteState?.avisoFormulario?.calle, [Validators.required, Validators.maxLength(250)]],
        numeroExterior: [this.tramiteState?.avisoFormulario?.numeroExterior, [Validators.required, Validators.maxLength(15), Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS)]],
        numeroInterior: [this.tramiteState?.avisoFormulario?.numeroInterior, [Validators.maxLength(15), Validators.pattern(REGEX_ALFANUMERICO_CON_ESPACIOS)]],
        codigoPostal: [this.tramiteState?.avisoFormulario?.codigoPostal, [Validators.required, Validators.maxLength(5), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      }),
      tipoCarga: [this.tramiteState?.avisoFormulario?.tipoCarga, [Validators.required]],
      archivoMasivo: [null]

    });
    this.verificaTipoAviso();
  }
  get adaceFormulario(): FormGroup {
    return this.avisoFormulario.get('adaceFormulario') as FormGroup;
  }
  get datosEmpresa(): FormGroup {
    return this.avisoFormulario.get('datosEmpresa') as FormGroup;
  }
  get datosAviso(): FormGroup {
    return this.avisoFormulario.get('datosAviso') as FormGroup;
  }
  get direccionOrigen(): FormGroup {
    return this.avisoFormulario.get('direccionOrigen') as FormGroup;
  }
  inicializarDomicilioFormulario(): void {
    this.domicilioFormulario = this.fb.group({
      nombreComercial: [this.tramiteState?.domicilioFormulario?.nombreComercial, [Validators.maxLength(250)]],
      claveEntidadFederativa: [this.tramiteState?.domicilioFormulario?.claveEntidadFederativa, [Validators.required]],
      claveDelegacionMunicipio: [this.tramiteState?.domicilioFormulario?.claveDelegacionMunicipio, [Validators.required]],
      claveColonia: [this.tramiteState?.domicilioFormulario?.claveColonia, [Validators.required]],
      calle: [this.tramiteState?.domicilioFormulario?.calle, [Validators.required, Validators.maxLength(250)]],
      numeroExterior: [this.tramiteState?.domicilioFormulario?.numeroExterior, [Validators.required, Validators.maxLength(15), Validators.pattern(SOLO_ALFANUMERICO)]],
      numeroInterior: [this.tramiteState?.domicilioFormulario?.numeroInterior, [Validators.maxLength(15), Validators.pattern(SOLO_ALFANUMERICO)]],
      codigoPostal: [this.tramiteState?.domicilioFormulario?.codigoPostal, [Validators.required, Validators.maxLength(5), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      rfc: [this.tramiteState?.domicilioFormulario?.rfc, [Validators.required]],
    });
  }
  inicializarMercanciaFormulario(): void {
    this.mercanciaFormulario = this.fb.group({
      claveFraccionArancelaria: [this.tramiteState?.mercanciaFormulario?.claveFraccionArancelaria, Validators.required],
      nico: [this.tramiteState?.mercanciaFormulario?.nico, [Validators.required, Validators.maxLength(2), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      cantidad: [this.tramiteState?.mercanciaFormulario?.cantidad, [Validators.required, Validators.pattern(REGEX_NUMERICO_CON_PUNTO)]],
      claveUnidadMedida: [this.tramiteState?.mercanciaFormulario?.claveUnidadMedida, Validators.required],
      valorUSD: [this.tramiteState?.mercanciaFormulario?.valorUSD, [Validators.required, Validators.pattern(REGEX_NUMERICO_CON_PUNTO)]],
      descripcionMercancia: [this.tramiteState?.mercanciaFormulario?.descripcionMercancia, [Validators.required, Validators.maxLength(250)]],
      descripcionProceso: [this.tramiteState?.mercanciaFormulario?.descripcionProceso, [Validators.required, Validators.maxLength(250)]],
      numPedimentoExportacion: [this.tramiteState?.mercanciaFormulario?.numPedimentoExportacion, [Validators.required, Validators.maxLength(15)]],
      numPedimentoImportacion: [this.tramiteState?.mercanciaFormulario?.numPedimentoImportacion, [Validators.required, Validators.maxLength(15)]],
    });
  }
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }
  public cambioFechaIngreso(nuevo_valor: string): void {
    this.datosAviso.get('fechaTranslado')?.setValue(nuevo_valor);
    this.datosAviso.get('fechaTranslado')?.markAsUntouched();
    this.store.setAvisoFormularioFechaTranslado(nuevo_valor);
  }
  filaSeleccionada(evento: AvisoTabla[]): void {
    this.filaSeleccionadaLista = evento;
  }
  filaSeleccionadaMercancia(evento: MercanciaTabla[]): void {
    this.filaSeleccionadaMercanciaLista = evento;
  }
  eliminarMercancia(): void {
    this.tablaDeMercancia.datos = this.tablaDeMercancia.datos.filter((ele) => !this.filaSeleccionadaMercanciaLista.includes(ele));
    this.filaSeleccionadaMercanciaLista = [];
  }
  eliminarDomicilio(): void {
    this.tablaDeDatos.datos = this.tablaDeDatos.datos.filter((ele) => !this.filaSeleccionadaLista.includes(ele));
    this.filaSeleccionadaLista = [];
  }
  verificaTipoAviso(): void {
    const TIPOAVISO = this.avisoFormulario.get('datosAviso.tipoAviso')?.value;
    this.store.setAvisoFormularioTipoAviso(TIPOAVISO);
    this.avisoFormulario.get('datosAviso.idTransaccion')?.enable();
    this.avisoFormulario.get('datosAviso.motivoProrroga')?.enable();
    if (TIPOAVISO === TIPAVI[0].valor) {
      this.avisoFormulario.get('datosAviso.idTransaccion')?.disable();
      this.avisoFormulario.get('datosAviso.motivoProrroga')?.disable();
    }
  }
  abiertoDomicilio(): void {
    if (this.modalDomicilio) {
      const MODAL_INSTANCE = new Modal(this.modalDomicilio.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  abiertoMercancia(): void {
    if (this.modalMercancia) {
      const MODAL_INSTANCE = new Modal(this.modalMercancia.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  agregarMercancia(): void {
    this.cargarMercanciaTabla();
    this.closeMercancia.nativeElement.click();
  }
  agregarDomicilio(): void {
    this.cargarAvisoTabla();
    this.closeDomicilio.nativeElement.click();
  }
  // eslint-disable-next-line class-methods-use-this
  sanitizeAlphanumeric(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(REGEX_REEMPLAZAR, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  // eslint-disable-next-line class-methods-use-this
  sanitizeAlphanumericWithSpace(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(REGEX_ALFANUMERICO_CON_ESPACIOS_REEMPLAZAR, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  // eslint-disable-next-line class-methods-use-this
  sanitizeNumeric(form: FormGroup, control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(REGEX_NUMEROS, '');
    form.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  limpiar(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.avisoFormulario.get('archivoMasivo')?.setValue('');
  }

  onArchivoMasivoSeleccionado(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    if (INPUT?.files?.length) {
      const FILE = INPUT.files[0];
      this.avisoFormulario.get('archivoMasivo')?.setValue(FILE);
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}