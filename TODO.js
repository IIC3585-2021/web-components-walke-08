const template = document.createElement("template")
template.innerHTML = /*html*/`
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
    <h3 class="Titulo"></h3>
    <div class="info-wrapper">
    </div>
    <div class="agregar">
        <div class="input">
            Add new list item:
            <input type="text" class="nuevo-item">
        </div>
        <span class="material-icons agregando">
        add_circle_outline</span>
    </div>
</div>`


class TODO extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.innerHTML = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
        this.shadowRoot.appendChild(template.content.cloneNode(true)); 
    }

    static get observedAttributes() {
        return ["titulo", "prompt"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "titulo") {
          this.shadowRoot.querySelector(".Titulo").textContent = newValue;
        } 
    }

    connectedCallback() {
        let i = 1;
        let item = this.getAttribute("item1");
        let seleccionado = this.shadowRoot.querySelector(".info-wrapper");
        while (item !== null) {
            const i2 = i;
            const nuevodiv = document.createElement("div");
            nuevodiv.id = "item" +  i;
            nuevodiv.className = "item";
            nuevodiv.innerHTML = item + '<span class="material-icons">remove_circle_outline</span>' 
            seleccionado.appendChild(nuevodiv)
            nuevodiv.querySelector("span").addEventListener("click", () => {
                nuevodiv.parentNode.removeChild(nuevodiv);
                this.removeAttribute("item" + i2);
            })
            i += 1
            item = this.getAttribute("item" +  i);
        };
        this.shadowRoot.querySelector(".agregando").addEventListener("click",  (e) => {
            const i2 = i;
            const nuevodiv = document.createElement("div");
            const input = this.shadowRoot.querySelector(".nuevo-item");
            if (input.value === ""){
                return;
            }
            nuevodiv.id = "item" +  i;
            nuevodiv.className = "item";
            nuevodiv.innerHTML = input.value + '<span class="material-icons">remove_circle_outline</span>'
            seleccionado.appendChild(nuevodiv)
            this.setAttribute("item" + i, input.value);
            input.value = "";
            nuevodiv.querySelector("span").addEventListener("click", () => {
                nuevodiv.parentNode.removeChild(nuevodiv);
                this.removeAttribute("item" + i2);
            })
            i += 1

        })
    }

}

window.customElements.define("todo-list", TODO);
