import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TramitesAsociadosSeccionComponent } from './tramites-asociados-seccion.component';

describe('TramitesAsociadosSeccionComponent', () => {
  let component: TramitesAsociadosSeccionComponent;
  let fixture: ComponentFixture<TramitesAsociadosSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramitesAsociadosSeccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TramitesAsociadosSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
