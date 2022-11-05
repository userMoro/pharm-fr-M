import { html, render } from "./../lib/lit-html.js";
import { Router } from "./../lib/vaadin-router.js";
import { router } from "./../index.js";
import { findUser, updateUser } from "./userStore.js";
import { createUser } from "./../users/userStore.js";

export default class userCreate extends HTMLElement {

    constructor() {
        super();
    }

    getRoot() {
        return this;
    }

    connectedCallback() {
        const { location } = router;
        this.id = location.params.pharm;
        if (this.id == "undefined") {
            console.log("create..")
            this.data = {
                usr:'',
                pwd:'',
                firstname:'',
                lastname:'',
                email:'' 
            }
            render(this.renderView(), this.getRoot());
        } else {
            findUser(this.id)
                .then(data => {
                    this.data = data;
                    render(this.renderView(), this.getRoot());
                })
        }

    }

    onInputChange(e) {
        const { name, value } = e.target;
        this.data[name] = value;
    }

    onSave(e) {
        e.preventDefault();
        const {form} = e.target;
        if(!form.checkValidity()){
            form.reportValidity();
            return;
        }
        if (this.id === "undefined") {
            createUser(this.data)
                .then(_ => {
                    Router.go(`/pharms/`);
                })
        } else {
            updateUser(this.id, this.data)
                .then(_ => {
                    Router.go(`/pharms/`);
                })
        }

    }

    onCancel(e) {
        e.preventDefault();
        Router.go(`/pharms/`);
    }

    renderView() {
        return html`
            <section class="hero">
                <div class="hero-body">
                <p class="title">
                    Nuovo Utente
                </p>
                <p class="subtitle">
                    Inserisci le tue credenziali
                </p>
                </div>
            </section>
           <form>
                <div class="field">
                    <label class="label">Username</label>
                    <div class="control">
                        <input required class="input" type="text" name="usr" @change=${e => this.onInputChange(e)} .value=${this.data.usr} >
                    </div>
                </div>
                
                <div class="field">
                    <label class="label">Nome</label>
                    <div class="control">
                        <input required class="input" type="text" name="firstname" @change=${e => this.onInputChange(e)} .value=${this.data.firstname} >
                    </div>
                </div>

                <div class="field">
                    <label class="label">Cognome</label>
                    <div class="control">
                        <input required class="input" type="text" name="lastname" @change=${e => this.onInputChange(e)} .value=${this.data.lastname} >
                    </div>
                </div>

                <div class="field">
                    <label class="label">Email (facoltativa)</label>
                    <div class="control">
                        <input class="input" type="text" name="email" @change=${e => this.onInputChange(e)} .value=${this.data.email} >
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input required class="input" type="password" name="pwd" @change=${e => this.onInputChange(e)} .value=${this.data.pwd} >
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" @click = ${e => this.onSave(e)}>Save</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" @click = ${e => this.onCancel(e)}>Cancel</button>
                    </div>
                </div>
           </form>
        `;
    }
}
customElements.define("user-create", userCreate);