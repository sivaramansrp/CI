import { Component, OnInit } from '@angular/core';
import { ContenidoTabsWizardService } from '../services/contenidoTabsWizard.service';

@Component({
  selector: 'app-contenido-tabs-wizard',
  templateUrl: './contenido-tabs-wizard.component.html',
  styleUrls: ['./contenido-tabs-wizard.component.scss']
})
export class ContenidoTabsWizardComponent implements OnInit {

  constructor(private contenidoTabsWizardService: ContenidoTabsWizardService) { }

  ngOnInit(): void {
    // Initialize component if needed
  }

}