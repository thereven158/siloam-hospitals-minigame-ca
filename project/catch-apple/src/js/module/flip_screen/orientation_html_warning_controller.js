import OrientationHTMLWarningView from './orientation_html_warning_view';

export default class OrientationHTMLWarningController extends Phaser.Scene
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
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
        {
            window.addEventListener("resize", () => 
            {
                //console.log("the orientation of the device is now " + screen.orientation.angle);
             
                if (window.innerWidth > window.innerHeight)
                {                    
                    this.hideGame(true);
                }
                else
                {
                    this.hideGame(false);
                }
    
                if (this.onOrientationChange) this.onOrientationChange();
            });
        }  
        else
        {
            window.addEventListener("orientationchange", () => 
            {
                //console.log("the orientation of the device is now " + screen.orientation.angle);
            
                if (screen.orientation.angle == 0 || screen.orientation.angle == 180)
                {
                    this.hideGame(false);
                }
                else if (screen.orientation.angle == 90 || screen.orientation.angle == 270)
                {
                    this.hideGame(true);
                }
    
                if (this.onOrientationChange) this.onOrientationChange();
            });
        }
    }

    setOnOrientationChangeEvent(newEvent)
    {
        this.onOrientationChange = newEvent;
    }

}
