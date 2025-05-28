import { ADUANA_DATA, CLAVE_SCIAN_DATA, DESCRIPCION_SCIAN_DATA, ESTADO_DATA, REGIMEN_AL_QUE_DATA } from '../../constants/catalogs.enum';

import { AlertComponent, Catalogo, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CONFIGURACION_COLUMNAS_MERCANCIAS, CONFIGURACION_COLUMNAS_SOLI } from '../../constants/column-config.enum';
import { HACERLOS_RADIO_OPTIONS, LOCALIDAD_COLONIA, OPCION_DE_BOTON_DE_RADIO, TEXTOS } from '../../constants/constantes.enum';

import { FilaData, FilaData2 } from '../../models/fila-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud260919State, Solicitud260919Store } from '../../estados/tramites260919.store';
import { Solicitud260919Query } from '../../estados/tramites260919.query';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ImportarDeRemediosHerbalsService } from '../../services/importar-de-remedios-herbals.service';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputRadioComponent,TituloComponent,CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent,InputCheckComponent,NotificacionesComponent,AlertComponent,NotificacionesComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
})
export class DatosdelasolicitudComponent implements OnInit,OnDestroy {
   /** Formulario principal para los datos de la solicitud */
   dataDeLaSolicitudForm!: FormGroup;

   /** Constantes de texto utilizadas en el componente */
   TEXTOS = TEXTOS;
 
   /** Estado actual de los datos de la solicitud */
   dataDeLaSolicitudState!: Solicitud260919State;
 
   /** Sujeto para manejar la destrucción de observables */
   private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
 
   /** Formulario para la clave SCIAN */
   clavaScianForm!: FormGroup;
 
   /** Indica si se muestra el formulario de clave SCIAN */
   public showClavaScianForm: boolean = false;
 /** Habilita o deshabilita el estado */
 habilitarEstado: boolean = true;

 /** Selección de mercancias */
 hercelosSeleccionados!: string;

 /** Datos seleccionados de mercancias */
 selectedMercanciasDatos: FilaData2[] = [];

 /** Configuración de la tabla de mercancias */
 public mercanciasConfiguracionTabla: FilaData2[] = [];


  /** Referencia al modal de alerta */
  @ViewChild('modalAlerta') modalElement!: ElementRef;

  /** Fecha inicial seleccionada */
  fechaInicialSeleccionada: string = '';

  /** Fecha final seleccionada */
  fechaFinalSeleccionada: string = '';
  
/** Opciones para el botón de radio */
opcionDeBotonDeRadio = OPCION_DE_BOTON_DE_RADIO;


  /** Tipo de selección para las mercancias */
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /** Datos de la tabla */
  tableData: FilaData[] = [];

 /** Datos de las mercancías. */
  mercanciasData: FilaData2[] = [];

  /** Opciones para el botón de radio de hacerlos */
  hacerlosRadioOptions = HACERLOS_RADIO_OPTIONS;


  /** Configuración de datos del estado */
  public estadoData = ESTADO_DATA;

  /** Configuración de datos de clave SCIAN */
  public claveScianData = CLAVE_SCIAN_DATA;

  /** Configuración de descripción del SCIAN */
  public descripcionDelScianData = DESCRIPCION_SCIAN_DATA;

  /** Configuración de datos del régimen */
  public regimenalqueData = REGIMEN_AL_QUE_DATA;

  /** Configuración de datos de la aduana */
  public aduanaData = ADUANA_DATA;
   /** 
 * Constante de texto utilizada para mostrar información relacionada con la localidad y colonia.
 */
  public TEXTO = LOCALIDAD_COLONIA;

/** 
 * Clase CSS utilizada para mostrar un mensaje de alerta con estilo de advertencia.
 */
public infoAlert = 'alert-warning';

rfc: string = 'MAVL621207C95';

  /**
 * Constructor del componente.
 * @param fb - Constructor para crear formularios reactivos.
 * @param importarDeRemediosHerbals - Servicio para obtener datos relacionados con remedios herbales.
 * @param cdr - Servicio para detectar y actualizar cambios en el componente.
 * @param solicitud260919Store - Almacén para gestionar el estado de la solicitud 260919.
 * @param solicitud260919Query - Consulta para obtener datos del estado de la solicitud 260919.
 */
constructor(private fb: FormBuilder, 
  private importarDeRemediosHerbals: ImportarDeRemediosHerbalsService,
  private cdr: ChangeDetectorRef,
  private solicitud260919Store: Solicitud260919Store,
  private solicitud260919Query: Solicitud260919Query) {}

 /** Configuración de columnas para la tabla de solicitud */
 configuracionColumnasoli = CONFIGURACION_COLUMNAS_SOLI;

 /** Configuración de columnas para la tabla de mercancias */
 mercanciasDatos = CONFIGURACION_COLUMNAS_MERCANCIAS;

 /**
   * Razón social legal del solicitante.
   */
 legalRazonSocial: string = '';

