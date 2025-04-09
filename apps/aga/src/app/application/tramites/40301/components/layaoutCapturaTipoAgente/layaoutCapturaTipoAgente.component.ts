import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CATALOGOS_40301_ID } from '../../enum/caat-naviero.enum';
import { CapturarService } from '../../services/capturar.service';
import { Catalogo } from '@libs/shared/data-access-user/src';

import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-layaout-captura-tipo-agente',
  templateUrl: './layaoutCapturaTipoAgente.component.html',
  //styleUrls: ['./layaoutCapturaTipoAgente.component.scss']

})
export class LayaoutCapturaTipoAgenteComponent implements OnInit {
  titulo: string = '';
  tipoAgenteLabel: string = "";
  formularioAgente!: FormGroup;
  agentCatalog: Catalogo[] = [];

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder,
    private capturarService: CapturarService
  ) { }

  ngOnInit(): void {


    this.formularioAgente = this.fb.group({
      tipoAgente: ['', Validators.required],
    });

   
    // Initialize titulo and tipoAgenteLabel if necessary
    this.titulo = 'CAAT Naviero'; // Replace with actual value or service call
    this.tipoAgenteLabel = 'Tipo de Agente'; // Replace with actual value or service call

    this.capturarService
      .getCatalogo(CATALOGOS_40301_ID.AGENT_CATALOG)
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((agentCatalog: Catalogo[]) => {
          this.agentCatalog = agentCatalog;
        })
      )
      .subscribe();
  }

  /**
   * Método para obtener el valor del campo tipoAgente.
   * @returns string
   */
  limpiarAgente(): void {
    this.formularioAgente.reset();
  }

  /**
   * Método para obtener el valor del campo tipoAgente.
   * @returns string
   */
  conTipooAgenteData(): Catalogo[] {
    return this.agentCatalog.map((item) => {
      return {
        id: item.id,
        clave: item.clave,
        descripcion: item.descripcion,
      };
    });
  }
}