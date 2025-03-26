/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


/**
 * FabricanteModalComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */

@Component({
  selector: 'app-fabricante-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './fabricante-modal.component.html',
  styleUrl: './fabricante-modal.component.scss',
})
export class FabricanteModalComponent implements OnInit {

  /**
   * Representa el título del componente modal.
   */
  titulo: string;
  /**
   * Representa el catálogo de países disponibles para selección.
   * Se espera que esta propiedad sea un arreglo de objetos `Catalogo`.
   */
  public paisCatalogo!: Catalogo[];
  /**
   * Un grupo de formulario reactivo utilizado para gestionar y validar 
   * los datos relacionados con las asociaciones de terceros en el componente.
   */
  public tercerosRelacionadosForm!: FormGroup;
  
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
      fisica: [''],
      moral: [''],
      noContribuyente: [''],
      rfc: [''],
      curp: [''],
      razonSocial: [''],
      pais: [''],
      estado: [''],
      codigoPostal: [''],
      calle: [''],
      numeroExterior: [''],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
      correoElectronico: ['']
    });
  }
  
}
