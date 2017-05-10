var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
var AppComponent = (function () {
    function AppComponent(platformId) {
        this.platformId = platformId;
        this.title = 'app works fine!';
        this.linksNav1 = [
            { item: 'Inbox', logo: 'inbox' },
            { item: 'Start', logo: 'start' },
            { item: 'Sent Mail', logo: 'send' }
        ];
        this.linksNav2 = [
            { item: 'Draft', logo: 'drafts' },
            { item: 'All Mail', logo: 'email' },
            { item: 'Trash', logo: 'delete' },
            { item: 'Spam', logo: 'report' }
        ];
    }
    // browser or server target
    AppComponent.prototype.ngOnInit = function () {
        if (isPlatformBrowser(this.platformId)) {
            // Client only code.
            this.title = "Client";
        }
        if (isPlatformServer(this.platformId)) {
            // Server only code.
            this.title = "Client";
        }
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        if (window.preboot) {
            window.preboot.complete();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __param(0, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [Object])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map