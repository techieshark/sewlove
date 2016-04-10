

usage:
	@echo You probably want to 'make assets' but you might also 'make resize' or 'make deps'

assets:
	cd js && uglifyjs jquery.flexslider-min.js jquery.waypoints.min.js jquery.fittext.js jquery.magnific-popup.min.js jquery.lazylinepainter-1.7.0.min.js main.js -c > scripts.js
	cd css && cleancss base.css vendor.min.css main.css > styles.css

resize:
	cd images/portfolio && make resize

deps:
	npm install cleancss uglifyjs -g
