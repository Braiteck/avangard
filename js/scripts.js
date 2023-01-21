$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	$('.window_production .item .btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$('.window_production .item .btn').removeClass('active')
			$(this).toggleClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		} else {
			$('.window_production .item .btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(e => {
		if ($(e.target).closest('.window_production .item').length === 0) {
			$('.window_production .item .btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Новости
	const newsSliders = []

	$('.news .swiper').each(function (i) {
		$(this).addClass('news_s' + i)

		let options = {
			loop: true,
			speed: 500,
			slidesPerView: 1,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 63
				},
				768: {
					spaceBetween: 63
				},
				1280: {
					spaceBetween: 63
				}
			}
		}

		newsSliders.push(new Swiper('.news_s' + i, options))
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		if (!$('.mob_header .mob_menu_btn').hasClass('active')) {
			$('.mob_header .mob_menu_btn').addClass('active')
			$('header').fadeIn(300)
		} else {
			$('.mob_header .mob_menu_btn').removeClass('active')
			$('header').fadeOut(200)
		}
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline'
		}])
	})
})



$(window).on('load', () => {
	// Фикс. шапка
	mobHeaderInit = true,
		mobHeaderHeight = $('.mob_header').outerHeight()

	$('.mob_header').wrap('<div class="mob_header_wrap"></div>')
	$('.mob_header_wrap').height(mobHeaderHeight)

	mobHeaderInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof mobHeaderInit !== 'undefined' && mobHeaderInit && $(window).scrollTop() > mobHeaderHeight
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Фикс. шапка
		mobHeaderInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			mobHeaderInit = true
			mobHeaderHeight = $('.mob_header').outerHeight()

			$('.mob_header_wrap').height(mobHeaderHeight)

			mobHeaderInit && $(window).scrollTop() > mobHeaderHeight
				? $('.mob_header').addClass('fixed')
				: $('.mob_header').removeClass('fixed')
		}, 100)


		// Перезапись ширины окна
		WW = $(window).width()
	}
})