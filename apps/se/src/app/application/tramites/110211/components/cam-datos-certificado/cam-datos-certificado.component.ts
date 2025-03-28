import { Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { Subject, takeUntil } from 'rxjs';

/**
 * @description
 * The `CamDatosCertificadoComponent` is responsible for managing the data and interactions
 * related to the certificate form in the CAM module.
 */
@Component({
  selector: 'app-cam-datos-certificado',
  templateUrl: './cam-datos-certificado.component.html',
  styleUrl: './cam-datos-certificado.component.css',
})
export class CamDatosCertificadoComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Indicates whether the default language is selected.
   */
  idioma: boolean = true;

  /**
   * @description
   * Stores the list of available languages.
   */
  idiomaDatos: Catalogo[] = [];

  /**
   * @description
   * Stores the list of available federal entities.
   */
  entidadFederativas: Catalogo[] = [];

  /**
   * @description
   * Stores the list of available federal representations.
   */
  representacionFederal: Catalogo[] = [];

  private destroyNotifier$: Subject<void> = new Subject();

  formDatosCertificadoValues!: { [key: string]: string | number | boolean | object | undefined };

  /**
   * @description
   * Initializes the component with required services and dependencies.
   * @param fb - FormBuilder instance for managing forms.
   * @param camCertificadoService - Service for fetching certificate-related data.
   * @param store - Store for managing the state of the certificate form.
   */
  constructor(
    private readonly fb: FormBuilder,
    private camCertificadoService: CamCertificadoService,
    private store: camCertificadoStore,
    private query: camCertificadoQuery,
  ) {
    this.query.formDatosCertificado$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
        this.formDatosCertificadoValues = estado;
    });
  }

  /**
   * @description
   * Lifecycle hook that is called after the component is initialized.
   * Fetches the initial data for the form.
   */
  ngOnInit(): void {
    this.idiomOpcion();
    this.entidadFederativasOpcion();
    this.representacionFederalOpcion();
  }

  /**
   * @description
   * Fetches the list of available languages.
   */
  idiomOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('idioma.json').subscribe({
      next: (data) => {
        this.idiomaDatos = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.idiomaDatos = [];
      },
    });
  }

  /**
   * @description
   * Fetches the list of available federal entities.
   */
  entidadFederativasOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('entidadFederativas.json').subscribe({
      next: (data) => {
        this.entidadFederativas = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.entidadFederativas = [];
      },
    });
  }

  /**
   * @description
   * Fetches the list of available federal representations.
   */
  representacionFederalOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('representacionFederal.json').subscribe({
      next: (data) => {
        this.representacionFederal = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.representacionFederal = [];
      },
    });
  }

  /**
   * @description
   * Updates the store with the form data.
   * @param e - The form data to be stored.
   */
  obtenerDatosFormulario(e: unknown): void {
    this.store.setFormDatosCertificado(e as { [key: string]: string | number | boolean | object | undefined });
  }

  /**
   * @description
   * Updates the store with the selected language.
   * @param estado - The selected language.
   */
  idiomaSeleccion(estado: Catalogo): void {
    this.store.setIdiomaSeleccion(estado);
  }

  /**
   * @description
   * Updates the store with the selected federal entity.
   * @param estado - The selected federal entity.
   */
  entidadFederativaSeleccion(estado: Catalogo): void {
    this.store.setEntidadFederativaSeleccion(estado);
  }

  /**
   * @description
   * Updates the store with the selected federal representation.
   * @param estado - The selected federal representation.
   */
  representacionFederalSeleccion(estado: Catalogo): void {
    this.store.setRepresentacionFederalDatosSeleccion(estado);
  }

  /**
   * @description
   * Updates the store with the form validation status.
   * @param valida - The validation status of the form.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ datos: valida });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}