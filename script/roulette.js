// объект рулетки, в котором только механика самой рулетки(анимации, подгон размеров и т.п.)
const roulette = {
	width: 0,			// ширина рулетки
	item__width: 0,		// ширина одного элемента рулетки без margin 
	item__margin: 5,	// margin одного элемента рулетки
	center: 0,			// кол-во элементов, занимающих пол экрана(или на каком элементе надо сцентрировать рулетку)
	col: 0,				// сколько всего элементов рулетки видно на экране
	startArr: [{			// объект для начала работы
		name: "test",
		chance: 100,
		obj: {
			img: 'images/unknown.jpg',
		}
	}],
	winpos: 70,
	template__roulette: "<div class='gamebar__item'><img src='' alt='' class='gamebar__img'></div>",
	template__case: "<div class='gamebar__item'><img src='' alt='' class='gamebar__img'></div>",
	getItemWidth(container) {	// определение ширины одного элемента рулетки
		this.item__width = parseInt(container.querySelector('.gamebar__item').getBoundingClientRect().width);
		return;
	},
	// определить margin
	getMargin(container) {
		this.item__margin = parseInt(window.getComputedStyle(container.querySelector('.gamebar__item')).getPropertyValue("margin-right"));
	},
	getWidth(container) {	// определение ширины рулетки
		this.width = parseInt(container.getBoundingClientRect().width) - parseInt(getComputedStyle(container).paddingLeft) - parseInt(getComputedStyle(container).paddingRight);
		this.width = Math.floor(this.width * 100) / 100;
		return;
	},
	getCenter(container) {	// определение элемента по центру экрана
		// определяем сколько элементов рулетки видно
		let col = this.width / (this.item__width + this.item__margin + this.item__margin);
		this.col = col;
		// определяем, на каком элементе надо сцентрировать рулетку
		this.center = Math.ceil(col / 2);
	},
	align(container) {	// центрирование рулетки
		// определяем, какой отрицательный left нужно задать
		let left = (((this.item__width + this.item__margin + this.item__margin) * (this.center - 1)) + ((this.item__width + this.item__margin + this.item__margin) / 2)) - this.width/2;
		// задаем отрицательный left рулетки для центровки
		container.querySelector('.gamebar__roller').style.left = -left + 'px';
	},
	append(players, winner, container) {		// заполнение рулетки, 1арг - массив объектов игроков, 2арг - объект победителя
		// получаем массив с src 170ти изображений, раскинутых по шансам
		this.clear(container);
		let images = chanceRandomizer(players, 170);
		// вставляем 170 изображений из массива
		images.forEach((item) => {
			container.querySelector('.gamebar__roller').insertAdjacentHTML('beforeend', roulette.template__roulette);
			container.querySelector('.gamebar__roller').lastChild.querySelector('.gamebar__img').src = item;
		})
		// вставляем победителя вместо рандомного изображения на 121 место
		container.querySelectorAll('.gamebar__item')[this.winpos].querySelector('.gamebar__img').src = winner.obj.img;
		this.align(container);
	},
	start(container) {	// начало работы
		this.clear(container);
		container.querySelector('.gamebar__roller').classList.remove('gamebar__animate');
		roulette.append(this.startArr, this.startArr[0], container);
		roulette.getWidth(container);
		roulette.getMargin(container);
		roulette.getItemWidth(container);
		roulette.getCenter(container);
		roulette.align(container);
	},
	clear(container) {
		container.querySelector('.gamebar__roller').innerHTML = '';
	},
	rollToWinner(container) {	// анимированный переход к нужному элементу(в данном случае 121й)
		// даем рулетке transition
		container.querySelector('.gamebar__roller').classList.add('gamebar__animate');
		// определяем ширину одного элемента
		let elementWidth = this.item__width + (this.item__margin * 2);
		// расстояние до 121 элемента - пол элемента(для центровки) - ширина стартового экрана
		let left = (elementWidth * (this.winpos + 1)) - (elementWidth / 2) - (this.col * elementWidth) / 2;
		container.querySelector('.gamebar__roller').style.left = -left + 'px';
	},
}



// container - контейнер рулетки, нужен для того, чтобы использовать объект для кейсов и для рулетки