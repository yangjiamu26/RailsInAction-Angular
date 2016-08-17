/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

/*jshint node: true*/

var Q = require('q'),
<<<<<<< HEAD
    nopt  = require('nopt'),
    path  = require('path'),
    build = require('./build'),
    spawn = require('./spawn'),
    check_reqs = require('./check_reqs');

var cordovaPath = path.join(__dirname, '..');
var projectPath = path.join(__dirname, '..', '..');

module.exports.run = function (argv) {

    // parse args here
    // --debug and --release args not parsed here
    // but still valid since they can be passed down to build command 
    var args  = nopt({
        // "archs": String,     // TODO: add support for building different archs
        'list': Boolean,
        'nobuild': Boolean,
        'device': Boolean, 'emulator': Boolean, 'target': String
    }, {}, argv);

    // Validate args
    if (args.device && args.emulator) {
=======
    path   = require('path'),
    iossim = require('ios-sim'),
    build  = require('./build'),
    spawn  = require('./spawn'),
    check_reqs = require('./check_reqs');

var events = require('cordova-common').events;

var cordovaPath = path.join(__dirname, '..');
var projectPath = path.join(__dirname, '..', '..');

module.exports.run = function (runOptions) {

    // Validate args
    if (runOptions.device && runOptions.emulator) {
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
        return Q.reject('Only one of "device"/"emulator" options should be specified');
    }

    // validate target device for ios-sim
    // Valid values for "--target" (case sensitive):
    var validTargets = ['iPhone-4s', 'iPhone-5', 'iPhone-5s', 'iPhone-6-Plus', 'iPhone-6',
<<<<<<< HEAD
        'iPad-2', 'iPad-Retina', 'iPad-Air', 'Resizable-iPhone', 'Resizable-iPad'];
    if (args.target && validTargets.indexOf(args.target) < 0 ) {
        return Q.reject(args.target + ' is not a valid target for emulator');
    }

    // support for CB-8168 `cordova/run --list`
    if (args.list) {
        if (args.device) return listDevices();
        if (args.emulator) return listEmulators();
=======
        'iPhone-6s-Plus', 'iPhone-6s', 'iPad-2', 'iPad-Retina', 'iPad-Air', 'iPad-Air-2',
        'iPad-Pro', 'Resizable-iPhone', 'Resizable-iPad'];
    if (!(runOptions.device) && runOptions.target && validTargets.indexOf(runOptions.target.split(',')[0]) < 0 ) {
        return Q.reject(runOptions.target + ' is not a valid target for emulator');
    }

    // support for CB-8168 `cordova/run --list`
    if (runOptions.list) {
        if (runOptions.device) return listDevices();
        if (runOptions.emulator) return listEmulators();
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
        // if no --device or --emulator flag is specified, list both devices and emulators
        return listDevices().then(function () {
            return listEmulators();
        });
    }

<<<<<<< HEAD
    // check for either ios-sim or ios-deploy is available
    // depending on arguments provided
    var checkTools = args.device ? check_reqs.check_ios_deploy() : check_reqs.check_ios_sim();

    return checkTools.then(function () {
        // if --nobuild isn't specified then build app first
        if (!args.nobuild) {
            return build.run(argv);
=======
    var useDevice = !!runOptions.device;

    return require('./list-devices').run()
    .then(function (devices) {
        if (devices.length > 0 && !(runOptions.emulator)) {
            useDevice = true;
            // we also explicitly set device flag in options as we pass
            // those parameters to other api (build as an example)
            runOptions.device = true;
            return check_reqs.check_ios_deploy();
        }
    }).then(function () {
        if (!runOptions.nobuild) {
            return build.run(runOptions);
        } else {
            return Q.resolve();
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
        }
    }).then(function () {
        return build.findXCodeProjectIn(projectPath);
    }).then(function (projectName) {
<<<<<<< HEAD
        var appPath = path.join(projectPath, 'build', (args.device ? 'device' : 'emulator'), projectName + '.app');
        // select command to run and arguments depending whether
        // we're running on device/emulator
        if (args.device) {
            return checkDeviceConnected().then(function () {
                return deployToDevice(appPath);
            }, function () {
                // if device connection check failed use emulator then
                return deployToSim(appPath, args.target);
            });
        } else {
            return deployToSim(appPath, args.target);
=======
        var appPath = path.join(projectPath, 'build', 'emulator', projectName + '.app');
        // select command to run and arguments depending whether
        // we're running on device/emulator
        if (useDevice) {
            return checkDeviceConnected().then(function () {
                appPath = path.join(projectPath, 'build', 'device', projectName + '.app');
                // argv.slice(2) removes node and run.js, filterSupportedArgs removes the run.js args
                return deployToDevice(appPath, runOptions.target, filterSupportedArgs(runOptions.argv.slice(2)));
            }, function () {
                // if device connection check failed use emulator then
                return deployToSim(appPath, runOptions.target);
            });
        } else {
            return deployToSim(appPath, runOptions.target);
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
        }
    });
};

/**
<<<<<<< HEAD
=======
 * Filters the args array and removes supported args for the 'run' command.
 *
 * @return {Array} array with unsupported args for the 'run' command
 */
function filterSupportedArgs(args) {
        var filtered = [];
        var sargs = ['--device', '--emulator', '--nobuild', '--list', '--target', '--debug', '--release'];
        var re = new RegExp(sargs.join('|'));

        args.forEach(function(element) {
            // supported args not found, we add
            // we do a regex search because --target can be "--target=XXX"
            if (element.search(re) == -1) {
                filtered.push(element);
            }
        }, this);

        return filtered;
}

/**
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
 * Checks if any iOS device is connected
 * @return {Promise} Fullfilled when any device is connected, rejected otherwise
 */
function checkDeviceConnected() {
<<<<<<< HEAD
    return spawn('ios-deploy', ['-c']);
=======
    return spawn('ios-deploy', ['-c', '-t', '1']);
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
}

/**
 * Deploy specified app package to connected device
 * using ios-deploy command
 * @param  {String} appPath Path to application package
 * @return {Promise}        Resolves when deploy succeeds otherwise rejects
 */
<<<<<<< HEAD
function deployToDevice(appPath) {
    // Deploying to device...
    return spawn('ios-deploy', ['-d', '-b', appPath]);
=======
function deployToDevice(appPath, target, extraArgs) {
    // Deploying to device...
    if (target) {
        return spawn('ios-deploy', ['--justlaunch', '-d', '-b', appPath, '-i', target].concat(extraArgs));
    } else {
        return spawn('ios-deploy', ['--justlaunch', '--no-wifi', '-d', '-b', appPath].concat(extraArgs));
    }
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
}

/**
 * Deploy specified app package to ios-sim simulator
 * @param  {String} appPath Path to application package
 * @param  {String} target  Target device type
 * @return {Promise}        Resolves when deploy succeeds otherwise rejects
 */
function deployToSim(appPath, target) {
<<<<<<< HEAD
    // Select target device for emulator. Default is 'iPhone-6' 
    if (!target) {
        target = 'iPhone-6';
        console.log('No target specified for emulator. Deploying to ' + target + ' simulator');
    }
    var logPath = path.join(cordovaPath, 'console.log');
    var simArgs = ['launch', appPath,
        '--devicetypeid', 'com.apple.CoreSimulator.SimDeviceType.' + target,
        // We need to redirect simulator output here to use cordova/log command
        // TODO: Is there any other way to get emulator's output to use in log command?
        '--stderr', logPath, '--stdout', logPath,
        '--exit'];
    return spawn('ios-sim', simArgs);
=======
    // Select target device for emulator. Default is 'iPhone-6'
    if (!target) {
        return require('./list-emulator-images').run()
        .then(function (emulators) {
            if (emulators.length > 0) {
                target = emulators[0];
            }
            emulators.forEach(function (emulator) {
                if (emulator.indexOf('iPhone') === 0) {
                    target = emulator;
                }
            });
            events.emit('log','No target specified for emulator. Deploying to ' + target + ' simulator');
            return startSim(appPath, target);
        });
    } else {
        return startSim(appPath, target);
    }
}

function startSim(appPath, target) {
    var logPath = path.join(cordovaPath, 'console.log');

    return iossim.launch(appPath, 'com.apple.CoreSimulator.SimDeviceType.' + target, logPath, '--exit');
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
}

function listDevices() {
    return require('./list-devices').run()
    .then(function (devices) {
<<<<<<< HEAD
        console.log('Available iOS Devices:');
        devices.forEach(function (device) {
            console.log('\t' + device);
=======
        events.emit('log','Available iOS Devices:');
        devices.forEach(function (device) {
            events.emit('log','\t' + device);
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
        });
    });
}

function listEmulators() {
    return require('./list-emulator-images').run()
    .then(function (emulators) {
<<<<<<< HEAD
        console.log('Available iOS Virtual Devices:');
        emulators.forEach(function (emulator) {
            console.log('\t' + emulator);
=======
        events.emit('log','Available iOS Virtual Devices:');
        emulators.forEach(function (emulator) {
            events.emit('log','\t' + emulator);
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
        });
    });
}

module.exports.help = function () {
    console.log('\nUsage: run [ --device | [ --emulator [ --target=<id> ] ] ] [ --debug | --release | --nobuild ]');
    // TODO: add support for building different archs
    // console.log("           [ --archs=\"<list of target architectures>\" ] ");
    console.log('    --device      : Deploys and runs the project on the connected device.');
    console.log('    --emulator    : Deploys and runs the project on an emulator.');
    console.log('    --target=<id> : Deploys and runs the project on the specified target.');
    console.log('    --debug       : Builds project in debug mode. (Passed down to build command, if necessary)');
    console.log('    --release     : Builds project in release mode. (Passed down to build command, if necessary)');
    console.log('    --nobuild     : Uses pre-built package, or errors if project is not built.');
    // TODO: add support for building different archs
    // console.log("    --archs       : Specific chip architectures (`anycpu`, `arm`, `x86`, `x64`).");
    console.log('');
    console.log('Examples:');
    console.log('    run');
    console.log('    run --device');
    console.log('    run --emulator --target=\"iPhone-6-Plus\"');
    console.log('    run --device --release');
    console.log('    run --emulator --debug');
    console.log('');
    process.exit(0);
<<<<<<< HEAD
};
=======
};
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
