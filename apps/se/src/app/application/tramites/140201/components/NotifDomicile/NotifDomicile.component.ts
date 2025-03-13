import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cancelaciones140201Service } from '../../services/cancelaciones-140201.service';
import { Cancelaciones140201Store } from '../../estados/cancelaciones.store';

import { Cancelaciones140201Query } from '../../estados/cancelaciones.query';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notif-domicile',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './NotifDomicile.component.html',
  styleUrl: './NotifDomicile.component.scss',
})
export class NotifDomicileComponent implements OnInit, OnDestroy {
  entidadFederativa$ = this.cancelaciones140201Query.entidadFederativa$;
  colonia$ = this.cancelaciones140201Query.colonia$;
  localidad$ = this.cancelaciones140201Query.localidad$;
  municipio$ = this.cancelaciones140201Query.municipio$;
  paisInput$ = this.cancelaciones140201Query.paisInput$;
  numeroInterior$ = this.cancelaciones140201Query.numeroInterior$;
  codigoPostal$ = this.cancelaciones140201Query.codigoPostal$;
  telefona$ = this.cancelaciones140201Query.telefona$;

  notifDomicileForm!: FormGroup;
  private destroy$ = new Subject<void>();
  entidadFederativa: Catalogo[] = [];
  colonia: Catalogo[] = [];
  localidad: Catalogo[] = [];
  municipioAlcaldia: Catalogo[] = [];
  constructor(
    private fb: FormBuilder,
    private cancelacionService: Cancelaciones140201Service,
    private cancelaciones140201Store: Cancelaciones140201Store,
    private cancelaciones140201Query: Cancelaciones140201Query
  ) {
    //constructor
  }
  ngOnInit(): void {
    this.loadEntidad();
    this.loadColonia();
    this.loadMunicipiosOalcaldia();
    this.loadLocalidad();
    this.notifDomicileForm = this.fb.group({
      entidadFederativa: [null],
      domicilio: [null],
      calle: [{ value: '', disabled: true }],
      numeroExterior: [{ value: '', disabled: true }],
      numeroInterior: [null],
      codigoPostal: ['', [Validators.maxLength(30)]],
      pais: [null],
      municipioAlcaldia: [null],
      colonia: [null],
      telefona: ['', [Validators.maxLength(15)]],
      localidad: [null],
    });
    this.updateState();
  }

  updateState() {
    this.entidadFederativa$.subscribe((entidadFederativa) => {
      if (entidadFederativa) {
        this.notifDomicileForm
          .get('entidadFederativa')
          ?.setValue(entidadFederativa);
      }
    });
    this.colonia$.subscribe((colonia) => {
      if (colonia) {
        this.notifDomicileForm.get('colonia')?.setValue(colonia);
      }
    });
    this.localidad$.subscribe((localidad) => {
      if (localidad) {
        this.notifDomicileForm.get('localidad')?.setValue(localidad);
      }
    });

    this.municipio$.subscribe((municipio) => {
      if (municipio) {
        this.notifDomicileForm.get('municipioAlcaldia')?.setValue(municipio);
      }
    });
    this.paisInput$.subscribe((pais) => {
      if (pais) {
        this.notifDomicileForm.get('pais')?.setValue(pais);
      }
    });
    this.numeroInterior$.subscribe((numeroInterior) => {
      if (numeroInterior) {
        this.notifDomicileForm.get('numeroInterior')?.setValue(numeroInterior);
      }
    });
    this.codigoPostal$.subscribe((codigoPostal) => {
      if (codigoPostal) {
        this.notifDomicileForm.get('codigoPostal')?.setValue(codigoPostal);
      }
    });
    this.telefona$.subscribe((telefona) => {
      if (telefona) {
        this.notifDomicileForm.get('telefona')?.setValue(telefona);
      }
    });
  }
  loadEntidad(): void {
    this.cancelacionService
      .getEntidades()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Catalogo[]) => {
        this.entidadFederativa = data;
      });
  }
  loadColonia(): void {
    this.cancelacionService
      .getColonia()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.colonia = data;
      });
  }
  loadMunicipiosOalcaldia(): void {
    this.cancelacionService
      .getmunicipio()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.municipioAlcaldia = data;
      });
  }
  loadLocalidad(): void {
    this.cancelacionService
      .getLocalidad()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.localidad = data;
      });
  }
  getEntidad(): void {
    const ENTIDAD_FED = this.notifDomicileForm.get('entidadFederativa')?.value;
    this.cancelaciones140201Store.setEntidadFed(ENTIDAD_FED);
  }
  getMunicipiosOalcaldia(): void {
    const MUNICIPIOS_ALCALDIA =
      this.notifDomicileForm.get('municipioAlcaldia')?.value;
    this.cancelaciones140201Store.setMunicipiosAlcaldia(MUNICIPIOS_ALCALDIA);
  }
  getColonia(): void {
    const COLONIA = this.notifDomicileForm.get('colonia')?.value;
    this.cancelaciones140201Store.setColonia(COLONIA);
  }
  getLocalidad(): void {
    const LOCALIDAD = this.notifDomicileForm.get('localidad')?.value;
    this.cancelaciones140201Store.setLocalidad(LOCALIDAD);
  }

  updatePais(): void {
    const PAIS = this.notifDomicileForm.get('pais')?.value;
    this.cancelaciones140201Store.setPaisInput(PAIS);
  }
  updateNumeroInterior(): void {
    const NUMERO_INTERIOR = this.notifDomicileForm.get('numeroInterior')?.value;
    this.cancelaciones140201Store.setNumeroInterior(NUMERO_INTERIOR);
  }
  updateCodigoPostal(): void {
    const CODIGO_POSTAL = this.notifDomicileForm.get('codigoPostal')?.value;
    this.cancelaciones140201Store.setCodigoPostal(CODIGO_POSTAL);
  }
  updateTelefona(): void {
    const TELEFONA = this.notifDomicileForm.get('telefona')?.value;
    this.cancelaciones140201Store.setTelefona(TELEFONA);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
