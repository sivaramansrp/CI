import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaFolioComponent } from './busqueda-folio.component';

describe('BusquedaFolioComponent', () => {
  let component: BusquedaFolioComponent;
  let fixture: ComponentFixture<BusquedaFolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaFolioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
