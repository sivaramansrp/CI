import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosRetornoProrrogaComponent } from './datos-retorno-prorroga.component';

describe('DatosRetornoProrrogaComponent', () => {
  let component: DatosRetornoProrrogaComponent;
  let fixture: ComponentFixture<DatosRetornoProrrogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosRetornoProrrogaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosRetornoProrrogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
