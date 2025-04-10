import { ActivatedRoute } from '@angular/router';
import { CROSLISTA_DE_PAISES } from '../../constants/datos-solicitud.enum';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CrossListLable } from '@ng-mf/data-access-user';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MercanciaDetalle } from '../../models/datos-del-tramite.model';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

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
  private unsubscribe$ = new Subject<void>();

  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }
  datosMercancias: MercanciaDetalle[] = [];
  @Output() updateMercanciaDetalle = new EventEmitter<MercanciaDetalle[]>();

  datosMercancia!: FormGroup; // Changed from datosForm
  // Sample data for dropdowns
  fraccionesCatalogo: Catalogo[] = [];

  umcCatalogo: Catalogo[] = [];

  monedaCatalogo: Catalogo[] = [];
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
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerFraccionesCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.fraccionesCatalogo = data;
      });

    this.datosSolicitudService
      .obtenerUMCCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.umcCatalogo = data;
      });

    this.datosSolicitudService
      .obtenerMonedaCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.monedaCatalogo = data;
      });
  }

  guardar(): void {
    const DATOS_MERCANCIA: MercanciaDetalle = {
      fraccionArancelaria: this.datosMercancia.get('fraccionArancelaria')
        ?.value,
      descripcionFraccion: this.datosMercancia.get('descFraccion')?.value,
      unidadMedidaTarifa: this.datosMercancia.get('umt')?.value,
      umc: this.datosMercancia.get('umc')?.value,
      cantidadUMT: this.datosMercancia.get('cantidadUMT')?.value,
      valorComercial: this.datosMercancia.get('valorComercial')?.value,
      tipoMoneda: this.datosMercancia.get('tipoMoneda')?.value,
      descripcion: this.datosMercancia.get('descripcion')?.value,
      paisOrigen: this.seleccionadasPaisDeOriginDatos.join(','),
    };
    this.datosMercancias.push(DATOS_MERCANCIA);
    this.updateMercanciaDetalle.emit(this.datosMercancias);
    this.datosMercancia.reset();
    this.ubicaccion.back();
  }
  ngOnInit(): void {
    // Build the form group
    this.datosMercancia = this.fb.group({
      descripcion: ['QAS', Validators.required],
      fraccionArancelaria: ['25030002', Validators.required],
      descFraccion: [
        {
          value:
            'Azufre de cualquier clase, excepto el sublimado, el precipitado y el coloidal.',
          disabled: true,
        },
        Validators.required,
      ],
      cantidadUMT: [null, Validators.required],
      umt: [{ value: 'Kilogramo', disabled: true }, Validators.required],
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
}
