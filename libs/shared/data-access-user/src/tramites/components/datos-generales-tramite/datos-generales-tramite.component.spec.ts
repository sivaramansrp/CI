import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesTramiteComponent } from './datos-generales-tramite.component';

describe('DatosGeneralesTramiteComponent', () => {
  let component: DatosGeneralesTramiteComponent;
  let fixture: ComponentFixture<DatosGeneralesTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosGeneralesTramiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
