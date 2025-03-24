import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TableComponent,TituloComponent,ReactiveFormsModule],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent {
  destinatarioForm!: FormGroup;
  tableData = {
    tableBody: [],
    tableHeader: [],
  };


  get selectedTipoPersona() {
    return this.destinatarioForm.get('tipoPersona')?.value;
  }
}
