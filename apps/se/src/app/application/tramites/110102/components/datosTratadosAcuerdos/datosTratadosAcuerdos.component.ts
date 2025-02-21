import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpCoreService } from 'libs/shared/data-access-user/src/core/services/shared/http/http.service';
import { TableComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/table/table.component";


@Component({
  selector: 'app-datos-tratados-acuerdos',
  standalone: true,
  imports: [CommonModule, TableComponent, InputRadioComponent],
  templateUrl: './datosTratadosAcuerdos.component.html',
  styleUrl: './datosTratadosAcuerdos.component.scss',
})
export class DatosTratadosAcuerdosComponent implements OnInit{
  tableHeader:string[]=[];
  destroyed$:any;
tablevalue:any=[]

  constructor(private http:HttpCoreService){
     //
  }

  ngOnInit(): void {
      
    this.http.get('./assets/json/110102/datosTratadosAcuerdos.json').subscribe((data:any) => {
      this.tableHeader = data.tableHeader;
      this.tablevalue=data.tableBody;
      console.log("console",this.tableHeader,this.tablevalue)
    });
   


}
}
