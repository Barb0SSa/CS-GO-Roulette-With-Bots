/* ===================== КЛАССЫ =======================*/
class Bot {
	constructor(options) {
		this.name = options.name;
		this.img = options.img;
		this.status = true;
		this.capital = 0;
		this.items = 0;
		this.inRound = false;
		this.maxItems = 10;
	}
	// посчитать capital и items
	calcCapitalAndItems() {
		this.capital = 0;
		this.items = 0;
		let gamer = this;
		this.inventory.forEach(function(item, index, arr) {
			gamer.capital = ((gamer.capital * 10) + item.value * (item.count * 10)) / 10
			gamer.items += item.value;
		})
		if (this.capital == 0) {
			this.status = false;
		}
	}
	// сам определяет рандомно, какие вещи и сколько вкинет, от 1 до 7 вещей(определяет setting), max - сколько вещей еще можно передать
	botDeposit() {
		//console.log(this.name);
		let max = this.maxItems;
		let setting = 5;
		// colItems - сколько вещей в итоге передастся
		let colItems;
		// если максимум меньше setting, то берем от 1 до max
		if (max < setting) {
			colItems = randomInteger(1, max);
		} else {	// если максимум больше или равен setting, то берем от 1 до setting
			colItems = randomInteger(1, setting);
		}
		// если максимум 2 или меньше - передаем все, сколько можно
		if (max <= 2) {
			colItems = max;
		}
		// массив вещей, который бот будет передавать
		let arrItems = [];
		while (colItems > 0) {
			// берем рандомный индекс вещи
			let randomIndex = randomInteger(0, this.inventory.length - 1);
			// удалить из инвентаря, вычесть количество из colItems, добавить в передаваемый массив
			this.inventory[randomIndex].value -= 1;
			let itemInArrItems = arrItems.find(item => this.inventory[randomIndex].id == item.id);
			if (itemInArrItems === undefined) {
				let weapn = {...this.inventory[randomIndex]}
				weapn.value = 1;	
				arrItems.push(weapn);
			} else {
				itemInArrItems.value += 1;
			}
			// удаляем объект вещи из инвентаря, если вещей больше нет
			if (this.inventory[randomIndex].value <= 0) {
				this.inventory.splice(randomIndex, 1);
			}
			this.maxItems -= 1;
			colItems -= 1;
		}
		this.calcCapitalAndItems();
		return [...arrItems];
	}
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
// бомж
class Bomj extends Bot {
	constructor(options) {
		super(options);
		this.type = 'Бомж';
		this.inventory = createInventory2('Бомж');
	}
}
// работяга
class Rabotyaga extends Bot {
	constructor(options) {
		super(options);
		this.type = 'Работяга';
		this.inventory = createInventory2('Работяга');
	}
}
// мажор
class Major extends Bot {
	constructor(options) {
		super(options);
		this.type = 'Мажор';
		this.inventory = createInventory2('Мажор');
	}
}

//имба
class Imba extends Bot {
	constructor(options) {
		super(options);
		this.type = 'Имба';
		this.sound = options.sound;
		this.inventory = createInventory2('Имба');
	}

	imbaDeposit() {
		let colItems = 10;
		let arrItems = [];
		while (colItems > 0) {
			// берем рандомный индекс вещи
			let randomIndex = randomInteger(0, this.inventory.length - 1);
			
			// удалить из инвентаря, вычесть количество из colItems, добавить в передаваемый массив
			this.inventory[randomIndex].value -= 1;
			let itemInArrItems = arrItems.find(item => this.inventory[randomIndex].id == item.id);
			if (itemInArrItems === undefined) {
				let weapn = {...this.inventory[randomIndex]}
				weapn.value = 1;	
				arrItems.push(weapn);
			} else {
				itemInArrItems.value += 1;
			}
			// удаляем объект вещи из инвентаря, если вещей больше нет
			if (this.inventory[randomIndex].value <= 0) {
				this.inventory.splice(randomIndex, 1);
			}
			this.maxItems -= 1;
			colItems -= 1;
		}
		this.calcCapitalAndItems();
		return [...arrItems];
	}

	takePrize(arrItems) {
		this.inventory.forEach(item => {
			item.value = 100;
		})
	}
}

//[bomj1, bomj2, bomj3, bomj4, bomj5, rab1, rab2, rab3, rab4, rab5, major1, major2, major3, major4, major5]
//['Олег', 'Сифон', 'Иваныч', 'Митрич', 'Алкаш', 'Дудь', 'Соболев', 'Хованский', 'Ларин', 'Навальный', 'Илон Маск', 'Джефф Безос', 'Билл Гейтс', 'Марк Цукерберг', 'Путин']

/*====================== БОТЫ =========================*/

const bomj1 = new Bomj({
	name: 'Олег',
	img: 'images/bots/bomj1.jpg'
})
const bomj2 = new Bomj({
	name: 'Сифон',
	img: 'images/bots/bomj5.jpg'
})
const bomj3 = new Bomj({
	name: 'Иваныч',
	img: 'images/bots/bomj3.jpg'
})
const bomj4 = new Bomj({
	name: 'Митрич',
	img: 'images/bots/bomj4.jpg'
})
const bomj5 = new Bomj({
	name: 'Алкаш',
	img: 'images/bots/bomj2.jpg'
})

const rab1 = new Rabotyaga({
	name: 'Дудь',
	img: 'images/bots/dud.jpg'
})
const rab2 = new Rabotyaga({
	name: 'Соболев',
	img: 'images/bots/Sobolev.jpg'
})
const rab3 = new Rabotyaga({
	name: 'Хованский',
	img: 'images/bots/Hova.jpg'
})
const rab4 = new Rabotyaga({
	name: 'Ларин',
	img: 'images/bots/Larin.jpg'
})
const rab5 = new Rabotyaga({
	name: 'Навальный',
	img: 'images/bots/Navalny.jpg'
})

const major1 = new Major({
	name: 'Илон Маск',
	img: 'images/bots/Elon.jpg'
})
const major2 = new Major({
	name: 'Джефф Безос',
	img: 'images/bots/Jeff.jpg'
})
const major3 = new Major({
	name: 'Билл Гейтс',
	img: 'images/bots/Bill.jpg'
})
const major4 = new Major({
	name: 'Марк Цукерберг',
	img: 'images/bots/Mark.jpg'
})
const major5 = new Major({
	name: 'Путин',
	img: 'images/bots/Putin.jpg'
})

const papich = new Imba({
	name: 'Папич',
	img: 'images/bots/Papich.jpg',
	sound: 'sounds__papich'
})


/*=====================================================*/