import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeruHistoricoProductoresComponent } from './peru-historico-productores.component';

describe('PeruHistoricoProductoresComponent', () => {
  let component: PeruHistoricoProductoresComponent;
  let fixture: ComponentFixture<PeruHistoricoProductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeruHistoricoProductoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeruHistoricoProductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
