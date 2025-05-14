import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Tabulaciones } from "../../../core/models/lista-trimites.model";
import tramiteDetailsData from '@libs/shared/theme/assets/json/shared/lista-trimites-tabs.json';


@Component({
  selector: 'app-reviewers-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviewers-tabs.component.html',
  styleUrl: './reviewers-tabs.component.scss',
})
export class ReviewersTabsComponent implements OnChanges, OnInit {
  indice: number = 0;
  listaDeTabulaciones: Tabulaciones[] = [];
  @Input() tramite!: number;
  @Input() viewChild!: Type<unknown>;
  @Output() viewChildcambioDePestana = new EventEmitter<Tabulaciones>();
  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer!: ViewContainerRef;
  ngOnInit(): void {
    this.listaDeTabulaciones = tramiteDetailsData.filter((v) => v.tramite === this.tramite);
    this.seleccionaTab(0, this.listaDeTabulaciones[0]);
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
