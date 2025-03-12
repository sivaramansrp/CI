import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarDictamenComponent } from '../generar-dictamen/generar-dictamen.component';
import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { SolicitarDocumentosEvaluacionComponent } from '../solicitar-documentos-evaluacion/solicitar-documentos-evaluacion.component';
import { RequerimientoInformacionComponent } from '../requerimiento-informacion/requerimiento-informacion.component';
import { EncabezadoRequerimientoComponent } from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-page',
  standalone: true,
  imports: [CommonModule, EncabezadoRequerimientoComponent, GenerarDictamenComponent, CapturarRequerimientoComponent, SolicitarDocumentosEvaluacionComponent, RequerimientoInformacionComponent], // <-- Importa los componentes aquí
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})
export class SolicitudPageComponent {

  constructor(
    private router: Router
  ){
    
  }
  /**
   * Índice de la pestaña seleccionada
   */
  indice: number = 1;
  /**
   * Variable para firmar
   */
  // firmar: boolean = false;

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
}
