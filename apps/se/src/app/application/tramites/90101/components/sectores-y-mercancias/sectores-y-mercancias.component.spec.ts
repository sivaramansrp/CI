import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProsecService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

@Component({
  selector: 'app-sectores-y-mercancias',
  templateUrl: './sectores-y-mercancias.component.html',
  styleUrls: ['./sectores-y-mercancias.component.scss']
})
export class SectoresYMercanciasComponent implements OnInit {
  sectoresYMercancias!: FormGroup;
  sector: any[] = [];

  constructor(private fb: FormBuilder, private prosecService: ProsecService) {
    this.sectoresYMercancias = this.fb.group({
      // form controls initialization
    });
  }

  ngOnInit(): void {
    this.obtenerListaEstado();
  }

  obtenerListaEstado(): void {
    this.prosecService.obtenerMenuDesplegable('sector.json').subscribe(
      data => this.sector = data,
      error => this.sector = []
    );
  }
}