import { Catalogo } from '../../models/certificado-origen.model';
import { CatalogoLista } from '../../models/certificado-origen.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CertificadosOrigenService } from '../../services/certificadosOrigen.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite110216Query } from '../../../../estados/queries/tramite110216.query';
import { Tramite110216State } from '../../../../estados/tramites/tramite110216.store';
import { Tramite110216Store } from '../../../../estados/tramites/tramite110216.store';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-datos-certificado',
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
  standalone: true
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {

  formDatosCertificado!: FormGroup;
  idiomas: Catalogo[] = [];
  entidadFederativas: Catalogo[] = [];
  representacionFederal: Catalogo[] = [];
  destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite110216State;

  constructor(
    private fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110216Store,
    public tramiteQuery: Tramite110216Query,
    // eslint-disable-next-line no-empty-function
  ) { }
  ngOnInit(): void {
    this.cargarIdioma();
    this.cargarEntidadFederativa();
    this.cargarRepresentacionFederal();
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
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  inicializarFormulario(): void {
    this.formDatosCertificado = this.fb.group({
      observaciones: [this.tramiteState?.observaciones],
      idioma: [this.tramiteState?.idioma, [Validators.required, Validators.min(0)]],
      entidadFederativa: [this.tramiteState?.entidadFederativa, [Validators.required, Validators.min(0)]],
      representacionFederal: [this.tramiteState?.representacionFederal, [Validators.required, Validators.min(0)]],
    });
    this.formDatosCertificado.markAllAsTouched();
  }

  cargarIdioma(): void {
    this.certificadosOrigenService
      .obtenerIdioma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.idiomas = datos.datos;
        }
      );
  }

  idiomaSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'idioma', 'setIdioma');
  }

  cargarEntidadFederativa(): void {
    this.certificadosOrigenService
      .obtenerEntidadFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.entidadFederativas = datos.datos;
        }
      );
  }

  entidadFederativaSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'entidadFederativa', 'setEntidadFederativa');
  }

  cargarRepresentacionFederal(): void {
    this.certificadosOrigenService
      .obtenerRepresentacionFederal()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.representacionFederal = datos.datos;
        }
      );
  }

  representacionFederalSeleccion(): void {
    this.setValoresStore(this.formDatosCertificado, 'representacionFederal', 'setRepresentacionFederal');
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110216Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

}
