const template = document.createElement("template");

template.innerHTML = /*html*/ `
<style>
  .sell-item {
    height: 320px;
    width: 240px;
    background-color: #ababab;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    display: inline-block;
  }

  img{
    height: 190px;
    width: calc(100% - 2px);
    margin: 1px;
    border-radius: 5px;
    overflow: hidden;
  }

  h2, span {
    padding-left: 10px;
    margin:0;
  }

  .container {
    position: relative;
    text-align: center;
    color: #fff;
    overflow: hidden;
  }

  .top-left {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 3px;
    background-color: red;
    font-size: 22px;
  }

  .star-container {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 20px;
  }

  .star {
    font-size: 20px;
    color: gold;
  }

  #old-price {
    color: #444;
    font-size: 0.9em;
    text-decoration: line-through;
    text-decoration-color: #b00;
  }

  .price-info {
    margin-bottom: 5px;
  }

  #discount {
    padding: 0;
    margin: 0;
  }

</style>

<div class='sell-item'>
  <div class="container">
    <img src="" alt="">
    <div class="top-left">
    -<span id="discount">40%</span>
    </div>
  </div>
  <slot class="slot">product</slot>
  <div class="star-container">
    <span class="star">&#9733;</span>
    <span id="rating">4.5</span>
  </div>
  <div class='price-info'>
    <span id="price">$15.25</span>
    <span id="old-price">$20.99</span>
  </div>
</div>
`;

class SellItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [
      "product",
      "image-url",
      "price",
      "discount",
      "rating",
      "old-price",
    ];
  }

  changeAttr =
    (contentType = "textContent") =>
    (selector, newValue) => {
      this.shadowRoot.querySelector(selector)[contentType] = newValue;
    };

  attrChange = {
    product: this.changeAttr().bind(this, "h2"),
    "image-url": this.changeAttr("src").bind(this, "img"),
    price: this.changeAttr().bind(this, "#price"),
    rating: this.changeAttr().bind(this, "#rating"),
    discount: this.changeAttr().bind(this, "#discount"),
    "old-price": this.changeAttr().bind(this, "#old-price"),
  };

  attributeChangedCallback(name, oldValue, newValue) {
    this.attrChange[name](newValue);
  }
}

window.customElements.define("sell-item", SellItem);
