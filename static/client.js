
window.TrelloPowerUp.initialize({
	'authorization-status': function(t, options) {
		return new TrelloPowerUp.Promise((resolve) => resolve({ authorized: true }));
	}
});