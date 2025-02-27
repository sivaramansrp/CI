import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { DatosModificacion } from '../../models/plantas-consulta.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-modificaciones',
  templateUrl: './datos-modificaciones.component.html',
  styleUrls: ['./datos-modificaciones.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [ModificacionSolicitudeService, ToastrService],
})
export class DatosModificacionesComponent implements OnInit, OnDestroy {
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
   * Crea una instancia de la clase.
   * @param {FormBuilder} fb - El FormBuilder de Angular utilizado para crear el formulario.
   * @param {ModificacionSolicitudeService} modificionService - Servicio para manejar las solicitudes de modificación.
   */
  constructor(
    private fb: FormBuilder,
    private modificionService: ModificacionSolicitudeService,
     private toastr: ToastrService
  ) {}

  /**
   * Inicializa el componente configurando el formulario y cargando los datos.
   * Se llama cuando el componente es inicializado.
   */
  ngOnInit(): void {
    this.iniciarFormulario();
    this.cargarDatos();
  }

  /**
   * Inicializa el formulario con los valores predeterminados y los campos deshabilitados.
   * 
   */
  private iniciarFormulario(): void {
    this.formularioDatosGenerales = this.fb.group({
      rfc: [{ value: '', disabled: true }],
      representacionFederal: [{ value: '', disabled: true }],
      tipoModalidad: [{ value: '', disabled: true }],
      descripcionModalidad: [{ value: '', disabled: true }],
    });
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
