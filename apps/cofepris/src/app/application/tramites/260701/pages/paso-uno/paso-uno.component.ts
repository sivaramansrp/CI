import { Component, OnInit } from '@angular/core';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { map, Subject, takeUntil } from 'rxjs';

/**
 * Componente PasoUnoComponent.
 *
 * Este componente representa el primer paso de un trámite en la aplicación.
 * Contiene lógica para manejar la selección de subtítulos y mostrar la sección
 * correspondiente de datos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit {


    /**
   * Índice del subtítulo seleccionado.
   * Se utiliza para determinar qué sección de datos se muestra.
   * Inicialmente, el valor es 1.
   */
    indice: number = 1;
    private destroyNotifier$: Subject<void> = new Subject();
    public consultaState!:ConsultaioState;

    constructor(
       private certificadosLicenciasSvc: CertificadosLicenciasService,
       private consultaQuery: ConsultaioQuery
    ) {

    }


    ngOnInit(): void {
      this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
      if(this.consultaState.update) {
        this.guardarDatosFormulario();
      }
    }
 
    /**
     * Método para cambiar el índice del subtítulo seleccionado.
     *
     * @param i - Índice del nuevo subtítulo seleccionado.
     */
    seleccionaTab(i: number): void {
      this.indice = i;
    }

    public guardarDatosFormulario(): void {
      this.certificadosLicenciasSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe({
        next: (response) => {
          if (response) {
            this.certificadosLicenciasSvc.actualizarEstadoFormulario(response);
          }
        }
      });
    }
}
