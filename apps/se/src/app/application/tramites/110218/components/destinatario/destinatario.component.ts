/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component,OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Observable, Subject, takeUntil } from 'rxjs';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

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
  datosdeldestinatario: FormGroup;
  /**
   * Formulario para el domicilio del destinatario.
   * DestinatarioComponent
   * 
   */
  domiciliodeldestinatario: FormGroup;
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
    this.datosdeldestinatario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Solo letras y espacios, obligatorio
      primerApellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Opcional, pero solo letras permitidas
      segundoApellido: [{ value: '', disabled: true }], // Campo de solo lectura, sin validación
      numeroderegistroFiscal: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]], // Solo mayúsculas y números, obligatorio
      razonSocial: ['', [Validators.required]], // Campo obligatorio
    });
    
    this.domiciliodeldestinatario = this.fb.group({
      calle: ['', Validators.required], // Campo obligatorio
      numeroLetra: ['', Validators.required], // Campo obligatorio
      ciudad: ['', Validators.required], // Campo obligatorio
      correoElectronico: ['', [Validators.required, Validators.email]], // Obligatorio y debe ser un correo válido
      fax: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Solo se permiten dígitos
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Obligatorio y solo se permiten dígitos
    });
    
  }

  /**
   * Método de inicialización del componente.
   * DestinatarioComponent
   */
  ngOnInit(): void {
    this.subscribeToStoreChanges();
    this.getTabledatas();
  }

  /**
   * Obtiene los datos del destinatario desde el servicio.
   * DestinatarioComponent
   */
  getTabledatas(): void {
    this.service.getdestinatario().subscribe((data: any) => {
      this.datosdeldestinatario.patchValue({
        segundoApellido: data.segundoApellido,
      });
    });
  }

  /**
   * Suscribe a los cambios en el store y actualiza los formularios.
   * DestinatarioComponent
   */
  subscribeToStoreChanges(): void {
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
        if (controlName in this.datosdeldestinatario.controls) {
          this.datosdeldestinatario.get(controlName)?.setValue(value);
        } else if (controlName in this.domiciliodeldestinatario.controls) {
          this.domiciliodeldestinatario.get(controlName)?.setValue(value);
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
      const VALUE = this.datosdeldestinatario.get(controlName)?.value;

      switch (controlName) {
          case 'nombre':
              this.tramite110218Store.setnombre(VALUE);
              break;
          case 'primerApellido':
              this.tramite110218Store.setprimerApellido(VALUE);
              break;
          case 'numeroderegistroFiscal':
              this.tramite110218Store.setnúmeroderegistroFiscal(VALUE);
              break;
          case 'razonSocial':
              this.tramite110218Store.setrazónSocial(VALUE);
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
      const VALUE = this.domiciliodeldestinatario.get(controlName)?.value;

      switch (controlName) {
          case 'calle':
              this.tramite110218Store.setcalle(VALUE);
              break;
          case 'numeroLetra':
              this.tramite110218Store.setnúmeroLetra(VALUE);
              break;
          case 'ciudad':
              this.tramite110218Store.setciudad(VALUE);
              break;
          case 'correoElectronico':
              this.tramite110218Store.setcorreoElectrónico(VALUE);
              break;
          case 'fax':
              this.tramite110218Store.setfax(VALUE);
              break;
          case 'telefono':
              this.tramite110218Store.setteléfono(VALUE);
              break;
          default:
              break;
      }
  }
}