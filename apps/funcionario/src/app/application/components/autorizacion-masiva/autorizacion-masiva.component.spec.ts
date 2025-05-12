import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutorizacionMasivaComponent } from './autorizacion-masiva.component';

describe('AutorizacionMasivaComponent', () => {
  let component: AutorizacionMasivaComponent;
  let fixture: ComponentFixture<AutorizacionMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorizacionMasivaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizacionMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
