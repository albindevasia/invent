import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicksaleComponent } from './quicksale.component';

describe('QuicksaleComponent', () => {
  let component: QuicksaleComponent;
  let fixture: ComponentFixture<QuicksaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuicksaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuicksaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
