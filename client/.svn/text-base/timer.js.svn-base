	/*ギヒョウのtemplatefirstNodeを使用してDOM要素を取得することも可能
	*/
	    		//【TODO:時計が止まっていないとアクティブにならないようにする！！！】
	    		//【TODO:ジャスト５人がジャスト５人になってないと時計がスタートできずアラートされる！！１】
	
	
	var Timer1;
	var inTime = 0;
	var outTime = 0;
	
	//タイマーをスタートさせる関数
	function Start() {
		document.timer.elements[2].disabled = true;		//STARTボタンを非アクティブ化
		document.timer.elements[3].disabled = false;	//STOPボタンをアクティブ化
		Timer1 = setInterval("CountDown()",1000);		//1000ミリ秒間隔でCountDown()を呼び出す
		if(inTime == 0)	//coatInが0の場合のみコートインの時間を取得
			coatIn();
	}
	//タイマーを止める関数
	function Stop() {
		document.timer.elements[2].disabled = false;	//STARTボタンをアクティブ化
		document.timer.elements[3].disabled = true;		//STOPボタンを非アクティブ化
		clearInterval(Timer1);							//ID:Timer1で設定されたタイマーを解除
	}
	//タイマーボックスに入っている数値を取得し、再び書き出す関数
	function CountDown() {
		var min = parseInt(document.timer.elements[0].value);	//取得した文字列を整数に変換
		var sec = parseInt(document.timer.elements[1].value);
		TMWrite(min*60+sec-1);
	}
	//タイマーに数値を表示させる関数
	function TMWrite(int) {
		int = parseInt(int);
		
		if (int <= 0) {
			ReSet();
		} else {
			document.timer.elements[0].value = Math.floor(int/60);	//指定した数以下のうち、最大の整数を返す
			document.timer.elements[1].value = int % 60;
		}
	}
	function ReSet() {
		document.timer.elements[0].value = "10";
		document.timer.elements[1].value = "0";
		document.timer.elements[2].disabled = false;
		clearInterval(Timer1);
	} 
	//コートインの時間を取得する関数
	function coatIn() {
		var min = parseInt(document.timer.elements[0].value);	//取得した文字列を整数に変換
		var sec = parseInt(document.timer.elements[1].value);
		inTime = min*60 + sec;
	}
	//コートアウトの時間を計測する関数
	function coatOut() {
		var min = parseInt(document.timer.elements[0].value);	//取得した文字列を整数に変換
		var sec = parseInt(document.timer.elements[1].value);
		outTime = min*60 + sec;
	}
	//選手交代をする関数
	function Change() {
		coatOut();	//交代する時の時間を取得
		var playTime = inTime - outTime;
		document.timer2.elements[0].value = playTime;
		//初期化
		inTime = 0;
		outTime = 0;
	}
	
	
	Template.time.events({
		'click ':function () {
			
		}
		
		
	});

