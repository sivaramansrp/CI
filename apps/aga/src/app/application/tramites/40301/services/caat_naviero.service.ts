import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaatNavieroService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  limpiarAgente(
    // elementRefs: {
    // tipoAgente: ElementRef,
    // nombreDirectorGeneral: ElementRef,
    // apellidoPaternoDirectorGeneral: ElementRef,
    // apellidoMaternoDirectorGeneral: ElementRef,
    // labels: { nombreLabel: ElementRef, apellidoLabel: ElementRef, tipoLabel: ElementRef }
  // }
) {
    // this.limpiarDatosDirectorGeneral(
    //   elementRefs.tipoAgente,
    //   elementRefs.nombreDirectorGeneral,
    //   elementRefs.apellidoPaternoDirectorGeneral,
    //   elementRefs.apellidoMaternoDirectorGeneral
    // );
    // this.limpiarErrorMsgDirectorGeneral(elementRefs.labels);
  }

  private limpiarDatosDirectorGeneral(
    // tipoAgente: ElementRef,
    // nombreDirectorGeneral: ElementRef,
    // apellidoPaternoDirectorGeneral: ElementRef,
    // apellidoMaternoDirectorGeneral: ElementRef
  ) {
    // this.renderer.setValue(tipoAgente.nativeElement, '');
    // this.renderer.setValue(nombreDirectorGeneral.nativeElement, '');
    // this.renderer.setValue(apellidoPaternoDirectorGeneral.nativeElement, '');
    // this.renderer.setValue(apellidoMaternoDirectorGeneral.nativeElement, '');

    // this.renderer.setAttribute(tipoAgente.nativeElement, 'class', 'required');
    // this.renderer.setAttribute(nombreDirectorGeneral.nativeElement, 'class', 'inputtexto1 required');
    // this.renderer.setAttribute(apellidoPaternoDirectorGeneral.nativeElement, 'class', 'inputtexto1 required');
  }

  private limpiarErrorMsgDirectorGeneral() {
    // this.renderer.setStyle(labels.nombreLabel.nativeElement, 'display', 'none');
    // this.renderer.setStyle(labels.apellidoLabel.nativeElement, 'display', 'none');
    // this.renderer.setStyle(labels.tipoLabel.nativeElement, 'display', 'none');
  }
}