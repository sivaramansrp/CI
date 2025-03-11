/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component,OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  númeroderegistroFiscal$: Observable<string | null> = this.tramite110218Query.númeroderegistroFiscal$;
  /**
   * Observable para la razón social del destinatario.
   * DestinatarioComponent
   *
   */
  razónSocial$: Observable<string | null> = this.tramite110218Query.razónSocial$;
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
  númeroLetra$: Observable<string | null> = this.tramite110218Query.númeroLetra$;
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
  correoElectrónico$: Observable<string | null> = this.tramite110218Query.correoElectrónico$;
  /**
   * Observable para el fax del destinatario.
   * DestinatarioComponent
   * 
   */
  fax$: Observable<string | null> = this.tramite110218Query.fax$;
  /**
   * Observable para el teléfono del destinatario.
   * DestinatarioComponent
   *
   */
  teléfono$: Observable<string | null> = this.tramite110218Query.teléfono$;

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
      nombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      númeroderegistroFiscal: [''],
      razónSocial: [''],
    });
    this.domiciliodeldestinatario = this.fb.group({
      calle: [''],
      númeroLetra: [''],
      ciudad: [''],
      correoElectrónico: [''],
      fax: [''],
      teléfono: [''],
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
      númeroderegistroFiscal: this.númeroderegistroFiscal$,
      razónSocial: this.razónSocial$,
      calle: this.calle$,
      númeroLetra: this.númeroLetra$,
      ciudad: this.ciudad$,
      correoElectrónico: this.correoElectrónico$,
      fax: this.fax$,
      teléfono: this.teléfono$,
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
          case 'númeroderegistroFiscal':
              this.tramite110218Store.setnúmeroderegistroFiscal(VALUE);
              break;
          case 'razónSocial':
              this.tramite110218Store.setrazónSocial(VALUE);
              break;
          default:
              console.warn(`Nombre de control no manejado: ${controlName}`);
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
          case 'númeroLetra':
              this.tramite110218Store.setnúmeroLetra(VALUE);
              break;
          case 'ciudad':
              this.tramite110218Store.setciudad(VALUE);
              break;
          case 'correoElectrónico':
              this.tramite110218Store.setcorreoElectrónico(VALUE);
              break;
          case 'fax':
              this.tramite110218Store.setfax(VALUE);
              break;
          case 'teléfono':
              this.tramite110218Store.setteléfono(VALUE);
              break;
          default:
              console.warn(`Nombre de control no manejado: ${controlName}`);
              break;
      }
  }
}