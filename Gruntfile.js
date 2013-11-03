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
			},
			jade : {
				files : './assets/templates/*.jade',
				tasks : ['jade']
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
			all : ['./server.js', './models/*.js', './controls/*.js', 'assets/**/**.js']
		},
		jade : {
			options: {
				data : {
					debug : false
				}
			},
			src: {
				expand: true,
				flatten : true,
				src : './assets/templates/*.jade',
				dest : './assets/partials/',
				ext : '.html' 
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jade');

	grunt.registerTask('default', ['watch', 'less', 'jshint', 'jade']);

};