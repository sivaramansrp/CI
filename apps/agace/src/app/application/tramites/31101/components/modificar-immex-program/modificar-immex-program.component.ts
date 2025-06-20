import { Catalogo, ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosGeneralesDeLaSolicitudCatologo } from '../../models/solicitud.model';
import { DatosGeneralesDeLaSolicitudRadioLista } from '../../models/solicitud.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { Solicitud31101State } from '../../estados/solicitud31101.store';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para modificar el programa IMMEX.
 */
@Component({
  selector: 'app-modificar-immex-program',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputRadioComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './modificar-immex-program.component.html',
  styleUrl: './modificar-immex-program.component.scss',
})
/**
 *  Componente para modificar el programa IMMEX.
 */
export class ModificarImmexProgramComponent implements OnInit, OnDestroy {
  /**
   *  Formulario reactivo para modificar el programa IMMEX.
   */
  modificarImmexProgramForm!: FormGroup;

  /**
   *  Opciones de radio para selección de sí o no.
   */
  sinoOpcion: InputRadio = {} as InputRadio;

  /**
   *  Observable para gestionar la destrucción del componente.
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   *  Catálogo de tipos de instalación.
   */
  tipoDeInstalacion: CatalogosSelect = {} as CatalogosSelect;

  /**
   *  Evento de salida para modificar el valor del programa IMMEX.
   */
  @Output() modificarImmexValor = new EventEmitter<boolean>();

  solicitud31101State: Solicitud31101State = {} as Solicitud31101State;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   *  Constructor del componente.
   * @param {FormBuilder} fb - Servicio de construcción de formularios reactivos.
   * @param {SolicitudService} solicitudService - Servicio de solicitud de datos.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31101Store: Solicitud31101Store, // /** Estado de la solicitud */
    public solicitud31101Query: Solicitud31101Query, // /** Consultas sobre la solicitud */
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.conseguirDatosGeneralesOpcionDeRadio();
    this.conseguirDatosGeneralesCatologo();
  }

  /**
   *  Inicializa el formulario al montar el componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.modificarImmexProgramForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.modificarImmexProgramForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  inicializarFormulario(): void {
    this.modificarImmexProgramForm = this.fb.group({
      instalacionesPrincipales: [
        this.solicitud31101State.instalacionesPrincipales,
        [Validators.required],
      ],
      municipio: [this.solicitud31101State.municipio, [Validators.required]],
      tipoDeInstalacion: [
        this.solicitud31101State.tipoDeInstalacion,
        [Validators.required],
      ],
      federativa: [this.solicitud31101State.federativa, [Validators.required]],
      registroSE: [this.solicitud31101State.registroSE, [Validators.required]],
      desceripe: [this.solicitud31101State.desceripe, [Validators.required]],
      codigoPostal: [
        this.solicitud31101State.codigoPostal,
        [Validators.required, Validators.maxLength(5)],
      ],
      procesoProductivo: [
        this.solicitud31101State.procesoProductivo,
        [Validators.required],
      ],
    });

    this.solicitud31101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31101State) => {
          this.solicitud31101State = respuesta;
          this.modificarImmexProgramForm.patchValue({
            instalacionesPrincipales:
              this.solicitud31101State.instalacionesPrincipales,
            municipio: this.solicitud31101State.municipio,
            tipoDeInstalacion: this.solicitud31101State.tipoDeInstalacion,
            federativa: this.solicitud31101State.federativa,
            registroSE: this.solicitud31101State.registroSE,
            desceripe: this.solicitud31101State.desceripe,
            codigoPostal: this.solicitud31101State.codigoPostal,
            procesoProductivo: this.solicitud31101State.procesoProductivo,
          });
        })
      )
      .subscribe();
  }
  /**
   *  Obtiene los datos generales de las opciones de radio.
   */
  conseguirDatosGeneralesOpcionDeRadio(): void {
    this.solicitudService
      .conseguirDatosGeneralesOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
   *  Obtiene los datos generales del catálogo.
   */
  conseguirDatosGeneralesCatologo(): void {
    this.solicitudService
      .conseguirDatosGeneralesCatologo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudCatologo) => {
          this.tipoDeInstalacion = respuesta.tipoDeInstalacion;
        },
      });
  }

  /**
   *  Acepta y emite el evento para modificar el programa IMMEX.
   */
  aceptarImmexProgram(): void {
    this.modificarImmexValor.emit(true);
  }

  /**
   * Verifica si un campo del formulario no es válido.
   * @param id Identificador del campo en el formulario.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario undefined.
   */
  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.modificarImmexProgramForm.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /** Actualiza el valor de las instalaciones principales */
  actualizarInstalacionesPrincipales(valor: string | number): void {
    this.solicitud31101Store.actualizarInstalacionesPrincipales(valor);
  }

  /** Obtiene el valor del evento y actualiza el municipio */
  actualizarMunicipio(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarMunicipio(VALOR);
  }

  /** Usa el ID del catálogo para actualizar el tipo de instalación */
  actualizarTipoDeInstalacion(valor: Catalogo): void {
    this.solicitud31101Store.actualizarTipoDeInstalacion(valor.id);
  }

  /** Extrae el valor del evento y actualiza la entidad federativa */
  actualizarFederativa(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarFederativa(VALOR);
  }

  /** Obtiene el valor del evento y actualiza el número de registro SE */
  actualizarRegistroSE(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarRegistroSE(VALOR);
  }

  /** Extrae el valor del evento y actualiza la descripción */
  actualizarDesceripe(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarDesceripe(VALOR);
  }

  /** Obtiene el valor del evento y actualiza el código postal */
  actualizarCodigoPostal(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarCodigoPostal(VALOR);
  }

  /** Modifica el proceso productivo con el nuevo valor proporcionado */
  actualizarProcesoProductivo(valor: string | number): void {
    this.solicitud31101Store.actualizarProcesoProductivo(valor);
  }

  /**
   *  Se ejecuta al destruir el componente, limpiando los observables.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
