import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { BotonAccionesTipos, Catalogo, CatalogoSelectComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { Solicitud32502State, tramite32505Store } from "../../../../estados/tramites/trimite32505.store";
import { TituloComponent } from "@libs/shared/data-access-user/src";
import { Tramite32505Query } from "../../../../estados/queries/tramite32505.query";
import { map, Subject, takeUntil } from "rxjs";
import { AvisoService } from "../../services/aviso.service";
import { CatalogoLista } from "../../models/avios-model";
import { ColumnasTabla } from "../../../32504/models/aviso.model";

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,
     CatalogoSelectComponent,TablaDinamicaComponent],
  standalone: true,
})
export class AvisoComponent implements OnInit {

  esManualAsivoAgregarClicked = false;

  TablaSeleccion = TablaSeleccion;

  botonAccionesTipos = BotonAccionesTipos;


  tableData: {
    headers: {
      encabezado: string,
      clave: (ele: ColumnasTabla) => string,
      orden: number
    }[],
    data: [],
  } = {
      headers:
      [
        { encabezado: 'RFC', clave: (ele: ColumnasTabla) => ele.rfc, orden: 1 },
        {
          encabezado: 'Nombre comercial',
          clave: (ele: ColumnasTabla) => ele.nombreComercial,
          orden: 2,
        },
        {
          encabezado: 'Entidad federativa',
          clave: (ele: ColumnasTabla) => ele.entidadFederativa,
          orden: 3,
        },
        {
          encabezado: 'Alcaldía o Municipio',
          clave: (ele: ColumnasTabla) => ele.alcaldioOMuncipio,
          orden: 4,
        },
        {
          encabezado: 'Colonia',
          clave: (ele: ColumnasTabla) => ele.colonia,
          orden: 5,
        },
      ],
      data: []
    };


      /**
   * La función maneja las acciones del botón.
   * @param accione - Parámetro que tiene la acción de ser del tipo BotonAccionesTipos.
   */
  accionesBotones(accione: BotonAccionesTipos): void {
    switch (accione) {
      case BotonAccionesTipos.AGREGAR:
        this.esManualAsivoAgregarClicked = true;
        break;
      case BotonAccionesTipos.ELIMINAR:
        
        break;
      case BotonAccionesTipos.MODIFICAR:
        
        break;
    
      default:
        break;
    }
  }
  /**
   * Formulario para capturar datos adicionales relacionados con el registro.
   */
  aviosForm!: FormGroup;
  grupoOperador: any;

    /**
   * Estado de la solicitud.
   */
    public solicitudState!: Solicitud32502State;

      /**
   * Sujeto para manejar la destrucción de observables.
   * 
   * Se utiliza para evitar fugas de memoria al destruir el componente.
   */
  destroyNotifier$: Subject<void> = new Subject();

  
  /**
   * Opciones disponibles para los países.
   * 
   * Contiene una lista de países que el usuario puede seleccionar.
   */
  optionsPais!: Catalogo[];


  optionsAnio!: Catalogo[] ;

  /**
   * @property {boolean} seccionContenedorVisible
   * Indicates whether the container section is visible.
   */
  datosDelAvisoVisible: boolean = false;


  constructor(
    private fb: FormBuilder,
    public store: tramite32505Store,
    public tramiteQuery: Tramite32505Query,
    private avisoService: AvisoService,
    private validacionesService: ValidacionesFormularioService,
  ) {}
 /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
 isValid(form: FormGroup, field: string): boolean | null {
  return this.validacionesService.isValid(form, field);
}

 /**
 * Inicializa el componente.
 * 
 * Este método configura los formularios y carga los datos iniciales necesarios para el Certificado de Origen.
 */
 ngOnInit(): void {
  this.tramiteQuery.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
  this.crearFormSolicitud();
  this.cargarPais();
  this.cargarAnio();
  this.mostrarCampos();
}

 /**
   * Obtiene el grupo de formulario 'adaceForm' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'adaceForm'.
   */
 get adaceForm(): FormGroup {
  return this.aviosForm.get('adaceForm') as FormGroup;
}

/**
   * Obtiene el campo 'adace' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'adace' del formulario 'adaceForm'.
   */
 get adace(): FormGroup {
  return this.aviosForm.get('adaceForm.adace') as FormGroup; 
}

get pais(): FormGroup {
  return this.aviosForm.get('adaceForm.pais') as FormGroup; 
}

get anio(): FormGroup {
  return this.aviosForm.get('adaceForm.anio') as FormGroup; 
}

get tipoBusqueda(): FormGroup {
  return this.aviosForm.get('adaceForm.tipoBusqueda') as FormGroup;
}
  /**
   * Método para crear el formulario principal de la solicitud.
   */
  crearFormSolicitud(): void {
    this.aviosForm = this.fb.group({
      adaceForm: this.fb.group({
                adace: [this.solicitudState?.adace  ],
                pais: [this.solicitudState?.pais, [Validators.required]],
                anio: [this.solicitudState?.anio, [Validators.required]],
                tipoBusqueda: [this.solicitudState?.tipoBusqueda, Validators.required],
                
      }),
      
    });

    this.mostrarCampos();
    this.adaceForm.get('tipoBusqueda')?.valueChanges.subscribe((value) => {
   this.setValoresStore(
     this.adaceForm,
     'tipoBusqueda',
     'setTipoBusqueda'
   );
   this.mostrarCampos();
 });
  }


/**
   * Muestra los campos según el tipo de búsqueda seleccionado.
   */
mostrarCampos(): void {
  const TIPO_BUSQUEDA = this.adaceForm.get('tipoBusqueda')?.value;
  console.log('Tipo de busqueda:', TIPO_BUSQUEDA);
  if (TIPO_BUSQUEDA === 'Manual') {
    this.datosDelAvisoVisible = true;
  } else if (TIPO_BUSQUEDA === 'Carga masiva') {
    this.datosDelAvisoVisible = false;
   
  } else {
    
  }
}


    /**
   * Actualiza un valor en el store del trámite.
   * 
   * Este método permite actualizar un valor específico en el store del trámite utilizando el formulario y el método correspondiente.
   * 
   * @param {FormGroup} form - El formulario que contiene el valor a actualizar.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110217Store} metodoNombre - El nombre del método en el store que se debe invocar.
   */
    setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof tramite32505Store): void {
      const VALOR = form.get(campo)?.value;
      (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
    }

      /**
   * Carga las opciones disponibles para los países.
   * 
   * Este método obtiene las opciones de países desde el servicio `CertificadosOrigenService` y las asigna a `optionsPais` y `optionsTipoFactura`.
   */
  cargarPais(): void {
    this.avisoService
      .obtenerPais()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.optionsPais = datos.datos;
          console.log(this.optionsPais);
                  }
      );
  }

  cargarAnio(): void {
    this.avisoService
      .obtenerAnio()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.optionsAnio = datos.datos;
          console.log(this.optionsAnio);
                  }
      );
  }

   /**
   * Limpia los observables al destruir el componente.
   * 
   * Este método emite un valor en el `destroyNotifier$` y completa el observable para evitar fugas de memoria.
   */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
