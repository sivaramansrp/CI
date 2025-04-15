import { AlertComponent, InputCheckComponent,TituloComponent } from "@ng-mf/data-access-user";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CommonModule } from '@angular/common';
import { TipoDevAviso } from '../../models/avisomodify.model';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
@Component({
  selector: 'app-tipo-de-aviso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, AlertComponent, InputCheckComponent],
  templateUrl: './tipoDeAviso.component.html',
})
export class TipoDeAvisoComponent implements OnInit, OnDestroy{
  miFormulario!: FormGroup;
  tipoDevAviso!:TipoDevAviso
  @Output() tabEnabledData = new EventEmitter<TipoDevAviso>();
  isDisabled:boolean = false

  modalidadCertificacion!:TipoDevAviso
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private fb: FormBuilder,
    private AvisoModifyService: AvisoModifyService,
    private store: Tramite32301Store,
    private Tramite32301Query:Tramite32301Query
  ) {
   this.crearFormMiFormulario();
  }

  ngOnInit(): void {
      this.inicializamiFormulario();
      this.Tramite32301Query.select()
        .pipe(takeUntil(this.destroy$))
        .subscribe(state => {
          this.tipoDevAviso = state as unknown as TipoDevAviso;
          this.crearFormMiFormulario();
        });
    }

    inicializamiFormulario():void{
     this.AvisoModifyService
            .getAvisoModify()
            .pipe(
              map((resp) => {
                this.store.setModalidadCertificacion(resp.descripcion);
              })
            ).subscribe();
            

    }
    crearFormMiFormulario():void{
      this.miFormulario = this.fb.group({
        modalidadCertificacion: [{ value: this.tipoDevAviso?.modalidadCertificacion, disabled: true }],
        foreignClientsSuppliers: [this.tipoDevAviso?.foreignClientsSuppliers],
        nationalSuppliers: [this.tipoDevAviso?.nationalSuppliers],
        modificationsMembers: [this.tipoDevAviso?.modificationsMembers],
        changesToLegalDocuments: [this.tipoDevAviso?.changesToLegalDocuments],
        mergerOrSplitNotice: [this.tipoDevAviso?.mergerOrSplitNotice],
        additionFractions: [this.tipoDevAviso?.additionFractions],
        acepto253:[this.tipoDevAviso?.acepto253, Validators.required]
      });
    }
  onSubmit():void {
    this.tabEnabledData.emit(this.miFormulario.value)
  }  

  setforeignClientsSuppliers(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get('foreignClientsSuppliers')?.value;
    this.store.setforeignClientsSuppliers(FRACCION_ARANCELATIA);
  }

  setNationalSuppliers(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get('nationalSuppliers')?.value;
    this.store.setNationalSuppliers(FRACCION_ARANCELATIA);
  }

  setModificationsMembers(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get('modificationsMembers')?.value;
    this.store.setModificationsMembers(FRACCION_ARANCELATIA);
  }

  setChangesToLegalDocuments(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get('changesToLegalDocuments')?.value;
    this.store.setChangesToLegalDocuments(FRACCION_ARANCELATIA);
  }

  setMergerOrSplitNotice(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get('mergerOrSplitNotice')?.value;
    this.store.setMergerOrSplitNotice(FRACCION_ARANCELATIA);
  }

  setAdditionFractions(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get('additionFractions')?.value;
    this.store.setAdditionFractions(FRACCION_ARANCELATIA);
  }
  setAcepto253(): void {
    const FRACCION_ARANCELATIA = this.miFormulario.get('acepto253')?.value;
    this.store.setAcepto253(FRACCION_ARANCELATIA);
  }
  


  handleValores():void {
    this.tabEnabledData.emit()
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
