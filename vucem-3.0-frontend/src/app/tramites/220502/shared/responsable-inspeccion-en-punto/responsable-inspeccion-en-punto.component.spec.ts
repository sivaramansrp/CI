import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResponsableInspeccionEnPuntoComponent } from './responsable-inspeccion-en-punto.component';

describe('ResponsableInspeccionEnPuntoComponent', () => {
  let component: ResponsableInspeccionEnPuntoComponent;
  let fixture: ComponentFixture<ResponsableInspeccionEnPuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableInspeccionEnPuntoComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableInspeccionEnPuntoComponent);
    component = fixture.componentInstance;
    (component.grupoformulariopadre as FormGroup).controls = {};
    component.claveDeControl = 'testControl';
    component.grupoformulariopadre.addControl(component.claveDeControl, new FormGroup({}));
    fixture.detectChanges();
  });

  it('should remove control on ngOnDestroy', () => {
    expect(component.grupoformulariopadre.contains(component.claveDeControl)).toBeTrue();
    component.ngOnDestroy();
    expect(component.grupoformulariopadre.contains(component.claveDeControl)).toBeFalse();
  });
});