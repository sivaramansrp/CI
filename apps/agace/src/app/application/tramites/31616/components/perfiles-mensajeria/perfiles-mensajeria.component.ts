/**
 * @fileoverview Componente principal para gestionar la sección de perfiles de mensajería
 * del trámite 31616. Administra la visibilidad de múltiples secciones temáticas relacionadas
 * a los perfiles de seguridad, logística y procesos de una empresa.
 *
 * Este archivo contiene toda la lógica para inicializar el formulario y controlar
 * la interfaz de usuario a través de banderas booleanas.
 */
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Componentes hijos que forman las distintas secciones del formulario
import { CapacitacionSeguridadComponent } from '../capacitacion-seguridad/capacitacion-seguridad.component';
import { ControlesFisicoComponent } from '../controles-fisico/controles-fisico.component';
import { GestionAduaneraComponent } from '../gestion-aduanera/gestion-aduanera.component';
import { ManejoInvestigacionComponent } from '../manejo-investigacion/manejo-investigacion.component';
import { ProfilesDomocilioDelaComponent } from '../profiles-domocilio-dela/profiles-domocilio-dela.component';
import { SeguridadFisicaComponent } from '../seguridad-fisica/seguridad-fisica.component';
import { SeguridadInformacionDocumentacionComponent } from '../seguridad-informacion-documentacion/seguridad-informacion-documentacion.component';
import { SeguridadLosVehiculosComponent } from '../seguridad-los-vehiculos/seguridad-los-vehiculos.component';
import { SeguridadPersonalComponent } from '../seguridad-personal/seguridad-personal.component';
import { SeguridadProcesosComponent } from '../seguridad-procesos/seguridad-procesos.component';
import { SociosComercialesComponent } from '../socios-comerciales/socios-comerciales.component';

/**
 * Componente principal para la sección de perfiles de mensajería del trámite 31616.
 *
 * Este componente se encarga de centralizar la lógica y visibilidad de las distintas
 * secciones del formulario relacionadas al perfil de la empresa.
 *
 * @export
 * @class PerfilesMensajeriaComponent
 */
@Component({
  selector: 'app-perfiles-mensajeria',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfilesDomocilioDelaComponent,
    SeguridadFisicaComponent,
    ControlesFisicoComponent,
    SociosComercialesComponent,
    SeguridadProcesosComponent,
    GestionAduaneraComponent,
    SeguridadLosVehiculosComponent,
    SeguridadPersonalComponent,
    SeguridadInformacionDocumentacionComponent,
    CapacitacionSeguridadComponent,
    ManejoInvestigacionComponent
  ],
  templateUrl: './perfiles-mensajeria.component.html',
  styleUrls: ['./perfiles-mensajeria.component.css'],
})
export class PerfilesMensajeriaComponent {

  /**
   * Formulario reactivo que agrupa los campos principales del perfil de mensajería.
   * 
   * @type {FormGroup}
   * @memberof PerfilesMensajeriaComponent
   */
  profileForm!: FormGroup;

    /**
   * Indica si se debe mostrar la sección de contenido general.
   * @type {boolean}
   * @public
   */
    public mostrarContenido = false;

    /**
     * Indica si se debe mostrar la sección de seguridad física.
     * @type {boolean}
     * @public
     */
    public mostrarSeguridad = false;
  
    /**
     * Indica si se debe mostrar la sección de controles de acceso físico.
     * @type {boolean}
     * @public
     */
    public mostrarAccesoFisico = false;
  
    /**
     * Indica si se debe mostrar la sección de socios comerciales.
     * @type {boolean}
     * @public
     */
    public mostrarSociosComeciales = false;
  
    /**
     * Indica si se debe mostrar la sección de seguridad en los procesos.
     * @type {boolean}
     * @public
     */
    public mostrarSeguridadProcesos = false;
  
    /**
     * Indica si se debe mostrar la sección de gestión aduanera.
     * @type {boolean}
     * @public
     */
    public mostrarGestionAduanera = false;
  
    /**
     * Indica si se debe mostrar la sección de seguridad en los vehículos.
     * @type {boolean}
     * @public
     */
    public mostrarSeguridadVehiculos = false;
  
