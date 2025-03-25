import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  SolicitanteComponent,
} from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TableComponent } from '@libs/shared/data-access-user/src';

import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';

import {
  OBRA_DE_ARTE_HEADER_DATA,
  OPCIONES_DE_BOTON_DE_RADIO,
} from '../../constantes/aviso-siglos.enum';

import {
  AlertComponent,
  NavComponent,
} from '@libs/shared/data-access-user/src';

import { ModalComponent } from '../modal/modal.component';

import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';

import { TableData } from '../../models/aviso-siglos.models';

import { Tramite270201Store } from '../../estados/tramites/tramite270201.store';

const MANIFIESTO_ALERT =
  'Manifiesto que la información sobre la propiedád de la obra(s) y los datos técnicos de la obra(s) son ciertos y verdaderos.*';

const OBRA_DE_ARTE_ALERT =
  'Nota: Es indispensable proporcionar las medidas de cada pieza, ya que de no hacerlo se puede afectar la dictaminación de su solicitud';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TableComponent,
    TablaDinamicaComponent,
    TituloComponent,
    ReactiveFormsModule,
    AlertComponent,
    NavComponent,
    ModalComponent,
    InputRadioComponent,
    SolicitanteComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit {
  showTableDiv = true;

  showObraDeArteModal = false;

  operacionData: Catalogo[] = [];
  movimientoData: Catalogo[] = [];
  motivoData: Catalogo[] = [];
  paisData: Catalogo[] = [];
  transporteData: Catalogo[] = [];
  aduanaData: Catalogo[] = [];
  monedaData: Catalogo[] = [];
  arancelariaData: Catalogo[] = [];

  obraDeArteHeader = OBRA_DE_ARTE_HEADER_DATA;

  TEXTO_MANIFIESTO_ALERT = MANIFIESTO_ALERT;

  TEXTO_OBRA_ALERT = OBRA_DE_ARTE_ALERT;

  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  solicitudFormGroup!: FormGroup;
  obraDeArteFormgroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tramite270201Store: Tramite270201Store,
    private solicitudService: SolicitudService
  ) {
    // Constructor logic can be added here if needed
  }

  ngOnInit(): void {
    this.solicitudService.getOperacionData().subscribe((data) => {
      this.operacionData = data;
    });

    this.solicitudService.getMovimientoData().subscribe((data) => {
      this.movimientoData = data;
    });

    this.solicitudService.getPaisData().subscribe((data) => {
      this.paisData = data;
    });

    this.solicitudService.getTransporteData().subscribe((data) => {
      this.transporteData = data;
    });

    this.solicitudService.getAduanaData().subscribe((data) => {
      this.aduanaData = data;
    });

    this.solicitudService.getMotivoData().subscribe((data) => {
      this.motivoData = data;
    });

    this.solicitudService.getMonedaData().subscribe((data) => {
      this.monedaData = data;
    });

    this.solicitudService.getArancelariaData().subscribe((data) => {
      this.arancelariaData = data;
    });

    this.initializeSolicitudFormGroup();
    this.initializeObraDeArteFormGroup();

    this.TEXTO_MANIFIESTO_ALERT = `
    <div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="manifiestoCheckbox">
        <p>Manifiesto que la información sobre la propiedád de la obra(s) y los datos técnicos de la obra(s) son ciertos y verdaderos.*</p>
      </div>
    </div>
  `;
  }

  initializeSolicitudFormGroup(): void {
    this.solicitudFormGroup = this.fb.group({
      tipoDeOperacion: new FormControl('', [Validators.required]),
      tipoDeMovimiento: new FormControl('', [Validators.required]),
      motivo: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      medioTransporte: new FormControl('', [Validators.required]),
      aduanaEntrada: new FormControl('', [Validators.required]),
    });
  }

  initializeObraDeArteFormGroup(): void {
    this.obraDeArteFormgroup = this.fb.group({
      autor: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required]),
      tecnicaDeRealizacion: new FormControl('', [Validators.required]),
      medidas: new FormControl('', [Validators.required]),
      alto: new FormControl('', [Validators.required]),
      ancho: new FormControl('', [Validators.required]),
      profundidad: new FormControl('', [Validators.required]),
      diametro: new FormControl('', [Validators.required]),
      variables: new FormControl('', [Validators.required]),
      anoDeCreacion: new FormControl('', [Validators.required]),
      avaluo: new FormControl('', [Validators.required]),
      moneda: new FormControl('', [Validators.required]),
      propietario: new FormControl('', [Validators.required]),
      fraccionArancelaria: new FormControl('', [Validators.required]),
      descripcionArancelaria: new FormControl('', [Validators.required]),
    });
  }

  obraDeArteRowData: TableData[] = [];

  toggleObraDeArte(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showObraDeArteModal = !this.showObraDeArteModal;
  }

  submitDeArteForm(): void {
    const MEDIDAS_VALUE = OPCIONES_DE_BOTON_DE_RADIO.find(
      (option) => option.value === this.obraDeArteFormgroup.value.medidas
    )?.label;

    const ARANCELARIA_VALUE = this.arancelariaData.find(
      (item: Catalogo) => item.id === this.obraDeArteFormgroup.value.fraccionArancelaria
    )?.descripcion;

    const MONEDA_VALUE = this.monedaData.find(
      (item: Catalogo) => item.id === this.obraDeArteFormgroup.value.moneda
    )?.descripcion;

    const OBRA_DE_ARTE_ROW = {
      tbodyData: [
        this.obraDeArteFormgroup.value.autor,
        this.obraDeArteFormgroup.value.titulo,
        this.obraDeArteFormgroup.value.tecnicaDeRealizacion,
        MEDIDAS_VALUE,
        this.obraDeArteFormgroup.value.ancho,
        this.obraDeArteFormgroup.value.alto,
        this.obraDeArteFormgroup.value.profundidad,
        this.obraDeArteFormgroup.value.diametro,
        this.obraDeArteFormgroup.value.variables,
        this.obraDeArteFormgroup.value.anoDeCreacion,
        this.obraDeArteFormgroup.value.avaluo,
        MONEDA_VALUE,
        this.obraDeArteFormgroup.value.propietario,
        ARANCELARIA_VALUE,
        this.obraDeArteFormgroup.value.descripcionArancelaria,
      ],
    };

    this.obraDeArteRowData.push(OBRA_DE_ARTE_ROW);

    this.tramite270201Store.setObraDeArte(this.obraDeArteRowData);

    this.showTableDiv = !this.showTableDiv;
    this.showObraDeArteModal = !this.showObraDeArteModal;
  }
}
