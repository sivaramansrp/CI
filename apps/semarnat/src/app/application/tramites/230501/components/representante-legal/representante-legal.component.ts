import { Catalogo, CatalogoSelectComponent, TipoPersona, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MaterialesPeligrososService } from '../../services/materiales-peligrosos.service';
import { Representante } from '../../models/terceros-relacionados.model';
import { Tramite230501Store } from '../../estados/stores/tramite230501Store.store';

/**
 * @component RepresentanteLegalComponent
 * @description Componente responsable de manejar el formulario para  representantes.
 * Se encarga de obtener datos del catálogo (países), gestionar el formulario reactivo y
 * actualizar el estado del trámite con la información del representantes capturado.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  providers: [MaterialesPeligrososService],
  templateUrl: './representante-legal.component.html',
  styleUrls: ['./representante-legal.component.scss'],
})
export class RepresentanteLegalComponent implements OnDestroy, OnInit {
  
  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {Representante[]} representantes
   * Arreglo de representantes capturados en el formulario.
   * Utilizado para almacenar los datos de los representantes antes de enviarlos al store.
   */
  representantes: Representante[] = [];

  /**
   * @property {FormGroup} representanteLegalForm
   * Formulario reactivo utilizado para capturar los datos del representante.
   * Este formulario contiene validaciones para los campos requeridos.
   */
  representanteLegalForm: FormGroup;

  /**
   * @property {Catalogo[]} paisesDatos
   * Lista de países obtenida del servicio de datos.
   * Esta lista se usa para poblar un componente select con opciones de países.
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * @constructor
   * Inicializa el formulario reactivo y los servicios necesarios para el componente.
   * Realiza la configuración del formulario y las dependencias necesarias.
   *
   * @param fb - FormBuilder para construir el formulario reactivo.
   * @param materialesPeligrososService - Servicio para obtener datos del backend (como países).
   * @param tramiteStore - Store que administra el estado del trámite actual.
   * @param tramiteQuery - Servicio para consultar el estado del trámite.
   * @param ubicaccion - Servicio de Angular para navegación de retroceso.
   */
  constructor(
    private fb: FormBuilder,
    private materialesPeligrososService: MaterialesPeligrososService,
    private ubicaccion: Location,
    private tramiteStore: Tramite230501Store,
  ) {
    // Creación del formulario reactivo con validaciones
    this.representanteLegalForm = this.fb.group({
      tipoPersona: ['Fisica', Validators.required],
      nombres: ['', Validators.required],
      denominacionRazon: [''],
      primerApellido: [''],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: [''],
      localidad: [''],
      codigoPostal: ['', Validators.required],
      colonia: [''],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }
  /**
   * Método que se suscribe a los cambios en el campo `tipoPersona` del formulario.
   * Dependiendo del valor seleccionado, establece o elimina las validaciones de otros campos.
   * @method onTipoPersonaChange
   * @returns {void}
   */
  onTipoPersonaChange() : void{
    this.representanteLegalForm.get('tipoPersona')?.valueChanges.subscribe(value => {
      const IS_FISICA = value === 'FISICA' || value === this.tipoPersona.FISICA;
      const NOMBRES = this.representanteLegalForm.get('nombres');
      const PRIMER_APELLIDO = this.representanteLegalForm.get('primerApellido');
      const SEGUNDO_APELLIDO = this.representanteLegalForm.get('segundoApellido');
      const DENOMINACION_RAZON = this.representanteLegalForm.get('denominacionRazon');
        
      if (IS_FISICA) {
        NOMBRES?.setValidators([Validators.required]);
        PRIMER_APELLIDO?.setValidators([Validators.required]);
        SEGUNDO_APELLIDO?.setValidators([Validators.required]);
        DENOMINACION_RAZON?.clearValidators();
      } else {
        NOMBRES?.clearValidators();
        PRIMER_APELLIDO?.clearValidators();
        SEGUNDO_APELLIDO?.clearValidators();
        DENOMINACION_RAZON?.setValidators([Validators.required]);
      }
  
      NOMBRES?.updateValueAndValidity();
      PRIMER_APELLIDO?.updateValueAndValidity();
      SEGUNDO_APELLIDO?.updateValueAndValidity();
      DENOMINACION_RAZON?.updateValueAndValidity();
    });
  }

  /**
   * @method ngOnInit
   * @description Hook de inicialización del componente. Llama a `cargarDatos()` para obtener los catálogos.
   * También suscribe a los datos del store para cargar la información del trámite.
   */
  ngOnInit(): void {
    this.onTipoPersonaChange();
    this.cargarDatos();
    // Suscripción al store para cargar datos previos de un trámite
    this.tramiteStore.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        if (data) {
          // Si hay datos, los asigna al formulario reactivo
          this.representanteLegalForm.patchValue(data);
        }
      });
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países del servicio `materialesPeligrososService` y la almacena en `paisesDatos`.
   * Esto permite cargar los catálogos de países necesarios para el formulario.
   */
  cargarDatos(): void {
    this.materialesPeligrososService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });
  }

  /**
   * @method guardarRepresentante
   * @description Toma los datos del formulario, crea un objeto `Representante` con estos datos,
   * lo agrega al arreglo `representantes`, actualiza el store del trámite y luego limpia el formulario y regresa a la vista anterior.
   */
  guardarRepresentante(): void {
    const NUEVO_REPRESENTANTE: Representante = {
      nombreRazonSocial: `${this.representanteLegalForm.value.nombres} ${
        this.representanteLegalForm.value.primerApellido
      } ${this.representanteLegalForm.value.segundoApellido || ''}`.trim(),
      rfc: '',
      curp: '',
      telefono: this.representanteLegalForm.value.telefono || '',
      correoElectronico:
        this.representanteLegalForm.value.correoElectronico || '',
      calle: this.representanteLegalForm.value.calle || '',
      numeroExterior: this.representanteLegalForm.value.numeroExterior || '',
      numeroInterior: this.representanteLegalForm.value.numeroInterior || '',
      pais: this.representanteLegalForm.value.pais || '',
      colonia: this.representanteLegalForm.value.colonia || '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa: this.representanteLegalForm.value.estado || '',
      estadoLocalidad: '',
      codigoPostal: this.representanteLegalForm.value.codigoPostal || '',
      coloniaEquivalente: '',
    };

    if (this.representanteLegalForm.valid) {
      this.setFormValida(this.representanteLegalForm.valid);
      this.representantes.push(NUEVO_REPRESENTANTE);
      this.addRepresentanteLegal(this.representantes);
      this.representanteLegalForm.reset();
      this.ubicaccion.back();
    }
  }

  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `representanteLegalForm` para limpiar todos los campos.
   * Esto puede ser útil si se desea cancelar o reiniciar el formulario.
   */
  limpiarFormulario(): void {
    this.representanteLegalForm.reset();
  }

  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   * Esto puede ser útil si el usuario desea cancelar el proceso.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

   /**
 * Establece el estado de validación del formulario de representanteLegal.
 * 
 * @param valida - Un valor booleano que indica si el formulario de datos del representante es válido.
 */
 setFormValida(valida: boolean): void {
  this.tramiteStore.setFormValida({ representanteLegal: valida });
}

  /**
   * @method addRepresentanteLegal
   * @description Agrega nuevos representantes a la tabla de datos del trámite.
   * Actualiza el estado del trámite con los datos de los representantes capturados.
   *
   * @param newRepresentante - Lista de objetos `Representante` a agregar.
   */
  addRepresentanteLegal(newRepresentante: Representante[]): void {
    this.tramiteStore.updateRepresentanteLegalTablaDatos(newRepresentante);
  }

  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   * Esto es crucial para evitar fugas de memoria cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
