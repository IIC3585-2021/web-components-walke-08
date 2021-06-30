import { LitElement, html } from 'https://unpkg.com/lit-element/lit-element.js?module';

class Todo extends LitElement {

    static get properties(){
        return {
            titulo: {type: String},
            prompt: {type: String},
            items: {type: Array},
        }
    }

    constructor(){
        super();
        this.titulo = "ToDo";
        this.prompt = "";
        this.items = ["primera", "segunda", "tercera"];
    }

    render(){

        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <style>
                span {
                    cursor: pointer;
                }

                .list {
                    width: 400px;
                }

                .item, .agregar {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }

                .item {
                    margin-left: 25px;
                }

                .nuevo-item {
                    border: 1px solid #999;
                    border-bottom: 1px solid #444;
                    flex: 1;
                    padding: 5px;
                    margin-left: 7px;
                }

                .input {
                    display: flex;
                    align-items: center;
                }

            </style>

            <div class="list">
                <h3 class="Titulo">${this.titulo}</h3>
                <div class="info-wrapper">
                ${this.items.map((item, idx) => html`
                <div id=${"item" + idx} class="item">${item}<span @click="${() => this.delete(idx)}" class="material-icons">remove_circle_outline</span></div>`)}
                </div>
                <div class="agregar">
                    <div class="input">
                        Add new list item:
                        <input type="text" class="nuevo-item">
                    </div>
                    <span class="material-icons agregando" @click="${this.clickHandler}">
                    add_circle_outline</span>
                </div>
            </div>`;
    }

    clickHandler(){
        const input = this.shadowRoot.querySelector(".nuevo-item");
        if (input.value === ""){
            return;
        }
        this.items = [...this.items, input.value];
        console.log(this.items);
        input.value = "";
    }

    delete(idx) {
        this.items = this.items.filter(item => item !== this.items[idx]);
        console.log(this.items);
    }

}

customElements.define('todo-list', Todo);
