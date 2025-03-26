import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  pagoDerechosForm: FormGroup;
  estadosDatos!: Catalogo[];

  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService
  ) {
    this.pagoDerechosForm = this.fb.group({
      claveReferencia: ['', Validators.required],
      cadenaDependencia: ['', Validators.required],
      estado: ['', Validators.required],
      llavePago: ['', Validators.required],
      fechaPago: ['', Validators.required],
      importePago: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
    });
  }

  guardarpagoDerechos(): void {}

  onReset() {
    this.pagoDerechosForm.reset();
  }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.estadosDatos = data;
      });
  }
}
