const ul = document.querySelector("#tag_area"),
textarea = document.querySelector("#tag"),
tagNumb = document.querySelector(".details span");
let maxTags = 0;
let tags = [];
function countTags(){
    // textarea.focus();
    tagNumb.innerText = maxTags + tags.length;
}
function createTag(){
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag =>{
        let liTag = `<li>${tag} <span onclick="remove(this, '${tag}')"><div>×</div></span></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTags();
}
function remove(element, tag){
    let index  = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    countTags();
}
function addTag(e){
    if(e.key == "," || e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' ').replace(',', ' ');
        if(tag.length > 1 && !tags.includes(tag)){
            if(tags.length < 30){
                tags.push(tag);
                createTag();
                /*tag.split(',').forEach(tag => {
                    tags.push(tag);
                    createTag();
                });*/
            }
        }
        e.target.value = "";
    }
}
document.getElementById("tag").addEventListener("keyup", addTag);