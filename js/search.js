const path_url = window.location.search;
const path_decode = decodeURI(path_url);
const search_term = path_decode.split('q=');
var count = 0;

// 문자열의 경우 주소에서 공백이 + 로 변환됨.
// + 제거하고 공백으로 변경
const search_term_temp = search_term[1].replace(/\+/gi, ' ');
// DB에 키워드들은 띄어쓰기를 제거했으므로 공백을 제거해서 DB 검색에 이용
const search_term_db = search_term_temp.toLowerCase().replace(/ /g, '');

document.getElementById('search_word').innerText = search_term_temp;

db.collection("novel_document").where("name_keyword", "array-contains", search_term_db).get().then((결과) => {
    결과.forEach((result) => {
        count = count + 1;
        console.log("result");
        console.log(result.data());
        document.getElementById('search_count').innerText = count;

        
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
        $('#search_result_area').append(temp);

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
        document.getElementById('search_result_area').innerHTML = search_result;
        document.getElementById('this_document').innerText = search_term_temp;
        document.getElementById('new_document').href = './e/' + search_term_temp;
    }
}).catch((err) => {
    console.log(err);
})

// db.collection("novel_document").where("name", ">=", "\uac00" + search_term[1]).where('name', '<=', search_term[1] + '\uf8ff').get().then((결과) => {
//     결과.forEach((result) => {
//         count = count + 1;
//         console.log("result");
//         console.log(result.data());
//         document.getElementById('search_count').innerText = count;

        
//         // 문자열이 너무 길어지면 문자열을 끊고 '...' 으로 이어지도록
//         var doc_summary_temp = result.data().summary

//         if(doc_summary_temp.length>201){
//             doc_summary_temp = doc_summary_temp.substr(0,200) + "...";
//         }

//         var temp = 
//             `<div class="search_result_element">
//                 <a href="#" class="title_summary" id="url_link">
//                     <h1>${result.data().name}</h1>
//                     <p>${doc_summary_temp}</p>
//                 </a>
//             </div>`;
//         $('#search_result_area').append(temp);

//         var document_name_href = './n/' + result.data().name + '(' +  result.data().author + ')';
//         document.getElementById("url_link").href = document_name_href;
//     });

//     if(count==0){
//         var search_result = 
//                 `<div class="search_none">
//                     <div class="text_bundle">
//                         <p class="warning">ⓘ</p><p id ="this_document">검색어</p><p class="alram">에 대한 문서 정보가 없습니다.</p>
//                     </div>
//                     <div class="button_bundle">
//                         <a href="#" class="new_document" id="new_document">새 문서 작성하기</a>
//                         <a href="#" class="history">역사</a>
//                     </div>
//                 </div>`;
//         // $('#search_result_area').append(temp);
    
//         // document.getElementById('section_empty').style.display = 'block';
//         document.getElementById('search_result_area').innerHTML = search_result;
//         document.getElementById('this_document').innerText = search_term[1];
//         document.getElementById('new_document').href = './e/' + search_term[1];
//     }
// }).catch((err) => {
//     console.log(err);
// })



