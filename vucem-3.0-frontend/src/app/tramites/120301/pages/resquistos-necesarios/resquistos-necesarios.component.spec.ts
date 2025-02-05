import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResquistosNecesariosComponent } from './resquistos-necesarios.component';

describe('ResquistosNecesariosComponent', () => {
  let component: ResquistosNecesariosComponent;
  let fixture: ComponentFixture<ResquistosNecesariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResquistosNecesariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResquistosNecesariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
