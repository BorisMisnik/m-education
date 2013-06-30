module.exports = function(grunt){

	grunt.initConfig({

		watch : {
			style : {
				files: './assets/**/**.less',
				tasks : ['less']
			},
			js : {
				files : ['./assets/**/**.js', './controllers/**.js', 
						'./models/**.js,', './**.js'],
				tasks : ['jshint']  
			}
		},

		less: {
			options: {
				paths: ["./assets/**/**.less"],
				yuicompress: true
			},
			src: {
				expand: true,
				flatten : true,
				src : ['./assets/**/**.less'],
				dest : './assets/style/css/',
				ext : '.css' 
			}
		},
		jshint : {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true
			},
			all : ['./assets/**/**.js', './controllers/**.js', './models/**.js', './**.js']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['watch', 'less', 'jshint']);

};