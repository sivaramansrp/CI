import { Catalogo } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductoOpción } from '../../../../shared/constantes/vehiculos-adaptados.enum';
import { REG_X } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';
import { Tramite130203Store } from '../../estados/tramites/tramites130203.store';
import { takeUntil } from 'rxjs';

import { Validators } from '@angular/forms';
import solicitudeSelectVal from '@libs/shared/theme/assets/json/130202/solicitud-select.json';


@Component({
  selector: 'app-solicitud',
  // standalone: true,
  // imports: [CommonModule, DatosDelTramiteComponent],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent {
  formDelTramite!: FormGroup;
  mercanciaForm!: FormGroup;
  partidasDelaMercanciaForm!: FormGroup;
  paisForm!: FormGroup;
  frmRepresentacionForm!: FormGroup;

  datosInputFields = [
    {
      label: 'Régimen al que se destinará la mercancía',
      placeholder: 'Seleccione un documento',
      required: true,
      controlName: 'regimen',
    },
    {
      label: 'Clasificación del régimen',
      placeholder: 'Seleccione un documento',
      required: true,
      controlName: 'clasificacion',
    },
  ];

  catalogosArray: Catalogo[][] = solicitudeSelectVal;

  opcionesSolicitud: ProductoOpción[] = [];

  private destroyed$ = new Subject<void>();

  productoOpciones: ProductoOpción[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private exportacionDeDiamantesEnBrutoService: ExportacionDeDiamantesEnBrutoService,
    private tramite130203Store: Tramite130203Store,
    private tramite130203Query: Tramite130203Query,
  )
  {
    //constructor
  }

  inicializarFormularios(): void {
    this.formDelTramite = this.fb.group({
      solicitud: ['', Validators.required],
      regimen: ['', Validators.required],
      clasificacion: ['', Validators.required],
    });

    this.mercanciaForm = this.fb.group({
      producto: ['Nuevo'],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      fraccion: ['', Validators.required],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.pattern(REG_X.SOLO_NUMEROS),
          Validators.min(1),
        ],
      ],

      valorFacturaUSD: [
        '',
        [
          Validators.required,
          Validators.pattern(REG_X.DECIMALES_DOS_LUGARES),
          Validators.min(0.01),
        ],
      ],

      unidadMedida: ['', Validators.required],
    });

    this.partidasDelaMercanciaForm = this.fb.group({
      cantidadPartidasDeLaMercancia: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
        ],
      ],
      descripcionPartidasDeLaMercancia: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      valorPartidaUSDPartidasDeLaMercancia: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
          Validators.maxLength(20),
        ],
      ],
    });

    this.paisForm = this.fb.group({
      bloque: [''],
      usoEspecifico: ['', Validators.required],
      justificacionImportacionExportacion: ['', [Validators.required]],
      observaciones: [''],
    });

    this.frmRepresentacionForm = this.fb.group({
      entidad: ['', Validators.required],
      representacion: ['', Validators.required],
    });
  }

  opcionesDeBusqueda(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getSolicitudeOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.opcionesSolicitud = data.options;
          this.tramite130203Store.updateState({
            solicitud: data.options[0]?.value || '',
            defaultSelect: data.defaultSelect || 'Inicial',
          });
        },
        error: (error) =>
          console.error('Error loading solicitude options:', error),
      });

    this.exportacionDeDiamantesEnBrutoService
      .getProductoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.productoOpciones = data.options;
          this.tramite130203Store.updateState({
            producto: data.options[0]?.value || 'Nuevo',
            defaultProducto: data.options[0]?.value || 'Nuevo',
          });
        },
      });
  }

  setValoresStore(event: {
    form: FormGroup;
    campo: string;
    metodoNombre: string;
  }): void {
    const VALOR = event.form.get(event.campo)?.value;
    switch (event.metodoNombre) {
      case 'updateSolicitud':
        this.tramite130203Store.updateSolicitud(VALOR);
        break;
      case 'setDescripcionPartidasDeLaMercancia':
        this.tramite130203Store.setDescripcionPartidasDeLaMercancia(VALOR);
        break;
      case 'setCantidadPartidasDeLaMercancia':
        this.tramite130203Store.setCantidadPartidasDeLaMercancia(VALOR);
        break;
      case 'setValorPartidaUSDPartidasDeLaMercancia':
        this.tramite130203Store.setValorPartidaUSDPartidasDeLaMercancia(VALOR);
        break;
      case 'setregimen':
        this.tramite130203Store.setregimen(VALOR);
        break;
      case 'setclasificacion':
        this.tramite130203Store.setclasificacion(VALOR);
        break;

      case 'setProducto':
        this.tramite130203Store.setProducto(VALOR);
        break;
      case 'setDescripcion':
        this.tramite130203Store.setDescripcion(VALOR);
        break;
      case 'setCantidad':
        this.tramite130203Store.setCantidad(VALOR);
        break;
      case 'setValorPartidaUSD':
        this.tramite130203Store.setValorPartidaUSD(parseFloat(VALOR) || 0);
        break;
      case 'setUnidadMedida':
        this.tramite130203Store.setUnidadMedida(VALOR);
        break;
        case 'setBloque':
        this.tramite130203Store.setBloque(VALOR);
        break;
      case 'setUsoEspecifico':
        this.tramite130203Store.setUsoEspecifico(VALOR);
        break;
      case 'setJustificacionImportacionExportacion':
        this.tramite130203Store.setJustificacionImportacionExportacion(VALOR);
        break;
      case 'setObservaciones':
        this.tramite130203Store.setObservaciones(VALOR);
        break;
      case 'setEntidad':
        this.tramite130203Store.setEntidad(VALOR);
        break;
      case 'setRepresentacion':
        this.tramite130203Store.setRepresentacion(VALOR);
        break;
      default:
        console.error(
          `Método ${event.metodoNombre} no existe en Tramite130203Store`
        );
    }
  }
}
