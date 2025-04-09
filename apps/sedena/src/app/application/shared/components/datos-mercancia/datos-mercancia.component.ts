import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Catalogo,
  CatalogoSelectComponent,
  CrosslistComponent,
  CrossListLable,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CROSLISTA_DE_PAISES } from '../../constants/datos-solicitud.enum';
import { Location } from '@angular/common';
@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    CrosslistComponent,
  ],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit {
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  datosMercancia!: FormGroup; // Changed from datosForm

  // Sample data for dropdowns
  fraccionesCatalogo: Catalogo[] = [
    { id: 1, descripcion: '25030002' },
    { id: 2, descripcion: '25030003' },
  ];

  umcCatalogo: Catalogo[] = [
    { id: 1, descripcion: 'Tonelada' },
    { id: 2, descripcion: 'Kilogramo' },
  ];

  monedaCatalogo: Catalogo[] = [
    { id: 1, descripcion: 'Peso Mexicano' },
    { id: 2, descripcion: 'Dólar Estadounidense' },
  ];
  public seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;
  public paisDeOriginLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionado(s)',
  };
  public seleccionadasPaisDeOriginDatos: string[] = [];
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeOriginDatos = events;
    this.datosMercancia.patchValue({
      paisDeOriginDatos: events,
    });
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ubicaccion: Location
  ) {}

  guardar(): void {
    this.ubicaccion.back();
  }
  ngOnInit(): void {
    // Build the form group
    this.datosMercancia = this.fb.group({
      descripcion: ['QAS', Validators.required],
      fraccionArancelaria: ['25030002', Validators.required],
      descFraccion: ['Azufre de cualquier clase...', Validators.required],
      cantidadUMT: [null, Validators.required],
      umt: [null, Validators.required],
      valorComercial: [null, Validators.required],
      umc: [null, Validators.required],
      tipoMoneda: [null, Validators.required],
      paisDeOriginDatos: [null],
    });
  }

  limpiarFormulario(): void {
    this.datosMercancia.reset();
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  onSubmit(): void {}
}
