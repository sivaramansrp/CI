import { PasoDosComponent } from './paso-dos.component';
import { TEXTOS } from '@libs/shared/data-access-user/src';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;

  beforeEach(() => {
    component = new PasoDosComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTOS with the shared TEXTOS constant', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });
});
