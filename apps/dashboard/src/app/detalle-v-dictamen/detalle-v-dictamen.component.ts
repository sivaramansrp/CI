import { AccuseComponentes, ListaComponentes, Tabulaciones } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';

@Component({
  selector: 'app-detalle-v-dictamen',
  standalone: true,
  imports: [
    ReviewersTabsComponent,
    
  ],
  templateUrl: './detalle-v-dictamen.component.html',
  styleUrls: ['./detalle-v-dictamen.component.css'],
})
export class DetalleVDictamenComponent implements OnInit {
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
      /** Formulario de tramite */
  public FormObservacion!: FormGroup;

  /**
   * La variable `numeroDeTramite` en la clase `VerificarDictamenComponent` almacena un valor de cadena específico '099226136147361192499352'. 
   * Este valor se utiliza como identificador para obtener datos relacionados con un trámite particular desde el servicio `verificaDictamenService`. 
   * El componente utiliza este valor para recuperar y mostrar información asociada a este trámite específico, como el número de trámite, 
   * fundamento, justificación, plazo y requisitos. 
   */
  numeroDeTramite: string = '099226136147361192499352';

    constructor(
          private fbOb: FormBuilder,
          private router: Router,
        ) { }
    /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario de tramite y consulta los datos generales del tramite.
   */
  ngOnInit(): void {
    this.inicializaFormTramite();
  }

  /**
   * Inicializa el formulario de tramite
   * @returns {void}
   */
  inicializaFormTramite(): void {    
    this.FormObservacion = this.fbOb.group({  
      observacion: [''],
      fecha: [{ value: '', disabled: true }],
      hora: [{ value: '', disabled: true }],
      usuario: [{ value: '', disabled: true }],
    });
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

        /**
   * @method guardar
   * @description Emite un evento al hacer clic en el botón guardar.
   * @returns {void}
   */
  regresar(): void {
    this.router.navigate(['verificar-dictamen']);
  }

  guardarObservacion(): void {
    this.router.navigate(['bandeja-de-tareas-pendientes']);
  }
}
