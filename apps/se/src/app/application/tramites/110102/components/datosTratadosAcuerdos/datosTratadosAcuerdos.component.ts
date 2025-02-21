import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpCoreService } from 'libs/shared/data-access-user/src/core/services/shared/http/http.service';



@Component({
  selector: 'app-datos-tratados-acuerdos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datosTratadosAcuerdos.component.html',
  styleUrl: './datosTratadosAcuerdos.component.scss',
})
export class DatosTratadosAcuerdosComponent implements OnInit{



  constructor(private http:HttpCoreService)
  {
    //constructor
  }
  ngOnInit(): void {
       this.http.get('')
  }


}
