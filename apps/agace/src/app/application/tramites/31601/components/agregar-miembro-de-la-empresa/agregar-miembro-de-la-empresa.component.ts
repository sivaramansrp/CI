/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @nx/enforce-module-boundaries */
/**
 * @module AgregarMiembroDeLaEmpresaComponent
 *  Componente para agregar un miembro de la empresa.
 * Maneja un formulario reactivo y la paginación de una tabla.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Catalogo, TableBodyData } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { TableComponent } from '@ng-mf/data-access-user';
import { TablePaginationComponent } from '@ng-mf/data-access-user';
import enSuCaracterDe from 'libs/shared/theme/assets/json/31601/enSuCaracterDe.json';
import miembrodelaempresaTable from 'libs/shared/theme/assets/json/31601/miembroDeLaEmpresa .json';
import nacionalidad from 'libs/shared/theme/assets/json/31601/nacionalidad.json';
import preOperativo from 'libs/shared/theme/assets/json/31601/preOperativo.json';

/**
 * @component
 * @selector app-agregar-miembro-de-la-empresa
 *  Componente que gestiona la adición de miembros de la empresa mediante un formulario reactivo y una tabla con paginación.
 */
@Component({
  selector: 'app-agregar-miembro-de-la-empresa',
  templateUrl: './agregar-miembro-de-la-empresa.component.html',
  styleUrls: ['./agregar-miembro-de-la-empresa.component.scss'],
  standalone: true,
  imports: [
    TableComponent,
    TablePaginationComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputRadioComponent,
  ],
})
export class AgregarMiembroDeLaEmpresaComponent
  implements OnInit, AfterViewInit
{
  /**
   * @property {FormGroup} agregarMiembroDeLaEmpresaForm
   *  Formulario reactivo para agregar miembros de la empresa.
   */
  agregarMiembroDeLaEmpresaFrom!: FormGroup;

  /**
   * @property {ElementRef} AgregarMOdel
   *  Referencia al modal de Bootstrap para agregar miembros.
   */
  @ViewChild('Agregar', { static: false }) AgregarMOdel!: ElementRef;

  /**
   * @property {Modal} AgregarModelInstance
   *  Instancia del modal de Bootstrap.
   */
  AgregarModelInstance!: Modal;

  /**
   * @property {number} totalItems
   *  Número total de elementos en la tabla.
   */
  totalItems: number = 0;

  /**
   * @property {number} currentPage
   *  Página actual de la tabla paginada.
   */
  currentPage: number = 1;

  /**
   * @property {number} itemsPerPage
   *  Cantidad de elementos por página.
   */
  itemsPerPage: number = 5;

  /**
   * @property {Catalogo[]} radioOptions
   *  Opciones del radio button obtenidas desde preOperativo.json.
   */
  radioOptions = preOperativo;

  /**
   * @property {Catalogo[]} enSuCaracterDeOptions
   *  Opciones del catálogo "En su carácter de".
   */
  enSuCaracterDeOptions: Catalogo[] = enSuCaracterDe;

  /**
   * @property {Catalogo[]} nacionalidadOptions
   *  Opciones de nacionalidad.
   */
  nacionalidadOptions: Catalogo[] = nacionalidad;

  /**
   * @constructor
   * Servicio para construir formularios reactivos.
   */
  constructor(private fb: FormBuilder) {
    //constructor
  }

  /**
   * @method ngOnInit
   *  Método de ciclo de vida de Angular. Inicializa el formulario y obtiene los datos de la tabla.
   */
  ngOnInit(): void {
    this.getEstablecimiento();
    this.agregarMiembroDeLaEmpresaFrom = this.fb.group({
      ensucarácterde: [1, Validators.required],
      obligadoaTributarenMéxico: [true, Validators.required],
      nacionalidad: [1, Validators.required],
      registroFederaldeContribuyentes: [
        { value: 'HEJE780514BVA', disabled: true },
        Validators.required,
      ],
      rfc: ['HEJE780514BVA', [Validators.required]],
      nombreCompleto: [
        { value: 'ERNESTO HERNÁNDEZ URI', disabled: true },
        Validators.required,
      ],
    });
  }

  /**
   * @property {string[]} miembroDeLaEmpresaHeaderData
   *  Encabezados de la tabla de miembros de la empresa.
   */
  public miembroDeLaEmpresaHeaderData: string[] = [];

  /**
   * @property {TableBodyData[]} miembroDeLaEmpresaBodyData
   *  Datos del cuerpo de la tabla de miembros de la empresa.
   */
  public miembroDeLaEmpresaBodyData: TableBodyData[] = [];

  /**
   * @property {any} getEstablecimientoTableData
   *  Datos de la tabla obtenidos desde el JSON.
   */
  public getEstablecimientoTableData = miembrodelaempresaTable;

  /**
   * @method getEstablecimiento
   *  Obtiene los datos de la tabla de miembros de la empresa.
   */
  public getEstablecimiento(): void {
    this.miembroDeLaEmpresaHeaderData =
      this.getEstablecimientoTableData.tableHeader;
    this.miembroDeLaEmpresaBodyData =
      this.getEstablecimientoTableData.tableBody;
  }

  /**
   * @method updatePagination
   *  Actualiza los datos mostrados en la tabla según la paginación.
   */
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  /**
   * @method onPageChange
   * Número de la nueva página seleccionada.
   *  Cambia la página actual y actualiza la paginación.
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * @method onItemsPerPageChange
   *  Número de elementos por página seleccionados.
   *  Cambia la cantidad de elementos por página y actualiza la paginación.
   */
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  /**
   * @method ngAfterViewInit
   *  Método del ciclo de vida de Angular. Inicializa el modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.AgregarMOdel?.nativeElement) {
      this.AgregarModelInstance = new Modal(this.AgregarMOdel.nativeElement);
    }
  }

  /**
   * @method openAgregarModal
   *  Abre el modal de agregar miembro de la empresa.
   */
  openAgregarModal(): void {
    if (this.AgregarModelInstance) {
      this.AgregarModelInstance.show();
    }
  }

  /**
   * @method closeAgregarModal
   *  Cierra el modal de agregar miembro de la empresa.
   */
  closeAgregarModal(): void {
    if (this.AgregarModelInstance) {
      this.AgregarModelInstance.hide();
    }
  }
}
