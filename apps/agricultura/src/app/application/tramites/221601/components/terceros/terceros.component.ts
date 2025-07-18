import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from '@libs/shared/data-access-user/src';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Exportador,
  MENSAJE_TABLA_OBLIGATORIA,
  CONFIGURATION_TABLA_DATOS,
  CONFIGURATION_TABLA_DESTINATARIO,
  Destinatario
} from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  Solicitud221601State,
  Tramite221601Store
} from '../../../../estados/tramites/tramite221601.store';
import {
  Subject,
  map,
  takeUntil
} from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ModalComponent } from '../modal/modal.component';
import { Tramite221601Query } from '../../../../estados/queries/tramite221601.query';
import realizar from '@libs/shared/theme/assets/json/221601/zoosanitario.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terceros',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    ModalComponent,
    CommonModule
  ],
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss']
})
export class TercerosComponent implements OnInit, OnDestroy {
  datosPersonales!: FormGroup;
  tipoPersonaForm!: FormGroup;
  showtercerosModal = false;
  public paisCatalogo: Catalogo[] = realizar.pais;
  public estadoCatalogo: Catalogo[] = realizar.estado;
  public municipioCatalogo: Catalogo[] = realizar.municipio;
  public coloniaCatalogo: Catalogo[] = realizar.colonia;
  TEXTOS: string = MENSAJE_TABLA_OBLIGATORIA;
  exportador: Exportador[] = realizar.exportador;
  public checkbox = TablaSeleccion.CHECKBOX;
  configuracionTabla: ConfiguracionColumna<Exportador>[] = CONFIGURATION_TABLA_DATOS;
  destinatario: Destinatario[] = [];
  configuracionTablaDatos: ConfiguracionColumna<Destinatario>[] = CONFIGURATION_TABLA_DESTINATARIO;
  public solicitudState!: Solicitud221601State;
  private destroyNotifier$: Subject<void> = new Subject();
  showFisicaRow: boolean = true;
  showMoralRow: boolean = true;
  showPlantaRow: boolean = false;
  esFormularioSoloLectura: boolean = false;

  nombreEstablecimientoTif: string = '';
  numeroEstablecimientoTif: string = '';

  constructor(
    private fb: FormBuilder,
    private tramite221601Store: Tramite221601Store,
    private tramite221601Query: Tramite221601Query,
    private consultaioQuery: ConsultaioQuery,
    private readonly cdr: ChangeDetectorRef,
    private validacionesService: ValidacionesFormularioService,
  ) {
    this.exportadorSeleccionado = [];
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.inicializarCertificadoFormulario();
  }

  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

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
      nombre: [this.solicitudState.nombre, [Validators.required, Validators.maxLength(200)]],
      primerApellido: [this.solicitudState.primerApellido, [Validators.required, Validators.maxLength(200)]],
      segundoApellido: [this.solicitudState.segundoApellido, Validators.maxLength(200)],
      social: [this.solicitudState.social, [Validators.required, Validators.maxLength(250)]],
      pais: [this.solicitudState.pais, Validators.required],
      codigo: [this.solicitudState.codigo, Validators.maxLength(5)],
      estado: [this.solicitudState.estado, Validators.required],
      municipio: [this.solicitudState.municipio, Validators.required],
      colonia: [this.solicitudState.colonia],
      calle: [this.solicitudState.calle, [Validators.required, Validators.maxLength(100)]],
      exterior: [this.solicitudState.exterior, [Validators.required, Validators.maxLength(55)]],
      interior: [this.solicitudState.interior],
      lada: [this.solicitudState.lada, Validators.maxLength(5)],
      telefono: [this.solicitudState.telefono],
      correoElectronico: [this.solicitudState.correoElectronico, Validators.required],
      tif: [this.solicitudState.tif],
    });

    this.datosPersonales.get('pais')?.setValue(this.paisCatalogo[0].id);
    this.tipoPersonaForm.get('tipoPersona')?.valueChanges.subscribe(value => {
      this.handleTipoPersonaChange(value);
    });
    this.updateStoreWithFormData();
  }

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

  updateStoreWithFormData(): void {
    const UPDATE_PERSONALES_FORM: Solicitud221601State = {
      ...this.solicitudState,
      pais: this.datosPersonales.get('pais')?.value,
    };
    this.tramite221601Store.update(UPDATE_PERSONALES_FORM);
  }

  handleTipoPersonaChange(tipoPersona: string): void {
    if (tipoPersona === 'fisica') {
      this.showFisicaRow = true;
      this.showMoralRow = false;
      this.showPlantaRow = false;
      this.datosPersonales.enable();
    } else if (tipoPersona === 'moral') {
      this.showFisicaRow = false;
      this.showMoralRow = true;
      this.showPlantaRow = false;
      this.datosPersonales.enable();
    } else if (tipoPersona === 'planta') {
      this.showPlantaRow = true;
      this.showFisicaRow = false;
      this.showMoralRow = true;
      this.datosPersonales.disable();
    }
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  guardarDestinatario(): void {
    const FORM_VALUE = this.datosPersonales.value;
    const NUEVO_DESTINATARIO = {
      nombreDenominacionORazonSocial: FORM_VALUE.nombre || FORM_VALUE.social,
      telefono: FORM_VALUE.telefono,
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
    this.destinatario.push(NUEVO_DESTINATARIO);
    this.showtercerosModal = !this.showtercerosModal;
  }

  limpiarDatosFormulario(): void {
    this.cdr.detectChanges();
    this.datosPersonales.reset();
  }

  cancelarDestinatario(): void {
    this.showtercerosModal = !this.showtercerosModal;
  }

  tercerosAgregar(): void {
    this.showtercerosModal = !this.showtercerosModal;
  }

  exportadorSeleccionado: any[];

  onExportadorSeleccionado(filas: any[]) {
    this.exportadorSeleccionado = filas;
  }

  limpiarBusquedaTif(): void {
    this.nombreEstablecimientoTif = '';
    this.numeroEstablecimientoTif = '';
  }

}
