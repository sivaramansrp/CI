import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoResponse, CatalogoSelectComponent, ConsultaioQuery, TablaDinamicaComponent, TituloComponent, } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';

import { map, takeUntil} from 'rxjs';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs';

import {Subject} from 'rxjs';
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

  esFormularioSoloLectura: boolean = true;
  private subscription: Subscription = new Subscription();
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
    private tramite260212Query: Tramite260212Query,
    private consultaioQuery: ConsultaioQuery) { 
       this.consultaioQuery.selectConsultaioState$
              .pipe(
                takeUntil(this.destroy$),
                map((seccionState)=>{
                  this.esFormularioSoloLectura = seccionState.readonly;
                  this.inicializarEstadoFormulario();
                })
              )
              .subscribe()
    }


  /**
   * Angular lifecycle hook invoked on component initialization.
   * Sets up the form, loads initial data, and subscribes to state updates.
   */
  ngOnInit(): void {
    this.claveScianForm();
    this.inicializarEstadoFormulario()
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
 inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.actualizarEstado();
    }  
  }

  guardarDatosFormulario(): void {
    this.actualizarEstado();
      if (this.esFormularioSoloLectura) {
        this.claveForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.claveForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }

   actualizarEstado(): void {
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
