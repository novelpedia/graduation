const path_url = window.location.search;
const path_decode = decodeURI(path_url);
const search_term = path_decode.split('q=');
var count = 0;
var a_count = 0;
var p_count = 0;

// 문자열의 경우 주소에서 공백이 + 로 변환됨.
// + 제거하고 공백으로 변경
const search_term_temp = search_term[1].replace(/\+/gi, ' ');
// DB에 키워드들은 띄어쓰기를 제거했으므로 공백을 제거해서 DB 검색에 이용
let search_term_db = search_term_temp.toLowerCase().replace(/ /g, '');
let field = "name_keyword";


window.onload = async function(){
    if(search_term_db.substring(0, 1)=="!"){
        search_term_db = search_term_db.substring(1);
        field = "tag";
        document.getElementById('search_word').innerText = "#" + search_term_db;
    }
    else{
        document.getElementById('search_word').innerText = search_term_db;
    }

    await getNovel();
    await getAuthor();
    await getPublisher();
}

async function getNovel(){
    console.log(field);
    await db.collection("novel_document").where(field, "array-contains", search_term_db).orderBy("view", "desc").limit(5).get().then((결과) => {
        결과.forEach((result) => {
            count = count + 1;
            console.log("result");
            console.log(result.data());
    
            
            // 문자열이 너무 길어지면 문자열을 끊고 '...' 으로 이어지도록
            var doc_summary_temp = result.data().summary
    
            if(doc_summary_temp.length>201){
                doc_summary_temp = doc_summary_temp.substr(0,200) + "...";
            }
    
            var temp = 
                `<div class="search_result_element">
                    <a href="#" class="title_summary" id="url_link${count}">
                        <h1>${result.data().name}</h1>
                        <p>${doc_summary_temp}</p>
                    </a>
                </div>`;
            $('#search_result_area_n').append(temp);
    
            var document_name_href = './n/' + result.data().name + '(' +  result.data().author + ')';
            var document_id = "url_link" + count;
            document.getElementById(document_id).href = document_name_href;
        });
    
        if(count==0){
            var search_result = 
                    `<div class="search_none">
                        <div class="text_bundle">
                            <p class="warning">ⓘ</p><p id ="this_document">검색어</p><p class="alram">에 대한 문서 정보가 없습니다.</p>
                        </div>
                        <div class="button_bundle">
                            <a href="#" class="new_document" id="new_document">새 문서 작성하기</a>
                            <a href="#" class="history">역사</a>
                        </div>
                    </div>`;
            // $('#search_result_area').append(temp);
        
            // document.getElementById('section_empty').style.display = 'block';
            document.getElementById('search_result_area_n').innerHTML = search_result;
            document.getElementById('this_document').innerText = search_term_db;
            document.getElementById('new_document').href = './e/' + search_term_db;
        }
    }).catch((err) => {
        console.log(err);
    })
}

async function getAuthor(){
    await db.collection("author_document").where(field, "array-contains", search_term_db).orderBy("view", "desc").limit(5).get().then((결과) => {
        결과.forEach((result) => {
            a_count = a_count + 1;
            console.log("a_result");
            console.log(result.data());
    
            var doc_summary_temp = result.data().birthday
    
            var temp = 
                `<div class="search_result_element">
                    <a href="#" class="title_summary" id="a_url_link${a_count}">
                        <h1>${result.data().name}</h1>
                        <p>${doc_summary_temp}</p>
                    </a>
                </div>`;
            $('#search_result_area_a').append(temp);
    
            var document_name_href = './a/' + result.data().name + '(' +  result.data().birthday + ')';
            var document_id = "a_url_link" + a_count;
            document.getElementById(document_id).href = document_name_href;
        });
    
        if(a_count==0){
            var search_result = 
                    `<div class="search_none">
                        <div class="text_bundle">
                            <p class="warning">ⓘ</p><p id ="a_this_document">검색어</p><p class="alram">에 대한 문서 정보가 없습니다.</p>
                        </div>
                        <div class="button_bundle">
                            <a href="#" class="new_document" id="a_new_document">새 문서 작성하기</a>
                            <a href="#" class="history">역사</a>
                        </div>
                    </div>`;
            // $('#search_result_area').append(temp);
        
            // document.getElementById('section_empty').style.display = 'block';
            document.getElementById('search_result_area_a').innerHTML = search_result;
            document.getElementById('a_this_document').innerText = search_term_db;
            document.getElementById('a_new_document').href = './ea/' + search_term_db;
        }
    }).catch((err) => {
        console.log(err);
    })
}

async function getPublisher(){
    await db.collection("publisher_document").where(field, "array-contains", search_term_db).orderBy("view", "desc").limit(5).get().then((결과) => {
        결과.forEach((result) => {
            p_count = p_count + 1;
            console.log("p_result");
            console.log(result.data());
    
            var temp = 
                `<div class="search_result_element">
                    <a href="#" class="title_summary" id="p_url_link${p_count}">
                        <h1>${result.data().name}</h1>
                        <p>${result.data().establishdate}</p>
                    </a>
                </div>`;
            $('#search_result_area_p').append(temp);
    
            var document_name_href = './p/' + result.data().name;
            var document_id = "p_url_link" + p_count;
            document.getElementById(document_id).href = document_name_href;
        });
    
        if(p_count==0){
            var search_result = 
                    `<div class="search_none">
                        <div class="text_bundle">
                            <p class="warning">ⓘ</p><p id ="p_this_document">검색어</p><p class="alram">에 대한 문서 정보가 없습니다.</p>
                        </div>
                        <div class="button_bundle">
                            <a href="#" class="new_document" id="p_new_document">새 문서 작성하기</a>
                            <a href="#" class="history">역사</a>
                        </div>
                    </div>`;
    
            document.getElementById('search_result_area_p').innerHTML = search_result;
            document.getElementById('p_this_document').innerText = search_term_db;
            document.getElementById('p_new_document').href = './ep/' + search_term_db;
        }
    
        document.getElementById('search_count').innerText = count + a_count + p_count;
    }).catch((err) => {
        console.log(err);
    })
}











