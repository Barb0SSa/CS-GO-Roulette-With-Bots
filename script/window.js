// сайдбар
window.addEventListener('scroll', function() {
	let ySidebarContainer = document.querySelector('.main__sidebar').getBoundingClientRect().top;
	let heightSidebarContainer = document.querySelector('.main__sidebar').getBoundingClientRect().height;
	let maxTop = heightSidebarContainer - document.querySelector('.main__sidebar').querySelector('.sidebar__smooth').getBoundingClientRect().height;
	let c_ySidebarContainer = document.querySelector('.cases__sidebar').getBoundingClientRect().top;
	let c_heightSidebarContainer = document.querySelector('.cases__sidebar').getBoundingClientRect().height;
	let c_maxTop = c_heightSidebarContainer - document.querySelector('.cases__sidebar').querySelector('.sidebar__smooth').getBoundingClientRect().height;
	if (ySidebarContainer < 80) {
		if ((Math.abs(ySidebarContainer) + 80) < maxTop) {
			if (ySidebarContainer <= 0) {
				document.querySelector('.main__sidebar').querySelector('.sidebar__smooth').style.top = Math.abs(ySidebarContainer) + 80 + 'px';
			} else {
				document.querySelector('.main__sidebar').querySelector('.sidebar__smooth').style.top = 80 - ySidebarContainer + 'px';
			}
		} else {
			document.querySelector('.main__sidebar').querySelector('.sidebar__smooth').style.top = maxTop + 'px';
		}
	} else {
		document.querySelector('.main__sidebar').querySelector('.sidebar__smooth').style.top = "0px";
	}
	if (c_ySidebarContainer < 80) {
		if ((Math.abs(c_ySidebarContainer) + 80) < c_maxTop) {
			if (c_ySidebarContainer <= 0) {
				document.querySelector('.cases__sidebar').querySelector('.sidebar__smooth').style.top = Math.abs(c_ySidebarContainer) + 80 + 'px';
			} else {
				document.querySelector('.cases__sidebar').querySelector('.sidebar__smooth').style.top = 80 - c_ySidebarContainer + 'px';
			}
		} else {
			document.querySelector('.cases__sidebar').querySelector('.sidebar__smooth').style.top = c_maxTop + 'px';
		}
	} else {
		document.querySelector('.cases__sidebar').querySelector('.sidebar__smooth').style.top = "0px";
	}
});



// ==========ВНЕСЕНИЕ В РУЛЕТКУ

// кнопка вызова окна внесения вещей (около прогресс бара вещей)
document.querySelector('.info__join').addEventListener('click', () => {visual.input_show('.main__input');})
// кнопка вызова окна внесения вещей (в сайдбаре)
document.querySelector('.sidebar__put-button').addEventListener('click', () => {visual.input_show('.main__input');})
// кнопка внесения вещей в окне внесения
document.querySelector('.input__btn').addEventListener('click', function() {
	if (this.getAttribute('data-banned') == 'false') {
		player.deposit();
	} else {
		alert('Сейчас внести нельзя!');
	}
});
// кнопка закрытия окна внесения
document.querySelector('.input__close').addEventListener('click', function(item) {
	visual.input_close('.main__input');
})


// ==========ПРОДАЖА


// кнопка закрытия окна продаж
document.querySelector('.input-sale .input__close').addEventListener('click', function() {
	visual.input_close('.main__input-sale');
})
// кнопка открытия окна продажи
document.querySelector('.sidebar__leave-button').addEventListener('click', () => {
	visual.inputSale_show();
})
// кнопка продажи
document.querySelector('.input-sale .input__btn').addEventListener('click', function() {
	console.log('confirm');
	visual.inputSale_confirm();
})
// изменить вещи для продажи
document.querySelector('.confirm-sale__false').addEventListener('click', function() {
	visual.inputSale_change();
})
// подтвердить продажу
document.querySelector('.confirm-sale__true').addEventListener('click', function() {
	console.log('sale');
	cases.sale();
	hide('.confirm-sale');
})






