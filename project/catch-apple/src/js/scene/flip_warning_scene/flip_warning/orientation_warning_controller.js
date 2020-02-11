import OrientationWarningView from './orientation_warning_view.js';

export default class OrientationWarningController
{    
    constructor(scene, assets={})
	{
		this.assets = assets;
		this.scene = scene;

		this.create();
	}
	
    create()
    {
		this.createView();

		window.addEventListener('orientationchange', (ev) => {
			let orientation = window.orientation;
	
			if (orientation == 0 || orientation == 180) 
			{
				location.reload();
			} 
		});
		
	}
	
	update()
	{
		
	}

	createView()
	{		
		this.view = new OrientationWarningView(this.scene, this.assets);
	}	

	createEvents()
	{
		
	}

}
