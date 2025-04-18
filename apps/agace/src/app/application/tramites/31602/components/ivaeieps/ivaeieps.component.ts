import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PERMISO_A_DESISTIR } from '../../constantes/ivaeieps.enum';
import { ConfiguracionColumna, EMPRESAS_TABLA, EmpresasDelGrupo, InputRadioComponent, REGEX_RFC, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import { ComercioExteriorService } from '../../services/comercio-exterior.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IvaeiepsDosComponent } from '../ivaeieps-dos/ivaeieps-dos.component';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud31602IvaeiepsState, Tramite31602IvaeiepsStore } from '../../estados/stores/tramite31602ivaeieps.store';
import { Tramite31602IvaeiepsQuery } from '../../estados/queries/tramite31602ivaeieps.query';

@Component({
  selector: 'app-ivaeieps',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    TituloComponent,
    TablaDinamicaComponent,
    IvaeiepsDosComponent
  ],
  templateUrl: './ivaeieps.component.html',
  styleUrl: './ivaeieps.component.scss',
})
export class IvaeiepsComponent implements OnInit,OnDestroy {

  public ivaEiepsFormGroup!: FormGroup;
  modalRef?: BsModalRef;
  public ivaForm!: FormGroup;
  public radioBtn = radio_si_no;
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  public predeterminadoSeleccionar: string | number = '';
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
  });

  public permisoDesistirFormDatos = PERMISO_A_DESISTIR;
  public empresasDelGrupoDatos: EmpresasDelGrupo[] = [];
  public configuracionTabla: ConfiguracionColumna<EmpresasDelGrupo>[] = EMPRESAS_TABLA;
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solicitud31602IvaeiepsState;


  constructor(
    private fb: FormBuilder,
    private comercioExteriorSvc: ComercioExteriorService,
    private modalService: BsModalService,
    private tramite31602Store: Tramite31602IvaeiepsStore,
    private tramite31602Query: Tramite31602IvaeiepsQuery
  ) {
    //
  }

  ngOnInit(): void {
    this.tramite31602Query.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.solicitudState = seccionState;
    })).subscribe();
    this.crearIvaEiepsForm();
    this.getEmpresasDelGrupoDatos();
    this.crearIvaForm();
  }

  public crearIvaEiepsForm(): void {
    this.ivaEiepsFormGroup = this.fb.group({
      indiqueIva: [this.solicitudState.indiqueIva],
      empleados: [this.solicitudState.empleados],
      infraestructura: [this.solicitudState.infraestructura],
      monto: [this.solicitudState.monto],
      antiguedad: [this.solicitudState.antiguedad],
    });
  }

  public crearIvaForm(): void {
    this.ivaForm = this.fb.group({
      rfc: ['',[Validators.required,Validators.pattern(REGEX_RFC)]],
      denominacion: [{ value: '', disabled: true }],
      domicilio: [{ value: '', disabled: true }],
    });
  }

  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  public cambioDeValorIndique(value: string | number): void {
    this.predeterminadoSeleccionar = value;
  }

  public getEmpresasDelGrupoDatos():void {
    this.comercioExteriorSvc.getEmpresasTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.empresasDelGrupoDatos = DATOS;
    })
  }

  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template);
  }

  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite31602IvaeiepsStore): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31602Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }



}
