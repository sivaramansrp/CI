import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarTransferenciaCuposMainComponent } from './solicitar-transferencia-cupos-main.component';

describe('SolicitarTransferenciaCuposMainComponent', () => {
  let component: SolicitarTransferenciaCuposMainComponent;
  let fixture: ComponentFixture<SolicitarTransferenciaCuposMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarTransferenciaCuposMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitarTransferenciaCuposMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
