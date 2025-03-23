import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturaComponent } from './agricultura.component';
import { AccionBoton } from '../../models/220202/fitosanitario.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BtnContinuarComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';

describe('AgriculturaComponent', () => {
  let component: AgriculturaComponent;
  let fixture: ComponentFixture<AgriculturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgriculturaComponent, PasoDosComponent, PasoUnoComponent, PasoTresComponent], // Declara el componente a testear
      imports: [HttpClientTestingModule, TituloComponent, WizardComponent, BtnContinuarComponent, SolicitanteComponent], // Importa los módulos necesarios para el componente (si los hay)
      providers: [] // Provee los servicios necesarios para el componente (si los hay)
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgriculturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

})
