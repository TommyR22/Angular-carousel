import { Injectable, Component, ElementRef, EventEmitter, Output, Renderer2, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CarouselService {
    constructor() { }
}
CarouselService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
CarouselService.ctorParameters = () => [];
/** @nocollapse */ CarouselService.ngInjectableDef = defineInjectable({ factory: function CarouselService_Factory() { return new CarouselService(); }, token: CarouselService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CarouselComponent {
    /**
     * @param {?} elRef
     * @param {?} renderer
     */
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
        // for gesture
        this.start = {
            t: null,
            x: null,
            y: null
        };
        this.end = {
            x: null,
            y: null
        };
        this.tracking = false;
        this.thresholdTime = 500;
        this.thresholdDistance = 100;
        this.avatarSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // init avatar
        this.avatarSelected.emit(this.elRef.nativeElement.querySelector('.selected').childNodes[0].alt);
        // TODO implementare click su altri avatar e selezione in automatico
        // $('#carousel div').click(function() {
        //   moveToSelected($(this));
        // });
        // Swipe with PointerEvents
        // https://developers.google.com/web/fundamentals/design-and-ux/input/touch/
        const /** @type {?} */ o = this.elRef.nativeElement.querySelector('#carousel');
        this.renderer.listen(o, 'pointerdown', (event) => {
            this.gestureStart(o, event);
        });
        this.renderer.listen(o, 'pointermove', (event) => {
            this.gestureMove(o, event);
        });
        this.renderer.listen(o, 'pointerup', (event) => {
            this.gestureEnd(o, event);
        });
        this.renderer.listen(o, 'pointerleave', (event) => {
            this.gestureEnd(o, event);
        });
        this.renderer.listen(o, 'pointercancel', (event) => {
            this.gestureEnd(o, event);
        });
    }
    /**
     * @param {?} o
     * @param {?} e
     * @return {?}
     */
    gestureStart(o, e) {
        // o.innerHTML = '';
        this.tracking = true;
        /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
        this.start.t = new Date().getTime();
        this.start.x = e.clientX;
        this.start.y = e.clientY;
    }
    /**
     * @param {?} o
     * @param {?} e
     * @return {?}
     */
    gestureMove(o, e) {
        if (this.tracking) {
            e.preventDefault();
            this.end.x = e.clientX;
            this.end.y = e.clientY;
        }
    }
    /**
     * @param {?} o
     * @param {?} e
     * @return {?}
     */
    gestureEnd(o, e) {
        if (this.tracking) {
            this.tracking = false;
            const /** @type {?} */ now = new Date().getTime();
            const /** @type {?} */ deltaTime = now - this.start.t;
            const /** @type {?} */ deltaX = this.end.x - this.start.x;
            const /** @type {?} */ deltaY = this.end.y - this.start.y;
            /* work out what the movement was */
            if (deltaTime > this.thresholdTime) {
                /* gesture too slow */
                return;
            }
            else {
                if ((deltaX > this.thresholdDistance) && (Math.abs(deltaY) < this.thresholdDistance)) {
                    // o.innerHTML = 'swipe right';
                    this.moveToSelected('prev');
                }
                else if ((-deltaX > this.thresholdDistance) && (Math.abs(deltaY) < this.thresholdDistance)) {
                    // o.innerHTML = 'swipe left';
                    this.moveToSelected('next');
                }
                else if ((deltaY > this.thresholdDistance) && (Math.abs(deltaX) < this.thresholdDistance)) ;
                else if ((-deltaY > this.thresholdDistance) && (Math.abs(deltaX) < this.thresholdDistance)) ;
            }
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    moveToSelected(element) {
        if (element === 'next') {
            const /** @type {?} */ prev = this.elRef.nativeElement.querySelector('.selected');
            if (prev.nextElementSibling) {
                // if null, carousel is at the end of images(RX)
                const /** @type {?} */ curr = prev.nextElementSibling;
                this.avatarSelected.emit(curr.childNodes[0].alt);
                const /** @type {?} */ next = curr.nextElementSibling;
                let /** @type {?} */ prevSecond = null;
                let /** @type {?} */ nextSecond = null;
                let /** @type {?} */ nextThird = null;
                let /** @type {?} */ prevThird = null;
                if (next) {
                    nextSecond = next.nextElementSibling;
                }
                if (nextSecond) {
                    nextThird = nextSecond.nextElementSibling;
                }
                if (prev) {
                    prevSecond = prev.previousElementSibling;
                }
                if (prevSecond) {
                    prevThird = prevSecond.previousElementSibling;
                }
                this.renderer.removeClass(prev, 'selected');
                this.renderer.addClass(prev, 'prev');
                this.renderer.removeClass(curr, 'next');
                this.renderer.addClass(curr, 'selected');
                if (prevSecond) {
                    this.renderer.removeClass(prevSecond, 'prev');
                    this.renderer.addClass(prevSecond, 'prevLeftSecond');
                }
                if (prevThird) {
                    this.renderer.removeClass(prevThird, 'prevLeftSecond');
                    this.renderer.addClass(prevThird, 'hideLeft');
                }
                if (next) {
                    this.renderer.removeClass(next, 'nextRightSecond');
                    this.renderer.addClass(next, 'next');
                }
                if (nextSecond) {
                    this.renderer.removeClass(nextSecond, 'hideRight');
                    this.renderer.addClass(nextSecond, 'nextRightSecond');
                }
            }
        }
        else if (element === 'prev') {
            // selected = this.elRef.nativeElement.querySelector('.prev');
            const /** @type {?} */ next = this.elRef.nativeElement.querySelector('.selected');
            if (next.previousElementSibling) {
                // if null, carousel is at the end of images(SX)
                const /** @type {?} */ curr = next.previousElementSibling;
                this.avatarSelected.emit(curr.childNodes[0].alt);
                const /** @type {?} */ prev = curr.previousElementSibling;
                let /** @type {?} */ prevSecond = null;
                let /** @type {?} */ nextSecond = null;
                let /** @type {?} */ nextThird = null;
                let /** @type {?} */ prevThird = null;
                if (next) {
                    nextSecond = next.nextElementSibling;
                }
                if (nextSecond) {
                    nextThird = nextSecond.nextElementSibling;
                }
                if (prev) {
                    prevSecond = prev.previousElementSibling;
                }
                if (prevSecond) {
                    prevThird = prevSecond.previousElementSibling;
                }
                this.renderer.removeClass(next, 'selected');
                this.renderer.addClass(next, 'next');
                this.renderer.removeClass(curr, 'prev');
                this.renderer.addClass(curr, 'selected');
                if (nextSecond) {
                    this.renderer.removeClass(nextSecond, 'next');
                    this.renderer.addClass(nextSecond, 'nextRightSecond');
                }
                if (nextThird) {
                    this.renderer.removeClass(nextThird, 'nextRightSecond');
                    this.renderer.addClass(nextThird, 'hideRight');
                }
                if (prev) {
                    this.renderer.removeClass(prev, 'prevLeftSecond');
                    this.renderer.addClass(prev, 'prev');
                }
                if (prevSecond) {
                    this.renderer.removeClass(prevSecond, 'hideLeft');
                    this.renderer.addClass(prevSecond, 'prevLeftSecond');
                }
            }
        }
    }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'tr-carousel',
                template: `<div id="carousel">

  <div class="hideLeft">
    <img src="assets/avatars/1.svg" alt="avatar1">
  </div>

  <div class="hideLeft">
    <img src="assets/avatars/2.svg" alt="avatar2">
  </div>

  <div class="hideLeft">
    <img src="assets/avatars/3.svg" alt="avatar3">
  </div>

  <div class="hideLeft">
    <img src="assets/avatars/4.svg" alt="avatar4">
  </div>

  <div class="hideLeft">
    <img src="assets/avatars/5.svg" alt="avatar5">
  </div>

  <div class="prevLeftSecond">
    <img src="assets/avatars/6.svg" alt="avatar6">
  </div>

  <div class="prev">
    <img src="assets/avatars/7.svg" alt="avatar7">
  </div>

  <div class="selected">
    <img src="assets/avatars/8.svg" alt="avatar8">
  </div>

  <div class="next">
    <img src="assets/avatars/9.svg" alt="avatar9">
  </div>

  <div class="nextRightSecond">
    <img src="assets/avatars/10.svg" alt="avatar10">
  </div>

  <div class="hideRight">
    <img src="assets/avatars/11.svg" alt="avatar11">
  </div>

  <div class="hideRight">
    <img src="assets/avatars/12.svg" alt="avatar12">
  </div>

  <div class="hideRight">
    <img src="assets/avatars/13.svg" alt="avatar13">
  </div>

  <div class="hideRight">
    <img src="assets/avatars/14.svg" alt="avatar14">
  </div>

  <div class="hideRight">
    <img src="assets/avatars/15.svg" alt="avatar15">
  </div>

  <div class="hideRight">
    <img src="assets/avatars/16.svg" alt="avatar16">
  </div>

</div>

<!--<div class="buttons">-->
<!--<button id="prev" (click)="moveToSelected('prev')">Prev</button>-->
<!--<button id="next" (click)="moveToSelected('next')">Next</button>-->
<!--</div>-->
`,
                styles: [`#carousel{height:400px;overflow:hidden}#carousel div{position:absolute;transition:left 1s,opacity 1s,z-index 0s,-webkit-transform 1s;transition:transform 1s,left 1s,opacity 1s,z-index 0s;transition:transform 1s,left 1s,opacity 1s,z-index 0s,-webkit-transform 1s;opacity:1}#carousel div img{width:400px;transition:width 1s}#carousel div.hideLeft{left:30%;opacity:0;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%)}#carousel div.hideLeft img{width:200px}#carousel div.hideRight{left:70%;opacity:0;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%)}#carousel div.hideRight img{width:200px}#carousel div.prev{z-index:5;left:30%;-webkit-transform:translateY(50px) translateX(-50%);transform:translateY(50px) translateX(-50%);opacity:.7}#carousel div.prev img{width:300px}#carousel div.prevLeftSecond{z-index:4;left:15%;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%);opacity:.5}#carousel div.prevLeftSecond img{width:200px}#carousel div.selected{z-index:10;left:50%;-webkit-transform:translateY(0) translateX(-50%);transform:translateY(0) translateX(-50%)}#carousel div.next{z-index:5;left:70%;-webkit-transform:translateY(50px) translateX(-50%);transform:translateY(50px) translateX(-50%);opacity:.7}#carousel div.next img{width:300px}#carousel div.nextRightSecond{z-index:4;left:85%;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%);opacity:.5}#carousel div.nextRightSecond img{width:200px}.buttons{position:fixed;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:10px}@media screen and (max-width:665px){#carousel div.next img,#carousel div.prev img{width:250px}#carousel div.hideLeft img,#carousel div.hideRight img,#carousel div.nextRightSecond img,#carousel div.prevLeftSecond img{width:150px}#carousel div img{width:350px}}@media screen and (max-width:500px){#carousel div.next img,#carousel div.prev img{width:200px}#carousel div.hideLeft img,#carousel div.hideRight img,#carousel div.nextRightSecond img,#carousel div.prevLeftSecond img{width:100px}#carousel div img{width:300px}}`]
            },] },
];
/** @nocollapse */
CarouselComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
CarouselComponent.propDecorators = {
    avatarSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CarouselModule {
}
CarouselModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [CarouselComponent],
                exports: [CarouselComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { CarouselService, CarouselComponent, CarouselModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMubWFwIiwic291cmNlcyI6WyJuZzovL2Nhcm91c2VsL2xpYi9jYXJvdXNlbC5zZXJ2aWNlLnRzIiwibmc6Ly9jYXJvdXNlbC9saWIvY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibmc6Ly9jYXJvdXNlbC9saWIvY2Fyb3VzZWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RyLWNhcm91c2VsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGlkPVwiY2Fyb3VzZWxcIj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVMZWZ0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzEuc3ZnXCIgYWx0PVwiYXZhdGFyMVwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZUxlZnRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMi5zdmdcIiBhbHQ9XCJhdmF0YXIyXCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlTGVmdFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8zLnN2Z1wiIGFsdD1cImF2YXRhcjNcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVMZWZ0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzQuc3ZnXCIgYWx0PVwiYXZhdGFyNFwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZUxlZnRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvNS5zdmdcIiBhbHQ9XCJhdmF0YXI1XCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJwcmV2TGVmdFNlY29uZFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy82LnN2Z1wiIGFsdD1cImF2YXRhcjZcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInByZXZcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvNy5zdmdcIiBhbHQ9XCJhdmF0YXI3XCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJzZWxlY3RlZFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy84LnN2Z1wiIGFsdD1cImF2YXRhcjhcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cIm5leHRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvOS5zdmdcIiBhbHQ9XCJhdmF0YXI5XCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJuZXh0UmlnaHRTZWNvbmRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMTAuc3ZnXCIgYWx0PVwiYXZhdGFyMTBcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVSaWdodFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8xMS5zdmdcIiBhbHQ9XCJhdmF0YXIxMVwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZVJpZ2h0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzEyLnN2Z1wiIGFsdD1cImF2YXRhcjEyXCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlUmlnaHRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMTMuc3ZnXCIgYWx0PVwiYXZhdGFyMTNcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVSaWdodFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8xNC5zdmdcIiBhbHQ9XCJhdmF0YXIxNFwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZVJpZ2h0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzE1LnN2Z1wiIGFsdD1cImF2YXRhcjE1XCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlUmlnaHRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMTYuc3ZnXCIgYWx0PVwiYXZhdGFyMTZcIj5cclxuICA8L2Rpdj5cclxuXHJcbjwvZGl2PlxyXG5cclxuPCEtLTxkaXYgY2xhc3M9XCJidXR0b25zXCI+LS0+XHJcbjwhLS08YnV0dG9uIGlkPVwicHJldlwiIChjbGljayk9XCJtb3ZlVG9TZWxlY3RlZCgncHJldicpXCI+UHJldjwvYnV0dG9uPi0tPlxyXG48IS0tPGJ1dHRvbiBpZD1cIm5leHRcIiAoY2xpY2spPVwibW92ZVRvU2VsZWN0ZWQoJ25leHQnKVwiPk5leHQ8L2J1dHRvbj4tLT5cclxuPCEtLTwvZGl2Pi0tPlxyXG5gLFxuICBzdHlsZXM6IFtgI2Nhcm91c2Vse2hlaWdodDo0MDBweDtvdmVyZmxvdzpoaWRkZW59I2Nhcm91c2VsIGRpdntwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2l0aW9uOmxlZnQgMXMsb3BhY2l0eSAxcyx6LWluZGV4IDBzLC13ZWJraXQtdHJhbnNmb3JtIDFzO3RyYW5zaXRpb246dHJhbnNmb3JtIDFzLGxlZnQgMXMsb3BhY2l0eSAxcyx6LWluZGV4IDBzO3RyYW5zaXRpb246dHJhbnNmb3JtIDFzLGxlZnQgMXMsb3BhY2l0eSAxcyx6LWluZGV4IDBzLC13ZWJraXQtdHJhbnNmb3JtIDFzO29wYWNpdHk6MX0jY2Fyb3VzZWwgZGl2IGltZ3t3aWR0aDo0MDBweDt0cmFuc2l0aW9uOndpZHRoIDFzfSNjYXJvdXNlbCBkaXYuaGlkZUxlZnR7bGVmdDozMCU7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTAlKSB0cmFuc2xhdGVYKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKX0jY2Fyb3VzZWwgZGl2LmhpZGVMZWZ0IGltZ3t3aWR0aDoyMDBweH0jY2Fyb3VzZWwgZGl2LmhpZGVSaWdodHtsZWZ0OjcwJTtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSg1MCUpIHRyYW5zbGF0ZVgoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTAlKSB0cmFuc2xhdGVYKC01MCUpfSNjYXJvdXNlbCBkaXYuaGlkZVJpZ2h0IGltZ3t3aWR0aDoyMDBweH0jY2Fyb3VzZWwgZGl2LnByZXZ7ei1pbmRleDo1O2xlZnQ6MzAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTBweCkgdHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSg1MHB4KSB0cmFuc2xhdGVYKC01MCUpO29wYWNpdHk6Ljd9I2Nhcm91c2VsIGRpdi5wcmV2IGltZ3t3aWR0aDozMDBweH0jY2Fyb3VzZWwgZGl2LnByZXZMZWZ0U2Vjb25ke3otaW5kZXg6NDtsZWZ0OjE1JTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSg1MCUpIHRyYW5zbGF0ZVgoLTUwJSk7b3BhY2l0eTouNX0jY2Fyb3VzZWwgZGl2LnByZXZMZWZ0U2Vjb25kIGltZ3t3aWR0aDoyMDBweH0jY2Fyb3VzZWwgZGl2LnNlbGVjdGVke3otaW5kZXg6MTA7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgwKSB0cmFuc2xhdGVYKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDApIHRyYW5zbGF0ZVgoLTUwJSl9I2Nhcm91c2VsIGRpdi5uZXh0e3otaW5kZXg6NTtsZWZ0OjcwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDUwcHgpIHRyYW5zbGF0ZVgoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTBweCkgdHJhbnNsYXRlWCgtNTAlKTtvcGFjaXR5Oi43fSNjYXJvdXNlbCBkaXYubmV4dCBpbWd7d2lkdGg6MzAwcHh9I2Nhcm91c2VsIGRpdi5uZXh0UmlnaHRTZWNvbmR7ei1pbmRleDo0O2xlZnQ6ODUlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTAlKSB0cmFuc2xhdGVYKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKTtvcGFjaXR5Oi41fSNjYXJvdXNlbCBkaXYubmV4dFJpZ2h0U2Vjb25kIGltZ3t3aWR0aDoyMDBweH0uYnV0dG9uc3twb3NpdGlvbjpmaXhlZDtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpO2JvdHRvbToxMHB4fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NjY1cHgpeyNjYXJvdXNlbCBkaXYubmV4dCBpbWcsI2Nhcm91c2VsIGRpdi5wcmV2IGltZ3t3aWR0aDoyNTBweH0jY2Fyb3VzZWwgZGl2LmhpZGVMZWZ0IGltZywjY2Fyb3VzZWwgZGl2LmhpZGVSaWdodCBpbWcsI2Nhcm91c2VsIGRpdi5uZXh0UmlnaHRTZWNvbmQgaW1nLCNjYXJvdXNlbCBkaXYucHJldkxlZnRTZWNvbmQgaW1ne3dpZHRoOjE1MHB4fSNjYXJvdXNlbCBkaXYgaW1ne3dpZHRoOjM1MHB4fX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjUwMHB4KXsjY2Fyb3VzZWwgZGl2Lm5leHQgaW1nLCNjYXJvdXNlbCBkaXYucHJldiBpbWd7d2lkdGg6MjAwcHh9I2Nhcm91c2VsIGRpdi5oaWRlTGVmdCBpbWcsI2Nhcm91c2VsIGRpdi5oaWRlUmlnaHQgaW1nLCNjYXJvdXNlbCBkaXYubmV4dFJpZ2h0U2Vjb25kIGltZywjY2Fyb3VzZWwgZGl2LnByZXZMZWZ0U2Vjb25kIGltZ3t3aWR0aDoxMDBweH0jY2Fyb3VzZWwgZGl2IGltZ3t3aWR0aDozMDBweH19YF1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBPdXRwdXQoKSBhdmF0YXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPHN0cmluZz47XG5cbiAgLy8gZm9yIGdlc3R1cmVcbiAgc3RhcnQgPSB7XG4gICAgdDogbnVsbCxcbiAgICB4OiBudWxsLFxuICAgIHk6IG51bGxcbiAgfTtcbiAgZW5kID0ge1xuICAgIHg6IG51bGwsXG4gICAgeTogbnVsbFxuICB9O1xuICB0cmFja2luZyA9IGZhbHNlO1xuICB0aHJlc2hvbGRUaW1lID0gNTAwO1xuICB0aHJlc2hvbGREaXN0YW5jZSA9IDEwMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmF2YXRhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gaW5pdCBhdmF0YXJcbiAgICB0aGlzLmF2YXRhclNlbGVjdGVkLmVtaXQodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpLmNoaWxkTm9kZXNbMF0uYWx0KTtcblxuICAgIC8vIFRPRE8gaW1wbGVtZW50YXJlIGNsaWNrIHN1IGFsdHJpIGF2YXRhciBlIHNlbGV6aW9uZSBpbiBhdXRvbWF0aWNvXG4gICAgLy8gJCgnI2Nhcm91c2VsIGRpdicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIC8vICAgbW92ZVRvU2VsZWN0ZWQoJCh0aGlzKSk7XG4gICAgLy8gfSk7XG5cbiAgICAvLyBTd2lwZSB3aXRoIFBvaW50ZXJFdmVudHNcbiAgICAvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvZnVuZGFtZW50YWxzL2Rlc2lnbi1hbmQtdXgvaW5wdXQvdG91Y2gvXG4gICAgY29uc3QgbyA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjY2Fyb3VzZWwnKTtcblxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG8sICdwb2ludGVyZG93bicsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5nZXN0dXJlU3RhcnQobywgZXZlbnQpO1xuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG8sICdwb2ludGVybW92ZScsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5nZXN0dXJlTW92ZShvLCBldmVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4obywgJ3BvaW50ZXJ1cCcsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5nZXN0dXJlRW5kKG8sIGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvLCAncG9pbnRlcmxlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmdlc3R1cmVFbmQobywgZXZlbnQpO1xuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG8sICdwb2ludGVyY2FuY2VsJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmdlc3R1cmVFbmQobywgZXZlbnQpO1xuICAgIH0pO1xuXG4gIH1cblxuICBnZXN0dXJlU3RhcnQgKG8sIGUpIHtcbiAgICAvLyBvLmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMudHJhY2tpbmcgPSB0cnVlO1xuICAgIC8qIEhhY2sgLSB3b3VsZCBub3JtYWxseSB1c2UgZS50aW1lU3RhbXAgYnV0IGl0J3Mgd2hhY2sgaW4gRngvQW5kcm9pZCAqL1xuICAgIHRoaXMuc3RhcnQudCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMuc3RhcnQueCA9IGUuY2xpZW50WDtcbiAgICB0aGlzLnN0YXJ0LnkgPSBlLmNsaWVudFk7XG4gIH1cbiAgZ2VzdHVyZU1vdmUobywgZSkge1xuICAgIGlmICh0aGlzLnRyYWNraW5nKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmVuZC54ID0gZS5jbGllbnRYO1xuICAgICAgdGhpcy5lbmQueSA9IGUuY2xpZW50WTtcbiAgICB9XG4gIH1cbiAgZ2VzdHVyZUVuZCAobywgZSkge1xuICAgIGlmICh0aGlzLnRyYWNraW5nKSB7XG4gICAgICB0aGlzLnRyYWNraW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGNvbnN0IGRlbHRhVGltZSA9IG5vdyAtIHRoaXMuc3RhcnQudDtcbiAgICAgIGNvbnN0IGRlbHRhWCA9IHRoaXMuZW5kLnggLSB0aGlzLnN0YXJ0Lng7XG4gICAgICBjb25zdCBkZWx0YVkgPSB0aGlzLmVuZC55IC0gdGhpcy5zdGFydC55O1xuICAgICAgLyogd29yayBvdXQgd2hhdCB0aGUgbW92ZW1lbnQgd2FzICovXG4gICAgICBpZiAoZGVsdGFUaW1lID4gdGhpcy50aHJlc2hvbGRUaW1lKSB7XG4gICAgICAgIC8qIGdlc3R1cmUgdG9vIHNsb3cgKi9cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKChkZWx0YVggPiB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSAmJiAoTWF0aC5hYnMoZGVsdGFZKSA8IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpKSB7XG4gICAgICAgICAgLy8gby5pbm5lckhUTUwgPSAnc3dpcGUgcmlnaHQnO1xuICAgICAgICAgIHRoaXMubW92ZVRvU2VsZWN0ZWQoJ3ByZXYnKTtcbiAgICAgICAgfSBlbHNlIGlmICgoLWRlbHRhWCA+IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpICYmIChNYXRoLmFicyhkZWx0YVkpIDwgdGhpcy50aHJlc2hvbGREaXN0YW5jZSkpIHtcbiAgICAgICAgICAvLyBvLmlubmVySFRNTCA9ICdzd2lwZSBsZWZ0JztcbiAgICAgICAgICB0aGlzLm1vdmVUb1NlbGVjdGVkKCduZXh0Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGRlbHRhWSA+IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpICYmIChNYXRoLmFicyhkZWx0YVgpIDwgdGhpcy50aHJlc2hvbGREaXN0YW5jZSkpIHtcbiAgICAgICAgICAvLyBvLmlubmVySFRNTCA9ICdzd2lwZSBkb3duJztcbiAgICAgICAgfSBlbHNlIGlmICgoLWRlbHRhWSA+IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpICYmIChNYXRoLmFicyhkZWx0YVgpIDwgdGhpcy50aHJlc2hvbGREaXN0YW5jZSkpIHtcbiAgICAgICAgICAvLyBvLmlubmVySFRNTCA9ICdzd2lwZSB1cCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gby5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVUb1NlbGVjdGVkKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCA9PT0gJ25leHQnKSB7XG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xuICAgICAgaWYgKHByZXYubmV4dEVsZW1lbnRTaWJsaW5nKSB7ICAvLyBpZiBudWxsLCBjYXJvdXNlbCBpcyBhdCB0aGUgZW5kIG9mIGltYWdlcyhSWClcbiAgICAgICAgY29uc3QgY3VyciA9IHByZXYubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLmF2YXRhclNlbGVjdGVkLmVtaXQoY3Vyci5jaGlsZE5vZGVzWzBdLmFsdCk7XG4gICAgICAgIGNvbnN0IG5leHQgPSBjdXJyLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgbGV0IHByZXZTZWNvbmQgPSBudWxsO1xuICAgICAgICBsZXQgbmV4dFNlY29uZCA9IG51bGw7XG4gICAgICAgIGxldCBuZXh0VGhpcmQgPSBudWxsO1xuICAgICAgICBsZXQgcHJldlRoaXJkID0gbnVsbDtcbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICBuZXh0U2Vjb25kID0gbmV4dC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRTZWNvbmQpIHtcbiAgICAgICAgICBuZXh0VGhpcmQgPSBuZXh0U2Vjb25kLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgIHByZXZTZWNvbmQgPSBwcmV2LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZTZWNvbmQpIHtcbiAgICAgICAgICBwcmV2VGhpcmQgPSBwcmV2U2Vjb25kLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhwcmV2LCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmV2LCAncHJldicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGN1cnIsICduZXh0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY3VyciwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIGlmIChwcmV2U2Vjb25kKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhwcmV2U2Vjb25kLCAncHJldicpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJldlNlY29uZCwgJ3ByZXZMZWZ0U2Vjb25kJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZUaGlyZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldlRoaXJkLCAncHJldkxlZnRTZWNvbmQnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByZXZUaGlyZCwgJ2hpZGVMZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKG5leHQsICduZXh0UmlnaHRTZWNvbmQnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5leHQsICduZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRTZWNvbmQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKG5leHRTZWNvbmQsICdoaWRlUmlnaHQnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5leHRTZWNvbmQsICduZXh0UmlnaHRTZWNvbmQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gJ3ByZXYnKSB7XG4gICAgICAvLyBzZWxlY3RlZCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldicpO1xuICAgICAgY29uc3QgbmV4dCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcbiAgICAgIGlmIChuZXh0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHsgIC8vIGlmIG51bGwsIGNhcm91c2VsIGlzIGF0IHRoZSBlbmQgb2YgaW1hZ2VzKFNYKVxuICAgICAgICBjb25zdCBjdXJyID0gbmV4dC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLmF2YXRhclNlbGVjdGVkLmVtaXQoY3Vyci5jaGlsZE5vZGVzWzBdLmFsdCk7XG4gICAgICAgIGNvbnN0IHByZXYgPSBjdXJyLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGxldCBwcmV2U2Vjb25kID0gbnVsbDtcbiAgICAgICAgbGV0IG5leHRTZWNvbmQgPSBudWxsO1xuICAgICAgICBsZXQgbmV4dFRoaXJkID0gbnVsbDtcbiAgICAgICAgbGV0IHByZXZUaGlyZCA9IG51bGw7XG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgbmV4dFNlY29uZCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0U2Vjb25kKSB7XG4gICAgICAgICAgbmV4dFRoaXJkID0gbmV4dFNlY29uZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICBwcmV2U2Vjb25kID0gcHJldi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2U2Vjb25kKSB7XG4gICAgICAgICAgcHJldlRoaXJkID0gcHJldlNlY29uZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MobmV4dCwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobmV4dCwgJ25leHQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhjdXJyLCAncHJldicpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGN1cnIsICdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAobmV4dFNlY29uZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MobmV4dFNlY29uZCwgJ25leHQnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5leHRTZWNvbmQsICduZXh0UmlnaHRTZWNvbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dFRoaXJkKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhuZXh0VGhpcmQsICduZXh0UmlnaHRTZWNvbmQnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5leHRUaGlyZCwgJ2hpZGVSaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhwcmV2LCAncHJldkxlZnRTZWNvbmQnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByZXYsICdwcmV2Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZTZWNvbmQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHByZXZTZWNvbmQsICdoaWRlTGVmdCcpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJldlNlY29uZCwgJ3ByZXZMZWZ0U2Vjb25kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETyBpbXBsZW1lbnRhcmUgY2xpY2sgc3UgYWx0cmkgYXZhdGFyIGUgc2VsZXppb25lIGluIGF1dG9tYXRpY29cbiAgICAgIC8vIHNlbGVjdGVkID0gZWxlbWVudDtcbiAgICAgIC8vIHNlbGVjdGVkID0gdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCgnLnNlbGVjdGVkJyk7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Nhcm91c2VsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0Nhcm91c2VsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtJQU9FLGlCQUFpQjs7O1lBTGxCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztBQ0pEOzs7OztJQWlHRSxZQUFvQixLQUFpQixF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