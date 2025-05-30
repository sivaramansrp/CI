
import { AccuseComponentes, ListaComponentes, Tabulaciones } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosComponent } from '@libs/shared/data-access-user/src/tramites/components/datos/datos.component';
import { Router } from '@angular/router';

import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';
import { VerificaDictamenService } from '@libs/shared/data-access-user/src/core/services/verificaDictamen/verifica-dictamen.service';
import { VerificarDictamenModel } from '@libs/shared/data-access-user/src/core/models/shared/verificar-dictamen.models';

@Component({
  selector: 'app-verificar-dictamen',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    ReviewersTabsComponent,
    DatosComponent,
  ],
  templateUrl: './verificar-dictamen.component.html',
  styleUrl: './verificar-dictamen.component.scss',
})
export class VerificarDictamenComponent implements OnInit, OnDestroy {
  /** 
   * Subject para destruir las suscripciones.
   */
  private destruirSuscripcion$: Subject<void> = new Subject();
  /** 
   * Formulario de tramite 
   */
  public FormTramite!: FormGroup;

  /**
   * La variable `requisitosCombo` en la clase `VerificarDictamenComponent` es un arreglo de objetos `Catalogo`.
   * Se utiliza para almacenar los requisitos obtenidos del objeto `VerificarDictamenModel` que se obtiene
   * a través del servicio `verificaDictamenService`. 
   */
  requisitosCombo: Catalogo[] = [];

  /**
   * La variable `numeroDeTramite` en la clase `VerificarDictamenComponent` almacena un valor de cadena específico '099226136147361192499352'. 
   * Este valor se utiliza como identificador para obtener datos relacionados con un trámite particular desde el servicio `verificaDictamenService`. 
   * El componente utiliza este valor para recuperar y mostrar información asociada a este trámite específico, como el número de trámite, 
   * fundamento, justificación, plazo y requisitos. 
   */
  numeroDeTramite: string = '099226136147361192499352';

  /**
   * Lista de objetos de tipo Catalogo que representa las opciones disponibles
   * para asignar un autorizador en el componente. Se utiliza para poblar el
   * combo o selector de autorizadores en la interfaz de usuario.
   */
  asignarAutorizadorCombo: Catalogo[] = [];

  /**
   * @property {number} tramite
   * @description Identificador del trámite seleccionado.
   */
  tramite: number = 0;

  /**
   * @property {Type<unknown>} viewChild
   * @description Referencia dinámica al componente hijo que se carga según la pestaña seleccionada.
   */
  viewChild!: Type<unknown>;
  /**
   * @property {AccuseComponentes | undefined} slectTramite
   * @description Objeto que representa el trámite seleccionado actualmente.
   */
  slectTramite!: AccuseComponentes | undefined;
    
  constructor(      
    private fb: FormBuilder,            
    private router: Router,
    private verificaDictamenService: VerificaDictamenService,
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario de tramite y consulta los datos generales del tramite.
   */
  ngOnInit(): void {
    this.inicializaFormTramite();
    this.verificaDictamenService.obtenerDictamen(this.numeroDeTramite)
      .pipe(takeUntil(this.destruirSuscripcion$))
      .subscribe((dictamen: VerificarDictamenModel) => {
      if (Array.isArray(dictamen.requisitos)) {
        this.requisitosCombo = dictamen.requisitos;
      } else {
        this.requisitosCombo = [];
      }
      if (Array.isArray(dictamen.asignarAutorizador)) {
        this.asignarAutorizadorCombo = dictamen.asignarAutorizador;
      } else {
        this.asignarAutorizadorCombo = [];
      }
    /**
     * Carga los datos del dictamen en el formulario.
     */        
    this.FormTramite.patchValue({
      numeroDeTramite: dictamen.numeroDeTramite,
      fundamento:dictamen.fundamento,
      justificacion: dictamen.justificacion,
      plazo: dictamen.plazo,
      tipoAnalisis: dictamen.tipoAnalisis,
      numeroDeMuestras: dictamen.numeroDeMuestras,
      requisito: this.requisitosCombo,
      siglasDictaminador: dictamen.siglasDictaminador,
      asignarAutorizador: this.asignarAutorizadorCombo
    });

    /**
     * Establece el valor del campo 'Requisito' en el formulario.
     */ 
    const REQUISITO_CONTROL = this.FormTramite.get('requisito');
    if (REQUISITO_CONTROL) {
      REQUISITO_CONTROL.setValue(6);
    }
    /**
     * Establece el valor del campo 'AsignarAutorizador' en el formulario.
     */ 
    const ASIGNA_AUT_CONTROL = this.FormTramite.get('asignarAutorizador');
    if (ASIGNA_AUT_CONTROL) {
      ASIGNA_AUT_CONTROL.setValue(1);
    }
      }, (error) => {
        console.error('Error al obtener los datos del dictamen:', error);
      });
  }

  /**
   * Inicializa el formulario de tramite
   * @returns {void}
   */
  inicializaFormTramite(): void {
    this.FormTramite = this.fb.group({
      numeroDeTramite: [{ value: '', disabled: true }],
      tipoDeSolicitud: [{ value: '', disabled: true }],     
      fundamento: [{ value: '', disabled: true }], 
      justificacion: [{ value: '', disabled: true }], 
      plazo: [{ value: '', disabled: true }],
      tipoAnalisis: [{ value: '', disabled: true }],
      numeroDeMuestras: [{ value: '', disabled: true }],
      requisito: [{ value: '', disabled: true }],
      siglasDictaminador: [{ value: '', disabled: true }],
      asignarAutorizador: [{ value: '', disabled: true }],
    });
  }

  /**
   * @method guardar
   * @description Emite un evento al hacer clic en el botón guardar.
   * @returns {void}
   */
  observacion(): void {
    this.router.navigate(['detalle-v-dictamen']);
  }

  /**
  * Se ejecuta al destruir el componente.
  * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
  */
  ngOnDestroy(): void {
    this.destruirSuscripcion$.next();
    this.destruirSuscripcion$.complete();
  }

  /**
   * @method viewChildcambioDePestana
   * @description Cambia el componente hijo mostrado según la pestaña seleccionada.
   * @param {Tabulaciones} id - Identificador de la pestaña seleccionada.
   * @returns {void}
   */
  viewChildcambioDePestana(id: Tabulaciones): void {
    const LI = this.slectTramite?.listaComponentes.find((v: ListaComponentes) => v.id === id.id);
      if (LI) {
        this.loadComponent(LI);
      }
  }

  /**
   * @method loadComponent
   * @description Carga dinámicamente un componente hijo según la ruta especificada en el objeto recibido.
   * @param {ListaComponentes} li - Objeto que contiene la información y la ruta del componente a cargar.
   * @returns {Promise<void>}
   */
  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      return;
    }
    this.viewChild = await li.componentPath() as Type<unknown>;
  }
}
