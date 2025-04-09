import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model'
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormularioResiduoQuery } from '../../estados/queries/datos-residuos.query';
import { FormularioResiduoStore } from '../../estados/tramites/datos-residuos.store';
import rawData from '@libs/shared/theme/assets/json/231003/solicitud.json';

const RADIO_OPCIONES = rawData as SolicitudJson;

@Component({
  selector: 'app-datos-residuos-peligrosos',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    ReactiveFormsModule, InputRadioComponent, CatalogoSelectComponent, TableComponent],
  templateUrl: './datos-residuos-peligrosos.component.html',
  styleUrl: './datos-residuos-peligrosos.component.css',
})
export class DatosResiduosPeligrososComponent implements OnInit, OnDestroy {
  formularioDatos!: FormGroup

  formularioResiduo!: FormGroup;

  private destruir$ = new Subject<void>();

  nombre!: Catalogo[];

  unidad!: Catalogo[];

  public establecimientoHeaderData: string[] = [];

  public establecimientoBodyData: unknown = [];

  fraccion!: Catalogo[];
  nico!: Catalogo[];
  residuo!: Catalogo[];
  tipoNombre!: Catalogo[];
  descripcion!: Catalogo[];
  creti!: Catalogo[];
  estadoFisico!: Catalogo[];
  tipoContenedor!: Catalogo[];


  radioOptions: RadioOpcion[] = RADIO_OPCIONES.radioOptions;
  clasificacionRadioOptions: RadioOpcion[] = RADIO_OPCIONES.clasificacionRadioOptions;

  constructor(public fb: FormBuilder, private formularioStore: FormularioResiduoStore,
    private formularioQuery: FormularioResiduoQuery) {
    // Constructor logic if needed  
  }

  ngOnInit(): void {
    this.nombre = RADIO_OPCIONES.nombre;
    this.establecimientoHeaderData = RADIO_OPCIONES.PrimasRelacionadas[0]?.encabezadoDeTabla || [];
    this.establecimientoBodyData = RADIO_OPCIONES.PrimasRelacionadas[0]?.cuerpoTabla || [];
    this.fraccion = RADIO_OPCIONES.arancelaria;
    this.nico = RADIO_OPCIONES.nico;
    this.unidad = RADIO_OPCIONES.unidad;
    this.residuo = RADIO_OPCIONES.residuo;
    this.tipoNombre = RADIO_OPCIONES.tipoNombre;
    this.descripcion = RADIO_OPCIONES.descripcion;
    this.creti = RADIO_OPCIONES.creti;
    this.estadoFisico = RADIO_OPCIONES.estadoFisico;
    this.tipoContenedor = RADIO_OPCIONES.tipoContenedor;
    this.inicializarFormulario();
    this.crearFormularioResiduo();
    this.recuperarValoresDesdeStore();
    this.suscribirseACambiosDeFormulario();
  }

  private inicializarFormulario(): void {
    this.formularioDatos = this.fb.group({
      numero: ['', Validators.required],
      nombreMateriaPrima: ['', Validators.required],
      cantidad: [{ value: '', disabled: true }],
      cantidadLetra: [{ value: '', disabled: true }],
      unidadDeMedida: [{ value: '', disabled: true }],
      fraccionArancelaria: [{ value: '', disabled: true }]
    });
  }


  private crearFormularioResiduo(): void {
    this.formularioResiduo = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      nico: ['', Validators.required],
      acotacion: [{ value: '', disabled: true }, Validators.required],
      residuoPeligroso: ['', Validators.required],
      cantidad: ['', Validators.required],
      cantidadLetra: [{ value: '', disabled: true }],
      unidadMedida: ['', Validators.required],
      clasificacion: ['', Validators.required],
      claveResiduo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      creti: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      tipoContenedor: ['', Validators.required],
      capacidad: ['', Validators.required]
    });
  }

  private recuperarValoresDesdeStore(): void {
    const ESTADO = this.formularioQuery.getValue();
    this.formularioDatos.patchValue(ESTADO.formularioDatos, { emitEvent: false });
    this.formularioResiduo.patchValue(ESTADO.formularioResiduo, { emitEvent: false });
  }

  private suscribirseACambiosDeFormulario(): void {
    this.formularioDatos.valueChanges
      .pipe(takeUntil(this.destruir$))
      .subscribe(valores => this.formularioStore.actualizarFormularioDatos(valores));

    this.formularioResiduo.valueChanges
      .pipe(takeUntil(this.destruir$))
      .subscribe(valores => this.formularioStore.actualizarFormularioResiduo(valores));
  }

  ngOnDestroy(): void {
    this.destruir$.next();
    this.destruir$.complete();
  }

}
