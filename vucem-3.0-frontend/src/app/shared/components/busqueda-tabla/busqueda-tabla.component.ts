import { Component, Input, SimpleChange } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'busqueda-tabla',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './busqueda-tabla.component.html',
  styleUrl: './busqueda-tabla.component.scss'
})
export class BusquedaTablaComponent {
  @Input() tipoTabla: string = '';





  ngOnChanges(changes: SimpleChange){


  }




}
