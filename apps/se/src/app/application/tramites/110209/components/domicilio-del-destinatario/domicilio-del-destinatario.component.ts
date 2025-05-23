import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';

import { REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL,REGEX_SOLO_DIGITOS } from '@ng-mf/data-access-user';
/**
 * Componente para gestionar el formulario de "Domicilio del Destinatario".
 * 
 * @component
 * @example
 * <app-domicilio-del-destinatario></app-domicilio-del-destinatario>
 */
@Component({
  selector: 'app-domicilio-del-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './domicilio-del-destinatario.component.html',
  styleUrl: './domicilio-del-destinatario.component.scss',
})
export class DomicilioDelDestinatarioComponent implements OnInit, OnDestroy {
  /**
   * Formulario que contiene los datos del domicilio del destinatario.
   * @type {FormGroup}
   */
  domicilioDelDestinatarioForm!: FormGroup;

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor para inicializar el formulario con los campos requeridos.
   * 
   * @param {FormBuilder} fb - Servicio utilizado para construir el formulario reactivo.
   * @param {Tramite110209Store} tramite110209Store - El store del trámite 110209.
   * @param {Tramite110209Query} tramite110209Query - La consulta del trámite 110209.
   */
  constructor(private fb: FormBuilder, private tramite110209Store: Tramite110209Store, private tramite110209Query: Tramite110209Query) {
    //
  }

  /**
   * Crea el formulario del componente.
   */
  crearFormulario(): void {
    this.domicilioDelDestinatarioForm = this.fb.group({
      calle: ['', [Validators.required, Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL),Validators.maxLength(100)]],
      numeroLetra: [ '', [Validators.required, Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL),Validators.maxLength(30)]],
      ciudad: ['' , [Validators.required, Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL),Validators.maxLength(50)]],
      correoElectronico: ['', [Validators.required, Validators.email,Validators.maxLength(70)]],
      fax: ['',[Validators.pattern(REGEX_SOLO_DIGITOS),Validators.maxLength(30)]],
      telefono: ['' , [Validators.pattern(REGEX_SOLO_DIGITOS),Validators.maxLength(30)]],
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Crea el formulario del componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.getValoresStore()
  }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite110209Query.selectTramite110209$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.domicilioDelDestinatarioForm.patchValue({
            calle: seccionState.calle,
            numeroLetra: seccionState.numeroLetra,
            ciudad: seccionState.ciudad,
            correoElectronico: seccionState.correoElectronico,
            fax: seccionState.fax,
            telefono: seccionState.telefono,
          });
        })
      )
      .subscribe();
  }

   /**
     * Establece el valor en Tramite110209Store para el campo especificado del formulario.
     * 
     * @param {FormGroup} form - El grupo de formularios que contiene el campo.
     * @param {string} campo - El nombre del campo a obtener y guardar en el store.
     * @returns {void}
     */
    setValoresStore(form: FormGroup, campo: string): void {
      const VALOR = form.get(campo)?.value;
      this.tramite110209Store.setTramite110209({ [campo]: VALOR });
    }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}