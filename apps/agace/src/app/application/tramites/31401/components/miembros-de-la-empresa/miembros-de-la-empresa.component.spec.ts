import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiembrosDeLaEmpresaComponent } from './miembros-de-la-empresa.component';

describe('MiembrosDeLaEmpresaComponent', () => {
  let component: MiembrosDeLaEmpresaComponent;
  let fixture: ComponentFixture<MiembrosDeLaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiembrosDeLaEmpresaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MiembrosDeLaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
