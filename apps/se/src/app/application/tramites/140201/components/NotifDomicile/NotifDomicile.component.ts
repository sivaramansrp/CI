/** 
 * NotifDomicileComponent
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Catalogo,
  CatalogoSelectComponent,
  REG_X,
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
/**
 * Componente NotifDomicileComponent
 *
 * Este componente es responsable de manejar el formulario de notificación de domicilio
 * para el trámite 140201. Permite la actualización de los datos de entidad federativa,
 * colonia, localidad, municipio, país, número interior, código postal y teléfono.
 */
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
/***
 *  NotifDomicileComponent */
export class NotifDomicileComponent implements OnInit, OnDestroy {
  /**
   * Observable para la entidad federativa
   */
  entidadFederativa$ = this.cancelaciones140201Query.entidadFederativa$;
  /**
   * Observable para la colonia
   */
  colonia$ = this.cancelaciones140201Query.colonia$;
  /**
   * Observable para la localidad
   */
  localidad$ = this.cancelaciones140201Query.localidad$;
  /**
   * Observable para el municipio
   */
  municipio$ = this.cancelaciones140201Query.municipio$;
  /**
   * Observable para el país
   */
  paisInput$ = this.cancelaciones140201Query.paisInput$;
  /**
   * Observable para el número interior
   */
  numeroInterior$ = this.cancelaciones140201Query.numeroInterior$;
  /**
   * Observable para el código postal
   */
  codigoPostal$ = this.cancelaciones140201Query.codigoPostal$;
  /**
   * Observable para el teléfono
   */
  telefona$ = this.cancelaciones140201Query.telefona$;

  /**
   * Formulario reactivo para la notificación de domicilio
   */
  notifDomicileForm!: FormGroup;
  /**
   * Subject para manejar la destrucción de las suscripciones
   */
  private destroy$ = new Subject<void>();
  /**
   * Lista de entidades federativas
   */
  entidadFederativa: Catalogo[] = [];
  /**
   * Lista de colonias
   */
  colonia: Catalogo[] = [];
  /**
   * Lista de localidades
   */
  localidad: Catalogo[] = [];
  /**
   * Lista de municipios o alcaldías
   */
  municipioAlcaldia: Catalogo[] = [];

  /**
   * Constructor */
  constructor(
    private fb: FormBuilder,
    private cancelacionService: Cancelaciones140201Service,
    private cancelaciones140201Store: Cancelaciones140201Store,
    private cancelaciones140201Query: Cancelaciones140201Query
  ) {
    // Constructor
  }

  /**
   * Método ngOnInit
   *
   * Inicializa el formulario y carga la información de entidad, colonia, municipio y localidad.
   */
  ngOnInit(): void {
    this.loadInfo();
    this.loadEntidad();
    this.loadColonia();
    this.loadMunicipiosOalcaldia();
    this.loadLocalidad();
    this.notifDomicileForm = this.fb.group({
      entidadFederativa: ['', [Validators.required]],
      domicilio: [null],
      calle: [{ value: '', disabled: true }],
      numeroExterior: [{ value: '', disabled: true }],
      numeroInterior: [null],
      codigoPostal: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      pais: [null],
      municipioAlcaldia: [null],
      colonia: [null],
      telefona: ['', [Validators.maxLength(15)]],
      localidad: [null],
    });
    this.updateState();
  }

  /**
   * Método updateState
   *
   * Actualiza el estado del formulario suscribiéndose a los observables de entidad federativa,
   * colonia, localidad, municipio, país, número interior, código postal y teléfono.
   */
  updateState() {
    this.entidadFederativa$
      .pipe(takeUntil(this.destroy$))
      .subscribe((entidadFederativa) => {
        if (entidadFederativa) {
          this.notifDomicileForm
            .get('entidadFederativa')
            ?.setValue(entidadFederativa);
        }
      });
    this.colonia$.pipe(takeUntil(this.destroy$)).subscribe((colonia) => {
      if (colonia) {
        this.notifDomicileForm.get('colonia')?.setValue(colonia);
      }
    });
    this.localidad$.pipe(takeUntil(this.destroy$)).subscribe((localidad) => {
      if (localidad) {
        this.notifDomicileForm.get('localidad')?.setValue(localidad);
      }
    });

    this.municipio$.pipe(takeUntil(this.destroy$)).subscribe((municipio) => {
      if (municipio) {
        this.notifDomicileForm.get('municipioAlcaldia')?.setValue(municipio);
      }
    });
    this.paisInput$.pipe(takeUntil(this.destroy$)).subscribe((pais) => {
      if (pais) {
        this.notifDomicileForm.get('pais')?.setValue(pais);
      }
    });
    this.numeroInterior$
      .pipe(takeUntil(this.destroy$))
      .subscribe((numeroInterior) => {
        if (numeroInterior) {
          this.notifDomicileForm
            .get('numeroInterior')
            ?.setValue(numeroInterior);
        }
      });
    this.codigoPostal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((codigoPostal) => {
        if (codigoPostal) {
          this.notifDomicileForm.get('codigoPostal')?.setValue(codigoPostal);
        }
      });
    this.telefona$.pipe(takeUntil(this.destroy$)).subscribe((telefona) => {
      if (telefona) {
        this.notifDomicileForm.get('telefona')?.setValue(telefona);
      }
    });
  }

