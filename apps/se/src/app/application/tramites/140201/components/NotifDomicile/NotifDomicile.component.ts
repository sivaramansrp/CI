import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cancelaciones140201Service } from '../../services/cancelaciones-140201.service';

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
  notifDomicileForm!: FormGroup;
  private destroy$ = new Subject<void>();
  entidadFederativa: Catalogo[] = [];
  colonia: Catalogo[] = [];
  localidad : Catalogo[]=[];
  municipioAlcaldia:Catalogo[]=[];
  constructor(
    private fb: FormBuilder,
    private _cancelaciones140201Service: Cancelaciones140201Service
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
      calle: [null],
      numeroExterior: [null],
      numeroInterior: [null],
      codigoPostal: [null],
      pais: [null],
      municipioAlcaldia: [null],
      colonia:[null],
      telefona:[null],
    });
  }
  loadEntidad(): void {
    this._cancelaciones140201Service
      .getEntidades()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Catalogo[]) => {
        this.entidadFederativa = data;
      });
  }
  loadColonia(): void {
    this._cancelaciones140201Service
      .getColonia()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.colonia = data;
      });
  }
  loadMunicipiosOalcaldia(): void {
    this._cancelaciones140201Service
    .getmunicipio()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.municipioAlcaldia = data;
    });
  }
  loadLocalidad(): void {
    this._cancelaciones140201Service
    .getLocalidad()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.localidad = data;
    });
  }
  getEntidad(): void {
    // this.loadEntidad();
  }
  getColonia(): void {
    // this.loadColonia();
  }
  getMunicipiosOalcaldia(): void {
    // this.loadMunicipios();
  }
  getLocalidad(): void {
    // this.loadLocalidad();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
