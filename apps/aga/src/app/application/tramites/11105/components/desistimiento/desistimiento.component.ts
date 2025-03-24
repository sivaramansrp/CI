import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import mockData from 'libs/shared/theme/assets/json/40102/solicitante-mockdata.json';

/**
 * Componente para gestionar el formulario del solicitante.
 */
@Component({
  selector: 'app-solicitante',
  templateUrl: './desistimiento.component.html',
  styleUrl: './desistimiento.component.scss',
})
export class SolicitanteComponent implements OnInit {
  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  desisitimientoForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.desisitimientoForm = this.fb.group({
      folioOriginal: [''],
      justificacionDelDesistimiento: ['']
    });
    this.setFormValues();
  }
  setFormValues() {
    this.desisitimientoForm.get('rfc')?.setValue(mockData.folioOriginal);
    this.desisitimientoForm.get('denominacion')?.setValue(mockData.justificacionDelDesistimiento);
  }
}