import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteRealizarComponent } from './datos-del-tramite-realizar.component';

describe('DatosDelTramiteRealizarComponent', () => {
  let component: DatosDelTramiteRealizarComponent;
  let fixture: ComponentFixture<DatosDelTramiteRealizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteRealizarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteRealizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
