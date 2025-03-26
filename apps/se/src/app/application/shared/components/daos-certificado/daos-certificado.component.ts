import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, delay, map, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ENTIDAD_FEDREATIVE_DATES, IDIOMA_DATES, REPRESENTACION_FEDERALDATES } from '../../constants/modificacion.enum';
import { MenusDesplegables } from '../../models/modificacion.enum';

@Component({
  selector: 'app-daos-certificado',
  standalone: true,
  imports: [TituloComponent,ReactiveFormsModule, CatalogoSelectComponent, CommonModule],
  templateUrl: './daos-certificado.component.html',
  styleUrl: './daos-certificado.component.scss'
})
export class DaosCertificadoComponent implements OnDestroy, OnInit, AfterViewInit {
  @Input() data!: MenusDesplegables[];
  @Input() idioma!: boolean;
  @Input() precisa!: boolean
  @Input() idiomaDatos!: Catalogo[];
  
    /**
     * Formulario reactivo que contiene los datos del certificado.
     * Utilizado para la validación y gestión de los datos en el formulario.
     */
    formDatosCertificado!: FormGroup;
  
    /**
     * Subject utilizado para gestionar el ciclo de vida del componente y cancelar las suscripciones.
     */
    destroyNotifier$: Subject<void> = new Subject();
  
    /**
     * Observable que contiene la lista de idiomas disponibles.
     */
    idioma$: Catalogo[] = [];
  
    /**
     * Observable que contiene la lista de entidades federativas disponibles.
     */
    entidadFederativas$: Catalogo[] = [];
  
    /**
     * Observable que contiene la lista de representaciones federales disponibles.
     */
    representacionFederal$: Catalogo[] = [];
  
      /**
       * Estado de la sección, gestionado mediante el store.
       * @type {SeccionLibState}
       */
      private seccion!: SeccionLibState
      ;
    
  
    /**
     * Constructor del componente. Inicializa el formulario y las dependencias necesarias.
     * @param fb Instancia del FormBuilder para la creación del formulario.
     * @param store Instancia del store para el manejo de datos.
     * @param tramiteQuery Instancia del query para obtener datos de estado.
     * @param certificadoService Servicio encargado de obtener los datos del certificado.
     * @param toastr Servicio de notificaciones (Toastr).
     */
  
    private actualizandoFormulario = false;
  
    constructor(
      private fb: FormBuilder, 
        private seccionQuery: SeccionLibQuery,
        private seccionStore: SeccionLibStore
    ) {
  
      /**
       * Inicialización del formulario reactivo con los controles y validaciones correspondientes.
       */
      this.formDatosCertificado = this.fb.group({
        observacionesDates: [''],
        idiomaDates: ['', [Validators.required, Validators.min(0)]],
        EntidadFederativaDates: ['', [Validators.required, Validators.min(0)]],
        representacionFederalDates: ['', [Validators.required, Validators.min(0)]],
        precisaDates: [''],
      });
  
      /**
       * Suscripción al estado del formulario para actualizar los valores del formulario al obtener datos.
       */
      // this.tramiteQuery.formDatosCertificado$.pipe(
      //   takeUntil(this.destroyNotifier$)
      // ).subscribe(estado => {
      //   if (!this.actualizandoFormulario && estado) {
      //     this.actualizandoFormulario = true;
      //     this.formDatosCertificado.patchValue(estado);
      //     this.actualizandoFormulario = false;
      //   }
      // });
         /**
           * Suscripción al estado de la sección para obtener y actualizar el estado.
           */
          this.seccionQuery.selectSeccionState$
            .pipe(
              takeUntil(this.destroyNotifier$),
              map((seccionState) => {
                this.seccion = seccionState;
              })
            )
            .subscribe();

    }
  
    /**
     * Getter para acceder al control del formulario, utilizado para la validación.
     * @returns FormControl del formulario.
     */
    get formularioControl(): FormControl {
      return this.formDatosCertificado.get('') as FormControl;
    }
  
     /**
     * Verifica si el formulario es válido.
     * @returns {boolean} Retorna true si el formulario es válido, de lo contrario false.
     */
     esFormValido(): boolean {
      // Recorre todos los controles del formulario para verificar si alguno es inválido.
      for (const NOMBRE_DEL_CONTROL in this.formDatosCertificado.controls) {
        if (Object.prototype.hasOwnProperty.call(this.formDatosCertificado.controls,
          NOMBRE_DEL_CONTROL)) {
          const CONTROL = this.formDatosCertificado.get(NOMBRE_DEL_CONTROL);
          if (CONTROL && CONTROL.enabled && CONTROL.invalid) {
            return false;
          }
        }
      }
      return true;
    }
  
      /**
       * Valida el formulario y actualiza el estado de la sección en el store.
       */
      validarFormulario(): void {
        this.formDatosCertificado.statusChanges
          .pipe(
            takeUntil(this.destroyNotifier$),
            delay(10),
            tap((_value) => {
              const SECCION: number = 2;
              const FORMAS_VALIDADAS = this.seccion.formaValida;
              const ES_VALIDO_EL_FORM = this.esFormValido();
    
              if (this.formDatosCertificado.valid || (ES_VALIDO_EL_FORM)) {
                FORMAS_VALIDADAS[SECCION] = true;
                this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
              } else {
                FORMAS_VALIDADAS[SECCION] = false;
                this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
              }
            })
          )
          .subscribe();
      }
    
  
    /**
     * Método de ciclo de vida de Angular, se ejecuta al inicializar el componente.
     * Se utiliza para cargar los datos y suscribirse a los cambios del formulario.
     */
    ngOnInit(): void {
      
      /**
       * Suscripción a los cambios de valor del formulario para enviar los datos al store.
      */
     this.formDatosCertificado.valueChanges.subscribe(() => {
      if (!this.actualizandoFormulario) {
        // this.store.setFormDatosCertificado(value);
        this.validarFormulario();
      }
      });
  
    }
    
    /**
     * Método que selecciona un idioma y actualiza el estado en el store.
     * @param estado El estado del idioma seleccionado.
     */
    idiomaSeleccion(estado: Catalogo): void {
      this.idiomaSeleccion(estado);
    }
  
    /**
     * Método que selecciona una entidad federativa y actualiza el estado en el store.
     * @param estado El estado de la entidad federativa seleccionada.
     */
    entidadFederativaSeleccion(estado: Catalogo): void {
      // this.store.setEntidadFederativaDatos([estado]);
      this.entidadFederativaSeleccion(estado);
    }
  
    /**
     * Método que selecciona una representación federal y actualiza el estado en el store.
     * @param estado El estado de la representación federal seleccionada.
     */
    representacionFederalSeleccion(estado: Catalogo): void {
      // this.store.setRepresentacionFederalDatos([estado]);
      this.representacionFederalSeleccion(estado);
    }

    ngAfterViewInit(): void {
      // this.data.forEach((datas) => {
      //   if (datas.formControllName === IDIOMA_DATES) {
      //     this.idioma$ = datas.data as Catalogo[];
      //   }
      //   else if(datas.formControllName === ENTIDAD_FEDREATIVE_DATES) {
      //     this.entidadFederativas$ = datas.data as Catalogo[];
      //   }
      //   else if(datas.formControllName === REPRESENTACION_FEDERALDATES){
      //     this.representacionFederal$ = datas.data as Catalogo[];
      //   }
      // })
    }
  
    /**
     * Método de ciclo de vida de Angular, se ejecuta al destruir el componente.
     * Cancela todas las suscripciones para evitar fugas de memoria.
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
  

}
