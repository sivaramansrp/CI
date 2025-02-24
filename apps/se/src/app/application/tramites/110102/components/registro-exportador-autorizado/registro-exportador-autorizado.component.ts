import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-registro-exportador-autorizado',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './registro-exportador-autorizado.component.html',
  styleUrl: './registro-exportador-autorizado.component.scss',
})
export class RegistroExportadorAutorizadoComponent implements OnInit {


  registroExportadorForm!: FormGroup;
  showDivExportador: boolean = false;
  showDivExportadorJPN: boolean = false;

  constructor(
    private fb: FormBuilder,
  ) {
    // Lógica del constructor puede ser añadida aquí si es necesario
  }

  ngOnInit(): void {
    this.registroExportadorForm = this.fb.group({
          solicitaSeparacionContable: [false],
          solicitaExportadorAutorizado: [false],
          condicionExportador: [''],
          solicitaExportadorAutorizadoJPN: [false],
          condicionExportadorJPN: ['']
        });
}
}