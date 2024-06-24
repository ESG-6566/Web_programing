/**
 * required a elements list.
 * @type {{imagePath: string}}
 */
class OptionMenu extends Component{
    constructor() {
        super();

        const template = document.createElement('template');

        this._shadowRoot.innerHTML =`
            <link rel="stylesheet" type="text/css" href="../css/OASStyle.css" />
            <link rel="stylesheet" type="text/css" href="../css/OptionMenu.css" />
            <nav>

            </nav>
            <div class="space"></div>
            <div class="indicator-container">
                <div class="line"></div>
                <div class="indicator">
                    <div class="rectangle"></div>    
                </div>
            </div>
        `;
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render = (e) => {
        const menu = this._shadowRoot.querySelector('nav');

        // Get items lenghth
        length = e.data.elements.length;
        for(let i=0;i<e.data.elements.length;i++){
            if(i == 0){
                menu.innerHTML+=`
                    <div class="space2"></div>
                    <img src=${e.data.elements[i].image}></img>
                    <div class="space"></div>
                `
            }
            else if(i == length-1){
                menu.innerHTML+=`
                    <img src=${e.data.elements[i].image}></img>
                    <div class="space2"></div>
                `
            }else{
                menu.innerHTML+=`
                    <img src=${e.data.elements[i].image}></img>
                    <div class="space"></div>
                `
            }
        }

        // Indicator transformation defination
        var menuItems = this._shadowRoot.querySelectorAll('img');
        const indicator = this._shadowRoot.querySelector('.indicator');

        // first transform on start
        // Ensure the DOM updates have been processed before initializing the indicator
        requestAnimationFrame(() => {
            if (menuItems.length > 0) {
                highlightSelected(0);
                menuItems[0].classList.add('active');
                moveIndicator(menuItems[0]);
            }
        });
        
        menuItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                highlightSelected(index)
                moveIndicator(item);
            });
        });
        
        function highlightSelected(index){
            // Remove 'selsected' class from all items
            menuItems.forEach((img) => img.classList.remove('selected'));
                
            // Add 'selected' class to the clicked item
            menuItems[index].classList.add('selected');
        }

        // Adjust indicator on window resize
        window.addEventListener('resize', () => {
            const selectedItem = this._shadowRoot.querySelector('nav img.selected');
            if (selectedItem) {
                moveIndicator(selectedItem);
            }
        });

        function moveIndicator(element) {
            const itemWidth = element.offsetWidth;
            const containerWidth = menu.offsetWidth;
            const itemLeft = element.offsetLeft;
            // Calculate the right-to-left offset
            const rtlOffset = containerWidth - itemLeft - itemWidth;
            indicator.style.width = `${itemWidth}px`;
            indicator.style.transform = `translateX(${- rtlOffset}px)`;
        }
    }
}

customElements.define("ims-option-menu", OptionMenu);