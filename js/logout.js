$('#login_logout').click(function () {
    firebaseEmailAuth.signOut().then(function () {
        window.location.href = "/index.html";
    }).catch(function (error) {
        alert("로그아웃 실패", error);
    });
});