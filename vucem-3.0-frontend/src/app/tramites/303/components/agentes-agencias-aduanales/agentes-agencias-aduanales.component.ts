import { Component, ElementRef, ViewChild } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/303/texto.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agente } from '../../../../core/models/303/secciones.model';
import { ToastrService } from 'ngx-toastr';
declare const bootstrap: any; 
@Component({
  selector: 'agentes-agencias-aduanales',
  templateUrl: './agentes-agencias-aduanales.component.html',
  styleUrl: './agentes-agencias-aduanales.component.scss'
})
export class AgentesAgenciasAduanalesComponent {
  TEXTOS = TEXTOS;
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
    private toastr: ToastrService,
  ) {}

  abrirModal() {
    this.modal = 'show';
  }

  cerrarModal() { 
    this.closeModal.nativeElement.click();
    
  }

  agregarAgente() {
    if(!this.formAgente.valid) {
      return;
    }
    const agente = this.formAgente.value;
    this.agentes.push(agente);
    this.formAgente.reset();
    this.cerrarModal();
  }
}