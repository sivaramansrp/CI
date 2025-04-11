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
import { Solicitud31501State } from '../../estados/tramite31501.store';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite31501Query } from '../../estados/tramite31501.query';
import { Tramite31501Store } from '../../estados/tramite31501.store';
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
  public solicitud31501State!: Solicitud31501State;
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solicitud31501State;
  indice: number = 1;

  constructor(
    private autoridadService: AutoridadService,
    private fb: FormBuilder,
    public tramite31501Store: Tramite31501Store,
    private tramite31501Query: Tramite31501Query
  ) {
    //
  }

  ngOnInit(): void {
    this.tramite31501Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.buscarAduanaLista();
  }

  inicializarFormulario(): void {
    this.capturarRequirementoForm = this.fb.group({
      motivoCancelacion: [
        this.solicitud31501State?.motivoCancelacion,
        Validators.required,
      ],
      tipoDeRequerimiento: [
        this.solicitud31501State?.tipoDeRequerimiento,
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
    metodoNombre: keyof Tramite31501Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31501Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
