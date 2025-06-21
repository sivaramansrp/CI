import { AccionistaStore, AccionistaStoreService } from '../../../estados/accionista.store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AccionistaDatosQuery } from '../../../queries/accionista.query';
import { CommonModule } from '@angular/common';
import { ConsultaSocioNacional } from '../../core/models/consulta-socio-nacional.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-socio-accionista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-socio-accionista.component.html',
  styleUrl: './consulta-socio-accionista.component.scss',
})
export class ConsultaSocioAccionistaComponent implements OnInit {
  public formConsultaSocioAccionista!: FormGroup;
  public socioAccionistaConsultado?: AccionistaStore;
  private destroyNotifier$: Subject<void> = new Subject();
  public registrarDatos: boolean = false;
  socioAccionistaNacional!: ConsultaSocioNacional;
  public listadoSociosAccionistas: ConsultaSocioNacional[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private busquedaQuery: AccionistaDatosQuery,
    private accionistaStore: AccionistaStoreService
  ) { }

  ngOnInit(): void {
    this.busquedaQuery.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.socioAccionistaConsultado = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
    this.socioAccionistaNacional = this.socioAccionistaConsultado?.accionistaNacional || {} as ConsultaSocioNacional;
    this.listadoSociosAccionistas = this.socioAccionistaConsultado?.listaAccionistasNacionales || [];
    this.crearFormSocioAccionista();
    this.llenarCamposSocioAccionista();
  }

  crearFormSocioAccionista() {
    this.formConsultaSocioAccionista = this.fb.group({
      rfc: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      apellidoPaterno: [{ value: '', disabled: true }],
      apellidoMaterno: [{ value: '', disabled: true }],
      razonSocial: [{ value: '', disabled: true }],
    });
  }

  llenarCamposSocioAccionista() {
    if (this.socioAccionistaConsultado) {
      this.formConsultaSocioAccionista.get('rfc')?.setValue(this.socioAccionistaConsultado.accionistaNacional.rfc);
      this.formConsultaSocioAccionista.get('nombre')?.setValue(this.socioAccionistaConsultado.accionistaNacional.nombre);
      this.formConsultaSocioAccionista.get('apellidoPaterno')?.setValue(this.socioAccionistaConsultado.accionistaNacional.apellidoPaterno);
      this.formConsultaSocioAccionista.get('apellidoMaterno')?.setValue(this.socioAccionistaConsultado.accionistaNacional.apellidoMaterno);
    }
  }
  confirmarSocioNacional() {
    if (this.listadoSociosAccionistas.length === 0) {
      this.listadoSociosAccionistas = [];
    }
    this.listadoSociosAccionistas.push(this.socioAccionistaNacional);
    this.accionistaStore.setListaSociosNacionales(this.listadoSociosAccionistas);
    this.accionistaStore.setRegistraDatosNacional(this.registrarDatos = true);
    this.router.navigate(['login/registro-socio-accionista']);
  }

  cancelarGuardado() {
    this.router.navigate(['login/registro-socio-accionista']);
  }
}


