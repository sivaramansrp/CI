import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { BusquedaRFCCURPQuery } from '../../../queries/capturista.query';
import { CapturistaStore } from '../../../estados/capturista.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-capturista-privado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-capturista-privado.component.html',
  styleUrl: './consulta-capturista-privado.component.scss',
})
export class ConsultaCapturistaPrivadoComponent implements OnInit {
  formConsultaCapturista!: FormGroup;
  public capturistaConsultado?: CapturistaStore;
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private BusquedaQuery: BusquedaRFCCURPQuery,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.BusquedaQuery.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.capturistaConsultado = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
    this.crearFormCapturista();
    this.llenarCamposCapturista();
  }

  crearFormCapturista() {
    this.formConsultaCapturista = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      apellidoPaterno: [{ value: '', disabled: true }],
      apellidoMaterno: [{ value: '', disabled: true }],
      rfc: [{ value: '', disabled: true }],
      curp: [{ value: '', disabled: true }],
    });
  }

  llenarCamposCapturista() {
    if (this.capturistaConsultado) {
      this.formConsultaCapturista.get('nombre')?.setValue(this.capturistaConsultado.consultaCapturista.nombre);
      this.formConsultaCapturista.get('apellidoPaterno')?.setValue(this.capturistaConsultado.consultaCapturista.apellidoPaterno);
      this.formConsultaCapturista.get('apellidoMaterno')?.setValue(this.capturistaConsultado.consultaCapturista.apellidoMaterno);
      this.formConsultaCapturista.get('rfc')?.setValue(this.capturistaConsultado.consultaCapturista.rfc);
      this.formConsultaCapturista.get('curp')?.setValue(this.capturistaConsultado.consultaCapturista.curp);
    }
  }
}
