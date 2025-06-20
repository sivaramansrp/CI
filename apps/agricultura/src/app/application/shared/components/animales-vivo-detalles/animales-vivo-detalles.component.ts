import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DatosDeLaSolicitud, Sensible } from '../../models/datos-de-la-solicitue.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONFIGURACION_SENSIBLES } from '../../constantes/datos-de-la-solicitue.enum';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-animales-vivo-detalles',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './animales-vivo-detalles.component.html',
  styleUrl: './animales-vivo-detalles.component.scss',
})
export class AnimalesVivoDetallesComponent implements OnInit, OnDestroy {
  mercanciaForm!: FormGroup;
  detalleForm!: FormGroup;
  @Input() catalogosDatos!: DatosDeLaSolicitud;
  @Input() sensiblesTablaDatos: Sensible[] = [];

  // tipoRequisitoList: Catalogo[] = [];
  // requisitoList: Catalogo[] = [];
  // fraccionArancelariaList: Catalogo[] = [];
  // nicoList: Catalogo[] = [];
  // umtList: Catalogo[] = [];
  // umcList: Catalogo[] = [];
  // especieList: Catalogo[] = [];
  // usoList: Catalogo[] = [];
  // paisOrigenList: Catalogo[] = [];
  // paisDeProcedenciaList: Catalogo[] = [];
  // sexoList: Catalogo[] = [];

  esSoloLectura: boolean = true;

  private destroy$ = new Subject<void>();

  public configuracionSensiblesTabla: ConfiguracionColumna<Sensible>[] = CONFIGURACION_SENSIBLES;

  public tablaSeleccion = TablaSeleccion.CHECKBOX;

  public sensiblesTablaSeleccionada: Sensible[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.mercanciaForm = this.fb.group({
      tipoRequisito: ['', Validators.required],
      requisito: ['', Validators.required],
      numeroCertificado: [''],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [''],
      nico: ['', Validators.required],
      descripcionNico: [''],
      descripcion: [''],
      cantidadUMT: [''],
      umt: [{ value: '', disabled: true }, Validators.required,],
      cantidadUMC: [''],
      umc: ['', Validators.required],
      especie: ['', Validators.required],
      uso: ['', Validators.required],
      paisOrigen: ['', Validators.required],
      paisDeProcedencia: ['', Validators.required],
    });

    this.detalleForm = this.fb.group({
      // Detalle fields
      numeroLote: [''],
      colorPelaje: [''],
      edadAnimal: [''],
      faseDesarrollo: [''],
      funcionZootecnica: [''],
      nombreMercancia: [''],
      numeroIdentificacion: [''],
      raza: [''],
      nombreCientifico: [''],
      sexo: ['', Validators.required]
    });
  }

  guardarEnStore(): void {
    const VALORES = this.mercanciaForm.value;

  }

  agregarDetalle(): void {
    this.sensiblesTablaDatos.push({
      NumeroLote: this.detalleForm.value.numeroLote,
      ColorPelaje: this.detalleForm.value.colorPelaje,
      EdadAnimal: this.detalleForm.value.edadAnimal,
      FaseDesarrollo: this.detalleForm.value.faseDesarrollo,
      FuncionZootecnica: this.detalleForm.value.funcionZootecnica,
      NombreMercancia: this.detalleForm.value.nombreMercancia,
      NumeroIdentificacion: this.detalleForm.value.numeroIdentificacion,
      Raza: this.detalleForm.value.raza,
      NombreCientifico: this.detalleForm.value.nombreCientifico,
      Sexo: this.detalleForm.value.sexo
    });
    this.detalleForm.reset();
  }

  eliminarDetalle(): void {
    this.sensiblesTablaDatos = this.sensiblesTablaDatos.filter((item) => !this.sensiblesTablaSeleccionada.includes(item));
    this.sensiblesTablaSeleccionada = [];
  }

  limpiarAnimalesVivo(): void {
    this.sensiblesTablaDatos = [];
    this.mercanciaForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

