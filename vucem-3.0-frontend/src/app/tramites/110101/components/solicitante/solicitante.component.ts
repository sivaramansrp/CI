import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';


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
  mockData = {
    rfc: 'AAL0409235E6',
    denominacion: 'AGRICOLA ALPE S DE RL DE CV',
    actividadEconomica: 'Siembra, cultivo y cosecha de papa',
    correoElectronico: 'vucem2.5@hotmail.com'
  };
  
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      rfc: this.mockData.rfc,
      denominacion: this.mockData.denominacion,
      actividadEconomica: this.mockData.actividadEconomica,
      correoElectronico: this.mockData.correoElectronico
    });
  }
}
