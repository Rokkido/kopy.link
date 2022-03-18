;document.addEventListener('DOMContentLoaded', () => {

	let copyText;
	const $body   = document.querySelector('body');
	const $input  = document.querySelector('.js-input');
	const $button = document.querySelector('.js-button');

	
	function init(){
		copyText = location.href.replace(location.origin + '/', '');

		try {
			copyText = decodeURI(copyText);
		} catch {
			setTimeout(() => {alert('url error')}, 100)
		}

		if ( copyText == '' ) {
			setTimeout(() => {alert('url is empty')}, 100)
		}

		$input.value = copyText;
		$button.setAttribute('data-copy', copyText);
	}

	init();


	$button.addEventListener('click', () => {
		const $textarea = document.createElement('textarea');
		$textarea.style.cssText = 'position: fixed; top: -999px; left: -999px;';
		$textarea.value = copyText;

		$body.append($textarea);

		$textarea.select();
		document.execCommand('copy');
		$textarea.remove();

		$button.classList.add('done');
	});

});