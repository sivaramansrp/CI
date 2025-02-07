import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from "../../../5701/components/solicitante/solicitante.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detos-gen-del',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SolicitanteComponent
],
  templateUrl: './detos-gen-del.component.html',
  styleUrl: './detos-gen-del.component.scss'
})
export class DetosGenDelComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
   
  }

}
