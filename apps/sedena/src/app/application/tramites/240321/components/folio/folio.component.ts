import {
  CatalogoSelectComponent,
  TablaDinamicaComponent, 
  TituloComponent,
  UppercaseDirective 
  } from '@ng-mf/data-access-user';

  import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
  } from '@angular/forms';
import{OnDestroy, OnInit } from '@angular/core';
import {map,takeUntil}from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import {Tramite240321Query} from '../../estados/tramite240321Query.query'
import { Tramite240321State } from '../../estados/tramite240321Store.store';
import { Tramite240321Store } from '../../estados/tramite240321Store.store'; 


@Component({
  selector: 'app-folio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UppercaseDirective,
    CatalogoSelectComponent,
    FormsModule,
    TablaDinamicaComponent,
    TituloComponent,
  ],
  templateUrl: './folio.component.html',
  styleUrl: './folio.component.scss',
})

export class FolioComponent implements OnInit, OnDestroy {

  /**
   * @property {FormGroup} formularioInfoRegistro
   * Formulario reactivo que contiene la información del registro.
   */
  formularioInfoRegistro!: FormGroup;
  /**
   * @property {Tramite240321State} tramiteState
   * Estado actual del trámite, obtenido del store.
   */

  tramiteState: Tramite240321State = this.tramiteStore.getValue();
  /**
   * @property {Subject<void>} destroyNotifier$
   * Subject utilizado para limpiar las suscripciones activas al destruir el componente.
   */
  
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   * @param {Tramite240321Store} tramiteStore - Store que gestiona el estado del trámite.
   * @param {Tramite240321Query} tramiteQuery - Query para acceder a los datos del trámite.
   */
  
  constructor(
    private fb: FormBuilder,
    private tramiteStore:Tramite240321Store,
    private tramiteQuery:Tramite240321Query,
  ) {
   
    
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit():void {
  
    this.inicializarFormularioInfoRegistro();
    this.initializeFormFromStore();
    
  }
  /**
   * Inicializa el formulario con los valores del store.
   * @method initializeFormFromStore
   */
  
  initializeFormFromStore(): void {
    this.tramiteQuery.getFolio$.pipe(
      takeUntil(this.destroyNotifier$),
      map(() => {
        this.formularioInfoRegistro.patchValue({
          folio: this.tramiteState.folio,
        });
      })
    ).subscribe();
     
  }
  
  

  /**
   * Inicializa el formulario de información de registro.
   * @method inicializarFormularioInfoRegistro
   */
  
  inicializarFormularioInfoRegistro(): void {
    this.formularioInfoRegistro = this.fb.group({
     
      folio: [{ value: '', disabled: true }],
    
  })
}
      
  /*
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  
  }

  
 
  
}