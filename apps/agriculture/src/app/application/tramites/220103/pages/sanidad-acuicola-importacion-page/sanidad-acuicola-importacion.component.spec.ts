import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SanidadAcuicolaImportacionComponent } from './sanidad-acuicola-importacion.component';

describe('SanidadAcuicolaImportacionComponent', () => {
  let component: SanidadAcuicolaImportacionComponent;
  let fixture: ComponentFixture<SanidadAcuicolaImportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanidadAcuicolaImportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SanidadAcuicolaImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
