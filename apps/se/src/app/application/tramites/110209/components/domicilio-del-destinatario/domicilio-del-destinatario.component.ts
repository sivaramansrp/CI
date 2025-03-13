import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';

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
export class DomicilioDelDestinatarioComponent implements OnInit {
  /**
   * Formulario que contiene los datos del domicilio del destinatario.
   * @type {FormGroup}
   */
  domicilioDelDestinatarioForm!: FormGroup;

  /**
   * Constructor para inicializar el formulario con los campos requeridos.
   * 
   * @param {FormBuilder} fb - Servicio utilizado para construir el formulario reactivo.
   */

  private destroyed$ = new Subject<void>();
  constructor(private fb: FormBuilder, private tramite110209Store: Tramite110209Store, private tramite110209Query: Tramite110209Query) {
    //
  }

  createForm(): void {
    this.domicilioDelDestinatarioForm = this.fb.group({
      calle: [{ value: '', disabled: false }, Validators.required, Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      numeroLetra: [{ value: '', disabled: false }, Validators.required,Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      ciudad: [{ value: '', disabled: false }, Validators.required,Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      correoElectronico: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      fax: [{ value: '', disabled: false },Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      telefono: [{ value: '', disabled: false },Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
    });
  }
  ngOnInit(): void {
    this.createForm();
  }

  getValoresStore(): void {
    this.tramite110209Query.selectTramite110102$
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
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110209Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110209Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
}
