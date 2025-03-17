import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from 'libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements AfterViewInit {

  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  indice: number = 1;
  
  constructor(private route:ActivatedRoute) { }
  ngOnInit() : void {
    this.route.queryParams.subscribe(params => {
      // eslint-disable-next-line dot-notation
      if (params['indice']) {
      
      // eslint-disable-next-line dot-notation
        this.indice = Number(params['indice']); 
      }
    });
  }
  ngAfterViewInit(): void {

    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
