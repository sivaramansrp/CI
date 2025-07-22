import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransporteFerroviarioComponent } from './transporte-ferroviario.component';

describe('TransporteFerroviarioComponent', () => {
  let component: TransporteFerroviarioComponent;
  let fixture: ComponentFixture<TransporteFerroviarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporteFerroviarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransporteFerroviarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
