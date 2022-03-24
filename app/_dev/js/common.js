;document.addEventListener('DOMContentLoaded', () => {
	let userLang = navigator.language;
	let copyText;
	
	const $html   = document.querySelector('html');
	const $body   = document.querySelector('body');
	const $input  = document.querySelector('.js-input');
	const $button = document.querySelector('.js-button');
	const $notify = document.querySelector('.js-notify');

	// lang
	if ( userLang.search('uk') != -1 ) {
		userLang = 'uk';
	} else if ( userLang.search('ru') != -1 ) {
		userLang = 'ru';
	} else {
		userLang = 'en';
	}

	const langText = {
		title: {
			en: 'Copy text',
			uk: 'Копіювати текст',
			ru: 'Копировать текст'
		},
		copy: {
			en: 'Copy',
			uk: 'Копіювати',
			ru: 'Копировать'
		},
		copied: {
			en: 'Copied!',
			uk: 'Скопійовано!',
			ru: 'Скопировано!'
		}
	}

	$html.setAttribute('lang', userLang);

	const $langEls = document.querySelectorAll('[data-lang]');

	$langEls.forEach(function($el){
		const text = $el.getAttribute('data-lang');

		try{
			$el.innerText = langText[text][userLang];
		} catch(e) {
			console.error(e);
		}

	});

	function init(){
		copyText = location.href.replace(location.origin + '/', '');

		try {
			copyText = decodeURI(copyText);
		} catch {
			copyText = copyText.replace('%20', ' ');
		}

		if ( copyText == '' ) {
			copyText = 'kopy.link/your text here'
		}

		$input.value = copyText;
		$button.setAttribute('data-copy', copyText);
	}

	init();


	$button.addEventListener('click', () => {
		$input.select();
		document.execCommand('copy');

		$button.classList.add('done');
		$notify.classList.add('active');

		setTimeout(() => {
			$button.classList.remove('done');
			$notify.classList.remove('active');
		}, 3500);
	});


	// onload
	$body.classList.remove('hidden');

});