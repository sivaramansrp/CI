import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RADIO_OPCIONS } from '../../constants/constante110102.enums';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-exportador-autorizado',
  standalone: true,
  imports: [CommonModule, TituloComponent, TooltipModule, ReactiveFormsModule],
  templateUrl: './exportador-autorizado.component.html',
  styleUrls: ['./exportador-autorizado.component.scss']
})
export class ExportadorAutorizadoComponent implements OnInit{

  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   *
   * @property {FormGroup} formularioExportadorAutorizado - El formulario del componente.
   */
  public formularioExportadorAutorizado!: FormGroup;

  /**
   * Opciones disponibles para el grupo de radio.
   * 
   */
  public radioOpcions = RADIO_OPCIONS;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * @description Constructor del componente
   * @param fb 
   */
  constructor(private fb: FormBuilder,
  ){}

  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo del componente con los valores por defecto
   */
  public inicializarFormulario(): void {
    this.formularioExportadorAutorizado = this.fb.group({
      informacionRadios: [],
      exportadorAutorizado: []
    });
  }
}
