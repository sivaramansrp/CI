import { Catalogo, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, delay, map, takeUntil, tap } from 'rxjs';
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { CommonModule } from '@angular/common';
import { DaosCertificadoComponent } from "../../../../shared/components/daos-certificado/daos-certificado.component";
import { ToastrService } from 'ngx-toastr';
import { Tramite110202Query } from '../../estados/tramite110202.query';
import { Tramite110202Store } from '../../estados/tramite110202.store';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,DaosCertificadoComponent],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss'
})
export class DatosCertificadoComponent implements OnDestroy, OnInit {
  precisa:boolean = true;
  idioma:boolean = true;
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
    idiomaDatos$!: Observable<Catalogo[]>;
  
    /**
     * Observable que contiene la lista de entidades federativas disponibles.
     */
    entidadFederativas$!: Observable<Catalogo[]>;
  
    /**
     * Observable que contiene la lista de representaciones federales disponibles.
     */
    representacionFederal$!: Observable<Catalogo[]>;
  
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
      private fb: FormBuilder, public store: Tramite110202Store,
      public tramiteQuery: Tramite110202Query,
      public certificadoService: CertificadoValidacionService,
      private toastr: ToastrService,
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
      });
  
      /**
       * Suscripción al estado del formulario para actualizar los valores del formulario al obtener datos.
       */
      this.tramiteQuery.formDatosCertificado$.pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe(estado => {
        if (!this.actualizandoFormulario && estado) {
          this.actualizandoFormulario = true;
          this.formDatosCertificado.patchValue(estado);
          this.actualizandoFormulario = false;
        }
      });
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
  
      /**
       * Asignación de los observables que contienen los catálogos de datos a los que se puede suscribir el componente.
       */
      this.idiomaDatos$ = this.tramiteQuery.selectIdioma$;
      this.entidadFederativas$ = this.tramiteQuery.selectEntidadFederativa$;
      this.representacionFederal$ = this.tramiteQuery.selectrepresentacionFederal$;
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
      this.cargarIdioma();
      this.cargarEntidadFederativa();
      
      /**
       * Suscripción a los cambios de valor del formulario para enviar los datos al store.
      */
    //  this.formDatosCertificado.valueChanges.subscribe(value => {
    //   if (!this.actualizandoFormulario) {
    //     this.store.setFormDatosCertificado(value);
    //     this.validarFormulario();
    //   }
    //   });
      this.cargarRepresentacionFederal();
  
    }
    
    /**
     * Método que selecciona un idioma y actualiza el estado en el store.
     * @param estado El estado del idioma seleccionado.
     */
    idiomaSeleccion(estado: Catalogo): void {
      this.store.setIdiomaDatos([estado]);
    }
  
    /**
     * Método que selecciona una entidad federativa y actualiza el estado en el store.
     * @param estado El estado de la entidad federativa seleccionada.
     */
    entidadFederativaSeleccion(estado: Catalogo): void {
      this.store.setEntidadFederativaDatos([estado]);
    }
  
    /**
     * Método que selecciona una representación federal y actualiza el estado en el store.
     * @param estado El estado de la representación federal seleccionada.
     */
    representacionFederalSeleccion(estado: Catalogo): void {
      this.store.setRepresentacionFederalDatos([estado]);
    }
  
    /**
     * Método para cargar la lista de idiomas desde el servicio.
     */
    cargarIdioma(): void {
      this.certificadoService
        .obtenerIdioma()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(
          (data: Catalogo[]) => {
            this.store.setIdiomaDatos(data);
          },
          (error) => {
            console.error('Error al cargar los estados:', error);
          }
        );
    }
  
    /**
     * Método para cargar la lista de representaciones federales desde el servicio.
     */
    cargarRepresentacionFederal(): void {
      this.certificadoService
        .obtenerRepresentacionFederal()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(
          (data: Catalogo[]) => {
            this.store.setRepresentacionFederalDatos(data);
          },
          (error) => {
            console.error('Error al cargar los estados:', error);
          }
        );
    }
  
    /**
     * Método para cargar la lista de entidades federativas desde el servicio.
     */
    cargarEntidadFederativa(): void {
      this.certificadoService
        .obtenerEntidadFederativa()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(
          (data: Catalogo[]) => {
            this.store.setEntidadFederativaDatos(data);
          },
          (error) => {
            console.error('Error al cargar los estados:', error);
          }
        );
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
