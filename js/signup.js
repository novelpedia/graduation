var firebaseConfig = {
    apiKey: "AIzaSyDkGeh_PXavAP0-dIgNoMTpxYftAmBUvhs",
    authDomain: "novelpedia2223-2ce3c.firebaseapp.com",
    projectId: "novelpedia2223-2ce3c",
    storageBucket: "novelpedia2223-2ce3c.appspot.com",
    messagingSenderId: "693960594059",
    appId: "1:791349138937:web:e8dd1af3750611fc3b9928"
};

// 테스트
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
/*스토리지에 파일을 업로드할 경우 필요*/
/*const storage = firebase.storage();*/


/*중복체크*/
var tp_pw = "aaaa0000";
/*중복체크 시도 여부(중복이든, 중복되지 않았든)*/
var number_chk = false;
var id_duple_chk = false;

/*중복 여부 확인*/
var duple_chk = false;

$('#loading_box').hide();


document.querySelector("html").addEventListener("click", function (e) {
    if (e.target.id == e.currentTarget.querySelector("#signupid").id) {
        console.log("True");
    }
    else {
        var id = $('#signupid').val() + "@novelpedia.com";
        if (!number_chk && id.length > 15) {
            firebase.auth().createUserWithEmailAndPassword(id, tp_pw).then((result) => {
                const user = firebase.auth().currentUser;
                /*alert("존재하지 않는 아이디입니다.");*/
                user.delete().then(() => {
                    /*alert("제거되었습니다.");*/
                    number_chk = true;
                    id_duple_chk = true;
                    duple_chk = true;
                    dupleChk()
                }).catch((error) => {
                    alert("중복체크 과정에서 오류가 발생했습니다. 해당 아이디는 당분간 사용할 수 없습니다. 관리자에게 문의하세요." + error);
                });
            }).catch((err) => {
                /*$('#signupid').delete().then(() => {
                    // User deleted.
                }).catch((error) => {
                    alert('제거실패' + error);
                });*/
                id_duple_chk = false;
                number_chk = true;
                dupleChk()
                duple_chk = false;
                alert('중복된 아이디입니다.' + err);
            });
            console.log("False");
            document.getElementById("id_empty").style.display = 'block';
        }
    }
})

function inputIdChk() {
    number_chk = false;
    duple_chk = false;
    console.log("keyboard_input");
    document.getElementById("id_empty").innerText = " ";
    document.getElementById("id_empty").style.display = 'none';
}

function dupleChk() {
    if (id_duple_chk) {
        document.getElementById("id_empty").innerText = '✓';
        document.getElementById("id_empty").style.color = 'green';
        /*console.log(number_chk);*/
    } else {
        document.getElementById("id_empty").innerText = '⚠';
        document.getElementById("id_empty").style.color = 'red';
        /*document.getElementById("id_empty").style.transform = 'rotate(180deg)';*/
    }
}


$('#register').click(function () {
    var id = $('#signupid').val() + "@novelpedia.com";
    var pw = $('#signupPass').val();
    var pw2 = $('#passwordCheck').val();
    var name = $('#name').val();
    var nick = $('#nickname').val();
    var gender = $('input[name=genderchoice]:checked').val();
    var email = $('#email').val() + $('#email2 option:selected').text();
    var phone = $('#phonenumber').val();
    var birthday = $('#userBirthday').val();
    /*이름, 생일 등 개인정보를 저장할 수 있는 방법 필요*/
    /*var name = $('#name-new').val();*/

    /*파이어베이스 로그인기능 소환술*/


    if (id.length === 0) {
        alert("아이디가 입력되지 않았습니다.");
    } else if (!duple_chk) {
        alert("아이디 중복체크를 실행하세요.");
    } else if (pw.length === 0) {
        alert("비밀번호가 입력되지 않았습니다.");
    } else if (pw != pw2) {
        alert("비밀번호가 다릅니다!");
    } else if (name.length === 0) {
        alert("이름이 입력되지 않았습니다.");
    } else if (nick.length === 0) {
        alert("닉네임이 입력되지 않았습니다.");
    } else if (gender.length === 0) {
        alert("성별이 입력되지 않았습니다.");
    } else if (email.length === 0) {
        alert("이메일이 입력되지 않았습니다.");
    } else if (phone.length === 0) {
        alert("전화번호가 입력되지 않았습니다.");
    } else if (birthday.length === 0) {
        alert("생년월일이 입력되지 않았습니다.");
    } else {
        $('#loading_box').show();
        firebase.auth().createUserWithEmailAndPassword(id, pw).then((result) => {
            var 사용자데이터 = {
                이름: name,
                닉네임: nick,
                성별: gender,
                이메일: email,
                전화번호: phone,
                생년월일: birthday,
                가입날짜: new Date(),
                등급: "u",
            };

            var docname = $('#signupid').val() + result.user.uid;

            db.collection('user').doc(docname).set(사용자데이터).then((result) => {
                console.log(result);
                alert(name + "님 환영합니다.");
                $('#loading_box').hide();
                window.location.href = 'index.html';
            }).catch(() => {
                alert("DB접근 불가");
                $('#loading_box').hide();
            });
            console.log(result.user);
        }).catch((err) => {
            alert('회원가입 실패' + err);
            $('#loading_box').hide();
        });
    }
    // $('#loading_box').hide();
})