import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecintoFiscalizadoEstrategicoComponent } from './recinto-fiscalizado-estrategico.component';

describe('RecintoFiscalizadoEstrategicoComponent', () => {
  let component: RecintoFiscalizadoEstrategicoComponent;
  let fixture: ComponentFixture<RecintoFiscalizadoEstrategicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecintoFiscalizadoEstrategicoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecintoFiscalizadoEstrategicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
