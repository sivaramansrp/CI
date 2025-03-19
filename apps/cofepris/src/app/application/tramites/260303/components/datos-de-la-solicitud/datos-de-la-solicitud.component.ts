/* eslint-disable class-methods-use-this */
/* eslint-disable sort-imports */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ScianDatos, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit {

  modalRef?: BsModalRef;
  public esModalCerrado: boolean = false;
  public denominacionForm!: FormGroup;
  public estadoCatalogo!: Catalogo[];
  public scianTablaDatos: ScianDatos[] = [];
  public checkbox = TablaSeleccion.CHECKBOX;
  public claveCatalogo!: Catalogo[];
  public regimenCatalogo!: Catalogo[];

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<ScianDatos>[] = [
    { encabezado: 'Clave S.C.I.A.N', clave: (item: ScianDatos) => item.clave, orden: 1 },
    { encabezado: 'Descripción del S.C.I.A.N', clave: (item: ScianDatos) => item.descripcion, orden: 2 }
  ];


constructor(
  private modalService: BsModalService,
  private fb: FormBuilder,
  private certificadosLicenciasSvc: CertificadosLicenciasPermisosService
) {
  //
}

ngOnInit(): void {
  this.getDenominacionForm();
  this.getEstadoCatalogDatos();
  this.getscianTabla();
  this.getClaveCatalogDatos();
  this.getRegimenCatalogDatos();
}

  /**
   * Crea una copia profunda del objeto proporcionado.
   * 
   * Este método serializa el objeto a una cadena JSON y luego lo analiza de nuevo a un nuevo objeto,
   * creando efectivamente una copia profunda. Tenga en cuenta que este enfoque puede no manejar funciones,
   * valores indefinidos o referencias circulares correctamente.
   * 
   * @param obj - El objeto que se va a copiar profundamente. Por defecto es un objeto vacío.
   * @returns Una copia profunda del objeto proporcionado.
   */
  public deepCopy(obj = {}) {
    return JSON.parse(JSON.stringify(obj));
  }


  public seleccionar(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.esModalCerrado = true;
  }

  public cerrar():void {
    this.modalRef?.hide();
    this.denominacionForm.get('denominacionRazon')?.enable();   
  }

  public getDenominacionForm(): void {
    this.denominacionForm = this.fb.group({
      denominacionRazon: [{value: '',disabled: true}]
    })
  }

  public getEstadoCatalogDatos(): void {
    this.certificadosLicenciasSvc.getEstadoDatos().subscribe((response) => {
      const DATOS = this.deepCopy(response);
      this.estadoCatalogo = DATOS.data;
    });
  }

  public getscianTabla(): void {
    this.certificadosLicenciasSvc.getScianDatos().subscribe((response) => {
      const DATOS = this.deepCopy(response);
      this.scianTablaDatos = DATOS;
    });
  }

  public getClaveCatalogDatos():void {
    this.certificadosLicenciasSvc.getClaveDatos().subscribe((response) => {
      const DATOS = this.deepCopy(response);
      this.claveCatalogo = DATOS.data;
    });
  }

  public getRegimenCatalogDatos():void {
    this.certificadosLicenciasSvc.getRegimenDatos().subscribe((response) => {
      const DATOS = this.deepCopy(response);
      this.regimenCatalogo = DATOS.data;
    });
  }

  public seleccionarAgregar(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
}
