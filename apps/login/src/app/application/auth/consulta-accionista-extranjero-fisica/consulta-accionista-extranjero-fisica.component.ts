import { AccionistaStore, AccionistaStoreService } from '../../../estados/accionista.store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AccionistaDatosQuery } from '../../../queries/accionista.query';
import { CommonModule } from '@angular/common';
import { ConsultaSocioExtranjero } from '../../core/models/consulta-socio-extranjero.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-accionista-extranjero-fisica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-accionista-extranjero-fisica.component.html',
  styleUrl: './consulta-accionista-extranjero-fisica.component.scss',
})
export class ConsultaAccionistaExtranjeroFisicaComponent implements OnInit {
  public formConsultaSocioExtranjero!: FormGroup;
  public accionistaExtranjeroConsultado?: AccionistaStore;
  private destroyNotifier$: Subject<void> = new Subject();
  public socioExtranjero!: ConsultaSocioExtranjero;
  public listadoSociosExtranjero: ConsultaSocioExtranjero[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private busquedaQuery: AccionistaDatosQuery,
    private accionistaStore: AccionistaStoreService
  ) { }

  ngOnInit(): void {
    this.busquedaQuery.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.accionistaExtranjeroConsultado = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
    this.socioExtranjero = this.accionistaExtranjeroConsultado?.accionistaExtranjeroFisica || {} as ConsultaSocioExtranjero;
    this.listadoSociosExtranjero = this.accionistaExtranjeroConsultado?.listaAccionistasExtranjeros || [];
    this.crearFormSocioAccionista();
    this.llenarCamposSocioAccionista();
  }

  crearFormSocioAccionista() {
    this.formConsultaSocioExtranjero = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      apellidoPaterno: [{ value: '', disabled: true }],
      apellidoMaterno: [{ value: '' }],
      pais: [{ value: '', disabled: true }],
      codigoPostal: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      razonSocial: [{ value: '' }],
      calle: [{ value: '' }],
      numeroInterior: [{ value: '' }],
      numeroExterior: [{ value: '' }],
      numeroSeguroSocial: [{ value: '' }],
      numeroIdentificacionFiscal: [{ value: '' }]
    });
  }

  llenarCamposSocioAccionista() {
    if (this.accionistaExtranjeroConsultado) {
      this.formConsultaSocioExtranjero.get('nombre')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.nombre);
      this.formConsultaSocioExtranjero.get('apellidoPaterno')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.apellidoPaterno);
      this.formConsultaSocioExtranjero.get('apellidoMaterno')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.apellidoMaterno);
      this.formConsultaSocioExtranjero.get('pais')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.pais);
      this.formConsultaSocioExtranjero.get('codigoPostal')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.codigoPostal);
      this.formConsultaSocioExtranjero.get('estado')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.estado);
      this.formConsultaSocioExtranjero.get('razonSocial')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.razonSocial);
      this.formConsultaSocioExtranjero.get('calle')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.calle);
      this.formConsultaSocioExtranjero.get('numeroInterior')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.numeroInterior);
      this.formConsultaSocioExtranjero.get('numeroExterior')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.numeroExterior);
      this.formConsultaSocioExtranjero.get('numeroSeguroSocial')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.numeroSeguroSocial);
      this.formConsultaSocioExtranjero.get('numeroIdentificacionFiscal')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroFisica.numeroIdentificacionFiscal);
    }
  }

  confirmarExtranjeroMoral(){
    if (this.listadoSociosExtranjero.length === 0) {
      this.listadoSociosExtranjero = [];
    }
    this.listadoSociosExtranjero.push(this.socioExtranjero);
    this.accionistaStore.setListaSociosExtrajero(this.listadoSociosExtranjero);
    this.accionistaStore.setRegistraDatosExtranjero(true);
    this.router.navigate(['login/registro-socio-accionista']);
  }

}
