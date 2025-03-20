/* eslint-disable class-methods-use-this */
/* eslint-disable sort-imports */
import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrosslistComponent, CrossListLable, MANIFIESTOS, MercanciasDatos, ScianDatos, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { CROSLISTA_DE_PAISES, PAISES_DE_ORIGEN, USO_ESPECIFICO } from '../../services/certificados-licencias-permisos.enum';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CrosslistComponent,
    AlertComponent
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
  public mercanciasTablaDatos: MercanciasDatos[] = [];
  public tipoDeProductoCatalogo!: Catalogo[];
  public paisDeProcedenciaCatalogo!: Catalogo[];
    /**
   * Lista de componentes Crosslist disponibles en la vista.
   */
    @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

    /**
   * Lista de países para la selección de origen.
   */
    public crosListaDePaises = CROSLISTA_DE_PAISES;
    public seleccionarPais = PAISES_DE_ORIGEN;
    public seleccionarUsoEspecifico = USO_ESPECIFICO;

  /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<ScianDatos>[] = [
    { encabezado: 'Clave S.C.I.A.N', clave: (item: ScianDatos) => item.clave, orden: 1 },
    { encabezado: 'Descripción del S.C.I.A.N', clave: (item: ScianDatos) => item.descripcion, orden: 2 }
  ];

  /** Configuración de la tabla de sectores */
  public configuracionMercancias: ConfiguracionColumna<MercanciasDatos>[] = [
    { encabezado: 'Clasificación del producto', clave: (item: MercanciasDatos) => item.clasificacion, orden: 1 },
    { encabezado: 'Especificar clasificación del producto', clave: (item: MercanciasDatos) => item.especificar, orden: 2 },
    { encabezado: 'Denominación común internacional (DCI) o Denominación genérica o nombre científico', clave: (item: MercanciasDatos) => item.dci, orden: 3 },
    { encabezado: 'Denominación distintiva', clave: (item: MercanciasDatos) => item.denominacion, orden: 4 },
    { encabezado: 'Número CAS', clave: (item: MercanciasDatos) => item.numero, orden: 5 },
    { encabezado: 'Fracción arancelaria', clave: (item: MercanciasDatos) => item.fraccion, orden: 6 },
    { encabezado: 'Descripción de la fracción', clave: (item: MercanciasDatos) => item.descripcionDeLa, orden: 7 },
    { encabezado: 'Tipo de producto', clave: (item: MercanciasDatos) => item.tipoDeProducto, orden: 8 },
    { encabezado: 'Forma farmacéutica', clave: (item: MercanciasDatos) => item.formaFarmaceutica, orden: 9 },
    { encabezado: 'Cantidad UMT', clave: (item: MercanciasDatos) => item.umt, orden: 10 },
    { encabezado: 'UMC', clave: (item: MercanciasDatos) => item.umc, orden: 11 },
    { encabezado: 'Número CAS', clave: (item: MercanciasDatos) => item.numeroCas, orden: 12 },
    { encabezado: 'Cantidad de lotes', clave: (item: MercanciasDatos) => item.cantidad, orden: 13 },
    { encabezado: 'Kg o g por lote', clave: (item: MercanciasDatos) => item.kg, orden: 14 },
    { encabezado: 'País de destino', clave: (item: MercanciasDatos) => item.paisDeDestino, orden: 15 },
    { encabezado: 'País de origen', clave: (item: MercanciasDatos) => item.paisDeOrigen, orden: 16 },
    { encabezado: 'País de procedencia', clave: (item: MercanciasDatos) => item.paisDeProcedencia, orden: 17 },
    { encabezado: 'Uso especiffico', clave: (item: MercanciasDatos) => item.uso, orden: 18 },
    { encabezado: 'Detalle uso especiffico', clave: (item: MercanciasDatos) => item.detalle, orden: 19 },
    { encabezado: 'Cantidad UMC', clave: (item: MercanciasDatos) => item.cantidadUmc, orden: 20 },
    { encabezado: 'De piezas', clave: (item: MercanciasDatos) => item.dePiezas, orden: 21 },
    { encabezado: 'Descripción de piezas', clave: (item: MercanciasDatos) => item.descripcionDePiezas, orden: 22 },
    { encabezado: 'Número de registro', clave: (item: MercanciasDatos) => item.numeroDeReg, orden: 23 },
    { encabezado: 'Presentación', clave: (item: MercanciasDatos) => item.presentacion, orden: 24 },
  ];

    /**
   * Etiqueta para el crosslist de Forma farmacéutica.
   */
    public paisDeProcedenciaLabel: CrossListLable = {
      tituluDeLaIzquierda: 'Forma farmacéutica',
      derecha: 'País(es) seleccionados',
    };

    public paisDeOrigenLabel: CrossListLable = {
      tituluDeLaIzquierda: 'Pais de origen',
      derecha: 'País(es) seleccionado(s)*:',
    };

    public usoEspecificoLabel: CrossListLable = {
      tituluDeLaIzquierda: 'Uso específico',
      derecha: 'Uso(s) seleccionado(s)*:',
    }

    /**
 * Botones de acción para gestionar listas de países en la primera sección.
 */
