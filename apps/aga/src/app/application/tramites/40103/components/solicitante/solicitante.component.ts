import * as mockData from '@libs/shared/theme/assets/json/40103/solicitante-mockdata.json';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
/**
 * Componente para gestionar el formulario del solicitante.
 */
@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
})
export class SolicitanteComponent implements OnInit {
  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  solicitudForm!: FormGroup;
  
    /** Datos del solicitante */
    solicitudData = mockData;

  /**
   * Constructor para inyectar las dependencias necesarias.
   * @param fb - Servicio FormBuilder para crear formularios reactivos.
   */
  // eslint-deshabilitar-la-siguiente-línea-sin-función-vacía
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario `solicitudForm` con los campos necesarios.
   * @returns {void}
   */
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      rfc: [''],
      denominacion: [''],
      actividadEconomica: [''],
      correoElectronico: [''],
      pais: [''],
      codigoPostal: [''],
      estado: [''],
      municipioOAlcadia: [''],
      localidad: [''],
      colonia: [''],
      calle: [''],
      numeroExterior: [''],
      numeroInterior: [''],
      lada: [''],
      telefono: [''],
    });
    this.setFormValues();
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
  setFormValues(): void {
    this.solicitudForm.get('rfc')?.setValue(this.solicitudData.rfc);
    this.solicitudForm.get('denominacion')?.setValue(this.solicitudData.denominacion);
    this.solicitudForm.get('actividadEconomica')?.setValue(this.solicitudData.actividadEconomica);
    this.solicitudForm.get('correoElectronico')?.setValue(this.solicitudData.correoElectronico);
    this.solicitudForm.get('pais')?.setValue(this.solicitudData.pais);
    this.solicitudForm.get('codigoPostal')?.setValue(this.solicitudData.codigoPostal);
    this.solicitudForm.get('estado')?.setValue(this.solicitudData.estado);
    this.solicitudForm.get('municipioOAlcadia')?.setValue(this.solicitudData.municipioOAlcadia);
    this.solicitudForm.get('localidad')?.setValue(this.solicitudData.localidad);
    this.solicitudForm.get('colonia')?.setValue(this.solicitudData.colonia);
    this.solicitudForm.get('calle')?.setValue(this.solicitudData.calle);
    this.solicitudForm.get('numeroExterior')?.setValue(this.solicitudData.numeroExterior);
    this.solicitudForm.get('numeroInterior')?.setValue(this.solicitudData.numeroInterior);
    this.solicitudForm.get('telefono')?.setValue(this.solicitudData.telefono);
  }
}