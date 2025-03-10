import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnInit{
   detallestransporte : FormGroup ;
   
   puertodeEmbarque$: Observable<string | null> = this.tramite110218Query.puertodeEmbarque$;
   puertodeDesembarque$: Observable<string | null> = this.tramite110218Query.puertodeDesembarque$;
   puertodeTránsito$: Observable<string | null> = this.tramite110218Query.puertodeTránsito$;
   nombredelaEmbarcación$: Observable<string | null> = this.tramite110218Query.nombredelaEmbarcación$;
   númerodeVuelo$: Observable<string | null> = this.tramite110218Query.númerodeVuelo$;


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
      this.puertodeEmbarque$.subscribe((puertodeEmbarque) => {
        if(puertodeEmbarque){
          this.detallestransporte.get('puertodeEmbarque')?.setValue(puertodeEmbarque);
        }
      });
      this.puertodeDesembarque$.subscribe((puertodeDesembarque) => {
        if(puertodeDesembarque){
          this.detallestransporte.get('puertodeDesembarque')?.setValue(puertodeDesembarque);
        }
      });
      this.nombredelaEmbarcación$.subscribe((nombredelaEmbarcación) => {
        if(nombredelaEmbarcación){
          this.detallestransporte.get('nombredelaEmbarcación')?.setValue(nombredelaEmbarcación);
        }
      });
      this.númerodeVuelo$.subscribe((númerodeVuelo) => {
        if(númerodeVuelo){
          this.detallestransporte.get('númerodeVuelo')?.setValue(númerodeVuelo);
        }
      });
      
      this.puertodeTránsito$.subscribe((puertodeTránsito) => {
        if(puertodeTránsito){
          this.detallestransporte.get('puertodeTránsito')?.setValue(puertodeTránsito);
        }
      });
    }

    onPuertodeEmbarque():void{
      const PUERTODE_EMBARQUE = this.detallestransporte.get('puertodeEmbarque')?.value;
      this.tramite110218Store.setpuertodeEmbarque(PUERTODE_EMBARQUE);
    }
    onPuertodeDesembarque():void{
      const PUERTODE_DESEMBARQUE = this.detallestransporte.get('puertodeDesembarque')?.value;
      this.tramite110218Store.setpuertodeDesembarque(PUERTODE_DESEMBARQUE);
    }
    onNombredelaEmbarcacion():void{
      const NOMBREDELA_EMBARCACION = this.detallestransporte.get('nombredelaEmbarcación')?.value;
      this.tramite110218Store.setnombredelaEmbarcación(NOMBREDELA_EMBARCACION);
    }
    onNumerodeVuelo():void{
      const NUMERODE_VUELO = this.detallestransporte.get('númerodeVuelo')?.value;
      this.tramite110218Store.setnúmerodeVuelo(NUMERODE_VUELO);
    }
    onPuertodeTransito():void{
      const PUERTODE_TRANSITO = this.detallestransporte.get('puertodeTránsito')?.value;
      this.tramite110218Store.setPuertodeTránsito(PUERTODE_TRANSITO);
    }
}
