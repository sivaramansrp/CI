import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FuncionarioService } from '@libs/shared/data-access-user/src/core/services/shared/funcionario/funcionario.service';
import { Router } from '@angular/router';
import { SolicitarDocumentosEvaluacionComponent } from '../solicitar-documentos-evaluacion/solicitar-documentos-evaluacion.component';

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
  /**
   * Índice para activar la pestaña requerimientos de documentación
   */
  documentacion: boolean = false;
  constructor(
    private router: Router,
    private estadoService: FuncionarioService,
  ) {
    this.estadoService.tabIndex$.subscribe(valor => {
      this.documentacion = valor;
    });
  }
  /**
    * Método para seleccionar la pestaña
    * @param i indica el número de la pestaña seleccionada
    */
  seleccionaTab(i: number): void {
    this.indiceDictamen = i;
  }
  /**
   * Método para la función del botón continuar
   */
  continuar(): void {
    if (this.indiceDictamen === 2 || this.documentacion === false) {
      this.router.navigate(['funcionario/firma-electronica']);
    } else {
      this.indiceDictamen = 2;
    }
  }
}
