import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosResiduosPeligrososComponent } from './datos-residuos-peligrosos.component';

describe('DatosResiduosPeligrososComponent', () => {
  let component: DatosResiduosPeligrososComponent;
  let fixture: ComponentFixture<DatosResiduosPeligrososComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosResiduosPeligrososComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosResiduosPeligrososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
