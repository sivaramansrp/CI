import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

/**
 * Componente modal para gestionar asociaciones de terceros.
 * 
 * Este componente permite al usuario interactuar con un formulario reactivo
 * para capturar y validar información relacionada con terceros, como datos
 * personales, dirección e información de contacto. También incluye lógica
 * para manejar el tipo de persona (física o moral) y ajustar el estado del
 * formulario en consecuencia.
 */
@Component({
  selector: 'app-terceros-relacionados-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './terceros-relacionados-modal.component.html',
  styleUrl: './terceros-relacionados-modal.component.scss',
})
export class TercerosRelacionadosModalComponent implements OnInit {

  /**
     * Representa el título del componente modal.
     */
    titulo: string;
    /**
     * Un grupo de formulario reactivo utilizado para gestionar y validar 
     * los datos relacionados con las asociaciones de terceros en el componente.
     */
    public tercerosRelacionadosForm!: FormGroup;

    /**
     * Representa el estado de los botones de opción para seleccionar entre entidades 
     * "física" (individual) y "moral" (corporativa). Cada propiedad indica si la opción 
     * correspondiente está seleccionada.
     * 
     * @property fisica - Un booleano que indica si la opción "física" está seleccionada.
     * @property moral - Un booleano que indica si la opción "moral" está seleccionada.
     */
    public radioObjeto = {
      fisica: false,
      moral: false,
    }
    /**
     * Constructor del componente FabricanteModalComponent.
     * 
     * @param bsModalRef - Referencia a la instancia del modal de Bootstrap.
     * @param fb - Instancia de FormBuilder utilizada para crear y gestionar formularios reactivos.
     */
    constructor(
      public bsModalRef: BsModalRef,
      private fb: FormBuilder,
    ) {
      this.titulo = '';
    }
  
    /**
     * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
     * Este método se utiliza para realizar la lógica de inicialización del componente.
     * En esta implementación, invoca el método `cerrarTercerosRelacionadosForm` para reiniciar o cerrar
     * el formulario relacionado con las asociaciones de terceros.
     */
    ngOnInit(): void {
      this.cerrarTercerosRelacionadosForm();
    }
  
    /**
     * Restablece el grupo de formulario `tercerosRelacionadosForm` con valores predeterminados vacíos.
     * Este método inicializa el formulario con controles para varios campos como
     * denominación social, RFC, CURP, detalles de dirección e información de contacto.
     * Cada control se establece con una cadena vacía como su valor predeterminado.
     *
     * @returns {void}
     */
    public cerrarTercerosRelacionadosForm(): void {
      this.tercerosRelacionadosForm = this.fb.group({
        denominacionSocial: ['',Validators.required],
        terceroNombre: ['',Validators.required],
        primerApellido: ['',Validators.required],
        nacional: ['',Validators.required],
        extranjero: ['',Validators.required],
        tipoPersona: ['',Validators.required],
        rfc: ['',Validators.required],
        curp: ['',Validators.required],
        razonSocial: ['',Validators.required],
        pais: ['',Validators.required],
        estado: ['',Validators.required],
        municipio: ['',Validators.required],
        localidad: ['',Validators.required],
        codigoPostal: ['',Validators.required],
        colonia: ['',Validators.required],
        calle: ['',Validators.required],
        numeroExterior: ['',Validators.required],
        numeroInterior: ['',Validators.required],
        lada: [''],
        telefono: ['',Validators.required],
        correoElectronico: ['',Validators.required],
      });
    }

    /**
     * Maneja el evento de cambio para el campo "tipoPersona" en el formulario.
     * Actualiza las propiedades de `radioObjeto` (`fisica` y `moral`) según el valor seleccionado.
     * 
     * - Si el valor seleccionado es 'fisica', `radioObjeto.fisica` se establece en `true` y `radioObjeto.moral` en `false`.
     * - Si el valor seleccionado es 'moral', `radioObjeto.moral` se establece en `true` y `radioObjeto.fisica` en `false`.
     * 
     * @returns {void}
     */
    public onChangeTipoPersona(): void {
      const RADIO = this.tercerosRelacionadosForm.get('tipoPersona')?.value;
      this.radioObjeto.fisica = RADIO === 'fisica' ? true : false;
      this.radioObjeto.moral = RADIO === 'moral' ? true : false;
    }

}
