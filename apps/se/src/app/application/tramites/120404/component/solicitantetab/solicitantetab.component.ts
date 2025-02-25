import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent, AlertComponent, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
// import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { SolicitanteasigncionserviceService } from 'libs/shared/data-access-user/src/core/services/120404/solicitanteasigncionservice.service';
import { AsignacionData } from 'libs/shared/data-access-user/src/core/models/120404/asignacionmodel';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-solicitantetab',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent,ReactiveFormsModule,BtnContinuarComponent],
  templateUrl: './solicitantetab.component.html',
  styleUrl: './solicitantetab.component.scss',
})
export class SolicitantetabComponent implements OnInit, OnDestroy {

   formasignacion!:FormGroup;
   private destroyed$ = new Subject<void>();
    texto: string = 'La solitud ha quedado registrada con el número de expediente 202758350.Esto no tiene validez legal sirve solamente para efectos de identifier tu solitud.Uno folio le sera asignado a la solitud al momento en que sta sea firmada.';
    indice: number = 1;
    pasos: ListaPasosWizard[] = PASOS;
    constructor( private fb:FormBuilder,private service:SolicitanteasigncionserviceService) { }
    @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
    datosPasos: DatosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };

    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }

    ngOnInit(): void {
      this.initForm();
      this.loadAsignacionData();
    }
  
    initForm(): void {
      this.formasignacion = this.fb.group({
        especie: [{ value: '', disabled: true }],
        funcionZootecnica: [{ value: '', disabled: true }],       
        authorizado: [{ value: '', disabled: true }],
        expendido: [{ value: '', disabled: true }],
        disponible: [{ value: '', disabled: true }],
        ampliar: [{ value: '', disabled: true }],
      });
    }

loadAsignacionData():void{
      this.service.getAsigncionsolicitante().pipe(
        takeUntil(this.destroyed$)
       ).subscribe(
        (data:any)=>{
          this.formasignacion.patchValue({
            especie:data.especie,
            funcionZootecnica:data.funcionZootecnica,
            authorizado:data.authorizado,
            expendido:data.expendido,
            disponible:data.disponible,
            ampliar:data.ampliar,
          })
        })
      }
  
    enviarFormulario(): void {
      if (this.formasignacion.valid) {
        console.log('Formulario de asignación enviado:', this.formasignacion.value);
      } else {
        console.log('Formulario no válido');
      }
    }
}
