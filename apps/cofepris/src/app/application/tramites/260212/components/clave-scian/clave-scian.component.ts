import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoResponse, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent, } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';

import { Observable, Subject } from 'rxjs';
import { Tramite260212Store } from '../../estados/tramite260212.store';

import { Tramite260212Query } from '../../estados/tramite260212.query';

/**
 * Componente ClaveScian
 * Este componente es responsable de gestionar el formulario ClaveScian.
 */
@Component({
  selector: 'app-clave-scian',
  standalone: true,
  imports: [CommonModule,
    TablaDinamicaComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule],
  templateUrl: './clave-scian.component.html',
  styleUrl: './clave-scian.component.scss',
})
export class ClaveScianComponent implements OnInit, OnDestroy {
  /**
   * Reactive form group managing the "Clave Scian" form fields.
   */
  claveForm!: FormGroup;

  /**
   * Subject used for cleaning up component resources when destroyed.
   */
  private destroy$ = new Subject<void>();

  /**
   * Observable for the currently selected "clave" (key) value from the store.
   */
  selectedClave$: Observable<CatalogoResponse | null> =
    this.tramite260212Query.selectedClave$;

  /**
   * Observable for the currently selected "descripcion" (description) value from the store.
   */
  selectedDescripcion$: Observable<CatalogoResponse | null> =
    this.tramite260212Query.selectedDescripcion$;

  /**
   * EventEmitter to emit a cancel action. This can be handled by parent components.
   */
  @Output() cancel = new EventEmitter<void>();

  /**
   * Array to store the list of "clave" options fetched from the service.
   */
  clave: CatalogoResponse[] = [];

  /**
   * Constructor to initialize dependencies and services.
   * @param fb Instance of FormBuilder to manage reactive forms.
   * @param solicitudService Service to interact with catalog data.
   * @param tramite260212Store Store for managing the state of Tramite260212.
   * @param tramite260212Query Query for retrieving state from Tramite260212.
   */
  constructor(private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private tramite260212Store: Tramite260212Store,
    // eslint-disable-next-line no-empty-function
    private tramite260212Query: Tramite260212Query) { }

  /**
   * Angular lifecycle hook invoked on component initialization.
   * Sets up the form, loads initial data, and subscribes to state updates.
   */
  ngOnInit(): void {
    this.claveScianForm();

    this.solicitudService.getClave().subscribe((data) => {
      this.clave = data;
    });

    this.selectedClave$.subscribe((selectedClave) => {
      if (selectedClave) {
        this.claveForm.get('clave')?.setValue(selectedClave);
      }
    });

    this.selectedDescripcion$.subscribe((selectedDescripcion) => {
      if (selectedDescripcion) {
        this.claveForm.get('descripcion')?.setValue(selectedDescripcion);
      }
    });
  }

  /**
   * Configures the reactive form with "clave" and "descripcion" fields.
   */
  claveScianForm(): void {
    this.claveForm = this.fb.group({
      clave: ['', Validators.required],
      descripcion: ['']
    });
  }

  /**
   * Emits the cancel event to notify parent components about the action.
   */
  cancelar(): void {
    this.cancel.emit();
  }

  /**
   * Updates the selected "clave" in the store based on form value.
   */
  getMunicipios(): void {
    const SELECTED_CLAVE = this.claveForm.get('clave')?.value;
    this.tramite260212Store.setClave(SELECTED_CLAVE);
  }

  /**
   * Angular lifecycle hook invoked when the component is destroyed.
   * Cleans up any subscriptions or resources associated with the component.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
