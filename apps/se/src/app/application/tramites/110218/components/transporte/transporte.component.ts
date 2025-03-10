import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnInit, OnDestroy{
   detallestransporte : FormGroup ;
   
   puertodeEmbarque$: Observable<string | null> = this.tramite110218Query.puertodeEmbarque$;
   puertodeDesembarque$: Observable<string | null> = this.tramite110218Query.puertodeDesembarque$;
   puertodeTránsito$: Observable<string | null> = this.tramite110218Query.puertodeTránsito$;
   nombredelaEmbarcación$: Observable<string | null> = this.tramite110218Query.nombredelaEmbarcación$;
   númerodeVuelo$: Observable<string | null> = this.tramite110218Query.númerodeVuelo$;

   private destroyed$ = new Subject<void>();
   
    constructor(private fb: FormBuilder,private tramite110218Store: Tramite110218Store, 
      private tramite110218Query: Tramite110218Query, ) { 
      this.detallestransporte = this.fb.group({
        puertodeEmbarque: [""],
        puertodeDesembarque: [""],
        puertodeTránsito: [""],
        nombredelaEmbarcación: [""],
        númerodeVuelo: [""],
      })
    }
    ngOnInit(): void {
      this.subscribeToStoreChanges();
    }
    subscribeToStoreChanges(): void {
      const OBSERVABLES = {
        puertodeEmbarque: this.puertodeEmbarque$,
        puertodeDesembarque: this.puertodeDesembarque$,
        nombredelaEmbarcación: this.nombredelaEmbarcación$,
        númerodeVuelo: this.númerodeVuelo$,
        puertodeTránsito: this.puertodeTránsito$,
      };
  
      Object.entries(OBSERVABLES).forEach(([controlName, OBSERVABLES$]) => {
        OBSERVABLES$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
          if (value) {
            this.detallestransporte.get(controlName)?.setValue(value);
          }
        });
      });
    }

    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }

    onDetallestransporteChange(controlName: string): void {
      const VALUE = this.detallestransporte.get(controlName)?.value;
  
      switch (controlName) {
        case 'puertodeEmbarque':
          this.tramite110218Store.setpuertodeEmbarque(VALUE);
          break;
        case 'puertodeDesembarque':
          this.tramite110218Store.setpuertodeDesembarque(VALUE);
          break;
        case 'nombredelaEmbarcación':
          this.tramite110218Store.setnombredelaEmbarcación(VALUE);
          break;
        case 'númerodeVuelo':
          this.tramite110218Store.setnúmerodeVuelo(VALUE);
          break;
        case 'puertodeTránsito':
          this.tramite110218Store.setPuertodeTránsito(VALUE);
          break;
        default:
          console.warn(`Unhandled control name: ${controlName}`);
          break;
      }
    }
  }