public paisDeProcedenciaBotons = this.getCrossListBtn();
public paisDeOrigenBotons = this.getCrossListBtn();
public usoEspecificoBotons = this.getCrossListBtn();
public colapsableObj = {
  formaFarmaceuticaColapsable: false,
  paisDeOrigenColapsable: false,
  usoEspecificoColapsable: false,
};
public TEXTOS = MANIFIESTOS;


constructor(
  private modalService: BsModalService,
  private fb: FormBuilder,
  private certificadosLicenciasSvc: CertificadosLicenciasPermisosService
) {
  //
}

ngOnInit(): void {
  this.inicializarTablaYCatalogoDatos();
}

public inicializarTablaYCatalogoDatos(): void {
  this.getDenominacionForm();
  this.getEstadoCatalogDatos();
  this.getscianTabla();
  this.getClaveCatalogDatos();
  this.getRegimenCatalogDatos();
  this.getMercanciasTabla();
  this.getTipoDeProductoCatalogDatos();
  this.getPaisDeProcedenciaCatalogoDatos();
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

  public getMercanciasTabla(): void {
    this.certificadosLicenciasSvc.getMercanciasDatos().subscribe((response) => {
      const DATOS = this.deepCopy(response);
      this.mercanciasTablaDatos = DATOS;
    });
  }

  public getTipoDeProductoCatalogDatos(): void {
    this.certificadosLicenciasSvc.getTipoDeProductoDatos().subscribe((response) => {
      const DATOS = this.deepCopy(response);
      this.tipoDeProductoCatalogo = DATOS.data;
    });
  }

/**
 * Alterna el estado colapsable de la primera sección.
 */
  public mostrarColapsable(valores: string): void {
    if(valores === 'forma') {
      this.colapsableObj.formaFarmaceuticaColapsable = !this.colapsableObj.formaFarmaceuticaColapsable;
    } else if(valores === 'PaisDeOrigen') {
      this.colapsableObj.paisDeOrigenColapsable = !this.colapsableObj.paisDeOrigenColapsable;
    } else if(valores === 'usoEspecifico') {
      this.colapsableObj.usoEspecificoColapsable = !this.colapsableObj.usoEspecificoColapsable;
    } else {
      this.colapsableObj.formaFarmaceuticaColapsable = false;
      this.colapsableObj.paisDeOrigenColapsable = false;
      this.colapsableObj.usoEspecificoColapsable = false;
    }
  }

  public getCrossListBtn() {
    return [
      { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].agregar('t') },
      { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].agregar('') },
      { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[0].quitar('') },
      { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
    ];
  }

  public getPaisDeProcedenciaCatalogoDatos(): void {
    this.certificadosLicenciasSvc.getPaisDeProcedenciaDatos().subscribe((response) => {
      const DATOS = this.deepCopy(response);
      this.paisDeProcedenciaCatalogo = DATOS.data;
    });
  }
}
