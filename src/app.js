require('./app.scss');
require('jquery');

// Setting Up Syntax Highlighter
require('./vendor/syntaxhighlighter/theme.scss')
require('./vendor/syntaxhighlighter/jsbrush.js');
var sh = require('./vendor/syntaxhighlighter/core.js').SyntaxHighlighter;


// Setting Up App
var App = function() {

	this.escapeHTML = function(s) { 
	    return s.replace(/&/g, '&amp;')
	            .replace(/"/g, '&quot;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;');
	}

	this.switchPage = function(targetPage) {
		if(this.currentPage == targetPage) return;
		this.$el.animate({
			scrollTop: $('#'+targetPage).offset().top
		}, 1200);

		this.currentPage = targetPage;
	}

	this.switchTab = function(targetTab) {
		if(targetTab == this.currentTab) return;

		this.$el.find('.slide-ide-menu .active').removeClass('active');
		this.$el.find('.slide-ide-code .active').removeClass('active');

		this.$el.find('.tab[data-tab="'+targetTab+'"]').addClass('active');
		this.$el.find('[data-trigger-tab="'+targetTab+'"]').parent().addClass('active');

		this.currentTab = targetTab;
	}

	this.highlightStuff = function() {
		$('[data-code]').each(function(i, el) {
			var pseudoCode = this.escapeHTML(el.innerHTML);
			var hCode = $('<pre class="brush: js" />').html(pseudoCode);

			$(el).before(hCode);
		}.bind(this));

		sh.highlight({gutter: true});
	}
   
	this.currentPage = 'welcome';
	this.currentTab = 'skills';

	this.$el = $('#viewport'); 

	this.$el.on('click', '[data-switch-page]', function(e){
		this.switchPage(e.currentTarget.dataset.switchPage);
	}.bind(this));

  
	this.$el.on('click', '[data-trigger-tab]', function(e){
		this.switchTab(e.currentTarget.dataset.triggerTab);
	}.bind(this)); 



	if(window.location.hash) {
		this.switchPage(window.location.hash.slice(1));
	}

	this.highlightStuff()
}

new App();