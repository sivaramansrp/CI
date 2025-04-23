import {
  AlertComponent,
  InputCheckComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CommonModule } from '@angular/common';
import { TipoDevAviso } from '../../models/avisomodify.model';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';

/**
 * Componente para manejar los tipos de aviso en el formulario de modificación.
 * Este componente contiene un formulario reactivo para capturar diversas opciones
 * relacionadas con la modalidad de certificación y otros aspectos del trámite.
 */
@Component({
  selector: 'app-tipo-de-aviso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    InputCheckComponent,
  ],
  templateUrl: './tipoDeAviso.component.html',
})
export class TipoDeAvisoComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para gestionar los tipos de aviso */
  miFormulario!: FormGroup;

  /** Objeto que contiene los datos del tipo de aviso */
  tipoDevAviso!: TipoDevAviso;

  /** EventEmitter para emitir los datos del formulario cuando se envíen */
  @Output() tabEnabledData = new EventEmitter<TipoDevAviso>();

  /** Variable para habilitar o deshabilitar el formulario */
  isDisabled: boolean = false;

  /** Modalidad de certificación */
  modalidadCertificacion!: TipoDevAviso;

  /** Sujeto para manejar el ciclo de vida de los observables */
  private destroy$: Subject<void> = new Subject<void>();
  /**
   * Suscripción para obtener y gestionar modificaciones de avisos dentro del sistema.
   */
  public getAvisoModifySubscription!: Subscription;

  /**
   * Constructor del componente, inyecta las dependencias necesarias
   * @param fb - FormBuilder para crear formularios reactivos
   * @param AvisoModifyService - Servicio para obtener información sobre el aviso
   * @param store - Store para gestionar el estado global del trámite
   * @param Tramite32301Query - Query para obtener el estado actual del trámite
   */
  constructor(
    private fb: FormBuilder,
    private AvisoModifyService: AvisoModifyService,
    private store: Tramite32301Store,
    private Tramite32301Query: Tramite32301Query
  ) {
    this.crearFormMiFormulario();
  }

  /**
   * Inicializa el componente, suscribe a los cambios en el estado global
   * y actualiza el formulario con los datos recibidos.
   */
  ngOnInit(): void {
    this.inicializamiFormulario();
    this.Tramite32301Query.select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.tipoDevAviso = state as unknown as TipoDevAviso;
        this.crearFormMiFormulario();
      });
  }

  /**
   * Inicializa los datos del formulario con la información del servicio de aviso.
   * Establece la modalidad de certificación en el store.
   */
  inicializamiFormulario(): void {
    this.getAvisoModifySubscription = this.AvisoModifyService.getAvisoModify()
      .pipe(
        map((resp) => {
          this.store.setModalidadCertificacion(resp.descripcion);
        })
      )
      .subscribe();
  }

  /**
   * Crea el formulario reactivo para el tipo de aviso con valores predefinidos.
   */
  crearFormMiFormulario(): void {
    this.miFormulario = this.fb.group({
      modalidadCertificacion: [
        { value: this.tipoDevAviso?.modalidadCertificacion, disabled: true },
      ],
      foreignClientsSuppliers: [this.tipoDevAviso?.foreignClientsSuppliers],
      nationalSuppliers: [this.tipoDevAviso?.nationalSuppliers],
      modificationsMembers: [this.tipoDevAviso?.modificationsMembers],
      changesToLegalDocuments: [this.tipoDevAviso?.changesToLegalDocuments],
      mergerOrSplitNotice: [this.tipoDevAviso?.mergerOrSplitNotice],
      additionFractions: [this.tipoDevAviso?.additionFractions],
      acepto253: [this.tipoDevAviso?.acepto253, Validators.required],
    });
  }

  /**
   * Emite los valores del formulario cuando el usuario lo envía.
   */
  onSubmit(): void {
    this.tabEnabledData.emit(this.miFormulario.value);
  }

  /**
   * Actualiza el store con el valor seleccionado de los proveedores extranjeros.
   */
  setforeignClientsSuppliers(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get(
      'foreignClientsSuppliers'
    )?.value;
    this.store.setforeignClientsSuppliers(FRACCION_ARANCELATIA);
  }

  /**
   * Actualiza el store con el valor seleccionado de los proveedores nacionales.
   */
  setNationalSuppliers(): void {
    const FRACCION_ARANCELATIA =
      this.miFormulario.get('nationalSuppliers')?.value;
    this.store.setNationalSuppliers(FRACCION_ARANCELATIA);
  }

  /**
   * Actualiza el store con el valor seleccionado de las modificaciones de miembros.
   */
  setModificationsMembers(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get(
      'modificationsMembers'
    )?.value;
    this.store.setModificationsMembers(FRACCION_ARANCELATIA);
  }

  /**
   * Actualiza el store con el valor seleccionado de los cambios en los documentos legales.
   */
  setChangesToLegalDocuments(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get(
      'changesToLegalDocuments'
    )?.value;
    this.store.setChangesToLegalDocuments(FRACCION_ARANCELATIA);
  }

  /**
   * Actualiza el store con el valor seleccionado sobre la notificación de fusión o escisión.
   */
  setMergerOrSplitNotice(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get(
      'mergerOrSplitNotice'
    )?.value;
    this.store.setMergerOrSplitNotice(FRACCION_ARANCELATIA);
  }

  /**
   * Actualiza el store con el valor seleccionado de las fracciones adicionales.
   */
  setAdditionFractions(): void {
    const FRACCION_ARANCELATIA =
      this.miFormulario.get('additionFractions')?.value;
    this.store.setAdditionFractions(FRACCION_ARANCELATIA);
  }

  /**
   * Actualiza el store con el valor del checkbox de aceptación del 253.
   */
  setAcepto253(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get('acepto253')?.value;
    this.store.setAcepto253(FRACCION_ARANCELATIA);
  }

  /**
   * Maneja la emisión de valores del formulario cuando se realiza alguna acción.
   */
  handleValores(): void {
    this.tabEnabledData.emit();
  }

  /**
   * Se llama cuando el componente es destruido para limpiar los recursos.
   */
  ngOnDestroy(): void {
    /**
     * Notifica a los observadores que el flujo de datos se va a destruir.
     */
    this.destroy$.next();

    /**
     * Completa el flujo de datos, asegurando que no se envíen más valores.
     */
    this.destroy$.complete();

    /**
     * Cancela la suscripción a la información de modificaciones de avisos si está activa.
     */
    if (this.getAvisoModifySubscription) {
      this.getAvisoModifySubscription.unsubscribe();
    }
  }
}
