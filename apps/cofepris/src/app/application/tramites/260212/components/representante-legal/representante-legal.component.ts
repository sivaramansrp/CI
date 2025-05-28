import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputRadioComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { OpcionesPublicacion } from '../../models/permiso-maquila.models';
import { SolicitudService } from '../../services/solicitud.service';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { map,takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription} from 'rxjs';

/**
 * Componente RepresentanteLegalComponent
 * Este componente gestiona el formulario de datos del representante legal.
 * Incluye validaciones, funcionalidad para verificar campos, y manejo de opciones dinámicas.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    InputRadioComponent
  ],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy {

   esFormularioSoloLectura: boolean = true;
    private subscription: Subscription = new Subscription();
    private destroy$ = new Subject<void>();

  /**
   * Formulario reactivo para los datos del representante legal.
   */
  personaForm!: FormGroup;

  /**
 * Arreglo que almacena las opciones dinámicas obtenidas desde un archivo JSON.
 */
  losDatos: OpcionesPublicacion[] = [];

  /**
 * Valor seleccionado en los radios de opciones, con un valor predeterminado.
 */
  valorSeleccionado = 'option1'

  /**
   * Constructor de la clase RepresentanteLegalComponent.
   * 
   * @param http - Cliente HTTP para realizar solicitudes HTTP.
   * @param fb - Constructor de formularios reactivos.
   * @param validacionesService - Servicio para validaciones personalizadas de formularios.
   */
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService, private solicitudService: SolicitudService,
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
   * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
   * - Configura el formulario `personaForm`.
   * - Obtiene las opciones dinámicas para los radios desde un archivo JSON.
   */
  ngOnInit():void {
    this.obtenerOpcionesSolicitud()
//  this.personaForm = this.fb.group({
//       rfc: ['', Validators.required],
//       nombre: [{ value: '', disabled: true }],
//       primerApellido: [{ value: '', disabled: true }],
//       segundoApellido: [{ value: '', disabled: true }],

    // });
    
  this.actualizarEstado()
;}

  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      // Solo llamar a guardarDatosFormulario si el formulario ya está inicializado
      if (this.personaForm) {
        this.guardarDatosFormulario();
      }
    } else {
      this.actualizarEstado();
    }  
  }

  guardarDatosFormulario(): void {
    this.actualizarEstado();
    // Solo intentar deshabilitar si el formulario ya está inicializado
    if (this.personaForm) {
      if (this.esFormularioSoloLectura) {
        this.personaForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.personaForm.enable();
      }
    }
  }

actualizarEstado(): void {
this.personaForm = this.fb.group({
      rfc: ['', Validators.required],
      nombre: [{ value: '', disabled: true }],
      primerApellido: [{ value: '', disabled: true }],
      segundoApellido: [{ value: '', disabled: true }],
    });
  }

  /**
   * Verifica si un campo específico del formulario es válido.
   * @param field Nombre del campo del formulario a validar.
   * @returns `true` si el campo es válido; de lo contrario, `false`.
   */
  esValido(field: string) {
    return this.validacionesService.isValid(this.personaForm, field);
  }
  /**
 * Obtiene las opciones dinámicas para los radios desde un archivo JSON y las almacena en `losDatos`.
 * Utiliza una petición HTTP para leer el archivo local.
 */
  obtenerOpcionesSolicitud():void {
    this.solicitudService.getOpcionesPublicacion().subscribe((data) => {
      this.losDatos = data;
    });
  }
 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }

}
