import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import mockData from '../../../../../assets/json/110101/solicitante-mockdata.json';



@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
  standalone: true,
  imports:[TituloComponent,ReactiveFormsModule]
})
export class SolicitanteComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  solicitudForm!: FormGroup;

 /**
 * Datos simulados que representan a un solicitante con varios atributos.
 * 
 * @property {string} rfc - El RFC (Registro Federal de Contribuyentes) del solicitante.
 * @property {string} denominacion - El nombre o denominación del negocio del solicitante.
 * @property {string} actividadEconomica - La actividad económica o sector empresarial del solicitante.
 * @property {string} correoElectronico - La dirección de correo electrónico del solicitante.
 */
 
  
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      rfc: [''],
      denominacion: [''],
      actividadEconomica: [''],
      correoElectronico: ['']
    });
    this.setFormValues()
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

  setFormValues(){
    this.solicitudForm.get('rfc')?.setValue(mockData.rfc);
    this.solicitudForm.get('denominacion')?.setValue(mockData.denominacion);
    this.solicitudForm.get('actividadEconomica')?.setValue(mockData.actividadEconomica);
    this.solicitudForm.get('correoElectronico')?.setValue(mockData.correoElectronico);
  }
}
