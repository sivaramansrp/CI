import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CatalogosSelect,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { RegistroService } from '../../services/registro.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/table/table.component';
import { AlertComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import mercanciaDisponsibleTable from 'libs/shared/theme/assets/json/110201/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from 'libs/shared/theme/assets/json/110201/mercancias-seleccionadas.json';
import mercanciaTable from 'libs/shared/theme/assets/json/110201/mercancia.json';
import {
  Solicitud110201State,
  Tramite110201Store,
} from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { map, Subject, Subscription, takeUntil } from 'rxjs';
import { OnReadOpts } from 'net';

const TERCEROS_TEXTO_DE_ALERTA =
  'Para continuar con el trámite, debes agregar por lo menos una mercancía.';

@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    AlertComponent,
  ],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit,OnDestroy {
  private subscriptions: Subscription[] = [];
  registroForm!: FormGroup;
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  pais!: CatalogosSelect;
  tratado!: CatalogosSelect;
  cargarArchivo: boolean = false;
  giveErrors: boolean = false;
  nombreArchivo: string = '';
  public getMercanciaDisponsibleTableData = mercanciaDisponsibleTable;
  public getmercanciaSeleccionadasTable = mercanciaSeleccionadasTable;
  public getMercanciaTable = mercanciaTable;
  public mercanciasdisponibles: string[] = [];
  public encabezadosTablas: string[] = [];
  public mercanciasHeader: string[] = [];
  public mercanciasBody: unknown[] = [];
  public solicitudState!: Solicitud110201State;
  private destroyNotifier$: Subject<void> = new Subject();
  getTratadoSubscription!: Subscription;
  getPaisSubscription!: Subscription;

  constructor(
    private registroService: RegistroService,
    private fb: FormBuilder,
    private store: Tramite110201Store,
    private query: Tramite110201Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.mercanciaDisponsible();
    this.mercanciaSeleccionadas();
    this.mercanciatable();
    this.getTratado();
    this.getPais();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.subscriptions.push(
      this.query.selectTratado$.subscribe((tratado) => {
        this.tratado = {
          labelNombre: 'Tratado/Acuerdo',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: tratado ?? [],
        };
      })
    );

    this.subscriptions.push(
      this.query.selectPais$.subscribe((pais) => {
        this.pais = {
          labelNombre: 'País / Bloque',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: pais ?? [],
        };
      })
    );
  }

  public mercanciaDisponsible(): void {
    this.mercanciasdisponibles =
      this.getMercanciaDisponsibleTableData.tableHeader;
  }

  public mercanciaSeleccionadas(): void {
    this.encabezadosTablas = this.getmercanciaSeleccionadasTable.tableHeader;
  }
  public mercanciatable(): void {
    this.mercanciasHeader = this.getMercanciaTable.tableHeader;
    this.mercanciasBody = this.getMercanciaTable.tableBody;
  }

  cargaArchivo() {
    this.cargarArchivo = true;
  }
  giveError() {
    this.giveErrors = true;
  }

  getTratado(): void {
    this.getTratadoSubscription = this.registroService
      .getTratado()
      .subscribe((resp) => {
        console.log('response', resp);
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setTratado(RESPONSE);
        }
      });
  }

  getPais(): void {
    this.getPaisSubscription = this.registroService
      .getPais()
      .subscribe((resp) => {
        console.log('response', resp);
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setPais(RESPONSE);
        }
      });
  }

  cerrarAdjuntarArchivoMercancias(): void {
    // Implement the logic to close the form or navigate away
  }

  alSeleccionarArchivo(event: any) {
    const file = event.target.files[0];
    this.nombreArchivo = file ? file.name : 'No se eligió ningún archivo';
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
    }
  }
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      validacionForm: this.fb.group({
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          [Validators.required],
        ],
        numRegistro: [this.solicitudState?.numRegistro, [Validators.required]],
        nomComercial: [
          this.solicitudState?.nomComercial,
          [Validators.required],
        ],
        fechInicioB: [this.solicitudState?.fechInicioB, [Validators.required]],
        fechFinB: [this.solicitudState?.fechFinB, [Validators.required]],
        archivo: [this.solicitudState?.archivo, [Validators.required]],
      }),
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  
}
