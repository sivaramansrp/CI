import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelaComponent } from './datosDela.component';

describe('DatosDelaComponent', () => {
  let component: DatosDelaComponent;
  let fixture: ComponentFixture<DatosDelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
