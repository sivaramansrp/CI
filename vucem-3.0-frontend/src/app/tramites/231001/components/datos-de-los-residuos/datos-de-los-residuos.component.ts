import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos-de-los-residuos',
  templateUrl: './datos-de-los-residuos.component.html',
  styleUrl: './datos-de-los-residuos.component.scss',
  standalone:true,
  imports: [ReactiveFormsModule,CatalogoSelectComponent,CommonModule]
})
export class DatosDeLosResiduosComponent implements OnInit{

materiaPrimaForm: FormGroup;
  showMessage: boolean = false;
  mostrarMsgCantSe06: boolean = false;

  // Dropdown lists
  comboUnidadMedida!: Catalogo[];
  comboCapituloFraccion!: Catalogo[];
  comboPartidaFraccion!: Catalogo[];
  comboSubPartidaFraccion!: Catalogo[];
  comboFraccionArancelariaParametros!: Catalogo[];

  constructor(
    private fb: FormBuilder
  ) {
    this.materiaPrimaForm = this.fb.group({
      descUnidadMedida: [''],
      descFraccion: [''],
      generica1: [''],
      clavePartida: [''],
      claveSubPartida: [''],
      descripcionMercancia: ['', Validators.required],
      generica2: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,6})?$')]],
      cantidadEnLetra: [{ value: '', disabled: true }],
      unidadMedidaComercial: this.fb.group({
        clave: ['', Validators.required]
      }),
      capituloFraccion: ['', Validators.required],
      partidaFraccion: ['', Validators.required],
      subPartidaFraccion: ['', Validators.required],
      fraccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.showMessage = false;
    console.log("OnInit");
    // this.loadComboUnidadMedida();
    // this.loadComboCapituloFraccion();
    // this.loadComboFraccionArancelariaParametros();

    // Additional initialization if necessary
  }

  // Load dropdown data
  static loadComboUnidadMedida(): void {
    // this.modalMateriaPrimaService.getComboUnidadMedida().subscribe(
    //   data => this.comboUnidadMedida = data,
    //   error => console.error('Error loading Unidad Medida:', error)
    // );
  }

  static loadComboCapituloFraccion(): void {
    // this.modalMateriaPrimaService.getComboCapituloFraccion().subscribe(
    //   data => this.comboCapituloFraccion = data,
    //   error => console.error('Error loading Capitulo Fraccion:', error)
    // );
  }

  loadComboPartidaFraccion(): void {
    // const capituloClave = this.materiaPrimaForm.get('capituloFraccion')?.value;
    // this.modalMateriaPrimaService.getComboPartidaFraccion(capituloClave).subscribe(
    //   data => this.comboPartidaFraccion = data,
    //   error => console.error('Error loading Partida Fraccion:', error)
    // );
  }

  loadComboSubPartidaFraccion(): void {
    // const partidaClave = this.materiaPrimaForm.get('partidaFraccion')?.value;
    // this.modalMateriaPrimaService.getComboSubPartidaFraccion(partidaClave).subscribe(
    //   data => this.comboSubPartidaFraccion = data,
    //   error => console.error('Error loading SubPartida Fraccion:', error)
    // );
  }

  loadComboFraccion(): void {
    // const subPartidaClave = this.materiaPrimaForm.get('subPartidaFraccion')?.value;
    // this.modalMateriaPrimaService.getComboFraccionArancelariaParametros(subPartidaClave).subscribe(
    //   data => this.comboFraccionArancelariaParametros = data,
    //   error => console.error('Error loading Fraccion:', error)
    // );
  }

  // Form submission
  agregarMercancia(): void {
    if (this.materiaPrimaForm.invalid) {
      this.showMessage = true;
      return;
    }

    this.guardarMateriaPrima();
  }

  // Obtener letra de cantidad
  obtenerLetraCantidad(cantidad: string): void {
    this.materiaPrimaForm.patchValue({ cantidadEnLetra: '' });

    // this.modalMateriaPrimaService.convertirNumeroALetra(cantidad).subscribe(
    //   result => {
    //     if (result === 'Error') {
    //       alert('El número no es válido');
    //     } else {
    //       this.materiaPrimaForm.patchValue({ cantidadEnLetra: result });
    //     }
    //   },
    //   error => {
    //     console.error('Error al convertir número a letra:', error);
    //   }
    // );
  }

  // Change handlers
  cambiaCapituloFraccion(): void {
    this.materiaPrimaForm.patchValue({
      clavePartida: '',
      claveSubPartida: '',
      descFraccion: '',
      generica1: ''
    });
    this.comboPartidaFraccion = [];
    this.comboSubPartidaFraccion = [];
    this.comboFraccionArancelariaParametros = [];
    this.loadComboPartidaFraccion();
  }

  cambiaPartidaFraccion(): void {
    const partidaClave = this.materiaPrimaForm.get('partidaFraccion')?.value;
    this.materiaPrimaForm.patchValue({
      clavePartida: partidaClave,
      claveSubPartida: '',
      descFraccion: '',
      generica1: ''
    });
    this.comboSubPartidaFraccion = [];
    this.comboFraccionArancelariaParametros = [];
    this.loadComboSubPartidaFraccion();
  }

  cambiaSubPartidaFraccion(): void {
    const subPartidaClave = this.materiaPrimaForm.get('subPartidaFraccion')?.value;
    this.materiaPrimaForm.patchValue({
      claveSubPartida: subPartidaClave,
      descFraccion: '',
      generica1: ''
    });
    this.comboFraccionArancelariaParametros = [];
    this.loadComboFraccion();
  }

  cambiaFraccion(): void {
    const fraccionSeleccionada = this.comboFraccionArancelariaParametros.find(fr => fr.id === this.materiaPrimaForm.get('fraccion')?.value);
    if (fraccionSeleccionada) {
      this.materiaPrimaForm.patchValue({
        descFraccion: fraccionSeleccionada.descripcion,
        generica1: fraccionSeleccionada.id
      });
      this.validaVigenciaFraccion(fraccionSeleccionada.id);
    }
  }

  cambiaUnidadMedida(): void {
    const unidadSeleccionada = this.comboUnidadMedida.find(unidad => unidad.id === this.materiaPrimaForm.get('unidadMedidaComercial.clave')?.value);
    if (unidadSeleccionada) {
      this.materiaPrimaForm.patchValue({
        descUnidadMedida: unidadSeleccionada.descripcion
      });
    }
  }

  // Validar vigencia de fraccion
  validaVigenciaFraccion(clvFracion: number): void {
    // this.modalMateriaPrimaService.validaVigenciaFraccion(clvFracion).subscribe(
    //   result => {
    //     if (!result) {
    //       alert('La fracción no se encuentra vigente');
    //       this.materiaPrimaForm.patchValue({ fraccion: '' });
    //     }
    //   },
    //   error => {
    //     console.error('Error al validar vigencia de fracción:', error);
    //   }
    // );
  }

  // Guardar materia prima
  guardarMateriaPrima(): void {
    const formValue = this.materiaPrimaForm.getRawValue();
    // this.modalMateriaPrimaService.guardarMateriaPrima(formValue).subscribe(
    //   response => {
    //     alert('Materia Prima guardada exitosamente');
    //     this.cerrar();
    //   },
    //   error => {
    //     console.error('Error al guardar Materia Prima:', error);
    //     alert('Ocurrió un error al guardar la Materia Prima');
    //   }
    // );
  }

  // Cerrar modal
  cerrar(): void {
    // Implementar lógica para cerrar el modal, por ejemplo:
    // this.modalService.close('modalResiduos');
  }


}
