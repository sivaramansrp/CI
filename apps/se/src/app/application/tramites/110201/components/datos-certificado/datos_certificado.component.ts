import {
  CatalogoSelectComponent,
  CatalogosSelect,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud110201State,
  Tramite110201Store,
} from '../../state/Tramite110201.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { Console } from 'console';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos_certificado.component.html',
  styleUrl: './datos_certificado.component.css',
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  getIdiomaSubscripcion!: Subscription;
  getEntidadSubscripcion!: Subscription;
  getRepresentacionSubscripcion!: Subscription;
  registroForm!: FormGroup;
  idioma!: CatalogosSelect;
  entidad!: CatalogosSelect;
  representacion!: CatalogosSelect;
  public solicitudState!: Solicitud110201State;
  public destroyNotifier$: Subject<void> = new Subject();
  @Input() entidadFederativaData: any;
  isJustificacion:boolean = false;

  entidadDescripcion: unknown[] = [];

  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    private store: Tramite110201Store,
    private query: Tramite110201Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.getIdioma();
    this.getEntidad();
    this.getRepresentacion();

    console.log(this.entidadFederativaData);

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.subscriptions.push(
      this.query.selectIdioma$.subscribe((idioma) => {
        this.idioma = {
          labelNombre: 'Idioma',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: idioma ?? [],
        };
      })
    );

    this.subscriptions.push(
      this.query.selectEntidad$.subscribe((entidad) => {
        this.entidad = {
          labelNombre: 'Entidad federativa',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: entidad ?? [],
        };
        this.entidadDescripcion = this.entidad.catalogos;
        if(this.entidadDescripcion.includes('8') && this.entidadFederativaData =="DURANGO"){
          this.isJustificacion = true;
        } else {
          this.isJustificacion = false;
        }
      })
    );

    this.subscriptions.push(
      this.query.selectRepresentacion$.subscribe((representacion) => {
        this.representacion = {
          labelNombre: 'Representación federal',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: representacion ?? [],
        };
      })
    );
  }

  getIdioma(): void {
    this.getIdiomaSubscripcion = this.registroService
      .getIdioma()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setIdioma(RESPONSE);
        }
      });
  }
  getEntidad(): void {
    this.getEntidadSubscripcion = this.registroService
      .getEntidad()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setEntidad(RESPONSE);
        }
      });
  }
  getRepresentacion(): void {
    this.getRepresentacionSubscripcion = this.registroService
      .getRepresentacion()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setRepresentacion(RESPONSE);
        }
      });
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      validacionForm: this.fb.group({
        observaciones: [
          this.solicitudState?.observaciones,
          [Validators.required],
        ],
        presica: [this.solicitudState?.presica, [Validators.required]],
        presenta: [this.solicitudState?.presenta, [Validators.required]],
        idioma: [this.solicitudState?.idioma, [Validators.required]],
        entidad: [this.solicitudState?.entidad, [Validators.required]],
        representacion: [
          this.solicitudState?.representacion,
          [Validators.required],
        ],
        checkbox: [this.solicitudState?.checkbox, [Validators.requiredTrue]],
        justificacion: [
          this.solicitudState?.justificacion,
          [Validators.required],
        ],
      }),
    });
  }

  ngOnDestroy(): void {
    if (this.getIdiomaSubscripcion) {
      this.getIdiomaSubscripcion.unsubscribe();
    }
    if (this.getEntidadSubscripcion) {
      this.getEntidadSubscripcion.unsubscribe();
    }
    if (this.getRepresentacionSubscripcion) {
      this.getRepresentacionSubscripcion.unsubscribe();
    }
    this.destroyNotifier$.next();
  }
}
