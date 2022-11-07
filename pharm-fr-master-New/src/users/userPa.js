import configData from "./../config.js";
import { html, render } from "./../lib/lit-html.js";
import { Router } from "./../lib/vaadin-router.js";
import { pharmsByUser } from "./../users/userStore.js"

export default class userPa extends HTMLElement {

    constructor() {
        super();
    }

    getRoot() {
        return this;
        // return this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.loadAndRenderPharms();
    }

    disconnectedCallback() {
    }

    loadAndRenderPharms(){
        pharmsByUser(configData.userId).then(data => {
            this.data = data;
            render(this.renderView(), this.getRoot());
        })
    }
    /*
    -------------------- eventi -------------------
    */

    onCreate(e) {
        e.preventDefault();
        Router.go(`/createUser`)
    }

    onTestEvent(e){
        e.preventDefault(); 
       const evt = new CustomEvent('blog-event',{
            detail:{
                category: 'prova'
            },
            bubbles: true
        })
        document.dispatchEvent(evt);
    }

    /*
    --------------------render ---------------------
    */

    renderView() {
        return html`
            
            <h1 class="title has-text-centered">Area Personale</h1>
            
            <div class="list">
                <button @click = ${e => this.onCreate(e)} class="button is-primary">Crea Nuovo Utente</button>
                <button class="button is-primary">Accedi</button>
            </div>
        `;
    }
}

customElements.define("user-pa", userPa);