 /**
  * Apellido paterno del solicitante.
  */
 apellidoPaterno: string = '';

 /**
  * Apellido materno del solicitante.
  */
 apellidoMaterno: string = '';

 public nuevaNotificacion!: Notificacion;
  elementoParaEliminar!: number;
  pedimentos: Array<Pedimento> = [];

/** Inicialización del componente */
  ngOnInit(): void {
   this.solicitud260919Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.dataDeLaSolicitudState = seccionState;
          })
        )
        .subscribe();
    
    this.createForm();
    this.getEstadosData();
    this.getClaveScianData();
    this.getRegimenalqueData();
    this.getAduanaData();
    this.getMercanciasData();
  }
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Por el momento no hay comunicación con el Sistema de COFEPRIS, favorde capturar su establecimiento. Acerar',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    }
   
    this.elementoParaEliminar = i;
  }
  /** Configuración del formulario con validaciones para los campos del trámite. */
createForm(): void{
  this.dataDeLaSolicitudForm = this.fb.group({
    datosDelTramiteRealizar: this.fb.group({
      tipoOperacion:[{ value: this.dataDeLaSolicitudState.tipoOperacion || ''}],
      justification: [{ value: this.dataDeLaSolicitudState.justification || '', disabled: true },[Validators.maxLength(2000)]],
      rfcDel:[this.dataDeLaSolicitudState?.rfcDel,[Validators.maxLength(13), Validators.pattern('^[A-Za-z0-9]+$')]],
      denominacion: [this.dataDeLaSolicitudState?.denominacion, [Validators.maxLength(100)]],
      correoElectronico: [this.dataDeLaSolicitudState?.correoElectronico, [Validators.email, Validators.maxLength(100)]],
      codigopostal: [this.dataDeLaSolicitudState?.codigopostal, [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern('^[0-9]+$'), 
      ]],
      estado: [this.dataDeLaSolicitudState?.estado, Validators.required],
      municipoyalcaldia: [this.dataDeLaSolicitudState?.municipoyalcaldia, Validators.required],
      localidad: [this.dataDeLaSolicitudState?.localidad, [
        Validators.required,
        Validators.maxLength(120),
        Validators.pattern('^[a-zA-Z0-9 ]+$'),
      ]],
      colonia: [this.dataDeLaSolicitudState?.colonia, [Validators.maxLength(120)]],
      calle: [this.dataDeLaSolicitudState?.calle, [Validators.maxLength(100)]],
      lada: [this.dataDeLaSolicitudState?.lada, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern('^[0-9]+$'), 
      ],],
      telefono: [this.dataDeLaSolicitudState?.telefono,[
        Validators.required,
        Validators.maxLength(30), 
        Validators.pattern('^[0-9]+$'),
      ],],
      avisoDeFuncionamiento: [this.dataDeLaSolicitudState?.avisoDeFuncionamiento || false],
      licenciaSanitaria: [
        { value: this.dataDeLaSolicitudState?.licenciaSanitaria || '', disabled: this.dataDeLaSolicitudState?.avisoDeFuncionamiento },
        Validators.required,
      ],
      regimenalque: [this.dataDeLaSolicitudState?.regimenalque, Validators.required],
      aduana: [this.dataDeLaSolicitudState?.aduana, Validators.required],
      rfc: [this.dataDeLaSolicitudState?.rfc || this.rfc],
      legalRazonSocial: [this.dataDeLaSolicitudState?.legalRazonSocial],
      apellidoPaterno: [this.dataDeLaSolicitudState?.apellidoPaterno],
      apellidoMaterno: [this.dataDeLaSolicitudState?.apellidoMaterno],
    }),
   
  });
}

 /** Obtiene el formulario de datos del trámite a realizar */

 get datosDelTramiteRealizar(): FormGroup {
  return this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar') as FormGroup;
}

/**
 * Método para alternar el estado del control de licencia sanitaria.
 * Si el aviso de funcionamiento está activado, deshabilita el control de licencia sanitaria.
 * De lo contrario, habilita el control de licencia sanitaria.
 */
