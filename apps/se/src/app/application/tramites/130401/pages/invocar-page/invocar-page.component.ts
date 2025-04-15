import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Tramite130401Query } from '../../../../estados/queries/tramite130401.query';
import { Tramite130401State } from '../../../../estados/tramites/tramite130401.store';
import { Tramite130401Store } from '../../../../estados/tramites/tramite130401.store';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-invocar-page',
  templateUrl: './invocar-page.component.html',
  styleUrl: './invocar-page.component.scss',
})
export class InvocarPageComponent implements OnInit, OnDestroy {

  destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite130401State;
  folioFormulario!: FormGroup;
  constructor(
    public store: Tramite130401Store,
    public tramiteQuery: Tramite130401Query,
    public fb: FormBuilder,
    private router: Router,
    private validacionesService: ValidacionesFormularioService
  ) {
    // Constructor del componente
  }
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
  }
  inicializarFormulario(): void {
    this.folioFormulario = this.fb.group({
      folioPermiso: [this.tramiteState?.folioPermiso, [Validators.required]],
    });
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130401Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  cancelar(): void {
    this.folioFormulario.reset();
    this.store.setFolioPermiso('');
  }
  buscar(): void {
    this.folioFormulario.markAllAsTouched();
    if (this.folioFormulario.valid) {
      this.router.navigate(['/pago/modificacion-descripcion/solicitante']);
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
