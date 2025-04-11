import { AutoridadService } from '../../services/autoridad.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32401State } from '../../estados/tramite32401.store';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite32401Query } from '../../estados/tramite32401.query';
import { Tramite32401Store } from '../../estados/tramite32401.store';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-capturar-requerimiento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './capturar-requerimiento.component.html',
  styleUrl: './capturar-requerimiento.component.css',
})
export class CapturarRequerimientoComponent implements OnInit, OnDestroy {
  aduanaLista: CatalogosSelect = {} as CatalogosSelect;
  capturarRequirementoForm!: FormGroup;
  public solicitud32401State!: Solicitud32401State;
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solicitud32401State;
  indice: number = 1;

  constructor(
    private autoridadService: AutoridadService,
    private fb: FormBuilder,
    public tramite32401Store: Tramite32401Store,
    private tramite32401Query: Tramite32401Query
  ) {
    //
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.buscarAduanaLista();
    this.tramite32401Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.capturarRequirementoForm.patchValue({
            motivoCancelacion: this.solicitudState.motivoCancelacion,
            tipoDeRequerimiento: this.solicitudState.tipoDeRequerimiento,
          });
        })
      )
      .subscribe();
  }

  inicializarFormulario(): void {
    this.capturarRequirementoForm = this.fb.group({
      motivoCancelacion: [
        this.solicitud32401State?.motivoCancelacion,
        Validators.required,
      ],
      tipoDeRequerimiento: [
        this.solicitud32401State?.tipoDeRequerimiento,
        Validators.required,
      ],
    });
  }

  public buscarAduanaLista(): void {
    this.autoridadService
      .obtenerAduanaLista()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta: CatalogosSelect) => {
        this.aduanaLista = respuesta;
      });
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32401Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite32401Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
