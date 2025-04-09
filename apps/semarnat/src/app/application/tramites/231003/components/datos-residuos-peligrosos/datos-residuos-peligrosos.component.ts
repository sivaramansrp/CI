import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model'
import { CommonModule } from '@angular/common';
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
export class DatosResiduosPeligrososComponent implements OnInit {
  formularioDatos!: FormGroup

  formularioResiduo!: FormGroup;

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
    this.controlarHabilitacionDeCatalogos();
  }

  private inicializarFormulario(): void {
    this.formularioDatos = new FormGroup({
      numero: new FormControl('', Validators.required),
      nombreMateriaPrima: new FormControl('', Validators.required),
      cantidad: new FormControl({ value: '', disabled: true }),
      cantidadLetra: new FormControl({ value: '', disabled: true }),
      unidadDeMedida: new FormControl({ value: '', disabled: true }),
      fraccionArancelaria: new FormControl({ value: '', disabled: true })
    });
  }

  private crearFormularioResiduo(): void {
    this.formularioResiduo = new FormGroup({
      fraccionArancelaria: new FormControl('', Validators.required),
      nico: new FormControl('', Validators.required),
      acotacion: new FormControl({ value: '', disabled: true }, Validators.required),
      residuoPeligroso: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      cantidadLetra: new FormControl({ value: '', disabled: true }),
      unidadMedida: new FormControl('', Validators.required),
      clasificacion: new FormControl('', Validators.required),
      claveResiduo: new FormControl({ value: '', disabled: true }, Validators.required),
      nombre: new FormControl({ value: '', disabled: true }, Validators.required),
      descripcion: new FormControl({ value: '', disabled: true }, Validators.required),
      creti: new FormControl('', Validators.required),
      estadoFisico: new FormControl('', Validators.required),
      tipoContenedor: new FormControl('', Validators.required),
      capacidad: new FormControl('', Validators.required)
    });
  }

  private controlarHabilitacionDeCatalogos(): void {
    const OPCION_CLAVE = 'Clave de residuo';
    const OPCION_NOMBRE = 'Nombre';
    const OPCION_DESCRIPCION = 'Descripción';

    const MAPA_CONTROLES: { [key: string]: string } = {
      [OPCION_CLAVE]: 'claveResiduo',
      [OPCION_NOMBRE]: 'nombre',
      [OPCION_DESCRIPCION]: 'descripcion'
    };

    const TODOS_LOS_CONTROLES = Object.values(MAPA_CONTROLES);

    this.formularioResiduo.get('clasificacion')?.valueChanges.subscribe((VALOR_CLASIFICACION: string) => {
      TODOS_LOS_CONTROLES.forEach((CAMPO: string) => {
        const CONTROL = this.formularioResiduo.get(CAMPO);
        CONTROL?.disable();
        CONTROL?.reset();
      });

      const CAMPO_ACTIVO = MAPA_CONTROLES[VALOR_CLASIFICACION];
      const CONTROL_ACTIVO = this.formularioResiduo.get(CAMPO_ACTIVO);

      CONTROL_ACTIVO?.enable();
    });
  }



}
