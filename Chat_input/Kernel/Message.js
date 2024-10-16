class Message extends HTMLElement {

    #isSender
    #text
    #sendTick
    #receiveTick

    constructor() {
        super();

        const template = document.createElement("template");

        template.innerHTML = `
        <link rel="stylesheet" type="text/css" href="./css/Message.css" />
        <div class="main-container" dir="ltr">
            <div class="image-container">
                <div class="list">

                </div>
                <div class="three-dot"><p>...</p></div>
            </div>
            <div class="text-field">
                <p></p>
                <div class="three-dot log-click">...</div>
            </div>
            <div class="time">
                <div class="tick-container">
                    <img class="tick send-tick" src="./Assets/tick.png"/>
                    <img class="tick receive-tick" src="./Assets/tick.png"/>
                </div>
            </div>
        </div>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.initializeElements();
    }

    initializeElements() {
        this.#text = this.shadowRoot.querySelector(".text-field p");
        this.#sendTick = this.shadowRoot.querySelector(".send-tick");
        this.#receiveTick = this.shadowRoot.querySelector(".receive-tick");
    }

    setProperties(text = "", isSender = false, time = "", isSended = false, isReceived = false, isViewed = false, images = null) {
        // Set message text
        this.#text.innerHTML = `${text}`;

        // The current user is the sender or receiver of the message
        this.#isSender = isSender;
        const container = this.shadowRoot.querySelector('.main-container');
        if (this.#isSender) {
            container.style.direction = 'rtl';
            container.dir = 'rtl';
            isSended ? this.showSendTick() : this.hideSendTick();
            isReceived ? this.showReceiveTick() : this.hideReceiveTick();
        } else {
            this.hideSendTick();
            this.hideReceiveTick();
            container.style.direction = 'ltr';
            container.dir = 'ltr';
        }

        // Message view status
        if (isViewed) {
            this.showViewColor();
        }

        // Set time
        const timeElement = this.shadowRoot.querySelector('.time');
        timeElement.innerHTML = `${time} ${timeElement.innerHTML}`;

        // Set images
        if (images && images.length > 0) {
            const imageContainerList = this.shadowRoot.querySelector(".image-container .list");
            images.forEach(image => {
                imageContainerList.innerHTML += `<img src="${image}"/>`;
            });

            const imageContainer = this.shadowRoot.querySelector(".image-container");
            imageContainer.style.display = 'flex';
        } else {
            const imageContainer = this.shadowRoot.querySelector(".image-container");
            imageContainer.style.display = "none";
        }

    }


    setMenuMessageTop(menuMessage, top, windowHeight) {
        const menuHeight = menuMessage.offsetHeight;
        if (top + menuHeight > windowHeight) {
            top = windowHeight - menuHeight - 10;
        }
        menuMessage.style.top = `${top}px`;
    }

    // #region tick management functions
    showSendTick() {
        this.#sendTick.style.display = "inline";
    }

    showReceiveTick() {
        this.#receiveTick.style.display = "inline";
    }

    hideSendTick() {
        this.#sendTick.style.display = "none";
    }

    hideReceiveTick() {
        this.#receiveTick.style.display = "none";
    }

    showViewColor() {
        this.#sendTick.classList.add('viewed');
        this.#receiveTick.classList.add('viewed');
    }

    hideViewColor() {
        this.#sendTick.classList.remove('viewed');
        this.#receiveTick.classList.remove('viewed');
    }
    // #endregion tick management functions
}

customElements.define("ims-message", Message);
