import { Component, OnInit } from '@angular/core';
import { PrincipalService } from '../services/principal.service';

@Component({
  selector: 'app-atender-requerimiento',
  templateUrl: './atender-requerimiento.component.html',
  styleUrls: ['./atender-requerimiento.component.css']
})
export class AtenderRequerimientoComponent implements OnInit {
  tituloTramiteVisible: boolean = false;

  constructor(private principalService: PrincipalService) { }

  ngOnInit(): void {
    this.tituloTramiteVisible = this.principalService.esTituloTramiteVisible();
  }
}