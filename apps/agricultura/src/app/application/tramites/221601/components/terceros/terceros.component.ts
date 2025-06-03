import { AlertComponent,Catalogo,CatalogoSelectComponent,ConfiguracionColumna,TablaDinamicaComponent,TablaSeleccion,TituloComponent, ValidacionesFormularioService} from '@libs/shared/data-access-user/src';
import { Component,OnDestroy,OnInit, } from '@angular/core';
import { Exportador,MENSAJE_TABLA_OBLIGATORIA } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { Solicitud221601State,Tramite221601Store } from '../../../../estados/tramites/tramite221601.store';
import { Subject,map,takeUntil } from 'rxjs';
import { CONFIGURATION_TABLA_DATOS } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { CONFIGURATION_TABLA_DESTINATARIO } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Destinatario } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { ModalComponent } from '../modal/modal.component';
import { Tramite221601Query } from '../../../../estados/queries/tramite221601.query';
import realizar from '@libs/shared/theme/assets/json/221601/zoosanitario.json';

/**
 * Componente encargado de gestionar la visualización y exportación de datos relacionados con los exportadores y destinatarios.
 * Este componente muestra dos tablas dinámicas: una para los exportadores y otra para los destinatarios. 
 * Además, permite la exportación de los datos a formatos adecuados.
 * 
 * Este componente también incluye la gestión de la visualización de mensajes obligatorios para las tablas.
 * 
 * @component
 * @example
 * <app-terceros></app-terceros>
 * 
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `TablaDinamicaComponent`: Componente para mostrar tablas dinámicas con la posibilidad de ordenar y filtrar.
 * - `AlertComponent`: Componente para mostrar alertas.
 * 
 */
@Component({
  selector: 'app-terceros',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent, FormsModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,ModalComponent
  ],
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss']
})

/**
 * Componente encargado de gestionar los datos de exportadores y destinatarios dentro de una tabla dinámica.
 * También permite la exportación de los datos. 
 * 
 * @class
 * @example
 * <app-terceros></app-terceros>
 * 
 * @constructor
 * El componente no requiere de un constructor explícito para inicializar dependencias.
 * 
 * @property {string} TEXTOS - Mensaje a mostrar en la interfaz cuando una tabla es obligatoria.
 * @property {Exportador[]} exportador - Lista de exportadores que se obtiene desde un archivo JSON.
 * @property {Destinatario[]} destinatario - Lista de destinatarios que se obtiene desde un archivo JSON.
 * @property {TablaSeleccion} checkbox - Configuración para los checkboxes en las tablas.
 * @property {ConfiguracionColumna<Exportador>[]} configuracionTabla - Configuración de las columnas de la tabla de exportadores.
 * @property {ConfiguracionColumna<Destinatario>[]} configuracionTablaDatos - Configuración de las columnas de la tabla de destinatarios.
 * 
 */
