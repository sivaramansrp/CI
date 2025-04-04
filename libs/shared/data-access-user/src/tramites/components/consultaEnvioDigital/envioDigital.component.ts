import { BodyTablaEnvioDigital, HeaderTablaEnvioDigital } from '../../../core/models/shared/consulta-generica.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONSULTA_ENVIODIGITAL } from '../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-envio-digital',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './envioDigital.component.html',
  styleUrl: './envioDigital.component.css',
})
export class EnvioDigitalComponent implements OnInit {
  envioDigitalForm!: FormGroup;
  
  constructor(
      private fb: FormBuilder
    ) {
      // Componente para consulta de envio digital
    }

  ngOnInit(): void {
    this.crearEnvioDigitalFormForm();
  }
  /**
       * Implementación para la tabla Estado de envio.
       *
       */
      readonly encabezadoTablaDigital : HeaderTablaEnvioDigital[] = CONSULTA_ENVIODIGITAL.encabezadoTablaEnvioDigital;  
      readonly datosTablaDigital: BodyTablaEnvioDigital[] = CONSULTA_ENVIODIGITAL.datosTablaEnvioDigitalEnvio;

      /**
       * Implementación para la tabla Estado de revisión.
       *
       */
      readonly datosTablaDigitalRevision: BodyTablaEnvioDigital[] = CONSULTA_ENVIODIGITAL.datosTablaEnvioDigitalRevision;
  /**
     * Crea el formulario para envio Digital
     * @returns {void}
     */
    crearEnvioDigitalFormForm(): void {
      this.envioDigitalForm = this.fb.group({        
        tipoDocumento: [
          { value: '', disabled: true },
          [Validators.required, Validators.maxLength(250)],
        ],
        pais: [
          { value: '', disabled: true },
          [Validators.required, Validators.maxLength(250)],
        ],
        numero: [
          { value: '', disabled: true },
          [Validators.required, Validators.maxLength(250)],
        ],
      });
    }

}
