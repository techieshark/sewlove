

resize:
	mkdir -p 960 2500 # created directories for smaller scale images
	convert -scale 2500x2500 hero-bg.jpg - |mozjpeg > 2500/hero-bg.jpg
	convert -scale 960x960 hero-bg.jpg - |mozjpeg > 960/hero-bg.jpg
	mozjpeg tour.jpg | convert -thumbnail 20x20 - 20/tour-sm.jpg