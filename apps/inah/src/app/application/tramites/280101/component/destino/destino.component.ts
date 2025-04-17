import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import mockData from '@libs/shared/theme/assets/json/40101/solicitante-mockdata.json';

/**
 * Componente para gestionar el formulario del solicitante.
 */
@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.scss',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      TituloComponent
    ]
})
export class DestinoComponent implements OnInit {
  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  DestinoForm!: FormGroup;

  /**
   * Constructor para inyectar las dependencias necesarias.
   * @param fb - Servicio FormBuilder para crear formularios reactivos.
   */
  // eslint-deshabilitar-la-siguiente-línea-sin-función-vacía
  constructor(private fb: FormBuilder) {/**
    * Constructor para inyectar las dependencias necesarias.
    * @param fb - Servicio FormBuilder para crear formularios reactivos.
    */}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario `solicitudForm` con los campos necesarios.
   * @returns {void}
   */
  ngOnInit(): void {
    this.DestinoForm = this.fb.group({
      pais: [''],
      codigoPostal: [''],
      estado: [''],
      municipioOAlcadia: [''],
      localidad: [''],
      colonia: [''],
      numeroExterior: [''],
      numeroInterior: [''],
      calle: [''],
    });
   // this.setFormValues();
  }

  /**
   * Establece los valores del formulario `solicitudForm` utilizando datos simulados.
   * 
   * Este método llena los siguientes campos en el formulario:
   * - rfc: El RFC (Registro Federal de Contribuyentes).
   * - denominacion: La denominación o razón social.
   * - actividadEconomica: La actividad económica.
   * - correoElectronico: La dirección de correo electrónico.
   * 
   * @remarks
   * Este método asume que `mockData` contiene los campos necesarios
   * y que `solicitudForm` está correctamente inicializado.
   */
  setFormValues():void {
    this.DestinoForm.get('pais')?.setValue(mockData.rfc);
    this.DestinoForm.get('codigoPostal')?.setValue(mockData.denominacion);
    this.DestinoForm.get('estado')?.setValue(mockData.actividadEconomica);
    this.DestinoForm.get('municipioOAlcadia')?.setValue(mockData.correoElectronico);
    this.DestinoForm.get('localidad')?.setValue(mockData.rfc);
    this.DestinoForm.get('colonia')?.setValue(mockData.denominacion);
    this.DestinoForm.get('numeroExterior')?.setValue(mockData.correoElectronico);
    this.DestinoForm.get('numeroInterior')?.setValue(mockData.rfc);
    this.DestinoForm.get('calle')?.setValue(mockData.actividadEconomica);
  }
}