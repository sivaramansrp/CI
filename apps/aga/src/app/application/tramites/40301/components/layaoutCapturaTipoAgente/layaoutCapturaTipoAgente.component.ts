import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LayaoutCapturaTipoAgenteService } from '../../services/layaoutCapturaTipoAgente.service';

@Component({
  selector: 'app-layaout-captura-tipo-agente',
  templateUrl: './layaoutCapturaTipoAgente.component.html',
  styleUrls: ['./layaoutCapturaTipoAgente.component.scss']
})
export class LayaoutCapturaTipoAgenteComponent implements OnInit {
  titulo: string = '';
  tipoAgenteLabel: string = "";
  solicitud: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    // private layaoutCapturaTipoAgenteService: LayaoutCapturaTipoAgenteService
  ) {}

  ngOnInit(): void {
    this.solicitud = this.fb.group({
      solicitante: this.fb.group({
        tipoAgente: ['', Validators.required]
      })
    });

    // Initialize titulo and tipoAgenteLabel if necessary
    this.titulo = 'CAAT Naviero'; // Replace with actual value or service call
    this.tipoAgenteLabel = 'Tipo de Agente'; // Replace with actual value or service call

    
  }

  limpiarAgente(): void {
    this.solicitud.reset();
  }
}
