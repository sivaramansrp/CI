import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { SolicitarDocumentosEvaluacionComponent } from '../solicitar-documentos-evaluacion/solicitar-documentos-evaluacion.component';
import { FuncionarioService } from '@libs/shared/data-access-user/src/core/services/shared/funcionario/funcionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requerimiento-informacion',
  standalone: true,
  imports: [CommonModule, CapturarRequerimientoComponent, SolicitarDocumentosEvaluacionComponent],
  templateUrl: './requerimiento-informacion.component.html',
  styleUrl: './requerimiento-informacion.component.scss',
})
export class RequerimientoInformacionComponent {
  /**
     * Índice de la pestaña seleccionada
     */
  indiceDictamen: number = 1;
  documentacion: boolean = false;
  constructor(
    private router: Router,
    private estadoService: FuncionarioService,
  ) {
    this.estadoService.tabIndex$.subscribe(valor => this.documentacion = valor);
  }

  ngOnInit(): void {
  }

  /**
    * Método para seleccionar la pestaña
    * @param i indica el número de la pestaña seleccionada
    */
  seleccionaTab(i: number): void {
    this.indiceDictamen = i;
  }

  continuar(): void {
    debugger
    if (this.indiceDictamen === 2 || this.documentacion === false) {
      this.router.navigate(['funcionario/firma-electronica']);
    } else {
      this.indiceDictamen = 2;
    }
  }
}
