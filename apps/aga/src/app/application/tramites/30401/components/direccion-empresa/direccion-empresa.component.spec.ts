import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireccionEmpresaComponent } from './direccion-empresa.component';

describe('DireccionEmpresaComponent', () => {
  let component: DireccionEmpresaComponent;
  let fixture: ComponentFixture<DireccionEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireccionEmpresaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
