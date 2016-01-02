

#-mv 20 20-backup-`date "+%Y-%m-%d:%H:%M:%S"`

resize:
	mkdir -p 20 400 # created directories for smaller scale images
	cp *.jpg 20/
	cp *.jpg 400/
	cd 20 && mogrify -thumbnail 20x20 *
	cd 400 && mogrify -scale 400x400 *

