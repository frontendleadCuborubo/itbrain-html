const CLASS_NAME_SHOW = 'show';

const SELECTOR_DATA_TOGGLE = '[data-toggle="dropdown"]';
const SELECTOR_MENU = '.dropdown-menu';

class Dropdown {
	constructor(element) {
		this._element = element;
		this._menu = this._getMenuElement();

		this._addEventListeners();
	}

	_addEventListeners() {
		this._element.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.toggle();
		});
	}

	toggle() {
		const isActive = this._menu.classList.contains(CLASS_NAME_SHOW);

		Dropdown.clearMenus();

		if (isActive) {
			return;
		}

		this.show();
	}

	show() {
		if (this._menu.classList.contains(CLASS_NAME_SHOW)) {
			return;
		}

		const parent = Dropdown.getParentFromElement(this._element);

		this._element.focus();

		parent.classList.toggle(CLASS_NAME_SHOW);
		this._menu.classList.toggle(CLASS_NAME_SHOW);
	}

	hide() {
		if (!this._menu.classList.contains(CLASS_NAME_SHOW)) {
			return;
		}
		this._menu.classList.toggle(CLASS_NAME_SHOW);
	}

	_getMenuElement() {
		return this._element.nextElementSibling;
	}

	static getParentFromElement(element) {
		return element.parentNode;
	}

	static clearMenus(event) {
		const dropdownMenus = document.querySelectorAll(SELECTOR_MENU);
		dropdownMenus.forEach((menu) => {
			if (menu.classList.contains(CLASS_NAME_SHOW)) {
				const parent = Dropdown.getParentFromElement(menu);
				parent.classList.remove(CLASS_NAME_SHOW);
				menu.classList.remove(CLASS_NAME_SHOW);
			}
		});
	}
}

const DropdownModule = (function () {
	const init = () => {
		const triggers = document.querySelectorAll(SELECTOR_DATA_TOGGLE);
		document.addEventListener('click', (event) => {
			if (!event.target.closest(SELECTOR_DATA_TOGGLE)) {
				Dropdown.clearMenus();
			}
		});
		triggers.forEach((trigger) => {
			new Dropdown(trigger);
		});
	};

	return { init };
})();

export default DropdownModule;
