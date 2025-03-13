
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DomicilioDelDestinatarioComponent } from '../domicilio-del-destinatario/domicilio-del-destinatario.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { map, Subject, takeUntil } from 'rxjs';


/**
 * Componente encargado de gestionar los datos del destinatario.
 * 
 * @component
 * @selector app-datos-del-destinatario
 * @imports [CommonModule, TituloComponent, ReactiveFormsModule, DomicilioDelDestinatarioComponent]
 * @templateUrl ./datos-del-destinatario.component.html
 * @styleUrl ./datos-del-destinatario.component.scss
 */
@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, DomicilioDelDestinatarioComponent],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.scss',
})
export class DatosDelDestinatarioComponent implements OnInit {
  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea de tipo 'FormGroup'.
   *
   * @property {FormGroup} detosDelDestinatarioForm - El formulario del componente.
   */
  detosDelDestinatarioForm!: FormGroup;

  /**
   * Constructor del componente DetallesDelDestinatarioComponent.
   * 
   * @param {FormBuilder} fb - El servicio FormBuilder proporcionado por Angular.
   * @example
   * const form = new FormGroup();
   * @public
   */
  private destroyed$ = new Subject<void>();
  constructor(private fb: FormBuilder, private tramite110209Store: Tramite110209Store, private tramite110209Query: Tramite110209Query) {
    //
  }

  createForm(): void {
    this.detosDelDestinatarioForm = this.fb.group({
      nombre: [{ value: '', disabled: false },Validators.pattern(/^(?!\s)(.*\S)?$/)],
      primerApellido: [{ value: '', disabled: false },Validators.pattern(/^(?!\s)(.*\S)?$/)],
      segundoApellido: [{ value: '', disabled: false },Validators.pattern(/^(?!\s)(.*\S)?$/)],
      numeroDeRegistroFiscal: [{ value: '', disabled: false }, Validators.required, Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      razonSocial: [{ value: '', disabled: false },Validators.pattern(/^(?!\s)(.*\S)?$/)],
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
          this.detosDelDestinatarioForm.patchValue({
            nombre: seccionState.nombre,
            primerApellido: seccionState.primerApellido,
            segundoApellido: seccionState.segundoApellido,
            numeroDeRegistroFiscal: seccionState.numeroDeRegistroFiscal,
            razonSocial: seccionState.razonSocial,
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
