import { AlertComponent, BtnContinuarComponent, Catalogo, CatalogoSelectComponent, CatalogosSelect, DATOS_EMPRESA, InputRadioComponent, ListaPasosWizard, Notificacion, NotificacionesComponent, Pedimento, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { ESTADO_DATA, PAIS_DATA, RADIO_OPCION, REPRESENTACION_FEDERAL_DATA, SELECCION_DE_SUCURSAL_DATA, SOCIOS_Y_ACCIONISTAS_DATA, SOCIOS_Y_ACCIONISTAS_EXTRANJEROS_DATA, TIPO_DE_PERSONA, TIPO_EMPRESA_DATA } from '../../constants/column-config.enum';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ReplaySubject, map, takeUntil } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { SociosYAccionistasData, SociosYAccionistasExtranjerosData } from '../../models/filaData.modal';
import { Solicitud120603State, Solicitud120603Store } from '../../estados/tramite120603.store';
import { CommonModule } from '@angular/common';
import { RegistroComoEmpresaService } from '../../services/registro-como-empresa.service';
import { Solicitud120603Query } from '../../estados/tramite120603.query';

/** Componente que gestiona los datos de la empresa en el formulario */
@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, ReactiveFormsModule, BtnContinuarComponent, CatalogoSelectComponent, TablaDinamicaComponent, InputRadioComponent, NotificacionesComponent],
  templateUrl: './datos-empresa.component.html',
  styleUrl: './datos-empresa.component.scss',
})
export class DatosEmpresaComponent implements OnInit, OnDestroy {

  /** Formulario reactivo para gestionar los datos de la empresa */
  public formularioEmpresa!: FormGroup;

  /** Observable para gestionar la destrucción de suscripciones */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Constante que almacena los datos de la empresa */
  DATOS_EMPRESA: string = DATOS_EMPRESA;

  /** Descripción de la actividad económica */
  descripcionData = "Otros servicios como maquinas fotograficas que funcionan con monedas, de casilleros que functionan con monedas, de guardapaquetes";

  /** Lista de pasos del wizard */
  pasos: ListaPasosWizard[] = [];

  /** Datos federales y estatales */
  public federalEstatal!: Catalogo[];

  /** Estado de la solicitud */
  solicitud120603State: Solicitud120603State = {} as Solicitud120603State;

  /** Estado del formulario de la empresa */
  formularioEmpresaState!: Solicitud120603State;

  /** Datos de selección de sucursal */
  sucursalData = SELECCION_DE_SUCURSAL_DATA;

  /** Datos generales de socios y accionistas */
  datosGenerales: SociosYAccionistasData[] = [];

  /** Datos de la tabla de socios y accionistas extranjeros */
  datosTablaExtranjeros: SociosYAccionistasExtranjerosData[] = [];

  /** Tipo de selección de la tabla */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Datos de socios y accionistas */
  sociosYAccionistasData = SOCIOS_Y_ACCIONISTAS_DATA;

  /** Datos de socios y accionistas extranjeros */
  socioYAccionistasExtranjerosData = SOCIOS_Y_ACCIONISTAS_EXTRANJEROS_DATA;

  /** Opciones de selección mexicana */
  opcionSeleccionMexicana = RADIO_OPCION;

  /** Opciones de selección de tipo de persona */
  opcionSeleccionPersona = TIPO_DE_PERSONA;

  /** Valor seleccionado para la nacionalidad */
  public valorSeleccionadoNacionalidad: string = '';

  /** Valor seleccionado para el tipo de persona */
  public valorSeleccionadoPersona: string = '';

  /** Notificación nueva */
  public nuevaNotificacion!: Notificacion;

  /** Índice del elemento para eliminar */
  elementoParaEliminar!: number;

  /** Lista de pedimentos */
  pedimentos: Array<Pedimento> = [];
  
 /** Datos del estado */
 public estadoData: CatalogosSelect = ESTADO_DATA;

 /** Datos de representación federal */
 public representacionFederalData: CatalogosSelect = REPRESENTACION_FEDERAL_DATA;

 /** Datos del tipo de empresa */
 public tipoEmpresaData: CatalogosSelect = TIPO_EMPRESA_DATA;

 /** Datos del país */
 public paisData: CatalogosSelect = PAIS_DATA;

  /** Constructor del componente */
  constructor(
    private fb: FormBuilder,
    private registroComoEmpresa: RegistroComoEmpresaService,
    public solicitud120603Store: Solicitud120603Store,
    public solicitud120603Query: Solicitud120603Query
  ) {}

