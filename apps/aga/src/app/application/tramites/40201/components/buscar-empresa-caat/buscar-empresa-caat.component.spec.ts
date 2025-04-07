import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarEmpresaCaatComponent } from './buscar-empresa-caat.component';

describe('BuscarEmpresaCaatComponent', () => {
  let component: BuscarEmpresaCaatComponent;
  let fixture: ComponentFixture<BuscarEmpresaCaatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarEmpresaCaatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarEmpresaCaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
