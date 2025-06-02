import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosModificacion } from '../../models/plantas-consulta.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-modificaciones',
  templateUrl: './datos-modificaciones.component.html',
  styleUrls: ['./datos-modificaciones.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [ModificacionSolicitudeService, ToastrService],
})
export class DatosModificacionesComponent implements OnDestroy {
  /**
   * Representa el grupo de formularios para los datos generales.
   * @type {FormGroup}
   */
  formularioDatosGenerales!: FormGroup;

  /**
   * Un Subject para notificar la limpieza de observables y evitar fugas de memoria.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor del componente.
   *
   * @param {FormBuilder} fb - Servicio de Angular para construir formularios reactivos.
   * @param {ModificacionSolicitudeService} modificionService - Servicio encargado de gestionar la modificación de solicitudes.
   * @param {ToastrService} toastr - Servicio para mostrar notificaciones tipo "toast" al usuario.
   * @param {ConsultaioQuery} consultaioQuery - Servicio para observar y obtener el estado de la sección `Consultaio` del formulario.
   *
   * Este constructor configura una suscripción al observable del estado de `Consultaio`. En cada actualización del estado:
   * - Se actualiza la propiedad `esFormularioSoloLectura` para reflejar si el formulario debe estar en modo solo lectura.
   * - Se inicializa la estructura del formulario mediante `iniciarFormulario()`.
   * - Se cargan los datos necesarios mediante `cargarDatos()`.
   * - Se aplica la lógica del estado del formulario con `inicializarEstadoFormulario()`.
   *
   * La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor, para evitar fugas de memoria.
   */
  constructor(public fb: FormBuilder, public modificionService: ModificacionSolicitudeService, private toastr: ToastrService, private consultaioQuery: ConsultaioQuery){
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.iniciarFormulario();
        this.cargarDatos();
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe();
  }


  /**
   * Inicializa el formulario con los valores predeterminados y los campos deshabilitados.
   * 
   */
  iniciarFormulario(): void {
    this.formularioDatosGenerales = this.fb.group({
      rfc: [{ value: '', disabled: true }],
      representacionFederal: [{ value: '', disabled: true }],
      tipoModalidad: [{ value: '', disabled: true }],
      descripcionModalidad: [{ value: '', disabled: true }],
    });
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formularioDatosGenerales.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formularioDatosGenerales.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    }
  }

  /**
   * Carga los datos generales desde el servicio y los coloca en el formulario.
   * Maneja los errores en caso de que falle la carga de datos.
   * 
   * */
  cargarDatos(): void {
    this.modificionService
      .obtenerDatosGenerales()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: DatosModificacion) => {
          this.formularioDatosGenerales.patchValue(data);
        },
        () => {
          this.toastr.error('Error al cargar los estados');
        }
      );
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
