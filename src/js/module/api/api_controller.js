
export default class ApiController {

	constructor(){
        this.baseUrl;
        this.gameId;
		this.siloamToken;
		this.isLogin = false;
    }

    /**
    * @returns {ApiController}
    */
	static getInstance = () => {
		if (!ApiController.instance) {
            ApiController.instance = new ApiController();
        }

		return ApiController.instance;
    };

    init = (gameId) => {
    	this.baseUrl = "https://gameserver-api-siloam-hospital-stag.gf.agatedev.net/";
		this.gameId = gameId; // 1 : Debby, 2 : Going Viral, 3 : Ambulance Dash		

		/*
		Siloam token ini yang nantinya akan di kirimkan silaom Apps menuju game.
		token ini dibutuhkan backend untuk mengecek user id dan juga nama pengguna		

		note : masih belum ada info bagaimana apps mengirimkan data token ini ke web game (kemungkinan di set lngsng di window.sessionStorage?)
		*/
		// this.siloamToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJRCI6NTksInBob25lTnVtYmVyIjoiKzYyODIxMTI0MDk1MTAiLCJwYXRpZW50SWQiOiI2YmNkZGNkOC1mMTY3LTQxMmEtYjYxZS1hMDU1MTgyNmNmN2YifSwiaWF0IjoxNTc2NTU4NjIxLCJleHAiOjE1ODUxOTg2MjF9.hsLNZOCH3OE7CXHBgaITFC5_6AptMrKEx07UFXzTpe8";
		
		this.siloamToken = window.sessionStorage.getItem("siloam-token");
		if (!this.siloamToken) {
			window.sessionStorage.setItem("siloam-token", "");
			this.siloamToken = window.sessionStorage.getItem("siloam-token");
		}
    }

    postRequest = (usetoken, url, parameters) => {
    	return new Promise((resolve, reject) => {
    		var request = new XMLHttpRequest();	

			var data = JSON.stringify(parameters);		

			request.open('POST', url, true);
			request.withCredentials = false;
			request.setRequestHeader("Content-Type", "application/json");
			request.setRequestHeader("Accept", "application/json");
			if(usetoken == true){
				request.setRequestHeader("Authorization", window.sessionStorage.getItem("token"));
			}
			request.onreadystatechange = function() { 
				if (request.readyState == 4 && request.status >= 200 && request.status < 300){
					resolve(request.responseText);
				}
				else if(request.readyState == 4 && request.status != 200){
					reject(request);
				}
			}	
			request.send(data);
    	});
	}	

	AuthLogin = () => {
		return new Promise((resolve, reject) => {
			var parameters = {
				"siloamToken": this.siloamToken,
				"clientKey": "BmwzQACRCmddGbSXdUJIGw==",
				"requestId": "random-string-dari-frontend",
				"gameId": this.gameId,
				"deviceId": "some-device-id" // device id ?
			};
			this.postRequest(false, this.baseUrl+"Auth/Login", parameters)
			.then(success => {
				this.isLogin = true;
				console.log("islogin? " + this.isLogin);
				var data = JSON.parse(success);
				console.log(data);
				window.sessionStorage.setItem("myName", data.data.name);
				window.sessionStorage.setItem("token", "Bearer " + data.data.token);
				window.sessionStorage.setItem("userId", data.data.userId);
				resolve(data);
			})
			.catch(fail => {
				this.isLogin = false;
				console.log("islogin? " + this.isLogin);
				if(fail.status == 400){
					var data = JSON.parse(fail.responseText);
					console.log(data);
				}
				else if(fail.status == 401){
				}
				else if(fail.status == 403){
				}
				else if(fail.status == 500){
				}
				else{
				}
				reject(fail.status);
			});
		});
	}	

	Score = (score) => {
		return new Promise((resolve, reject) => {
			var parameters = {
				"userId": window.sessionStorage.getItem("userId"),
				"gameId": this.gameId,
				"score": score,
				"requestId": "random-string-dari-frontend",
				"deviceId": "some-device-id"
			}		

			this.postRequest(true, this.baseUrl+"Game/Score", parameters)
			.then(success => {
				var data = JSON.parse(success);
				console.log(data);
				//token = data.token;
				resolve(data);
			})
			.catch(fail => {
				if(fail.status == 400){
					var data = JSON.parse(fail.responseText);
					console.log(data);
				}
				else if(fail.status == 401){
				}
				else if(fail.status == 403){
				}
				else if(fail.status == 500){
				}
				else{
				}
				reject(fail.status);
			});
		});
	}	

	Leaderboard = () => {
		return new Promise((resolve, reject) => {
			var parameters = {
				"userId": window.sessionStorage.getItem("userId"),
				"gameId": this.gameId,
				"period": 0, // set ke 0 untuk mendapatkan periode terbaru
				"requestId": "random-string-dari-frontend",
				"deviceId": "some-device-id"
			}		

			this.postRequest(true, this.baseUrl+"Game/Leaderboard", parameters)
			.then(success => {
				var data = JSON.parse(success);
				console.log(data);
				//token = data.token;
				resolve(data);
			})
			.catch(fail => {
				if(fail.status == 400){
					var data = JSON.parse(fail.responseText);
					console.log(data);
				}
				else if(fail.status == 401){
				}
				else if(fail.status == 403){
				}
				else if(fail.status == 500){
				}
				else{
				}
				reject(fail.status);
			});
		});
	}

	Ads = () => {
		return new Promise((resolve, reject) => {
			var parameters = {
				"userId": window.sessionStorage.getItem("userId"),
				"gameId": this.gameId,
				"requestId": this.generateId(8),
				"deviceId": "some-device-id"
			}		

			this.postRequest(true, this.baseUrl+"Game/AdsGame", parameters)
			.then(success => {
				var data = JSON.parse(success);
				console.log(data);
				console.table(data.data);
				resolve(data);
			})
			.catch(fail => {
				if(fail.status == 400){
					var data = JSON.parse(fail.responseText);
					console.log(data);
				}
				else if(fail.status == 401){
				}
				else if(fail.status == 403){
				}
				else if(fail.status == 500){
				}
				else{
				}
				reject(fail.status);
			});
		});
	}

	// Request id generator
	generateId = (length) => {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	 }

}