import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CantidadSolicitadaComponent } from './cantidad-solicitada.component';

describe('CantidadSolicitadaComponent', () => {
  let component: CantidadSolicitadaComponent;
  let fixture: ComponentFixture<CantidadSolicitadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantidadSolicitadaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CantidadSolicitadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
