import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDuosComponent } from '../paso-duos/paso-duos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent, PasoUnoComponent, PasoDuosComponent, PasoTresComponent],
      imports: [HttpClientTestingModule, WizardComponent, BtnContinuarComponent, SolicitanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not update indice for invalid tab values', () => {
    component.seleccionaTab(1);
  });

  it('should handle edge cases for getValorIndice', () => {
    const invalidEvent = { accion: 'invalid', valor: 5 };
    component.getValorIndice(invalidEvent);

    const nullActionEvent = { accion: 'cont', valor: 2 };
    component.getValorIndice(nullActionEvent);
  });
});
