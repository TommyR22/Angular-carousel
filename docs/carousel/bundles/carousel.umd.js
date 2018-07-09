(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('carousel', ['exports', '@angular/core'], factory) :
    (factory((global.carousel = {}),global.ng.core));
}(this, (function (exports,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CarouselService = (function () {
        function CarouselService() {
        }
        CarouselService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        CarouselService.ctorParameters = function () { return []; };
        /** @nocollapse */ CarouselService.ngInjectableDef = i0.defineInjectable({ factory: function CarouselService_Factory() { return new CarouselService(); }, token: CarouselService, providedIn: "root" });
        return CarouselService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CarouselComponent = (function () {
        function CarouselComponent(elRef, renderer) {
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
            this.avatarSelected = new i0.EventEmitter();
        }
        /**
         * @return {?}
         */
        CarouselComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // init avatar
                this.avatarSelected.emit(this.elRef.nativeElement.querySelector('.selected').childNodes[0].alt);
                // TODO implementare click su altri avatar e selezione in automatico
                // $('#carousel div').click(function() {
                //   moveToSelected($(this));
                // });
                // Swipe with PointerEvents
                // https://developers.google.com/web/fundamentals/design-and-ux/input/touch/
                var /** @type {?} */ o = this.elRef.nativeElement.querySelector('#carousel');
                this.renderer.listen(o, 'pointerdown', function (event) {
                    _this.gestureStart(o, event);
                });
                this.renderer.listen(o, 'pointermove', function (event) {
                    _this.gestureMove(o, event);
                });
                this.renderer.listen(o, 'pointerup', function (event) {
                    _this.gestureEnd(o, event);
                });
                this.renderer.listen(o, 'pointerleave', function (event) {
                    _this.gestureEnd(o, event);
                });
                this.renderer.listen(o, 'pointercancel', function (event) {
                    _this.gestureEnd(o, event);
                });
            };
        /**
         * @param {?} o
         * @param {?} e
         * @return {?}
         */
        CarouselComponent.prototype.gestureStart = /**
         * @param {?} o
         * @param {?} e
         * @return {?}
         */
            function (o, e) {
                // o.innerHTML = '';
                this.tracking = true;
                /* Hack - would normally use e.timeStamp but it's whack in Fx/Android */
                this.start.t = new Date().getTime();
                this.start.x = e.clientX;
                this.start.y = e.clientY;
            };
        /**
         * @param {?} o
         * @param {?} e
         * @return {?}
         */
        CarouselComponent.prototype.gestureMove = /**
         * @param {?} o
         * @param {?} e
         * @return {?}
         */
            function (o, e) {
                if (this.tracking) {
                    e.preventDefault();
                    this.end.x = e.clientX;
                    this.end.y = e.clientY;
                }
            };
        /**
         * @param {?} o
         * @param {?} e
         * @return {?}
         */
        CarouselComponent.prototype.gestureEnd = /**
         * @param {?} o
         * @param {?} e
         * @return {?}
         */
            function (o, e) {
                if (this.tracking) {
                    this.tracking = false;
                    var /** @type {?} */ now = new Date().getTime();
                    var /** @type {?} */ deltaTime = now - this.start.t;
                    var /** @type {?} */ deltaX = this.end.x - this.start.x;
                    var /** @type {?} */ deltaY = this.end.y - this.start.y;
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
            };
        /**
         * @param {?} element
         * @return {?}
         */
        CarouselComponent.prototype.moveToSelected = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                if (element === 'next') {
                    var /** @type {?} */ prev = this.elRef.nativeElement.querySelector('.selected');
                    if (prev.nextElementSibling) {
                        // if null, carousel is at the end of images(RX)
                        var /** @type {?} */ curr = prev.nextElementSibling;
                        this.avatarSelected.emit(curr.childNodes[0].alt);
                        var /** @type {?} */ next = curr.nextElementSibling;
                        var /** @type {?} */ prevSecond = null;
                        var /** @type {?} */ nextSecond = null;
                        var /** @type {?} */ nextThird = null;
                        var /** @type {?} */ prevThird = null;
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
                    var /** @type {?} */ next = this.elRef.nativeElement.querySelector('.selected');
                    if (next.previousElementSibling) {
                        // if null, carousel is at the end of images(SX)
                        var /** @type {?} */ curr = next.previousElementSibling;
                        this.avatarSelected.emit(curr.childNodes[0].alt);
                        var /** @type {?} */ prev = curr.previousElementSibling;
                        var /** @type {?} */ prevSecond = null;
                        var /** @type {?} */ nextSecond = null;
                        var /** @type {?} */ nextThird = null;
                        var /** @type {?} */ prevThird = null;
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
            };
        CarouselComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'tr-carousel',
                        template: "<div id=\"carousel\">\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/1.svg\" alt=\"avatar1\">\n  </div>\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/2.svg\" alt=\"avatar2\">\n  </div>\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/3.svg\" alt=\"avatar3\">\n  </div>\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/4.svg\" alt=\"avatar4\">\n  </div>\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/5.svg\" alt=\"avatar5\">\n  </div>\n\n  <div class=\"prevLeftSecond\">\n    <img src=\"assets/avatars/6.svg\" alt=\"avatar6\">\n  </div>\n\n  <div class=\"prev\">\n    <img src=\"assets/avatars/7.svg\" alt=\"avatar7\">\n  </div>\n\n  <div class=\"selected\">\n    <img src=\"assets/avatars/8.svg\" alt=\"avatar8\">\n  </div>\n\n  <div class=\"next\">\n    <img src=\"assets/avatars/9.svg\" alt=\"avatar9\">\n  </div>\n\n  <div class=\"nextRightSecond\">\n    <img src=\"assets/avatars/10.svg\" alt=\"avatar10\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/11.svg\" alt=\"avatar11\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/12.svg\" alt=\"avatar12\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/13.svg\" alt=\"avatar13\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/14.svg\" alt=\"avatar14\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/15.svg\" alt=\"avatar15\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/16.svg\" alt=\"avatar16\">\n  </div>\n\n</div>\n\n<!--<div class=\"buttons\">-->\n<!--<button id=\"prev\" (click)=\"moveToSelected('prev')\">Prev</button>-->\n<!--<button id=\"next\" (click)=\"moveToSelected('next')\">Next</button>-->\n<!--</div>-->\n",
                        styles: ["#carousel{height:400px;overflow:hidden}#carousel div{position:absolute;transition:left 1s,opacity 1s,z-index 0s,-webkit-transform 1s;transition:transform 1s,left 1s,opacity 1s,z-index 0s;transition:transform 1s,left 1s,opacity 1s,z-index 0s,-webkit-transform 1s;opacity:1}#carousel div img{width:400px;transition:width 1s}#carousel div.hideLeft{left:30%;opacity:0;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%)}#carousel div.hideLeft img{width:200px}#carousel div.hideRight{left:70%;opacity:0;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%)}#carousel div.hideRight img{width:200px}#carousel div.prev{z-index:5;left:30%;-webkit-transform:translateY(50px) translateX(-50%);transform:translateY(50px) translateX(-50%);opacity:.7}#carousel div.prev img{width:300px}#carousel div.prevLeftSecond{z-index:4;left:15%;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%);opacity:.5}#carousel div.prevLeftSecond img{width:200px}#carousel div.selected{z-index:10;left:50%;-webkit-transform:translateY(0) translateX(-50%);transform:translateY(0) translateX(-50%)}#carousel div.next{z-index:5;left:70%;-webkit-transform:translateY(50px) translateX(-50%);transform:translateY(50px) translateX(-50%);opacity:.7}#carousel div.next img{width:300px}#carousel div.nextRightSecond{z-index:4;left:85%;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%);opacity:.5}#carousel div.nextRightSecond img{width:200px}.buttons{position:fixed;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:10px}@media screen and (max-width:665px){#carousel div.next img,#carousel div.prev img{width:250px}#carousel div.hideLeft img,#carousel div.hideRight img,#carousel div.nextRightSecond img,#carousel div.prevLeftSecond img{width:150px}#carousel div img{width:350px}}@media screen and (max-width:500px){#carousel div.next img,#carousel div.prev img{width:200px}#carousel div.hideLeft img,#carousel div.hideRight img,#carousel div.nextRightSecond img,#carousel div.prevLeftSecond img{width:100px}#carousel div img{width:300px}}"]
                    },] },
        ];
        /** @nocollapse */
        CarouselComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: i0.Renderer2 }
            ];
        };
        CarouselComponent.propDecorators = {
            avatarSelected: [{ type: i0.Output }]
        };
        return CarouselComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CarouselModule = (function () {
        function CarouselModule() {
        }
        CarouselModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [CarouselComponent],
                        exports: [CarouselComponent]
                    },] },
        ];
        return CarouselModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.CarouselService = CarouselService;
    exports.CarouselComponent = CarouselComponent;
    exports.CarouselModule = CarouselModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9jYXJvdXNlbC9saWIvY2Fyb3VzZWwuc2VydmljZS50cyIsIm5nOi8vY2Fyb3VzZWwvbGliL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vY2Fyb3VzZWwvbGliL2Nhcm91c2VsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ci1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBpZD1cImNhcm91c2VsXCI+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlTGVmdFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8xLnN2Z1wiIGFsdD1cImF2YXRhcjFcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVMZWZ0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzIuc3ZnXCIgYWx0PVwiYXZhdGFyMlwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZUxlZnRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMy5zdmdcIiBhbHQ9XCJhdmF0YXIzXCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlTGVmdFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy80LnN2Z1wiIGFsdD1cImF2YXRhcjRcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVMZWZ0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzUuc3ZnXCIgYWx0PVwiYXZhdGFyNVwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicHJldkxlZnRTZWNvbmRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvNi5zdmdcIiBhbHQ9XCJhdmF0YXI2XCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJwcmV2XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzcuc3ZnXCIgYWx0PVwiYXZhdGFyN1wiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0ZWRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvOC5zdmdcIiBhbHQ9XCJhdmF0YXI4XCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJuZXh0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzkuc3ZnXCIgYWx0PVwiYXZhdGFyOVwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwibmV4dFJpZ2h0U2Vjb25kXCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzEwLnN2Z1wiIGFsdD1cImF2YXRhcjEwXCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlUmlnaHRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMTEuc3ZnXCIgYWx0PVwiYXZhdGFyMTFcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVSaWdodFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8xMi5zdmdcIiBhbHQ9XCJhdmF0YXIxMlwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZVJpZ2h0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzEzLnN2Z1wiIGFsdD1cImF2YXRhcjEzXCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlUmlnaHRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMTQuc3ZnXCIgYWx0PVwiYXZhdGFyMTRcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVSaWdodFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8xNS5zdmdcIiBhbHQ9XCJhdmF0YXIxNVwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZVJpZ2h0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzE2LnN2Z1wiIGFsdD1cImF2YXRhcjE2XCI+XHJcbiAgPC9kaXY+XHJcblxyXG48L2Rpdj5cclxuXHJcbjwhLS08ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPi0tPlxyXG48IS0tPGJ1dHRvbiBpZD1cInByZXZcIiAoY2xpY2spPVwibW92ZVRvU2VsZWN0ZWQoJ3ByZXYnKVwiPlByZXY8L2J1dHRvbj4tLT5cclxuPCEtLTxidXR0b24gaWQ9XCJuZXh0XCIgKGNsaWNrKT1cIm1vdmVUb1NlbGVjdGVkKCduZXh0JylcIj5OZXh0PC9idXR0b24+LS0+XHJcbjwhLS08L2Rpdj4tLT5cclxuYCxcbiAgc3R5bGVzOiBbYCNjYXJvdXNlbHtoZWlnaHQ6NDAwcHg7b3ZlcmZsb3c6aGlkZGVufSNjYXJvdXNlbCBkaXZ7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNpdGlvbjpsZWZ0IDFzLG9wYWNpdHkgMXMsei1pbmRleCAwcywtd2Via2l0LXRyYW5zZm9ybSAxczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAxcyxsZWZ0IDFzLG9wYWNpdHkgMXMsei1pbmRleCAwczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAxcyxsZWZ0IDFzLG9wYWNpdHkgMXMsei1pbmRleCAwcywtd2Via2l0LXRyYW5zZm9ybSAxcztvcGFjaXR5OjF9I2Nhcm91c2VsIGRpdiBpbWd7d2lkdGg6NDAwcHg7dHJhbnNpdGlvbjp3aWR0aCAxc30jY2Fyb3VzZWwgZGl2LmhpZGVMZWZ0e2xlZnQ6MzAlO29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSg1MCUpIHRyYW5zbGF0ZVgoLTUwJSl9I2Nhcm91c2VsIGRpdi5oaWRlTGVmdCBpbWd7d2lkdGg6MjAwcHh9I2Nhcm91c2VsIGRpdi5oaWRlUmlnaHR7bGVmdDo3MCU7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTAlKSB0cmFuc2xhdGVYKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKX0jY2Fyb3VzZWwgZGl2LmhpZGVSaWdodCBpbWd7d2lkdGg6MjAwcHh9I2Nhcm91c2VsIGRpdi5wcmV2e3otaW5kZXg6NTtsZWZ0OjMwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDUwcHgpIHRyYW5zbGF0ZVgoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTBweCkgdHJhbnNsYXRlWCgtNTAlKTtvcGFjaXR5Oi43fSNjYXJvdXNlbCBkaXYucHJldiBpbWd7d2lkdGg6MzAwcHh9I2Nhcm91c2VsIGRpdi5wcmV2TGVmdFNlY29uZHt6LWluZGV4OjQ7bGVmdDoxNSU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSg1MCUpIHRyYW5zbGF0ZVgoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTAlKSB0cmFuc2xhdGVYKC01MCUpO29wYWNpdHk6LjV9I2Nhcm91c2VsIGRpdi5wcmV2TGVmdFNlY29uZCBpbWd7d2lkdGg6MjAwcHh9I2Nhcm91c2VsIGRpdi5zZWxlY3RlZHt6LWluZGV4OjEwO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCkgdHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgwKSB0cmFuc2xhdGVYKC01MCUpfSNjYXJvdXNlbCBkaXYubmV4dHt6LWluZGV4OjU7bGVmdDo3MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSg1MHB4KSB0cmFuc2xhdGVYKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDUwcHgpIHRyYW5zbGF0ZVgoLTUwJSk7b3BhY2l0eTouN30jY2Fyb3VzZWwgZGl2Lm5leHQgaW1ne3dpZHRoOjMwMHB4fSNjYXJvdXNlbCBkaXYubmV4dFJpZ2h0U2Vjb25ke3otaW5kZXg6NDtsZWZ0Ojg1JTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSg1MCUpIHRyYW5zbGF0ZVgoLTUwJSk7b3BhY2l0eTouNX0jY2Fyb3VzZWwgZGl2Lm5leHRSaWdodFNlY29uZCBpbWd7d2lkdGg6MjAwcHh9LmJ1dHRvbnN7cG9zaXRpb246Zml4ZWQ7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKTtib3R0b206MTBweH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjY2NXB4KXsjY2Fyb3VzZWwgZGl2Lm5leHQgaW1nLCNjYXJvdXNlbCBkaXYucHJldiBpbWd7d2lkdGg6MjUwcHh9I2Nhcm91c2VsIGRpdi5oaWRlTGVmdCBpbWcsI2Nhcm91c2VsIGRpdi5oaWRlUmlnaHQgaW1nLCNjYXJvdXNlbCBkaXYubmV4dFJpZ2h0U2Vjb25kIGltZywjY2Fyb3VzZWwgZGl2LnByZXZMZWZ0U2Vjb25kIGltZ3t3aWR0aDoxNTBweH0jY2Fyb3VzZWwgZGl2IGltZ3t3aWR0aDozNTBweH19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo1MDBweCl7I2Nhcm91c2VsIGRpdi5uZXh0IGltZywjY2Fyb3VzZWwgZGl2LnByZXYgaW1ne3dpZHRoOjIwMHB4fSNjYXJvdXNlbCBkaXYuaGlkZUxlZnQgaW1nLCNjYXJvdXNlbCBkaXYuaGlkZVJpZ2h0IGltZywjY2Fyb3VzZWwgZGl2Lm5leHRSaWdodFNlY29uZCBpbWcsI2Nhcm91c2VsIGRpdi5wcmV2TGVmdFNlY29uZCBpbWd7d2lkdGg6MTAwcHh9I2Nhcm91c2VsIGRpdiBpbWd7d2lkdGg6MzAwcHh9fWBdXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAT3V0cHV0KCkgYXZhdGFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+O1xuXG4gIC8vIGZvciBnZXN0dXJlXG4gIHN0YXJ0ID0ge1xuICAgIHQ6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICB5OiBudWxsXG4gIH07XG4gIGVuZCA9IHtcbiAgICB4OiBudWxsLFxuICAgIHk6IG51bGxcbiAgfTtcbiAgdHJhY2tpbmcgPSBmYWxzZTtcbiAgdGhyZXNob2xkVGltZSA9IDUwMDtcbiAgdGhyZXNob2xkRGlzdGFuY2UgPSAxMDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5hdmF0YXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGluaXQgYXZhdGFyXG4gICAgdGhpcy5hdmF0YXJTZWxlY3RlZC5lbWl0KHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKS5jaGlsZE5vZGVzWzBdLmFsdCk7XG5cbiAgICAvLyBUT0RPIGltcGxlbWVudGFyZSBjbGljayBzdSBhbHRyaSBhdmF0YXIgZSBzZWxlemlvbmUgaW4gYXV0b21hdGljb1xuICAgIC8vICQoJyNjYXJvdXNlbCBkaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAvLyAgIG1vdmVUb1NlbGVjdGVkKCQodGhpcykpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gU3dpcGUgd2l0aCBQb2ludGVyRXZlbnRzXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy9kZXNpZ24tYW5kLXV4L2lucHV0L3RvdWNoL1xuICAgIGNvbnN0IG8gPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignI2Nhcm91c2VsJyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvLCAncG9pbnRlcmRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ2VzdHVyZVN0YXJ0KG8sIGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvLCAncG9pbnRlcm1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ2VzdHVyZU1vdmUobywgZXZlbnQpO1xuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG8sICdwb2ludGVydXAnLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ2VzdHVyZUVuZChvLCBldmVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4obywgJ3BvaW50ZXJsZWF2ZScsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5nZXN0dXJlRW5kKG8sIGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvLCAncG9pbnRlcmNhbmNlbCcsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5nZXN0dXJlRW5kKG8sIGV2ZW50KTtcbiAgICB9KTtcblxuICB9XG5cbiAgZ2VzdHVyZVN0YXJ0IChvLCBlKSB7XG4gICAgLy8gby5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLnRyYWNraW5nID0gdHJ1ZTtcbiAgICAvKiBIYWNrIC0gd291bGQgbm9ybWFsbHkgdXNlIGUudGltZVN0YW1wIGJ1dCBpdCdzIHdoYWNrIGluIEZ4L0FuZHJvaWQgKi9cbiAgICB0aGlzLnN0YXJ0LnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLnN0YXJ0LnggPSBlLmNsaWVudFg7XG4gICAgdGhpcy5zdGFydC55ID0gZS5jbGllbnRZO1xuICB9XG4gIGdlc3R1cmVNb3ZlKG8sIGUpIHtcbiAgICBpZiAodGhpcy50cmFja2luZykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5lbmQueCA9IGUuY2xpZW50WDtcbiAgICAgIHRoaXMuZW5kLnkgPSBlLmNsaWVudFk7XG4gICAgfVxuICB9XG4gIGdlc3R1cmVFbmQgKG8sIGUpIHtcbiAgICBpZiAodGhpcy50cmFja2luZykge1xuICAgICAgdGhpcy50cmFja2luZyA9IGZhbHNlO1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBjb25zdCBkZWx0YVRpbWUgPSBub3cgLSB0aGlzLnN0YXJ0LnQ7XG4gICAgICBjb25zdCBkZWx0YVggPSB0aGlzLmVuZC54IC0gdGhpcy5zdGFydC54O1xuICAgICAgY29uc3QgZGVsdGFZID0gdGhpcy5lbmQueSAtIHRoaXMuc3RhcnQueTtcbiAgICAgIC8qIHdvcmsgb3V0IHdoYXQgdGhlIG1vdmVtZW50IHdhcyAqL1xuICAgICAgaWYgKGRlbHRhVGltZSA+IHRoaXMudGhyZXNob2xkVGltZSkge1xuICAgICAgICAvKiBnZXN0dXJlIHRvbyBzbG93ICovXG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgoZGVsdGFYID4gdGhpcy50aHJlc2hvbGREaXN0YW5jZSkgJiYgKE1hdGguYWJzKGRlbHRhWSkgPCB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSkge1xuICAgICAgICAgIC8vIG8uaW5uZXJIVE1MID0gJ3N3aXBlIHJpZ2h0JztcbiAgICAgICAgICB0aGlzLm1vdmVUb1NlbGVjdGVkKCdwcmV2Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKC1kZWx0YVggPiB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSAmJiAoTWF0aC5hYnMoZGVsdGFZKSA8IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpKSB7XG4gICAgICAgICAgLy8gby5pbm5lckhUTUwgPSAnc3dpcGUgbGVmdCc7XG4gICAgICAgICAgdGhpcy5tb3ZlVG9TZWxlY3RlZCgnbmV4dCcpO1xuICAgICAgICB9IGVsc2UgaWYgKChkZWx0YVkgPiB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSAmJiAoTWF0aC5hYnMoZGVsdGFYKSA8IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpKSB7XG4gICAgICAgICAgLy8gby5pbm5lckhUTUwgPSAnc3dpcGUgZG93bic7XG4gICAgICAgIH0gZWxzZSBpZiAoKC1kZWx0YVkgPiB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSAmJiAoTWF0aC5hYnMoZGVsdGFYKSA8IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpKSB7XG4gICAgICAgICAgLy8gby5pbm5lckhUTUwgPSAnc3dpcGUgdXAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG8uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlVG9TZWxlY3RlZChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgPT09ICduZXh0Jykge1xuICAgICAgY29uc3QgcHJldiA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcbiAgICAgIGlmIChwcmV2Lm5leHRFbGVtZW50U2libGluZykgeyAgLy8gaWYgbnVsbCwgY2Fyb3VzZWwgaXMgYXQgdGhlIGVuZCBvZiBpbWFnZXMoUlgpXG4gICAgICAgIGNvbnN0IGN1cnIgPSBwcmV2Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5hdmF0YXJTZWxlY3RlZC5lbWl0KGN1cnIuY2hpbGROb2Rlc1swXS5hbHQpO1xuICAgICAgICBjb25zdCBuZXh0ID0gY3Vyci5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGxldCBwcmV2U2Vjb25kID0gbnVsbDtcbiAgICAgICAgbGV0IG5leHRTZWNvbmQgPSBudWxsO1xuICAgICAgICBsZXQgbmV4dFRoaXJkID0gbnVsbDtcbiAgICAgICAgbGV0IHByZXZUaGlyZCA9IG51bGw7XG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgbmV4dFNlY29uZCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0U2Vjb25kKSB7XG4gICAgICAgICAgbmV4dFRoaXJkID0gbmV4dFNlY29uZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICBwcmV2U2Vjb25kID0gcHJldi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2U2Vjb25kKSB7XG4gICAgICAgICAgcHJldlRoaXJkID0gcHJldlNlY29uZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldiwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJldiwgJ3ByZXYnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhjdXJyLCAnbmV4dCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGN1cnIsICdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAocHJldlNlY29uZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldlNlY29uZCwgJ3ByZXYnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByZXZTZWNvbmQsICdwcmV2TGVmdFNlY29uZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2VGhpcmQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHByZXZUaGlyZCwgJ3ByZXZMZWZ0U2Vjb25kJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmV2VGhpcmQsICdoaWRlTGVmdCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhuZXh0LCAnbmV4dFJpZ2h0U2Vjb25kJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuZXh0LCAnbmV4dCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0U2Vjb25kKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhuZXh0U2Vjb25kLCAnaGlkZVJpZ2h0Jyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuZXh0U2Vjb25kLCAnbmV4dFJpZ2h0U2Vjb25kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09ICdwcmV2Jykge1xuICAgICAgLy8gc2VsZWN0ZWQgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXYnKTtcbiAgICAgIGNvbnN0IG5leHQgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJyk7XG4gICAgICBpZiAobmV4dC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7ICAvLyBpZiBudWxsLCBjYXJvdXNlbCBpcyBhdCB0aGUgZW5kIG9mIGltYWdlcyhTWClcbiAgICAgICAgY29uc3QgY3VyciA9IG5leHQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5hdmF0YXJTZWxlY3RlZC5lbWl0KGN1cnIuY2hpbGROb2Rlc1swXS5hbHQpO1xuICAgICAgICBjb25zdCBwcmV2ID0gY3Vyci5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICBsZXQgcHJldlNlY29uZCA9IG51bGw7XG4gICAgICAgIGxldCBuZXh0U2Vjb25kID0gbnVsbDtcbiAgICAgICAgbGV0IG5leHRUaGlyZCA9IG51bGw7XG4gICAgICAgIGxldCBwcmV2VGhpcmQgPSBudWxsO1xuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgIG5leHRTZWNvbmQgPSBuZXh0Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dFNlY29uZCkge1xuICAgICAgICAgIG5leHRUaGlyZCA9IG5leHRTZWNvbmQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgcHJldlNlY29uZCA9IHByZXYucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldlNlY29uZCkge1xuICAgICAgICAgIHByZXZUaGlyZCA9IHByZXZTZWNvbmQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKG5leHQsICdzZWxlY3RlZCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5leHQsICduZXh0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoY3VyciwgJ3ByZXYnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjdXJyLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgaWYgKG5leHRTZWNvbmQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKG5leHRTZWNvbmQsICduZXh0Jyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuZXh0U2Vjb25kLCAnbmV4dFJpZ2h0U2Vjb25kJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRUaGlyZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MobmV4dFRoaXJkLCAnbmV4dFJpZ2h0U2Vjb25kJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuZXh0VGhpcmQsICdoaWRlUmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldiwgJ3ByZXZMZWZ0U2Vjb25kJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmV2LCAncHJldicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2U2Vjb25kKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhwcmV2U2Vjb25kLCAnaGlkZUxlZnQnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByZXZTZWNvbmQsICdwcmV2TGVmdFNlY29uZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8gaW1wbGVtZW50YXJlIGNsaWNrIHN1IGFsdHJpIGF2YXRhciBlIHNlbGV6aW9uZSBpbiBhdXRvbWF0aWNvXG4gICAgICAvLyBzZWxlY3RlZCA9IGVsZW1lbnQ7XG4gICAgICAvLyBzZWxlY3RlZCA9IHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQoJy5zZWxlY3RlZCcpO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDYXJvdXNlbENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDYXJvdXNlbENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJSZW5kZXJlcjIiLCJPdXRwdXQiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FB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