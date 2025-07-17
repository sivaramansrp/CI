import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, CrosslistComponent, InputRadioComponent, ModeloDeFormaDinamica, TituloComponent } from '@libs/shared/data-access-user/src';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { EsquemaDeCertificacionService } from '../../services/esquema-de-certificacion.service';
import { map, Subject, takeUntil } from 'rxjs';
import { CROSLISTA_ENTRADA } from '../../constants/croslista.enums';
import { SociedadesTablaComponent } from '../sociedades-tabla/sociedades-tabla.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CLASIFICACION, CONFIGURACION, CONFIGURACION_COMERCIAL_CERTIFICADO, PAGO_DE_DERECHOS, RADIO_OPCIONS } from '../../constants/agente-aduanal.enum';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Tramite32612Query } from '../../estados/solicitud32612.query';
import { Solicitude32612DosState, Tramite32612DosStore } from '../../estados/solicitud32612Dos.store';
import { Tramite32612DosQuery } from '../../estados/solicitud32612Dos.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-agente-aduanal',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    CrosslistComponent,
    TituloComponent,
    SociedadesTablaComponent,
    FormasDinamicasComponent,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent
  ],
  templateUrl: './agente-aduanal.component.html',
  styleUrl: './agente-aduanal.component.scss',
})
export class AgenteAduanalComponent implements OnInit,OnDestroy {

  @Input() consultaState!: ConsultaioState;
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
  private destroyNotifier$: Subject<void> = new Subject();
  public indiqueCatalogo: Catalogo[] = [];
  public seleccionarAduanasEntrada = CROSLISTA_ENTRADA;
  public seleccionadasAduanasEntradaDatos: string[] = [];
  public aduanasEntradaBotons = [
    {
      btnNombre: 'Agregar',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Eliminar',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Eliminar todas',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  public formaAgente!: FormGroup;
  public forma: FormGroup = new FormGroup({
    agenteFormGroup: new FormGroup({}),
    comercialCertificadoFormGroup: new FormGroup({}),
    clasificacionFormGroup: new FormGroup({}),
    pagoDeDerechosFormGroup: new FormGroup({})
  });
  public agenteDatos = CONFIGURACION;
  public opcionDeBotonDeRadio = RADIO_OPCIONS;
  public comercialCertificadoDatos: ModeloDeFormaDinamica[] = CONFIGURACION_COMERCIAL_CERTIFICADO;
  public clasificacionDatos = CLASIFICACION;
  public pagoDeDerechosDatos = PAGO_DE_DERECHOS;
  public solicitudeState!: Solicitude32612State;
  public solicitudeDosState!: Solicitude32612DosState;
  public esFormularioSoloLectura: boolean = false;

  constructor(
    private esquemaDeCertificacionSvc: EsquemaDeCertificacionService,
    private tramite32612Store: Tramite32612Store,
    private tramite32612Query: Tramite32612Query,
    private fb: FormBuilder,
    private tramiteStore: Tramite32612DosStore,
    private tramiteQuery: Tramite32612DosQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.crearFormulario();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.tramite32612Query.selectSolicitude$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeState = seccionState;
        })
      ).subscribe();
    this.tramiteQuery.selectSolicitudeDos$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeDosState = seccionState;
        })
      ).subscribe();
    this.getIndiqueCatalogoDatos();
    this.crearFormulario();
  }

  get agenteFormGroup(): FormGroup {
    return this.forma.get('agenteFormGroup') as FormGroup;
  }

  get comercialCertificadoFormGroup(): FormGroup {
    return this.forma.get('comercialCertificadoFormGroup') as FormGroup;
  }

  get clasificacionFormGroup(): FormGroup {
    return this.forma.get('clasificacionFormGroup') as FormGroup;
  }

  get pagoDeDerechosFormGroup(): FormGroup {
    return this.forma.get('pagoDeDerechosFormGroup') as FormGroup;
  }

  public crearAgenteForm(): void {
    this.formaAgente = this.fb.group({
      numeroPatente: [this.solicitudeDosState?.numeroPatente],
      numeroRegistro: [this.solicitudeDosState?.numeroRegistro],
      nombreAgenteAduanal: [this.solicitudeDosState?.nombreAgenteAduanal],
      numeroTrabajadoresIMSS: [this.solicitudeDosState?.numeroTrabajadoresIMSS],
      numeroTrabajadoresContratistas: [this.solicitudeDosState?.numeroTrabajadoresContratistas],
      serviciosAdicionales: [this.solicitudeDosState?.serviciosAdicionales],
      indique: [this.solicitudeDosState?.indique]
    });
  }

  public getIndiqueCatalogoDatos(): void {
    this.esquemaDeCertificacionSvc.getIndiqueCatalogo().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.indiqueCatalogo = API_RESPONSE.data;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }

  public seleccionarDatos(CAMPOS: { campo: string, control: string }[] = [
    { campo: 'pagina', control: 'paginaElectronica' },
    { campo: 'correo', control: 'correoElectronico' },
    { campo: 'telefonoUno', control: 'telefonoContacto' },
    { campo: 'lada', control: 'telefonoContacto' },
    { campo: 'telefonoDos', control: 'telefonoContacto' },
    { campo: 'ladaDos', control: 'telefonoContacto' },
    { campo: 'telefonoTres', control: 'telefonoContacto' },
    { campo: 'ladaTres', control: 'telefonoContacto' }
  ]): void {
    if (!Array.isArray(this.comercialCertificadoDatos)) { return; }
    if (!CAMPOS.length) { return; }

    const [{ campo: CAMPO, control: CONTROL }, ...REST] = CAMPOS;
    const CONTROL_VALUE = this.comercialCertificadoFormGroup.get(CONTROL)?.value;
    const INDEX = this.comercialCertificadoDatos.findIndex((ITEM: Partial<ModeloDeFormaDinamica>) => ITEM.campo === CAMPO);

    if (INDEX !== -1) {
      this.comercialCertificadoDatos[INDEX] = {
        ...this.comercialCertificadoDatos[INDEX],
        mostrar: CONTROL_VALUE === 'Si'
      };
    }

    if (REST.length) {
      this.seleccionarDatos(REST);
    }
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite32612DosStore): void {
    const VALOR = form.get(campo)?.value;
    (this.tramiteStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  public crearFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearAgenteForm();
    }
  }

  public guardarDatosFormulario(): void {
    this.crearAgenteForm();
    if (this.esFormularioSoloLectura) {
      this.formaAgente.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formaAgente.enable();
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
