import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, REGEX_CORREO_ELECTRONICO_EXPORTADOR, TableComponent, TituloComponent} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosSociosTable, DatosSociosTableExtranjeros } from '../../modelos/datos-empresa.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject,map, takeUntil } from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DATOS_GENERALES_EXTRANJEROS } from '@ng-mf/data-access-user';
import { DATOS_GENERALES_SOCIOS } from '@ng-mf/data-access-user';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosPasos } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
/**
 * Componente para gestionar los datos generales de socios.
 */
@Component({
  selector: 'app-datos-generales-socios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, BtnContinuarComponent, InputRadioComponent, AlertComponent, TableComponent, TablaDinamicaComponent, CatalogoSelectComponent,],
  templateUrl: './datos-generales-socios.component.html',
  styleUrl: './datos-generales-socios.component.scss',
})
export class DatosGeneralesSociosComponent implements OnInit, OnDestroy {

  /** Formulario para la solicitud del usuario */
  FormSolicitud!: FormGroup;

  /** Formulario para almacenar el recuento total de filas */
  formularioParaConteoTotal!: FormGroup;

  /** Pasos para la navegación en el asistente */
  pasos: ListaPasosWizard[] = PASOS;

  /** Índice del paso actual */
  indice: number = 1;

  /**
   * Objeto que almacena la configuración de los pasos del formulario.
   * Contiene el número total de pasos, el índice actual y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Define el tipo de selección de la tabla como casilla de verificación (checkbox).
   */
  tablaCasilla = TablaSeleccion.CHECKBOX;

  /**
   * Índice de la fila seleccionada en la tabla. Por defecto, se inicializa en 1.
   */
  filaSeleccionada: number = 1;

  /** Configuración de la tabla para socios */
  configuracionTabla = DATOS_GENERALES_SOCIOS;

  /** Configuración de la tabla para socios extranjeros */
  configuracionTabla_Extranjeros = DATOS_GENERALES_EXTRANJEROS;

  /** Array de datos para socios */
  datosSocios: DatosSociosTable[] = [];

  /** Array de datos para socios extranjeros */
  datosExtranjeros : DatosSociosTableExtranjeros[] = [];

  /** 
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
   esFormularioSoloLectura: boolean = false; 

  /**
   * Campos de entrada regulares para personas mexicanas (Si + Física o Si + Moral)
   */
  camposEntradaRegulares: boolean = false;

  /**
   * Campos de entrada para persona física extranjera (No + Física)
   */
  camposPersonaFisicaExtranjera: boolean = false;

  /**
   * Campos de entrada para persona moral extranjera (No + Moral)
   */
  camposPersonaMoralExtranjera: boolean = false;

  /**
   * Array de catálogos de países.
   */
  catalogoPaises: Catalogo[] = [];


  /**
   * Constructor - inicializa el form builder.
   * @param fb - Instancia de FormBuilder
   */
  constructor(private fb: FormBuilder, private store: Tramite120601Store, private query: Tramite120601Query, private empresaService: DatosEmpresaService, private consultaioQuery: ConsultaioQuery,) {
    // Si es necesario, se puede agregar aquí la lógica del constructor.
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe()
  }

  /**
   * Guarda los datos del formulario de importador/exportador.
   * Deshabilita los campos si el formulario está en modo solo lectura.
   */

  guardarDatosFormulario(): void {
    if (this.esFormularioSoloLectura) {
    this.FormSolicitud.get('datosGeneralesSocios.nacionalidad')?.disable();
    this.FormSolicitud.get('datosGeneralesSocios.persona')?.disable();
    this.FormSolicitud.get('datosGeneralesSocios.cadenaDependencia')?.disable();
  }else if (!this.esFormularioSoloLectura){
    this.FormSolicitud.get('datosGeneralesSocios.nacionalidad')?.enable();
    this.FormSolicitud.get('datosGeneralesSocios.persona')?.enable();
    this.FormSolicitud.get('datosGeneralesSocios.cadenaDependencia')?.enable();
  }
}

/**
 * Inicializa el estado del formulario. 
 * Guarda los datos del formulario y actualiza su estado.
 */

