import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { PARTIDAS_TABLA, PartidasForma, PartidasInfo } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';

@Component({
  selector: 'app-partidas-de-la-mercancia',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './partidas-de-la-mercancia.component.html',
  styleUrl: './partidas-de-la-mercancia.component.css',
})
export class PartidasDeLaMercanciaComponent implements OnInit,OnDestroy {
  partidasTabla: ConfiguracionColumna<PartidasInfo>[] = PARTIDAS_TABLA;
  partidasTablaDatos: PartidasInfo[] = [];
  private destroyNotifier$: Subject<void> = new Subject();
  partidasFormDatos:PartidasForma[] = []
  partidas!:FormGroup
  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}

  ngOnInit(): void {
    this.obtenerTablaDatos()
    this.obtenerFormDatos()
    this.partidas = this.fb.group({
      usoEspecificoMercancia:[{value:'',disabled:true}],
      justificacionBeneficio:[{value:'',disabled:true}],
      observaciones:[{value:'',disabled:true}],
      representacionFederal:[{value:'',disabled:true}]
    })
  }

  obtenerTablaDatos(): void {
    this.service.obtenerTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.partidasTablaDatos = DATOS;
      });
  }

  obtenerFormDatos(): void {
    this.service
      .obtenerPartidasFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.partidasFormDatos = data?.data;
        this.partidas.patchValue({
          usoEspecificoMercancia: this.partidasFormDatos[0].usoEspecificoMercancia,
          justificacionBeneficio:this.partidasFormDatos[0].justificacionBeneficio,
          observaciones:this.partidasFormDatos[0].observaciones,
          representacionFederal:this.partidasFormDatos[0].representacionFederal
        });
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