  /**
   * Método loadEntidad
   *
   * Carga la información de las entidades federativas desde el servicio.
   */
  loadEntidad(): void {
    this.cancelacionService
      .getEntidades()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Catalogo[]) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * Método loadColonia
   *
   * Carga la información de las colonias desde el servicio.
   */
  loadColonia(): void {
    this.cancelacionService
      .getColonia()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.colonia = data;
      });
  }

  /**
   * Método loadMunicipiosOalcaldia
   *
   * Carga la información de los municipios o alcaldías desde el servicio.
   */
  loadMunicipiosOalcaldia(): void {
    this.cancelacionService
      .getmunicipio()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.municipioAlcaldia = data;
      });
  }

  /**
   * Método loadLocalidad
   *
   * Carga la información de las localidades desde el servicio.
   */
  loadLocalidad(): void {
    this.cancelacionService
      .getLocalidad()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.localidad = data;
      });
  }

  /**
   * Método getEntidad
   *
   * Actualiza la entidad federativa en el store.
   */
  getEntidad(): void {
    const ENTIDAD_FED = this.notifDomicileForm.get('entidadFederativa')?.value;
    this.cancelaciones140201Store.setEntidadFed(ENTIDAD_FED);
  }

  /**
   * Método getMunicipiosOalcaldia
   *
   * Actualiza los municipios o alcaldías en el store.
   */
  getMunicipiosOalcaldia(): void {
    const MUNICIPIOS_ALCALDIA =
      this.notifDomicileForm.get('municipioAlcaldia')?.value;
    this.cancelaciones140201Store.setMunicipiosAlcaldia(MUNICIPIOS_ALCALDIA);
  }

  /**
   * Método getColonia
   *
   * Actualiza la colonia en el store.
   */
  getColonia(): void {
    const COLONIA = this.notifDomicileForm.get('colonia')?.value;
    this.cancelaciones140201Store.setColonia(COLONIA);
  }

  /**
   * Método getLocalidad
   *
   * Actualiza la localidad en el store.
   */
  getLocalidad(): void {
    const LOCALIDAD = this.notifDomicileForm.get('localidad')?.value;
    this.cancelaciones140201Store.setLocalidad(LOCALIDAD);
  }

  /**
   * Método updatePais
   *
   * Actualiza el país en el store.
   */
  updatePais(): void {
    const PAIS = this.notifDomicileForm.get('pais')?.value;
    this.cancelaciones140201Store.setPaisInput(PAIS);
  }

  /**
   * Método updateNumeroInterior
   *
   * Actualiza el número interior en el store.
   */
  updateNumeroInterior(): void {
    const NUMERO_INTERIOR = this.notifDomicileForm.get('numeroInterior')?.value;
    this.cancelaciones140201Store.setNumeroInterior(NUMERO_INTERIOR);
  }

  /**
   * Método updateCodigoPostal
   *
   * Actualiza el código postal en el store.
   */
  updateCodigoPostal(): void {
    const CODIGO_POSTAL = this.notifDomicileForm.get('codigoPostal')?.value;
    this.cancelaciones140201Store.setCodigoPostal(CODIGO_POSTAL);
  }

  /**
   * Método updateTelefona
   *
   * Actualiza el teléfono en el store.
   */
  updateTelefona(): void {
    const TELEFONA = this.notifDomicileForm.get('telefona')?.value;
    this.cancelaciones140201Store.setTelefona(TELEFONA);
  }

  /**
   * Método loadInfo
   *
   * Carga la información adicional desde el servicio y actualiza el formulario.
   */
  loadInfo(): void {
    this.cancelacionService
      .getInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.notifDomicileForm.patchValue({
          calle: data.calle,
          numeroExterior: data.numeroExterior,
        });
      });
  }

  /**
   * Método ngOnDestroy
   *
   * Limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
