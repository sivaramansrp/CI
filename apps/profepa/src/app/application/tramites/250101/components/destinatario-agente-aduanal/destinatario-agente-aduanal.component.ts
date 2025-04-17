import { Component, OnDestroy, OnInit } from '@angular/core';
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

import { Subject, takeUntil } from 'rxjs';
import { DestinatarioService } from '../../services/destinatario.service';
import { ModalComponent } from '../modal/modal.component';
import { TablaDatos } from '../../models/flora-fauna.models';
import { Tramite250101Store } from '../../estados/tramite250101.store';

export interface DestinatarioTablaDatos {
  columns: string[];
}

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
export class DestinatarioAgenteAduanalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

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

  tablaDestinatarioFilaDatos: TablaDatos[] = [];
  tablaAgenteAduanaFilaDatos: TablaDatos[] = [];

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
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: DestinatarioTablaDatos) => {
        this.tablaDestinatarioData = data.columns;
      });

    this.destinatarioService
      .getAduanalEncabezadoDeTabla()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: DestinatarioTablaDatos) => {
        this.tablaAgenteAduanalData = data.columns;
      });

    this.destinatarioService
      .getPaisData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.paisData = data;
      });

    this.destinatarioService
      .getEstadoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.estadoData = data;
      });

    this.establecerFormDestinatariosModal();
    this.establecerFormAgenteAduanal();
  }

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
      destinatarioRadio: new FormControl({ value: '1', disabled: true }, [
        Validators.required,
      ]),
      destinatarioRazonSocial: new FormControl('', [
        Validators.required,
        Validators.maxLength(120),
      ]),
      paisNacionalDestinatario: new FormControl('', [Validators.required]),
      estadoNacionalDestinatario: new FormControl('', [Validators.required]),
      codigoPostalDestinatario: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
      ]),
      domicilioDestinatario: new FormControl('', [Validators.required]),
    });
  }

  establecerFormAgenteAduanal(): void {
    this.formAgenteAduanal = this.fb.group({
      nombreAgenteAduanal: new FormControl('', [
        Validators.required,
        Validators.maxLength(28),
      ]),
      primerApellidoAgenteAduanal: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      segundoApellidoAgenteAduanal: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      patenteAgenteAduanal: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
      ]),
    });
  }

  openAceptarModal(): void {
    this.showDestinatarioModal = !this.showDestinatarioModal;
    this.showAceptarModal = true;
  }

  confirmAgregar(): void {
    this.enviarDestinatarioFormulario();
    this.showAceptarModal = false;
  }

  enviarDestinatarioFormulario(): void {
    const PAIS_VALOR = this.paisData.find(
      (item: Catalogo) =>
        item.id === this.formDestinatariosModal.value.paisNacionalDestinatario
    )?.descripcion;

    const ESTADO_VALOR = this.estadoData.find(
      (item: Catalogo) =>
        item.id === this.formDestinatariosModal.value.estadoNacionalDestinatario
    )?.descripcion;

    const DESTINATARIO_FILA = {
      tbodyData: [
        this.formDestinatariosModal.value.destinatarioRazonSocial,
        PAIS_VALOR,
        '',
        ESTADO_VALOR,
        this.formDestinatariosModal.value.domicilioDestinatario,
        this.formDestinatariosModal.value.codigoPostalDestinatario,
      ],
    };

    this.tablaDestinatarioFilaDatos.push(DESTINATARIO_FILA);

    this.tramite250101Store.establecerDestinatario(
      this.tablaDestinatarioFilaDatos
    );

    this.showTableDiv = !this.showTableDiv;
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

  actualizarDenominacion(): void {
    const DESTINATARIO_DENOMINACION = this.formDestinatariosModal.get(
      'destinatarioRazonSocial'
    )?.value;
    this.tramite250101Store.establecerDestinatarioDenominacion(
      DESTINATARIO_DENOMINACION
    );
  }

  actualizarCodigoPostal(): void {
    const DESTINATARIO_CODIGO_POSTAL = this.formDestinatariosModal.get(
      'codigoPostalDestinatario'
    )?.value;
    this.tramite250101Store.establecerDestinatarioCodigoPostal(
      DESTINATARIO_CODIGO_POSTAL
    );
  }

  actualizarDomicilio(): void {
    const DESTINATARIO_DOMICILIO = this.formDestinatariosModal.get(
      'domicilioDestinatario'
    )?.value;
    this.tramite250101Store.establecerDestinatarioDomicilio(
      DESTINATARIO_DOMICILIO
    );
  }

  actualizarDestinatarioPais(): void {
    const DESTINATARIO_PAIS = this.formDestinatariosModal.get(
      'paisNacionalDestinatario'
    )?.value;
    this.tramite250101Store.establecerDestinatarioPais(DESTINATARIO_PAIS);
  }

  actualizarDestinatarioEstado(): void {
    const DESTINATARIO_ESTADO = this.formDestinatariosModal.get(
      'estadoNacionalDestinatario'
    )?.value;
    this.tramite250101Store.establecerDestinatarioEstado(DESTINATARIO_ESTADO);
  }

  actualizarAgenteNombre(): void {
    const AGENTE_NOMBRE = this.formAgenteAduanal.get(
      'nombreAgenteAduanal'
    )?.value;
    this.tramite250101Store.establecerAgenteAduanalNombre(AGENTE_NOMBRE);
  }

  actualizarAgentePrimerApellido(): void {
    const AGENTE_PRIMER_APELLIDO = this.formAgenteAduanal.get(
      'primerApellidoAgenteAduanal'
    )?.value;
    this.tramite250101Store.establecerAgenteAduanalPrimerApellido(
      AGENTE_PRIMER_APELLIDO
    );
  }

  actualizarAgenteSegundoApellido(): void {
    const AGENTE_SEGUNDO_APELLIDO = this.formAgenteAduanal.get(
      'segundoApellidoAgenteAduanal'
    )?.value;
    this.tramite250101Store.establecerAgenteAduanalSegundoApellido(
      AGENTE_SEGUNDO_APELLIDO
    );
  }

  actualizarAgentePatente(): void {
    const AGENTE_PATENTE = this.formAgenteAduanal.get(
      'patenteAgenteAduanal'
    )?.value;
    this.tramite250101Store.establecerAgenteAduanalPatente(AGENTE_PATENTE);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
