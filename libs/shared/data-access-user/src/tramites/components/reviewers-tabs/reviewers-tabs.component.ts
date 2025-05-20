import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { AcusesResolucionesComponent } from "../consulta-generica/bandeja-acuses-resoluciones/acuses-resoluciones.component";
import { CommonModule } from "@angular/common";
import { ConsultarequerimientosComponent } from "../consulta-generica/consulta-requerimientos/consulta-requerimientos.component";
import { DictamenesComponent } from "../consulta-generica/bandeja-dictamenes/dictamenes.component";
import { DocumentosComponent } from "../consulta-generica/bandeja-documentos/documentos.component";
import { EnvioDigitalComponent } from "../consulta-generica/consulta-envio-digital/envio-digital.component";
import { OpinionComponent } from "../consulta-generica/consulta-opinion/opiniones.component";
import { Tabulaciones } from "../../../core/models/lista-trimites.model";
import { TareasTramiteComponent } from "../consulta-generica/bandeja-tareas-tramite/tareas-tramite.component";
import tramiteDetailsData from '@libs/shared/theme/assets/json/shared/lista-trimites-tabs.json';


@Component({
  selector: 'app-reviewers-tabs',
  standalone: true,
  imports: [CommonModule,DocumentosComponent,DictamenesComponent, ConsultarequerimientosComponent, OpinionComponent, AcusesResolucionesComponent, TareasTramiteComponent, EnvioDigitalComponent],
  templateUrl: './reviewers-tabs.component.html',
  styleUrl: './reviewers-tabs.component.scss',
})
export class ReviewersTabsComponent implements OnChanges, OnInit {
  indice: number = 0;
  listaDeTabulaciones: Tabulaciones[] = tramiteDetailsData;
  @Input() tramite!: number;
  @Input() viewChild!: Type<unknown>;
  @Output() viewChildcambioDePestana = new EventEmitter<Tabulaciones>();
  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer!: ViewContainerRef;
  ngOnInit(): void {
    if (this.listaDeTabulaciones) {
      this.seleccionaTab(0, this.listaDeTabulaciones[0]);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['viewChild'] && this.viewChild) {
      this.updateTabs();
    }
  }
  seleccionaTab(i: number, j: Tabulaciones): void {
    if (j?.disabled) { return }
    this.indice = i;
    this.viewChildcambioDePestana.emit(j);
    setTimeout(() => {
      this.updateTabs();
    }, 100);
  }
  updateTabs(): void {
    if (this.childContainer && this.viewChild) {
      this.childContainer.clear();
      this.childContainer.createComponent(this.viewChild);
    }
  }
}