  inicializarEstadoFormulario(): void {
  this.guardarDatosFormulario();
  this.actualizarEstadoFormulario();
}

/**
 * Ajusta el estado de solo lectura del formulario.
 * Deshabilita o habilita los campos según corresponda.
 */
actualizarEstadoFormulario(): void {
  if (this.esFormularioSoloLectura) {
    this.FormSolicitud.disable();
  } else {
    this.FormSolicitud.enable();
  }
}

  /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.FormSolicitud.get(nombreControl);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  /**
   * Método para obtener el formulario de datos del solicitante.
   */
  get datosGeneralesSocios(): FormGroup {
    return this.FormSolicitud.get('datosGeneralesSocios') as FormGroup;
  } 

  /**
   * Hook del ciclo de vida - inicializa el componente y los formularios.
   */
  ngOnInit(): void {
    this.obtenerDatosTablaDeSocios();
    this.catalogoPaises = [
    { id: 1, descripcion: 'México' },
    { id: 2, descripcion: 'Estados Unidos' },
    { id: 3, descripcion: 'Canadá' },
  ]

    this.FormSolicitud = this.fb.group({
      datosGeneralesSocios: this.fb.group({
        nacionalidad: ['No', Validators.required],
        persona: ['No', Validators.required],
        cadenaDependencia: ['', Validators.required],
        // Campos para persona física extranjera
        nombre: [''],
        apellidoPaterno: [''],
        pais: [''],
        codigoPostal: [''],
        estado: [''],
        correoElectronico: ['', [Validators.pattern(REGEX_CORREO_ELECTRONICO_EXPORTADOR), Validators.required]],
        taxId: [''],
        denominacion: [''],
      }),
    });

    this.formularioParaConteoTotal = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
    });

    const TOTAL_ROW_COUNT = this.datosSocios.length;
    this.formularioParaConteoTotal.patchValue({ recuentoTotalDeFilas: TOTAL_ROW_COUNT });

    this.query.selectNacionalidad$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosGeneralesSocios: {
          nacionalidad: data
        }
      })
    });

    this.query.selectPersona$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosGeneralesSocios: {
          persona: data
        }
      })
    });

    this.query.selectCadenaDependencia$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.FormSolicitud.patchValue({
        datosGeneralesSocios: {
          cadenaDependencia: data
        }
      })
    });
   this.inicializarEstadoFormulario();
   const NACIONALIDAD = this.FormSolicitud.get(['datosGeneralesSocios', 'nacionalidad'])?.value;
   const TIPO_PERSONA = this.FormSolicitud.get(['datosGeneralesSocios', 'persona'])?.value;
   this.actualizarBanderasCamposEntrada(NACIONALIDAD, TIPO_PERSONA);
  }

  

  /**
   * Obtiene los datos de la tabla de socios desde el servicio.
   * Suscribe a los datos y los asigna a la variable `datosSocios`.
   */

  obtenerDatosTablaDeSocios(): void {
    this.empresaService.obtenerDatosTablaDeSocios().subscribe((data)=>{
      this.datosSocios = data;
    })

    this.empresaService.obtenerDatosTablaDeSociosExtranjeros().subscribe((data)=>{
      this.datosExtranjeros = data;
    })
  }

  /**
   * Agrega un nuevo socio a la lista de socios.
   * Dependiendo de los campos de entrada, agrega un socio regular o un socio extranjero.
   */
  agregarSocio(): void {
    if(this.camposEntradaRegulares){
       const NUEVOSOCIO: DatosSociosTable = {
      rfc: "DIP150930L62",
      razonsocial: "",
      nombre: "EUROFOODS",
      apellidoPaterno: "HONALEZ",
      apellidoM: "SINAL",
      correo: "vucem3.5@hotmail.com"
    }
    this.datosSocios.push(NUEVOSOCIO);
    }
    if(this.camposPersonaMoralExtranjera){
      const NUEVOSOCIOEXTRANJERO: DatosSociosTableExtranjeros= {
        taxID: "123456789",
        razonSocial: "DESARROLLOS INMOBILIARIOS",
        nombre: "EUROFOODS EXTRANJERO",
        apellidoPaterno: "HONALEZ",
        pais: "Estados Unidos",
        estado: "California",
        correo: "abc@gmail.com",
        codigoPostal: "12345"
      }
      this.datosExtranjeros.push(NUEVOSOCIOEXTRANJERO);
    }
     if(this.camposPersonaFisicaExtranjera){
      const NUEVOSOCIOEXTRANJERO: DatosSociosTableExtranjeros= {
        taxID: "123456789",
        razonSocial: "",
        nombre: "EUROFOODS EXTRANJERO",
        apellidoPaterno: "HONALEZ",
        pais: "Estados Unidos",
        estado: "California",
        correo: "abc@gmail.com",
        codigoPostal: "12345"
      }
      this.datosExtranjeros.push(NUEVOSOCIOEXTRANJERO);
    }
   
  }

  /**
   * Actualiza las banderas booleanas basadas en la combinación de nacionalidad y tipo de persona.
   * - Si (mexicana) + Física o Moral = camposEntradaRegulares
   * - No (extranjera) + Física = camposPersonaFisicaExtranjera  
   * - No (extranjera) + Moral = camposPersonaMoralExtranjera
   */
  actualizarBanderasCamposEntrada(nacionalidad :string, tipoPersona:string): void {
    const NACIONALIDAD = nacionalidad; 
    const TIPO_PERSONA = tipoPersona; 

    // Resetear todas las banderas
    this.camposEntradaRegulares = false;
    this.camposPersonaFisicaExtranjera = false;
    this.camposPersonaMoralExtranjera = false;

    // Determinar qué campos mostrar según la combinación
    if (NACIONALIDAD === 'Yes') { 
      this.camposEntradaRegulares = true;
    } 
    else if (NACIONALIDAD === 'No') { 
      if (TIPO_PERSONA === 'Yes') { 
        this.camposPersonaFisicaExtranjera = true;
      } else if (TIPO_PERSONA === 'No') { 
        this.camposPersonaMoralExtranjera = true;
      }
    }
  }

  /**
   * Maneja el evento de cambio en la selección de una fila de la tabla.
   * Actualiza el índice de la fila seleccionada y el estado del formulario.
   */
  enCambioNacionalidad(nacionalidad:string): void {
      const PERSONA_VALUE = this.FormSolicitud.get(['datosGeneralesSocios','persona'])?.value;
      setTimeout(()=>{
        this.actualizarBanderasCamposEntrada(nacionalidad,PERSONA_VALUE);
      }, 300);
      const NACIONALIDAD_VALUE = this.FormSolicitud.get(['datosGeneralesSocios', 'nacionalidad'])?.value;
      this.store.setNacionalidad(NACIONALIDAD_VALUE);
  }

  /**
   * Maneja el evento de cambio en la selección de una fila de la tabla.
   */

  enCambioPersona(tipoPersona:string): void {
      const PERSONA_VALUE = this.FormSolicitud.get(['datosGeneralesSocios','persona'])?.value;
      this.store.setPersona(PERSONA_VALUE);
      setTimeout(()=>{
        this.actualizarBanderasCamposEntrada(this.FormSolicitud.get(['datosGeneralesSocios','nacionalidad'])?.value, tipoPersona);
      }, 300);
  }

   /**
   * Método para actualizar el valor del campo en el store.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.store.establecerDatos({ [campo]: VALOR });
   
  }
  /**
   * Maneja el evento de cambio en la cadena de dependencia.
   * Actualiza el estado del store con el nuevo valor de la cadena de dependencia.
   */

  enCambioCadenaDependencia(): void {
    this.store.setCadenaDependencia(this.FormSolicitud.get(['datosGeneralesSocios','cadenaDependencia'])?.value);
  }

  /**
   * Hook del ciclo de vida - se ejecuta cuando el componente se destruye.
   * Libera los recursos y completa el Subject `destroyed$`.
   * @param {void}
   */

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
