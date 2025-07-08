import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, CrosslistComponent, InputRadioComponent, ModeloDeFormaDinamica, TituloComponent } from '@libs/shared/data-access-user/src';
import { EsquemaDeCertificacionService } from '../../services/esquema-de-certificacion.service';
import { Subject, takeUntil } from 'rxjs';
import { CROSLISTA_ENTRADA } from '../../constants/croslista.enums';
import { SociedadesTablaComponent } from '../sociedades-tabla/sociedades-tabla.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CLASIFICACION, CONFIGURACION, CONFIGURACION_COMERCIAL_CERTIFICADO, PAGO_DE_DERECHOS, RADIO_OPCIONS } from '../../constants/agente-aduanal.enum';

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

  constructor(
    private esquemaDeCertificacionSvc: EsquemaDeCertificacionService
  ) {

  }

  ngOnInit(): void {
    this.getIndiqueCatalogoDatos();
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
  

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
