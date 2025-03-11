/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable, Subject, takeUntil } from 'rxjs';

import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

/**
 * Componente para manejar los datos del representante legal del exportador.
 *
 * Este componente permite a los usuarios introducir y visualizar los datos del representante legal,
 * incluyendo información personal y de contacto.
 *
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnDestroy, OnInit {
  /**
   * Formulario para los datos del exportador.
   * RepresentanteLegalComponent
   * 
   */
  datosdelexportador: FormGroup;
  /**
   * Observable para el nombre del representante legal.
   * RepresentanteLegalComponent
   */
  nombredelRepresentante$: Observable<string | null> = this.tramite110218Query.nombredelRepresentante$;
  /**
   * Observable para el cargo del representante legal.
   * RepresentanteLegalComponent
   */
  cargo$: Observable<string | null> = this.tramite110218Query.cargo$;
  /**
   * Observable para los teléfonos del representante legal.
   * RepresentanteLegalComponent
   */
  teléfonos$: Observable<string | null> = this.tramite110218Query.teléfonos$;
  /**
   * Observable para los fax del representante legal.
   * RepresentanteLegalComponent
   */
  faxs$: Observable<string | null> = this.tramite110218Query.faxs$;
  /**
   * Observable para los correos electrónicos del representante legal.
   * RepresentanteLegalComponent
   */
  correoElectrónicos$: Observable<string | null> = this.tramite110218Query.correoElectrónicos$;

  /**
   * Subject para la destrucción del componente.
   * RepresentanteLegalComponent
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   *
   * Constructor de formularios.
   * Store para el trámite 110218.
   * Query para el trámite 110218.
   * Servicio para obtener datos del representante legal.
   */
  constructor(
    private fb: FormBuilder,
    private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query,
    private service: CertificadoTecnicoJaponService
  ) {
    this.datosdelexportador = this.fb.group({
      nombredelRepresentante: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/)]], // Campo obligatorio, solo letras y espacios
      empresa: [{ value: '', disabled: true }], // Campo de solo lectura, sin validación necesaria
      cargo: ['', Validators.required], // Campo obligatorio
      teléfonos: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Campo obligatorio, solo números permitidos
      faxs: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Campo obligatorio, solo números permitidos
      correoElectronico: ['', [Validators.required, Validators.email]] // Campo obligatorio, debe ser un correo válido
    });

  }

  /**
   * Método de inicialización del componente.
   * RepresentanteLegalComponent
   */
  ngOnInit(): void {
    this.subscribeToStoreChanges();
    this.getTabledatas();
  }

  /**
   * Obtiene los datos del representante legal desde el servicio.
   * RepresentanteLegalComponent
   */
  getTabledatas(): void {
    this.service.getrepresentante().subscribe((data: any) => {
      this.datosdelexportador.patchValue({
        empresa: data.empresa,
      });
    });
  }

  /**
   * Suscribe a los cambios en el store y actualiza el formulario.
   * RepresentanteLegalComponent
   */
  subscribeToStoreChanges(): void {
    const OBSERVABLES = {
      nombredelRepresentante: this.nombredelRepresentante$,
      cargo: this.cargo$,
      teléfonos: this.teléfonos$,
      faxs: this.faxs$,
      correoElectrónicos: this.correoElectrónicos$,
    };

    Object.entries(OBSERVABLES).forEach(([controlName, OBSERVABLES$]) => {
      OBSERVABLES$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
        if (value) {
          this.datosdelexportador.get(controlName)?.setValue(value);
        }
      });
    });
  }

  /**
   * Método de destrucción del componente.
   * RepresentanteLegalComponent
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Maneja los cambios en los controles del formulario y actualiza el store.
   * RepresentanteLegalComponent
   * Nombre del control del formulario.
   */
  onDatosdelexportadorChange(controlName: string): void {
    const VALUE = this.datosdelexportador.get(controlName)?.value;

    switch (controlName) {
      case 'nombredelRepresentante':
        this.tramite110218Store.setnombredelRepresentante(VALUE);
        break;
      case 'cargo':
        this.tramite110218Store.setcargo(VALUE);
        break;
      case 'teléfonos':
        this.tramite110218Store.setteléfonos(VALUE);
        break;
      case 'faxs':
        this.tramite110218Store.setfaxs(VALUE);
        break;
      case 'correoElectrónicos':
        this.tramite110218Store.setcorreoElectrónicos(VALUE);
        break;
      default:
        console.warn(`Nombre de control no manejado: ${controlName}`);
        break;
    }
  }
}










