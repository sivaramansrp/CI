import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Catalogo, ConfiguracionColumna, MENSAJEDEALERTA, TituloComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { PermisoModel } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExportacionService } from '../../services/exportacion.service';

import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { Tramites260604Store, solicitud260604State } from '../../../shared/estados/stores/tramites260604.store';

import { Tramites260604Query } from '../../../shared/estados/queries/tramites260604.query';

@Component({
  selector: 'app-terceros-relacionado',
  standalone: true,
  imports: [CommonModule,AlertComponent , TituloComponent,TablaDinamicaComponent,CatalogoSelectComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './tercerosRelacionado.component.html',
  styleUrl: './tercerosRelacionado.component.css',
})
export class TercerosRelacionadoComponent implements OnInit, OnDestroy {
 
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: solicitud260604State;
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
  private service: ExportacionService,
  private tramites260604Store: Tramites260604Store,
  private tramites260604Query: Tramites260604Query,){
    //constructor
  }

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

    this.tramites260604Query.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState;
            })
          )
          .subscribe();
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

  abrirModalfacurator(): void {
    this.modal = 'show';
  this.getFacturator()
  }

  getFacturator(): void {
    this.facturatorForm = this.fb.group({
      tipoPersona: ['fisica', Validators.required], // Default to "fisica"
      nombre: [ this.solicitudState?.nombre || '', [Validators.required]],
      apellidoPrimer: [ this.solicitudState?.apellidoPrimer || '', Validators.required],
      apellidoSegundo: [this.solicitudState?.apellidoSegundo || ''],
      denominacionRazonSocial:[this.solicitudState?.denominacionRazonSocial || '',[Validators.maxLength(254)]],
      selectPais: ['', Validators.required],
      estadoLocalidad: [this.solicitudState?.estadoLocalidad ||'', Validators.required],
      codPostal1: [this.solicitudState?.codPostal1 ||''],
      coloniaEquiv: [this.solicitudState?.coloniaEquiv ||''],
      calle: [this.solicitudState?.calle ||'', [Validators.maxLength(300)]],
      numExterior: [this.solicitudState?.numExterior ||'',[Validators.maxLength(55)]],
      numInterior: [this.solicitudState?.numInterior ||'',[Validators.maxLength(55)]],
      lada: [this.solicitudState?.lada ||'', [Validators.maxLength(5)]],
      telefono: [this.solicitudState?.telefono ||''],
      correoElectronico: [this.solicitudState?.telefono ||'', [Validators.required, Validators.email]],
    });
  

// Listen for changes to "tipoPersona" and update field visibility
this.facturatorForm.get('tipoPersona')?.valueChanges.subscribe((value) => {
  if (value === 'fisica') {
    // Show all fields except "destinatariodenominacion"
    this.facturatorForm.get('nombres')?.setValidators(Validators.required);
    this.facturatorForm.get('facturatorapellido')?.setValidators(Validators.required);
    this.facturatorForm.get('facturatorsapellido')?.setValidators(null);
    this.facturatorForm.get('destinatariodenominacion')?.clearValidators();
  } else if (value === 'moral') {
    // Show "destinatariodenominacion" and hide "nombres", "facturatorapellido", "facturatorsapellido"
    this.facturatorForm.get('nombres')?.clearValidators();
    this.facturatorForm.get('facturatorapellido')?.clearValidators();
    this.facturatorForm.get('facturatorsapellido')?.clearValidators();
    this.facturatorForm.get('destinatariodenominacion')?.setValidators(Validators.required);
  }

  // Update the validity of the fields
  this.facturatorForm.get('nombres')?.updateValueAndValidity();
  this.facturatorForm.get('facturatorapellido')?.updateValueAndValidity();
  this.facturatorForm.get('facturatorsapellido')?.updateValueAndValidity();
  this.facturatorForm.get('destinatariodenominacion')?.updateValueAndValidity();
});
}

 // eslint-disable-next-line class-methods-use-this
 isValid(form: FormGroup, field: string): boolean {
    return form.controls[field].invalid && (form.controls[field].dirty || form.controls[field].touched);
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramites260604Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramites260604Store [metodoNombre] as (value: string) => void)(VALOR);
  }

 
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    
  }

}
