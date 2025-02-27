import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataosMercanciaComponent } from './dataos-mercancia.component';

describe('DataosDeLaMercanciaComponent', () => {
  let component: DataosMercanciaComponent;
  let fixture: ComponentFixture<DataosMercanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataosMercanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
