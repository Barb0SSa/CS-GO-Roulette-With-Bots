//рандом
function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

//рандом по шансам с десятой долей, arra - массив объектов с полем chance, count - сколько раз надо срандомить, type = index || img - тип того, что надо вернуть
function chanceRandomizer(arra, count, type = 'img') {
	let arr = [];
	let result = [];
	if (type == 'img') {
		arra.forEach(function(item) {
			for (let j = 0; j < item.chance * 10; j++) {
				arr.push(item.obj.img);
			}
		})
	} else if (type == 'index') {
		arra.forEach(function(item, index) {
			for (let j = 0; j < item.chance * 10; j++) {
				arr.push(index);
			}
		})
	}
	for (let i = 0; i < count; i++) {
		let random = randomInteger(0, arr.length - 1);
		result.push(arr[random]);
	}
	return result;
}

// скрыть
function hide(selector) {
	document.querySelector(selector).style.display = 'none';
}
// показать
function show(selector) {
	document.querySelector(selector).style.display = 'flex';
}
// скрыть все
function hideAll(selector) {
	document.querySelectorAll(selector).forEach((item) => {
		item.style.display = 'none'
	})
}
// показать все
function showAll(selector) {
	document.querySelectorAll(selector).forEach((item) => {
		item.style.display = 'flex'
	})
}
//скрывает активный slide(main__inner)
function hideActive() {
	if (document.querySelector('.header__right-menu .menu__item_active').classList.contains('menu__roulette')) {
		document.querySelector('.roulette').style.position = 'absolute';
		document.querySelector('.roulette').style.left = '100vw';
		document.querySelector('.header__right-menu .menu__item_active').classList.remove('menu__item_active');
	} else if (document.querySelector('.header__right-menu .menu__item_active').classList.contains('menu__cases')) {
		document.querySelector('.cases').style.position = 'absolute';
		document.querySelector('.cases').style.left = '100vw';
		document.querySelector('.header__right-menu .menu__item_active').classList.remove('menu__item_active');
	}
}
//показывает активный slide(menu__inner)
function showActive() {
	if (document.querySelector('.header__right-menu .menu__item_active').classList.contains('menu__roulette')) {
		document.querySelector('.roulette').style.position = 'relative';
		document.querySelector('.roulette').style.left = '0';
	} else if (document.querySelector('.header__right-menu .menu__item_active').classList.contains('menu__cases')) {
		document.querySelector('.cases').style.position = 'relative';
		document.querySelector('.cases').style.left = '0';
	}
}
//определяет инвентарь любого бота
function createInventory(type) {
	const weapArr = [];
	const permission = [];
	let val = 0;
	switch (type) {
		case 'Бомж':
			permission.push('bad');
			val = 3;
		break;
		case 'Работяга':
			permission.push('bad');
			permission.push('medium');
			val = 2;
		break;
		case 'Мажор':
			permission.push('bad');
			permission.push('medium');
			permission.push('high');
			permission.push('immortal');
			val = 1;
		break;
		case 'Игрок':
			permission.push('bad');
			permission.push('medium');
			permission.push('high');
			val = 1;
		break;
		case 'Имба':
			permission.push('immortal');
			val = 100;
		break;
	}
	weapons.forEach(function(item) {
		if (permission.indexOf(item.quality) != -1) {
			let wepn = {...item};
			let randVal;
			if (type == 'Игрок') {
				randVal = randomInteger(0, 1);
			} else {
				randVal = randomInteger(0, val);
			}
			if (randVal > 0) {
				wepn.value = randVal;
				weapArr.push(wepn);
			}
		}
	})
	return weapArr;
}

function createInventory2(type) {
	const weapArr = [];
	const permission = [];
	let val = 0;
	switch (type) {
		case 'Бомж':
			permission.push('bad');
			permission.push('worn');
			val = 20;
		break;
		case 'Работяга':
			permission.push('bad');
			permission.push('worn');
			permission.push('normal');
			permission.push('medium');
			val = 35;
		break;
		case 'Мажор':
			permission.push('worn');
			permission.push('normal');
			permission.push('medium');
			permission.push('high');
			permission.push('secret');
			val = 50;
		break;
		case 'Игрок':
			permission.push('bad');
			permission.push('worn');
			permission.push('normal');
			permission.push('medium');
			permission.push('high');
			val = 30;
		break;
		case 'Имба':
			permission.push('secret');
			permission.push('immortal');
			val = 100;
		break;
	}
	let permWeap = [];
	permission.forEach(qual => {
		let permArr = weapons.filter(item => item.quality == qual);
		permWeap.push(...permArr);
	})
	if (permWeap.findIndex(item => item.id == 1371) > -1) {
		permWeap.splice(permWeap.findIndex(item => item.id == 1371), 1);
	}
	for (let i = 0; i < val; i++) {
		let randIndex = randomInteger(0, permWeap.length - 1);
		if (weapArr.find(item => item.id == permWeap[randIndex].id) === undefined) {
			weapArr.push({...permWeap[randIndex]});
			weapArr[weapArr.length - 1].value = 1;
		} else {
			weapArr.find(item => item.id == permWeap[randIndex].id).value = weapArr.find(item => item.id == permWeap[randIndex].id).value + 1;
		}
	}
	console.log('val = ' + val);
	console.log(weapArr);
	return weapArr;
}

// папич
function papichIntro() {
	document.querySelector('body').classList.add('papich');	
}
// конец
function papichIntroEnd() {
	document.querySelector('body').classList.remove('papich');	
}