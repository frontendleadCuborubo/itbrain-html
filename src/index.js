import './scss/index.scss';
import './polyfills';
import DropdownModule from './components/dropdown';

/**
 * HeaderComponent
 */
const HeaderComponent = (function () {
	const SELECTOR_DATA_TOGGLE = '[data-toggle="collapse"]';
	const CLASS_NAME_SHOW = 'is-open';

	let $root, $menuToggleBtns;

	const create = (selector) => {
		$root = document.querySelector(selector);
		$menuToggleBtns = $root.querySelectorAll(SELECTOR_DATA_TOGGLE);

		bind();
	};

	const findMenuElement = (source) => {
		return $root.querySelector(source.dataset.target);
	};

	const toggleMenu = function (btn) {
		let $menu = findMenuElement(btn);
		if ($menu.classList.contains(CLASS_NAME_SHOW)) {
			btn.classList.add('collapsed');
			$menu.classList.remove(CLASS_NAME_SHOW);
		} else {
			btn.classList.remove('collapsed');
			$menu.classList.add(CLASS_NAME_SHOW);
		}
	};

	const bind = () => {
		$menuToggleBtns.forEach((btn) => {
			btn.addEventListener('click', () => {
				toggleMenu(btn);
			});
		});
	};

	return {
		init: (selector) => {
			create(selector);
		},
	};
})();

document.addEventListener('DOMContentLoaded', () => {
	DropdownModule.init();
	HeaderComponent.init('.header');
});
