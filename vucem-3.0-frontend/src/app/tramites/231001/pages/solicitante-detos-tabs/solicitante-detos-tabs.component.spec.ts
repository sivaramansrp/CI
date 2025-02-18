import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitanteDetosTabsComponent } from './solicitante-detos-tabs.component';

describe('SolicitanteDetosTabsComponent', () => {
  let component: SolicitanteDetosTabsComponent;
  let fixture: ComponentFixture<SolicitanteDetosTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitanteDetosTabsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteDetosTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial indice value as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice value when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should update indice value to 0', () => {
    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });

  it('should not update indice value if the same tab is selected', () => {
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });
});