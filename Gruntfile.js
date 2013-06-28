module.exports = function(grunt){

	grunt.initConfig({

		watch : {
			style : {
				files: './assets/*.less',
				tasks : ['less']
			},
			js : {
				files : ['./assets/**.js', './controller/**.js', './model.js,', 'Gruntfile.js'],
				tasks : ['jshint'] 
			}
		},

		less: {
		    options: {
		     	paths: ["./assets/style"],
		    	yuicompress: true
		    },
		    src: {
		    	expand: true,
		    	src : ['./style/*.less'],
		    	dest : './style/css/',
		    	ext : '.css' 
		    }
		},

		jshint : {
			options: {
				globals: {
					jQuery : true 
				}
			},
			all : ['./assets/**.js', './controller/**.js', './model.js']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.registerTask('default', ['watch', 'less', 'jshint']);
}