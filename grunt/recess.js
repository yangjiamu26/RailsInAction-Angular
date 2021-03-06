module.exports = {
	less: {
        files: {
          'src/css/app.css': [
            'src/css/less/app.less'
          ]
        },
        options: {
          compile: true
        }
    },
    angular: {
        files: {
            'angular/css/app.min.css': [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'bower_components/animate.css/animate.css',
                'bower_components/font-awesome/css/font-awesome.css',
                'bower_components/simple-line-icons/css/simple-line-icons.css',
                'bower_components/textAngular/dist/textAngular.css',
                'src/css/font.css',
                'src/css/app.css'
            ]
        },
        options: {
            compress: true
        }
    },
    material: {
        files: {
            'material/css/app.min.css': [
                'bower_components/animate.css/animate.css',
                'bower_components/font-awesome/css/font-awesome.css',
                'bower_components/simple-line-icons/css/simple-line-icons.css',
                'bower_components/textAngular/dist/textAngular.css',
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'src/css/app.material.css'
            ]
        },
        options: {
            compress: true
        }
    },
    html: {
        files: {
            'static/css/app.min.css': [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'bower_components/animate.css/animate.css',
                'bower_components/font-awesome/css/font-awesome.css',
                'bower_components/simple-line-icons/css/simple-line-icons.css',
                'html/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    }
}
