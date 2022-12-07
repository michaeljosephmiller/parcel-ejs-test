function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class HamburgerIcon extends HTMLElement {
    html(strings, ...values) {
        let html = "";
        let i = 0;
        while(i < values.length){
            html += `${strings[i]}${values[i]}`;
            i++;
        }
        html += `${strings[i]}`;
        return html;
    }
    connectedCallback() {
        this.shadow = this.attachShadow({
            mode: "open"
        });
        this.color = this.attributes.color ? this.attributes.color.value : "#000";
        this.duration = this.attributes.duration ? this.attributes.duration.value : "150ms";
        this.background = this.attributes.background ? this.attributes.background.value : "transparent";
        this.size = this.attributes.size ? this.attributes.size.value : "1.5rem";
        this.stroke = this.attributes.border ? this.color : "none";
        this.shadow.innerHTML = this.html`
      <style>
        .icon {
          --color: ${this.color};
          --duration: ${this.duration};
          --background: ${this.background};
          width: ${this.size};
          height: ${this.size};
          margin: 0;
          padding: 0;
          background: var(--background);
          border: none;
          border-radius: 10%;
          fill: var(--color, #000);
          stroke: var(--color, #000);
        }
        
        .icon .line {
          transition:
            y var(--duration) ease-in var(--duration),
            rotate var(--duration) ease-in,
            opacity 0ms var(--duration);
          transform-origin: center;
        }
        
        .icon.open .line {
          transition:
            y var(--duration) ease-in,
            rotate var(--duration) ease-in var(--duration),
            opacity 0ms var(--duration);
        }
        
        .icon.open .line.top {
          y: 45;
          rotate: 45deg;
        }
        
        .icon.open .line.middle {
          opacity: 0;
        }
        
        .icon.open .line.bottom {
          y: 45;
          rotate: -45deg;
        }
      </style>
        <svg id='icon' class='hamburger icon' viewbox='0 0 100 100'>
          <path class='border'
            fill='none'
            stroke=${this.stroke}
            stroke-width='10'
            d='M 10,5
               L 90,5
               A 5 5 45 0 1 95 10
               L 95,90
               A 5 5 45 0 1 90,95
               L 10,95
               A 5 5 45 0 1 5,90
               L 5,10
               A 5 5 45 0 1 10 5' >
          </path>
          <rect class='line top'
            width='60' height='10'
            x='20' y='25' rx='5'></rect>
          <rect class='line middle'
            width='60' height='10'
            x='20' y='45' rx='5'></rect>
          <rect class='line bottom'
            width='60' height='10'
            x='20' y='65' rx='5'></rect>
        </svg>`;
        // Click event to trigger animation
        if (this.shadow.isConnected) {
            const parent = this.parentNode;
            const el = parent.nodeName == "BUTTON" ? parent : this;
            el.addEventListener("click", (e)=>{
                let icon;
                if (e.target.nodeName == "BUTTON") icon = e.target.firstChild.shadowRoot.getElementById("icon");
                else if (e.target.nodeName == "HAMBURGER-ICON") icon = e.target.shadowRoot.getElementById("icon");
                icon.classList.toggle("open");
            });
        }
    }
    constructor(){
        super();
        _defineProperty(this, "shadow", void 0);
        _defineProperty(this, "color", void 0);
        _defineProperty(this, "duration", void 0);
        _defineProperty(this, "background", void 0);
        _defineProperty(this, "size", void 0);
        _defineProperty(this, "stroke", void 0);
    }
}
customElements.define("hamburger-icon", HamburgerIcon);

