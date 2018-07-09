/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
var CarouselComponent = /** @class */ (function () {
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
        this.avatarSelected = new EventEmitter();
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
                else if ((deltaY > this.thresholdDistance) && (Math.abs(deltaX) < this.thresholdDistance)) {
                    // o.innerHTML = 'swipe down';
                }
                else if ((-deltaY > this.thresholdDistance) && (Math.abs(deltaX) < this.thresholdDistance)) {
                    // o.innerHTML = 'swipe up';
                }
                else {
                    // o.innerHTML = '';
                }
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
        else {
            // TODO implementare click su altri avatar e selezione in automatico
            // selected = element;
            // selected = this.renderer.selectRootElement('.selected');
        }
    };
    CarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tr-carousel',
                    template: "<div id=\"carousel\">\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/1.svg\" alt=\"avatar1\">\n  </div>\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/2.svg\" alt=\"avatar2\">\n  </div>\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/3.svg\" alt=\"avatar3\">\n  </div>\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/4.svg\" alt=\"avatar4\">\n  </div>\n\n  <div class=\"hideLeft\">\n    <img src=\"assets/avatars/5.svg\" alt=\"avatar5\">\n  </div>\n\n  <div class=\"prevLeftSecond\">\n    <img src=\"assets/avatars/6.svg\" alt=\"avatar6\">\n  </div>\n\n  <div class=\"prev\">\n    <img src=\"assets/avatars/7.svg\" alt=\"avatar7\">\n  </div>\n\n  <div class=\"selected\">\n    <img src=\"assets/avatars/8.svg\" alt=\"avatar8\">\n  </div>\n\n  <div class=\"next\">\n    <img src=\"assets/avatars/9.svg\" alt=\"avatar9\">\n  </div>\n\n  <div class=\"nextRightSecond\">\n    <img src=\"assets/avatars/10.svg\" alt=\"avatar10\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/11.svg\" alt=\"avatar11\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/12.svg\" alt=\"avatar12\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/13.svg\" alt=\"avatar13\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/14.svg\" alt=\"avatar14\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/15.svg\" alt=\"avatar15\">\n  </div>\n\n  <div class=\"hideRight\">\n    <img src=\"assets/avatars/16.svg\" alt=\"avatar16\">\n  </div>\n\n</div>\n\n<!--<div class=\"buttons\">-->\n<!--<button id=\"prev\" (click)=\"moveToSelected('prev')\">Prev</button>-->\n<!--<button id=\"next\" (click)=\"moveToSelected('next')\">Next</button>-->\n<!--</div>-->\n",
                    styles: ["#carousel{height:400px;overflow:hidden}#carousel div{position:absolute;transition:left 1s,opacity 1s,z-index 0s,-webkit-transform 1s;transition:transform 1s,left 1s,opacity 1s,z-index 0s;transition:transform 1s,left 1s,opacity 1s,z-index 0s,-webkit-transform 1s;opacity:1}#carousel div img{width:400px;transition:width 1s}#carousel div.hideLeft{left:30%;opacity:0;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%)}#carousel div.hideLeft img{width:200px}#carousel div.hideRight{left:70%;opacity:0;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%)}#carousel div.hideRight img{width:200px}#carousel div.prev{z-index:5;left:30%;-webkit-transform:translateY(50px) translateX(-50%);transform:translateY(50px) translateX(-50%);opacity:.7}#carousel div.prev img{width:300px}#carousel div.prevLeftSecond{z-index:4;left:15%;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%);opacity:.5}#carousel div.prevLeftSecond img{width:200px}#carousel div.selected{z-index:10;left:50%;-webkit-transform:translateY(0) translateX(-50%);transform:translateY(0) translateX(-50%)}#carousel div.next{z-index:5;left:70%;-webkit-transform:translateY(50px) translateX(-50%);transform:translateY(50px) translateX(-50%);opacity:.7}#carousel div.next img{width:300px}#carousel div.nextRightSecond{z-index:4;left:85%;-webkit-transform:translateY(50%) translateX(-50%);transform:translateY(50%) translateX(-50%);opacity:.5}#carousel div.nextRightSecond img{width:200px}.buttons{position:fixed;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:10px}@media screen and (max-width:665px){#carousel div.next img,#carousel div.prev img{width:250px}#carousel div.hideLeft img,#carousel div.hideRight img,#carousel div.nextRightSecond img,#carousel div.prevLeftSecond img{width:150px}#carousel div img{width:350px}}@media screen and (max-width:500px){#carousel div.next img,#carousel div.prev img{width:200px}#carousel div.hideLeft img,#carousel div.hideRight img,#carousel div.nextRightSecond img,#carousel div.prevLeftSecond img{width:100px}#carousel div img{width:300px}}"]
                },] },
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    CarouselComponent.propDecorators = {
        avatarSelected: [{ type: Output }]
    };
    return CarouselComponent;
}());
export { CarouselComponent };
function CarouselComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CarouselComponent.prototype.avatarSelected;
    /** @type {?} */
    CarouselComponent.prototype.start;
    /** @type {?} */
    CarouselComponent.prototype.end;
    /** @type {?} */
    CarouselComponent.prototype.tracking;
    /** @type {?} */
    CarouselComponent.prototype.thresholdTime;
    /** @type {?} */
    CarouselComponent.prototype.thresholdDistance;
    /** @type {?} */
    CarouselComponent.prototype.elRef;
    /** @type {?} */
    CarouselComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY2Fyb3VzZWwvIiwic291cmNlcyI6WyJsaWIvY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7SUFpRzNGLDJCQUFvQixLQUFpQixFQUFVLFFBQW1CO1FBQTlDLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXOztxQkFiMUQ7WUFDTixDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7U0FDUjttQkFDSztZQUNKLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7U0FDUjt3QkFDVSxLQUFLOzZCQUNBLEdBQUc7aUNBQ0MsR0FBRztRQUdyQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7S0FDMUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFBQSxpQkE2QkM7O1FBM0JDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7UUFTaEcscUJBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsYUFBYSxFQUFFLFVBQUMsS0FBSztZQUMzQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsYUFBYSxFQUFFLFVBQUMsS0FBSztZQUMzQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLFVBQUMsS0FBSztZQUN6QyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLFVBQUMsS0FBSztZQUM1QyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsZUFBZSxFQUFFLFVBQUMsS0FBSztZQUM3QyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQixDQUFDLENBQUM7S0FFSjs7Ozs7O0lBRUQsd0NBQVk7Ozs7O0lBQVosVUFBYyxDQUFDLEVBQUUsQ0FBQzs7UUFFaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O1FBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO0tBQzFCOzs7Ozs7SUFDRCx1Q0FBVzs7Ozs7SUFBWCxVQUFZLENBQUMsRUFBRSxDQUFDO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUN4QjtLQUNGOzs7Ozs7SUFDRCxzQ0FBVTs7Ozs7SUFBVixVQUFZLENBQUMsRUFBRSxDQUFDO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIscUJBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakMscUJBQU0sU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQyxxQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekMscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUV6QyxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7O2dCQUVuQyxNQUFNLENBQUM7YUFDUjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUVyRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM3QjtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDOztvQkFFN0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDN0I7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7O2lCQUU3RjtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDOztpQkFFOUY7Z0JBQUMsSUFBSSxDQUFDLENBQUM7O2lCQUVQO2FBQ0Y7U0FDRjtLQUNGOzs7OztJQUVELDBDQUFjOzs7O0lBQWQsVUFBZSxPQUFPO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLHFCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs7Z0JBQzVCLHFCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pELHFCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3JDLHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLHFCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLHFCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1QsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztpQkFDdEM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDZixTQUFTLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixDQUFDO2lCQUMzQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNULFVBQVUsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7aUJBQzFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsU0FBUyxHQUFHLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDL0M7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3REO2dCQUNELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDL0M7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUN0QztnQkFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7aUJBQ3ZEO2FBQ0Y7U0FDRjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzs7WUFFOUIscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDOztnQkFDaEMscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakQscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztnQkFDekMscUJBQUksVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdEIscUJBQUksVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdEIscUJBQUksU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDckIscUJBQUksU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVCxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2lCQUN0QztnQkFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNmLFNBQVMsR0FBRyxVQUFVLENBQUMsa0JBQWtCLENBQUM7aUJBQzNDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1QsVUFBVSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztpQkFDMUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDZixTQUFTLEdBQUcsVUFBVSxDQUFDLHNCQUFzQixDQUFDO2lCQUMvQztnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztpQkFDdkQ7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNoRDtnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNULElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ3RDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztpQkFDdEQ7YUFDRjtTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7Ozs7U0FJUDtLQUVGOztnQkE1UUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsdXdEQXdFWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxncEVBQWdwRSxDQUFDO2lCQUMzcEU7Ozs7Z0JBOUVrQixVQUFVO2dCQUFnQyxTQUFTOzs7aUNBaUZuRSxNQUFNOzs0QkFqRlQ7O1NBK0VhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0ci1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBpZD1cImNhcm91c2VsXCI+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlTGVmdFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8xLnN2Z1wiIGFsdD1cImF2YXRhcjFcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVMZWZ0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzIuc3ZnXCIgYWx0PVwiYXZhdGFyMlwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZUxlZnRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMy5zdmdcIiBhbHQ9XCJhdmF0YXIzXCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlTGVmdFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy80LnN2Z1wiIGFsdD1cImF2YXRhcjRcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVMZWZ0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzUuc3ZnXCIgYWx0PVwiYXZhdGFyNVwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicHJldkxlZnRTZWNvbmRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvNi5zdmdcIiBhbHQ9XCJhdmF0YXI2XCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJwcmV2XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzcuc3ZnXCIgYWx0PVwiYXZhdGFyN1wiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0ZWRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvOC5zdmdcIiBhbHQ9XCJhdmF0YXI4XCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJuZXh0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzkuc3ZnXCIgYWx0PVwiYXZhdGFyOVwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwibmV4dFJpZ2h0U2Vjb25kXCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzEwLnN2Z1wiIGFsdD1cImF2YXRhcjEwXCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlUmlnaHRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMTEuc3ZnXCIgYWx0PVwiYXZhdGFyMTFcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVSaWdodFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8xMi5zdmdcIiBhbHQ9XCJhdmF0YXIxMlwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZVJpZ2h0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzEzLnN2Z1wiIGFsdD1cImF2YXRhcjEzXCI+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJoaWRlUmlnaHRcIj5cclxuICAgIDxpbWcgc3JjPVwiYXNzZXRzL2F2YXRhcnMvMTQuc3ZnXCIgYWx0PVwiYXZhdGFyMTRcIj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImhpZGVSaWdodFwiPlxyXG4gICAgPGltZyBzcmM9XCJhc3NldHMvYXZhdGFycy8xNS5zdmdcIiBhbHQ9XCJhdmF0YXIxNVwiPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaGlkZVJpZ2h0XCI+XHJcbiAgICA8aW1nIHNyYz1cImFzc2V0cy9hdmF0YXJzLzE2LnN2Z1wiIGFsdD1cImF2YXRhcjE2XCI+XHJcbiAgPC9kaXY+XHJcblxyXG48L2Rpdj5cclxuXHJcbjwhLS08ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPi0tPlxyXG48IS0tPGJ1dHRvbiBpZD1cInByZXZcIiAoY2xpY2spPVwibW92ZVRvU2VsZWN0ZWQoJ3ByZXYnKVwiPlByZXY8L2J1dHRvbj4tLT5cclxuPCEtLTxidXR0b24gaWQ9XCJuZXh0XCIgKGNsaWNrKT1cIm1vdmVUb1NlbGVjdGVkKCduZXh0JylcIj5OZXh0PC9idXR0b24+LS0+XHJcbjwhLS08L2Rpdj4tLT5cclxuYCxcbiAgc3R5bGVzOiBbYCNjYXJvdXNlbHtoZWlnaHQ6NDAwcHg7b3ZlcmZsb3c6aGlkZGVufSNjYXJvdXNlbCBkaXZ7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNpdGlvbjpsZWZ0IDFzLG9wYWNpdHkgMXMsei1pbmRleCAwcywtd2Via2l0LXRyYW5zZm9ybSAxczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAxcyxsZWZ0IDFzLG9wYWNpdHkgMXMsei1pbmRleCAwczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAxcyxsZWZ0IDFzLG9wYWNpdHkgMXMsei1pbmRleCAwcywtd2Via2l0LXRyYW5zZm9ybSAxcztvcGFjaXR5OjF9I2Nhcm91c2VsIGRpdiBpbWd7d2lkdGg6NDAwcHg7dHJhbnNpdGlvbjp3aWR0aCAxc30jY2Fyb3VzZWwgZGl2LmhpZGVMZWZ0e2xlZnQ6MzAlO29wYWNpdHk6MDstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSg1MCUpIHRyYW5zbGF0ZVgoLTUwJSl9I2Nhcm91c2VsIGRpdi5oaWRlTGVmdCBpbWd7d2lkdGg6MjAwcHh9I2Nhcm91c2VsIGRpdi5oaWRlUmlnaHR7bGVmdDo3MCU7b3BhY2l0eTowOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTAlKSB0cmFuc2xhdGVYKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKX0jY2Fyb3VzZWwgZGl2LmhpZGVSaWdodCBpbWd7d2lkdGg6MjAwcHh9I2Nhcm91c2VsIGRpdi5wcmV2e3otaW5kZXg6NTtsZWZ0OjMwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDUwcHgpIHRyYW5zbGF0ZVgoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTBweCkgdHJhbnNsYXRlWCgtNTAlKTtvcGFjaXR5Oi43fSNjYXJvdXNlbCBkaXYucHJldiBpbWd7d2lkdGg6MzAwcHh9I2Nhcm91c2VsIGRpdi5wcmV2TGVmdFNlY29uZHt6LWluZGV4OjQ7bGVmdDoxNSU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSg1MCUpIHRyYW5zbGF0ZVgoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTAlKSB0cmFuc2xhdGVYKC01MCUpO29wYWNpdHk6LjV9I2Nhcm91c2VsIGRpdi5wcmV2TGVmdFNlY29uZCBpbWd7d2lkdGg6MjAwcHh9I2Nhcm91c2VsIGRpdi5zZWxlY3RlZHt6LWluZGV4OjEwO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMCkgdHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgwKSB0cmFuc2xhdGVYKC01MCUpfSNjYXJvdXNlbCBkaXYubmV4dHt6LWluZGV4OjU7bGVmdDo3MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSg1MHB4KSB0cmFuc2xhdGVYKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKDUwcHgpIHRyYW5zbGF0ZVgoLTUwJSk7b3BhY2l0eTouN30jY2Fyb3VzZWwgZGl2Lm5leHQgaW1ne3dpZHRoOjMwMHB4fSNjYXJvdXNlbCBkaXYubmV4dFJpZ2h0U2Vjb25ke3otaW5kZXg6NDtsZWZ0Ojg1JTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKDUwJSkgdHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSg1MCUpIHRyYW5zbGF0ZVgoLTUwJSk7b3BhY2l0eTouNX0jY2Fyb3VzZWwgZGl2Lm5leHRSaWdodFNlY29uZCBpbWd7d2lkdGg6MjAwcHh9LmJ1dHRvbnN7cG9zaXRpb246Zml4ZWQ7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKTtib3R0b206MTBweH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjY2NXB4KXsjY2Fyb3VzZWwgZGl2Lm5leHQgaW1nLCNjYXJvdXNlbCBkaXYucHJldiBpbWd7d2lkdGg6MjUwcHh9I2Nhcm91c2VsIGRpdi5oaWRlTGVmdCBpbWcsI2Nhcm91c2VsIGRpdi5oaWRlUmlnaHQgaW1nLCNjYXJvdXNlbCBkaXYubmV4dFJpZ2h0U2Vjb25kIGltZywjY2Fyb3VzZWwgZGl2LnByZXZMZWZ0U2Vjb25kIGltZ3t3aWR0aDoxNTBweH0jY2Fyb3VzZWwgZGl2IGltZ3t3aWR0aDozNTBweH19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo1MDBweCl7I2Nhcm91c2VsIGRpdi5uZXh0IGltZywjY2Fyb3VzZWwgZGl2LnByZXYgaW1ne3dpZHRoOjIwMHB4fSNjYXJvdXNlbCBkaXYuaGlkZUxlZnQgaW1nLCNjYXJvdXNlbCBkaXYuaGlkZVJpZ2h0IGltZywjY2Fyb3VzZWwgZGl2Lm5leHRSaWdodFNlY29uZCBpbWcsI2Nhcm91c2VsIGRpdi5wcmV2TGVmdFNlY29uZCBpbWd7d2lkdGg6MTAwcHh9I2Nhcm91c2VsIGRpdiBpbWd7d2lkdGg6MzAwcHh9fWBdXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAT3V0cHV0KCkgYXZhdGFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+O1xuXG4gIC8vIGZvciBnZXN0dXJlXG4gIHN0YXJ0ID0ge1xuICAgIHQ6IG51bGwsXG4gICAgeDogbnVsbCxcbiAgICB5OiBudWxsXG4gIH07XG4gIGVuZCA9IHtcbiAgICB4OiBudWxsLFxuICAgIHk6IG51bGxcbiAgfTtcbiAgdHJhY2tpbmcgPSBmYWxzZTtcbiAgdGhyZXNob2xkVGltZSA9IDUwMDtcbiAgdGhyZXNob2xkRGlzdGFuY2UgPSAxMDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5hdmF0YXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGluaXQgYXZhdGFyXG4gICAgdGhpcy5hdmF0YXJTZWxlY3RlZC5lbWl0KHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKS5jaGlsZE5vZGVzWzBdLmFsdCk7XG5cbiAgICAvLyBUT0RPIGltcGxlbWVudGFyZSBjbGljayBzdSBhbHRyaSBhdmF0YXIgZSBzZWxlemlvbmUgaW4gYXV0b21hdGljb1xuICAgIC8vICQoJyNjYXJvdXNlbCBkaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAvLyAgIG1vdmVUb1NlbGVjdGVkKCQodGhpcykpO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gU3dpcGUgd2l0aCBQb2ludGVyRXZlbnRzXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL2Z1bmRhbWVudGFscy9kZXNpZ24tYW5kLXV4L2lucHV0L3RvdWNoL1xuICAgIGNvbnN0IG8gPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignI2Nhcm91c2VsJyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvLCAncG9pbnRlcmRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ2VzdHVyZVN0YXJ0KG8sIGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvLCAncG9pbnRlcm1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ2VzdHVyZU1vdmUobywgZXZlbnQpO1xuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG8sICdwb2ludGVydXAnLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuZ2VzdHVyZUVuZChvLCBldmVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4obywgJ3BvaW50ZXJsZWF2ZScsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5nZXN0dXJlRW5kKG8sIGV2ZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihvLCAncG9pbnRlcmNhbmNlbCcsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5nZXN0dXJlRW5kKG8sIGV2ZW50KTtcbiAgICB9KTtcblxuICB9XG5cbiAgZ2VzdHVyZVN0YXJ0IChvLCBlKSB7XG4gICAgLy8gby5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLnRyYWNraW5nID0gdHJ1ZTtcbiAgICAvKiBIYWNrIC0gd291bGQgbm9ybWFsbHkgdXNlIGUudGltZVN0YW1wIGJ1dCBpdCdzIHdoYWNrIGluIEZ4L0FuZHJvaWQgKi9cbiAgICB0aGlzLnN0YXJ0LnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLnN0YXJ0LnggPSBlLmNsaWVudFg7XG4gICAgdGhpcy5zdGFydC55ID0gZS5jbGllbnRZO1xuICB9XG4gIGdlc3R1cmVNb3ZlKG8sIGUpIHtcbiAgICBpZiAodGhpcy50cmFja2luZykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5lbmQueCA9IGUuY2xpZW50WDtcbiAgICAgIHRoaXMuZW5kLnkgPSBlLmNsaWVudFk7XG4gICAgfVxuICB9XG4gIGdlc3R1cmVFbmQgKG8sIGUpIHtcbiAgICBpZiAodGhpcy50cmFja2luZykge1xuICAgICAgdGhpcy50cmFja2luZyA9IGZhbHNlO1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBjb25zdCBkZWx0YVRpbWUgPSBub3cgLSB0aGlzLnN0YXJ0LnQ7XG4gICAgICBjb25zdCBkZWx0YVggPSB0aGlzLmVuZC54IC0gdGhpcy5zdGFydC54O1xuICAgICAgY29uc3QgZGVsdGFZID0gdGhpcy5lbmQueSAtIHRoaXMuc3RhcnQueTtcbiAgICAgIC8qIHdvcmsgb3V0IHdoYXQgdGhlIG1vdmVtZW50IHdhcyAqL1xuICAgICAgaWYgKGRlbHRhVGltZSA+IHRoaXMudGhyZXNob2xkVGltZSkge1xuICAgICAgICAvKiBnZXN0dXJlIHRvbyBzbG93ICovXG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgoZGVsdGFYID4gdGhpcy50aHJlc2hvbGREaXN0YW5jZSkgJiYgKE1hdGguYWJzKGRlbHRhWSkgPCB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSkge1xuICAgICAgICAgIC8vIG8uaW5uZXJIVE1MID0gJ3N3aXBlIHJpZ2h0JztcbiAgICAgICAgICB0aGlzLm1vdmVUb1NlbGVjdGVkKCdwcmV2Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKC1kZWx0YVggPiB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSAmJiAoTWF0aC5hYnMoZGVsdGFZKSA8IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpKSB7XG4gICAgICAgICAgLy8gby5pbm5lckhUTUwgPSAnc3dpcGUgbGVmdCc7XG4gICAgICAgICAgdGhpcy5tb3ZlVG9TZWxlY3RlZCgnbmV4dCcpO1xuICAgICAgICB9IGVsc2UgaWYgKChkZWx0YVkgPiB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSAmJiAoTWF0aC5hYnMoZGVsdGFYKSA8IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpKSB7XG4gICAgICAgICAgLy8gby5pbm5lckhUTUwgPSAnc3dpcGUgZG93bic7XG4gICAgICAgIH0gZWxzZSBpZiAoKC1kZWx0YVkgPiB0aGlzLnRocmVzaG9sZERpc3RhbmNlKSAmJiAoTWF0aC5hYnMoZGVsdGFYKSA8IHRoaXMudGhyZXNob2xkRGlzdGFuY2UpKSB7XG4gICAgICAgICAgLy8gby5pbm5lckhUTUwgPSAnc3dpcGUgdXAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG8uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlVG9TZWxlY3RlZChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQgPT09ICduZXh0Jykge1xuICAgICAgY29uc3QgcHJldiA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcbiAgICAgIGlmIChwcmV2Lm5leHRFbGVtZW50U2libGluZykgeyAgLy8gaWYgbnVsbCwgY2Fyb3VzZWwgaXMgYXQgdGhlIGVuZCBvZiBpbWFnZXMoUlgpXG4gICAgICAgIGNvbnN0IGN1cnIgPSBwcmV2Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5hdmF0YXJTZWxlY3RlZC5lbWl0KGN1cnIuY2hpbGROb2Rlc1swXS5hbHQpO1xuICAgICAgICBjb25zdCBuZXh0ID0gY3Vyci5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGxldCBwcmV2U2Vjb25kID0gbnVsbDtcbiAgICAgICAgbGV0IG5leHRTZWNvbmQgPSBudWxsO1xuICAgICAgICBsZXQgbmV4dFRoaXJkID0gbnVsbDtcbiAgICAgICAgbGV0IHByZXZUaGlyZCA9IG51bGw7XG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgbmV4dFNlY29uZCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0U2Vjb25kKSB7XG4gICAgICAgICAgbmV4dFRoaXJkID0gbmV4dFNlY29uZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICBwcmV2U2Vjb25kID0gcHJldi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2U2Vjb25kKSB7XG4gICAgICAgICAgcHJldlRoaXJkID0gcHJldlNlY29uZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldiwgJ3NlbGVjdGVkJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJldiwgJ3ByZXYnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhjdXJyLCAnbmV4dCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGN1cnIsICdzZWxlY3RlZCcpO1xuICAgICAgICBpZiAocHJldlNlY29uZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldlNlY29uZCwgJ3ByZXYnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByZXZTZWNvbmQsICdwcmV2TGVmdFNlY29uZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2VGhpcmQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHByZXZUaGlyZCwgJ3ByZXZMZWZ0U2Vjb25kJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmV2VGhpcmQsICdoaWRlTGVmdCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhuZXh0LCAnbmV4dFJpZ2h0U2Vjb25kJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuZXh0LCAnbmV4dCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0U2Vjb25kKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhuZXh0U2Vjb25kLCAnaGlkZVJpZ2h0Jyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuZXh0U2Vjb25kLCAnbmV4dFJpZ2h0U2Vjb25kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09ICdwcmV2Jykge1xuICAgICAgLy8gc2VsZWN0ZWQgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXYnKTtcbiAgICAgIGNvbnN0IG5leHQgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJyk7XG4gICAgICBpZiAobmV4dC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7ICAvLyBpZiBudWxsLCBjYXJvdXNlbCBpcyBhdCB0aGUgZW5kIG9mIGltYWdlcyhTWClcbiAgICAgICAgY29uc3QgY3VyciA9IG5leHQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5hdmF0YXJTZWxlY3RlZC5lbWl0KGN1cnIuY2hpbGROb2Rlc1swXS5hbHQpO1xuICAgICAgICBjb25zdCBwcmV2ID0gY3Vyci5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICBsZXQgcHJldlNlY29uZCA9IG51bGw7XG4gICAgICAgIGxldCBuZXh0U2Vjb25kID0gbnVsbDtcbiAgICAgICAgbGV0IG5leHRUaGlyZCA9IG51bGw7XG4gICAgICAgIGxldCBwcmV2VGhpcmQgPSBudWxsO1xuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgIG5leHRTZWNvbmQgPSBuZXh0Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dFNlY29uZCkge1xuICAgICAgICAgIG5leHRUaGlyZCA9IG5leHRTZWNvbmQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgcHJldlNlY29uZCA9IHByZXYucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldlNlY29uZCkge1xuICAgICAgICAgIHByZXZUaGlyZCA9IHByZXZTZWNvbmQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKG5leHQsICdzZWxlY3RlZCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5leHQsICduZXh0Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoY3VyciwgJ3ByZXYnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjdXJyLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgaWYgKG5leHRTZWNvbmQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKG5leHRTZWNvbmQsICduZXh0Jyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuZXh0U2Vjb25kLCAnbmV4dFJpZ2h0U2Vjb25kJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRUaGlyZCkge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MobmV4dFRoaXJkLCAnbmV4dFJpZ2h0U2Vjb25kJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhuZXh0VGhpcmQsICdoaWRlUmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldiwgJ3ByZXZMZWZ0U2Vjb25kJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmV2LCAncHJldicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2U2Vjb25kKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhwcmV2U2Vjb25kLCAnaGlkZUxlZnQnKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByZXZTZWNvbmQsICdwcmV2TGVmdFNlY29uZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8gaW1wbGVtZW50YXJlIGNsaWNrIHN1IGFsdHJpIGF2YXRhciBlIHNlbGV6aW9uZSBpbiBhdXRvbWF0aWNvXG4gICAgICAvLyBzZWxlY3RlZCA9IGVsZW1lbnQ7XG4gICAgICAvLyBzZWxlY3RlZCA9IHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQoJy5zZWxlY3RlZCcpO1xuICAgIH1cblxuICB9XG5cbn1cbiJdfQ==