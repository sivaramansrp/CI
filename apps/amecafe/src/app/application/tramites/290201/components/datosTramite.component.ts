import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Catalogo, CatalogosSelect, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudService } from '../services/registrar-solicitud.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TableComponent } from '@libs/shared/data-access-user/src';
import { DatosDelCafeComponent } from './datos-del-cafe/datos-del-cafe.component';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud/datos-de-la-solicitud.component';
import { Solicitud290201State,Solicitud290201Store } from '../../../estados/tramites/tramites290201.store';
import { Solicitud290201Query } from '../../../estados/queries/tramites290201.query'; 
import { from } from 'rxjs';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-tramite',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent,TableComponent,DatosDelCafeComponent,DatosDeLaSolicitudComponent],
  templateUrl: './datosTramite.component.html',
  styleUrl: './datosTramite.component.scss',
})
export class DatosTramiteComponent implements OnDestroy, OnInit {
  informationCafeForm!: FormGroup;
  public informationCafeState!: Solicitud290201State;
  tableData = {
    tableBody: [],
    tableHeader: [],
  };
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private destroyNotifier$: Subject<void> = new Subject();
  public tiposData: CatalogosSelect = {
    labelNombre: 'Tipos',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public formasdelcafeData: CatalogosSelect = {
    labelNombre: 'Formas del cafe',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public calidadData: CatalogosSelect = {
    labelNombre: 'Calidad',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public procesosData: CatalogosSelect = {
    labelNombre: 'Procesos',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public certificationsData: CatalogosSelect = {
    labelNombre: 'Cerfticiones',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  public adunadesalidaData: CatalogosSelect = {
    labelNombre: 'Aduna de salida',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public paisdestinoData: CatalogosSelect = {
    labelNombre: 'Paid destino',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public entidaddeprocedenciaData: CatalogosSelect = {
    labelNombre: 'Entidad de procedencia',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  public ciclocafetaleroData: CatalogosSelect = {
    labelNombre: 'Ciclo cafetalero',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  constructor(
    private registrarsolicitud: RegistrarSolicitudService,
    private fb: FormBuilder,
    private solicitud290201Store: Solicitud290201Store,
          private solicitud290201Query: Solicitud290201Query,
  ){
    
  }
createForm(){
  this.informationCafeForm = this.fb.group({
    datosDelTramiteRealizar: this.fb.group({
    formasdelcafe: [this.informationCafeState?.formasdelcafe, Validators.required],
     tipos:[this.informationCafeState?.tipos,Validators.required],
     calidad:[this.informationCafeState?.calidad,Validators.required],
     procesos:[this.informationCafeState?.procesos,Validators.required],
     certifications:[this.informationCafeState?.certifications,Validators.required],
     adunadesalida:[this.informationCafeState?.adunadesalida,Validators.required],
     paisdestino:[this.informationCafeState?.paisdestino,Validators.required],
     entidaddeprocedencia: [this.informationCafeState?.entidaddeprocedencia, Validators.required],
    ciclocafetalero:[this.informationCafeState?.ciclocafetalero,Validators.required],
})
})
}
  ngOnInit(): void {
    this.solicitud290201Query.selectSolicitud$.pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              console.log('seccionState:', seccionState); // Debug log
              this.informationCafeState = seccionState
            })
          )
          .subscribe();
          this.createForm();
    this.getTiposData();
    this.getFormasdelcafeData();
    this.getCalidadData();
    this.getProcesosData();
    this.getAduanadesalidaData();
    this.getEntidadDeProcedenciaData();
    this.getCiclocafetaleroData();
  }
  getTiposData(){
    this.registrarsolicitud.getTiposData()
    .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
      this.tiposData.catalogos = data as Catalogo[];
    })
  }
  getFormasdelcafeData(){
    this.registrarsolicitud.getFormasdelcafeData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.formasdelcafeData.catalogos = data as Catalogo[];
    })
  }

getCalidadData(){
  this.registrarsolicitud.getCalidadData()
  .pipe(takeUntil(this.destroyed$))
  .subscribe((data) => {
    this.calidadData.catalogos = data as Catalogo[];
  })
}
getProcesosData(){
  this.registrarsolicitud.getProcesosData()
  .pipe(takeUntil(this.destroyed$))
  .subscribe((data) => {
    this.procesosData.catalogos = data as Catalogo[];
  })
}
getAduanadesalidaData(){
  this.registrarsolicitud.getAduanadesalidaData()
  .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
    this.adunadesalidaData.catalogos = data as Catalogo[];
  })
}
getEntidadDeProcedenciaData(){
  this.registrarsolicitud.getEntidadDeProcedenciaData()
  .pipe(takeUntil(this.destroyed$))
  .subscribe((data) => {
    this.entidaddeprocedenciaData.catalogos = data as Catalogo[];
  })
}
getCiclocafetaleroData(){
  this.registrarsolicitud.getCiclocafetaleroData()
  .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
    this.ciclocafetaleroData.catalogos = data as Catalogo[];
  })
}

get datosDelTramiteRealizar(): FormGroup {
  return this.informationCafeForm.get('datosDelTramiteRealizar') as FormGroup;
}

 setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud290201Store): void {
        const VALOR = form.get(campo)?.value;
        (this.solicitud290201Store[metodoNombre] as (value: any) => void)(VALOR);
      }

      ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
      }
}
