import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTransportistasComponent } from './empresas-transportistas.component';

describe('EmpresasTransportistasComponent', () => {
  let component: EmpresasTransportistasComponent;
  let fixture: ComponentFixture<EmpresasTransportistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasTransportistasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTransportistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
