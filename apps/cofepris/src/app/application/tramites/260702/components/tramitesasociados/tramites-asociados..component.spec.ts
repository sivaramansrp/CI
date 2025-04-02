import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TramitesasociadosComponent } from './tramites-asociados..component';

describe('TramitesasociadosComponent', () => {
  let component: TramitesasociadosComponent;
  let fixture: ComponentFixture<TramitesasociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramitesasociadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TramitesasociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