export class TercerosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo que gestiona los datos personales del tercero,
   * incluyendo nombre, apellidos, domicilio, contacto, etc.
   */
  datosPersonales!: FormGroup;

  /**
   * Formulario reactivo que gestiona la selección del tipo de persona
   * (por ejemplo, física o moral).
   */
  tipoPersonaForm!: FormGroup;

  /**
   * Bandera booleana para controlar la visibilidad del modal de terceros.
   * Si es true, el modal se muestra; si es false, se oculta.
   */
  showtercerosModal = false;

  /**
   * Catálogo de países disponibles, utilizado para llenar un select en el formulario.
   */
  public paisCatalogo: Catalogo[] = realizar.pais;

  /**
   * Catálogo de estados disponibles, utilizado para llenar un select en el formulario.
   */
  public estadoCatalogo: Catalogo[] = realizar.estado;

  /**
   * Catálogo de municipios disponibles, utilizado para llenar un select en el formulario.
   */
  public municipioCatalogo: Catalogo[] = realizar.municipio;

  /**
   * Catálogo de colonias disponibles, utilizado para llenar un select en el formulario.
   */
  public coloniaCatalogo: Catalogo[] = realizar.colonia;
  /**
   * Mensaje que indica que la tabla es obligatoria.
   */
  TEXTOS: string = MENSAJE_TABLA_OBLIGATORIA;
  /**
   * Lista de exportadores obtenida desde un archivo JSON.
   * Cada exportador contiene información como nombre, teléfono, correo electrónico y domicilio.
   */
  exportador: Exportador[] =realizar.exportador;

  /**
   * Configuración de las columnas de la tabla de exportadores.
   * Define el encabezado, clave y el orden de las columnas para la tabla de exportadores.
   */
  public checkbox = TablaSeleccion.CHECKBOX;
   /**
   * Configuración de las columnas para la tabla de datos del exportador.
   * Se basa en el arreglo `CONFIGURATION_TABLA_DATOS`, que define los encabezados,
   * las claves de acceso a los datos del objeto `Exportador`, y el orden en que se deben mostrar.
   */
  configuracionTabla: ConfiguracionColumna<Exportador>[] =CONFIGURATION_TABLA_DATOS;

  /**
   * Lista de destinatarios obtenida desde un archivo JSON.
   * Cada destinatario contiene información como nombre, teléfono, correo electrónico y dirección.
   */
  destinatario: Destinatario[] = []

  /**
   * Configuración de las columnas de la tabla de destinatarios.
   * Define el encabezado, clave y el orden de las columnas para la tabla de destinatarios.
   */
  configuracionTablaDatos: ConfiguracionColumna<Destinatario>[] = CONFIGURATION_TABLA_DESTINATARIO ;

   /**
   * Estado actual de la solicitud 221601.
   * 
   * Contiene los datos persistentes y temporales relacionados con el trámite.
   */
   public solicitudState!: Solicitud221601State;

   /**
    * Subject utilizado para emitir una señal cuando el componente se destruye,
    * ayudando a evitar memory leaks al cancelar suscripciones.
    */
   private destroyNotifier$: Subject<void> = new Subject();
 
   /**
    * Controla la visibilidad de los campos correspondientes a persona física en la interfaz.
    */
   showFisicaRow: boolean = true;
 
   /**
    * Controla la visibilidad de los campos correspondientes a persona moral en la interfaz.
    */
   showMoralRow: boolean = true;
 
   /**
    * Controla la visibilidad de los campos correspondientes a datos de planta o establecimiento.
    */
   showPlantaRow: boolean = false;
   /** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
  esFormularioSoloLectura: boolean = false;
 /**
   * Constructor del componente.
   * 
   * Inyecta las dependencias necesarias para la creación de formularios reactivos, 
   * acceso al estado actual del trámite 221601 y modificación de dicho estado a través del store.
   *
   * @param fb - Servicio `FormBuilder` utilizado para crear y gestionar formularios reactivos.
   * @param tramite221601Store - Store que permite actualizar los valores relacionados con el trámite 221601.
   * @param tramite221601Query - Query utilizado para obtener el estado actual del trámite 221601.
   */
 constructor(
    private fb: FormBuilder,
    private tramite221601Store: Tramite221601Store,
    private tramite221601Query: Tramite221601Query,
     private consultaioQuery: ConsultaioQuery,
         private validacionesService: ValidacionesFormularioService, 
  ) { // Constructor que inyecta las dependencias necesarias
       this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe()
    }
 /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarCertificadoFormulario();
  }
 /**
   * Método para inicializar el formulario reactivo con los datos de la solicitud.
   * 
   * Este método configura los campos del formulario con los valores actuales del estado de la solicitud
   * y aplica las validaciones necesarias. También deshabilita ciertos campos y establece valores predeterminados.
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormulario()
    }  
  }
  /** Inicializa los datos del formulario suscribiéndose al estado del trámite.  
 *  Asigna el estado actual al modelo local del componente. */
   inicializarFormulario(): void {
     this.tramite221601Query.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState as Solicitud221601State;
            })
          )
          .subscribe();
          this.tipoPersonaForm = this.fb.group({
            tipoPersona: [this.solicitudState.tipoPersona, Validators.required],
          });
            this.datosPersonales = this.fb.group({
            nombre: [this.solicitudState.nombre, Validators.required],
            primerApellido: [this.solicitudState.primerApellido, Validators.required],
            segundoApellido: [this.solicitudState.segundoApellido],
            social: [this.solicitudState.social, Validators.required],
            pais: [this.solicitudState.pais, Validators.required],
            codigo: [this.solicitudState.codigo],
            estado: [this.solicitudState.estado, Validators.required],
            municipio: [this.solicitudState.municipio, Validators.required],
            colonia: [this.solicitudState.colonia],
            calle: [this.solicitudState.calle, Validators.required],
            exterior: [this.solicitudState.exterior, Validators.required],
            interior: [this.solicitudState.interior],
            lada: [this.solicitudState.lada],
            telefono: [this.solicitudState.telefono],
            correoElectronico: [this.solicitudState.correoElectronico,Validators.required],
            tif: [this.solicitudState.tif],
          });
         
          this.datosPersonales.get('pais')?.setValue(this.paisCatalogo[0].id);
          this.tipoPersonaForm.get('tipoPersona')?.valueChanges.subscribe(value => {
            this.handleTipoPersonaChange(value);
          });
          this.updateStoreWithFormData();
         
  }
    /**
   * @comdoc
   * Guarda los datos del formulario de combinación requerida.
   * 
   * Inicializa el formulario y ajusta su estado de habilitación según si es de solo lectura.
   * - Si el formulario es de solo lectura, lo deshabilita.
   * - Si no es de solo lectura, lo habilita.
   * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.tipoPersonaForm.disable();
        this.datosPersonales.disable();
      } else {
        this.tipoPersonaForm.enable();
        this.datosPersonales.enable();
      }
  }

   /**
 * Actualiza el estado del store `tramite221601Store` con los datos del formulario `MedioForm`.
 *
 * Extrae los valores de los campos `transporte` y `empresa` del formulario y los fusiona con el
 * estado actual `solicitudState`, creando un nuevo objeto que se usa para actualizar el store.
 *
 * @private
 * @returns void
 */
  updateStoreWithFormData(): void {
    const UPDATE_PERSONALES_FORM: Solicitud221601State = {
      ...this.solicitudState,    
      pais: this.datosPersonales.get('pais')?.value,
          
    };  
    // Actualiza el store con el estado modificado
    this.tramite221601Store.update(UPDATE_PERSONALES_FORM);
   
  }
    /**
   * Maneja el cambio del tipo de persona seleccionada (física, moral o planta).
   * 
   * Dependiendo del valor, se ajusta la visibilidad de las secciones del formulario y 
   * se habilita o deshabilita el formulario de datos personales.
   * 
   * @param tipoPersona - El tipo de persona seleccionado: 'fisica', 'moral' o 'planta'.
   */
  handleTipoPersonaChange(tipoPersona: string): void {
    if (tipoPersona === 'fisica') {
      this.showFisicaRow = true;
      this.showMoralRow = false;
      this.showPlantaRow=false;
      this.datosPersonales.enable();
    } else if (tipoPersona === 'moral') {
      this.showFisicaRow = false;
      this.showMoralRow = true;
      this.showPlantaRow=false;
      this.datosPersonales.enable();
    }else if (tipoPersona === 'planta') {
      this.showPlantaRow=true
      this.showFisicaRow = false;
      this.showMoralRow = true;
      this.datosPersonales.disable();

    }
  }
   /**
   * Método que actualiza el store con los valores del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221601Store): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite221601Store[metodoNombre] as (value: unknown) => void)(VALOR);
    }
     /**
   * Método que se ejecuta cuando el componente es destruido.
   * 
   * Libera los recursos y completa la notificación de destrucción del componente.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
    /**
   * Guarda los datos del destinatario ingresados en el formulario de datos personales.
   * 
   * Recoge los valores del formulario y crea un objeto con la estructura del destinatario,
   * incluyendo campos como nombre, teléfono, correo electrónico, dirección, etc. 
   * Luego, agrega este objeto a la lista de destinatarios y cierra el modal de terceros.
   */
    guardarDestinatario(): void {    
      // Se obtiene el valor actual del formulario de datos personales
      const FORM_VALUE = this.datosPersonales.value;
       // Se crea el objeto de nuevo destinatario con los valores obtenidos del formulario
      const NUEVO_DESTINATARIO = {
        nombreDenominacionORazonSocial: FORM_VALUE.nombre || FORM_VALUE.social,
        telefono:FORM_VALUE.telefono,
        correoElectronico: FORM_VALUE.correoElectronico,
        calle: FORM_VALUE.calle,
        numeroExterior: FORM_VALUE.exterior,
        numeroInterior: FORM_VALUE.interior,
        pais: this.paisCatalogo.find(item => item.id === Number(this.datosPersonales.value.pais))?.descripcion,
        colonia: FORM_VALUE.colonia,
        municipioOAlcaldia: FORM_VALUE.municipio,
        entidadFederativa: FORM_VALUE.estado,
        codigoPostal: FORM_VALUE.codigo,        
      };
      // Se agrega el nuevo destinatario a la lista de destinatarios
      this.destinatario.push(NUEVO_DESTINATARIO);
        // Se cierra el modal de terceros
      this.showtercerosModal = !this.showtercerosModal;    
    }
    /**
   * Cancela la operación de agregar un nuevo destinatario y cierra el modal de terceros.
   * 
   * Este método simplemente cambia el estado de la variable `showtercerosModal` para ocultar el modal,
   * lo que implica que se cancela la operación actual de agregar un destinatario.
   */
    cancelarDestinatario(): void {
      // Se cierra el modal de terceros cambiando el estado de la variable
      this.showtercerosModal = !this.showtercerosModal;
    }
     /**
   * Abre el modal para agregar un nuevo destinatario.
   * 
   * Este método cambia el estado de la variable `showtercerosModal` para mostrar el modal, permitiendo al usuario
   * agregar un nuevo destinatario. La variable `showtercerosModal` se alterna entre verdadero y falso para mostrar u ocultar el modal.
   */
  tercerosAgregar(): void {
    // Se abre el modal de terceros cambiando el estado de la variable
    this.showtercerosModal = !this.showtercerosModal;
  }

}
