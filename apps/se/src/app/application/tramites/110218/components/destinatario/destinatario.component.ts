import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { REGEX_DESCRIPCION_ESPECIALES } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { REG_X } from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para manejar los datos del destinatario para el certificado técnico de Japón.
 *
 * Este componente permite a los usuarios introducir y visualizar los datos del destinatario,
 * incluyendo información personal y de contacto.
 *
 */
@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './destinatario.component.html',
  styleUrls: ['./destinatario.component.scss'],
})
export class DestinatarioComponent implements OnInit, OnDestroy {
  /**
   * Formulario para los datos personales del destinatario.
   * DestinatarioComponent
   * 
   */
  datosDelDestinatario: FormGroup;
  /**
   * Formulario para el domicilio del destinatario.
   * DestinatarioComponent
   * 
   */
  domicilioDelDestinatario: FormGroup;
  /**
   * Observable para el nombre del destinatario.
   * DestinatarioComponent
   * 
   */
  nombre$: Observable<string | null> = this.tramite110218Query.nombre$;
  /**
   * Observable para el primer apellido del destinatario.
   * DestinatarioComponent
   *
   */
  primerApellido$: Observable<string | null> = this.tramite110218Query.primerApellido$;
  /**
   * Observable para el número de registro fiscal del destinatario.
   * DestinatarioComponent
   * 
   */
  numeroderegistroFiscal$: Observable<string | null> = this.tramite110218Query.numeroderegistroFiscal$;
  /**
   * Observable para la razón social del destinatario.
   * DestinatarioComponent
   *
   */
  razonSocial$: Observable<string | null> = this.tramite110218Query.razonSocial$;
  /**
   * Observable para la calle del domicilio del destinatario.
   * DestinatarioComponent
   * 
   */
  calle$: Observable<string | null> = this.tramite110218Query.calle$;
  /**
   * Observable para el número/letra del domicilio del destinatario.
   * DestinatarioComponent
   * 
   */
  numeroLetra$: Observable<string | null> = this.tramite110218Query.numeroLetra$;
  /**
   * Observable para la ciudad del domicilio del destinatario.
   * DestinatarioComponent
   * 
   */
  ciudad$: Observable<string | null> = this.tramite110218Query.ciudad$;
  /**
   * Observable para el correo electrónico del destinatario.
   * DestinatarioComponent
   * 
   */
  correoElectronico$: Observable<string | null> = this.tramite110218Query.correoElectronico$;
  /**
   * Observable para el fax del destinatario.
   * DestinatarioComponent
   * 
   */
  fax$: Observable<string | null> = this.tramite110218Query.fax$;
  /**
   * Observable para el telefono del destinatario.
   * DestinatarioComponent
   *
   */
  telefono$: Observable<string | null> = this.tramite110218Query.telefono$;

