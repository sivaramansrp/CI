import {
  CATALOGOS_ID,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosService,
  SelectPaisesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  DatosComplimentos,
  SociaoAccionistas,
} from '../../models/complimentos.model';
import {
  FORMA_SOCIO,
  FORMA_SOCIO_ACCIONISTAS,
  FORMA_SOCIO_ACCIONISTAS_EXTRANJEROS,
  TABLA_SOCIO_ACCIONISTAS,
  TABLA_SOCIO_ACCIONISTAS_EXTRANJEROS,
  TIPO_FORMA,
} from '../../constantes/complimentos.enum';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription, delay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosCatalago } from '../../../tramites/80102/models/autorizacion-programa-nuevo.model';

const PAIS = 'pais';
const ESTADO = 'estado';
@Component({
  selector: 'app-complimentos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent,
    CatalogoSelectComponent,
    SelectPaisesComponent,
  ],
  templateUrl: './complimentos.component.html',
  styleUrl: './complimentos.component.scss',
})
export class ComplimentosComponent implements OnInit {
  formaComplimentos!: FormGroup;

  estados$!: Observable<Catalogo[]>;

  private subscription: Subscription = new Subscription();

  camposFormularioDefault: DatosCatalago[] = FORMA_SOCIO_ACCIONISTAS;
  camposFormularioNationalidad = FORMA_SOCIO;
  camposFormularioTipoPersona = FORMA_SOCIO_ACCIONISTAS_EXTRANJEROS;
  camposFormulario: DatosCatalago[] = FORMA_SOCIO_ACCIONISTAS;
  tipoFormulario = TIPO_FORMA.DEFAULT;

  @Input() datosFormaComplimentos!: DatosComplimentos | null;
  @Input() datosSocioAccionistas: SociaoAccionistas[] = [];
  @Input() datosSocioAccionistasExtrenjeros: SociaoAccionistas[] = [];

  tablaSociaAccionistas = TABLA_SOCIO_ACCIONISTAS;
  tablaSociaAccionistasExtranjeros = TABLA_SOCIO_ACCIONISTAS_EXTRANJEROS;

  tablaSeleccion = TablaSeleccion;

  empresaAccionistasSeleccionados: SociaoAccionistas[] = [];
  accionistasExtranjerosSeleccionados: SociaoAccionistas[] = [];

  estaCargando = false;

  @Output()
  complimentosDatos: EventEmitter<DatosComplimentos> =
    new EventEmitter<DatosComplimentos>(true);

  @Output() accionistasAgregados: EventEmitter<SociaoAccionistas> =
    new EventEmitter<SociaoAccionistas>(true);
  @Output() accionistasEliminados: EventEmitter<SociaoAccionistas[]> =
    new EventEmitter<SociaoAccionistas[]>(true);
  @Output() accionistasExtranjerosEliminado: EventEmitter<SociaoAccionistas[]> =
    new EventEmitter<SociaoAccionistas[]>(true);

  constructor(
    private fb: FormBuilder,
    private catalogosServices: CatalogosService
  ) {
    this.formaComplimentos = this.fb.group({
      modalidad: [{ value: '', disabled: true }],
      programaPreOperativo: [false],
      datosGeneralis: this.fb.group({
        paginaWWeb: ['', Validators.required],
        localizacion: ['', Validators.required],
      }),
      obligacionesFiscales: this.fb.group({
        opinionPositiva: [{ value: '', disabled: true }],
        fechaExpedicion: [{ value: '', disabled: true }],
        aceptarObligacionFiscal: [''],
      }),
      formaModificaciones: this.fb.group({
        nombreDelFederatario: ['', Validators.required],
        nombreDeNotaria: ['', Validators.required],
        estado: ['', Validators.required],
        nombreDeActa: ['', Validators.required],
        fechaDeActa: ['', Validators.required],
        rfc: ['', Validators.required],
        nombreDeRepresentante: ['', Validators.required],
      }),
      formaCertificacion: this.fb.group({
        certificada: [{ value: '', disabled: true }],
        fechaInicio: [{ value: '', disabled: true }],
        fechaVigencia: [{ value: '', disabled: true }],
      }),
      formaSocioAccionistas: this.fb.group({
        nationalidadMaxicana: ['false', Validators.required],
        tipoDePersona: ['false', Validators.required],
        formaDatos: this.obtainerFormaDatos(TIPO_FORMA.DEFAULT),
      }),
    });
    if (this.datosFormaComplimentos) {
      this.formaComplimentos.patchValue(this.datosFormaComplimentos);
    }
  }

  ngOnInit(): void {
    this.getCatalogoPaises();
    this.getCatalogoEstado();

    this.subscription.add(
      this.formaComplimentos.valueChanges.pipe(delay(100)).subscribe((_) => {
        this.complimentosDatos.emit(this.formaComplimentos.value);
      })
    );

    if (this.datosFormaComplimentos) {
      this.formaComplimentos.patchValue(this.datosFormaComplimentos);
    }
  }

