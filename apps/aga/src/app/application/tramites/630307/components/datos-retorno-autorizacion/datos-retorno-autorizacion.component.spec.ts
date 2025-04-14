import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosRetornoAutorizacionComponent } from './datos-retorno-autorizacion.component';

describe('DatosRetornoAutorizacionComponent', () => {
  let component: DatosRetornoAutorizacionComponent;
  let fixture: ComponentFixture<DatosRetornoAutorizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosRetornoAutorizacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosRetornoAutorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