// lastround
document.querySelector('.lastround__items').style.height = '0px';
// открыть последний выигрыш
document.querySelector('.lastround__info').addEventListener('click', function() {
	if (document.querySelector('.lastround__items').style.height === '0px') {
		// если скрыт
		document.querySelector('.lastround__toggle .fa').classList.add('lastround__rotate');
		document.querySelector('.lastround__items').style.height = `${document.querySelector('.lastround__items').scrollHeight}px`;
	} else {
		// если показан
		document.querySelector('.lastround__toggle .fa').classList.remove('lastround__rotate');
		document.querySelector('.lastround__items').style.height = '0px';
	}
})
// открыть последний выигрыш
document.querySelector('.lastround__h').addEventListener('click', function() {
	if (document.querySelector('.lastround__items').style.height === '0px') {
		// если скрыт
		document.querySelector('.lastround__toggle .fa').classList.add('lastround__rotate');
		document.querySelector('.lastround__items').style.height = `${document.querySelector('.lastround__items').scrollHeight}px`;
	} else {
		// если показан
		document.querySelector('.lastround__toggle .fa').classList.remove('lastround__rotate');
		document.querySelector('.lastround__items').style.height = '0px';
	}
})


visual.sidebar_stat(true);
visual.info_progress_stat(true);

// кнопка инфы по ботам
document.querySelector('.menu__bots').addEventListener('click', function() {
	// закрытие бургер меню
	if (window.innerWidth <= 600) {
		this.parentNode.querySelectorAll('.menu__item').forEach(item => {
			item.style.height = '0px';
		})
	}
	// закрытие всех input окон
	document.querySelectorAll('.input').forEach(input => input.style.display = 'none');
	document.querySelector('.confirm-sale').style.display = 'none';

	document.querySelectorAll('.header__left-menu .menu__item').forEach(item => item.classList.remove('menu__item_active'));
	if (!document.querySelector('.bots').classList.contains('showed')) {
		this.classList.add('menu__item_active');
		document.querySelector('.rules').style.top = '-200vh';
		document.querySelector('.rules').classList.remove('showed');
		visual.showBots();
	} else {
		document.querySelector('.bots').style.top = '-200vh';
		document.querySelector('.bots').classList.remove('showed');
	}
})

// скрытие инфы о ботах при клике на нее
document.querySelector('.bots').addEventListener('click', function() {
	document.querySelectorAll('.header__left-menu .menu__item').forEach(item => item.classList.remove('menu__item_active'));
	document.querySelector('.bots').style.top = '-200vh';
	document.querySelector('.bots').classList.remove('showed');
})

// кнопка правил
document.querySelector('.menu__rules').addEventListener('click', function() {
	// закрытие бургер меню
	if (window.innerWidth <= 600) {
		this.parentNode.querySelectorAll('.menu__item').forEach(item => {
			item.style.height = '0px';
		})
	}
	// закрытие всех input окон
	document.querySelectorAll('.input').forEach(input => input.style.display = 'none');
	document.querySelector('.confirm-sale').style.display = 'none';

	document.querySelectorAll('.header__left-menu .menu__item').forEach(item => item.classList.remove('menu__item_active'));
	if (!document.querySelector('.rules').classList.contains('showed')) {
		this.classList.add('menu__item_active');
		document.querySelector('.bots').classList.remove('showed');
		document.querySelector('.bots').style.top = '-200vh';
		visual.showRules();
	} else {
		document.querySelector('.rules').style.top = '-200vh';
		document.querySelector('.rules').classList.remove('showed');
	}
})

// кнопка "я понял"
document.querySelector('.rules__understand').addEventListener('click', function() {
	if (!document.querySelector('.rules').classList.contains('showed')) {
		document.querySelector('.menu__rules').classList.add('menu__item_active');
		visual.showRules();
	} else {
		document.querySelector('.menu__rules').classList.remove('menu__item_active');
		document.querySelector('.rules').style.top = '-200vh';
		document.querySelector('.rules').classList.remove('showed');
	}
})

