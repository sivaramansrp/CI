import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profiles-domocilio-dela',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profiles-domocilio-dela.component.html',
  styleUrls: ['./profiles-domocilio-dela.component.css'],
})
export class ProfilesDomocilioDelaComponent implements OnInit {
  contingencyForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contingencyForm = this.fb.group({
      comiteSeguridad: ['', Validators.required],
      fuentesInformacion: ['', Validators.required],
      politica: ['', Validators.required],
      indique: ['', Validators.required],
      periodicidad: ['', Validators.required],
      programa: ['', Validators.required],
      programaDifusion: ['', Validators.required],
      capacitacion: ['', Validators.required],
      procedimiento: ['', Validators.required],
      descripcionProcedimiento: ['', Validators.required],
      nombreProcedimiento: ['', Validators.required],
      programacionAuditoria: ['', Validators.required],
      participantesAuditoria: ['', Validators.required],
      enfoqueAuditoria: ['', Validators.required],
      procesosAuditados: ['', Validators.required],
      registrosAuditoria: ['', Validators.required],
      programacion: ['', Validators.required],
      registrosNombre: ['', Validators.required],
      registrosEmpresa: ['', Validators.required],
      planEmergencia: ['', Validators.required],
      situacionesContempladas: ['', Validators.required],
      mecanismosContinuidad: ['', Validators.required],
      simulacrosDocumentacion: ['', Validators.required],
    });
  }

 
}
