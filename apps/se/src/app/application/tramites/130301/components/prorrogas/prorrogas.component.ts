import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { PRORROGAS_TABLA, ProrrogasForma, ProrrogasInfo } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { Solicitud130301State, Tramite130301Store } from '../../../../estados/tramites/tramite130301.store';
import { Tramite130301Query } from '../../../../estados/queries/tramite130301.query';

@Component({
  selector: 'app-prorrogas',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent
  ],
  templateUrl: './prorrogas.component.html',
  styleUrl: './prorrogas.component.css',
})
export class ProrrogasComponent implements OnInit,OnDestroy {
  prorrogasForm!:FormGroup

  prorrogasTabla: ConfiguracionColumna<ProrrogasInfo>[] = PRORROGAS_TABLA;
  prorrogasTablaDatos: ProrrogasInfo[] = [];

  private destroyNotifier$: Subject<void> = new Subject();

  prorrogasFormDatos:ProrrogasForma[] = []

  public solicitudState!: Solicitud130301State;

  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
    public tramite130301Store: Tramite130301Store,
    private tramite130301Query: Tramite130301Query
  ) {}

  ngOnInit(): void {
    this.tramite130301Query
      .selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    
    this.prorrogasForm = this.fb.group({
      folioResolucion:[{value:'',disabled:true}],
      cantidad:[{value:'',disabled:true}],
      prorrogaDel:[{value:'',disabled:true}],
      prorrogaAl:[{value:'',disabled:true},Validators.required],
      motivoJustificacion:[this.solicitudState?.motivoJustificacion,Validators.required],
      otrasDeclaraciones:[this.solicitudState?.otrasDeclaraciones,Validators.required],
    })
    this.obtenerFormDatos()
  }

  obtenerFormDatos(): void {
    this.service
      .obtenerProrrogasFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.prorrogasFormDatos = data?.data;
        this.prorrogasForm.patchValue({
          folioResolucion: this.prorrogasFormDatos[0].folioResolucion,
          cantidad: this.prorrogasFormDatos[0].cantidad,
          prorrogaDel: this.prorrogasFormDatos[0].prorrogaDel,
          prorrogaAl: this.prorrogasFormDatos[0].prorrogaAl,
        });
      });
  }

  
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130301Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
