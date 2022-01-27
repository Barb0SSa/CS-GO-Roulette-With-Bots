const player = {
	name: 'Barb0SSa',						// имя
	img: 'images/profile1.jpg',				// картинка
	maxItems: 10,							// сколько вещей еще можно внести
	capital: 0,								// стоимость всех вещей в инвентаре
	items: 0,								// количество вещей в инвентаре
	type: 'Игрок',							// тип объекта
	inRound: false,							// учавствует ли в этом раунде
	inventory: createInventory2('Игрок'),	// инвентарь

	// возвращает массив для внесения вещей в игру и убирает вещи из инвентаря
	deposit() {
		if (game.gamers.length == 10 && this.inRound === false) {
			return;
		}
		let items = document.querySelector('.input__show-put').childNodes;
		if (items.length <= 0) {
			return false;
		} 
		let deposArr = []; // массив вещей для внесения в игру
		items.forEach(function(item) {
			let id = +item.getAttribute('data-id');
			let inventItem = player.inventory.find(wpn => wpn.id == id);
			if (inventItem === undefined) return false;
			if (player.maxItems == 0) return false;
			let wpn = deposArr.find(item => item.id == id);
			// если в массиве есть предмет
			if (wpn !== undefined) {
				wpn.value += 1;
				inventItem.value -= 1;
				player.maxItems -= 1;
			} else {
				let weapon = {...player.inventory.find(wpn => wpn.id == id)};
				weapon.value = 1;
				inventItem.value -= 1;
				player.maxItems -= 1;
				deposArr.push(weapon);
			}
			if (inventItem.value <= 0) {
				let index = player.inventory.findIndex(wpn => wpn.id == id);
				player.inventory.splice(index, 1);
			}
		})
		visual.setMaxItems();
		visual.input_close('.main__input');
		this.calcCapitalAndItems();
		game.deposit(this, deposArr);
	},
	// посчитать capital и items
	calcCapitalAndItems() {
		this.capital = 0;
		this.items = 0;
		let gamer = this;
		this.inventory.forEach(function(item, index, arr) {
			gamer.capital = ((gamer.capital * 10) + item.value * (item.count * 10)) / 10
			gamer.items += item.value;
		})
	},
	// получить выигрыш
	takePrize(arrItems) {
		arrItems.forEach(item => {
			let itemInInventory = this.inventory.find(weapon => weapon.id == item.id);
			// если вещь есть в инвентаре
			if (itemInInventory !== undefined) {
				itemInInventory.value += item.value;
			} else {
				this.inventory.push({...item});
			}
		})
		this.calcCapitalAndItems();
	}
}

player.calcCapitalAndItems();