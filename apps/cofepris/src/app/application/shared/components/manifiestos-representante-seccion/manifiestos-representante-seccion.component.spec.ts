import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifiestosRepresentanteSeccionComponent } from './manifiestos-representante-seccion.component';

describe('ManifiestosRepresentanteSeccionComponent', () => {
  let component: ManifiestosRepresentanteSeccionComponent;
  let fixture: ComponentFixture<ManifiestosRepresentanteSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifiestosRepresentanteSeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosRepresentanteSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
