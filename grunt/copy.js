module.exports = {
    angular: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts',         dest: "angular/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts',      dest: "angular/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/Simple-Line-Icons/fonts', dest: "angular/fonts"},
            {expand: true, src: "**", cwd: 'src/fonts',   dest: "angular/fonts"},
            {expand: true, src: "**", cwd: 'src/api',     dest: "angular/api"},
            {expand: true, src: "**", cwd: 'src/l10n',    dest: "angular/l10n"},
            {expand: true, src: "**", cwd: 'src/img',     dest: "angular/img"},
            {expand: true, src: "**", cwd: 'src/js',      dest: "angular/js"},
            {expand: true, src: "**", cwd: 'src/tpl',     dest: "angular/tpl"},
            {src: 'src/index.min.html', dest : 'angular/index.html'}
        ]
    },
    material: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts',         dest: "angular/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts',      dest: "angular/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/Simple-Line-Icons/fonts', dest: "angular/fonts"},
            {expand: true, src: "**", cwd: 'src/fonts',   dest: "material/fonts"},
            {expand: true, src: "**", cwd: 'src/api',     dest: "material/api"},
            {expand: true, src: "**", cwd: 'src/l10n',    dest: "material/l10n"},
            {expand: true, src: "**", cwd: 'src/img',     dest: "material/img"},
            {expand: true, src: "**", cwd: 'src/js',      dest: "material/js"},
            {expand: true, src: "**", cwd: 'src/tpl',     dest: "material/tpl"},
            {src: 'src/index.min.html', dest : 'material/index.html'}
        ]
    },
    html: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts',         dest: "static/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts',      dest: "static/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/Simple-Line-Icons/fonts', dest: "static/fonts"},
            {expand: true, src: '**', cwd:'html/fonts/', dest: 'static/fonts/'},
            {expand: true, src: "**", cwd: 'html/api/', dest: "static/api/"},
            {expand: true, src: '**', cwd:'html/img/', dest: 'static/img/'},
            {expand: true, src: '*.css', cwd:'html/css/', dest: 'static/css/'},
            {expand: true, src: '*.html', cwd:'html/*', dest: 'static/js/'}
        ]
    },
    landing: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts',         dest: "landing/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts',      dest: "landing/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/Simple-Line-Icons/fonts', dest: "landing/fonts"},
            {expand: true, src:'**', cwd:'src/fonts/', dest: 'landing/fonts/'},
            {expand: true, src:'*.css', cwd:'src/css/', dest: 'landing/css/'},
            {src:'html/css/app.min.css', dest: 'landing/css/app.min.css'}
        ]
    }

};
