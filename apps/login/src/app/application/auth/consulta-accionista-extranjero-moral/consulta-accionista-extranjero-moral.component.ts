import { AccionistaStore, AccionistaStoreService } from '../../../estados/accionista.store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AccionistaDatosQuery } from '../../../queries/accionista.query';
import { CommonModule } from '@angular/common';
import { ConsultaSocioExtranjero } from '../../core/models/consulta-socio-extranjero.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-accionista-extranjero-moral',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-accionista-extranjero-moral.component.html',
  styleUrl: './consulta-accionista-extranjero-moral.component.scss',
})
export class ConsultaAccionistaExtranjeroMoralComponent implements OnInit {
  public formConsultaSocioExtranjero!: FormGroup;
  public accionistaExtranjeroConsultado?: AccionistaStore;
  private destroyNotifier$: Subject<void> = new Subject();
  public socioExtranjero!: ConsultaSocioExtranjero;
  public listadoSociosExtranjero: ConsultaSocioExtranjero[] = [];
  public registrarDatos: boolean = false;

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
    this.socioExtranjero = this.accionistaExtranjeroConsultado?.accionistaExtranjeroMoral || {} as ConsultaSocioExtranjero;
    this.listadoSociosExtranjero = this.accionistaExtranjeroConsultado?.listaAccionistasExtranjerosMoral || [];
    this.crearFormSocioAccionista();
    this.llenarCamposSocioAccionista();
  }

  crearFormSocioAccionista() {
    this.formConsultaSocioExtranjero = this.fb.group({
      razonSocial: [{ value: '', disabled: true }],
      pais: [{ value: '', disabled: true }],
      codigoPostal: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      calle: [{ value: '' }],
      numeroInterior: [{ value: '' }],
      numeroExterior: [{ value: '' }]
    });
  }

  llenarCamposSocioAccionista() {
    if (this.accionistaExtranjeroConsultado) {
      this.formConsultaSocioExtranjero.get('razonSocial')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroMoral.razonSocial);
      this.formConsultaSocioExtranjero.get('pais')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroMoral.pais);
      this.formConsultaSocioExtranjero.get('codigoPostal')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroMoral.codigoPostal);
      this.formConsultaSocioExtranjero.get('estado')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroMoral.estado);
      this.formConsultaSocioExtranjero.get('calle')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroMoral.calle);
      this.formConsultaSocioExtranjero.get('numeroInterior')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroMoral.numeroInterior);
      this.formConsultaSocioExtranjero.get('numeroExterior')?.setValue(this.accionistaExtranjeroConsultado.accionistaExtranjeroMoral.numeroExterior);
    }
  }

  confirmarSocioExtranjeroMoral() {
    if (this.listadoSociosExtranjero.length === 0) {
      this.listadoSociosExtranjero = [];
    }
    this.listadoSociosExtranjero.push(this.socioExtranjero);
    this.accionistaStore.setListaSociosExtrajero(this.listadoSociosExtranjero);
    this.accionistaStore.setRegistraDatosExtranjero(this.registrarDatos = true);
    this.router.navigate(['login/registro-socio-accionista']);
  }

}
