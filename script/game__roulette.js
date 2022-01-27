const game = {
	gamers: [],				// все игроки, включая пользователя
	inGameBots: [],			// учавствующие боты
	unGameBots: [bomj1, bomj2, bomj3, bomj4, bomj5, rab1, rab2, rab3, rab4, rab5, major1, major2, major3, major4, major5],		// неучавствующие боты
	imba: [papich],			// имбы
	inGameInventory: [],	// инвентарь раунда
	value: 0,				// вещи за раунд
	sum: 0,					// сумма вещей за раунд в деньгах
	isStarted: false,		// флаг, начался ли раунд
	imbaCheck: false,		// вышла ли имба

	deposit(payer, itemAr, ms = 0) {
		let itemArr = [...itemAr];
		//console.log('-----------------');
		let gamer = this.gamers.find(gmr => gmr.name == payer.name);
		// если игрока нет в массиве - добавляем его
		if (gamer === undefined) {
			let newGamer = {
				obj: payer,			// ссылка на объект игрока
				name: payer.name,	// имя игрока
				items: [],			// внесенные в раунд вещи
				value: 0,			// количество внесенных вещей за раунд
				sum: 0,				// сумма внесения за раунд
				chance: 0			// шанс выигрыша
			};
			this.gamers.push(newGamer);
			payer.inRound = true;
			gamer = this.gamers[this.gamers.length - 1];
			// если gamer == Бот, то удаляем его из массива неИгровыхБотов и добавляем в ИгровыхБотов
			if (gamer.obj.type == 'Бомж' || gamer.obj.type == 'Работяга' || gamer.obj.type == 'Мажор') {
				let botIndex = this.unGameBots.findIndex(bot => bot.name == gamer.name);
				this.unGameBots.splice(botIndex, 1);
				this.inGameBots.push(gamer.obj);
			}
		}
		//
		itemArr.forEach(function(item, index, arr) {
			itemId = item.id;
			// проверяем, есть ли вещь этого типа в массиве депозита ИГРОКА
			if (gamer.items.find(item => item.id == itemId) !== undefined) {
				gamer.items.find(item => item.id == itemId).value += item.value;
			} else {
				// если вещи в массиве нет
				gamer.items.push({...item});	// добавляем в массив, уже с value
			}
			//	проверяем, есть ли вещь этого типа в массиве депозита ИГРЫ
			if (game.inGameInventory.find(item => item.id == itemId) !== undefined) {
				game.inGameInventory.find(item => item.id == itemId).value += item.value;
			} else {
				// если вещи в массиве нет
				game.inGameInventory.push({...item});	// добавляем в массив, уже с value
			}
			game.value += item.value;
			game.sum = ((game.sum * 10) + item.value * (item.count * 10)) / 10;
			gamer.value += item.value;
			gamer.sum = ((gamer.sum * 10) + item.value * (item.count * 10)) / 10;
		})
		if (this.gamers.length >= 2 && this.isStarted === false) {
			this.Round();
		}
		if (ms > 0) {
			setTimeout(() => {
				visual.deposit(gamer, itemArr);
				visual.info_progress_stat();
				this.calcChances();
			}, ms)
		} else {
			visual.deposit(gamer, itemArr);
			visual.info_progress_stat();
			this.calcChances();
		}
		if (gamer.obj.type == 'Игрок') {
			// вызвать функцию для отрисовки на странице
			visual.deposit_sidebar(itemArr);
			visual.sidebar_stat();
		}
	},
	// определяет, каким ботам надо вкинуть в игру вещи
	// !!! isStart - если это старт раунда
	botDeposit(isStart) {
		// numBots - количество ботов, которые вкинут вещи
		// numItems - их максимум вещей
		// проверка на превышение количества игроков
		// за раз максимум 4 бота
		
		let numBots;
		if (isStart) {
			numBots = 1;
			numItems = 10;
			bot = this.unGameBots[randomInteger(0, this.unGameBots.length - 1)];
			// если ботов больше нет
			if (bot === undefined || bot === null) {
				return;
			} 
			deposit = bot.botDeposit(numItems);
			this.deposit(bot, deposit);
			return;
		}
		// если раунд уже начат
		// если есть место для 4ех - берем 4 бота макс, если места для 4ех нет - то берем по максу

		// возможный максимум новых ботов
		const _maxNewBot = 10 - this.gamers.length;
		// массив ботов, которые могут вкинуть вещи
		const oldBots = this.inGameBots.filter(bot => bot.maxItems > 0);
		// сколько старых могут вкинуть вещи
		const _maxOldBot = oldBots.length;


		// ОПРЕДЕЛЕНИЕ СКОЛЬКО БОТОВ ВКИНУТСЯ

		// определяем, сколько старых и новых ботов вкинутся
		let numNewBots;
		let numOldBots;
		if (_maxNewBot < 1) {
			numNewBots = randomInteger(0, _maxNewBot);
		} else {
			numNewBots = randomInteger(0, 1);
		}
		if (_maxOldBot < 2) {
			numOldBots = randomInteger(0, _maxOldBot);
		} else {
			numOldBots = randomInteger(0, 2);
		}

		if (this.gamers.length < 10) {
			if (!this.imbaCheck) {
				let rndmImba = randomInteger(1, 100);
				//console.log('imba: ' + rndmImba);
				console.log('imba: ' + rndmImba);
				if (rndmImba <= 2) {
					this.IMBA();
					this.imbaCheck = true;
					if (numNewBots > 0) {
						numNewBots--;
					}
				}
			}
		}
		// сначала новые боты
		let i = 0;
		for (i = 0; i < numNewBots; i++) {
			let indexOfBot = randomInteger(0, this.unGameBots.length - 1);
			let deposit = this.unGameBots[indexOfBot].botDeposit();
			this.deposit(this.unGameBots[indexOfBot], deposit, i * 1500);
		}
		// потом старые боты
		for (let j = 0; j < numOldBots; j++) {
			let indexOfBot = randomInteger(0, oldBots.length - 1);
			let deposit = oldBots[indexOfBot].botDeposit();
			this.deposit(oldBots[indexOfBot], deposit, i * 1500 + j * 1500);
			// если бот больше не может вкинуть вещи - удаляем из массива
			if (oldBots[indexOfBot].maxItems == 0) {
				oldBots.splice(indexOfBot, 1);
			}
		}
	},
	// ввести имбу
	IMBA() {
		let imbaId = randomInteger(0, this.imba.length - 1);
		let deposit = this.imba[imbaId].imbaDeposit();
		this.deposit(this.imba[imbaId], deposit, 1500);
		papichIntro();
		document.querySelector('.' + this.imba[imbaId].sound).play();
	},
	// обнулить раунд
	clearRound() {
		document.querySelectorAll('.sound').forEach((item) => {
			item.pause();
			item.currentTime = 0.0;
		})
		this.unGameBots = [];
		[bomj1, bomj2, bomj3, bomj4, bomj5, rab1, rab2, rab3, rab4, rab5, major1, major2, major3, major4, major5].forEach(function(item) {
			if (item.status) {
				item.maxItems = 0;
				game.unGameBots.push(item);
			}
		})
		this.inGameBots = [];
		this.inGameInventory = [];
		this.imbaCheck = false;
		this.value = 0;
		this.sum = 0;
		this.isStarted = false;
		this.gamers = [];
		this.unGameBots.forEach(function(bot, index, arr) {
			bot.calcCapitalAndItems();
			if (bot.items >= 10) {
				bot.maxItems = 10;
			} else {
				bot.maxItems = bot.items;
			}
			if (bot.items == 0) {
				bot.status = false;
			}
		})
		document.querySelector('.input__btn').setAttribute('data-banned', 'false');
		roulette.start(document.querySelector('.gamebar__roulette'));
		hide('.gamebar__roulette');
		visual.timer(120000);
		setTimeout(function() {
			game.botDeposit(true);
		}, 3000);
		setTimeout(function() {
			game.botDeposit(true);
		}, 6000);
	},
	// начать раунд
	Round(clear) {
		if (clear) {
			this.isStarted = false;
			clearInterval(timer);
			clearInterval(bots);
			clearTimeout(clearTimer);
			clearTimeout(clearBots);
			return;
		}
		this.isStarted = true;
		let startTimer = Date.now();
		let valTimer = startTimer + 120100;
		// обновление таймера на странице
		timer = setInterval(function() {
			visual.timer(valTimer - Date.now());
		}, 1000)	//1000
		// периодичность вливания ботов
		bots = setInterval(function() {
			game.botDeposit();
		}, 15000)	//10000
		// остановить таймер
		clearTimer = setTimeout(function() {
			clearInterval(timer);
			game.getWinner();
		}, 120100);	 // 120500
		// остановить вливание ботов
		clearBots = setTimeout(function() {
			clearInterval(bots);
		}, 105100)	//100000
	},
	// посчитать шансы игроков
	calcChances() {
		// записать шансы в массив
		let arrChances = [];
		let bank = this.sum;
		this.gamers.forEach(function(gamer, index) {
			let chance = Math.floor(((gamer.sum * 10) / (bank * 10)) * 1000) / 10;
			arrChances.push(chance);
		})
		let sumChances = arrChances.reduce((sum, chance) => {return (sum + chance * 10)}, 0) / 10;

		// новая версия
		// докидываем разницу по 0.1 самым мелким
		let howMuch = 1000 - sumChances * 10;
		let arrChancesModified = [...arrChances];
		for (let i = 0; i < howMuch; i++) {
			let min = Math.min(...arrChancesModified);
			let indexOfMin = arrChancesModified.indexOf(min);
			min = (min * 10 + 1) / 10;
			arrChancesModified[indexOfMin] = 100;
			arrChances[indexOfMin] = min;
		}
		//
		sumChances = arrChances.reduce((sum, chance) => {return (sum + chance * 10)}, 0) / 10;
		game.gamers.forEach(function(gamer, index) {
			gamer.chance = arrChances[index];
		})
		visual.print_chances();
		visual.sidebar_stat();
	},
	// определение победителя
	getWinner() {
		document.querySelector('.input__btn').setAttribute('data-banned', 'true');
		let winner = chanceRandomizer(this.gamers, 1, 'index')[0];
		show('.gamebar__roulette');
		roulette.start(document.querySelector('.gamebar__roulette'));
		roulette.append(this.gamers, this.gamers[winner], document.querySelector('.gamebar__roulette'));
		const roundEnd = new Promise(function(resolve, reject) {
			// фаза прокрута
			setTimeout(() => {
				roulette.rollToWinner(document.querySelector('.gamebar__roulette'));
				setTimeout(() => {
					resolve();
				}, 10000)
			}, 2000)
		})
		roundEnd.then(() => {
			// фаза перехода в следующий раунд
			document.querySelectorAll('.sound').forEach((item) => {
				item.pause();
				item.currentTime = 0.0;
			})
			papichIntroEnd();
			this.gamers[winner].obj.takePrize(this.inGameInventory);
			roulette.start(document.querySelector('.gamebar__roulette'));
			hide('.gamebar__roulette');
			visual.printLastWinner(game.gamers[winner]);
			player.calcCapitalAndItems();
			if (player.items >= 10) {
				player.maxItems = 10;
			} else {
				player.maxItems = player.items;
			}
			visual.clearAll();
			let endTime = Date.now() + 10000;
			timerToNextRound = setInterval(() => {
				visual.timer(endTime - Date.now());
			}, 1000)
			setTimeout(() => {
				// начало следующего раунда
				clearInterval(timerToNextRound);
				game.clearRound();
			}, 10100)
		})
	}
}

// отрисовка таймера
let timer;
// активирование ботов
let bots;
// timeout остановки отрисовки таймера
let clearTimer;
// timeout остановки активирования ботов
let clearBots;
// таймер до следующего раунда
let timerToNextRound;