import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoResponse, CatalogoSelectComponent, } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';

import { Tramite260212Query } from '../../estados/tramite260212.query';

import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
/**
 * Componente FormularioOperacionComercialComponent
 * Este componente gestiona el formulario relacionado con la operación comercial.
 * Incluye la inicialización del formulario, validaciones y lógica para alternar estados de solo lectura.
 */
@Component({
  selector: 'app-formulario-operacion-comercial',
  standalone: true,
  imports: [CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './formulario-operacion-comercial.component.html',
  styleUrl: './formulario-operacion-comercial.component.scss',
})
export class FormularioOperacionComercialComponent implements OnInit, OnDestroy {

  esFormularioSoloLectura: boolean = true;
  private subscription: Subscription = new Subscription();

  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  /** Observable para el estado seleccionado */
  selectedRegimen$: Observable<string> =
    this.tramite260212Query.selectedRegimen$;
  /** Catálogo de estados cargado desde un archivo JSON */

  selectedEntradas$: Observable<string> =
    this.tramite260212Query.selectedEntradas$;
  /**
 * Arreglo que almacena las claves del catálogo.
 */
  clave: CatalogoResponse[] = [];

  /**
    * Variable que controla si los campos del formulario están en estado de solo lectura.
    */
  esSoloLectura = true;

  /**
 * Formulario reactivo para gestionar los datos de operación comercial.
 */
  formularioOperacionForm!: FormGroup

  /**
   * Constructor de la clase FormularioOperacionComercialComponent.
   * 
   * @param fb - Una instancia de FormBuilder para manejar la creación de formularios reactivos.
   * @param solicitudService - Servicio para manejar las solicitudes relacionadas con la operación comercial.
   */

  constructor(private fb: FormBuilder, private solicitudService: SolicitudService,
    private tramite260212Store: Tramite260212Store,
    private tramite260212Query: Tramite260212Query,
    private consultaioQuery: ConsultaioQuery
  ) {
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
 * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
 * - Inicializa el formulario.
 * - Recupera las claves del catálogo mediante el servicio.
 */
  ngOnInit(): void {
this.formularioOperacionInitial();
this. inicializarEstadoFormulario();
}

  /**
   * Inicializa el formulario de operación comercial con los campos requeridos y sus validaciones.
   * @returns {void}
   */
  formularioOperacionInitial(): void {
    this.formularioOperacionForm = this.fb.group({
      noLicenciaSanitaria: [''],
      regimen: ['', Validators.required],
      entradas: []

    })
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * Si está en modo solo lectura, deshabilita el formulario; si no, lo habilita y actualiza los valores.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (!this.formularioOperacionForm) {
      return;
    }
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.actualizarEstado();
    }  
  }

  /**
   * Aplica el modo solo lectura o edición al formulario según corresponda.
   * También actualiza los valores del formulario desde el store.
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    if (!this.formularioOperacionForm) {
     return;
    }
    this.actualizarEstado();
    if (this.esFormularioSoloLectura) {
      this.formularioOperacionForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formularioOperacionForm.enable();
    }
  }

  /**
   * Actualiza los valores del formulario a partir del store y servicios.
   * Sincroniza los campos 'regimen' y 'entradas' con el estado global.
   * @returns {void}
   */
  actualizarEstado(): void {
this.solicitudService.getClave().subscribe((data) => {
      this.clave = data;
    }
    );
    this.selectedRegimen$.subscribe((regimen) => {
      if (regimen) {
        this.formularioOperacionForm.get('regimen')?.setValue(regimen);
      } else {
        this.formularioOperacionForm.get('regimen')?.setValue('');
      }
    });
    this.selectedEntradas$.subscribe((entradas) => {
      if (entradas) {
        this.formularioOperacionForm.get('entradas')?.setValue(entradas);
      } else {
        this.formularioOperacionForm.get('entradas')?.setValue('');
      }
    });
  }

  /**
   * Cambia el estado de solo lectura del formulario según el estado del checkbox.
   * @param event Evento que activa el cambio de estado.
   */
  alternarSoloLectura(event: Event): void {
    const CHECK_BOX = event.target as HTMLInputElement;
    this.esSoloLectura = !CHECK_BOX.checked;
  }

  /**
   * Actualiza el régimen en el store.
   */
  updateRegimen(): void {
    const REGIMEN = this.formularioOperacionForm.get('regimen')?.value;
    this.tramite260212Store.setRegimen(REGIMEN);
  }

  /**
   * Actualiza el entradas en el store.
   */
  updateEntradas(): void {
    const ENTRADAS = this.formularioOperacionForm.get('entradas')?.value;
    this.tramite260212Store.setEntradas(ENTRADAS);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Libera recursos y cancela suscripciones.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Getter para los controles del formulario (para pruebas).
   */
  get formControls(): { [key: string]: import("@angular/forms").AbstractControl } | undefined {
    return this.formularioOperacionForm?.controls;
  }

  /**
   * Expose clave for testing.
   */
  getClaveCatalog(): CatalogoResponse[] {
    return this.clave;
  }
}
