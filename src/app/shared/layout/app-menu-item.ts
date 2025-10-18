export class AppMenuItem {
    constructor(
        public name: string,
        public permissionName: string,
        public icon: string,
        public route: string,
        public items: AppMenuItem[] = []
    ) {}
}