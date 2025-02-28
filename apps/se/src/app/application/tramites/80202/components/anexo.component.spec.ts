import { AnexoComponent } from './anexo.component';
import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('AnexoComponent', () => {
  let component: AnexoComponent;
  let fixture: ComponentFixture<AnexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnexoComponent],
      imports: [ReactiveFormsModule, TituloComponent, TablaDinamicaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms', () => {
    expect(component.fraccionForm).toBeDefined();
    expect(component.fraccionArancelaria).toBeDefined();
  });

  it('should have correct column configurations', () => {
    expect(component.configuracionColumnasSensibles.length).toBe(7);
    expect(component.configuracionColumnas.length).toBe(6);
  });

  it('should have sample data', () => {
    expect(component.datos.length).toBe(1);
    expect(component.datos2.length).toBe(1);
  });
});
