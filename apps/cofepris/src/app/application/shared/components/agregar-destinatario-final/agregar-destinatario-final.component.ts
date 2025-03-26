import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Destinatario } from '../../models/terceros-relacionados.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260204Query } from '../../../tramites/260204/estados/queries/tramite260204Query.query';
import { Tramite260204Store } from '../../../tramites/260204/estados/stores/tramite260204Store.store';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-agregar-destinatario-final',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './agregar-destinatario-final.component.html',
  styleUrl: './agregar-destinatario-final.component.css',
})
export class AgregarDestinatarioFinalComponent implements OnDestroy, OnInit {
  private unsubscribe$ = new Subject<void>();

  agregarDestinatarioFinal: FormGroup;
  public paisesDatos: Catalogo[] = [];
  public estadosDatos: Catalogo[] = [];
  public municipiosDatos: Catalogo[] = [];
  public localidadesDatos: Catalogo[] = [];
  public coloniasDatos: Catalogo[] = [];
  public codigosPostalesDatos: Catalogo[] = [];

  destinatarios: Destinatario[] = [];

  constructor(
    private fb: FormBuilder,
    private tramiteStore: Tramite260204Store,
    private tramiteQuery: Tramite260204Query,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
    this.agregarDestinatarioFinal = this.fb.group({
      tipoPersona: ['', Validators.required],
      rfc: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  guardarDestinatario(): void {
    const NUEVO_DESTINATARIO: Destinatario = {
      nombreRazonSocial: `${this.agregarDestinatarioFinal.value.nombres} ${
        this.agregarDestinatarioFinal.value.primerApellido
      } ${this.agregarDestinatarioFinal.value.segundoApellido || ''}`.trim(),
      rfc: this.agregarDestinatarioFinal.value.rfc,
      curp: '',
      telefono:
        `${this.agregarDestinatarioFinal.value.lada} ${this.agregarDestinatarioFinal.value.telefono}`.trim(),
      correoElectronico: this.agregarDestinatarioFinal.value.correoElectronico,
      calle: this.agregarDestinatarioFinal.value.calle,
      numeroExterior: this.agregarDestinatarioFinal.value.numeroExterior,
      numeroInterior: this.agregarDestinatarioFinal.value.numeroInterior || '',
      pais: this.agregarDestinatarioFinal.value.pais,
      colonia: this.agregarDestinatarioFinal.value.colonia,
      municipioAlcaldia: this.agregarDestinatarioFinal.value.municipio,
      localidad: this.agregarDestinatarioFinal.value.localidad,
      entidadFederativa: '',
      estadoLocalidad: this.agregarDestinatarioFinal.value.estado,
      codigoPostal: this.agregarDestinatarioFinal.value.codigoPostal,
      coloniaEquivalente: this.agregarDestinatarioFinal.value.codigoPostal,
    };

    this.destinatarios.push(NUEVO_DESTINATARIO);
    this.tramiteStore.updateDestinatarioFinalTablaDatos(this.destinatarios);
    this.agregarDestinatarioFinal.reset();
    this.ubicaccion.back();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.cargarDatos();
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
}
