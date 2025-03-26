import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CrossListLable, MercanciaForm, TablaMercanciasDatos } from '../../models/datos-solicitud.model';
import { CatalogoSelectComponent, CrosslistComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    @Input() public mercanciaFormState!: MercanciaForm;
  
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
      clasificacionProducto: [this.mercanciaFormState.clasificacionProducto, Validators.required],
      especificarClasificacionProducto: [this.mercanciaFormState.especificarClasificacionProducto, Validators.required],
      denominacionEspecificaProducto: [this.mercanciaFormState.denominacionEspecificaProducto, Validators.required],
      denominacionDistintiva: [this.mercanciaFormState.denominacionDistintiva, Validators.required],
      denominacionComun: [this.mercanciaFormState.denominacionComun, Validators.required],
      tipoProducto: [this.mercanciaFormState.tipoProducto, Validators.required],
      formaFarmaceutica: [this.mercanciaFormState.formaFarmaceutica, Validators.required],
      estadoFisico: [this.mercanciaFormState.estadoFisico, Validators.required],
      fraccionArancelaria: [this.mercanciaFormState.fraccionArancelaria, Validators.required],
      descripcionFraccion: [this.mercanciaFormState.descripcionFraccion, Validators.required],
      cantidadUmtValor: [this.mercanciaFormState.cantidadUmtValor, Validators.required],
      cantidadUmt: [this.mercanciaFormState.cantidadUmt, Validators.required],
      cantidadUmcValor: [this.mercanciaFormState.cantidadUmcValor, Validators.required],
      cantidadUmc: [this.mercanciaFormState.cantidadUmc, Validators.required],
      presentacion: [this.mercanciaFormState.presentacion, Validators.required],
      numeroRegistroSanitario: [this.mercanciaFormState.numeroRegistroSanitario, Validators.required],
      fechaCaducidad: [this.mercanciaFormState.fechaCaducidad],
      paisDeOriginDatos: [this.mercanciaFormState.paisDeOriginDatos || [], Validators.required],
      paisDeProcedenciaDatos: [this.mercanciaFormState.paisDeProcedenciaDatos || [], Validators.required],
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

      /**
       * Método que se ejecuta cuando cambia la selección de países de origen.
       * Actualiza la lista de países seleccionados y sincroniza el formulario de mercancía
       * con los datos seleccionados.
       *
       * @param events - Arreglo de cadenas que representa los países seleccionados.
       */
      paisDeOriginSeleccionadasChange(events: string[]): void{
        this.seleccionadasPaisDeOriginDatos = events;
        this.mercanciaForm.patchValue({
          paisDeOriginDatos: events
        });
      }

      /**
       * Maneja el evento de cambio para las selecciones de país de procedencia.
       * 
       * @param events - Un arreglo de cadenas que representa los países seleccionados.
       * 
       * Actualiza la propiedad `seleccionadasPaisDeProcedenciaDatos` con los valores seleccionados
       * y sincroniza el formulario `mercanciaForm` con los datos actualizados.
       */
      paisDeProcedenciaSeleccionadasChange(events: string[]): void{
        this.seleccionadasPaisDeProcedenciaDatos = events;
        this.mercanciaForm.patchValue({
          paisDeProcedenciaDatos: events
        });
      }

      /**
       * Maneja el evento de cambio para las selecciones de uso específico.
       * 
       * @param events - Un arreglo de cadenas que representa las selecciones actuales de uso específico.
       * 
       * Este método actualiza la propiedad `seleccionadasUsoEspesificoDatos` con las selecciones proporcionadas
       * y actualiza el formulario `mercanciaForm` para reflejar los valores seleccionados en el campo `usoEspecifico`.
       */
      usoEspesificoSeleccionadasChange(events: string[]): void{
        this.seleccionadasUsoEspesificoDatos = events;
        this.mercanciaForm.patchValue({
          usoEspecifico: events
        });
      }

      /**
       * Alterna el estado colapsable de una sección específica basada en el orden proporcionado.
       * 
       * @param orden - Número que indica la sección a modificar:
       *   - 1: Alterna el estado de `paisDeOriginColapsable`.
       *   - 2: Alterna el estado de `paisDeProcedenciaColapsable`.
       *   - 3: Alterna el estado de `usoEspesificoColapsable`.
       */
      mostrarColapsable(orden: number): void {
        if (orden === 1) {
          this.paisDeOriginColapsable = !this.paisDeOriginColapsable;
        } else if (orden === 2) {
          this.paisDeProcedenciaColapsable = !this.paisDeProcedenciaColapsable;
        } else if (orden === 3) {
          this.usoEspesificoColapsable = !this.usoEspesificoColapsable;
        }
      }

      /**
       * Agrega una nueva mercancía utilizando los datos del formulario actual
       * y emite un evento con la información de la mercancía seleccionada.
       * Luego, navega de regreso a la ubicación anterior.
       *
       * @returns {void} Este método no devuelve ningún valor.
       */
      agregarMercancia(): void {
        this.mercanciaSeleccionado.emit(this.mercanciaForm.value);
        this.ubicaccion.back();
      }

      /**
       * Restablece el formulario de mercancía a su estado inicial.
       * Este método se utiliza para limpiar todos los campos del formulario,
       * eliminando cualquier dato ingresado previamente.
       */
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
