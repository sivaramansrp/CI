import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DESTINATARIO_OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/flora-fauna.enum';

import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TableComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DestinatarioService } from '../../services/destinatario.service';
import { ModalComponent } from '../modal/modal.component';
import { TablaDatos } from '../../models/flora-fauna.models';
import { Tramite250101Store } from '../../estados/tramite250101.store';

@Component({
  selector: 'app-destinatario-agente-aduanal',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    InputRadioComponent,
    TituloComponent,
    ModalComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './destinatario-agente-aduanal.component.html',
  styleUrl: './destinatario-agente-aduanal.component.scss',
})
export class DestinatarioAgenteAduanalComponent implements OnInit {
  showTableDiv = true;

  showDestinatarioModal = false;
  showAgenteModal = false;
  showAceptarModal = false;

  destinatarioOpcionDeBotonDeRadio = DESTINATARIO_OPCIONES_DE_BOTON_DE_RADIO;

  public formDestinatariosModal!: FormGroup;
  public formAgenteAduanal!: FormGroup;

  paisData: Catalogo[] = [];
  estadoData: Catalogo[] = [];
  tablaDestinatarioData: string[] = [];
  tablaAgenteAduanalData: string[] = [];

  constructor(
    private fb: FormBuilder,
    private destinatarioService: DestinatarioService,
    private tramite250101Store: Tramite250101Store
  ) {
    //
  }

  ngOnInit(): void {
    this.destinatarioService
      .getDestinatarioEncabezadoDeTabla()
      .subscribe((data: any) => {
        this.tablaDestinatarioData = data.columns;
      });

    this.destinatarioService
      .getAduanalEncabezadoDeTabla()
      .subscribe((data: any) => {
        this.tablaAgenteAduanalData = data.columns;
      });

    this.destinatarioService.getPaisData().subscribe((data) => {
      this.paisData = data;
    });

    this.destinatarioService.getEstadoData().subscribe((data) => {
      this.estadoData = data;
    });

    this.establecerFormDestinatariosModal();
    this.establecerFormAgenteAduanal();
  }

  tablaDestinatarioFilaDatos: TablaDatos[] = [];
  tablaAgenteAduanaFilaDatos: TablaDatos[] = [];

  cambiarDestinatario(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showDestinatarioModal = !this.showDestinatarioModal;
  }

  cambiarAgenteAduanal(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showAgenteModal = !this.showAgenteModal;
  }

  establecerFormDestinatariosModal(): void {
    this.formDestinatariosModal = this.fb.group({
      destinatarioRazonSocial: new FormControl('', [Validators.required]),
      paisNacionalDestinatario: new FormControl('', [Validators.required]),
      estadoNacionalDestinatario: new FormControl('', [Validators.required]),
      codigoPostalDestinatario: new FormControl('', [Validators.required]),
      domicilioDestinatario: new FormControl('', [Validators.required]),
    });
  }

  establecerFormAgenteAduanal(): void {
    this.formAgenteAduanal = this.fb.group({
      nombreAgenteAduanal: new FormControl('', [Validators.required]),
      primerApellidoAgenteAduanal: new FormControl('', [Validators.required]),
      segundoApellidoAgenteAduanal: new FormControl('', [Validators.required]),
      patenteAgenteAduanal: new FormControl('', [Validators.required]),
    });
  }

  enviarDestinatarioFormulario(): void {
const PAIS_VALOR = this.paisData.find(
  (item: Catalogo) => 
    item.id === this.formDestinatariosModal.value.paisNacionalDestinatario)?.descripcion;

const ESTADO_VALOR = this.estadoData.find(
  (item: Catalogo) => 
    item.id === this.formDestinatariosModal.value.estadoNacionalDestinatario)?.descripcion;



    const DESTINATARIO_FILA = {
      tbodyData: [
        this.formDestinatariosModal.value.destinatarioRazonSocial,
        PAIS_VALOR,
        ESTADO_VALOR,
        this.formDestinatariosModal.value.codigoPostalDestinatario,
        this.formDestinatariosModal.value.domicilioDestinatario,
      ],
    };

    this.tablaDestinatarioFilaDatos.push(DESTINATARIO_FILA);

    this.tramite250101Store.establecerDestinatario(
      this.tablaDestinatarioFilaDatos
    );

    this.showTableDiv = !this.showTableDiv;
    this.showDestinatarioModal = !this.showDestinatarioModal;
  }

  enviarAgenteAduanalFormulario(): void {
    const AGENTE_ADUANAL_FILA = {
      tbodyData: [
        this.formAgenteAduanal.value.nombreAgenteAduanal,
        this.formAgenteAduanal.value.primerApellidoAgenteAduanal,
        this.formAgenteAduanal.value.segundoApellidoAgenteAduanal,
        this.formAgenteAduanal.value.patenteAgenteAduanal,
      ],
    };

    this.tablaAgenteAduanaFilaDatos.push(AGENTE_ADUANAL_FILA);

    this.tramite250101Store.establecerAgenteAduanal(
      this.tablaAgenteAduanaFilaDatos
    );

    this.showTableDiv = !this.showTableDiv;
    this.showAgenteModal = !this.showAgenteModal;
  }
}
