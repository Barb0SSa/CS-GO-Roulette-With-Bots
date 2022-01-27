// объект, управляющий отображением на странице
const visual = {
	player: player,
	bad: true,			// показывать вещи качества bad
	worn: true,			// показывать вещи качества worn
	normal: true,		// показывать вещи качества normal
	medium: true,		// показывать вещи качества medium
	high: true,			// показывать вещи качества high
	immortal: true,		// показывать вещи качества immortal
	sort: 'down',		// сортировать по цене вверх или вниз

	// собрать и показать меню внесения вещей
	// input-sale  -  продажи
	// main__input  -  внесение
	input_show(selector) {
		let container = document.querySelector(selector);
		container.querySelector('.input__choise').innerHTML = '';
		container.querySelector('.input__colDeposit').innerHTML = '0';
		container.querySelector('.input__valDeposit-span').innerHTML = '0';
		container.querySelector('.input__player-capital').innerHTML = player.capital;
		container.querySelector('.input__player-items').innerHTML = player.items;
		if (this.sort == 'up') {
			player.inventory.sort(function(item1, item2) {
				return item2.count - item1.count;
			})
		} else {
			player.inventory.sort(function(item1, item2) {
				return item1.count - item2.count;
			})
		}
		this.player.inventory.forEach(function(item, index, arr) {
			let htmlForAppend = `<div class="input__item input__item_${item.quality} weapon" data-tooltip="${item.name} | ${item.skin}" data-id="${item.id}" data-val="${item.value}" data-count="${item.count}"><img src="${item.img}" alt="${item.name} | ${item.skin}" class="input__img"><p class="input__count">${item.count} <i class="fa fa-money" aria-hidden="true"></i></p><p class="input__val">x${item.value}</p><div class="weapon__qual"></div></div>`; 
			container.querySelector('.input__choise').insertAdjacentHTML('beforeend', htmlForAppend);
			switch (item.quality) {
					case 'bad':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_b');
					break;
					case 'worn':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_w');
					break;
					case 'normal':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_n');
					break;
					case 'medium':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_m');
					break;
					case 'high':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_h');
					break;
					case 'secret':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_s');
					break;
					case 'immortal':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_i');
					break;	
				}
			container.querySelector('.input__choise').lastChild.addEventListener('click', function() {
				if (this.getAttribute('data-val') > 0) {
					let max = document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').getAttribute('data-maxitems');
					// проверяем не превышаем ли лимит в 10 вещей
					if (container.querySelector('.input__show-put').childNodes.length < +max) {
						container.querySelector('.input__show-put').insertAdjacentHTML('beforeend', this.outerHTML);
						this.setAttribute('data-val', +this.getAttribute('data-val') - 1);
						this.querySelector('.input__val').innerHTML = 'x' + this.getAttribute('data-val');
						if (+this.getAttribute('data-val') == 0) {
							this.querySelector('.input__val').style.color = 'red';
						} else {
							this.querySelector('.input__val').style.color = 'white';
						}
						container.querySelector('.input__colDeposit').innerHTML = container.querySelector('.input__show-put').childNodes.length;
						container.querySelector('.input__valDeposit-span').innerHTML = (+container.querySelector('.input__valDeposit-span').innerHTML + +this.getAttribute('data-count')).toFixed(1);
						container.querySelector('.input__show-put').lastChild.querySelector('.input__val').remove();
						container.querySelector('.input__show-put').lastChild.classList.remove('input__item');
						container.querySelector('.input__show-put').lastChild.classList.add('input__deposit-item');
						container.querySelector('.input__show-put').lastChild.removeAttribute('data-tooltip');
						container.querySelector('.input__show-put').lastChild.addEventListener('click', function() {
							container.querySelector('.input__valDeposit-span').innerHTML = (+container.querySelector('.input__valDeposit-span').innerHTML - +this.getAttribute('data-count')).toFixed(1);
							container.querySelector(`.input__item[data-id="${+this.getAttribute('data-id')}"]`).setAttribute('data-val', +container.querySelector(`.input__item[data-id="${+this.getAttribute('data-id')}"]`).getAttribute('data-val') + 1)
							container.querySelector(`.input__item[data-id="${+this.getAttribute('data-id')}"]`).querySelector('.input__val').innerHTML = 'x' + container.querySelector(`.input__item[data-id="${+this.getAttribute('data-id')}"]`).getAttribute('data-val');
							container.querySelector(`.input__item[data-id="${+this.getAttribute('data-id')}"]`).querySelector('.input__val').style.color = 'white';
							this.remove();
							container.querySelector('.input__colDeposit').innerHTML = container.querySelector('.input__show-put').childNodes.length;
						})
					} else {
						console.log(container.querySelector('.input__show-put').childNodes.length);
						alert('Максимум 10 вещей!');
					}
				}
			})
		})
		this.sortInventory();
		show(selector);
	},
	// показать окно продаж
	inputSale_show() {
		console.log('new function')
		// для удобства
		let container = document.querySelector('.input-sale');
		// очищаем все поля
		container.querySelector('.input__choise').innerHTML = '';
		container.querySelector('.input__colDeposit').innerHTML = '';
		container.querySelector('.input__valDeposit-span').innerHTML = '0';
		container.querySelector('.input__player-capital').innerHTML = player.capital;
		container.querySelector('.input__player-items').innerHTML = player.items;
		// сортировка
		if (this.sort == 'up') {
			player.inventory.sort(function(item1, item2) {
				return item2.count - item1.count;
			})
		} else {
			player.inventory.sort(function(item1, item2) {
				return item1.count - item2.count;
			})
		}
		// отрисовка вещей
		this.player.inventory.forEach(function(item, index, arr) {
			let htmlForAppend = `<div class="input__item input__item_${item.quality} weapon" data-tooltip="${item.name} | ${item.skin}" data-id="${item.id}" data-val="${item.value}" data-count="${item.count}"><img src="${item.img}" alt="${item.name} | ${item.skin}" class="weapon__img"><p class="weapon__count">${item.count} <i class="fa fa-money" aria-hidden="true"></i></p><div class="weapon__qual"></div></div>`; 
			for (let i = 0; i < item.value; i++) {
				container.querySelector('.input__choise').insertAdjacentHTML('beforeend', htmlForAppend);
				switch (item.quality) {
					case 'bad':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_b');
					break;
					case 'worn':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_w');
					break;
					case 'normal':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_n');
					break;
					case 'medium':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_m');
					break;
					case 'high':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_h');
					break;
					case 'secret':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_s');
					break;
					case 'immortal':
						container.querySelector('.input__choise').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_i');
					break;	
				}
				container.querySelector('.input__choise').lastChild.addEventListener('click', function() {
					if (this.classList.contains('weapon__selected')) {
						this.classList.remove('weapon__selected');
						// вычитаем цену предмета из суммы
						container.querySelector('.input__valDeposit-span').innerHTML = Math.round((+container.querySelector('.input__valDeposit-span').innerHTML - (+this.dataset.count)) * 10) / 10;
					} else {
						this.classList.add('weapon__selected');
						// добавляем цену предмета к сумме
						container.querySelector('.input__valDeposit-span').innerHTML = Math.round((+container.querySelector('.input__valDeposit-span').innerHTML + (+this.dataset.count)) * 10) / 10; 
					}
				})
			};
		});
		// показывает окно продажи
		show('.input-sale');
	},
	// показать окно подтверждения продажи
	inputSale_confirm() {
		hide('.input-sale');
		document.querySelector('.confirm-sale__items').innerHTML = '';
		document.querySelector('.confirm-sale__val').innerHTML = '0';
		let sum = 0;
		// отрисовка всех вещей для продажи на страницу подтверждения
		document.querySelectorAll('.weapon__selected').forEach(function(item) {
			sum = Math.round((sum + +item.dataset.count) * 10) / 10;
			let weapon = item.cloneNode(true);
			console.log(weapon);
			console.log(item);
			document.querySelector('.confirm-sale__items').appendChild(weapon);
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('input__item');
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('weapon__selected');
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('input__item_bad');
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('input__item_worn');
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('input__item_normal');
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('input__item_medium');
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('input__item_high');
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('input__item_secret');
			document.querySelector('.confirm-sale__items').lastChild.classList.remove('input__item_immortal');
			document.querySelector('.confirm-sale__items').lastChild.classList.add('confirm-sale__item');
		}) 
		document.querySelector('.confirm-sale__val').innerHTML = sum + '<i class="fa fa-money" aria-hidden="true"></i>';
		show('.confirm-sale');
	},
	// изменить выбранные вещи для продажи
	inputSale_change() {
		hide('.confirm-sale');
		show('.input-sale');	
	},
	// очистить и закрыть меню внесения вещей
	input_close(selector) {
		let container = document.querySelector(selector);
		container.querySelector('.input__valDeposit-span').innerHTML = 0;
		container.querySelector('.input__colDeposit').innerHTML = 0;
		container.querySelector('.input__show-put').innerHTML = '';
		hide(selector);
	},
	//	установка максимального количества вещей(в data) для депозита и изменение внешнего вида кнопки депозита 
	setMaxItems() {
		document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').setAttribute('data-maxitems', player.maxItems);
		if (player.maxItems <= 0) {
			document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').classList.add('sidebar__put-button_disabled');
			document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').innerHTML = 'Ждите...';
		} else {
			document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').classList.remove('sidebar__put-button_disabled');
			document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').innerHTML = 'Внести';
		}
	},
	// отрисовка депозита в логе
	deposit(payer, itemArr) {
		document.querySelector('.sounds__deposit').play();
		let sum = 0;
		let count = 0;
		itemArr.forEach(function(item) {
			sum += item.value * item.count;
			count += item.value;
		})
		sum = Math.round(sum * 10) / 10;
		let dopClass = '';
		//console.log(payer);
		if (payer.obj.type == 'Имба') {
			dopClass = ' log__deposit_papich';
		}
		let html = `<div class="log__deposit ${dopClass}" style="height: 0px"><div class="log__player"><img src="${payer.obj.img}" alt="${payer.name}" class="log__logo"><p class="log__nickname">${payer.name}</p><div class="log__value"><span class="log__val">${sum}</span><i class="fa fa-money" aria-hidden="true"></i></div></div><div class="log__items"></div></div>`;
		document.querySelector('.log__inner').insertAdjacentHTML('afterbegin', html);
		itemArr.forEach(function(item) {
			let qual = '';
			switch (item.quality) {
				case 'bad':
					qual = 'weapon__qual_b';
				break;
				case 'worn':
					qual = 'weapon__qual_w';
				break;
				case 'normal':
					qual = 'weapon__qual_n';
				break;
				case 'medium':
					qual = 'weapon__qual_m';
				break;
				case 'high':
					qual = 'weapon__qual_h';
				break;
				case 'secret':
					qual = 'weapon__qual_s';
				break;
				case 'immortal':
					qual = 'weapon__qual_i';
				break;
			}
			let weaponHTML = `<div class="log__item weapon" data-tooltip="${item.name + ' | ' + item.skin}"><img src="${item.img}" alt="${item.name + ' | ' +  item.skin}" class="weapon__img"><p class="weapon__count">${item.count}<i class="fa fa-money" aria-hidden="true"></i></p><div class="weapon__qual ${qual}"></div></div>`;
			for (let i = 0; i < item.value; i++) {
				document.querySelector('.log__inner').firstChild.querySelector('.log__items').insertAdjacentHTML('beforeend', weaponHTML);
			}
		})
		document.querySelector('.log__inner').firstChild.style.height = `${document.querySelector('.log__inner').firstChild.scrollHeight}px`;
	},
	// отрисовка вещей в sidebar'е
	deposit_sidebar(itemArr) {
		itemArr.forEach(function(item) {
			let weaponHTML = `<div class="sidebar__item" data-tooltip="${item.name + ' | ' + item.skin}"><img src="${item.img}" alt="${item.name + ' | ' +  item.skin}" class="sidebar__item-img"><p class="sidebar__count">${item.count}<i class="fa fa-money" aria-hidden="true"></i></p><p class="sidebar__col">x${item.value}</p></div>`;
			document.querySelector('.main__sidebar').querySelector('.sidebar__items').insertAdjacentHTML('beforeend', weaponHTML);
			document.querySelector('.cases__sidebar').querySelector('.sidebar__items').insertAdjacentHTML('beforeend', weaponHTML);
		})
	},
	// отрисовка информации игрока в сайдбаре, isFirst - флаг для использования в начале, пока еще нет объекта game
	sidebar_stat(isFirst) {
		if (isFirst) {
			document.querySelector('.main__sidebar').querySelector('.sidebar__name').innerHTML = player.name;
			document.querySelector('.cases__sidebar').querySelector('.sidebar__name').innerHTML = player.name;
			hideAll('.sidebar__quant');
			hideAll('.sidebar__money');
			hideAll('.sidebar__value');
			return;
		}
		let playerInGame = game.gamers.find(plr => plr.name == player.name);
		if (playerInGame !== undefined) {
			document.querySelector('.main__sidebar').querySelector('.sidebar__name').innerHTML = player.name;
			document.querySelector('.main__sidebar').querySelector('.sidebar__quant').innerHTML = playerInGame.chance + '%';
			document.querySelector('.main__sidebar').querySelector('.sidebar__money-val').innerHTML = playerInGame.sum;
			document.querySelector('.main__sidebar').querySelector('.sidebar__val').innerHTML = playerInGame.value;
			document.querySelector('.cases__sidebar').querySelector('.sidebar__name').innerHTML = player.name;
			document.querySelector('.cases__sidebar').querySelector('.sidebar__quant').innerHTML = playerInGame.chance + '%';
			document.querySelector('.cases__sidebar').querySelector('.sidebar__money-val').innerHTML = playerInGame.sum;
			document.querySelector('.cases__sidebar').querySelector('.sidebar__val').innerHTML = playerInGame.value;
			showAll('.sidebar__quant');
			showAll('.sidebar__money');
			showAll('.sidebar__value');
		} else {
			hideAll('.sidebar__quant');
			hideAll('.sidebar__money');
			hideAll('.sidebar__value');
		}
	},
	// отрисовка прогрессбара с вещами, isFirst - флаг для использования в начале, пока еще нет объекта game
	info_progress_stat(clear) {
		if (clear) {
			document.querySelector('.info__bank-value').innerHTML = '0';
			document.querySelector('.info__progress').querySelector('p').innerHTML = '0/100';
			document.querySelector('.info__progress').querySelector('span').style.width = '0%';
			return;
		}
		document.querySelector('.info__bank-value').innerHTML = game.sum;
		document.querySelector('.info__progress').querySelector('p').innerHTML = `${game.value}/100`;
		document.querySelector('.info__progress').querySelector('span').style.width = `${game.value}%`;
	},
	// отрисовать шансы
	print_chances() {
		document.querySelector('.bar__inner').innerHTML = '';
		game.gamers.forEach(function(gamer) {
			let html = `<div class="bar__item"><img src="${gamer.obj.img}" alt="profile" class="bar__img"><div class="bar__chance-wrapper"><p class="bar__chance">${gamer.chance + '%'}</p></div></div>`;
			document.querySelector('.bar__inner').insertAdjacentHTML('beforeend', html);
		})
	},
	// отрисовка таймера, time - текущее время в милисекундах, которое преобразуется в формат минуты:секунды
	timer(time) {
		let minutes = '' + Math.floor(time / 60000);
		let seconds = '' + Math.floor((time % 60000) / 1000);
		if (minutes <= 0) {
			if (seconds <= 5 && seconds >=0) {
				document.querySelector('.info__timer').classList.add('info__timer_red');
				document.querySelectorAll('.sidebar__timer').forEach(item => {item.classList.add('sidebar__timer_red')});
				document.querySelector('.sounds__timer').play();
			} else {
				document.querySelector('.info__timer').classList.remove('info__timer_red');
				document.querySelectorAll('.sidebar__timer').forEach(item => {item.classList.remove('sidebar__timer_red')});
			}
		} else {
			document.querySelector('.info__timer').classList.remove('info__timer_red');
			document.querySelectorAll('.sidebar__timer').forEach(item => {item.classList.remove('sidebar__timer_red')});
		}
		if (minutes <= 0) {
			minutes = '00';
		}
		if (seconds <= 0) {
			seconds = '00';
		}
		if (minutes.length == 1) {
			minutes = '0' + minutes;
		}
		if (seconds.length == 1) {
			seconds = '0' + seconds;
		}
		document.querySelector('.info__min').innerHTML = minutes;
		document.querySelector('.info__sec').innerHTML = seconds;
		document.querySelector('.main__sidebar').querySelector('.sidebar__min').innerHTML = minutes;
		document.querySelector('.main__sidebar').querySelector('.sidebar__sec').innerHTML = seconds;
		document.querySelector('.cases__sidebar').querySelector('.sidebar__min').innerHTML = minutes;
		document.querySelector('.cases__sidebar').querySelector('.sidebar__sec').innerHTML = seconds;
	},
	// показать состояние ботов
	showBots() {
		let botsArr = [bomj1, bomj2, bomj3, bomj4, bomj5, rab1, rab2, rab3, rab4, rab5, major1, major2, major3, major4, major5];
		document.querySelector('.bots__stat').innerHTML = '';
		botsArr.forEach(function(bot, index) {
			let html = `<li class="bots__item"><div class="bots__name">${bot.name}</div><div class="bots__items">${bot.items + 'в.'}</div><div class="bots__bank">${bot.capital} <i class="fa fa-money" aria-hidden="true"></i></div></li>`;
			document.querySelector('.bots__stat').insertAdjacentHTML('beforeend', html);
		})
		document.querySelector('.bots').classList.add('showed');
		document.querySelector('.bots').style.top = '0';
	},
	// показать правила
	showRules() {
		document.querySelector('.rules').classList.add('showed');
		document.querySelector('.rules').style.top = '0';
	},
	// отрисовка последнего победителя, winner - объект победителя ИЗ GAME.GAMERS
	printLastWinner(winner) {
		if (document.querySelector('.lastround').style.display == 'none') {
			document.querySelector('.lastround').style.display = 'flex';
		}
		document.querySelector('.lastround__img').setAttribute('src', winner.obj.img);
		document.querySelector('.lastround__name').innerHTML = winner.name;
		document.querySelector('.lastround__chance-value').innerHTML = winner.chance + '%';
		document.querySelector('.lastround__bank-value').innerHTML = game.sum;
		document.querySelector('.lastround__colitems-value').innerHTML = game.value;
		document.querySelector('.lastround__items').innerHTML = '';
		game.inGameInventory.forEach(function(item) {
			let html = `<div class="weapon lastround__item" data-tooltip="${item.name + ' | ' + item.skin}"><img src="${item.img}" alt="${item.name + ' | ' + item.skin}" class="weapon__img"><p class="weapon__count">${item.count}<i class="fa fa-money" aria-hidden="true"></i></p><p class="lastround__val">${'x' + item.value}</p><div class="weapon__qual"></div></div>`;
			document.querySelector('.lastround__items').insertAdjacentHTML('beforeend', html);
			switch (item.quality) {
				case 'bad':
					document.querySelector('.lastround__items').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_b');
				break;
				case 'worn':
					document.querySelector('.lastround__items').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_w');
				break;
				case 'normal':
					document.querySelector('.lastround__items').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_n');
				break;
				case 'medium':
					document.querySelector('.lastround__items').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_m');
				break;
				case 'high':
					document.querySelector('.lastround__items').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_h');
				break;
				case 'secret':
					document.querySelector('.lastround__items').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_s');
				break;
				case 'immortal':
					document.querySelector('.lastround__items').lastChild.querySelector('.weapon__qual').classList.add('weapon__qual_i');
				break;
			}
		})
	},
	// очистить все для следующего раунда
	clearAll() {
		// очистить депозиты
		document.querySelector('.log__inner').innerHTML = '';
		// очистить депозиты в сайдбаре
		document.querySelector('.main__sidebar').querySelector('.sidebar__items').innerHTML = '';
		document.querySelector('.cases__sidebar').querySelector('.sidebar__items').innerHTML = '';
		// очистить кнопку в сайдбаре
		document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').classList.remove('sidebar__put-button_disabled');
		document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').innerHTML = 'Внести';
		document.querySelector('.main__sidebar').querySelector('.sidebar__put-button').setAttribute('data-maxitems', player.maxItems);
		// очистить стату в сайдбаре
		this.sidebar_stat(true);
		// очистить шансбар
		document.querySelector('.bar__inner').innerHTML = '';
		// сбросить прогресс бар
		this.info_progress_stat(true);
		// сбросить счетчик банка
		document.querySelector('.info__bank-value').innerHTML = '0';
	},
	// сортировка инвентаря
	sortInventory() {
		let badItems = document.getElementsByClassName('input__item_bad');
		let wornItems = document.getElementsByClassName('input__item_worn');
		let normalItems = document.getElementsByClassName('input__item_normal');
		let mediumItems = document.getElementsByClassName('input__item_medium');
		let highItems = document.getElementsByClassName('input__item_high');
		let secretItems = document.getElementsByClassName('input__item_secret');
		let immortalItems = document.getElementsByClassName('input__item_immortal');
		if (this.bad) {
			for (let i = 0; i < badItems.length; i++) {
				badItems[i].style.display = 'flex';
			}
		} else {
			for (let i = 0; i < badItems.length; i++) {
				badItems[i].style.display = 'none';
			}
		}
		if (this.worn) {
			for (let i = 0; i < wornItems.length; i++) {
				wornItems[i].style.display = 'flex';
			}
		} else {
			for (let i = 0; i < wornItems.length; i++) {
				wornItems[i].style.display = 'none';
			}
		}
		if (this.normal) {
			for (let i = 0; i < normalItems.length; i++) {
				normalItems[i].style.display = 'flex';
			}
		} else {
			for (let i = 0; i < normalItems.length; i++) {
				normalItems[i].style.display = 'none';
			}
		}
		if (this.medium) {
			for (let i = 0; i < mediumItems.length; i++) {
				mediumItems[i].style.display = 'flex';
			}
		} else {
			for (let i = 0; i < mediumItems.length; i++) {
				mediumItems[i].style.display = 'none';
			}
		}
		if (this.high) {
			for (let i = 0; i < highItems.length; i++) {
				highItems[i].style.display = 'flex';
			}
		} else {
			for (let i = 0; i < highItems.length; i++) {
				highItems[i].style.display = 'none';
			}
		}
		if (this.secret) {
			for (let i = 0; i < secretItems.length; i++) {
				secretItems[i].style.display = 'flex';
			}
		} else {
			for (let i = 0; i < secretItems.length; i++) {
				secretItems[i].style.display = 'none';
			}
		}
		if (this.immortal) {
			for (let i = 0; i < immortalItems.length; i++) {
				immortalItems[i].style.display = 'flex';
			}
		} else {
			for (let i = 0; i < immortalItems.length; i++) {
				immortalItems[i].style.display = 'none';
			}
		}
	},
	// сохранить настройки сортировки
	saveSortInventory(containerSelector) {
		this.sort = document.querySelector('.settings__sort-switch').getAttribute('data-sort');
		if (document.querySelector('.settings__bad').checked) {
			this.bad = true;
		} else {
			this.bad = false;
		}
		if (document.querySelector('.settings__worn').checked) {
			this.worn = true;
		} else {
			this.worn = false;
		}
		if (document.querySelector('.settings__normal').checked) {
			this.normal = true;
		} else {
			this.normal = false;
		}
		if (document.querySelector('.settings__medium').checked) {
			this.medium = true;
		} else {
			this.medium = false;
		}
		if (document.querySelector('.settings__high').checked) {
			this.high = true;
		} else {
			this.high = false;
		}
		if (document.querySelector('.settings__secret').checked) {
			this.secret = true;
		} else {
			this.secret = false;
		}
		if (document.querySelector('.settings__immortal').checked) {
			this.immortal = true;
		} else {
			this.immortal = false;
		}
		document.querySelector('.main__input .input__show-put').innerHTML = '';
		document.querySelector('.main__input .input__valDeposit-span').innerHTML = '0';
		this.input_show('.main__input');
	},
	// показать баланс для кейсов
	print_balance() {
		document.querySelector('.cases__balance-val').innerHTML = cases.balance;
	}
}