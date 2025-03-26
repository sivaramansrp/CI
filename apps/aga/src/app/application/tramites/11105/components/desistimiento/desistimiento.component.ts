import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import mockData from 'libs/shared/theme/assets/json/11105/solicitante-mockdata.json';

/**
 * Componente para gestionar el formulario del solicitante.
 */
@Component({
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent],
  selector: 'app-desistimiento',
  templateUrl: './desistimiento.component.html',
  styleUrl: './desistimiento.component.scss',
})
export class DesistimientoComponent implements OnInit {
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