toggleLicenciaSanitaria(): void {
  const AVISO_DE_FUNCIONAMIENTO = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.avisoDeFuncionamiento')?.value;
  const LICENCIA_SANITARIA_CONTROL = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.licenciaSanitaria');

  if (AVISO_DE_FUNCIONAMIENTO) {
    LICENCIA_SANITARIA_CONTROL?.disable();
  } else {
    LICENCIA_SANITARIA_CONTROL?.enable();
  }

  //  const avisoDeFuncionamientoControl = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.avisoDeFuncionamiento');
  // const licenciaSanitariaControl = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.licenciaSanitaria');

  // if (!avisoDeFuncionamientoControl || !licenciaSanitariaControl) {
  //   console.error('Form controls are not defined');
  //   return;
  // }
  // console.log('Initial avisoDeFuncionamiento value:', avisoDeFuncionamientoControl?.value);
  // console.log('Initial licenciaSanitaria value:', licenciaSanitariaControl?.value);
  // // Listen to changes in avisoDeFuncionamiento
  // avisoDeFuncionamientoControl?.valueChanges.subscribe((isChecked) => {
  //   console.log('avisoDeFuncionamiento changed:', isChecked);

  //   if (isChecked) {
  //     licenciaSanitariaControl?.disable(); // Disable licenciaSanitaria if aviso is checked
  //   } else {
  //     licenciaSanitariaControl?.enable(); // Enable licenciaSanitaria if aviso is unchecked
  //   }
  // });

  // // Listen to changes in licenciaSanitaria
  // licenciaSanitariaControl?.valueChanges.subscribe((value) => {
  //   console.log('licenciaSanitaria changed:', value);

  //   if (value) {
  //     avisoDeFuncionamientoControl?.setValue(true); // Check avisoDeFuncionamiento if licenciaSanitaria has a value
  //     licenciaSanitariaControl.disable(); // Disable licenciaSanitaria
  //   }
  // });
}
/**
 * Método para manejar el evento de cambio en el tipo de operación.
 * Si el tipo de operación es "modificación", habilita el control de justificación.
 * En caso contrario, deshabilita el control de justificación y limpia su valor.
 */
changeEvent(): void{
  
  const TIPO_OPERACION = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.tipoOperacion')?.value;
  const JUSTIFICACION_CONTROL = this.dataDeLaSolicitudForm.get('datosDelTramiteRealizar.justification'); 

      if (TIPO_OPERACION === 'modificacion') {
        JUSTIFICACION_CONTROL?.enable(); 
      } else {
        JUSTIFICACION_CONTROL?.disable(); 
        JUSTIFICACION_CONTROL?.setValue(''); 
      }
    
}

   /** Obtiene los datos de los estados */
  getEstadosData(): void {
    this.importarDeRemediosHerbals.getEstadosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.estadoData.catalogos = data as Catalogo[];
      });
  }
    /** Obtiene los datos de clave SCIAN */
  getClaveScianData(): void {
    this.importarDeRemediosHerbals.getClaveScianData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
      this.tableData = data as unknown as FilaData[];
      });
  }

  /**
 * Método para obtener los datos de las mercancías.
 * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de las mercancías.
 * Los datos obtenidos se asignan a la propiedad `mercanciasData`.
 */
  getMercanciasData(): void {
    this.importarDeRemediosHerbals.getMercanciasData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
      this.mercanciasData = data as unknown as FilaData2[];
      });
  }


    /** Obtiene los datos del régimen */
  getRegimenalqueData(): void{
    this.importarDeRemediosHerbals.getRegimenalqueData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.regimenalqueData.catalogos = data as Catalogo[];
      });
  }

    /** Obtiene los datos de la aduana */
  getAduanaData(): void{
    this.importarDeRemediosHerbals.getAduanaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.aduanaData.catalogos = data as Catalogo[];
      });
  }


  /**
 * Método para habilitar el formulario de datos de la solicitud.
 * Cambia el estado de `habilitarEstado` a falso y habilita todos los campos del formulario.
 */
  aceptar(): void {
    this.dataDeLaSolicitudForm.enable();
    this.dataDeLaSolicitudForm.enable();
    this.habilitarEstado = false;
  }

  seleccionarEstablecimiento(): void {
    this.abrirModal(0);
  }

  getSolicitudData(): void {
    this.importarDeRemediosHerbals.getSolicitudData().subscribe((data) => {
      if (data && data.length > 0) {
        const SOLICITUD_DATA = data[0];
        this.datosDelTramiteRealizar.patchValue({
          legalRazonSocial: SOLICITUD_DATA.nombreORazónSocial,
          apellidoPaterno: SOLICITUD_DATA.apellidoPaterno,
          apellidoMaterno: SOLICITUD_DATA.apellidoMaterno,
        });
        this.datosDelTramiteRealizar.get('legalRazonSocial')?.disable();
        this.datosDelTramiteRealizar.get('apellidoPaterno')?.disable();
        this.datosDelTramiteRealizar.get('apellidoMaterno')?.disable();
      }
      
    });
 
  }

/**
 * Método para establecer valores en el store de la solicitud.
 * Obtiene el valor de un campo del formulario y lo asigna al método correspondiente en el store.
 * @param form - Formulario reactivo que contiene los datos.
 * @param campo - Nombre del campo del formulario cuyo valor se desea obtener.
 * @param metodoNombre - Nombre del método en el store donde se asignará el valor.
 */
setValoresStore(
  form: FormGroup,
  campo: string,
  metodoNombre: keyof Solicitud260919Store
): void {
  const VALOR = form.get(campo)?.value;
  (this.solicitud260919Store[metodoNombre] as (value: unknown) => void)(VALOR);
}

  /** Destrucción del componente */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}