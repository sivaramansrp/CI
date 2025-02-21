import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataosDeLaMercanciaComponent } from './dataos-de-la-mercancia.component';

describe('DataosDeLaMercanciaComponent', () => {
  let component: DataosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DataosDeLaMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataosDeLaMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