  /** Método del ciclo de vida que se ejecuta al inicializar el componente */
  ngOnInit(): void {
    this.solicitud120603Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioEmpresaState = seccionState;
        })
      )
      .subscribe();
    this.createForm();
    this.getEstadoData();
    this.getRepresentacionFederalData();
    this.getTipoDeEmpresaData();
    this.subscribeToTipoEmpresaChanges();
    this.subscribeToActividadEconomicaChanges();
    this.getSociosYAaccionistasData();
    this.getSociosYAccionistasExtranjerosData();
    this.getPaisData();
    this.subscribeToEstadoDataChanges();

    this.registroComoEmpresa.getRepresentacionFederalData().pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.subscribeToEstadoDataChanges();
    });
  }

  /** Método para suscribirse a los cambios en el tipo de empresa */
  private subscribeToTipoEmpresaChanges(): void {
    const TIPO_EMPRESA_CONTROL = this.formularioEmpresa.get('tipoEmpresa');
    const ACTIVIDAD_ECONOMICA_CONTROL = this.formularioEmpresa.get('actividadEconomicaPreponderante');

    TIPO_EMPRESA_CONTROL?.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
      if (value) {
        ACTIVIDAD_ECONOMICA_CONTROL?.enable();
      } else {
        ACTIVIDAD_ECONOMICA_CONTROL?.disable();
      }
    });
  }

  /** Método para suscribirse a los cambios en la actividad económica */
  private subscribeToActividadEconomicaChanges(): void {
    const ACTIVIDAD_ECONOMICA_CONTROL = this.formularioEmpresa.get('actividadEconomicaPreponderante');
    const DESCRIPCION_CONTROL = this.formularioEmpresa.get('descripcion');

    ACTIVIDAD_ECONOMICA_CONTROL?.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
      if (value) {
        DESCRIPCION_CONTROL?.setValue(this.descripcionData);
      }
    });
  }

  /** Método para crear el formulario reactivo */
  createForm(): void {
    this.formularioEmpresa = this.fb.group({
      estado: [this.formularioEmpresaState?.estado],
      representacionFederal: [this.formularioEmpresaState?.representacionFederal],
      tipoEmpresa: [this.formularioEmpresaState?.tipoEmpresa || '', Validators.required],
      especifique: [{ value: this.formularioEmpresaState?.especifique || '', disabled: true }, Validators.maxLength(20)],
      actividadEconomicaPreponderante: [{ value: this.formularioEmpresaState?.actividadEconomicaPreponderante || '', disabled: true }],
      descripcion: [{ value: this.formularioEmpresaState?.descripcion || '', disabled: true }],

      pais: [{ value: this.formularioEmpresaState.pais || '', disabled: true }],
      codigoPostal: [{ value: this.formularioEmpresaState.codigoPostal || '', disabled: true }],
      estadoDomicilio: [{ value: this.formularioEmpresaState.estadoDomicilio || '', disabled: true }],
      municipioAlcaldia: [{ value: this.formularioEmpresaState.municipioAlcaldia || '', disabled: true }],
      localidad: [{ value: this.formularioEmpresaState.localidad || '', disabled: true }],
      colonia: [{ value: this.formularioEmpresaState.colonia || '', disabled: true }],
      calle: [{ value: this.formularioEmpresaState.calle || '', disabled: true }],
      numeroExterior: [{ value: this.formularioEmpresaState.numeroExterior || '', disabled: true }],
      numeroInterior: [{ value: this.formularioEmpresaState.numeroInterior || '', disabled: true }],
      lada: [{ value: this.formularioEmpresaState.lada || '', disabled: true }],
      telefono: [{ value: this.formularioEmpresaState.telefono || '', disabled: true }],
      nacionalidad: [this.formularioEmpresaState?.nacionalidad || '', Validators.required],
      registroFederal: [this.formularioEmpresaState?.registroFederal || '', [Validators.required, Validators.minLength(13)]],
      tipoDePersona: [this.formularioEmpresaState?.tipoDePersona || '', Validators.required],
      nombre: [this.formularioEmpresaState.nombre],
      apellidoPaterno: [this.formularioEmpresaState.apellidoPaterno],
      apellidoMaterno: [this.formularioEmpresaState.apellidoMaterno],
      // Detalles de la empresa
      taxId: [this.formularioEmpresaState.taxId, Validators.required],
      razonSocial: [this.formularioEmpresaState.razonSocial],
      datosPais: [this.formularioEmpresaState.datosPais, Validators.required],
      datosCodigoPostal: [this.formularioEmpresaState.datosCodigoPostal],
      datosEstado: [this.formularioEmpresaState.datosEstado],
      correoElectronico: [this.formularioEmpresaState.correoElectronico],
    });
  }

  
  /** Método para eliminar un pedimento */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /** Método para abrir un modal */
  abrirModal(i: number = 0, mensaje: string = ''): void {
    console.log('Modal Triggered:', mensaje); // Debugging log

    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje || 'La entidad federativa seleccionada no cuenta con sucursales asociadas a su RFC para tramitar el Registro como Empresa de la Frontera',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };

    this.elementoParaEliminar = i;

    setTimeout(() => {
      this.nuevaNotificacion = null!;
    }, 2000);
    
  }
  checkRFCValidation(): void {
    const RFC_CONTROL = this.formularioEmpresa.get('registroFederal');
    console.log('RFC Validation Triggered:', RFC_CONTROL?.value); // Log the current value
    console.log('RFC_CONTROL invalid:', RFC_CONTROL?.invalid); // Log if the field is invalid
    console.log('RFC_CONTROL errors:', RFC_CONTROL?.errors); // Log the errors object
  
    if (RFC_CONTROL?.invalid && RFC_CONTROL?.errors?.['minlength'] && !this.nuevaNotificacion) {
      console.log('Calling abrirModal'); // Debugging log

      this.abrirModal(0, 'El RFC debe tener al menos 13 caracteres de longitud.');
    }
  }

  /** Getter para obtener la nacionalidad seleccionada */
  get selectedNacionalidad(): string | null {
    const VALUE = this.formularioEmpresa.get('nacionalidad')?.value;
    return VALUE;
  }

  /** Setter para establecer la nacionalidad seleccionada */
  setSelectedNacionalidad(value: string): void {
    this.formularioEmpresa.get('nacionalidad')?.setValue(value);
  }

  /** Getter para obtener el tipo de persona seleccionado */
  get selectedTipoPersona(): string | null {
    const VALUE = this.formularioEmpresa.get('tipoDePersona')?.value;
    return VALUE;
  }

  /** Setter para establecer el tipo de persona seleccionado */
  setSelectedTipoDePersona(value: string): void {
    this.formularioEmpresa.get('tipoDePersona')?.setValue(value);
  }

  /** Método para obtener los datos del estado */
  getEstadoData(): void {
    this.registroComoEmpresa
      .getEstadoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.estadoData.catalogos = data as Catalogo[];
      });
  }

  /** Método para obtener los datos de representación federal */
  getRepresentacionFederalData(): void {
    this.registroComoEmpresa
      .getRepresentacionFederalData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.representacionFederalData.catalogos = data as Catalogo[];
      });
  }

  /** Método para obtener los datos del tipo de empresa */
  getTipoDeEmpresaData(): void {
    this.registroComoEmpresa
      .getTipoDeEmpresaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.tipoEmpresaData.catalogos = data as Catalogo[];
      });
  }

  /** Método para obtener los datos de socios y accionistas */
  getSociosYAaccionistasData(): void {
    this.registroComoEmpresa
      .getSociosYAaccionistasData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.datosGenerales = data as unknown as SociosYAccionistasData[];
      });
  }

  /** Método para obtener los datos de socios y accionistas extranjeros */
  getSociosYAccionistasExtranjerosData(): void {
    this.registroComoEmpresa
      .getSociosYAccionistasExtranjerosData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.datosTablaExtranjeros = data as unknown as SociosYAccionistasExtranjerosData[];
      });
  }

  /** Método para obtener los datos del país */
  getPaisData(): void {
    this.registroComoEmpresa
      .getPaisData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.paisData.catalogos = data as Catalogo[];
      });
  }

  /** Método para agregar una nueva entrada a la tabla de socios y accionistas extranjeros */
  onAgregar(): void {
    const PAIS_ID = this.formularioEmpresa.get('datosPais')?.value;
    const PAIS_DESCRIPTION = this.paisData.catalogos.find((pais) => pais.id === Number(PAIS_ID))?.descripcion || '';
    const NEW_ENTRY: SociosYAccionistasExtranjerosData = {
      taxId: this.formularioEmpresa.get('taxId')?.value,
      razonSocial: this.formularioEmpresa.get('razonSocial')?.value,
      datosPais: PAIS_DESCRIPTION,
      datosCodigoPostal: this.formularioEmpresa.get('datosCodigoPostal')?.value,
      datosEstado: this.formularioEmpresa.get('datosEstado')?.value,
      correoElectronico: this.formularioEmpresa.get('correoElectronico')?.value,
      nombre: this.formularioEmpresa.get('nombre')?.value,
      apellidoPaterno: this.formularioEmpresa.get('apellidoPaterno')?.value,
    };

    this.datosTablaExtranjeros.push(NEW_ENTRY);
    this.formularioEmpresa.patchValue({
      taxId: '',
      razonSocial: '',
      datosPais: '',
      datosCodigoPostal: '',
      datosEstado: '',
      correoElectronico: '',
    });
  }

  /** Método para suscribirse a los cambios en el control del estado */
  private subscribeToEstadoDataChanges(): void {
    const ESTADO_CONTROL = this.formularioEmpresa.get('estado');
    const REPRESENTACION_FEDERAL_CONTROL = this.formularioEmpresa.get('representacionFederal');

    ESTADO_CONTROL?.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((estadoValue) => {
      if (estadoValue) {
        const REPRESENTACION_FEDERAL = this.representacionFederalData.catalogos.find(
          (item) => item.id === Number(estadoValue)
        );

        if (REPRESENTACION_FEDERAL) {
          REPRESENTACION_FEDERAL_CONTROL?.setValue(REPRESENTACION_FEDERAL.id);
        } 
       
        this.abrirModal();
        
      }
    });
  }

  /** Método para establecer valores en el store de la solicitud */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud120603Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud120603Store[metodoNombre] as (value: string | number | null) => void)(VALOR);
  }

  /** Método del ciclo de vida que limpia las suscripciones para evitar fugas de memoria */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}