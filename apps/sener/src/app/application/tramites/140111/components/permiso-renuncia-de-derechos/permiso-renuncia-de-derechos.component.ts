/**
 * PermisoRenunciaDeDerechosComponent es un componente que maneja la renuncia de derechos de permisos.
 * @packageDocumentation
 * @module PermisoRenunciaDeDerechosComponent
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent, MANIFIESTO_BAJO_PROTESTA, PermisoFormInterface, TituloComponent } from '@ng-mf/data-access-user';

/**
 * PermisoRenunciaDeDerechosComponent es un componente que maneja la renuncia de derechos de permisos.
 */
@Component({
  selector: 'app-permiso-renuncia-de-derechos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent],
  templateUrl: './permiso-renuncia-de-derechos.component.html',
  styleUrl: './permiso-renuncia-de-derechos.component.scss',
})
export class PermisoRenunciaDeDerechosComponent implements OnInit {

  /**
   * Configuración del formulario de renuncia de derechos de permisos.
   */
  public permisoForm!: FormGroup;

   /**
   * Declaración bajo protesta de decir verdad.
   */
  public MANIFIESTO_BAJO_PROTESTA = MANIFIESTO_BAJO_PROTESTA;


  /**
   * Inicializa el componente PermisoRenunciaDeDerechosComponent.
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @returns void
   * @description Inicializa el componente PermisoRenunciaDeDerechosComponent.
   */
  constructor(private fb:FormBuilder) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns void
   * @description Crea el formulario de renuncia de permisos y establece los valores iniciales.
   */
  ngOnInit(): void {
    this.crearpermisoForm();
    // this.enPatchForm(PermisoFormMockData);
  }

   /**
   * Crea el formulario de renuncia de derechos de permisos.
   * @returns void
   * @description Crea y configura el formulario de renuncia de derechos de permisos.
   */
  crearpermisoForm(): void {
    this.permisoForm = this.fb.group({
      folioTrámite: [{ value: '', disabled: true }],
      tipoDeSolicitud: [{ value: '', disabled: true }],
      régimen: [{ value: '', disabled: true }],
      clasificaciónDelRégimen: [{ value: '', disabled: true }],
      periodoDeVigencia: [{ value: '', disabled: true }],
      unidadDeMedida: [{ value: '', disabled: true }],
      fracciónArancelaria: [{ value: '', disabled: true }],
      cantidadAutorizada: [{ value: '', disabled: true }],
      valorAutorizado: [{ value: '', disabled: true }],
      nico: [{ value: '', disabled: true }],
      descripciónNico: [{ value: '', disabled: true }],
      acotación: [{ value: '', disabled: true }],
      permisoVálidoDesde: [{ value: '', disabled: true }],
      permisoVálidoHasta: [{ value: '', disabled: true }],
      motivoRenunciaDeDerechos:['', [Validators.required, Validators.maxLength(255)]],
      controlar: [true, Validators.requiredTrue]
    });
  }


  /**
   * Establece los valores del formulario de renuncia de derechos de permisos.
   * @param {PermisoFormInterface} data - Los datos del formulario de renuncia de derechos de permisos.
   * @returns void
   * @description Establece los valores del formulario de renuncia de derechos de permisos a partir de los datos proporcionados.
   */
  enPatchForm(data: PermisoFormInterface): void {}

   /**
   * Método para verificar si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control del formulario.
   * @returns {boolean} - Retorna true si el control es inválido, de lo contrario false.
   */
   esInvalido(nombreControl: string): boolean {
    const control = this.permisoForm.get(nombreControl);
    return control
      ? control.invalid && (control.touched || control.dirty)
      : false;
  }

}
