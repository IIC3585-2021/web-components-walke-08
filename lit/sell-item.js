import { html, render } from "https://unpkg.com/lit-html?module";

// Define a template function
const myTemplate = html`<p>Hello</p>`;

// Render the template with some data
render(myTemplate("lit-html"), document.getElementById("content"));
