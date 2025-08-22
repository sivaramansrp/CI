import {
  AnexoDosEncabezado,
  AnexoUnoEncabezado,
  ProveedorClienteTabla,
} from '../../models/nuevo-programa-industrial.model';
import {
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { PAIS_DESTINO_CATALOG } from '../../constantes/proveedor-cliente.enum';
import { PROVEEDOR_CLIENTE_TABLA_CONFIG } from '../../constantes/anexo-dos-y-tres.enum';

@Component({
  selector: 'app-proveedor-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './proveedor-cliente.component.html',
  styleUrl: './proveedor-cliente.component.scss',
})
/**
 * Componente para gestionar los datos de proveedores y clientes.
 */
export class ProveedorClienteComponent implements OnChanges {
  /**
   * Datos de la fracción seleccionada en la tabla.
   * @type {AnexoUnoEncabezado | AnexoDosEncabezado}
   */
  @Input() public fraccionTablaDatos!: AnexoUnoEncabezado | AnexoDosEncabezado;

  /**
   * Emisor de eventos para los datos actualizados de proveedores y clientes.
   * @type {EventEmitter<ProveedorClienteTabla[]>}
   */
  @Output() public datosActualizadosProveedorCliente = new EventEmitter<
    ProveedorClienteTabla[]
  >();

  /**
   * Formulario reactivo para gestionar los datos de proveedores y clientes.
   * @type {FormGroup}
   */
  public formularioProveedorCliente!: FormGroup;

  /**
   * Catálogo de países de destino.
   * @type {Catalogo[]}
   */
  public paisDestinoCatalog = PAIS_DESTINO_CATALOG;

  /**
   * Datos de la tabla de proveedores y clientes.
   * @type {ProveedorClienteTabla[]}
   */
  public proveedorClienteTablsDatos: ProveedorClienteTabla[] = [];

  /**
   * Lista de proveedores y clientes seleccionados.
   * @type {ProveedorClienteTabla[]}
   */
  public proveedorClienteListaSeleccionada: ProveedorClienteTabla[] = [];

  /**
   * Configuración de la selección de la tabla.
   * @type {TablaSeleccion}
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de la tabla de proveedores y clientes.
   * @type {any}
   */
  public readonly PROVEEDOR_CLIENTE_TABLA_CONFIG =
    PROVEEDOR_CLIENTE_TABLA_CONFIG;

  /**
   * Constructor de la clase ProveedorClienteComponent.
   * @param {FormBuilder} fb - FormBuilder para la creación del formulario reactivo.
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador.
   */
  constructor(private fb: FormBuilder, private ubicaccion: Location) {
    this.inicializarFormularioProveedorCliente();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando se detectan cambios en las propiedades de entrada.
   * Actualiza el formulario con los datos de la fracción seleccionada.
   * @returns {void}
   */
  ngOnChanges(): void {
    if (this.fraccionTablaDatos) {
      this.formularioProveedorCliente.patchValue({
        descripcionComercial:
          this.fraccionTablaDatos.encabezadoDescripcionComercial,
      });
    }
  }

  /**
   * Maneja el cambio de país de destino en el formulario.
   * @param {Catalogo} event - El catálogo seleccionado.
   * @returns {void}
   */
  cambioPaisDestino(event: Catalogo): void {
    this.formularioProveedorCliente.patchValue({
      paisDestino: event.id,
    });
  }

  /**
   * Inicializa el formulario de proveedores y clientes.
   * @returns {void}
   */
  inicializarFormularioProveedorCliente(): void {
    this.formularioProveedorCliente = this.fb.group({
      descripcionComercial: ['Test Complementar', Validators.required],
      paisDestino: [0, Validators.required],
      rfc: ['', Validators.required],
      razonSocialCliente: ['', Validators.required],
    });
    this.formularioProveedorCliente.get('descripcionComercial')?.disable();
  }

  /**
   * Limpia los campos del formulario de proveedores y clientes.
   * @returns {void}
   */
  limpar(): void {
    this.formularioProveedorCliente.setValue({
      descripcionComercial: '',
      paisDestino: { id: -1, descripcion: '' },
      rfc: '',
      razonSocialCliente: '',
    });
  }

  /**
   * Maneja la selección de proveedores y clientes en la tabla.
   * @param {ProveedorClienteTabla[]} lista - La lista de proveedores y clientes seleccionados.
   * @returns {void}
   */
  proveedorClienteSeleccinados(lista: ProveedorClienteTabla[]): void {
    this.proveedorClienteListaSeleccionada = lista;
  }

  /**
   * Agrega un nuevo proveedor o cliente a la tabla.
   * @returns {void}
   */
  aggregar(): void {
    const PROVEEDOR_CLIENTE: ProveedorClienteTabla = {
      fraccion: this.fraccionTablaDatos?.encabezadoFraccion,
      paisDestino: this.obtenerValorPaisDeDestino(
        this.formularioProveedorCliente.get('paisDestino')?.value
      ),
      rfcClinte: this.formularioProveedorCliente.get('rfc')?.value,
      razonSocial:
        this.formularioProveedorCliente.get('razonSocialCliente')?.value,
    };
    this.proveedorClienteTablsDatos = [...this.proveedorClienteTablsDatos, PROVEEDOR_CLIENTE];
  }

  /**
   * Obtiene la descripción del país de destino a partir de su ID.
   * @param {number} id - El ID del país de destino.
   * @returns {string} La descripción del país de destino.
   */
  obtenerValorPaisDeDestino(id: number): string {
    const PAIS = this.paisDestinoCatalog.find(
      (ele) => ele.id === parseInt(id.toString(), 10)
    );
    return PAIS ? PAIS.descripcion : '';
  }

  /**
   * Obtiene el ID del país de destino a partir de su descripción.
   * @param {string} valor - La descripción del país de destino.
   * @returns {number} El ID del país de destino.
   */
  obtenerValorPaisDeDestinoId(valor: string): number {
    const PAIS = this.paisDestinoCatalog.find(
      (ele) => ele.descripcion === valor
    );
    return PAIS ? PAIS.id : 0;
  }

  /**
   * Elimina los proveedores o clientes seleccionados de la tabla.
   * @returns {void}
   */
  elimiar(): void {
    if (this.proveedorClienteListaSeleccionada.length > 0) {
      this.proveedorClienteTablsDatos = this.proveedorClienteTablsDatos.filter(
        (ele) => !this.proveedorClienteListaSeleccionada.includes(ele)
      );
    }
  }

  /**
   * Edita los datos del proveedor o cliente seleccionado en el formulario.
   * @returns {void}
   */
  eidtar(): void {
    if (this.proveedorClienteListaSeleccionada.length > 0) {
      this.formularioProveedorCliente.patchValue({
        paisDestino: this.obtenerValorPaisDeDestinoId(
          this.proveedorClienteListaSeleccionada[0].paisDestino
        ),
        rfc: this.proveedorClienteListaSeleccionada[0].rfcClinte,
        razonSocialCliente:
          this.proveedorClienteListaSeleccionada[0].razonSocial,
      });
    }
  }

  /**
   * Regresa a la vista anterior y emite los datos actualizados de proveedores y clientes.
   * @returns {void}
   */
  regrsarAnnexoI(): void {
    this.ubicaccion.back();
    this.datosActualizadosProveedorCliente.emit(
      this.proveedorClienteTablsDatos
    );
  }
}
