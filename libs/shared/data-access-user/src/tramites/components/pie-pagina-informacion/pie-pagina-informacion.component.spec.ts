import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiePaginaInformacionComponent } from './pie-pagina-informacion.component';

describe('PiePaginaInformacionComponent', () => {
  let component: PiePaginaInformacionComponent;
  let fixture: ComponentFixture<PiePaginaInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiePaginaInformacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiePaginaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
