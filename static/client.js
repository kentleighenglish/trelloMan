
window.TrelloPowerUp.initialize({
	'show-authorization': function(t, options){
		// return what to do when a user clicks the 'Authorize Account' link
		// from the Power-Up gear icon which shows when 'authorization-status'
		// returns { authorized: false }
		// in this case we would open a popup
		var currentUrl = window.location.href;
		
		window.location.href = "https://discordapp.com/oauth2/authorize?client_id=590987939249651765&scope=bot&permissions=9216?return_url="+encodeURI(currentUrl);
		// return t.popup({
		// 	title: 'My Auth Popup',
		// 	url: '/authorize',
		// 	height: 140,
		// });
	},
	'authorization-status': function(t, options) {
		return new TrelloPowerUp.Promise((resolve) => resolve({ authorized: true }));
	}
});