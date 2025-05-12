import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { REGEX_DESCRIPCION_ESPECIALES } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { REG_X } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

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
   * Observable para los telefonos del representante legal.
   * RepresentanteLegalComponent
   */
  telefonos$: Observable<string | null> = this.tramite110218Query.telefonos$;
  /**
   * Observable para los fax del representante legal.
   * RepresentanteLegalComponent
   */
  faxs$: Observable<string | null> = this.tramite110218Query.faxs$;
  /**
   * Observable para los correos electrónicos del representante legal.
   * RepresentanteLegalComponent
   */
  correoElectronicos$: Observable<string | null> = this.tramite110218Query.correoElectronicos$;

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
    this.datosdelexportador = this.crearFormularioDatosDelExportador();
  }

  private crearFormularioDatosDelExportador(): FormGroup {
    return this.fb.group({
      nombredelRepresentante: ['', [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)]], // Campo obligatorio, solo letras y espacios
      empresa: [{ value: '', disabled: true }], // Campo de solo lectura, sin validación necesaria
      cargo: ['', Validators.required], // Campo obligatorio
      telefonos: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]], // Campo obligatorio, solo números permitidos
      faxs: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]], // Campo obligatorio, solo números permitidos
      correoElectronicos: ['', [Validators.required, Validators.email]] // Campo obligatorio, debe ser un correo válido
    });
  }

  /**
   * Método de inicialización del componente.
   * RepresentanteLegalComponent
   */
  ngOnInit(): void {
    this.suscribirseACambiosDeTienda();
    this.obtenerDatosDeTabla();
  }

  /**
   * Obtiene los datos del representante legal desde el servicio.
   * RepresentanteLegalComponent
   */
  obtenerDatosDeTabla(): void {
    this.service.getrepresentante().pipe(takeUntil(this.destroyed$)).subscribe((data: { empresa: string }) => {
      this.datosdelexportador.patchValue({
        empresa: data.empresa,
      });
    });
  }

  /**
   * Suscribe a los cambios en el store y actualiza el formulario.
   * RepresentanteLegalComponent
   */
  suscribirseACambiosDeTienda(): void {
    const OBSERVABLES = {
      nombredelRepresentante: this.nombredelRepresentante$,
      cargo: this.cargo$,
      telefonos: this.telefonos$,
      faxs: this.faxs$,
      correoElectronicos: this.correoElectronicos$,
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
        this.tramite110218Store.establecerNombredelRepresentante(VALUE);
        break;
      case 'cargo':
        this.tramite110218Store.establecerCargo(VALUE);
        break;
      case 'telefonos':
        this.tramite110218Store.establecerTeléfonos(VALUE);
        break;
      case 'faxs':
        this.tramite110218Store.establecerFaxs(VALUE);
        break;
      case 'correoElectronicos':
        this.tramite110218Store.establecerCorreoElectrónicos(VALUE);
        break;
      default:
        break;
    }
  }
}