// настройки в окне внесения
document.querySelectorAll('.input__settings-opener').forEach(btn => {
	btn.addEventListener('click', function() {
		console.log(this.parentNode.parentNode.parentNode);
		if (this.classList.contains('input__settings-opener_rotate')) {
			this.classList.remove('input__settings-opener_rotate')
			this.parentNode.parentNode.parentNode.querySelector('.settings').style.height = '0px';
		} else {
			this.classList.add('input__settings-opener_rotate');
			console.log(document.querySelector('.settings').scrollHeight);
			this.parentNode.parentNode.parentNode.querySelector('.settings').style.height = '60px';
		}
	})
})
document.querySelector('.settings__sort').addEventListener('click', function() {
	if(document.querySelector('.settings__sort-switch').classList.contains('settings__sort-switch_down')) {
		document.querySelector('.settings__sort-switch').classList.remove('settings__sort-switch_down');
		document.querySelector('.settings__sort-switch').setAttribute('data-sort', 'up')
	} else {
		document.querySelector('.settings__sort-switch').classList.add('settings__sort-switch_down');
		document.querySelector('.settings__sort-switch').setAttribute('data-sort', 'down')
	}
})
document.querySelector('.settings__save').addEventListener('click', function() {
	visual.saveSortInventory();
	document.querySelector('.input__settings-opener').classList.remove('input__settings-opener_rotate')
	document.querySelector('.settings').style.height = '0px';
})
game.clearRound();


// кнопка выбора рулетки
document.querySelector('.menu__roulette').addEventListener('click', function() {
	// закрытие бургер меню
	if (window.innerWidth <= 600) {
		this.parentNode.querySelectorAll('.menu__item').forEach(item => {
			item.style.height = '0px';
		})
	}
	// закрытие всех input окон
	document.querySelectorAll('.input').forEach(input => input.style.display = 'none');
	document.querySelector('.confirm-sale').style.display = 'none';

	if (this.classList.contains('menu__item_active')) {
		return;
	} else {
		hideActive();
		this.classList.add('menu__item_active');
		showActive();
	}
})
// кнопка выбора кейсов
document.querySelector('.menu__cases').addEventListener('click', function() {
	// закрытие бургер меню
	if (window.innerWidth <= 600) {
		this.parentNode.querySelectorAll('.menu__item').forEach(item => {
			item.style.height = '0px';
		})
	}
	// закрытие всех input окон
	document.querySelectorAll('.input').forEach(input => input.style.display = 'none');
	document.querySelector('.confirm-sale').style.display = 'none';

	if (this.classList.contains('menu__item_active')) {
		return;
	} else {
		hideActive();
		this.classList.add('menu__item_active');
		cases.print();
		showActive();
	}
})

// ресайз окна
window.addEventListener('resize', function() {
	document.querySelectorAll('.log__deposit').forEach(item => item.style.height = 'auto');
	if (document.documentElement.scrollWidth >= 600) {
		document.querySelectorAll('.menu__item').forEach(item => item.style.height = 'auto');
	} else {
		document.querySelectorAll('.menu__item').forEach(item => item.style.height = '0px');
	}
})

// подключение кейсов
document.querySelector('.cases__start').addEventListener('click', function() {
	hide('.cases__start');
	cases.open();
})
document.querySelector('.cases__change').addEventListener('click', function() {
	hide('.cases__present');
	hide('.cases__roulette-container');
	hide('.cases__content');
	show('.case-menu');
})
document.querySelector('.lastwin').style.display = 'none';
document.querySelector('.lastwin').style.right = '100%';
document.querySelector('.lastwin').style.opacity = '0';
show('.cases__menu');
hide('.cases__present');
hide('.cases__roulette-container');
hide('.cases__content');
// -----------------------

document.querySelector('.cases').style.position = 'absolute';
document.querySelector('.cases').style.left = '100vw';

// бургер меню
document.querySelectorAll('.menu__opener').forEach(btn => {
	btn.addEventListener('click', function() {
		let menu = this.parentNode.parentNode.querySelector('.menu__inner');
		console.log(menu.querySelector('.menu__item').offsetHeight);
		if (menu.querySelector('.menu__item').offsetHeight < 35) {
			menu.querySelectorAll('.menu__item').forEach(item => {
				item.style.height = '35px';
				item.classList.remove('menu__item_fixborder');
			})
		} else {
			menu.querySelectorAll('.menu__item').forEach(item => {
				item.style.height = '0px';
				item.classList.add('menu__item_fixborder');
			})
		}
	})
})









// вызов папича
document.querySelector('.menu__papich').addEventListener('click', function() {
	if (window.innerWidth <= 600) {
		this.parentNode.querySelectorAll('.menu__item').forEach(item => {
			item.style.height = '0px';
		})
	}
	if (game.isStarted) {
		if (!game.imbaCheck) {
			if (true) {
				game.IMBA();
				game.imbaCheck = true;
				return;
			}
		}
	}
})
