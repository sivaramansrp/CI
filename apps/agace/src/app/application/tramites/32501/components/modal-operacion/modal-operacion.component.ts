import { AvisoCatalogo } from '../../models/aviso-catalogo.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MercDesmSinMonService } from '../../services/merc-desm-sin-mon.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Solicitud32501Query } from '../../estados/solicitud32501.query';
import { Solicitud32501State } from '../../estados/solicitud32501.store';
import { Solicitud32501Store } from '../../estados/solicitud32501.store';
import { Subject } from 'rxjs';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-operacion',
  templateUrl: './modal-operacion.component.html',
  styleUrl: './modal-operacion.component.scss',
})
export class ModalOperacionComponent implements OnInit, OnDestroy {
  frmDatosOperacionImp!: FormGroup;
  opcionAduana: CatalogosSelect = {} as CatalogosSelect;
  private destroyed$ = new Subject<void>();
  solicitud32501State: Solicitud32501State = {} as Solicitud32501State;
  constructor(
    private fb: FormBuilder,
    public mercDesmSinMonService: MercDesmSinMonService,
    public solicitud32501Query: Solicitud32501Query,
    public solicitud32501Store: Solicitud32501Store
  ) {
    this.obtenerAvisoDelCatalogo();
  }

  ngOnInit(): void {
    this.frmDatosOperacionImp = this.fb.group({
      patente: [this.solicitud32501State.patente, [Validators.required]],
      rfc: [this.solicitud32501State.rfc, [Validators.required]],
      pedimento: [this.solicitud32501State.pedimento, [Validators.required]],
      aduana: [this.solicitud32501State.aduana, [Validators.required]],
    });

    this.solicitud32501Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud32501State) => {
          this.solicitud32501State = respuesta;
          this.frmDatosOperacionImp.patchValue({
            patente: this.solicitud32501State.patente,
            rfc: this.solicitud32501State.rfc,
            pedimento: this.solicitud32501State.pedimento,
            aduana: this.solicitud32501State.aduana,
          });
        })
      )
      .subscribe();
  }

  obtenerAvisoDelCatalogo(): void {
    this.mercDesmSinMonService
      .obtenerAvisoDelCatalogo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoCatalogo) => {
          this.opcionAduana = respuesta.aduanaDeImportacion;
        },
      });
  }

  actualizarAduana(evento: Catalogo): void {
    this.solicitud32501Store.actualizarAduana(evento.id);
  }

  actualizarPatente(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarPatente(VALOR.value);
  }

  actualizaRFC(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizaRFC(VALOR.value);
  }

  actualizarPedimento(evento: Event): void {
    const VALOR = evento.target as HTMLInputElement;
    this.solicitud32501Store.actualizarPedimento(VALOR.value);
  }

  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.frmDatosOperacionImp.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  esValido(field: string): boolean {
    const CONTROL = this.frmDatosOperacionImp.get(field);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
