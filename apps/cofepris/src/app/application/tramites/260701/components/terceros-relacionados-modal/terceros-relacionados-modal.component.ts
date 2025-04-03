import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
        denominacionSocial: [''],
        terceroNombre: [''],
        nacional: [''],
        extranjero: [''],
        tipoPersona: [''],
        rfc: [''],
        curp: [''],
        razonSocial: [''],
        pais: [''],
        estado: [''],
        municipio: [''],
        localidad: [''],
        codigoPostal: [''],
        colonia: [''],
        calle: [''],
        numeroExterior: [''],
        numeroInterior: [''],
        lada: [''],
        telefono: [''],
        correoElectronico: [''],
      });
    }

    public onChangeTipoPersona(): void {
      const RADIO = this.tercerosRelacionadosForm.get('tipoPersona')?.value;
      this.radioObjeto.fisica = RADIO === 'fisica' ? true : false;
      this.radioObjeto.moral = RADIO === 'moral' ? true : false;
    }

}
