
export default class ApiController {

	constructor(){
        this.baseUrl;
        this.gameId;
        this.siloamToken;
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

		note : masih belum ada info bagaimana apps mengirimkan data token ini ke web game (kemungkinan di set lngsng di window.localstorage?)
		*/
		this.siloamToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJRCI6NTksInBob25lTnVtYmVyIjoiKzYyODIxMTI0MDk1MTAiLCJwYXRpZW50SWQiOiI2YmNkZGNkOC1mMTY3LTQxMmEtYjYxZS1hMDU1MTgyNmNmN2YifSwiaWF0IjoxNTc2NTU4NjIxLCJleHAiOjE1ODUxOTg2MjF9.hsLNZOCH3OE7CXHBgaITFC5_6AptMrKEx07UFXzTpe8";
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
				request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
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
				var data = JSON.parse(success);
				console.log(data);
				window.localStorage.setItem("myName", data.data.name);
				window.localStorage.setItem("token", "Bearer " + data.data.token);
				window.localStorage.setItem("userId", data.data.userId);
				resolve(data);
			})
			.catch(fail => {
				if(fail.status == 400){
					var data = JSON.parse(fail.responseText);
					console.log(data);
					alert(data.error.code);
				}
				else if(fail.status == 401){
					alert("401 unauthorized");
				}
				else if(fail.status == 403){
					alert("403 forbidden");
				}
				else if(fail.status == 500){
					alert("Internal server error");
				}
				else{
					alert("check your connection");
				}
				reject(fail.status);
			});
		});
	}	

	Score = (score) => {
		return new Promise((resolve, reject) => {
			var parameters = {
				"userId": window.localStorage.getItem("userId"),
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
					alert(data.error.code);
				}
				else if(fail.status == 401){
					alert("401 unauthorized");
				}
				else if(fail.status == 403){
					alert("403 forbidden");
				}
				else if(fail.status == 500){
					alert("Internal server error");
				}
				else{
					alert("check your connection");
				}
				reject(fail.status);
			});
		});
	}	

	Leaderboard = () => {
		return new Promise((resolve, reject) => {
			var parameters = {
				"userId": window.localStorage.getItem("userId"),
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
					alert(data.error.code);
				}
				else if(fail.status == 401){
					alert("401 unauthorized");
				}
				else if(fail.status == 403){
					alert("403 forbidden");
				}
				else if(fail.status == 500){
					alert("Internal server error");
				}
				else{
					alert("check your connection");
				}
				reject(fail.status);
			});
		});
	}

}