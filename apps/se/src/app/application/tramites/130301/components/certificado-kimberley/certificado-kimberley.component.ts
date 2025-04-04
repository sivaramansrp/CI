import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { Subject, takeUntil } from 'rxjs';
import { CertificadoKimberleyForma } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';

@Component({
  selector: 'app-certificado-kimberley',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './certificado-kimberley.component.html',
  styleUrl: './certificado-kimberley.component.css',
})
export class CertificadoKimberleyComponent implements OnInit,OnDestroy {
  certificadoKimberley!:FormGroup
  private destroyNotifier$: Subject<void> = new Subject();
  certificadoKimberleyDatos:CertificadoKimberleyForma[] = []
  estado: Catalogo[] = [];

  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
  ) {}

  ngOnInit(): void {
    this.obtenerEstadoList()
    this.certificadoKimberley = this.fb.group({
      certificadosEmitidos:[{value:'',disabled:true}],
      numeroCertificadokimberley:[{value:'',disabled:true}],
      paisEmisorCertificado:[],
      nombreIngles:[{value:'',disabled:true}],
      mixed:[],
      paisDeOrigen:[],
      nombreExportador:[{value:'',disabled:true}],
      direccionExportador:[{value:'',disabled:true}],
      nombreImportador:[{value:'',disabled:true},Validators.required],
      direccionImportador:[{value:'',disabled:true},Validators.required],
      numeroEnLetra:[{value:'',disabled:true},Validators.required],
      numeroEnLetraIngles:[{value:'',disabled:true},Validators.required],
      numeroFactura:[{value:'',disabled:true},Validators.required],
      cantidadQuilates:[{value:'',disabled:true},Validators.required],
      valorDiamantes:[{value:'',disabled:true},Validators.required],
    })
    this.obtenerFormDatos()
  }

  obtenerFormDatos(): void {
    this.service
      .obtenerCertificadoKimberleyFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.certificadoKimberleyDatos = data?.data;
        this.certificadoKimberley.patchValue({
          certificadosEmitidos: this.certificadoKimberleyDatos[0].certificadosEmitidos,
          numeroCertificadokimberley: this.certificadoKimberleyDatos[0].numeroCertificadokimberley,
          nombreIngles: this.certificadoKimberleyDatos[0].nombreIngles,
          nombreExportador:this.certificadoKimberleyDatos[0].nombreExportador,
          direccionExportador: this.certificadoKimberleyDatos[0].direccionExportador,
          nombreImportador: this.certificadoKimberleyDatos[0].nombreImportador,
          direccionImportador: this.certificadoKimberleyDatos[0].direccionImportador,
          numeroEnLetra: this.certificadoKimberleyDatos[0].numeroEnLetra,
          numeroEnLetraIngles: this.certificadoKimberleyDatos[0].numeroEnLetraIngles,
          numeroFactura:this.certificadoKimberleyDatos[0].numeroFactura,
          cantidadQuilates:this.certificadoKimberleyDatos[0].cantidadQuilates,
          valorDiamantes:this.certificadoKimberleyDatos[0].valorDiamantes,
        });
      });
  }

  obtenerEstadoList(): void {
    this.service
      .obtenerEstadoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
