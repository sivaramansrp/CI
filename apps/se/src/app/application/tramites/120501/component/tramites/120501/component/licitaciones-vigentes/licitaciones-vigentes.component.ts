import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, Catalogo, ListaPasosWizard, PASOS, TableData } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { TableComponent } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

import { LicitacionesDisponiblesService } from 'libs/shared/data-access-user/src/core/services/120501/licitaciones-disponibles.service';

import { Subject, takeUntil } from 'rxjs';

//import { DatosPasos } from '@ng-mf/data-access-user';



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
  // datosPasos: DatosPasos = {
  //   nroPasos: this.pasos.length,
  //   indice: this.indice,
  //   txtBtnAnt: 'Anterior',
  //   txtBtnSig: 'Continuar',
  // };
  // public getEstablecimientoTableData = licitacionesDisponibles;
  formForTotalCount: FormGroup;
  formulario: FormGroup;
  detalledelalicitacionForm!: FormGroup;
  adquiriente:FormGroup;
  federalentity!: Catalogo[];
  representationfederal!: Catalogo[];
  public tableData!: TableData;
  private destroyed$ = new Subject<void>();

  constructor(private service:LicitacionesDisponiblesService,private fb: FormBuilder) {
    this.formForTotalCount = this.fb.group({})
    this.formulario = this.fb.group({
      federalentity: [null, Validators.required],
      representationfederal: [null, Validators.required],
    });
    this.detalledelalicitacionForm = this.fb.group({
      numeradelicitacion: [''],
      biddingeventdate: [''],
      productdescription:[''],
      tariffunit: [''],
      customsregime: [''],
      tarifffraction: [''],
      quotaeffectivedate: [''],
      quotaenddate: [''],
      observaciones: [''],
      bloquecomercial: [''],
      Paises: [''],
      montoadjudicado: [''],
      montodisponible: [''],
      montomaximo: [''],
    })
    this.adquiriente = this.fb.group({
      rfc: [''],
      montodisponible: [''],
      montorecibir: [''],
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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}