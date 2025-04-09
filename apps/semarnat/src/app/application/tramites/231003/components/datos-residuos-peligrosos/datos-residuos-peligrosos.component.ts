import { Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {RadioOpcion,SolicitudJson} from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model'
import { CommonModule } from '@angular/common';
import rawData from '@libs/shared/theme/assets/json/231003/solicitud.json';
const RADIO_OPCIONES = rawData as SolicitudJson;

@Component({
  selector: 'app-datos-residuos-peligrosos',
  standalone: true,
  imports: [CommonModule,
      TituloComponent,
      ReactiveFormsModule,InputRadioComponent,CatalogoSelectComponent,TableComponent],
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
    this.establecimientoHeaderData= RADIO_OPCIONES.PrimasRelacionadas[0]?.encabezadoDeTabla || [];
    this.establecimientoBodyData= RADIO_OPCIONES.PrimasRelacionadas[0]?.cuerpoTabla || [];
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
      acotacion: new FormControl('', Validators.required),
      residuoPeligroso: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      cantidadLetra: new FormControl({ value: '', disabled: true }),
      unidadMedida: new FormControl('', Validators.required),
      clasificacion: new FormControl('', Validators.required),
      claveResiduo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      creti: new FormControl('', Validators.required),
      estadoFisico: new FormControl('', Validators.required),
      tipoContenedor: new FormControl('', Validators.required),
      capacidad: new FormControl('', Validators.required)
    });
  }
  
}
