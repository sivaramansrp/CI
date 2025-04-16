import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItinerarioExportacionYTransportacionComponent } from './itinerario-exportacion-y-transportacion.component';

describe('ItinerarioExportacionYTransportacionComponent', () => {
  let component: ItinerarioExportacionYTransportacionComponent;
  let fixture: ComponentFixture<ItinerarioExportacionYTransportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItinerarioExportacionYTransportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ItinerarioExportacionYTransportacionComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
