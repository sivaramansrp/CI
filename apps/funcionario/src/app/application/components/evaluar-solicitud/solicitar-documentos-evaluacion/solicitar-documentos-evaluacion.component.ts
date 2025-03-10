import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TipoDocumento } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-solicitar-documentos',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent],
  templateUrl: './solicitar-documentos-evaluacion.component.html',
  styleUrl: './solicitar-documentos-evaluacion.component.css',
})
export class SolicitarDocumentosEvaluacionComponent {

  documentos = [
    'Pasaporte',
    'DNI',
    'Licencia de Conducir',
    'Acta de Nacimiento'
  ];
  
  documentosSeleccionados: string[] = [];
  documentoSeleccionado: string = '';

  agregarDocumento() {
    if (this.documentoSeleccionado && !this.documentosSeleccionados.includes(this.documentoSeleccionado)) {
      this.documentosSeleccionados.push(this.documentoSeleccionado);
    }
  }

  eliminarDocumento(index: number) {
    this.documentosSeleccionados.splice(index, 1);
  }

  tipoDocumentos: TipoDocumento[] = [];
  configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: 'Tipo de documento', clave: (item: any) => item.tipoDocumento, orden: 1 },
   
  ];
}
