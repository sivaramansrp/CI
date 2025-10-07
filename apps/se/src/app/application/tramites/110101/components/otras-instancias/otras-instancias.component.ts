import { AlertComponent, CatalogoSelectComponent, CategoriaMensaje, ConsultaioQuery, ConsultaioState, InputCheckComponent, Notificacion, NotificacionesComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosTramiteService } from '../../services/catalogo.service';
import { CodigoRespuesta } from '../../../../core/enum/se-core-enum';
import { CriteriosOtrasInstanciasRequest } from '../../models/request/criterios-otras-instancias-request.model';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110101Store } from '../../estados/tramites/solicitante110101.store';

@Component({
  selector: 'app-otras-instancias',
  standalone: true,
  imports: [
    TituloComponent,
    AlertComponent,
    InputCheckComponent,
    CatalogoSelectComponent,
    NotificacionesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './otras-instancias.component.html',
  styleUrl: './otras-instancias.component.scss',
})
export class OtrasInstanciasComponent implements OnInit, OnDestroy {

  /** País para el cual se muestran las otras instancias */
  @Input() pais!: string; 

  /** Texto dinámico del título */
  @Input() titulo = 'Otras Instancias';

  /** Texto dinámico de la alerta */
  @Input() mensajeAlerta = '';

  /** Bandera para activar catalogo */
  @Input() catalogo!: boolean;

  /** Bandera para modificar texto de select*/
  @Input() modificacionTxt?: boolean;

  /**
   * Notificación actual que se muestra en el componente.
   *
   * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
   * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
  */
  public nuevaNotificacion!: Notificacion;

  /**
   * Formulario reactivo para gestionar los tratados.
   * 
   * @property {FormGroup} formularioInstancias - El formulario reactivo que contiene los campos para otras instancias.
  */
  formularioInstancias!: FormGroup;

  /**
   * **Subject utilizado para manejar la destrucción de suscripciones**
   * 
   * Este `Subject` se emite en `ngOnDestroy` para notificar y completar todas las
   * suscripciones activas, evitando posibles fugas de memoria en el componente.
  */
  private destroy$ = new Subject<void>();

  /**
   * Catálogo de criterios otras instancias disponibles para selección en el componente.
  */
  public criteriosInstanciasCatalogo: Catalogo[] = [];

  public consultaState!: ConsultaioState;


  /**
    * Inicializa el TratadosComponent.
    * @param fb - Servicio FormBuilder utilizado para crear y gestionar formularios reactivos.
    * @param tramite110101Store - Servicio store para gestionar el estado del Trámite 110101.
    * @param consultaioQuery - Servicio query para acceder al estado de consultaio.
    * 
    * Se suscribe al observable `selectConsultaioState$` para actualizar la propiedad `esFormularioSoloLectura`
    * e inicializar el formulario de tratados cada vez que cambia el estado de consultaio. La suscripción se
   * cancela automáticamente cuando el componente es destruido.
  */
  constructor(private fb: FormBuilder,
    private tramite110101Store: Tramite110101Store,
    private consultaioQuery: ConsultaioQuery,
    private catalogosTramiteService: CatalogosTramiteService,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    this.formularioInstancias = this.fb.group({
      criterioInstancias:[null]
    });
  }

  ngOnInit(): void {
    if(this.catalogo){
      this.criteriosOtrasInstancias();
    }
    
  }

  /** 
   * @method criteriosOtrasInstancias
   * @description Realiza una petición para obtener criterios de otras instancias.
   * @return {void}
  */
  public criteriosOtrasInstancias(): void {
    const PAYLOAD: CriteriosOtrasInstanciasRequest = {
      paises: [this.pais],
      otras_instancias: ['ACU', 'BMF']
    };
    this.catalogosTramiteService.postCatCriteriosOtrasInstancias(PAYLOAD)
      .subscribe({
        next: (resp) => {
          if (resp.codigo !== CodigoRespuesta.EXITO) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: '',
              mensaje: resp.error || 'Error criterio instancias.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
          this.criteriosInstanciasCatalogo = (resp.datos || []).map((item, index) => ({
            id: index + 1,
            descripcion: item,
          }));
        },
        error: (error) => {
          const MENSAJE = error?.error?.error || 'Error de criterio instancias';
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: 'error',
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE,
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          }
        }
      });
  }


  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
  */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110101Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * **Ciclo de vida: OnDestroy**
   * 
   * Este método se ejecuta cuando el componente se destruye. 
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   * 
   * - Envía un valor a `destroy$` para notificar a los observables que deben completarse.
   * - Completa `destroy$` para liberar los recursos asociados.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
