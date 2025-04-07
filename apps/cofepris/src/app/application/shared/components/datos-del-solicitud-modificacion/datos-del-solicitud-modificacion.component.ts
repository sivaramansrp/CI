
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent, InputRadioComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-del-solicitud-modificacion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, TituloComponent,InputRadioComponent,CatalogoSelectComponent,TablaDinamicaComponent],
  // imports: [CommonModule, ReactiveFormsModule, FormsModule, TituloComponent],  
  templateUrl: './datos-del-solicitud-modificacion.component.html',
  styleUrl: './datos-del-solicitud-modificacion.component.scss',
})
export class DatosDelSolicitudModificacionComponent {}
