import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { PhotoFrameComponent } from "./photo-frame.component";
import { PhotoFrameModule } from "./photo-frame.module";

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it("Should create component", () => {
    expect(component).toBeTruthy();
  });

  it(`${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) once when called 
    multiple times within debounce time`, fakeAsync(() => {
      fixture.detectChanges(); // dispara ciclo de vida do componente
      let times = 0;
      component.liked.subscribe(() => times++); // toda vez que for disparado incrementa times
      component.like(); // chama 1
      component.like(); // chama 2
      tick(500); // espera 500 antes de executar expect
      expect(times).toBe(1); // porém só deve computar 1
  }));

  it(`${PhotoFrameComponent.prototype.like.name} 
    should trigger (@Output liked) two times when
    called outside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(500);
    component.like();
    tick(500);
    expect(times).toBe(2);
  }));

  // teste do DOM
  it('Should display number of likes when (@Input likes) is incremented', () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
    expect(element.textContent.trim()).toBe('1');
  });

  // teste do DOM com acessibilidade
  it('Should update aria-label when (@Input likes) is incremented', () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it('Should have aria-label with value 0 (@Input likes)', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });

  it('Should display image with src and description when bound to properties', () => {
    const description = 'some description';
    const src = 'http://somesite.com/img.jpg';
    component.description = description;
    component.src = src;
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  });

});
