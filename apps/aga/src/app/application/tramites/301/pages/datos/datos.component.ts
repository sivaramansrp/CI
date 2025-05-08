/* eslint-disable @nx/enforce-module-boundaries */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { Pantallas301Service } from '../../services/pantallas301.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220401
 * Establecer el índice del subtítulo
 */
@Component({
  selector: 'app-pantalla-datos',
  standalone: false,
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit,OnDestroy,AfterViewInit {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  public datos = [];
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  constructor(
    public pantallasSvc: Pantallas301Service,
    private route: ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
    const PROCEDURE_NUMBER = this.route.snapshot.paramMap.get('procedureId');
    if(PROCEDURE_NUMBER !== '' && PROCEDURE_NUMBER !== null && PROCEDURE_NUMBER !== undefined) {
      this.pantallasSvc.getPantallaDatos().subscribe((response) => {
        this.datos = JSON.parse(JSON.stringify(response));
      });
    }
  }

    /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
    ngAfterViewInit(): void {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
