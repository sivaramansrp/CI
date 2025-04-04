import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { PRORROGAS_TABLA, ProrrogasForma, ProrrogasInfo } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';

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

  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}

  ngOnInit(): void {
    this.prorrogasForm = this.fb.group({
      folioResolucion:[{value:'',disabled:true}],
      cantidad:[{value:'',disabled:true}],
      prorrogaDel:[{value:'',disabled:true}],
      prorrogaAl:[{value:'',disabled:true},Validators.required],
      motivoJustificacion:['',Validators.required],
      otrasDeclaraciones:['',Validators.required],
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

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
