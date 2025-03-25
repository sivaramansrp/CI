import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CrossListLable, TablaMercanciasDatos } from '../../models/datos-solicitud.model';
import { CatalogoSelectComponent, CrosslistComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CROSLISTA_DE_PAISES } from '../../constantes/datos-solicitud.enum';
import { CrosslistQuery } from '@libs/shared/data-access-user/src/core/queries/crosslist.query';
import { CrosslistStore } from '@libs/shared/data-access-user/src/core/estados/crosslist.store';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';

@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent,
    CrosslistComponent
  ],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
  providers: [DatosSolicitudService],
})
export class DatosMercanciaComponent implements OnInit{
  public mercanciaForm!: FormGroup;
  @Output() mercanciaSeleccionado: EventEmitter<TablaMercanciasDatos> = new EventEmitter<TablaMercanciasDatos>();

  public clasificacionProductoDatos!: Catalogo[];
  public especificarClasificacionProductoDatos!: Catalogo[];
  public tipoProductoDatos!: Catalogo[];
  public formaFarmaceuticaDatos!: Catalogo[];
  public estadoFisicoDatos!: Catalogo[];
  public cantidadUmcDatos!: Catalogo[];
  public paisDeOriginColapsable = false;
  public paisDeProcedenciaColapsable = false;
  public usoEspesificoColapsable = false;

  public paisDeOriginLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionado(s)',
  };
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };
  public usoEspesificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico',
    derecha: 'Uso específico',
  };
public seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;
public seleccionadasPaisDeOriginDatos: string[] = [];

public paisDeProcedenciaDatos = CROSLISTA_DE_PAISES;
public seleccionadasPaisDeProcedenciaDatos: string[] = [];

public usoEspesificoDatos = CROSLISTA_DE_PAISES;
public seleccionadasUsoEspesificoDatos: string[] = [];
 
  constructor(private fb: FormBuilder, private datosSolicitudService: DatosSolicitudService,
       private crosslistQuery: CrosslistQuery,
        private crosslistStore: CrosslistStore,
        private ubicaccion: Location,
  ) {
    this.datosSolicitudService.obtenerRespuestaPorUrl(this, 'clasificacionProductoDatos', '/260204/mercanciaClasificacionProducto.json');
    this.datosSolicitudService.obtenerRespuestaPorUrl(this, 'especificarClasificacionProductoDatos', '/260204/especificarClasificacionProducto.json');
    this.datosSolicitudService.obtenerRespuestaPorUrl(this, 'tipoProductoDatos', '/260204/tipoProductoDatos.json');
    this.datosSolicitudService.obtenerRespuestaPorUrl(this, 'formaFarmaceuticaDatos', '/260204/formaFarmaceutica.json');
    this.datosSolicitudService.obtenerRespuestaPorUrl(this, 'estadoFisicoDatos', '/260204/estadoFisicoDatos.json');
    this.datosSolicitudService.obtenerRespuestaPorUrl(this, 'cantidadUmcDatos', '/260204/cantidadUmcDatos.json');


  }

  ngOnInit(): void {
    this.mercanciaForm = this.fb.group({
      clasificacionProducto: ['', Validators.required],
      especificarClasificacionProducto: ['', Validators.required],
      denominacionEspecificaProducto: ['', Validators.required],
      denominacionDistintiva: ['', Validators.required],
      denominacionComun: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      formaFarmaceutica: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: ['', Validators.required],
      cantidadUmtValor: ['', Validators.required],
      cantidadUmt: ['', Validators.required],
      cantidadUmcValor: ['', Validators.required],
      cantidadUmc: ['', Validators.required],
      presentacion: ['', Validators.required],
      numeroRegistroSanitario: ['', Validators.required],
      fechaCaducidad: [''],
      paisDeOriginDatos: [[], Validators.required],
      paisDeProcedenciaDatos: [[], Validators.required],
    });
    this.crosslistStore.establecerFechas(this.paisDeProcedenciaDatos);
    this.crosslistStore.establecerFechasSeleccionadas(this.seleccionadasPaisDeProcedenciaDatos);
    this.crosslistStore.establecerFechas(this.seleccionarOrigenDelPais);
    this.crosslistStore.establecerFechasSeleccionadas(this.seleccionadasPaisDeOriginDatos);
  }

      /**
       * Valida si el campo de un formulario no contiene errores
       * @param {AbstractControl} control  : Control del formulario
       * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
       * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
       */
      // eslint-disable-next-line class-methods-use-this
      public isValid(control: AbstractControl, campo?: string): boolean | null {
        if (control instanceof FormGroup && campo) {
          return control.controls[campo].errors && control.controls[campo].touched;
        }
        return control.errors && control.touched;
      }

      paisDeOriginSeleccionadasChange(events: string[]): void{
        this.seleccionadasPaisDeOriginDatos = events;
        this.mercanciaForm.patchValue({
          paisDeOriginDatos: events
        });
      }

      paisDeProcedenciaSeleccionadasChange(events: string[]): void{
        this.seleccionadasPaisDeProcedenciaDatos = events;
        this.mercanciaForm.patchValue({
          paisDeProcedenciaDatos: events
        });
      }

      usoEspesificoSeleccionadasChange(events: string[]): void{
        this.seleccionadasUsoEspesificoDatos = events;
        this.mercanciaForm.patchValue({
          usoEspecifico: events
        });
      }

      mostrarColapsable(orden: number): void {
        if (orden === 1) {
          this.paisDeOriginColapsable = !this.paisDeOriginColapsable;
        } else if (orden === 2) {
          this.paisDeProcedenciaColapsable = !this.paisDeProcedenciaColapsable;
        } else if (orden === 3) {
          this.usoEspesificoColapsable = !this.usoEspesificoColapsable;
        }
      }

      agregarMercancia(): void {
        this.mercanciaSeleccionado.emit(this.mercanciaForm.value);
        this.ubicaccion.back();
      }

      limpiarMercancia(): void {
        this.mercanciaForm.reset();
      }
        
      /**
       * Navega a la ubicación anterior en el historial de navegación.
       * Utiliza el servicio de ubicación para retroceder una página.
       */
      cancelar(): void {
        this.ubicaccion.back();
      }
}
