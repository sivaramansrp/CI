import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComunesService } from '../../services/datos-comunes.service';
import { map, Subject, takeUntil } from 'rxjs';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputCheckComponent, InputRadioComponent, REGEX_RFC, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import dinamicaradio from 'libs/shared/theme/assets/json/31602/dinamica-radio-datos.json';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import { AGREGAR_MIEMBRO_TABLA, DATOS_COMUNES_TEXTOS, DATOS_COMUNES_TEXTOS_DOS, Miembro } from '../../models/datos-comunes.model';
import { FederalDeTrabajaoComponent } from '../federal-de-trabajao/federal-de-trabajao.component';
import { DatosComunesDosComponent } from '../datos-comunes-dos/datos-comunes-dos.component';
import { TituloComponent } from "../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatosComunesState, DatosComunesStore } from '../../estados/stores/datos-comunes.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosComunesQuery } from '../../estados/queries/datos-comunes.query';

@Component({
  selector: 'shared-datos-comunes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    InputCheckComponent,
    CatalogoSelectComponent,
    AlertComponent,
    FederalDeTrabajaoComponent,
    DatosComunesDosComponent,
    TituloComponent,
    TablaDinamicaComponent
],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.scss',
})
export class DatosComunesComponent implements OnInit, OnDestroy {

  public comunesForm!: FormGroup;
  public agregarMiembroDeLaEmpresaFrom!: FormGroup;
  public dinamicaRadio = dinamicaradio;
  private destroyNotifier$: Subject<void> = new Subject();
  public radioOptions = radio_si_no;
  public sectorProductivoAgace: Catalogo[] = [];
  public serviciosAgace: Catalogo[] = [];
  public TEXTOS = DATOS_COMUNES_TEXTOS;
  public comboBimestresIDC: Catalogo[] = [];
  public TEXTOSDOS = DATOS_COMUNES_TEXTOS_DOS;
  public infoAlert = 'alert-danger';
  public cambioObj = {
    empleadosPropios: false,
    deTrabajao: false,
    obligadoaTributaren: '',
  };
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  public agregarMiembroTabla: ConfiguracionColumna<Miembro>[] = AGREGAR_MIEMBRO_TABLA;
  public agregarMiembroTablaDatos: Miembro[] = [];
  modalRef?: BsModalRef;
  public enSuCaracterDeOptions: Catalogo[] = [];
  public nacionalidadOptions: Catalogo[] = [];
  public tipoDePersona: Catalogo[] = [];
  public solicitudState!: DatosComunesState;


  constructor(
    private datosComunesSvc: DatosComunesService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private datosComunesStore: DatosComunesStore,
    private datosComunesQuery: DatosComunesQuery
  ) {
    // Constructor de la clase DatosComunesComponent
  }

  ngOnInit(): void {
    this.datosComunesQuery.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
      this.solicitudState = seccionState;
    })).subscribe();
    this.getSectorProductivoAgace();
    this.getServiciosAgace();
    this.getAgregarMiembroTablaDatos();
    this.crearComunesForm();
    this.crearAgregarMiembroForm();
    this.obtenerAgregarMiembroDatos();
  }

  public crearComunesForm(): void {
    this.comunesForm = this.fb.group({
      autorizacionIVAIEPS: [this.solicitudState?.autorizacionIVAIEPS, Validators.required],
      regimenUno:[this.solicitudState?.regimenUno],
      regimenDos:[this.solicitudState?.regimenDos],
      regimenTres:[this.solicitudState?.regimenTres],
      sectorProductivo:[this.solicitudState?.sectorProductivo],
      servicio:[this.solicitudState?.servicio],
      preOperativo: [this.solicitudState?.preOperativo, Validators.required],
      indiqueSi: [this.solicitudState?.indiqueSi, Validators.required],
      senale: [this.solicitudState?.senale, Validators.required],
      empPropios:[this.solicitudState?.empPropios,Validators.maxLength(8)],
      bimestre:[this.solicitudState?.bimestre],
      senaleSi: [this.solicitudState?.senaleSi, Validators.required],
      seMomento: [this.solicitudState?.seMomento, Validators.required],
      // cumplir: [this.solicitudState?.cumplir, Validators.required],
      // indique: [this.solicitudState?.indique, Validators.required],
      encuentra: [this.solicitudState?.encuentra, Validators.required],
      delMismo: [this.solicitudState?.delMismo, Validators.required],
      senaleMomento: [this.solicitudState?.senaleMomento, Validators.required],
      enCaso: [this.solicitudState?.enCaso, Validators.required]
    });
  }

  public crearAgregarMiembroForm(): void {
    this.agregarMiembroDeLaEmpresaFrom = this.fb.group({
      enSuCaracterde: ['', Validators.required],
      obligadoaTributarenMexico: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      registroFederaldeContribuyentes: [
        { value: '', disabled: true },
        Validators.required,
      ],
      rfc: ['', [Validators.required]],
      nombreCompleto: [
        { value: '', disabled: true },
        Validators.required,
      ],
    });
  }

  public obtenerAgregarMiembroDatos(): void {
    this.agregarMiembroDeLaEmpresaFrom.get('enSuCaracterde')?.setValue('1');
    this.agregarMiembroDeLaEmpresaFrom.get('obligadoaTributarenMexico')?.setValue('Si');
    this.agregarMiembroDeLaEmpresaFrom.get('nacionalidad')?.setValue('1');
    this.agregarMiembroDeLaEmpresaFrom.get('registroFederaldeContribuyentes')?.setValue('HEJE780514BVA');
    this.agregarMiembroDeLaEmpresaFrom.get('rfc')?.setValue('CDGFN780514BVA');
    this.agregarMiembroDeLaEmpresaFrom.get('nombreCompleto')?.setValue('ERNESTO HERNÁNDEZ URI');
  }

  public getSectorProductivoAgace(): void {
    this.datosComunesSvc.getProductivoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.sectorProductivoAgace = JSON.parse(JSON.stringify(response));
    });
  }

  public getServiciosAgace(): void {
    this.datosComunesSvc.getServiciosAgaceDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.serviciosAgace = JSON.parse(JSON.stringify(response));
    });
  }

  public getAgregarMiembroTablaDatos(): void {
    this.datosComunesSvc.getAgregarMiembroTabla().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.agregarMiembroTablaDatos = DATOS;
    });
  }

  public onRadioCambio(value: string | number,nombre:string): void {
    if(nombre === 'empleadosPropios') {
      this.cambioObj.empleadosPropios = value === 'Si' ? true : false;
    }
    if(nombre === 'deTrabajao') {
      this.cambioObj.deTrabajao = value === 'Si' ? true : false;
    }
    if(nombre === 'obligadoaTributaren') {
      this.cambioObj.obligadoaTributaren = value === 'Si' ? 'Si' : 'No';
    }
  }

  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg',});
  }

  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof DatosComunesStore): void {
    const VALOR = form.get(campo)?.value;
    (this.datosComunesStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
