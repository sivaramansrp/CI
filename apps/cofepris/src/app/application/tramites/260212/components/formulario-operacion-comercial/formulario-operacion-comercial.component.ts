import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoResponse, CatalogoSelectComponent, } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';

import { Tramite260212Query } from '../../estados/tramite260212.query';

import { Observable, Subject } from 'rxjs';

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
  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  /** Observable para el estado seleccionado */
  selectedRegimen$: Observable<CatalogoResponse | null> =
    this.tramite260212Query.selectedRegimen$;
  /** Catálogo de estados cargado desde un archivo JSON */

  selectedEntradas$: Observable<CatalogoResponse | null> =
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
    private tramite260212Query: Tramite260212Query
  ) {
    // Se puede agregar lógica de inicialización aquí si es necesario
  }

  /**
 * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
 * - Inicializa el formulario.
 * - Recupera las claves del catálogo mediante el servicio.
 */
  ngOnInit(): void {

    this.formularioOperacionInitial()

    this.solicitudService.getClave().subscribe((data) => {
      this.clave = data;
    }
    );
    this.selectedRegimen$.subscribe((regimen) => {
      if (regimen) {
        this.formularioOperacionForm.get('regimen')?.setValue(regimen);
      }
    });
    this.selectedEntradas$.subscribe((entradas) => {
      if (entradas) {
        this.formularioOperacionForm.get('entradas')?.setValue(entradas);
      }
    });
  }

  /**
   * Inicializa el formulario `formularioOperacionForm` con campos y sus validaciones requeridas.
   */
  formularioOperacionInitial(): void {
    this.formularioOperacionForm = this.fb.group({
      noLicenciaSanitaria: [''],
      regimen: ['', Validators.required],
      entradas: []

    })
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

  /*
  * Método del ciclo de vida de Angular - destruye el componente
 */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
