import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Facturador } from '../../models/terceros-relacionados.model';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Tramite260204Store } from '../../../tramites/260204/estados/stores/tramite260204Store.store';
import { Tramite260204Query } from '../../../tramites/260204/estados/queries/tramite260204Query.query';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-facturador',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './agregar-facturador.component.html',
  styleUrl: './agregar-facturador.component.css',
})
export class AgregarFacturadorComponent implements OnInit, OnDestroy {
  agregarFacturadorForm: FormGroup;
  private unsubscribe$ = new Subject<void>();
  paisesDatos: Catalogo[] = [];
  facturadores: Facturador[] = [];
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private tramiteStore: Tramite260204Store,
    private tramiteQuery: Tramite260204Query,
    private ubicaccion: Location
  ) {
    this.agregarFacturadorForm = this.fb.group({
      tipoPersona: ['Fisica', Validators.required],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });
  }
  ngOnInit(): void {
    this.cargarDatos();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  guardarFacturador(): void {
    const NUEVO_FACTURADOR: Facturador = {
      nombreRazonSocial: `${this.agregarFacturadorForm.value.nombres} ${
        this.agregarFacturadorForm.value.primerApellido
      } ${this.agregarFacturadorForm.value.segundoApellido || ''}`.trim(),
      rfc: '',
      curp: '',
      telefono: this.agregarFacturadorForm.value.telefono || '',
      correoElectronico:
        this.agregarFacturadorForm.value.correoElectronico || '',
      calle: this.agregarFacturadorForm.value.calle || '',
      numeroExterior: this.agregarFacturadorForm.value.numeroExterior || '',
      numeroInterior: this.agregarFacturadorForm.value.numeroInterior || '',
      pais: this.agregarFacturadorForm.value.pais || '',
      colonia: this.agregarFacturadorForm.value.colonia || '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa: this.agregarFacturadorForm.value.estado || '',
      estadoLocalidad: '',
      codigoPostal: this.agregarFacturadorForm.value.codigoPostal || '',
      coloniaEquivalente: '',
    };

    this.facturadores.push(NUEVO_FACTURADOR);
    this.tramiteStore.updateFacturadorTablaDatos(this.facturadores);
    this.agregarFacturadorForm.reset();
    this.ubicaccion.back();
  }
}
