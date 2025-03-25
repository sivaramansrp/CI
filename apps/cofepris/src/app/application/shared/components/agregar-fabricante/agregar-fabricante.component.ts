/* eslint-disable no-console */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Fabricante } from '../../models/terceros-relacionados.model';
import { Tramite260204Store } from '../../../tramites/260204/estados/stores/tramite260204Store.store';
import { Tramite260204Query } from '../../../tramites/260204/estados/queries/tramite260204Query.query';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './agregar-fabricante.component.html',
  styleUrl: './agregar-fabricante.component.css',
})
export class AgregarFabricanteComponent implements OnDestroy, OnInit {
  @Input()
  guardarFabricanteForm!: (value: Fabricante[]) => void;
  agregarFabricanteForm: FormGroup;
  public codigosPostalesDatos: Catalogo[] = [];
  public paisesDatos: Catalogo[] = [];
  public estadosDatos: Catalogo[] = [];
  public municipiosDatos: Catalogo[] = [];
  public localidadesDatos: Catalogo[] = [];
  public coloniasDatos: Catalogo[] = [];
  fabricantes: Fabricante[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private tramiteStore: Tramite260204Store,
    private tramiteQuery: Tramite260204Query,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
    this.agregarFabricanteForm = this.fb.group({
      nacionalidad: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      rfc: ['', Validators.required],
      curp: ['', Validators.required],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      razonSocial: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
      adunasDeEntradas: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  guardarFabricante(): void {
    let nuevoFabricante: Fabricante = {
      nombreRazonSocial:
        this.agregarFabricanteForm.value.razonSocial ||
        `${this.agregarFabricanteForm.value.nombres} ${
          this.agregarFabricanteForm.value.primerApellido
        } ${this.agregarFabricanteForm.value.segundoApellido || ''}`.trim(),
      rfc: this.agregarFabricanteForm.value.rfc,
      curp: this.agregarFabricanteForm.value.curp,
      telefono: this.agregarFabricanteForm.value.telefono,
      correoElectronico: this.agregarFabricanteForm.value.correoElectronico,
      calle: this.agregarFabricanteForm.value.calle,
      numeroExterior: this.agregarFabricanteForm.value.numeroExterior,
      numeroInterior: this.agregarFabricanteForm.value.numeroInterior || '',
      pais: this.agregarFabricanteForm.value.pais,
      colonia: this.agregarFabricanteForm.value.colonia,
      municipioAlcaldia: this.agregarFabricanteForm.value.municipio,
      localidad: this.agregarFabricanteForm.value.localidad,
      entidadFederativa: this.agregarFabricanteForm.value.estado,
      estadoLocalidad: this.agregarFabricanteForm.value.estado,
      codigoPostal: this.agregarFabricanteForm.value.codigoPostal,
      coloniaEquivalente: this.agregarFabricanteForm.value.correoElectronico,
    };

    // Add to the array
    this.fabricantes.push(nuevoFabricante);

    this.tramiteStore.updateFabricanteTablaDatos(this.fabricantes);
    this.ubicaccion.back();
  }
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.estadosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaMunicipios()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.municipiosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.localidadesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasDatos = data;
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
