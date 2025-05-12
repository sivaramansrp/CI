import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputRadioComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { OpcionesPublicacion } from '../../models/permiso-maquila.models';
import { SolicitudService } from '../../services/solicitud.service';

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
export class RepresentanteLegalComponent implements OnInit {

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
    private validacionesService: ValidacionesFormularioService, private solicitudService: SolicitudService) { }

  /**
   * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
   * - Configura el formulario `personaForm`.
   * - Obtiene las opciones dinámicas para los radios desde un archivo JSON.
   */
  ngOnInit():void {
    this.obtenerOpcionesSolicitud()
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


}
