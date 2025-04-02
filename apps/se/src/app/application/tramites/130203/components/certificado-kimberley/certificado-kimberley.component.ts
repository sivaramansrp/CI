import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { Observable } from 'rxjs';

import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

import {
  Tramite130203State,
  Tramite130203Store,
} from '../../estados/tramites/tramites130203.store';

import { Tramite130203Query } from '../../estados/queries/tramite130203.query';

import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';

/**
 * @description
 * Componente para gestionar el formulario del Certificado Kimberley.
 * Este componente es standalone y utiliza Reactive Forms para la gestión de formularios.
 */
@Component({
  selector: 'app-certificado-kimberley',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './certificado-kimberley.component.html',
  styleUrl: './certificado-kimberley.component.scss',
})
export class CertificadoKimberleyComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Formulario principal para la empresa.
   */
  public formularioEmpresa!: FormGroup;

  /**
   * @description
   * Estado actual del trámite.
   */
  public solicitudState!: Tramite130203State;

  /**
   * @description
   * Lista de países emisores.
   */
  public paisesEmisores: Catalogo[] = [];

  /**
   * @description
   * Lista de nombres en inglés.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public nombresIngles: any[] = [];

  /**
   * @description
   * Formulario para los datos del exportador.
   */
  datosDelExportador!: FormGroup;

  /**
   * @description
   * Formulario para los datos del importador.
   */
  datosDelImportador!: FormGroup;

  /**
   * @description
   * Formulario para los datos de la remesa.
   */
  datosDeLaRemesa!: FormGroup;

  /**
   * @description
   * Formulario para los datos de los diamantes.
   */
  datosDeLosDiamantes!: FormGroup;

  /**
   * @description
   * Observable para manejar la destrucción del componente.
   */
  private destroyed$ = new Subject<void>();

  /**
   * @description
   * Observable que proporciona el nombre del exportador desde el estado del trámite.
   */
  nombreExportador$: Observable<string | null> =
    this.tramite130203Query.nombreExportador$;

  /**
   * @description
   * Observable que proporciona la dirección del exportador desde el estado del trámite.
   */
  direccionExportador$: Observable<string | null> =
    this.tramite130203Query.direccionExportador$;

  /**
   * @description
   * Observable que proporciona el nombre del importador desde el estado del trámite.
   */
  nombreImportador$: Observable<string | null> =
    this.tramite130203Query.nombreImportador$;

  /**
   * @description
   * Observable que proporciona la dirección del importador desde el estado del trámite.
   */
  direccionImportador$: Observable<string | null> =
    this.tramite130203Query.direccionImportador$;

  /**
   * @description
   * Observable que proporciona el número en letra de los lotes desde el estado del trámite.
   */
  numeroEnLetraDeLosLotes$: Observable<string | null> =
    this.tramite130203Query.numeroEnLetraDeLosLotes$;

  /**
   * @description
   * Observable que proporciona el número en letra de los lotes en inglés desde el estado del trámite.
   */
  numeroEnLetraDeLosLotesEnIngles$: Observable<string | null> =
    this.tramite130203Query.numeroEnLetraDeLosLotesEnIngles$;

  /**
   * @description
   * Observable que proporciona el número de factura desde el estado del trámite.
   */
  numeroDeFactura$: Observable<string | null> =
    this.tramite130203Query.numeroDeFactura$;
  /**
   * Observables para los datos de los diamantes.
   */
  cantidadEnQuilates$: Observable<string | null> =
    this.tramite130203Query.cantidadEnQuilates$;

  /**
   * @description
   * Observable que proporciona el valor de los diamantes desde el estado del trámite.
   */
  valorDeLosDiamantes$: Observable<string | null> =
    this.tramite130203Query.valorDeLosDiamantes$;

  /**
   * @description
   * Constructor del componente.
   * @param fb FormBuilder para la creación de formularios reactivos.
   * @param tramite130203Store Store para gestionar el estado del trámite.
   * @param tramite130203Query Query para obtener datos del estado del trámite.
   * @param exportacionDeDiamantesEnBrutoService Servicio para obtener datos relacionados con la exportación.
   */
  constructor(
    private fb: FormBuilder,
    private tramite130203Store: Tramite130203Store,
    private tramite130203Query: Tramite130203Query,
    private exportacionDeDiamantesEnBrutoService: ExportacionDeDiamantesEnBrutoService
  ) {
    // Constructor
  }

  /**
   * @description
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.subscribeToState();
    this.inicializarFormulario();
    this.loadData();

    this.nombreExportador$.subscribe((nombreExportador) => {
      if (nombreExportador) {
        this.datosDelExportador
          .get('nombreExportador')
          ?.setValue(nombreExportador);
      }
    });

    this.direccionExportador$.subscribe((direccionExportador) => {
      if (direccionExportador) {
        this.datosDelExportador
          .get('direccionExportador')
          ?.setValue(direccionExportador);
      }
    });

    this.nombreImportador$.subscribe((nombreImportador) => {
      if (nombreImportador) {
        this.datosDelImportador
          .get('nombreImportador')
          ?.setValue(nombreImportador);
      }
    });

    this.direccionImportador$.subscribe((direccionImportador) => {
      if (direccionImportador) {
        this.datosDelImportador
          .get('direccionImportador')
          ?.setValue(direccionImportador);
      }
    });

    this.numeroEnLetraDeLosLotes$.subscribe((numeroEnLetraDeLosLotes) => {
      if (numeroEnLetraDeLosLotes) {
        this.datosDeLaRemesa
          .get('numeroEnLetraDeLosLotes')
          ?.setValue(numeroEnLetraDeLosLotes);
      }
    });

    this.numeroEnLetraDeLosLotesEnIngles$.subscribe(
      (numeroEnLetraDeLosLotesEnIngles) => {
        if (numeroEnLetraDeLosLotesEnIngles) {
          this.datosDeLaRemesa
            .get('numeroEnLetraDeLosLotesEnIngles')
            ?.setValue(numeroEnLetraDeLosLotesEnIngles);
        }
      }
    );

    this.numeroDeFactura$.subscribe((numeroDeFactura) => {
      if (numeroDeFactura) {
        this.datosDeLaRemesa.get('numeroDeFactura')?.setValue(numeroDeFactura);
      }
    });

    this.cantidadEnQuilates$.subscribe((cantidadEnQuilates) => {
      if (cantidadEnQuilates) {
        this.datosDeLosDiamantes
          .get('cantidadEnQuilates')
          ?.setValue(cantidadEnQuilates);
      }
    });

    this.valorDeLosDiamantes$.subscribe((valorDeLosDiamantes) => {
      if (valorDeLosDiamantes) {
        this.datosDeLosDiamantes
          .get('valorDeLosDiamantes')
          ?.setValue(valorDeLosDiamantes);
      }
    });
  }

  /**
   * @description
   * Método para limpiar las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * @description
   * Carga los datos iniciales desde el servicio.
   */
  private loadData(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getPaisesEmisores()
      .subscribe((paises) => {
        this.paisesEmisores = paises;
      });

    this.exportacionDeDiamantesEnBrutoService
      .getNombresIngles()
      .subscribe((nombres) => {
        this.nombresIngles = nombres;
      });
  }

  /**
   * @description
   * Se suscribe al estado del store y actualiza el estado local.
   */
  private subscribeToState(): void {
    this.tramite130203Query.select().subscribe((state) => {
      this.solicitudState = state;
      if (this.formularioEmpresa) {
        this.formularioEmpresa.patchValue({
          especifique: state.especifique,
          numero: state.numero,
          nombre: state.nombre,
          tipoEmpresa: state.tipoEmpresa,
        });
      }
    });
  }

  /**
   * @description
   * Inicializa el formulario principal.
   */
  public inicializarFormulario(): void {
    this.formularioEmpresa = this.fb.group({
      especifique: [
        { value: this.solicitudState?.especifique || '0', disabled: true },
        Validators.maxLength(20),
      ],
      numero: [this.solicitudState?.numero || '', [Validators.required]],
      tipoEmpresa: [
        this.solicitudState?.tipoEmpresa || '',
        Validators.required,
      ],
      nombre: [this.solicitudState?.nombre || '', [Validators.required]],
      lineaCheckbox: [this.solicitudState?.lineaCheckbox || false],
      paisOrigen: [
        this.solicitudState?.paisOrigen || null,
        Validators.required,
      ],
    });

    this.formularioEmpresa
      .get('tipoEmpresa')
      ?.valueChanges.subscribe((value) => {
        this.updateNombreIngles(value);
      });

    this.formularioEmpresa
      .get('lineaCheckbox')
      ?.valueChanges.subscribe((value) => {
        this.setValoresStore(
          this.formularioEmpresa,
          'lineaCheckbox',
          'setLineaCheckbox'
        );
      });
  }

  /**
   * @description
   * Actualiza el nombre en inglés basado en el ID del país.
   * @param paisId ID del país seleccionado.
   */
  public updateNombreIngles(paisId: number): void {
    const MATCHING_ITEMS = this.nombresIngles.filter(
      (item) => item.idDelPais === paisId
    );
    const NOMBRE = MATCHING_ITEMS.length > 0 ? MATCHING_ITEMS[0].name : '';

    this.formularioEmpresa.get('nombre')?.setValue(NOMBRE);
    this.setValoresStore(this.formularioEmpresa, 'nombre', 'setNombre');
  }

  /**
   * @description
   * Actualiza el valor en el store basado en el formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store a invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130203Store
  ): void {
    const VALOR = form.get(campo)?.value;
    if (VALOR !== undefined) {
      (
        this.tramite130203Store[metodoNombre] as (
          value: string | number | boolean | null
        ) => void
      )(VALOR);
    }
  }

  /**
   * @description
   * Verifica si un control del formulario es inválido.
   * @param controlName Nombre del control.
   * @returns `true` si el control es inválido, de lo contrario `false`.
   */
  isInvalid(controlName: string): boolean {
    const CONTORL = this.formularioEmpresa.get(controlName);
    return CONTORL
      ? CONTORL.invalid && (CONTORL.dirty || CONTORL.touched)
      : false;
  }

  /**
   * @description
   * Crea los formularios secundarios para exportador, importador, remesa y diamantes.
   */
  crearFormulario(): void {
    this.datosDelExportador = this.fb.group({
      nombreExportador: [
        {
          value: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
          disabled: true,
        },
      ],
      direccionExportador: ['', [Validators.required]],
    });

    this.datosDelImportador = this.fb.group({
      nombreImportador: ['', [Validators.required]],
      direccionImportador: ['', [Validators.required]],
    });

    this.datosDeLaRemesa = this.fb.group({
      numeroEnLetraDeLosLotes: ['', [Validators.required]],
      numeroEnLetraDeLosLotesEnIngles: ['', [Validators.required]],
      numeroDeFactura: ['', [Validators.required]],
    });

    this.datosDeLosDiamantes = this.fb.group({
      cantidadEnQuilates: ['', [Validators.required]],
      valorDeLosDiamantes: ['', [Validators.required]],
    });
  }

  /**
   * @description
   * Obtiene el nombre del exportador desde el formulario y lo guarda en el store.
   */
  getNombreExportador(): void {
    const NOMBRE_EXPORTADOR =
      this.datosDelExportador.get('nombreExportador')?.value;
    this.tramite130203Store.setNombreExportador(NOMBRE_EXPORTADOR);
  }

  /**
   * @description
   * Obtiene la dirección del exportador desde el formulario y la guarda en el store.
   */
  getDireccionExportador(): void {
    const DIRECCION_EXPORTADOR = this.datosDelExportador.get(
      'direccionExportador'
    )?.value;
    this.tramite130203Store.setDireccionExportador(DIRECCION_EXPORTADOR);
  }

  /**
   * @description
   * Obtiene el nombre del importador desde el formulario y lo guarda en el store.
   */
  getNombreImportador(): void {
    const NOMBRE_IMPORTADOR =
      this.datosDelImportador.get('nombreImportador')?.value;
    this.tramite130203Store.setNombreImportador(NOMBRE_IMPORTADOR);
  }

  /**
   * @description
   * Obtiene la dirección del importador desde el formulario y la guarda en el store.
   */
  getDireccionImportador(): void {
    const DIRECCION_IMPORTADOR = this.datosDelImportador.get(
      'direccionImportador'
    )?.value;
    this.tramite130203Store.setDireccionImportador(DIRECCION_IMPORTADOR);
  }

  /**
   * @description
   * Obtiene el número en letra de los lotes desde el formulario y lo guarda en el store.
   */
  getNumeroEnLetraDeLosLotes(): void {
    const NUMERO_EN_LETRA_DE_LOS_LOTES = this.datosDeLaRemesa.get(
      'numeroEnLetraDeLosLotes'
    )?.value;
    this.tramite130203Store.setNumeroEnLetraDeLosLotes(
      NUMERO_EN_LETRA_DE_LOS_LOTES
    );
  }
  /**
   * @description
   * Obtiene el número en letra de los lotes en inglés desde el formulario y lo guarda en el store.
   */
  getNumeroEnLetraDeLosLotesEnIngles(): void {
    const NUMERO_EN_LETRA_DE_LOS_LOTES_EN_INGLES = this.datosDeLaRemesa.get(
      'numeroEnLetraDeLosLotesEnIngles'
    )?.value;
    this.tramite130203Store.setNumeroEnLetraDeLosLotesEnIngles(
      NUMERO_EN_LETRA_DE_LOS_LOTES_EN_INGLES
    );
  }
  /**
   * @description
   * Obtiene el número de factura desde el formulario y lo guarda en el store.
   */
  getNumeroDeFactura(): void {
    const NUMERO_DE_FACTURA =
      this.datosDeLaRemesa.get('numeroDeFactura')?.value;
    this.tramite130203Store.setNumeroDeFactura(NUMERO_DE_FACTURA);
  }

  /**
   * @description
   * Obtiene la cantidad en quilates desde el formulario y la guarda en el store.
   */
  getCantidadEnQuilates(): void {
    const CANTIDAD_EN_QUILATES =
      this.datosDeLosDiamantes.get('cantidadEnQuilates')?.value;
    this.tramite130203Store.setCantidadEnQuilates(CANTIDAD_EN_QUILATES);
  }

  /**
   * @description
   * Obtiene el valor de los diamantes desde el formulario y lo guarda en el store.
   */
  getValorDeLosDiamantes(): void {
    const VALOR_DE_LOS_DIAMANTES = this.datosDeLosDiamantes.get(
      'valorDeLosDiamantes'
    )?.value;
    this.tramite130203Store.setValorDeLosDiamantes(VALOR_DE_LOS_DIAMANTES);
  }
}
