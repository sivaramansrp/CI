import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {  FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { CertificadoService } from '../../services/certificado.service';
import { AlertComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TablaDinamicaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import { ColumnasTabla } from '../../models/certificado.model';
const TERCEROS_TEXTO_DE_ALERTA ='Certificados Disponibles';
@Component({
  selector: 'app-cancelacion-de-certificado',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent
],
  templateUrl: './cancelacion-de-certificado.component.html',
  styleUrl: './cancelacion-de-certificado.component.css',
})
export class CancelacionDeCertificadoComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  cancelacionForm!: FormGroup;
  // private subscriptions: Subscription[] = [];
  getTratadoSubscription: any;
  getPaisSubscription: any;
  pais!: CatalogosSelect;
  tratado!: CatalogosSelect;
  bancoSeleccionado!: Catalogo;
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  TablaSeleccion = TablaSeleccion;
  public certificadoDisponsiblesTablaDatos: ColumnasTabla[] = [];
  isBuscar: boolean = false;
  public tratadoCatalogo: CatalogosSelect = {
    labelNombre: 'Tratado/Acuerdo:',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
  public paisCatalogo: CatalogosSelect = {
    labelNombre: 'País / Bloque:',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
 
  constructor(private certificadoService: CertificadoService,
    private fb:FormBuilder
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  ngOnInit(): void {
    this.getTratadoData();
    this.getPaisdata();
    this.getSolicitudesTabla();
  }

  validarDestinatarioFormulario(): void {
    if (this.cancelacionForm.invalid) {
      this.cancelacionForm.markAllAsTouched();
    }
  }
  public headers: ConfiguracionColumna<ColumnasTabla>[] = [
    {encabezado: 'Número de certificado',clave: (ele: ColumnasTabla) => ele.numeroCertificado, orden: 1, },
    {encabezado: 'Pais/Bloque', clave: (ele: ColumnasTabla) => ele.pais,orden: 2,},
    {encabezado: 'Tratado/Acuerdo',clave: (ele: ColumnasTabla) => ele.tratado, orden: 3,},
    {encabezado: 'Fecha expedición',clave: (ele: ColumnasTabla) => ele.fechaExpedicion,orden: 4,},
    {encabezado: 'Fecha vencimíento',clave: (ele: ColumnasTabla) => ele.fechaVencimiento, orden: 5,},
  ];

  onBuscarClick(){
    this.isBuscar = true;
  }
  
  getTratadoData(): void {
    this.certificadoService
      .getTratadoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.tratadoCatalogo.catalogos = resp as Catalogo[];
      });
  }
  getPaisdata(): void {
    this.certificadoService
      .getTratadoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.paisCatalogo.catalogos = resp as Catalogo[];
      });
  }

  public getSolicitudesTabla(): void {
    this.certificadoService.getSolicitudesTabla().subscribe((data) => {
      console.log(data)
      this.certificadoDisponsiblesTablaDatos = data;
    });
  }

  donanteDomicilio(): void {
    this.cancelacionForm = this.fb.group({
      validacionForm: this.fb.group({
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          [Validators.required, Validators.pattern(/^\d+$/)],
        ],
        numeroRegistro: [
          this.solicitudState?.numeroRegistro,
          [Validators.required],
        ],
        nombreComercial: [
          this.solicitudState?.nombreComercial,
          [Validators.required],
        ],
        fechaInicioB: [
          this.solicitudState?.fechaInicioB,
          [Validators.required],
        ],
        fechFinB: [this.solicitudState?.fechFinB, [Validators.required]],
        archivo: [this.solicitudState?.archivo, [Validators.required]],
      }),
    });
    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        fraccionMercanArancelaria: ['', [Validators.required]],
        nombretecnico: [
          '',
          [Validators.required],
        ],
        nombrecomercialdelamercancia: [
          '',
          [Validators.required],
        ],

        criterioparaconferir: ['', [Validators.required]],
        nombreEnIngles: ['', [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        cantidad: [
          this.solicitudState?.cantidad,
          [Validators.required, Validators.pattern(/^\d+$/)],
        ],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valordelamercancia: [
          this.solicitudState?.valordelamercancia,
          [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        complementodeladescripcion: [
          this.solicitudState?.complementodeladescripcion,
          [Validators.required],
        ],
        masabruta: [
          this.solicitudState?.masabruta,
          [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
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

  }
}
