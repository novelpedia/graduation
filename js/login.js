var firebaseConfig = {
    apiKey: "AIzaSyDkGeh_PXavAP0-dIgNoMTpxYftAmBUvhs",
    authDomain: "novelpedia2223-2ce3c.firebaseapp.com",
    projectId: "novelpedia2223-2ce3c",
    storageBucket: "novelpedia2223-2ce3c.appspot.com",
    messagingSenderId: "693960594059",
    appId: "1:791349138937:web:e8dd1af3750611fc3b9928"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

$('#login_btn').click(function () {
    firebaseEmailAuth = firebase.auth();
    var email = $('#loginid').val() + "@novelpedia.com";
    var password = $('#loginpw').val();

    //파이어베이스 이메일 로그인 함수
    firebaseEmailAuth.signInWithEmailAndPassword(email, password).then(function (firebaseUser) {
            console.log(firebaseUser.user);

            /*uid를 이용해 문서정보를 읽어오기*/
            db.collection('user').doc($('#loginid').val() + firebaseUser.user.uid).get().then((결과) => {
                /*모두 불러오기*/
                console.log(결과.data());
                // 뒤로 갈 히스토리가 있는 경우 및 우리 시스템에서 링크를 통해 유입된 경우
                if (document.referrer && document.referrer.indexOf("novelpedia.co.kr") !== -1) {
                    history.go(-1);    // 뒤로가기
                    
                }
                // 히스토리가 없는 경우 (URL을 직접 입력하여 유입된 경우) 단, 뒤로가기 페이지가 없는 경우는 안됨 / 새탭이나 타 사이트에 있다가 들어온 경우
                else {
                    window.location.href = "index.html";    // 메인페이지로 
                }
            })


        })
        .catch(function (error) {
            // 실패했을 때 에러 띄우기
            alert("로그인 실패" + error);
        });
});