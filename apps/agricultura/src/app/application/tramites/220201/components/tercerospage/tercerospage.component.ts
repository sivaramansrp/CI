import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, TercerosComponent } from '@ng-mf/data-access-user';
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
      esFormularioSoloLectura:boolean = false;
  constructor(private consultaQuery: ConsultaioQuery){

  }
  ngOnInit(): void {
     this.consultaQuery.selectConsultaioState$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((seccionState) => {
          this.esFormularioSoloLectura=seccionState?.readonly;
        });
  }

  ngOnDestroy(): void {
        this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
