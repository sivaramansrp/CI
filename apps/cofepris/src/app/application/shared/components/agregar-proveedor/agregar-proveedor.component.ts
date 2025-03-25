import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Proveedor } from '../../models/terceros-relacionados.model';
import { Tramite260204Store } from '../../../tramites/260204/estados/stores/tramite260204Store.store';
import { Tramite260204Query } from '../../../tramites/260204/estados/queries/tramite260204Query.query';

@Component({
  selector: 'app-agregar-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.css',
})
export class AgregarProveedorComponent implements OnDestroy, OnInit {
  private unsubscribe$ = new Subject<void>();
  proveedores: Proveedor[] = [];

  agregarProveedorForm: FormGroup;
  public paisesDatos: Catalogo[] = [];

  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private tramiteStore: Tramite260204Store,
    private tramiteQuery: Tramite260204Query,
    private ubicaccion: Location
  ) {
    this.agregarProveedorForm = this.fb.group({
      tipoPersona: ['', Validators.required],
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
  ngOnInit(): void {
    this.cargarDatos();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });
  }

  guardarProveedor(): void {
    // Create a Proveedor object from form values
    const NUEVO_PROVEEDOR: Proveedor = {
      nombreRazonSocial: `${this.agregarProveedorForm.value.nombres} ${
        this.agregarProveedorForm.value.primerApellido
      } ${this.agregarProveedorForm.value.segundoApellido || ''}`.trim(),
      rfc: '', // Not present in form
      curp: '', // Not present in form
      telefono: this.agregarProveedorForm.value.telefono || '',
      correoElectronico:
        this.agregarProveedorForm.value.correoElectronico || '',
      calle: this.agregarProveedorForm.value.calle || '',
      numeroExterior: this.agregarProveedorForm.value.numeroExterior || '',
      numeroInterior: this.agregarProveedorForm.value.numeroInterior || '',
      pais: this.agregarProveedorForm.value.pais || '',
      colonia: this.agregarProveedorForm.value.colonia || '',
      municipioAlcaldia: '', // Not present in form
      localidad: '', // Not present in form
      entidadFederativa: this.agregarProveedorForm.value.estado || '',
      estadoLocalidad: '', // Not present in form
      codigoPostal: this.agregarProveedorForm.value.codigoPostal || '',
      coloniaEquivalente: '', // Not present in form
    };

    this.proveedores.push(NUEVO_PROVEEDOR);
    this.tramiteStore.updateProveedorTablaDatos(this.proveedores);
    this.agregarProveedorForm.reset();
    this.ubicaccion.back();
  }
}
