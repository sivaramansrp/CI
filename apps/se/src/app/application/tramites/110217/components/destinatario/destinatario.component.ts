import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { Tramite110217State } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.scss',
})
export class DestinatarioComponent implements OnInit, OnDestroy {

  registroFormulario!: FormGroup;
  transporte!: CatalogosSelect;
  public solicitudState!: Tramite110217State;
  public destroyNotifier$: Subject<void> = new Subject();
  estaDeshabilitado: boolean = false;
  estaVacio: boolean = false;
  constructor(
    public fb: FormBuilder,
    private store: Tramite110217Store,
    private query: Tramite110217Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  validarDestinatarioFormulario(): void {
    if (this.registroFormulario.invalid) {
      this.registroFormulario.markAllAsTouched();
    }
  }
  onClick(): void {
    this.estaDeshabilitado = true;
  }
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.donanteDomicilio();
  }
  onSubmit(): void {
    if (this.registroFormulario.valid) {
      // Aquí se implementará la lógica para manejar el envío del formulario.
    }
  }
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110217Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  get grupoDeTransporte(): FormGroup {
    return this.registroFormulario.get('grupoDeTransporte') as FormGroup;
  }
  get grupoReceptor(): FormGroup {
    return this.registroFormulario.get('grupoReceptor') as FormGroup;
  }
  get grupoDeDirecciones(): FormGroup {
    return this.registroFormulario.get('grupoDeDirecciones') as FormGroup;
  }
  get grupoRepresentativo(): FormGroup {
    return this.registroFormulario.get('grupoRepresentativo') as FormGroup
  }
  donanteDomicilio(): void {
    this.registroFormulario = this.fb.group({
      grupoReceptor: this.fb.group({
        nombre: [this.solicitudState?.grupoReceptor?.nombre, [Validators.required]],
        apellidoPrimer: [this.solicitudState?.grupoReceptor?.apellidoPrimer, [Validators.required]],
        apellidoSegundo: [this.solicitudState?.grupoReceptor?.apellidoSegundo, [Validators.required]],
        numeroFiscal: [this.solicitudState?.grupoReceptor?.numeroFiscal, [Validators.required]],
        razonSocial: [this.solicitudState?.grupoReceptor?.razonSocial, [Validators.required]],
      }),

      grupoDeDirecciones: this.fb.group({
        ciudad: [this.solicitudState?.grupoDeDirecciones?.ciudad, [Validators.required]],
        calle: [this.solicitudState?.grupoDeDirecciones?.calle, [Validators.required]],
        numeroLetra: [this.solicitudState?.grupoDeDirecciones?.numeroLetra, [Validators.required]],
        lada: [this.solicitudState?.grupoDeDirecciones?.lada, [Validators.required]],
        telefono: [this.solicitudState?.grupoDeDirecciones?.telefono, [Validators.required, Validators.pattern(/^\d+$/)]],
        fax: [this.solicitudState?.grupoDeDirecciones?.fax, [Validators.pattern(/^\d+$/)]],
        correoElectronico: [this.solicitudState?.grupoDeDirecciones?.correoElectronico, [Validators.required, Validators.email]],
      }),

      grupoRepresentativo: this.fb.group({
        lugar: [this.solicitudState?.grupoRepresentativo?.lugar, [Validators.required, Validators.maxLength(40)]],
        nombreExportador: [this.solicitudState?.grupoRepresentativo?.nombreExportador, [Validators.required, Validators.maxLength(40)]],
        empresa: [this.solicitudState?.grupoRepresentativo?.empresa, [Validators.required, Validators.maxLength(40)]],
        cargo: [this.solicitudState?.grupoRepresentativo?.cargo, [Validators.required, Validators.maxLength(40)]],
        lada: [this.solicitudState?.grupoRepresentativo?.lada, [Validators.required]],
        telefono: [this.solicitudState?.grupoRepresentativo?.telefono, [Validators.required, Validators.pattern(/^\d+$/)]],
        fax: [this.solicitudState?.grupoRepresentativo?.fax, [Validators.pattern(/^\d+$/)]],
        correoElectronico: [this.solicitudState?.grupoRepresentativo?.correoElectronico, [Validators.required, Validators.email]],
      }),

      grupoDeTransporte: this.fb.group({
        puertoEmbarque: [this.solicitudState?.grupoDeTransporte?.puertoEmbarque, [Validators.maxLength(40)]],
        puertoDesembarque: [this.solicitudState?.grupoDeTransporte?.puertoDesembarque, [Validators.maxLength(40)]],
        puertoTransito: [this.solicitudState?.grupoDeTransporte?.puertoTransito, [Validators.maxLength(30)]],
        nombreEmbarcacion: [this.solicitudState?.grupoDeTransporte?.nombreEmbarcacion, [Validators.maxLength(30)]],
        numeroVuelo: [this.solicitudState?.grupoDeTransporte?.numeroVuelo, [Validators.maxLength(15)]]
      }),
    });
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
