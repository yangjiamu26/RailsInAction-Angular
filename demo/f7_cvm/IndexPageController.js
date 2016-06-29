/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
  'use strict';
  
  // Init method
  (function () {
    var options = {
      'bgcolor': '#0da6ec',
      'fontcolor': '#fff',
      'closeButtonText':'跳过',
      'onOpened': function () {
        console.log("welcome screen opened");
      },
      'onClosed': function () {
        console.log("welcome screen closed");
      }
    },
    welcomescreen_slides = [
      {
        id: 'slide0',
        picture: '<div class="tutorialicon">♥</div>',
        text: 'Welcome to this tutorial. In the <a class="tutorial-next-link" href="#">下一页</a> we will guide you through a manual that will teach you how to use this app.'
      },
      {
        id: 'slide1',
        picture: '<div class="tutorialicon">✲</div>',
        text: 'This is slide 2'
      },
      {
        id: 'slide2',
        picture: '<div class="tutorialicon">♫</div>',
        text: 'This is slide 3'
      },
      {
        id: 'slide3',
        picture: '<div class="tutorialicon">☆</div>',
        text: 'Thanks for reading! Enjoy this app or go to <a class="tutorial-previous-slide" href="#">上一页</a>.<br><br><a class="tutorial-close-btn" href="#">进入</a>'
      }
    ],
    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
    
    $$(document).on('click', '.tutorial-close-btn', function () {
      welcomescreen.close();
    });

    $$('.tutorial-open-btn').click(function () {
      welcomescreen.open();  
    });
    
    $$(document).on('click', '.tutorial-next-link', function (e) {
      welcomescreen.next(); 
    });
    
    $$(document).on('click', '.tutorial-previous-slide', function (e) {
      welcomescreen.previous(); 
    });
  
  }());

};