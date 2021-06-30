import { html, render } from "https://unpkg.com/lit-html@1.0.0/lit-html.js";

const SellItem = (item) => html`
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
      margin-top: 10px;
      display: inline-block;
    }

    img {
      height: 190px;
      width: calc(100% - 2px);
      margin: 1px;
      border-radius: 5px;
      overflow: hidden;
    }

    h2,
    span {
      padding-left: 10px;
      margin: 0;
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

    .old-price {
      color: #444;
      font-size: 0.9em;
      text-decoration: line-through;
      text-decoration-color: #b00;
    }

    .price-info {
      margin-bottom: 5px;
    }
  </style>

  <div class="sell-item">
    <div class="container">
      <img src=${item.imageUrl} alt="" />
      <div class="top-left">-${item.discount}</div>
    </div>
    <h2>${item.product}</h2>
    <div class="star-container">
      <span class="star">&#9733;</span>
      ${item.rating}
    </div>
    <div class="price-info">
      <span class="price">$${item.price}</span>
      <span class="old-price">$${item.oldPrice}</span>
    </div>
  </div>
`;

const items = [
  {
    product: "Bicicleta",
    imageUrl:
      "https://www.bicigo.cl/image/md/1516/decb50ecb507c572c58199d75a6e7f0288775d1e.png",
    price: "699.90",
    oldPrice: "545.50",
    discount: "40%",
    rating: "4.3",
  },
  {
    product: "GeForce RTX 2080",
    imageUrl:
      "https://hardzone.es/app/uploads-hardzone.es/2018/09/NVIDIA-GeForce-RTX-2080-Ti-01-1-1024x536.jpg",
    price: "699.90",
    oldPrice: "545.50",
    discount: "40%",
    rating: "4.3",
  },
  {
    product: "Ben 10",
    imageUrl:
      "https://www.latercera.com/resizer/-KKfN4gEijYxrsa2CHoIuJXXYkM=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/2WOC7NILVVA7BLWQAJVZAKNDCM.png",
    price: "699.90",
    oldPrice: "545.50",
    discount: "40%",
    rating: "4.3",
  },
];

const Template = html` ${items.map((item) => html`${SellItem(item)}`)} `;

class SellItems extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(Template, this.shadowRoot);
  }
}

window.customElements.define("sell-items", SellItems);
