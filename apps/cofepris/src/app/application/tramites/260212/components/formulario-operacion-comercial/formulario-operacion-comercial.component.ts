import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  catalogoResponse, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';

/**
 * Componente FormularioOperacionComercialComponent
 * Este componente gestiona el formulario relacionado con la operación comercial.
 * Incluye la inicialización del formulario, validaciones y lógica para alternar estados de solo lectura.
 */
@Component({
  selector: 'app-formulario-operacion-comercial',
  standalone: true,
  imports: [CommonModule, 
    CatalogoSelectComponent
  ],
  templateUrl: './formulario-operacion-comercial.component.html',
  styleUrl: './formulario-operacion-comercial.component.scss',
})
export class FormularioOperacionComercialComponent implements OnInit {
    /**
   * Arreglo que almacena las claves del catálogo.
   */
  clave: catalogoResponse[] = [];

 /**
   * Variable que controla si los campos del formulario están en estado de solo lectura.
   */
  isReadonly = true;

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
  constructor(private fb: FormBuilder, private solicitudService: SolicitudService) { }

    /**
   * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
   * - Inicializa el formulario.
   * - Recupera las claves del catálogo mediante el servicio.
   */
  ngOnInit(): void {

    this.formularioOperacionInitial()

    this.solicitudService.getclave().subscribe((data) => {
      this.clave = data;
    }
    );
  }

  /**
   * Inicializa el formulario `formularioOperacionForm` con campos y sus validaciones requeridas.
   */
  formularioOperacionInitial() {
    this.formularioOperacionForm = this.fb.group({
      noLicenciaSanitaria: [''],
      regimen: ['', Validators.required],

    })
  }

  /**
   * Cambia el estado de solo lectura del formulario según el estado del checkbox.
   * @param event Evento que activa el cambio de estado.
   */
  toggleReadonly(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.isReadonly = !checkbox.checked;
  }
}
