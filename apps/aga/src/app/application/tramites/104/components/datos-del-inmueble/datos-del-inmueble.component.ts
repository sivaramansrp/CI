import { CatalogoSelectComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableData } from '@libs/shared/data-access-user/src/core/models/104/model-104';
import dropDown from '@libs/shared/theme/assets/json/104/selector-104.json'

@Component({
  selector: 'app-datos-del-inmueble',
  standalone: true,
  imports: [CommonModule, TituloComponent,
    TableComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule],
  templateUrl: './datos-del-inmueble.component.html',
  styleUrl: './datos-del-inmueble.component.css',
})
export class DatosDelInmuebleComponent implements OnInit{

  fomentoExportacionForm!: FormGroup;

  public establecimientoHeaderData: string[] = [];

  public establecimientoBodyData: unknown = [];

  destinatarioTableData: TableData = { encabezadoDeTabla: [], cuerpoTabla: [] };

  constructor(private fb: FormBuilder) {
    this.inicializarFormularioTratados();
  }

  ngOnInit(): void {
    this.getEstableCimiento();
  }



  inicializarFormularioTratados(): void {
    this.fomentoExportacionForm = this.fb.group({
      tipoPrograma: ['', Validators.required],
      folioAutorizacion: ['', Validators.required],
    });
  }

  configuracionesDropdown = [
    { catalogos: dropDown.tipoPrograma },
    { catalogos: dropDown.folioAutorizacion },
  ];


  private getEstableCimiento(): void {
    this.establecimientoHeaderData = this.destinatarioTableData?.encabezadoDeTabla;
    this.establecimientoBodyData = this.destinatarioTableData?.cuerpoTabla;
  }

}
