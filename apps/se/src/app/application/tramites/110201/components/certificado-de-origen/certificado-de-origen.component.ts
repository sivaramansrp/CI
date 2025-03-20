import { AlertComponent, CatalogoSelectComponent, CatalogosSelect, TablaDinamicaComponent, TablaSeleccion, TableComponent, TituloComponent,ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ColumnasTabla, SeleccionadasTabla } from '../../models/registro.model';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud110201State, Tramite110201Store } from '../../state/Tramite110201.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import mercanciaDisponsibleTable from '@libs/shared/theme/assets/json/110201/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from '@libs/shared/theme/assets/json/110201/mercancias-seleccionadas.json';
import mercanciaTable from '@libs/shared/theme/assets/json/110201/mercancia.json';


const TERCEROS_TEXTO_DE_ALERTA =
  'Para continuar con el trámite, debes agregar por lo menos una mercancía.';

@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    AlertComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit, OnDestroy {
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  registroForm!: FormGroup;
  mercanciaForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  getTratadoSubscription!: Subscription;
  getPaisSubscription!: Subscription;
  getUMCSubscription!: Subscription;
  getUnidadMedidaSubscription!: Subscription;
  getTipoFacturaSubscription!: Subscription;
  pais!: CatalogosSelect;
  tratado!: CatalogosSelect;
  umc!: CatalogosSelect;
  unidadMedida!: CatalogosSelect;
  tipoFactura!: CatalogosSelect;
  cargarArchivo: boolean = false;
  giveErrors: boolean = false;
  isDisponibles: boolean = false;
  isMercancia = false;
  public getMercanciaDisponsibleTableData = mercanciaDisponsibleTable;
  public getmercanciaSeleccionadasTable = mercanciaSeleccionadasTable;
  public getMercanciaTable = mercanciaTable;
  public mercanciasdisponibles: string[] = [];
  public encabezadosTablas: string[] = [];
  public mercanciasHeader: string[] = [];
  public mercanciasBody: unknown[] = [];
  public solicitudState!: Solicitud110201State;
  public destroyNotifier$: Subject<void> = new Subject();
  TablaSeleccion = TablaSeleccion;
  Tratadodescripcion: unknown[] = [];
  unidadMedidaValue: unknown[] = [];
  selectTratado: string | null = null;
  fraccionArancelariaValue!: string;
  nombreArchivo: string = '';
  isForm:boolean = false;
  

  //MercanciaDisponsibles
  tableData: {
    headers: {
      encabezado: string;
      clave: (ele: ColumnasTabla) => string;
      orden: number;
    }[];
    data: {
      fraccionArancelaria: string;
      nombreTecnico: string;
      nombreComercial: string;
      numeroRegistroProductos: string;
      fechaExpedicion: string;
      fechaVencimiento: string;
    }[];
  } = {
    headers: [
      {
        encabezado: 'Fracción arancelaria',
        clave: (ele: ColumnasTabla) => ele.fraccionArancelaria,
        orden: 1,
      },
      {
        encabezado: 'Nombre técnico',
        clave: (ele: ColumnasTabla) => ele.nombreTecnico,
        orden: 2,
      },
      {
        encabezado: 'Nombre comercial',
        clave: (ele: ColumnasTabla) => ele.nombreComercial,
        orden: 3,
      },
      {
        encabezado: 'Número de registro de productos',
        clave: (ele: ColumnasTabla) => ele.numeroRegistroProductos,
        orden: 4,
      },
      {
        encabezado: 'Fecha expedición',
        clave: (ele: ColumnasTabla) => ele.fechaExpedicion,
        orden: 5,
      },
      {
        encabezado: 'Fecha vencimíento',
        clave: (ele: ColumnasTabla) => ele.fechaVencimiento,
        orden: 6,
      },
    ],
    data: [
      {
        fraccionArancelaria: '123456789',
        nombreTecnico: 'Los demás',
        nombreComercial: 'NOM COMERCIAL',
        numeroRegistroProductos: '112233445566',
        fechaVencimiento: '2041-12-01',
        fechaExpedicion: '2021-12-01',
      },
    ],
  };
  //MercanciaSeleccionadas
  tableSeleccionadas: {
    headers: {
      encabezado: string;
      clave: (ele: SeleccionadasTabla) => string;
      orden: number;
    }[];
    data: {
      fraccionArancelaria: string;
      cantidad: string;
      unidadMedida: string;
      valorMercancia: string;
      tipoFactura: string;
      numFactura: string;
      complementoDescripcion: string;
      fechaFactura: string;
    }[];
  } = {
    headers: [
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
    ],
    data: [
      {
        fraccionArancelaria:
          this.mercanciaForm?.value.validacionMercanciaForm.fraccionArancelaria,
        cantidad: this.mercanciaForm?.value.validacionMercanciaForm.cantidad,
        unidadMedida:
          this.mercanciaForm?.value.validacionMercanciaForm.unidadMedida,
        valorMercancia:
          this.mercanciaForm?.value.validacionMercanciaForm.valorMercancia,
        tipoFactura:
          this.mercanciaForm?.value.validacionMercanciaForm.tipoFactura,
        numFactura:
          this.mercanciaForm?.value.validacionMercanciaForm.numFactura,
        complementoDescripcion:
          this.mercanciaForm?.value.validacionMercanciaForm
            .complementoDescripcion,
        fechaFactura: this.mercanciaForm?.value.validacionMercanciaForm.fecha,
      },
    ],
  };

  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    private store: Tramite110201Store,
    private query: Tramite110201Query,
    private validacionesService: ValidacionesFormularioService,
   
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }


  handleClick(row:any){
    this.isForm = true;
  }

  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  validarmercanciaForm(): void {
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.mercanciaDisponsible();
    this.mercanciaSeleccionadas();
    this.mercanciatable();
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.subscriptions.push(
      this.query.selectTratado$.subscribe((tratado) => {
        this.tratado = {
          labelNombre: 'Tratado/Acuerdo',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: tratado ?? [],
        };
        this.Tratadodescripcion = this.tratado.catalogos;
      })
    );

    this.subscriptions.push(
      this.query.selectPais$.subscribe((pais) => {
        this.pais = {
          labelNombre: 'País / Bloque',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: pais ?? [],
        };
      })
    );

    this.subscriptions.push(
      this.query.selectUMC$.subscribe((umc) => {
        this.umc = {
          labelNombre: 'UMC',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: umc ?? [],
        };
      })
    );

    this.subscriptions.push(
      this.query.selectUnidadMedida$.subscribe((unidadMedida) => {
        this.unidadMedida = {
          labelNombre: 'Unidad de medida de la masa bruta',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: unidadMedida ?? [],
        };
        this.unidadMedidaValue = this.unidadMedida.catalogos;
        
      })
    );

    this.subscriptions.push(
      this.query.selectTipoFactura$.subscribe((tipoFactura) => {
        this.tipoFactura = {
          labelNombre: 'Tipo de factura',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: tipoFactura ?? [],
        };
      })
    );
  }

  buscarMercancias() {
    if (this.Tratadodescripcion.includes('1')) {
      this.isDisponibles = true;
    } else {
      this.isDisponibles = false;
    }  

  }

  agregar() {
    if (this.mercanciaForm.valid) {
      this.isMercancia = true;
      this.isForm = false
      this.tableSeleccionadas.data.splice(0,1,{
        fraccionArancelaria:
          this.mercanciaForm?.value.validacionMercanciaForm
            .fraccionMercanArancelaria,
        cantidad: this.mercanciaForm?.value.validacionMercanciaForm.cantidad,
        unidadMedida:
          this.mercanciaForm?.value.validacionMercanciaForm.unidadMedida,
        valorMercancia:
          this.mercanciaForm?.value.validacionMercanciaForm.valordelamercancia,
        tipoFactura:
          this.mercanciaForm?.value.validacionMercanciaForm.tipoFactura,
        numFactura: this.mercanciaForm?.value.validacionMercanciaForm.nFactura,
        complementoDescripcion:
          this.mercanciaForm?.value.validacionMercanciaForm
            .complementodeladescripcion,
        fechaFactura: this.mercanciaForm?.value.validacionMercanciaForm.fecha,
      });

    
    }
  }

  modificar(){
    this.isForm = true;
    this.isMercancia = false;
  }

  public mercanciaDisponsible(): void {
    this.mercanciasdisponibles =
      this.getMercanciaDisponsibleTableData.tableHeader;
  }

  public mercanciaSeleccionadas(): void {
    this.encabezadosTablas = this.getmercanciaSeleccionadasTable.tableHeader;
  }
  public mercanciatable(): void {
    this.mercanciasHeader = this.getMercanciaTable.tableHeader;
    this.mercanciasBody = this.getMercanciaTable.tableBody;
  }

  cargaArchivo() {
    this.cargarArchivo = true;
  }
  giveError() {
    this.giveErrors = true;
    this.cargarArchivo = false;
  }

  getTratado(): void {
    this.getTratadoSubscription = this.registroService
      .getTratado()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setTratado(RESPONSE);
        }
      });
  }

  getPais(): void {
    this.getPaisSubscription = this.registroService
      .getPais()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setPais(RESPONSE);
        }
      });
  }

  getUMC(): void {
    this.getUMCSubscription = this.registroService
      .getUMC()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setUMC(RESPONSE);
        }
      });
  }

  getUnidadMedida(): void {
    this.getUnidadMedidaSubscription = this.registroService
      .getUnidadMedida()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setUnidadMedida(RESPONSE);
        }
      });
  }

  getTipoFactura(): void {
    this.getTipoFacturaSubscription = this.registroService
      .getTipoFactura()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setTipoFactura(RESPONSE);
        }
      });
  }

 cerrarAdjuntarArchivoMercancias(): void {
    // Implement the logic to close the form or navigate away
    this.cargarArchivo = false;
  }

  alSeleccionarArchivo(event: any) {
    const FILE = event.target.files[0];
    this.nombreArchivo = FILE ? FILE.name : 'No se eligió ningún archivo';
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
       // Aquí se implementará la lógica para manejar el envío del formulario.
    }
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }

  get validacionMercanciaForm(): FormGroup {
    return this.mercanciaForm.get('validacionMercanciaForm') as FormGroup;
  }

  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      validacionForm: this.fb.group({
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          [Validators.required],
        ],
        numRegistro: [this.solicitudState?.numRegistro, [Validators.required]],
        nomComercial: [
          this.solicitudState?.nomComercial,
          [Validators.required],
        ],
        fechInicioB: [this.solicitudState?.fechInicioB, [Validators.required]],
        fechFinB: [this.solicitudState?.fechFinB, [Validators.required]],
        archivo: [this.solicitudState?.archivo, [Validators.required]],
      }),
    });
    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        fraccionMercanArancelaria: [ 
          '123456789',
          [Validators.required],
        ],
        nombretecnico: [
          'Poli(butadieno-estireno), con un contenido reaccionado de butadieno superior o',
          [Validators.required],
        ],
        nombrecomercialdelamercancia: [
          'Patitos de hule',
          [Validators.required],
        ],

        criterioparaconferir: [
         'SIN_CRIT',
          [Validators.required],
        ],
        nomreeningles: [
          'rubber ducklings',
          [Validators.required],
        ],
        marca: [this.solicitudState?.marca, [Validators.required]],
        cantidad: [this.solicitudState?.cantidad, [Validators.required]],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valordelamercancia: [
          this.solicitudState?.valordelamercancia,
          [Validators.required],
        ],
        complementodeladescripcion: [
          this.solicitudState?.complementodeladescripcion,
          [Validators.required],
        ],
        masabruta: [this.solicitudState?.masabruta, [Validators.required]],
        unidadMedida: [
          this.solicitudState?.unidadMedida,
          [Validators.required],
        ],
        tipoFactura: [this.solicitudState?.tipoFactura, [Validators.required]],
        fecha: [this.solicitudState?.fecha, [Validators.required]],
        nFactura: [this.solicitudState?.nFactura, [Validators.required]],
      }),
    });

  }
  ngOnDestroy(): void {
    if (this.getTratadoSubscription) {
      this.getTratadoSubscription.unsubscribe();
    }
    if (this.getPaisSubscription) {
      this.getPaisSubscription.unsubscribe();
    }
    if (this.getUMCSubscription) {
      this.getUMCSubscription.unsubscribe();
    }
    if (this.getUnidadMedidaSubscription) {
      this.getUnidadMedidaSubscription.unsubscribe();
    }
    if (this.getTipoFacturaSubscription) {
      this.getTipoFacturaSubscription.unsubscribe();
    }
    this.destroyNotifier$.next();
  }
}
