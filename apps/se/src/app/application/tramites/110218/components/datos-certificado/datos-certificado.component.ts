import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { CERTIFICADO_TABLA } from '@libs/shared/data-access-user/src/tramites/constantes/110218/certificado-tecnico-japon.enum';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,TablaDinamicaComponent],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
})
export class DatosCertificadoComponent implements OnInit {
  datosdelcertificado : FormGroup ;
  configTableArray = CERTIFICADO_TABLA;
  datos:any;
  constructor(private fb: FormBuilder, private service:CertificadoTecnicoJaponService ) { 
    this.datosdelcertificado = this.fb.group({
      lugar: [""],
      observaciones: [""],
      
    })
  }
  ngOnInit(): void {
    this.getTabledatas();
  }

  getTabledatas():void{
    this.service.getDatosCertificado().subscribe(
      (data:any)=>{
        this.datos = data;
        console.log(this.datos)
      }
      
    )
  }
 
}
