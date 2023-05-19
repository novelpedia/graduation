const addHorizontalRuleButton = document.getElementById('add-horizontal-rule');
const editor = document.getElementById('editor');

function addHeader() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var header = document.createElement("div");
    header.innerHTML = "제목";
    header.classList.add("title");
    editor.appendChild(header);

    range.setStart(header.firstChild, 0);
    range.setEnd(header.firstChild, header.firstChild.length);
    selection.removeAllRanges();
    selection.addRange(range);
}

function addBody() {
    // var selection = window.getSelection();
    // var range = selection.getRangeAt(0);
    var body = document.createElement("div");
    body.innerHTML = "본문"; 
    body.classList.add("text");
    body.style.fontSize = "16px";
    editor.appendChild(body);
}


editor.addEventListener('paste', function(event) {
    event.preventDefault();

    // 클립보드에서 복사된 텍스트 얻기
    var pastedData = event.clipboardData ||  window.clipboardData;
    var textData = pastedData.getData('Text');

    window.document.execCommand('insertHTML', false,  textData);

});


addHorizontalRuleButton.addEventListener('click', () => {
    const horizontalRule = document.createElement('hr');
    horizontalRule.classList.add("edit_hr");
    // horizontalRule.style.background = 'white';
    // horizontalRule.style.height = '20px';
    editor.appendChild(horizontalRule);
});

editor.addEventListener('keydown', (event) => {
    if (event.keyCode === 8) {
        const lastChild = editor.lastChild;
        if (lastChild.tagName === 'HR') {
            editor.removeChild(lastChild);
        }
    }
});


const linkBtn = document.getElementById("link-btn");

linkBtn.addEventListener("click", () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (selectedText) {
        const url = prompt("링크 주소를 입력하세요:");
        if (url) {
            const link = document.createElement("a");
            link.href = url.startsWith("http://") || url.startsWith("https://") ? url : "http://" + url;
            link.textContent = selectedText;
            selection.deleteFromDocument();
            selection.getRangeAt(0).insertNode(link);
        }
    } else {
        const url = prompt("링크 주소를 입력하세요:");
        if (url) {
            const linkText = prompt("링크 이름을 입력하세요:");
            const link = document.createElement("a");
            link.href = url.startsWith("http://") || url.startsWith("https://") ? url : "http://" + url;
            link.textContent = linkText;
            editor.appendChild(link);
        }
    }
});

editor.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        const parent = container.parentElement;
        if (parent.tagName === "A") {
            e.preventDefault();
            const textNode = document.createTextNode(parent.textContent);
            const startOffset = range.startOffset;
            parent.replaceWith(textNode);
            const newRange = new Range();
            newRange.setStart(textNode, startOffset);
            newRange.setEnd(textNode, startOffset);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    }
});



const editable = document.querySelector("#editor");
const uploadImageBtn = document.querySelector("#upload-image-btn");

async function image_upload(){
    const uploadWindow = window.open(
        "../upload.html",
        "uploadWindow",
        "width=500,height=500"
    );
    window.addEventListener("message", handleMessage);
};

async function handleMessage(event) {
    const storageRef_2 = firebase.storage().ref();
    if (event.data.type === "image-upload") {
        const file = event.data.data;
        const dt = new Date();
        const dt_temp = dt.getFullYear() + String(dt.getMonth() + 1) + dt.getDate() + dt.getHours() + dt.getMinutes() + dt.getSeconds() + dt.getMilliseconds();
        const save_path = storageRef_2.child("image/" + dt_temp + file.name);
        const uploading = save_path.put(file);
        await uploading.then((snapshot) => {
            console.log("Uploaded a blob or file!", snapshot);
            save_path.getDownloadURL().then((url) => {
                const img = document.createElement("img");
                img.src = url;
                editable.appendChild(img);
            });
        });
    }
    if (event.data.type === "child-close") {
        window.close();
    }
}

var isInnerText = false;

function convertFormat() {
    event.preventDefault();
    var editor = document.getElementById("editor");
    var btn = document.getElementById("convertBtn");
    if (isInnerText) {
        editor.innerHTML = editor.innerText;
        btn.value = "변환(HTML → Text)";
        isInnerText = false;
        //활성화
        document.getElementById("header").disabled = false;
        document.getElementById("body").disabled = false;
        document.getElementById("add-horizontal-rule").disabled = false;
        document.getElementById("link-btn").disabled = false;
        document.getElementById("upload-image-btn").disabled = false;

        document.getElementById("send").disabled = false;
        document.getElementById("send").style.color = "#769fcd";
        document.getElementById("send").style.backgroundColor = "#fff"
        
    } else {
        editor.innerText = editor.innerHTML;
        btn.value = "변환(Text → HTML)";
        isInnerText = true;
        //비활성화
        document.getElementById("header").disabled = true;
        document.getElementById("body").disabled = true;
        document.getElementById("add-horizontal-rule").disabled = true;
        document.getElementById("link-btn").disabled = true;
        document.getElementById("upload-image-btn").disabled = true;

        document.getElementById("send").disabled = true;
        document.getElementById("send").style.color = "gray";
        document.getElementById("send").style.backgroundColor = "lightgray"
    }
}