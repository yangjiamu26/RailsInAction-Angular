require.config({
    paths: {
        'geoJson': '../geoData/geoJson',
        'theme': '../theme',
        'data': './data',
        'map': '../map',
        'extension': '../extension'
    },
    packages: [
        {
            main: 'echarts',
            location: 'bower_components/echarts/src',
            name: 'echarts'
        },
        {
            main: 'zrender',
            location: 'bower_components/echarts/zrender/src',
            name: 'zrender'
        }
    ]
    // urlArgs: '_v_=' + +new Date()
});