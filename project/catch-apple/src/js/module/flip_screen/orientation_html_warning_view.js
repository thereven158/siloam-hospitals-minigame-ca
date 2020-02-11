export default class OrientationHTMLWarningView
{    
    constructor()
	{
		this.create();
    }

    create()
    {     
        this.createBackgroundHTML();
        this.createModalContentHTML();
    }

    createBackgroundHTML()
    {
        if (document.getElementById("background_modal")) return;
        
        this.backgroundModal = document.createElement("DIV");
        this.backgroundModal.setAttribute("id", "background_modal");
        this.backgroundModal.setAttribute("style", `display: none;
                                                    position: fixed;
                                                    z-index: 1;
                                                    padding-top: 0px;
                                                    left: 0;
                                                    top: 0;
                                                    width: 100%;
                                                    height: 100%;
                                                    overflow: auto;
                                                    background-color: rgb(0,0,0);
                                                    background-color: rgb(0,0,0,0.4);
                                        `);

        document.body.appendChild(this.backgroundModal);
    }

    createModalContentHTML()
    {

        this.modalPanel = document.createElement("DIV");
        this.modalPanel.setAttribute("id", "modal_panel");
        this.modalPanel.setAttribute("style", `background-color: #fefefe;
                                               top: 50%;
                                               padding: 20;
                                               position: relative;                                             
                                               border: 1px solid #888;
                                               margin: 0 auto;
                                               width: 85%;
                                               height: 70%;                                             
                                               -moz-transform: translateY(-50%);
                                               -webkit-transform: translateY(-50%);
                                               transform: translateY(-50%);   
                                               border-radius: 25px;                                            
                                    `);
        
        this.backgroundModal.appendChild(this.modalPanel);

        let image = document.createElement('img');
        image.src = "images/orientation_warning/Warning.png";
        image.setAttribute("style", `width: 30%;
                            `);

        let newline = document.createElement("BR");

        this.modalPanel.appendChild(image);
        this.modalPanel.appendChild(newline);

        let warningText = document.createTextNode("GAME INI HANYA BISA DIMAINKAN PADA MODE POTRAIT.");     
        newline = document.createElement("BR");
        let warningText2 = document.createTextNode("SILAKAN PUTAR DEVICE ANDA.");

        this.modalPanel.style.font = "40px helsinki";
        this.modalPanel.style.color = "#f0526c";
        this.modalPanel.style.textAlign = "center";

        this.modalPanel.appendChild(warningText);
        this.modalPanel.appendChild(newline);
        this.modalPanel.appendChild(warningText2);
    }

    hideElement(element, isHiding=true)
    {
        element.style.display = isHiding?"none":"block";
    }

}
