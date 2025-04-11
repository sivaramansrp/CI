import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FolioTramite } from '../../models/datos-tramite.model';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeleccionarDocumentosComponent } from '../seleccionar-documentos/seleccionar-documentos.component';

@Component({
  selector: 'app-requiremento',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CapturarRequerimientoComponent,
    SeleccionarDocumentosComponent,
  ],
  templateUrl: './requiremento.component.html',
  styleUrl: './requiremento.component.css',
})
export class RequirementoComponent implements OnInit {
  folioTramite: FolioTramite = {} as FolioTramite;

  indice: number = 1;
  constructor(private router: Router) {
    //
  }

  ngOnInit(): void {
    this.folioTramite = history.state.data;
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  continuar(): void {
    this.router.navigate(['/pago/manifiesto-aereo/capturar-el-texto-libre']);
  }

  cancelar(): void {
    this.router.navigate(['/pago/manifiesto-aereo/main']);
  }
}
