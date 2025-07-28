import { ANO_CATALOGO, FECHA_FIN, RADIO_OPCIONS } from '../models/registro.model';
import { Catalogo, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, SharedModule, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud120403State, Tramite120403Store } from '../state/Tramite120403.store';
import { CommonModule } from '@angular/common';
import { CuposService } from '../services/cupos.service';
import { Tramite120403Query } from '../state/Tramite120403.query';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [CommonModule, InputRadioComponent, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule, SharedModule, InputFechaComponent],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.scss',
})
export class AsignacionComponent implements OnInit, OnDestroy {
  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;
  /**
   * Formulario reactivo para la asignación.
   */
  asignacionForm!: FormGroup;

  /**
   * Opciones de radio para el formulario.
   */
  radioOpcions = RADIO_OPCIONS;

  /**
   * Valor seleccionado en las opciones de radio.
   */
  valorSeleccionado: string = '';

  /**
   * Catálogo de años para el formulario.
   */
  public anoCatalogo = ANO_CATALOGO;

  /**
   * Configuración de la fecha de fin.
   */
  fechaFinInput = FECHA_FIN;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud120403State;

  /**
   * Sujeto para manejar la destrucción de observables.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Indica si se debe mostrar la sección de vigencia.
   */
  mostrarVigencia: boolean = false;

  /**
   * Indica si se debe mostrar la sección de monto.
   */
  mostrarMonto: boolean = false;

  /**
   * Constructor del componente.
   * @param cupos Servicio para obtener datos relacionados con los cupos.
   * @param fb Constructor de formularios reactivos.
   * @param store Almacén para manejar el estado global.
   * @param query Consulta para obtener el estado de la solicitud.
   * @param validacionesService Servicio para validar formularios.
   */
  constructor(
    private cupos: CuposService,
    public fb: FormBuilder,
    private store: Tramite120403Store,
    private query: Tramite120403Query,
    private validacionesService: ValidacionesFormularioService,
     private consultaioQuery: ConsultaioQuery
  ) { 
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.obtenerDatosEstado();
     this.inicializarEstadoFormulario();
  }
  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.asignacionForm.disable();
    } else {
      this.asignacionForm.enable();
    }
  }
  /**
    * Método para manejar la lógica de búsqueda.
    */
  buscar(): void {
    const ASIGNACION_RADIO = this.asignacionForm.get('asignacionRadio')?.value;

    if (ASIGNACION_RADIO === 'vigencia') {
      this.mostrarVigencia = true;
      this.mostrarMonto = false;
    } else if (ASIGNACION_RADIO === 'monto') {
      this.mostrarVigencia = false;
      this.mostrarMonto = true;
    }
  }
  /**
     * Actualiza el valor de la fecha de fin en el formulario y en el estado global.
     * @param nuevo_fechaPago Nueva fecha de pago seleccionada.
     */
  cambioFechaPago(nuevo_fechaPago: string): void {
    this.asignacionForm.patchValue({
      fechaFin: nuevo_fechaPago,
    });
    this.setValoresStore(this.asignacionForm, 'fechaFin', 'setFechaFin');
  }
  /**
     * Obtiene los datos del estado relacionados con el catálogo de años.
     */
  public obtenerDatosEstado(): void {
    this.cupos
      .obtenerDatosAno()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.anoCatalogo.catalogos = resp as Catalogo[];
      });
  }
  /**
    * Valida el formulario y marca todos los campos como tocados si es inválido.
    */
  validarDestinatarioFormulario(): void {
    if (this.asignacionForm.invalid) {
      this.asignacionForm.markAllAsTouched();
    }
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo a verificar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo a actualizar.
   * @param metodoNombre Nombre del método del almacén para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite120403Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Configura el formulario con los valores iniciales del estado.
   */
  donanteDomicilio(): void {
  this.asignacionForm = this.fb.group({
    asignacionRadio: [{ value: this.solicitudState?.asignacionRadio, disabled: this.soloLectura }],
    asignacionsolitud: [{ value: this.solicitudState?.asignacionsolitud, disabled: this.soloLectura }, [Validators.required]],
    numTramite: [{ value: this.solicitudState?.numTramite, disabled: this.soloLectura }, [Validators.required]],
    fechaFin: [{ value: this.solicitudState?.fechaFin, disabled: this.soloLectura }, [Validators.required]],
    ampliar: [{ value: this.solicitudState?.ampliar, disabled: this.soloLectura }, [Validators.required]],
  });
}
  /**
 * Método que se ejecuta al destruir el componente.
 */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
