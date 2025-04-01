import { CatalogoSelectComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MENSAJEDEALERTA } from '@libs/shared/data-access-user/src/core/enums/104/104.enum';
import { TableData } from '@libs/shared/data-access-user/src/core/models/104/model-104';
import destinatarioTableData from '@libs/shared/theme/assets/json/104/table-104.json'
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
export class DatosDelInmuebleComponent implements OnInit {

  fomentoExportacionForm!: FormGroup;

  public establecimientoHeaderData: string[] = [];

  public establecimientoBodyData: unknown = [];

  destinatarioTableData: TableData = { encabezadoDeTabla: [], cuerpoTabla: [] };

  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.inicializarFormularioTratados();
    this.destinatarioTableData.encabezadoDeTabla = destinatarioTableData?.encabezadoDeTabla;
    this.destinatarioTableData.cuerpoTabla = destinatarioTableData?.cuerpoTabla;

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
