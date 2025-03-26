import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BtnContinuarComponent,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  DatosPasos,
  InputFecha,
  ListaPasosWizard,
  PASOS,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { CertificadoService } from '../../services/certificado.service';
import { AlertComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TablaDinamicaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import { ColumnasTabla, FECHAFINAL, FECHAINICIAL } from '../../models/certificado.model';
import { Solicitud110219State, Tramite110219Store } from '../../estados/Tramite110219.store';
import { Tramite110219Query } from '../../estados/Tramite110219.query';
import { InputFechaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component";
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
    TablaDinamicaComponent,
    InputFechaComponent, BtnContinuarComponent
],
  templateUrl: './cancelacion-de-certificado.component.html',
  styleUrl: './cancelacion-de-certificado.component.css',
})
export class CancelacionDeCertificadoComponent implements OnInit, OnDestroy {

  cancelacionForm!: FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public certificadoDisponsiblesTablaDatos: ColumnasTabla[] = [];
  @Output() dataEvent = new EventEmitter<number>();
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  fechaInicialInput: InputFecha = FECHAINICIAL;
  fechaFinalInput: InputFecha =FECHAFINAL;
  public solicitudState!: Solicitud110219State;
  pasos: ListaPasosWizard[] = PASOS;
  TablaSeleccion = TablaSeleccion;
  estaBuscando: boolean = false;
  tratado!: CatalogosSelect;
  pais!: CatalogosSelect;
  indice: number = 1;


  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

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
    private fb:FormBuilder, 
    private validacionesService: ValidacionesFormularioService,
    private store: Tramite110219Store,
    private query: Tramite110219Query,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  ngOnInit(): void {
    this.getTratadoData();
    this.getPaisdata();
    this.getSolicitudesTabla();

    this.query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
  this.donanteDomicilio();
  }

  public headers: ConfiguracionColumna<ColumnasTabla>[] = [
    {encabezado: 'Número de certificado',clave: (ele: ColumnasTabla) => ele.numeroCertificado, orden: 1, },
    {encabezado: 'Pais/Bloque', clave: (ele: ColumnasTabla) => ele.pais,orden: 2,},
    {encabezado: 'Tratado/Acuerdo',clave: (ele: ColumnasTabla) => ele.tratado, orden: 3,},
    {encabezado: 'Fecha expedición',clave: (ele: ColumnasTabla) => ele.fechaExpedicion,orden: 4,},
    {encabezado: 'Fecha vencimíento',clave: (ele: ColumnasTabla) => ele.fechaVencimiento, orden: 5,},
  ];

  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.cancelacionForm.patchValue({
      validacionForm: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(this.validacionForm, 'fechaInicial', 'setFechaInicial');
  }

  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.cancelacionForm.patchValue({
      validacionForm: {
        fechaFinal: nuevo_fechaFinal,
      },
    });

    this.setValoresStore(this.validacionForm, 'fechaFinal', 'setFechaFinal');
  }
   
  validarDestinatarioFormulario(): void {
    if (this.cancelacionForm.invalid) {
      this.cancelacionForm.markAllAsTouched();
    }
  }
 
  alBuscarClic(){
    this.estaBuscando = true;
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
      this.certificadoDisponsiblesTablaDatos = data;
    });
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110219Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
 
  get validacionForm(): FormGroup {
    return this.cancelacionForm.get('validacionForm') as FormGroup;
  }

  donanteDomicilio(): void {
    this.cancelacionForm = this.fb.group({
      validacionForm: this.fb.group({
        numeroCertificado:[this.solicitudState?.numeroCertificado,[Validators.required]],
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fechaInicial: [this.solicitudState?.fechaInicial,[Validators.required]],
        fechaFinal: [this.solicitudState?.fechaFinal, [Validators.required]],
      }),
    });
  }

  emitirEventoClick(){
     this.dataEvent.emit(3);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
