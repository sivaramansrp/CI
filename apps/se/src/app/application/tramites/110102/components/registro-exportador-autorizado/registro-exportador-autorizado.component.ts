import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import ExportadorAutorizado from "../../../../../../../../../libs/shared/theme/assets/json/110102/exportadorautorizado.json";
import ExportadorAutorizadoJPN from "../../../../../../../../../libs/shared/theme/assets/json/110102/exportadorautorizadojpn.json";

import { InputRadioComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";
import { TituloComponent } from '@ng-mf/data-access-user';



@Component({
  selector: 'app-registro-exportador-autorizado',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputRadioComponent],
  templateUrl: './registro-exportador-autorizado.component.html',
  styleUrl: './registro-exportador-autorizado.component.scss',
})
export class RegistroExportadorAutorizadoComponent implements OnInit {

   exportadorOptions = ExportadorAutorizado;
    exportadorOptionsJPN = ExportadorAutorizadoJPN;
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

this.showDivExportador = this.registroExportadorForm.get('solicitaExportadorAutorizado')?.value;
this.showDivExportadorJPN = this.registroExportadorForm.get('solicitaExportadorAutorizadoJPN')?.value;
}

onSolicitaExportadorAutorizadoChange(event: Event): void {
const INPUT = event.target as HTMLInputElement;
this.showDivExportador = INPUT.checked;
}

onSolicitaExportadorAutorizadoJPNChange(event: Event): void {
const INPUT = event.target as HTMLInputElement;
this.showDivExportadorJPN = INPUT.checked;
}
}