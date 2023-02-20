/*var firebaseConfig = {
    apiKey: "AIzaSyDkGeh_PXavAP0-dIgNoMTpxYftAmBUvhs",
    authDomain: "novelpedia2223-2ce3c.firebaseapp.com",
    projectId: "novelpedia2223-2ce3c",
    storageBucket: "novelpedia2223-2ce3c.appspot.com",
    messagingSenderId: "693960594059",
    appId: "1:791349138937:web:e8dd1af3750611fc3b9928"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebaseEmailAuth = firebase.auth();*/

userSessionCheck();

//유저가 로그인 했는지 안했는지 확인해주는 함수
function userSessionCheck() {
    const db = firebase.firestore();

    //로그인이 되어있으면 - 유저가 있으면, user를 인자값으로 넘겨준다.
    firebaseEmailAuth.onAuthStateChanged(function (user) {
        console.log(user);
        var userEmail = user.email.split('@');
        console.log(userEmail[0]);

        //조회 - 데이터 베이스에 저장된 닉네임을 현재 접속되어 있는 user의 pk key 값을 이용해서 가져오기
        db.collection('user').doc(userEmail[0] + user.uid).get().then((결과) => {
            /*모두 불러오기*/
            console.log(결과.data())
            document.getElementById("login_logout").textContent = "로그아웃";
            document.getElementById("login_logout").href = "#";
            document.getElementById("mypage_button").style.display = 'flex';

            /*이 부분은 아직 미개발*/
            name = 결과.data().이름;
            console.log(name);
            /*loginUserKey = 결과.data().key;
            console.log(loginUserKey);*/

            /*return true;*/
        }).catch((err) => {
            console.log("Error:" + err);
        });
    });
}