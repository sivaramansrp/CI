import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agente } from '@ng-mf/data-access-user';
import { TEXTOS_303 } from '@ng-mf/data-access-user';

@Component({
  selector: 'agentes-agencias-aduanales',
  templateUrl: './agentes-agencias-aduanales.component.html',
  styleUrl: './agentes-agencias-aduanales.component.scss'
})
export class AgentesAgenciasAduanalesComponent {
  TEXTOS = TEXTOS_303;
  modal: string = 'modal';
  agentes: Array<Agente> = [];
  @ViewChild('modalAddAgent') modalElement!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  formAgente: FormGroup = this.fb.group({
      nombres: ['', [Validators.required]],
      segundoApellido:['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      tipoFigura: ['', [Validators.required]],
      patenteAutorizacion: ['', [Validators.required]],
      se: ['', [Validators.required]],

  });
  constructor(private fb: FormBuilder,
  ) {}

  abrirModal(): void {
    this.modal = 'show';
  }

  cerrarModal(): void { 
    this.closeModal.nativeElement.click();
    
  }

  agregarAgente(): void {
    if(!this.formAgente.valid) {
      return;
    }
    const AGENTE = this.formAgente.value;
    this.agentes.push(AGENTE);
    this.formAgente.reset();
    this.cerrarModal();
  }
}