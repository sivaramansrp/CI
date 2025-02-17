import { Component, OnInit } from '@angular/core';
import { EncabezadoWizardCapturaService } from './encabezadoWizardCaptura.service';
import { Observable } from 'rxjs';

interface ElementoWizard {
  estado: string;
  posicionTmp: number;
  text: string;
}

interface ActionBean {
  elementosWizard: ElementoWizard[];
}

@Component({
  selector: 'app-encabezado-wizard-captura',
  templateUrl: './encabezado-wizard-captura.component.html',
  styleUrls: ['./encabezado-wizard-captura.component.css']
})
export class EncabezadoWizardCapturaComponent implements OnInit {
  actionBean: ActionBean = { elementosWizard: [] };

  constructor(private encabezadoWizardService: EncabezadoWizardCapturaService) {}

  ngOnInit(): void {
    this.obtenerElementosWizard();
  }

  private obtenerElementosWizard(): void {
    this.encabezadoWizardService.getActionBean().subscribe(
      (data: ActionBean) => {
        this.actionBean = data;
      },
      (error) => {
        console.error('Error al obtener elementos del wizard:', error);
      }
    );
  }
}