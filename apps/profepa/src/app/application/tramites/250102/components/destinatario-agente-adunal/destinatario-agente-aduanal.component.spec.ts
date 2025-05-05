import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinatarioAgenteAduanalComponent } from './destinatario-agente-aduanal.component';

describe('DestinatarioAgenteAduanalComponent', () => {
  let component: DestinatarioAgenteAduanalComponent;
  let fixture: ComponentFixture<DestinatarioAgenteAduanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinatarioAgenteAduanalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinatarioAgenteAduanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
