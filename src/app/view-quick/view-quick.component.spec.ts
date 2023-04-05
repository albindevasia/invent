import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuickComponent } from './view-quick.component';

describe('ViewQuickComponent', () => {
  let component: ViewQuickComponent;
  let fixture: ComponentFixture<ViewQuickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
