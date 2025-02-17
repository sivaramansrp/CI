// filepath: registroDigitalizarDocumentos.service.ts
import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroDigitalizarDocumentosService {

  constructor(private http: HttpClient) {}

  addDoctoEspecifico(selectDoctosEspecificos: ElementRef, alertsDocumentos: ElementRef, jqgridDoctosEspecificos: any, renderer: Renderer2) {
    const selectedValue = selectDoctosEspecificos.nativeElement.value;
    if (selectedValue !== '-1') {
      this.hideAlert(alertsDocumentos, renderer);
      const row = {
        nombre: selectDoctosEspecificos.nativeElement.options[selectDoctosEspecificos.nativeElement.selectedIndex].text,
        idTipoDocumento: selectedValue,
      };
      const ids = jqgridDoctosEspecificos.getDataIDs();
      const idMax = ids.length > 0 ? Math.max(...ids.map(id => parseInt(id))) : 0;
      const index = idMax + 1;
      jqgridDoctosEspecificos.addRowData(index.toString(), row, "last");
      selectDoctosEspecificos.nativeElement.value = '-1';
    } else {
      this.showAlert(alertsDocumentos, renderer, '<b>Error!</b> Debe seleccionar un documento.');
    }
  }

  guardarTipoDoctos(url: string, jqgridDoctosEspecificos: any, alertsDocumentos: ElementRef, renderer: Renderer2, tipoDocumentosForm: HTMLFormElement) {
    const ids = jqgridDoctosEspecificos.getDataIDs();
    if (ids.length === 0) {
      this.showAlert(alertsDocumentos, renderer, '<b>Error!</b> Debe registrar un documento.');
    } else {
      const urlFinal = `${url}?cargarListDoctosEspecificos=`;
      this.sendGridEncoding(jqgridDoctosEspecificos, urlFinal, 'listDoctosEspecificos');
      tipoDocumentosForm.action = `${url}?guardarTipoDoctosPorTramite=`;
      tipoDocumentosForm.submit();
    }
  }

  private sendGridEncoding(jqgridDoctosEspecificos: any, url: string, listParam: string) {
    // Functionality to send grid data as encoding (requires implementation based on grid and server logic)
    // Convert grid data and send using this.http.post or another suitable method
  }

  private hideAlert(alertElement: ElementRef, renderer: Renderer2) {
    renderer.setStyle(alertElement.nativeElement, 'display', 'none');
    renderer.removeClass(alertElement.nativeElement, 'alert alert-danger');
  }

  private showAlert(alertElement: ElementRef, renderer: Renderer2, message: string) {
    renderer.setStyle(alertElement.nativeElement, 'display', 'block');
    alertElement.nativeElement.innerHTML = message;
    renderer.addClass(alertElement.nativeElement, 'alert alert-danger');
  }
}