    /**
     * Indica si se debe mostrar la sección de seguridad del personal.
     * @type {boolean}
     * @public
     */
    public mostrarSeguridadPersonal = false;
  
    /**
     * Indica si se debe mostrar la sección de seguridad de la información y documentación.
     * @type {boolean}
     * @public
     */
    public mostrarSeguridadInformacion = false;
  
    /**
     * Indica si se debe mostrar la sección de capacitación en seguridad.
     * @type {boolean}
     * @public
     */
    public mostrarCapacitacionSeguridad = false;
  
    /**
     * Indica si se debe mostrar la sección de manejo e investigación de incidentes.
     * @type {boolean}
     * @public
     */
    public mostrarManejoInvestigacion = false;  

  /**
   * Indica si se permite agregar secciones adicionales.
   * 
   * @type {boolean}
   * @memberof PerfilesMensajeriaComponent
   */
  public hasAgregar = false;

  /**
   * Crea una instancia de PerfilesMensajeriaComponent.
   * 
   * Inicializa el formulario `profileForm` con los campos requeridos.
   *
   * @param {FormBuilder} fb Inyección del servicio FormBuilder para construir el formulario.
   * @memberof PerfilesMensajeriaComponent
   */
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      domicilio: new FormControl(''),
      antiguedad: new FormControl(''),
      productos: new FormControl(''),
      embarquesExp: new FormControl(''),
      embarquesImp: new FormControl(''),
      empleados: new FormControl(''),
      superficie: new FormControl(''),
      nombre: new FormControl(''),
      categoria: new FormControl(''),
      vigencia: new FormControl(''),
      nombre2: new FormControl(''),
      categoria2: new FormControl(''),
      vigencia2: new FormControl(''),
      nombre3: new FormControl(''),
      categoria3: new FormControl(''),
      vigencia3: new FormControl(''),
    });
  }

  /**
   * Alterna la visibilidad de la sección "Contenido general".
   */
  alternarContenido(): void {
    this.mostrarContenido = !this.mostrarContenido;
  }

  /**
   * Alterna la visibilidad de la sección "Seguridad física".
   */
  alternarSeguridad(): void {
    this.mostrarSeguridad = !this.mostrarSeguridad;
  }

  /**
   * Alterna la visibilidad de la sección "Acceso físico".
   */
  alternarAccesoFisico(): void {
    this.mostrarAccesoFisico = !this.mostrarAccesoFisico;
  }

  /**
   * Alterna la visibilidad de la sección "Socios comerciales".
   */
  alternarSociosComerciales(): void {
    this.mostrarSociosComeciales = !this.mostrarSociosComeciales;
  }

  /**
   * Alterna la visibilidad de la sección "Seguridad en procesos".
   */
  alternarSeguridadProcesos(): void {
    this.mostrarSeguridadProcesos = !this.mostrarSeguridadProcesos;
  }

  /**
   * Alterna la visibilidad de la sección "Gestión aduanera".
   */
  alternarGestionAduanera(): void {
    this.mostrarGestionAduanera = !this.mostrarGestionAduanera;
  }

  /**
   * Alterna la visibilidad de la sección "Seguridad en vehículos".
   */
  alternarSeguridadVehiculos(): void {
    this.mostrarSeguridadVehiculos = !this.mostrarSeguridadVehiculos;
  }

  /**
   * Alterna la visibilidad de la sección "Seguridad del personal".
   */
  alternarSeguridadPersonal(): void {
    this.mostrarSeguridadPersonal = !this.mostrarSeguridadPersonal;
  }

  /**
   * Alterna la visibilidad de la sección "Seguridad de la información".
   */
  alternarSeguridadInformacion(): void {
    this.mostrarSeguridadInformacion = !this.mostrarSeguridadInformacion;
  }

  /**
   * Alterna la visibilidad de la sección "Capacitación en seguridad".
   */
  alternarCapacitacionSeguridad(): void {
    this.mostrarCapacitacionSeguridad = !this.mostrarCapacitacionSeguridad;
  }

  /**
   * Alterna la visibilidad de la sección "Manejo e investigación de incidentes".
   */
  alternarManejoInvestigacion(): void {
    this.mostrarManejoInvestigacion = !this.mostrarManejoInvestigacion;
  }
}
