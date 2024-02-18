import '../styles/modern-normalize.css'
import '../styles/style.css';
import '../styles/components/header.css';
import '../styles/components/folder.css';
import '../styles/components/hero.css';
import '../styles/components/music.css';
import '../styles/components/about.css';
import '../styles/components/work.css';
import '../styles/components/mobile-nav.css';
import '../styles/components/hof.css';
import '../styles/components/footer.css';
import '../styles/utils.css';

import mobileNav from './utils/mobile-nav';
import player from './utils/player';
import lazyLoading from './utils/lazy-loading';
import parallax from './utils/parallax';
import folder from './utils/folder';
import blink from './utils/blink';
import logo from './utils/logo';

mobileNav();
player();
lazyLoading();
parallax();
folder();
blink();
logo();