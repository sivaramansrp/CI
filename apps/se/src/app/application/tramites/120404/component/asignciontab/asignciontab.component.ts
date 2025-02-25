import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { inputRadioComponent } from
// import { InputRadioComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";
import { CATALOGOS_ID, Catalogo, TituloComponent } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { SolicitantetabComponent } from '../solicitantetab/solicitantetab.component';


import { InputRadioComponent } from '@ng-mf/data-access-user';

import { Subject, takeUntil } from 'rxjs';
// import { SolicitanteasigncionserviceService } from '../../services/solicitanteasigncionservice.service';
import { SolicitanteasigncionserviceService } from 'libs/shared/data-access-user/src/core/services/120404/solicitanteasigncionservice.service';

// import { InputRadioComponent } from 'libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';

@Component({
  selector: 'app-asignciontab',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent,SolicitantetabComponent,InputRadioComponent],

  templateUrl: './asignciontab.component.html',
  styleUrl: './asignciontab.component.scss',
})
export class AsignciontabComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  asignacionForm!: FormGroup;
  selectedAsigncion: string | number = '';
  selectedValue: string = 'no';
asigncionRadio = [
    
    {
      "label": "Amplicacion de monto",
      "value": "yes"
    },
  ]
 
  public asigncionendid!: Catalogo[];
 
constructor(private fb: FormBuilder , private service:SolicitanteasigncionserviceService) { }

  ngOnInit(): void {
    this.initForm();
this. loadComboUnidadMedida();
}

  initForm(): void {
    this.asignacionForm = this.fb.group({
      datosRegimen: this.fb.group({
        asignacionsolitud: ['', Validators.required],
        numTramite: ['', Validators.required],
        })
    });
  }

  buscar(): void {
    if (this.asignacionForm.valid) {
      console.log('Formulario enviado:', this.asignacionForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
 isInvalid(id: string): boolean | null {
    const CONTROL = this.asignacionForm.get('datosRegimen')?.get(id);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

    loadComboUnidadMedida(): void {
    this.service.getAsigncion().pipe(
      takeUntil(this.destroyed$) 
    ).subscribe((data): void => {
      this.asigncionendid = data as Catalogo[];
    });
  }
   ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}


