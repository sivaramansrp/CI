import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Catalogo, ConfiguracionColumna, MENSAJEDEALERTA, TituloComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { PermisoModel } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExportacionService } from '../../services/exportacion.service';

import { Subject, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-terceros-relacionado',
  standalone: true,
  imports: [CommonModule,AlertComponent , TituloComponent,TablaDinamicaComponent,CatalogoSelectComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './tercerosRelacionado.component.html',
  styleUrl: './tercerosRelacionado.component.css',
})
export class TercerosRelacionadoComponent implements OnInit, OnDestroy {
  facturatorForm!:FormGroup;
  private destroyed$ = new Subject<void>();
  public TEXTOS = MENSAJEDEALERTA;
  public infoAlert = 'alert-info';
  public modal = 'modal';
  public localidadList!: Catalogo[];
  TablaSeleccion = TablaSeleccion;
  tercerosProd: PermisoModel[] = [];
  tableHeaderData: string[] = ['Nombre/denominacion o razon social', 'RFC', 'CURP', 'Telefono', 'Correo electronico', 'Calle', 'Numero exterior', 'Numero interior','pais', 'Colonia','Municipio o alcaldia','Localidad','Entidad federrative', 'Estado/localidad','Codigo postal'];
  constructor(private fb: FormBuilder,
  private service: ExportacionService){}

  @ViewChild('closeModal') closeModal!: ElementRef;

  configuracionTabla: ConfiguracionColumna<PermisoModel>[] = [
    { encabezado: 'Nombre/denominacion o razon social', clave: (item: PermisoModel) => item.Nombre, orden: 1 },
    { encabezado: 'RFC', clave: (item: PermisoModel) => item.RFC, orden: 2 },
    { encabezado: 'CURP', clave: (item: PermisoModel) => item.CURP, orden: 3 },
    { encabezado: 'Telefono', clave: (item: PermisoModel) => item.Teléfono, orden: 4 },
    { encabezado: 'Correo electronico', clave: (item: PermisoModel) => item.CorreoElectrónico, orden: 5 },
    { encabezado: 'Calle', clave: (item: PermisoModel) => item.calle, orden: 6 },
    { encabezado: 'numeroExterior', clave: (item: PermisoModel) => item.numeroExterior, orden: 7 },
    { encabezado: 'numeroInterior', clave: (item: PermisoModel) => item.numeroInterior, orden: 8 },
    { encabezado: 'pais', clave: (item: PermisoModel) => item.calle, orden: 9 },
    { encabezado: 'colonia', clave: (item: PermisoModel) => item.colonia, orden: 10 },
    { encabezado: 'municipio', clave: (item: PermisoModel) => item.municipio, orden: 11 },
    { encabezado: 'localidad', clave: (item: PermisoModel) => item.localidad, orden: 12 },
    { encabezado: 'entidadFederativa', clave: (item: PermisoModel) => item.entidadFederativa, orden: 13 },
    { encabezado: 'estadoLocalidad', clave: (item: PermisoModel) => item.estadoLocalidad, orden: 14 },
    { encabezado: 'codigoPostal', clave: (item: PermisoModel) => item.codigoPostal, orden: 15 },
  ];

  ngOnInit(): void {
    this.loadMercancias();
    this.loadLocalidad();
    this. getFacturator();
  }

  loadMercancias(): void {
    this.service.getTable()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tercerosProd = resp;
      });
  }

  loadLocalidad(): void {
    this.service.getLocalidaddata()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.localidadList = data as Catalogo[];
      });
  }

  abrirModalfacurator(){
    this.modal = 'show';
  this.getFacturator()
  }

  getFacturator(): void {
    this.facturatorForm = this.fb.group({
      facturatorfisica: ['', Validators.required],
      facturatormoral: ['', Validators.required],
      nombres: ['', Validators.required],
      facturatorapellido: ['', Validators.required],
      facturatorsapellido: [''],
      destinatariodenominacion:['',Validators.required],
      facturatorcpail: ['', Validators.required],
      facturatorestado: ['', Validators.required],
      facturatorcp: [''],
      facturatorequivalente: [''],
      facturatorcalle: ['', Validators.required],
      facturatorexperior: ['', Validators.required],
      facturatorinterior: [''],
      facturatorlada: ['', Validators.required],
      facturatortelefono: [''],
      facturatorElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  isValid(form: FormGroup, field: string): boolean {
    return form.controls[field].invalid && (form.controls[field].dirty || form.controls[field].touched);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    
  }

}
