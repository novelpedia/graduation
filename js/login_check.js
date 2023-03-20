var login_check = false;
var login_user_information;
var nickname;
var user_id;


async function getDocument(userEmail, uid) {
    const userDocRef = db.collection('user').doc(userEmail + uid);
    try{
        const 결과 = await userDocRef.get();
        console.log(결과.data());
        document.getElementById("login_logout").textContent = "로그아웃";
        document.getElementById("login_logout").href = "#";
        document.getElementById("mypage_button").style.display = 'flex';
        login_check = true;
        nickname = 결과.data().닉네임;
        // login_user_information = userEmail + uid;
    }
    catch(error){
        console.log('Error getting document:', error);
    }
}

async function userInformation(){
    return new Promise((resolve, reject) => {
        firebaseEmailAuth.onAuthStateChanged(function (user) {
          if (user) {
            const userEmail = user.email.split('@');
            user_id = userEmail[0];
            getDocument(userEmail[0], user.uid);
            resolve(userEmail[0] + user.uid);
          } else {
            reject(new Error('User not logged in'));
          }
        });
      });
}

//유저가 로그인 했는지 안했는지 확인해주는 함수
async function userSessionCheck() {
    var userInfor;

    userInfor = await userInformation();
    // await getDocument(userEmailTemp, userUidTemp);
    console.log("login.js : " + userInfor);
    return userInfor;
}

async function getUser(){
    login_user_information = await userSessionCheck();
    console.log("login_user_information : " + login_user_information);
}

async function start(){
    await getUser();
    console.log(login_user_information);
}

start();