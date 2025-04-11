import { Catalogo, CatalogoSelectComponent, CatalogosSelect, ConfiguracionColumna, InputFecha, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ColumnasTabla, CrossList, FECHA_FINAL, FECHA_INICIAL, ListaClave, Mercancia } from '../../models/consulta.model';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CrosslistComponent, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud260704State, Tramite260704Store } from '../../estados/Tramite260704.store';
import { AVISO_PRIVACIDAD } from '../../constantes/consulta.enum';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../service/consulta.service';
import { Modal } from 'bootstrap';
import { Tramite260704Query } from '../../estados/Tramite260704.query';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputFechaComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    CrosslistComponent,
    TituloComponent,
    CommonModule,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.css',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  @ViewChild('modalAlerta') modalElement!: ElementRef;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  datosDelEstablecimientoForm!: FormGroup;
  modificacionForm!: FormGroup;
  scianForm!: FormGroup;
  valorSeleccionado: string = '';
  hercelosSeleccionados!: string;
  paisOrigen = false;
  paisProcedencisColapsable = false;
  usoEspecifico = false;
  habilitarEstado: boolean = true;
  esAvisoFuncionamientoSeleccionado: boolean = false;
  esCheckboxSeleccionado: boolean = false;
  esDatosSCIANSeleccionado: boolean = false;
  esTipoOperacionSeleccionado: boolean = true;
  paisOrigenCrossList: CrossList = {} as CrossList;
  paisProcedencisCrossList: CrossList = {} as CrossList;
  usoEspecificoCrossList: CrossList = {} as CrossList;
  fechaInicialInput: InputFecha = FECHA_INICIAL;
  fechaFinalInput: InputFecha = FECHA_FINAL;
  AVISO_PRIVACIDAD = AVISO_PRIVACIDAD;
  certificadoDisponsiblesTablaDatos: ColumnasTabla[] = [];
  mercanciasConfiguracionTabla: Mercancia[] = [];
  listaClaveTabla: ListaClave[] = [];
  public solicitudState!: Solicitud260704State;
  TablaSeleccion = TablaSeleccion;
  descripcionScian!: Catalogo[];
  claveScian!: Catalogo[];

  @Input() radioOpions: {
    label: string;
    value: string | number;
    hint?: string;
  }[] = [];

  radioOpcions = [
    { label: 'Prórroga', value: 'prorroga' },
    { label: 'Modificación', value: 'modificacion' },
    { label: 'Modificación y prórroga', value: 'modificacionYProrroga' },
  ];

  opcionesRadioHacerlos = [
    { label: 'No', value: 'no' },
    { label: 'Sí', value: 'si' },
  ];

  public estadoCatalogo: CatalogosSelect = {
    labelNombre: 'Estado',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  public catalogoClave: CatalogosSelect = {
    labelNombre: 'Estado',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  public encabezados: ConfiguracionColumna<ColumnasTabla>[] = [
    {
      encabezado: 'Clave S.C.I.A.N.',
      clave: (ele: ColumnasTabla) => ele.claveScian,
      orden: 1,
    },
    {
      encabezado: 'Descripción del S.C.I.A.N.',
      clave: (ele: ColumnasTabla) => ele.descripcionScian,
      orden: 2,
    },
  ];

  public mercanciasDatos: ConfiguracionColumna<Mercancia>[] = [
    {
      encabezado: 'Clasificación del producto',
      clave: (item: Mercancia) => item.clasificaionProductos,
      orden: 1,
    },
    {
      encabezado: 'Especificar Clasificación del producto',
      clave: (item: Mercancia) => item.especificarProducto,
      orden: 2,
    },
    {
      encabezado: 'Denominación específico del producto',
      clave: (item: Mercancia) => item.nombreProductoEspecifico,
      orden: 3,
    },
    {
      encabezado: 'Marca',
      clave: (item: Mercancia) => item.marca,
      orden: 4,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: Mercancia) => item.fraccionArancelaria,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la fracción arancelaria',
      clave: (item: Mercancia) => item.descripcionFraccionArancelaria,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida de comercialización (UMC)',
      clave: (item: Mercancia) => item.umc,
      orden: 7,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (item: Mercancia) => item.cantidadUMC,
      orden: 8,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (item: Mercancia) => item.umt,
      orden: 9,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: Mercancia) => item.cantidadUMT,
      orden: 10,
    },
    {
      encabezado: 'País de origen',
      clave: (item: Mercancia) => item.paisDeOrigen,
      orden: 11,
    },
    {
      encabezado: 'País de procedencia',
      clave: (item: Mercancia) => item.paisDeProcedencia,
      orden: 12,
    },
    {
      encabezado: 'Tipo de producto',
      clave: (item: Mercancia) => item.tipoProducto,
      orden: 13,
    },
    {
      encabezado: 'Uso específico',
      clave: (item: Mercancia) => item.usoEspecifico,
      orden: 14,
    },
  ];

  public listaClave: ConfiguracionColumna<ListaClave>[] = [
    {
      encabezado: 'Clave de los lotes',
      clave: (ele: ListaClave) => ele.claveDeLosLotes,
      orden: 1,
    },
    {
      encabezado: 'Fecha de fabricación',
      clave: (ele: ListaClave) => ele.fechaDeFabricacion,
      orden: 2,
    },
    {
      encabezado: 'Fecha de caducidad',
      clave: (ele: ListaClave) => ele.fechaDeCaducidad,
      orden: 3,
    },
  ];

  constructor(
    private consulta: ConsultaService,
    public store: Tramite260704Store,
    private query: Tramite260704Query,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
  ) { // Constructor vacío, no requiere inicialización adicional.
    }

  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.obtenerTablaScian();
    this.obtenerDatosEstado();
    this.obtenerTablaMercancias();
    this.obtenerDatosClave();
    this.obtenerTablaListaClave();
  }
  public obtenerTablaScian(): void {
    this.consulta
      .obtenerTablaScian()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.certificadoDisponsiblesTablaDatos = data;
      });
  }
  public obtenerTablaMercancias(): void {
    this.consulta
      .obtenerTablaMercancias()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.mercanciasConfiguracionTabla = data;
      });
  }

  public obtenerTablaListaClave(): void {
    this.consulta
      .obtenerTablaListaClave()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.listaClaveTabla = data;
      });
  }
  public aceptar(): void {
    this.datosDelEstablecimientoForm.enable();
    this.habilitarEstado = false;
  }
  public claveScianSeleccion(): void {
    const CLAVE_SCIAN = this.scianForm.get('cveSCIAN')?.value;
    this.consulta.getDescripcionScian()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          const SCIAN_DESCRIPCION = result.data[0].descripcion;
          this.scianForm.get('cveSCIANDescripcion')?.setValue(SCIAN_DESCRIPCION);
          this.store.setDescripcionScian(SCIAN_DESCRIPCION);
        }
      })
    this.store.setClaveScian(CLAVE_SCIAN);
  }
  public seleccionarEstablecimiento(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  public obtenerDatosEstado(): void {
    this.consulta
      .obtenerDatosEstado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.estadoCatalogo.catalogos = resp as Catalogo[];
      });
  }
  obtenerDatosClave(): void {
    this.consulta
      .obtenerDatosClave()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.catalogoClave.catalogos = resp as Catalogo[];
      });
  }

  public agregarMercanciaGrid(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  verificarSeleccionCheckbox(event: MouseEvent): void {

    const CHECKBOX = (event.target as HTMLInputElement).closest('input[type="checkbox"]');
    if (CHECKBOX) {
      this.esCheckboxSeleccionado = (CHECKBOX as HTMLInputElement).checked;
    } else {
      this.esCheckboxSeleccionado = false;
    }

  }

  get validacionForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionForm') as FormGroup;
  }

  get validacionMercanciaForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionMercanciaForm') as FormGroup;
  }

  get validacionScionForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionScionForm') as FormGroup;
  }

  get validacionAduanaMercanciaForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionAduanaMercanciaForm') as FormGroup;
  }

  get validacionDatosMercanciaForm(): FormGroup {
    return this.datosDelEstablecimientoForm.get('validacionDatosMercanciaForm') as FormGroup;
  }

  alCambiarSeleccion(form: FormGroup, campo: string): void {
    if (form.get(campo)?.value === 'modificacion') {
      this.esTipoOperacionSeleccionado = true;
      this.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.enable();
      this.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.enable();
      this.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.enable();
    } else if(form.get(campo)?.value === 'modificacionYProrroga' || form.get(campo)?.value === 'prorroga') {
      this.esTipoOperacionSeleccionado = false;
      this.datosDelEstablecimientoForm.get('validacionForm.justificacion')?.disable();
      this.datosDelEstablecimientoForm.get('validacionForm.razonSocial')?.disable();
      this.datosDelEstablecimientoForm.get('validacionForm.correoElectronico')?.disable();

    }
  }

  eliminarMercanciaGrid(): void {
    if (this.modalElement) {
      const MODAL_ELIMINAR_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_ELIMINAR_INSTANCE.show();
    }
  }

  establecerAvisoDeFuncionamiento(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.esAvisoFuncionamientoSeleccionado = VALOR;
    this.store.setAvisoDeFuncionamiento(VALOR);
  }
  establecerLicenciaSanitaria(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.store.setLicenciaSanitaria(VALOR);
  }

  paisOrigenColapsable(): void {
    this.paisOrigen = !this.paisOrigen;
  }

  paisProcedencis_colapsable(): void {
    this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
  }
  establecerClaveDeLosLotes(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.store.setClaveDeLosLotes(VALOR);
  }

  usoEspecificoColapsable(): void {
    this.usoEspecifico = !this.usoEspecifico;
  }

  agregarMercanias(): void {
    const OBJETO_JSON = {
      clasificaionProductos: this.datosDelEstablecimientoForm.get('clasificaionProductos')?.value,
      especificarProducto: this.datosDelEstablecimientoForm.get('especificarProducto')
        ?.value,
      nombreProductoEspecifico: this.datosDelEstablecimientoForm.get(
        'nombreProductoEspecifico'
      )?.value,
      marca: this.datosDelEstablecimientoForm.get('marca')?.value,
      tipoProducto: this.datosDelEstablecimientoForm.get('tipoProducto')?.value,
      fraccionArancelaria: this.datosDelEstablecimientoForm.get('fraccionArancelaria')
        ?.value,
      descripcionFraccionArancelaria: this.datosDelEstablecimientoForm.get(
        'descripcionFraccionArancelaria'
      )?.value,
      cantidadUMT: this.datosDelEstablecimientoForm.get('cantidadUMT')?.value,
      umt: this.datosDelEstablecimientoForm.get('umt')?.value,
      cantidadUMC: this.datosDelEstablecimientoForm.get('cantidadUMC')?.value,
      umc: this.datosDelEstablecimientoForm.get('umc')?.value,
      paisDeOrigen: 'paisDeOrigen',
      paisDeProcedencia: 'paisDeProcedencia',
      usoEspecifico: 'usoEspecifico',
    };
    this.store.addMercanciasDatos(OBJETO_JSON);
  }

  AcceptarEliminarScian():void {

    this.esDatosSCIANSeleccionado = true;
  }
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260704Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
    this.alCambiarSeleccion(form, campo);
  }
  donanteDomicilio(): void {
    this.datosDelEstablecimientoForm = this.fb.group({
      validacionForm: this.fb.group({
        tipoOperacion: [this.solicitudState?.tipoOperacion, [Validators.required]],
        justificacion: [this.solicitudState?.justificacion, [Validators.required]],
        establecimiento: [this.solicitudState?.establecimiento, [Validators.required]],
        razonSocial: [this.solicitudState?.razonSocial, [Validators.required]],
        correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required]],

      }),

      validacionMercanciaForm: this.fb.group({
        codigoPostal: [this.solicitudState?.codigoPostal, [Validators.required]],
        estado: [this.solicitudState?.estado, [Validators.required]],
        municipio: [this.solicitudState?.municipio, [Validators.required]],
        localidad: [this.solicitudState?.localidad, [Validators.required]],
        colonia: [this.solicitudState?.colonia, [Validators.required]],
        calle: [this.solicitudState?.calle, [Validators.required]],
        lada: [this.solicitudState?.lada, [Validators.required]],
        telefono: [this.solicitudState?.telefono, [Validators.required]],

      }),
      validacionScionForm: this.fb.group({
        scian: [this.solicitudState?.scian, [Validators.required]],
        scianDatos: [this.solicitudState?.scianDatos, [Validators.required]],
        claveScian: [this.solicitudState?.claveScian, [Validators.required]],
        descripcionScian: [this.solicitudState?.descripcionScian, [Validators.required]],

      }),
      validacionAduanaMercanciaForm: this.fb.group({
        avisoDeFuncionamiento: [this.solicitudState?.avisoDeFuncionamiento, [Validators.required]],
        licenciaSanitaria: [this.solicitudState?.licenciaSanitaria, [Validators.required]],
        regimen: [this.solicitudState?.regimen, [Validators.required]],
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        immex: [this.solicitudState?.immex, [Validators.required]],
        ano: [this.solicitudState?.ano, [Validators.required]],

      }),
      validacionDatosMercanciaForm: this.fb.group({
        // mercancia: [this.solicitudState?.mercancia, [Validators.required]],
        clasificacionProducto: [this.solicitudState?.clasificacionProducto, [Validators.required]],
        especificarClasificacionProducto: [this.solicitudState?.especificarClasificacionProducto, [Validators.required]],
        denominacionProducto: [this.solicitudState?.denominacionProducto, [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        tipoProducto: [this.solicitudState?.tipoProducto, [Validators.required]],
        especifique: [this.solicitudState?.especifique, [Validators.required]],
        fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, [Validators.required]],
        descripcionFraccionArancelaria: [this.solicitudState?.descripcionFraccionArancelaria, [Validators.required]],
        cantidadUMT: [this.solicitudState?.cantidadUMT, [Validators.required]],
        umt: [this.solicitudState?.umt, [Validators.required]],
        cantidadUMC: [this.solicitudState?.cantidadUMC, [Validators.required]],
        umc: [this.solicitudState?.umc, [Validators.required]],
        claveLote: [this.solicitudState?.claveLote, [Validators.required]],
        listaClave: [this.solicitudState?.listaClave, [Validators.required]],


      }),
      manfestosYDeclaraciones: [this.solicitudState?.manfestosYDeclaraciones, [Validators.required]],
      hacerlosPublicos: [this.solicitudState?.hacerlosPublicos, [Validators.required]],
      rfc: [this.solicitudState?.rfc, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
