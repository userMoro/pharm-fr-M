import "./pharms/PharmList.js";
import "./pharms/PharmEdit.js";
import "./boxes/BoxList.js";
import "./boxes/BoxEdit.js";
import "./users/userCreate.js";
import "./users/userPa.js"
import "./Menu.js";
import "./Home.js"
import { Router } from "./lib/vaadin-router.js";

const outlet = document.querySelector('main');
const router = new Router(outlet);

router.setRoutes([
    {path: '/',     component: 'pharm-home'},
    {path: '/home',     component: 'pharm-home'},
    {path: '/pharms',     component: 'pharm-list'},
    {path: '/createPharm',     component: 'pharm-edit'},
    {path: '/pharms/:pharm',     component: 'pharm-edit'},
    {path: '/pharms/:pharm/boxes',     component: 'box-list'},
    {path: '/pharms/:pharm/boxes/new',     component: 'box-edit'},
    {path: '/boxes/:box',     component: 'box-edit'},
    {path: '/pa',     component: 'user-pa'},
    {path: '/createUser',     component: 'user-create'},
  ]);

export {router};