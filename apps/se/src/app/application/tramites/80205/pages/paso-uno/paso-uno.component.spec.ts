import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should have seccionesDeLaSolicitud defined', () => {
    expect(component.seccionesDeLaSolicitud).toEqual([
      { index: 1, title: 'Solicitante', component: 'solicitante' },
      { index: 2, title: 'Servicios', component: 'datos-de-la-solicitud' },
    ]);
  });

  it('should emit tabChanged event when seleccionaTab is called', () => {
    jest.spyOn(component.tabChanged, 'emit');
    const tabIndex = 2;
    component.seleccionaTab(tabIndex);
    expect(component.indice).toBe(tabIndex);
    expect(component.tabChanged.emit).toHaveBeenCalledWith(tabIndex);
  });

  it('should change tab index when seleccionaTab is called', () => {
    const tabIndex = 2;
    component.seleccionaTab(tabIndex);
    expect(component.indice).toBe(tabIndex);
  });
});