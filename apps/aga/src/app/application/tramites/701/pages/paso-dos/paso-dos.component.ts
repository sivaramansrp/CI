/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component, OnInit,OnDestroy } from '@angular/core';
import {BtnContinuarComponent, Catalogo } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnexarPageComponent } from '../../components/anexar-page/anexar-page.component';
import { FiltrarArchivosDigitalizacionComponent } from '../../components/filtrar-archivos-digitalizacion/filtrar-archivos-digitalizacion.component';
import { ReplaySubject, takeUntil } from 'rxjs';


/**
 * Componente para el paso dos del wizard.
 */
@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  standalone: true,
  imports: [
    BtnContinuarComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AnexarPageComponent,
    FiltrarArchivosDigitalizacionComponent,
  ],
})
export class PasoDosComponent implements OnInit,OnDestroy {
  /**
   * Constantes de textos.
   */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos disponibles.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Formulario para los tipos de documentos.
   */
  tipoDocumentosForm: FormGroup;

  /**
   * Mensaje de error para el párrafo.
   */
  parrafoError: string = '';

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Constructor del componente.
   * @param catalogosServices Servicio para obtener catálogos.
   * @param fb Constructor de formularios.
   */
  constructor(
    private catalogosServices: CatalogosService,
    private fb: FormBuilder
  ) {
    this.tipoDocumentosForm = this.fb.group({
      solicitud: this.fb.group({
        idSolicitud: [''],
        esNuevo: [''],
      }),
      tipoDocumento: [''],
      elementoWizard: this.fb.group({
        anteriorTmp: [''],
      }),
    });
  }

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene los tipos de documentos disponibles.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp.length > 0) {
          this.tiposDocumentos = resp;
        }
      });
  }

  /**
   * Agrega un documento a la lista de documentos seleccionados.
   * @param {number} id - El ID del documento a agregar.
   */
  agregarDocumento(id: number): void {
    this.tiposDocumentos.forEach((el) => {
      if (el.id === id) {
        this.documentosSeleccionados.push(el);
      }
    });
  }

  /**
   * Elimina un documento de la lista de documentos seleccionados.
   * @param {number} i - El índice del documento a eliminar.
   */
  eliminar(i: number): void {
    this.documentosSeleccionados.splice(i, 1);
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
