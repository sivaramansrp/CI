import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { FECHA_DE_PAGO } from '../../models/terceros-relacionados.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Tramite260204Store } from '../../../tramites/260204/estados/stores/tramite260204Store.store';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    InputFechaComponent,
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  pagoDerechosForm: FormGroup;
  estadosDatos!: Catalogo[];

  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private tramiteStore: Tramite260204Store
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

  onReset(): void {
    this.pagoDerechosForm.reset();
  }

  ngOnInit(): void {
    const DATOS_STORE = this.tramiteStore.getValue().pagoDerechos;

    this.pagoDerechosForm = this.fb.group({
      claveReferencia: [DATOS_STORE.claveReferencia || '', Validators.required],
      cadenaDependencia: [
        DATOS_STORE.cadenaDependencia || '',
        Validators.required,
      ],
      estado: [DATOS_STORE.estado || '', Validators.required],
      llavePago: [DATOS_STORE.llavePago || '', Validators.required],
      fechaPago: [DATOS_STORE.fechaPago || '', Validators.required],
      importePago: [
        DATOS_STORE.importePago || '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
    });
    this.pagoDerechosForm.valueChanges.subscribe((valores) => {
      this.tramiteStore.updatePagoDerechos(valores);
    });
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
