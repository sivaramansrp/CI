import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { SharedModule, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: true,
  imports:[SharedModule, CommonModule, SolicitanteComponent, CertificadoDeOrigenComponent,DatosCertificadoComponent,DestinatarioComponent]
})
export class PasoUnoComponent implements AfterViewInit, OnInit{

  entidadFederativa!: any;

  constructor(private registro:RegistroService){}

  ngOnInit(): void {
   
    this.registro.getCatalogoById(21).subscribe((resp) => {
      this.entidadFederativa = resp;
      console.log(this.entidadFederativa);

      const data = JSON.parse(this.entidadFederativa.data);

      this.entidadFederativa = data?.domicilioFiscal?.entidadFederativa;
      console.log(this.entidadFederativa);
  
    });

   
   
    
  }

  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  
  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  indice: number = 1;

  ngAfterViewInit(): void {

    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}


