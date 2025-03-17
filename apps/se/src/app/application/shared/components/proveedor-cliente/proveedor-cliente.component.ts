import { ActivatedRoute, Router } from '@angular/router';
import {
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PROVEEDOR_CLIENTE_TABLA_CONFIG } from '../../enum/anexo-dos-y-tres.enum';
import { ProveedorClienteTabla } from '../../models/se-shared.model';

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
export class ProveedorClienteComponent {
  public formularioProveedorCliente!: FormGroup;

  public paisDestinoCatalog: Catalogo[] = [
    {
      id: 1,
      descripcion: 'Mexico',
    },
    {
      id: 2,
      descripcion: 'USA',
    },
  ];

  public proveedorClienteTablsDatos: ProveedorClienteTabla[] = [];

  public proveedorClienteListaSeleccionada: ProveedorClienteTabla[] = [];

  tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  public readonly PROVEEDOR_CLIENTE_TABLA_CONFIG =
    PROVEEDOR_CLIENTE_TABLA_CONFIG;

  constructor(private fb: FormBuilder,private router:Router,private activatedRoute: ActivatedRoute) {
    this.inicializarFormularioProveedorCliente();
  }

  cambioPaisDestino(event: Catalogo): void {
    this.formularioProveedorCliente.patchValue({
      paisDestino: event.id,
    });
  }

  inicializarFormularioProveedorCliente(): void {
    this.formularioProveedorCliente = this.fb.group({
      descripcionComercial: ['', Validators.required, { disabled: true }],
      paisDestino: [0, Validators.required],
      rfc: ['', Validators.required],
      razonSocialCliente: ['', Validators.required],
    });
    this.formularioProveedorCliente.get('descripcionComercial')?.disable();
  }

  limpar(): void {
    this.formularioProveedorCliente.setValue({
      descripcionComercial: '',
      paisDestino: 0,
      rfc: '',
      razonSocialCliente: '',
    })
  }

  proveedorClienteSeleccinados(lista: ProveedorClienteTabla[]): void {
    this.proveedorClienteListaSeleccionada = lista;
  }

  aggregar(): void {
    const PROVEEDOR_CLIENTE: ProveedorClienteTabla = {
      fraccion: 2,
      paisDestino: this.obtenerValorPaisDeDestino(
        this.formularioProveedorCliente.get('paisDestino')?.value
      ),
      rfcClinte: this.formularioProveedorCliente.get('rfc')?.value,
      razonSocial:
        this.formularioProveedorCliente.get('razonSocialCliente')?.value,
    };
    this.proveedorClienteTablsDatos.push(PROVEEDOR_CLIENTE);
  }

  obtenerValorPaisDeDestino(id: number): string {
    const PAIS = this.paisDestinoCatalog.find((ele) => ele.id === id);
    return PAIS ? PAIS.descripcion : '';
  }

  obtenerValorPaisDeDestinoId(valor:string): number {
    const PAIS = this.paisDestinoCatalog.find((ele) => ele.descripcion === valor);
    return PAIS? PAIS.id : 0;
  }

  elimiar(): void {
    if (this.proveedorClienteListaSeleccionada.length > 0) {
      this.proveedorClienteTablsDatos = this.proveedorClienteTablsDatos.filter(
        (ele) => !this.proveedorClienteListaSeleccionada.includes(ele)
      );
    }
  }
  eidtar(): void {
    if (this.proveedorClienteListaSeleccionada.length > 0) {
      this.formularioProveedorCliente.patchValue({
        paisDestino: this.obtenerValorPaisDeDestinoId(this.proveedorClienteListaSeleccionada[0].paisDestino),
        rfc: this.proveedorClienteListaSeleccionada[0].rfcClinte,
        razonSocialCliente: this.proveedorClienteListaSeleccionada[0].razonSocial,
      });
    }
  }

  regrssarAnnexoI():void{
      this.router.navigate(['../action'], { relativeTo: this.activatedRoute });
  }

}
