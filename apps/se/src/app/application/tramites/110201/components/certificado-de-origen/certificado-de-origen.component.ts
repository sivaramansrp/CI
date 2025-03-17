import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CatalogosSelect,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { RegistroService } from '../../services/registro.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/table/table.component';
import { AlertComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import mercanciaDisponsibleTable from 'libs/shared/theme/assets/json/110201/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from 'libs/shared/theme/assets/json/110201/mercancias-seleccionadas.json';
import mercanciaTable from 'libs/shared/theme/assets/json/110201/mercancia.json';
import {
  Solicitud110201State,
  Tramite110201Store,
} from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { map, Subject, Subscription, takeUntil } from 'rxjs';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { ColumnasTabla, SeleccionadasTabla } from '../../models/registro.model';

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
  private subscriptions: Subscription[] = [];
  registroForm!: FormGroup;
  mercanciaForm!: FormGroup;
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  pais!: CatalogosSelect;
  tratado!: CatalogosSelect;
  cargarArchivo: boolean = false;
  giveErrors: boolean = false;
  nombreArchivo: string = '';
  public getMercanciaDisponsibleTableData = mercanciaDisponsibleTable;
  public getmercanciaSeleccionadasTable = mercanciaSeleccionadasTable;
  public getMercanciaTable = mercanciaTable;
  public mercanciasdisponibles: string[] = [];
  public encabezadosTablas: string[] = [];
  public mercanciasHeader: string[] = [];
  public mercanciasBody: unknown[] = [];
  public solicitudState!: Solicitud110201State;
  private destroyNotifier$: Subject<void> = new Subject();
  getTratadoSubscription!: Subscription;
  getPaisSubscription!: Subscription;
  isDisponibles: boolean = false;
  TablaSeleccion = TablaSeleccion;
  Tratadodescripcion: unknown[] = [];
  selectTratado: string | null = null;
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
        fraccionArancelaria: '123456789',
        cantidad: '1',
        unidadMedida: 'Kilogramos',
        valorMercancia: '1000',
        tipoFactura: 'Factura',
        numFactura: '123456',
        complementoDescripcion: 'Complemento',
        fechaFactura: '2021-12-01',
      },
    ],
  };

  constructor(
    private registroService: RegistroService,
    private fb: FormBuilder,
    private store: Tramite110201Store,
    private query: Tramite110201Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
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
  }

  buscarMercancias() {
    if (this.Tratadodescripcion.includes('1')) {
      this.isDisponibles = true;
    }
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

  cerrarAdjuntarArchivoMercancias(): void {
    // Implement the logic to close the form or navigate away
  }

  alSeleccionarArchivo(event: any) {
    const file = event.target.files[0];
    this.nombreArchivo = file ? file.name : 'No se eligió ningún archivo';
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
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
          this.solicitudState?.fraccionMercanArancelaria,
          [Validators.required],
        ],
        nombretecnico: [this.solicitudState?.nombretecnico, [Validators.required]],
        nombrecomercialdelamercancia: [this.solicitudState?.nombrecomercialdelamercancia, [Validators.required]],

        criterioparaconferir: [
          this.solicitudState?.criterioparaconferir,
          [Validators.required],
        ],
        nomreeningles: [this.solicitudState?.nomreeningles, [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        cantidad: [this.solicitudState?.cantidad, [Validators.required]],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valordelamercancia: [this.solicitudState?.valordelamercancia, [Validators.required]],
        complementodeladescripcion: [ this.solicitudState?.complementodeladescripcion, [Validators.required]],
        masabruta: [this.solicitudState?.masabruta, [Validators.required]],
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
    this.destroyNotifier$.next();
  }
}
