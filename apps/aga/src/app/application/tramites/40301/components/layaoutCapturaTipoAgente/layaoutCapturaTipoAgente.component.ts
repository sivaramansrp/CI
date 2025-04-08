import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaatNavieroService } from '../../services/caat_naviero.service';
import { Catalogo } from '@libs/shared/data-access-user/src';
// import { LayaoutCapturaTipoAgenteService } from './layaoutCapturaTipoAgente.service';

@Component({
  selector: 'app-layaout-captura-tipo-agente',
  templateUrl: './layaoutCapturaTipoAgente.component.html',
  //styleUrls: ['./layaoutCapturaTipoAgente.component.scss']

})
export class LayaoutCapturaTipoAgenteComponent implements OnInit {
  titulo: string = '';
  tipoAgenteLabel: string = "";
  formularioAgente!: FormGroup;
  tipoAgenteData: Catalogo[] = [{
    id: 1,
    clave: 'TIAGN.AN',
    descripcion: 'Agente naviero',
  }, {
    id: 2,
    clave: 'TIAGN.AIC',
    descripcion: 'Agente internacional de carga',
  }, {
    id: 3,
    clave: 'TIAGN.CB',
    descripcion: 'Consignatario de buque',
  },
  ];

  constructor(private fb: FormBuilder,
    // private layaoutCapturaTipoAgenteService: LayaoutCapturaTipoAgenteService
    // private capturarService: CapturarService
    private registroCaatNavieroService: CaatNavieroService
  ) { }

  ngOnInit(): void {


    this.formularioAgente = this.fb.group({
      tipoAgente: ['', Validators.required],
    });




    // Initialize titulo and tipoAgenteLabel if necessary
    this.titulo = 'CAAT Naviero'; // Replace with actual value or service call
    this.tipoAgenteLabel = 'Tipo de Agente'; // Replace with actual value or service call

  }

  limpiarAgente(): void {
    this.formularioAgente.patchValue({
      tipoAgente : '',
    });

    // this.formularioAgente.get('tipoAgente')?.setValue(null);
    this.formularioAgente.reset();

    console.log(this.formularioAgente.get('tipoAgente'));
  }
  conTipooAgenteData(): Catalogo[] {
    return this.tipoAgenteData.map((item) => {
      // console.log(JSON.stringify(item));
      return {
        id: item.id,
        clave: item.clave,
        descripcion: item.descripcion,
      };
    });
  }
}