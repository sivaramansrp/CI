
import { Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo } from '@libs/shared/data-access-user/src';

import { CommonModule } from '@angular/common';

import { SolicitanteComponent,TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { Tramite630104State, Tramite630104Store } from '../../../tramites/630104/estados/tramites/tramite630104.store';
import {PersonaFisicaExtranjeroComponent} from '../persona-fisica-extranjero.component/persona-fisica-extranjero.component';
import { Tramite630104Query } from '../../../tramites/630104/estados/queries/tramite630104.query';





@Component({
  selector: 'app-tipo-de-propietario',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent,PersonaFisicaExtranjeroComponent,TituloComponent,SolicitanteComponent,ReactiveFormsModule],
  templateUrl: './tipo-de-propietario.component.html',
  styleUrl: './tipo-de-propietario.component.scss',
})
export class TipoDePropietarioComponent implements OnInit {

  @Input() tiposSolicitud: Catalogo[] = [];

  @Input() tiposSolicitudNoOptions: Catalogo[] = [];

  formSolicitud!: FormGroup;
   public tramite630104State!: Tramite630104State;
   public tramite630104Store = Tramite630104Store
     private destroyed$ = new Subject<void>();
     public propietarioOptionsForm: boolean | undefined;

     public propietarioOptionsNoForm: boolean | undefined;
    /**
   * Evento que se emite para establecer valores en el formulario.
   */
    @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string}>();
  

constructor(private fb: FormBuilder, private tramite630104Query: Tramite630104Query) { }
  //
  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y crea el formulario de solicitud.
   */

 ngOnInit(): void {
    this.tramite630104Query
      .select()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.tramite630104State = state;
      });
    this.createFormSolicitud();
   
  }

 createFormSolicitud(): void {
    this.formSolicitud = this.fb.group({
      esConsultaRep: [this.tramite630104State?.esConsultaRep || '', Validators.required],
      esExtranjero: [this.tramite630104State?.esExtranjero || '', Validators.required],
    });
  }

  /**
   * Evento que se emite cuando se selecciona un banco.
   */
    @Output() settipoSolicitudSeleccionEvent = new EventEmitter<Catalogo>();

   /**
   * Método que emite un evento para establecer valores en el formulario.
   * Formulario reactivo.
   * Nombre del campo que se va a actualizar.
   * Nombre del método asociado al cambio.
   */
   setValoresStore(form: FormGroup, campo: string): void {
    if (this.formSolicitud) {
      this.setValoresStoreEvent.emit({ form: this.formSolicitud, campo });
      }
      if(this.tramite630104State.esConsultaRep === 'Si'){
        this.propietarioOptionsForm = true;
        
      }else if(this.tramite630104State.esConsultaRep === 'No'){
        this.propietarioOptionsForm = false;
        
      }
  }
  
  setValoresStoreForNoOption(form: FormGroup, campo: string): void {
    if (this.formSolicitud) {
      this.setValoresStoreEvent.emit({ form: this.formSolicitud, campo });
      }
      if(this.tramite630104State.esExtranjero === 'Persona Fisica Extranjero'){
        this.propietarioOptionsNoForm = true;
        
      }else if(this.tramite630104State.esExtranjero === 'Persona Fisica Extranjero 1'){
        this.propietarioOptionsForm = false;
        
      }
    }
}