  /**
   * Subject para la destrucción del componente.
   * DestinatarioComponent
   * 
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   *
   * Constructor de formularios.
   * Store para el trámite 110218.
   * Query para el trámite 110218.
   * Servicio para obtener datos del destinatario.
   */
  constructor(
    private fb: FormBuilder,
    private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query,
    private service: CertificadoTecnicoJaponService
  ) {
    this.datosDelDestinatario = this.crearFormularioDatosDelDestinatario();
    this.domicilioDelDestinatario = this.crearFormularioDomicilioDelDestinatario();

  }
  private crearFormularioDatosDelDestinatario(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)]], // Solo letras y espacios, obligatorio
      primerApellido: ['', [Validators.required, Validators.pattern(REGEX_DESCRIPCION_ESPECIALES)]], // Opcional, pero solo letras permitidas
      segundoApellido: [{ value: '', disabled: true }], // Campo de solo lectura, sin validación
      numeroderegistroFiscal: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]], // Solo mayúsculas y números, obligatorio
      razonSocial: ['', [Validators.required]], // Campo obligatorio
    });
  }
  
  private crearFormularioDomicilioDelDestinatario(): FormGroup {
    return this.fb.group({
      calle: ['', Validators.required], // Campo obligatorio
      numeroLetra: ['', Validators.required], // Campo obligatorio
      ciudad: ['', Validators.required], // Campo obligatorio
      correoElectronico: ['', [Validators.required, Validators.email]], // Obligatorio y debe ser un correo válido
      fax: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]], // Solo se permiten dígitos
      telefono: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]], // Obligatorio y solo se permiten dígitos
    });
  }
  /**
   * Método de inicialización del componente.
   * DestinatarioComponent
   */
  ngOnInit(): void {
    this.suscribirseACambiosEnLaTienda();
    this.obtenerDatosDeTabla();
  }

  /**
   * Obtiene los datos del destinatario desde el servicio.
   * DestinatarioComponent
   */
  obtenerDatosDeTabla(): void {
    this.service.getdestinatario().pipe(takeUntil(this.destroyed$)).subscribe((data: { segundoApellido: string }) => {
      this.datosDelDestinatario.patchValue({
        segundoApellido: data.segundoApellido,
      });
    });
  }

  /**
   * Suscribe a los cambios en el store y actualiza los formularios.
   * DestinatarioComponent
   */
  suscribirseACambiosEnLaTienda(): void {
    const OBSERVABLES: Record<string, Observable<string | null>> = {
      nombre: this.nombre$,
      primerApellido: this.primerApellido$,
      numeroderegistroFiscal: this.numeroderegistroFiscal$,
      razonSocial: this.razonSocial$,
      calle: this.calle$,
      numeroLetra: this.numeroLetra$,
      ciudad: this.ciudad$,
      correoElectronico: this.correoElectronico$,
      fax: this.fax$,
      telefono: this.telefono$,
    };

    Object.entries(OBSERVABLES).forEach(([controlName, observable$]) => {
      observable$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
        if (controlName in this.datosDelDestinatario.controls) {
          this.datosDelDestinatario.get(controlName)?.setValue(value);
        } else if (controlName in this.domicilioDelDestinatario.controls) {
          this.domicilioDelDestinatario.get(controlName)?.setValue(value);
        }
      });
    });
  }

  /**
   * Método de destrucción del componente.
   * DestinatarioComponent
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Maneja los cambios en los controles del formulario de datos del destinatario y actualiza el store.
   * DestinatarioComponent
   * Nombre del control del formulario.
   */
  onDatosdeldestinatarioChange(controlName: string): void {
    const VALUE = this.datosDelDestinatario.get(controlName)?.value;

    switch (controlName) {
      case 'nombre':
        this.tramite110218Store.establecerNombre(VALUE);
        break;
      case 'primerApellido':
        this.tramite110218Store.establecerPrimerApellido(VALUE);
        break;
      case 'numeroderegistroFiscal':
        this.tramite110218Store.establecerNúmeroderegistroFiscal(VALUE);
        break;
      case 'razonSocial':
        this.tramite110218Store.establecerRazónSocial(VALUE);
        break;
      default:
        break;
    }
  }

  /**
   * Maneja los cambios en los controles del formulario de domicilio del destinatario y actualiza el store.
   * DestinatarioComponent
   * Nombre del control del formulario.
   */
  onDomiciliodeldestinatarioChange(controlName: string): void {
    const VALUE = this.domicilioDelDestinatario.get(controlName)?.value;

    switch (controlName) {
      case 'calle':
        this.tramite110218Store.establecerCalle(VALUE);
        break;
      case 'numeroLetra':
        this.tramite110218Store.establecerNúmeroLetra(VALUE);
        break;
      case 'ciudad':
        this.tramite110218Store.establecerCiudad(VALUE);
        break;
      case 'correoElectronico':
        this.tramite110218Store.establecerCorreoElectrónico(VALUE);
        break;
      case 'fax':
        this.tramite110218Store.establecerFax(VALUE);
        break;
      case 'telefono':
        this.tramite110218Store.establecerTeléfono(VALUE);
        break;
      default:
        break;
    }
  }
}