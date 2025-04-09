import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TramiteAsociadosComponent } from './tramite-asociados.component';

describe('TramiteAsociadosComponent', () => {
  let component: TramiteAsociadosComponent;
  let fixture: ComponentFixture<TramiteAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteAsociadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TramiteAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
