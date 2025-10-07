import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelRepresentanteComponent } from './DatosDelRepresentante.component';

describe('DatosDelRepresentanteComponent', () => {
  let component: DatosDelRepresentanteComponent;
  let fixture: ComponentFixture<DatosDelRepresentanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelRepresentanteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
