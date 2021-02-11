import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import "es6-promise";
import "fetch-polyfill";
import 'mdn-polyfills/Node.prototype.append';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import dataImage from './modules/dataImage';
import regex from './modules/regex';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import anchorsBody from './modules/anchors';

//timer
countTimer('30 july 2021');
//anchors
anchorsBody();
//menu
toggleMenu();
//popup
togglePopup();
//tabs
tabs();
//slider
slider();
//data attributes
dataImage();
//regex
regex();
//calculator
calc(100);
//form-ajax-send
sendForm();
