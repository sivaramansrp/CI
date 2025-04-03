import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { Subject, takeUntil } from 'rxjs';
import { CertificadoKimberleyForma } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';

@Component({
  selector: 'app-certificado-kimberley',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './certificado-kimberley.component.html',
  styleUrl: './certificado-kimberley.component.css',
})
export class CertificadoKimberleyComponent implements OnInit,OnDestroy {
  certificadoKimberley!:FormGroup
  private destroyNotifier$: Subject<void> = new Subject();
  certificadoKimberleyDatos:CertificadoKimberleyForma[] = []

  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}

  ngOnInit(): void {
    this.obtenerFormDatos()
    this.certificadoKimberley = this.fb.group({
      certificadosEmitidos:[{value:'',disabled:true}]
    })
  }

  obtenerFormDatos(): void {
      this.service
        .obtenerCertificadoKimberleyFormDatos()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data) => {
          this.certificadoKimberleyDatos = data?.data;
          this.certificadoKimberley.patchValue({
            certificadosEmitidos: this.certificadoKimberleyDatos[0].certificadosEmitidos,
          });
        });
    }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
