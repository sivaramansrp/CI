import { ApiResponseSolicitante, Solicitante } from '../../models/registro-muestras-mercancias.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { modificarTerrestreService } from '../services/modificacar-terrestre.service';
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

  solicitudData = {} as Solicitante;

  /**
   * Constructor para inyectar las dependencias necesarias.
   * @param fb - Servicio FormBuilder para crear formularios reactivos.
   */
  // eslint-deshabilitar-la-siguiente-línea-sin-función-vacía
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder, private modificarTerrestreService: modificarTerrestreService) { }

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
    this.modificarTerrestreService.obtenerDatosSolicitante().subscribe((data: ApiResponseSolicitante) => {
      this.solicitudData = data ? data?.datos?.solicitante : [] as unknown as Solicitante;
      this.setFormValues();
    });
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
    const RFC = this.solicitudForm.get('rfc');
    RFC?.setValue(this.solicitudData?.rfc);
    this.solicitudForm.get('denominacion')?.setValue(this.solicitudData?.razon_social);
    this.solicitudForm.get('actividadEconomica')?.setValue(this.solicitudData?.descripcion_giro);
    this.solicitudForm.get('correoElectronico')?.setValue(this.solicitudData?.correo_electronico);
    this.solicitudForm.get('pais')?.setValue(this.solicitudData?.domicilio?.pais);
    this.solicitudForm.get('codigoPostal')?.setValue(this.solicitudData.domicilio?.codigo_postal);
    this.solicitudForm.get('estado')?.setValue(this.solicitudData?.domicilio.estado);
    this.solicitudForm.get('municipioOAlcadia')?.setValue(this.solicitudData?.domicilio.municipio);
    this.solicitudForm.get('localidad')?.setValue(this.solicitudData?.domicilio.localidad);
    this.solicitudForm.get('colonia')?.setValue(this.solicitudData?.domicilio.colonia);
    this.solicitudForm.get('calle')?.setValue(this.solicitudData?.domicilio.calle);
    this.solicitudForm.get('numeroExterior')?.setValue(this.solicitudData?.domicilio.numero_exterior);
    this.solicitudForm.get('numeroInterior')?.setValue(this.solicitudData?.domicilio.numero_interior);
    this.solicitudForm.get('telefono')?.setValue(this.solicitudData?.domicilio.telefono);
  }
}