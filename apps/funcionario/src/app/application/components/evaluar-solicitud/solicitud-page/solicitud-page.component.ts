import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarDictamenComponent } from '../generar-dictamen/generar-dictamen.component';
import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { SolicitarDocumentosEvaluacionComponent } from '../solicitar-documentos-evaluacion/solicitar-documentos-evaluacion.component';
import { RequerimientoInformacionComponent } from '../requerimiento-informacion/requerimiento-informacion.component';
import { EncabezadoRequerimientoComponent, FirmaPageComponent } from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../../../../../../../libs/shared/data-access-user/src/core/services/shared/funcionario/funcionario.service';

@Component({
  selector: 'app-solicitud-page',
  standalone: true,
  imports: [CommonModule, EncabezadoRequerimientoComponent, GenerarDictamenComponent, CapturarRequerimientoComponent, SolicitarDocumentosEvaluacionComponent, RequerimientoInformacionComponent, FirmaPageComponent], // <-- Importa los componentes aquí
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})
export class SolicitudPageComponent {
  /**
     * Índice de la pestaña seleccionada
     */
  indice: number = 1;

  /**
   * Variable para firmar
   */
  public firmarFuncionario: boolean = true;

  constructor(
    private router: Router,
    private estadoService: FuncionarioService,
  ) {
    this.estadoService.firmarFuncionario$.subscribe(valor => this.firmarFuncionario = valor);
  }

  /**
   * Método para seleccionar la pestaña
   * @param i indica el número de la pestaña seleccionada
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /*
   * Método que se ejecuta para guardar y firmar
  */
  guardarFirmar(): void {
    this.router.navigate(['funcionario/firma-electronica']);
  }

  continuar() {
    this.estadoService.setTabIndex(2);
  }
}
