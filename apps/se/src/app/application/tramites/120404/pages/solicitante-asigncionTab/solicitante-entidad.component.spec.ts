import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitanteAsigncionComponent } from './solicitante-asigncion.component';

describe('SolicitanteAsigncionComponent', () => {
  let component: SolicitanteAsigncionComponent;
  let fixture: ComponentFixture<SolicitanteAsigncionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitanteAsigncionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteAsigncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial tab index', () => {
    expect(component.indice).toBe(1);
  });

  it('should select the correct tab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should select the first tab', () => {
    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });
});