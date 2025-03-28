import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  InputFecha,
  InputFechaComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FECHAFINAL,FECHAINICIAL, FECHAPAGO } from '../models/registro.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import {
  Solicitud31803State,
  Tramite31803Store,
} from '../state/Tramite31803.store';
import { CommonModule } from '@angular/common';
import { RegistroSolicitudService } from '../services/registro-solicitud-service.service';
import { Solicitud31803Enum } from '../constantes/solicitud31803.enum';
import { Tramite31803Query } from '../state/Tramite31803.query';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  providers: [RegistroSolicitudService],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  fechaInicialInput: InputFecha = FECHAINICIAL;
  fechaFinalInput: InputFecha = FECHAFINAL;
  fechaPagoInput: InputFecha = FECHAPAGO;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public destroyNotifier$: Subject<void> = new Subject();
  solicitudEnum = Solicitud31803Enum;
  registroForm!: FormGroup;
  public solicitudState!: Solicitud31803State;
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  constructor(
    private registroSolicitud: RegistroSolicitudService,
    public fb: FormBuilder,
    private store: Tramite31803Store,
    private query: Tramite31803Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  ngOnInit(): void {
    this.getBancoData();

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

  cambioFechaFactura(nuevo_fechaFin: string): void {
    this.registroForm.patchValue({
      fechaPago: nuevo_fechaFin,
    });
    this.setValoresStore(this.registroForm, 'fechaPago', 'setFechaPago');
  }

  getBancoData(): void {
    this.registroSolicitud
      .getBancoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.bancoCatalogo.catalogos = resp as Catalogo[];
      });
  }
  onSubmit(): void {
    if (this.registroForm.valid) {
      // Aquí se implementará la lógica para manejar el envío del formulario.
    }
  }
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31803Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      banco: [this.solicitudState?.banco, [Validators.required]],
      llave: [this.solicitudState?.llave, [Validators.required]],
      manifiesto1: [this.solicitudState?.manifiesto1, [Validators.required]],
      manifiesto2: [this.solicitudState?.manifiesto2, [Validators.required]],
      numeroOperacion: [
        this.solicitudState?.numeroOperacion,
        [Validators.required],
      ],
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
