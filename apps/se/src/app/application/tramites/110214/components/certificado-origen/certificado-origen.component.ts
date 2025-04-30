import { AlertComponent, REGEX_PATRON_DECIMAL_2 } from "@libs/shared/data-access-user/src";
import { Catalogo } from "../../models/validar-inicialmente-certificado.model";
import { CatalogoLista, } from "../../models/validar-inicialmente-certificado.model";
import { CatalogoSelectComponent } from "@libs/shared/data-access-user/src";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { DisponiblesTabla } from "../../models/validar-inicialmente-certificado.model";
import { ElementRef } from "@angular/core";
import { FECHAFACTURA } from '../../constants/validar-inicialmente-certificado.enum';
import { FECHAFINAL } from '../../constants/validar-inicialmente-certificado.enum';
import { FECHAINICIAL } from '../../constants/validar-inicialmente-certificado.enum';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { InputFecha } from "@libs/shared/data-access-user/src";
import { InputFechaComponent } from "@libs/shared/data-access-user/src";
import { Modal } from 'bootstrap';
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { REGEX_SOLO_DIGITOS } from "@libs/shared/data-access-user/src";
import { ReactiveFormsModule } from "@angular/forms";
import { SeleccionadasTabla } from "../../models/validar-inicialmente-certificado.model.js";
import { Subject } from "rxjs";
import { TERCEROS_TEXTO_DE_ALERTA } from '../../constants/validar-inicialmente-certificado.enum';
import { TablaDinamicaComponent } from "@libs/shared/data-access-user/src";
import { TablaSeleccion } from "@libs/shared/data-access-user/src";
import { TituloComponent } from "@libs/shared/data-access-user/src";
import { ToastrService } from "ngx-toastr";
import { Tramite110214Query } from "../../../../estados/queries/tramite110214.query";
import { Tramite110214State } from "../../../../estados/tramites/tramite110214.store";
import { Tramite110214Store } from "../../../../estados/tramites/tramite110214.store";
import { ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { ValidarInicialmenteCertificadoService } from "../../services/validar-inicialmente-certificado.service";
import { Validators } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { map } from "rxjs";
import { takeUntil } from "rxjs";

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    AlertComponent,
    CatalogoSelectComponent,
    InputFechaComponent
  ],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy {

  formularioCertificado!: FormGroup;
  public solicitudState!: Tramite110214State;
  destroyNotifier$: Subject<void> = new Subject();
  registroFormulario!: FormGroup;
  estaDeshabilitado: boolean = false;
  public disponiblesEncabezados: ConfiguracionColumna<DisponiblesTabla>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: DisponiblesTabla) => ele.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Nombre técnico',
      clave: (ele: DisponiblesTabla) => ele.nombreTecnico,
      orden: 2,
    },
    {
      encabezado: 'Nombre comercial',
      clave: (ele: DisponiblesTabla) => ele.nombreComercial,
      orden: 3,
    },
    {
      encabezado: 'Número de registro de productos',
      clave: (ele: DisponiblesTabla) => ele.numeroRegistroProductos,
      orden: 4,
    },
    {
      encabezado: 'Fecha expedición',
      clave: (ele: DisponiblesTabla) => ele.fechaExpedicion,
      orden: 5,
    },
    {
      encabezado: 'Fecha vencimiento',
      clave: (ele: DisponiblesTabla) => ele.fechaVencimiento,
      orden: 6,
    },
  ];
  mercanciaDisponsiblesTablaDatos: DisponiblesTabla[] = [];
  disponiblesSeleccionadasFila!: DisponiblesTabla | null;
  public seleccionadasEncabezados: ConfiguracionColumna<SeleccionadasTabla>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: SeleccionadasTabla) => ele.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Cantidad',
      clave: (ele: SeleccionadasTabla) => ele.cantidad,
      orden: 2,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (ele: SeleccionadasTabla) => ele.unidadMedida,
      orden: 3,
    },
    {
      encabezado: 'Valor mercancía',
      clave: (ele: SeleccionadasTabla) => ele.valorMercancia,
      orden: 4,
    },
    {
      encabezado: 'Tipo de factura',
      clave: (ele: SeleccionadasTabla) => ele.tipoFactura,
      orden: 5,
    },
    {
      encabezado: 'Número factura',
      clave: (ele: SeleccionadasTabla) => ele.numFactura,
      orden: 6,
    },
    {
      encabezado: 'Complemento descripción',
      clave: (ele: SeleccionadasTabla) => ele.complementoDescripcion,
      orden: 7,
    },
    {
      encabezado: 'Fecha factura',
      clave: (ele: SeleccionadasTabla) => ele.fechaFactura,
      orden: 8,
    },
  ];
  mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[] = [];
  mercanciaSeleccionadasFila!: SeleccionadasTabla | null;
  tablaSeleccion = TablaSeleccion;
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  @ViewChild('modalArchivo') modalArchivo!: ElementRef;
  @ViewChild('modalBuscar') modalBuscar!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  formularioArchivo!: FormGroup;
  nombreArchivo: string = '';
  optionsTratado!: Catalogo[];
  optionsPais!: Catalogo[];
  fechaInicialInput: InputFecha = FECHAINICIAL;
  fechaFinalInput: InputFecha = FECHAFINAL;
  formularioMercancia!: FormGroup;
  fechaFacturaInput: InputFecha = FECHAFACTURA;
  optionsTipoFactura!: Catalogo[];
  constructor(
    public fb: FormBuilder,
    private validarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
    public store: Tramite110214Store,
    public tramiteQuery: Tramite110214Query,
    private validacionesService: ValidacionesFormularioService
  ) {

  }
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormularioCertificado();
    this.inicializarFormularioMercancia();
    this.inicializarFormularioArchivo();
    this.cargarMercanciasSeleccionadas();
    this.cargarTratado();
    this.cargarPais();
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110214Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  get grupoTratado(): FormGroup {
    return this.formularioCertificado.get('grupoTratado') as FormGroup;
  }
  inicializarFormularioCertificado(): void {
    this.formularioCertificado = this.fb.group({
      tercerOperador: [this.solicitudState?.tercerOperador],
      blnPeriodo: [this.solicitudState?.blnPeriodo, [Validators.required]],
      grupoTratado: this.fb.group({
        tratado: [this.solicitudState?.grupoTratado?.tratado, [Validators.required]],
        pais: [this.solicitudState?.grupoTratado?.pais, [Validators.required]],
        fraccionArancelaria: [this.solicitudState?.grupoTratado?.fraccionArancelaria, []],
        numeroRegistro: [this.solicitudState?.grupoTratado?.numeroRegistro, []],
        nombreComercial: [this.solicitudState?.grupoTratado?.nombreComercial, []],
        fechaFinal: [this.solicitudState?.grupoTratado?.fechaFinalInput, []],
        fechaInicial: [this.solicitudState?.grupoTratado?.fechaInicialInput, []],
      }),
    });
  }
  inicializarFormularioMercancia(): void {
    this.formularioMercancia = this.fb.group({
      fraccionMercanciaArancelaria: [this.solicitudState?.formularioMercancia?.fraccionMercanciaArancelaria, []],
      nombreComercialDelaMercancia: [this.solicitudState?.formularioMercancia?.nombreComercialDelaMercancia, []],
      nombreTecnico: [this.solicitudState?.formularioMercancia?.nombreTecnico, []],
      nombreEnIngles: [this.solicitudState?.formularioMercancia?.nombreEnIngles, []],
      criterioTratoPreferencial: [''],
      valorContenidoRegional: [''],
      otrasInstancias: [this.solicitudState?.formularioMercancia?.otrasInstancias, []],
      cantidad: [this.solicitudState?.formularioMercancia?.cantidad, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
      pais: ['', [Validators.required]],
      valorDelaMercancia: [this.solicitudState?.formularioMercancia?.valorDelaMercancia, [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)]],
      complementoDelaDescripcion: [this.solicitudState?.formularioMercancia?.complementoDelaDescripcion, [Validators.required]],
      numeroSerie: ['', Validators.maxLength(17)],
      fecha: [this.solicitudState?.formularioMercancia?.fecha, []],
      numeroFactura: [this.solicitudState?.formularioMercancia?.numeroFactura, Validators.maxLength(36)],
      tipoFactura: [this.solicitudState?.formularioMercancia?.tipoFactura, []],
    });
  }
  inicializarFormularioArchivo(): void {
    this.formularioArchivo = this.fb.group({
      archivo: ['', [Validators.required]],
    });
  }
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  onClick(): void {
    this.estaDeshabilitado = true;
  }
  cargarTratado(): void {
    this.validarInicialmenteCertificadoService
      .obtenerTratado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.optionsTratado = datos.datos;
        }
      );
  }
  cargarPais(): void {
    this.validarInicialmenteCertificadoService
      .obtenerPais()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.optionsPais = datos.datos;
          this.optionsTipoFactura = datos.datos;
        }
      );
  }
  cargarMercanciasDisponibles(): void {
    this.validarInicialmenteCertificadoService.obtenerMercanciasDisponibles()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.mercanciaDisponsiblesTablaDatos = respuesta;
      });
  }
  cargarMercanciasSeleccionadas(): void {
    this.validarInicialmenteCertificadoService.obtenerMercanciasSeleccionadas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.mercanciaSeleccionadasTablaDatos = respuesta;
      });
  }
  disponiblesSeleccionDeFilas(evento: DisponiblesTabla): void {
    this.disponiblesSeleccionadasFila = evento;
    this.abiertoBuscar();
  }
  abiertoBuscar(): void {
    if (this.modalBuscar) {
      const MODAL_INSTANCE = new Modal(this.modalBuscar.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  seleccionDeFilas(evento: SeleccionadasTabla): void {
    this.mercanciaSeleccionadasFila = evento;
  }
  eliminar(): void {
    if (this.mercanciaSeleccionadasFila) {
      this.mercanciaSeleccionadasTablaDatos = this.mercanciaSeleccionadasTablaDatos.filter(elementos => this.mercanciaSeleccionadasFila?.id !== elementos.id);
      this.mercanciaSeleccionadasFila = null;
    }
  }
  cargaArchivo(): void {
    if (this.modalArchivo) {
      const MODAL_INSTANCE = new Modal(this.modalArchivo.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  alSeleccionarArchivo(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT?.files ? INPUT.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : 'Sin archivos seleccionados';
  }
  enviar(): void {
    this.cerrarModal();
  }
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.formularioCertificado.patchValue({
      grupoTratado: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(this.grupoTratado, 'fechaInicial', 'setGrupoTratadoFechaFinalInput');
  }
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.formularioCertificado.patchValue({
      grupoTratado: {
        fechaFinal: nuevo_fechaFinal,
      },
    });
    this.setValoresStore(this.grupoTratado, 'fechaFinal', 'setGrupoTratadoFechaInicialInput');
  }
  cambioFechaFactura(nuevo_fechaFin: string): void {
    this.formularioMercancia.patchValue({ fecha: nuevo_fechaFin });
    this.setValoresStore(this.formularioMercancia, 'fecha', 'setFecha');
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
