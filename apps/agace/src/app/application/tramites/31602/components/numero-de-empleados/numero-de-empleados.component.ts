import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Anteriores, ANTERIORES_TABLA, ConfiguracionColumna, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { ComercioExteriorService } from '../../services/comercio-exterior.service';

@Component({
  selector: 'numero-de-empleados',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TablaDinamicaComponent],
  templateUrl: './numero-de-empleados.component.html',
  styleUrl: './numero-de-empleados.component.scss',
})
export class NumeroDeEmpleadosComponent implements OnInit {

  public numeroDeEmpleadosDatos: Anteriores[] = [];
  public configuracionTabla: ConfiguracionColumna<Anteriores>[] = ANTERIORES_TABLA;

  constructor(
    private comercioExteriorSvc: ComercioExteriorService,
  ) {

  }

  ngOnInit(): void {
    this.getAnterioresTablaDatos();
  }

  public getAnterioresTablaDatos(): void {
    this.comercioExteriorSvc.getAnterioresDatos().subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.numeroDeEmpleadosDatos = DATOS;
    })
  }


  public abrirModal(): void {
    
  }
}
