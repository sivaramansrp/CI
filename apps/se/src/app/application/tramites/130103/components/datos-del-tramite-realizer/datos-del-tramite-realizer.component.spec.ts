import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteRealizerComponent } from './datos-del-tramite-realizer.component';

describe('DatosDelTramiteRealizerComponent', () => {
  let component: DatosDelTramiteRealizerComponent;
  let fixture: ComponentFixture<DatosDelTramiteRealizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteRealizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteRealizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
