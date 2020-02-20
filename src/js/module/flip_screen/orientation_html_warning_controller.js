import OrientationHTMLWarningView from './orientation_html_warning_view';

export default class OrientationHTMLWarningController
{    
	static getInstance = () => {
		if (!OrientationHTMLWarningController.instance) {
			OrientationHTMLWarningController.instance = new OrientationHTMLWarningController();
        }
        
		return OrientationHTMLWarningController.instance;
    }

    Init()
    {
        this.onOrientationChange = null;

        this.create();
    }

    create()
    {     
        this.createView();
        this.initElements();
        this.initEvents();
    }

    createView()
    {
        this.view = new OrientationHTMLWarningView();
    }

    initElements()
	{
        if (!this.gameCanvas) this.gameCanvas = document.getElementById("game");        
    }

    hideGame(isHiding)
    {
        this.gameCanvas.style.display = isHiding?"none":"block";
        this.view.hideElement(this.view.backgroundModal, !isHiding);
    }   

    initEvents()
    {
        if (true)//(/iPhone|iPad|iPod/i.test(navigator.userAgent))
        {
            window.addEventListener("resize", () => 
            {
                //console.log("the orientation of the device is now " + screen.orientation.angle);
             
                let isLandscape = window.innerWidth > window.innerHeight;

                console.log("orientation: "+ window.orientation);
                this.scrollToTOP();

                if (isLandscape)
                {                    
                    this.hideGame(true);
                }
                else
                {
                    this.hideGame(false);
                }
    
                if (this.onOrientationChange) this.onOrientationChange(isLandscape);
            });
        }  
        
    }

    setOnOrientationChangeEvent(newEvent)
    {
        this.onOrientationChange = newEvent;
    }

    scrollToTOP(){
        window.scrollTo(0,1);
    }

}
