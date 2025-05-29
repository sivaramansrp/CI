import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, PersonaTerceros, TercerosComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tercerospage',
  standalone: true,
  imports: [CommonModule,
    TercerosComponent
  ],
  templateUrl: './tercerospage.component.html',
  styleUrl: './tercerospage.component.scss',
})
export class TercerospageComponent implements OnInit,OnDestroy {
    private destroyNotifier$ = new Subject<void>();
    personas:PersonaTerceros[]=[];
      esFormularioSoloLectura:boolean = false;
  constructor(private consultaQuery: ConsultaioQuery){

  }
  ngOnInit(): void {
     this.consultaQuery.selectConsultaioState$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((seccionState) => {
          this.esFormularioSoloLectura=seccionState?.readonly;
        });
        this.personas =[
          {
    nombre: "Carlos Rodríguez",
    correo: "carlos.rodriguez@example.com"
  },
  {
    nombre: "Ana Martínez",
    correo: "ana.martinez@example.com"
  },
  {
    nombre: "Luis Fernández",
    correo: "luis.fernandez@example.com"
  }
        ]
  }

  ngOnDestroy(): void {
        this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
