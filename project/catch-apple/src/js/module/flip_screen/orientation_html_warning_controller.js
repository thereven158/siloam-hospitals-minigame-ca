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
        // if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
        if(true)
        {
            window.addEventListener("resize", () => 
            {
                //console.log("the orientation of the device is now " + screen.orientation.angle);
             
                let isLandscape = window.innerWidth > window.innerHeight;

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
        else
        {
            window.addEventListener("orientationchange", () => 
            {
                let isLandscape = screen.orientation.angle == 90 || screen.orientation.angle == 270;
                
                //console.log("the orientation of the device is now " + screen.orientation.angle);
            
                if (!isLandscape)
                {
                    this.hideGame(false);
                }
                else if (isLandscape)
                {
                    this.hideGame(true);
                }
    
                if (this.onOrientationChange) this.onOrientationChange(isLandscape);
            });
        }
    }

    setOnOrientationChangeEvent(newEvent)
    {
        this.onOrientationChange = newEvent;
    }

}