  obtainerFormaDatos(tipoForma: number): FormGroup {
    switch (tipoForma) {
      case TIPO_FORMA.DEFAULT:
        return this.fb.group({
          taxId: ['', Validators.required],
          razonSocial: ['', Validators.required],
          pais: ['', Validators.required],
          codigoPostal: ['', Validators.required],
          estado: ['', Validators.required],
          correoElectronico: ['', Validators.required],
        });

      case TIPO_FORMA.TIPO_PERSONA:
        return this.fb.group({
          taxId: ['', Validators.required],
          nombre: ['', Validators.required],
          pais: ['', Validators.required],
          codigoPostal: ['', Validators.required],
          estado: ['', Validators.required],
          correoElectronico: ['', Validators.required],
          apellidoPaterno: ['', Validators.required],
        });
      case TIPO_FORMA.NATIONALIDAD_MEXICANA:
        return this.fb.group({
          rfc: ['', Validators.required],
        });

      default:
        return this.fb.group({
          taxId: ['', Validators.required],
          razonSocial: ['', Validators.required],
          pais: ['', Validators.required],
          codigoPostal: ['', Validators.required],
          estado: ['', Validators.required],
          correoElectronico: ['', Validators.required],
        });
        break;
    }
  }

  modificarFormulario(
    tipoForma: number,
    camposDelFormulario: DatosCatalago[]
  ): void {
    const CONTROL = this.formaComplimentos.get(
      'formaSocioAccionistas'
    ) as FormGroup;
    CONTROL.removeControl('formaDatos', { emitEvent: false });
    this.camposFormulario = [...camposDelFormulario];
    setTimeout(() => {
      CONTROL.setControl('formaDatos', this.obtainerFormaDatos(tipoForma), {
        emitEvent: false,
      });
    }, 10);
  }

  getControls(): boolean {
    return (
      this.formaComplimentos.get('formaSocioAccionistas') as FormGroup
    ).contains('formaDatos');
  }

  getCatalogoPaises(): void {
    this.subscription.add(
      this.catalogosServices
        .getCatalogoPaises(CATALOGOS_ID.CAT_PAISES)
        .subscribe((datos) => {
          const INDICE = this.camposFormulario.findIndex(
            (ele) => ele.campo === PAIS
          );
          const INDICEALT = this.camposFormularioTipoPersona.findIndex(
            (ele) => ele.campo === PAIS
          );
          this.camposFormularioDefault[INDICE].opciones = datos;
          this.camposFormularioTipoPersona[INDICEALT].opciones = datos;
        })
    );
  }

  getCatalogoEstado(): void {
    this.subscription.add(
      this.catalogosServices
        .getCatalogos(CATALOGOS_ID.CAT_ESTADO)
        .subscribe((datos) => {
          const INDICE = this.camposFormulario.findIndex(
            (ele) => ele.campo === ESTADO
          );
          const INDICEALT = this.camposFormularioTipoPersona.findIndex(
            (ele) => ele.campo === ESTADO
          );
          this.camposFormularioTipoPersona[INDICEALT].opciones = datos.data;
          this.camposFormularioDefault[INDICE].opciones = datos.data;
        })
    );
  }

  aggregarAccionistas(): void {
    const CONTROL = this.formaComplimentos.get(
      'formaSocioAccionistas'
    ) as FormGroup;
    const VALUE = CONTROL.get('formaDatos')?.value;
    if (VALUE) {
      this.accionistasAgregados.emit(VALUE);
      CONTROL.reset();
    }
  }
  eliminarAccionistas(): void {
    if (this.empresaAccionistasSeleccionados.length) {
      this.accionistasEliminados.emit(this.empresaAccionistasSeleccionados);
    }
  }
  eliminarAccionistasExtrenjeros(): void {
    if (this.accionistasExtranjerosSeleccionados.length) {
      this.accionistasExtranjerosEliminado.emit(
        this.accionistasExtranjerosSeleccionados
      );
    }
  }

  handleModificarForma(): void {
    const VALUE = this.formaComplimentos.value;
    if (VALUE.formaSocioAccionistas.nationalidadMaxicana === 'true') {
      this.modificarFormulario(
        TIPO_FORMA.NATIONALIDAD_MEXICANA,
        this.camposFormularioNationalidad
      );
    } else {
      if (VALUE.formaSocioAccionistas.tipoDePersona === 'true') {
        this.modificarFormulario(
          TIPO_FORMA.TIPO_PERSONA,
          this.camposFormularioTipoPersona
        );
      } else {
        this.modificarFormulario(
          TIPO_FORMA.DEFAULT,
          this.camposFormularioDefault
        );
      }
    }
  }
}
