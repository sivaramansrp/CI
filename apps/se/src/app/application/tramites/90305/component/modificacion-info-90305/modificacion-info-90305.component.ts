/**
 * compo doc
 * @component ModificacionInfo90305Component
 * @description
 * Este componente muestra información sobre la modificación de Prosec.
 * Obtiene los datos desde `ProsecModificacionServiceTsService` y los presenta en un formulario.
 */
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';


import { Subject } from 'rxjs';

import { map, takeUntil } from 'rxjs/operators';
import { ProsecModificacionServiceTsService } from '../../services/prosec-modificacion.service';

import { Tramite90305State, Tramite90305Store } from '../../estados/tramite90305.store';
import { Tramite90305Query } from '../../estados/tramite90305.query';

/**
 * selector app-modificacion-info-90305
 * @standalone true
 */
@Component({
  selector: 'app-modificacion-info-90305',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modificacion-info-90305.component.html',
  styleUrl: './modificacion-info-90305.component.scss',
})
export class ModificacionInfo90305Component implements OnInit, OnDestroy {
  /** Bandera de solo lectura (puedes adaptarla si tienes lógica para esto) */
  public esFormularioSoloLectura: boolean = false;
      /**
     * Estado de la solicitud de la sección.
     */
    public solicitudState!: Tramite90305State;
  /** Formulario de modificación de información */
  modificationInfoForm!: FormGroup;
  /** Subject para manejar la destrucción del componente y evitar fugas de memoria */
  private destroyed$ = new Subject<void>();

  /**
   * constructor
   * @param {FormBuilder} fb - Constructor del formulario
   * @param {ProsecModificacionServiceTsService} modificaaionInfo - Servicio para obtener la información de modificación
   */
  constructor(
    private fb: FormBuilder,
    private modificaaionInfo: ProsecModificacionServiceTsService,
    private tramite90305Store: Tramite90305Store,
    private tramite90305Query: Tramite90305Query,
      private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
       .pipe(
         takeUntil(this.destroyed$),
         map((seccionState)=>{
           this.esFormularioSoloLectura = seccionState.readonly; 
       
         })
       )
       .subscribe()
  }

  /** Método del ciclo de vida de Angular - se ejecuta al destruir el componente */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /** Método del ciclo de vida de Angular - inicializa el formulario y carga la información */
  ngOnInit(): void {
   
   this.inicializarFormulario();
    this.modificationInfoForm = this.fb.group({
      registroFederalContribuyentes: [{ value: this.solicitudState?.registroFederalContribuyentes,disabled: false }],
      representacionFederal: [{ value: this.solicitudState?.representacionFederal,disabled: false }],
      tipoModificacion: [{ value: this.solicitudState?.tipoModificacion,disabled: false }],
      modificacionPrograma: [{ value: this.solicitudState?.modificacionPrograma,disabled: false }],
    });
      if (this.esFormularioSoloLectura) {
      this.modificationInfoForm.disable();
    }
  }
  /**
   * Inicializa el formulario con los valores de la solicitud.
   */
  inicializarFormulario(): void {
      this.tramite90305Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe();
        
    }
   


  /**
   * Carga la información de modificación desde el servicio y actualiza el formulario
   */
  loadInfo() :void{
    this.modificaaionInfo
      .getModoficacionInfo()
      .subscribe((data) => {
        this.modificationInfoForm.patchValue({
          registroFederalContribuyentes: data.registroFederalContribuyentes,
          representacionFederal: data.representacionFederal,
          tipoModificacion: data.tipoModificacion,
          modificacionPrograma: data.modificacionPrograma,
        });
      });
  }
  /**
   *
   */
   onControlChange(controlName: string): void {
    const UPDATED_VALUE = { [controlName]: this.modificationInfoForm.get(controlName)?.value };
    this.tramite90305Store.update(UPDATED_VALUE);
  }
}
