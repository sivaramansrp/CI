/**
 * compo doc
 * @component ModificacionInfo90305Component
 * @description
 * Este componente muestra información sobre la modificación de Prosec.
 * Obtiene los datos desde `ProsecModificacionServiceTsService` y los presenta en un formulario.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { ProsecModificacionServiceTsService } from '../../services/prosec-modificacion.service.ts.service';



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
    private modificaaionInfo: ProsecModificacionServiceTsService
  ) {
    //construstor
  }

  /** Método del ciclo de vida de Angular - se ejecuta al destruir el componente */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /** Método del ciclo de vida de Angular - inicializa el formulario y carga la información */
  ngOnInit() {
    this.loadInfo();
    this.modificationInfoForm = this.fb.group({
      registroFederalContribuyentes: [{ value: '', disabled: true }],
      representacionFederal: [{ value: '', disabled: true }],
      tipoModificacion: [{ value: '', disabled: true }],
      modificacionPrograma: [{ value: '', disabled: true }],
    });
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
}
