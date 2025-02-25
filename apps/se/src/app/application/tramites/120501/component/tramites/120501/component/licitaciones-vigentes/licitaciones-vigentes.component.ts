import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, Catalogo, DatosPasos, ListaPasosWizard, PASOS, TableData, WizardComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

import { LicitacionesDisponiblesService } from 'libs/shared/data-access-user/src/core/services/120501/licitaciones-disponibles.service';

import { Subject, takeUntil } from 'rxjs';

//import { DatosPasos } from '@ng-mf/data-access-user';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-licitaciones-vigentes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TableComponent, CatalogoSelectComponent, BtnContinuarComponent,AlertComponent],
  templateUrl: './licitaciones-vigentes.component.html',
  styleUrls: ['./licitaciones-vigentes.component.scss'],
})
export class LicitacionesVigentesComponent implements OnInit, OnDestroy {
  tableHeaderData: string[] = [];
  tableBodyData: { tbodyData: string[] }[] = [];
  enableScrollbar: boolean = false;
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;
  tableoptions = {
    checkbox : false
  };
  texto: string = 'La solicitud ha quedado registrada con el número temporal 202758644. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  // public getEstablecimientoTableData = licitacionesDisponibles;
  formForTotalCount: FormGroup;
  formulario: FormGroup;
  detalledelalicitacionForm!: FormGroup;
  adquiriente:FormGroup;
  federalentity!: Catalogo[];
  representationfederal!: Catalogo[];
  public tableData!: TableData;
  private destroyed$ = new Subject<void>();
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
  constructor(private service:LicitacionesDisponiblesService,private fb: FormBuilder) {
    this.formForTotalCount = this.fb.group({})
    this.formulario = this.fb.group({
      federalentity: [null, Validators.required],
      representationfederal: [null, Validators.required],
    });
    this.detalledelalicitacionForm = this.fb.group({
      numeradelicitacion: [null, Validators.required],
      biddingeventdate: [null, Validators.required],
      productdescription:[null, Validators.required],
      tariffunit:[null, Validators.required],
      customsregime: [null, Validators.required],
      tarifffraction: [null, Validators.required],
      quotaeffectivedate: [null, Validators.required],
      quotaenddate:[null, Validators.required],
      observaciones: [null, Validators.required],
      bloquecomercial: [null, Validators.required],
      Paises: [null, Validators.required],
      montoadjudicado: [null, Validators.required],
      montodisponible: [null, Validators.required],
      montomaximo: [null, Validators.required],
    })
    this.adquiriente = this.fb.group({
      rfc: [''],
      montodisponible: [''],
      montorecibir: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.formularioTotalCount();
    this.actualizarRecuentoTotalDeFilas();

    this.service.getData().pipe(takeUntil(this.destroyed$)
    ).subscribe(
      (data: TableData) => {
        this.tableData = data;
        console.log("table data",this.tableData)
      }
    );

    this.entidadFederativa();
    this.representacionFederal();
}

  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
    });
  }
  public actualizarRecuentoTotalDeFilas(): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const totalRowCount = this.tableBodyData.length;
    this.formForTotalCount.patchValue({ recuentoTotalDeFilas: totalRowCount });
  }

  entidadFederativa(): void {
  this.service.getEntidadfederativa().subscribe((response) => {
    if(response){
      this.federalentity = response.data;
    }
  }
  );
}

representacionFederal(): void {
  this.service.getRepresentacionfederal().subscribe((response) => {
    if(response){
      this.representationfederal = response.data;
    }
  }
  );
}
isInvalid(id: string): boolean | null {
  const CONTROL = this.adquiriente.get(id);
  return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
}
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // getValorIndice(e: AccionBoton) {
  //   if (e.valor > 0 && e.valor < 5) {
  //     this.indice = e.valor;
  //     if (this.wizardComponent) {
  //       if (e.accion === 'cont') {
  //         this.wizardComponent.siguiente();
  //       } else {
  //         this.wizardComponent.atras();
  //       }
  //     } else {
  //       console.error('wizardComponent is not initialized');
  //     }
  //   }
  // }
}