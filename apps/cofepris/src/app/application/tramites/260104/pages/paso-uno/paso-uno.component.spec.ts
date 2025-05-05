import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default tab index of 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should change the tab index when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should not change the tab index if seleccionaTab is called with the same index', () => {
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });

  it('should update the tab index multiple times correctly', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });
});
