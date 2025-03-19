import { CatalogoSelectComponent,TituloComponent,ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Query } from '../../state/Tramite110201.query';


@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.css',
})
export class DestinatarioComponent implements OnInit, OnDestroy {
  registroForm!: FormGroup;
  nacion!: CatalogosSelect;
  transporte!: CatalogosSelect;
  private subscriptions: Subscription[] = [];
  public solicitudState!: Solicitud110201State;
  public destroyNotifier$: Subject<void> = new Subject();
  getPaisDestinoSubscription!: Subscription;
  getTransporteSubscription!: Subscription;
  isDisabled : boolean = false;
  isEmpty : boolean = false;

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

  onClick(){
    this.isDisabled = true;
  }
  ngOnInit(): void {
    this.getPaisDestino();
    this.getTransporte();

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
      this.query.selectNacion$.subscribe((nacion) => {
        this.nacion = {
          labelNombre: 'País destino',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: nacion ?? [],
        };
      })
    );

    this.subscriptions.push(
      this.query.selectTransporte$.subscribe((transporte) => {
        this.transporte = {
          labelNombre: 'Medio de transporte',
          required: false,
          primerOpcion: 'Selecciona un valor',
          catalogos: transporte ?? [],
        };
      })
    );
  }

  getPaisDestino(): void {
    this.getPaisDestinoSubscription = this.registroService
      .getPaisDestino()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setNacion(RESPONSE);
        }
      });
  }

  getTransporte(): void {
    this.getTransporteSubscription = this.registroService
      .getTransporte()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setTransporte(RESPONSE);
        }
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
        nacion: [this.solicitudState?.nacion, [Validators.required]],
        transporte: [this.solicitudState?.transporte, [Validators.required]],
        nombre: [this.solicitudState?.nombre, [Validators.required]],
        apellidoPrimer: [
          this.solicitudState?.apellidoPrimer,
          [Validators.required],
        ],
        apellidoSegundo: [
          this.solicitudState?.apellidoSegundo,
          [Validators.required],
        ],
        numeroFiscal: [
          this.solicitudState?.numeroFiscal,
          [Validators.required],
        ],
        razonSocial: [this.solicitudState?.razonSocial, [Validators.required]],
        ciudad: [this.solicitudState?.ciudad, [Validators.required]],
        calle: [this.solicitudState?.calle, [Validators.required]],
        numeroLetra: [this.solicitudState?.numeroLetra, [Validators.required]],
        lada: [this.solicitudState?.lada, [Validators.required]],
        telefono: [this.solicitudState?.telefono, [Validators.required]],
        fax: [this.solicitudState?.fax, [Validators.required, ]],
        correoElectronico: [
          this.solicitudState?.correoElectronico,
          [Validators.required],
        ],
      }),
    });
  }
  ngOnDestroy(): void {
    if (this.getPaisDestinoSubscription) {
      this.getPaisDestinoSubscription.unsubscribe();
    }
    if (this.getTransporteSubscription) {
      this.getTransporteSubscription.unsubscribe();
    }
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
