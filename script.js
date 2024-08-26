const inputTitle = document.getElementById("inputTitle");
const inputDescription = document.getElementById("inputDescription");
const AddBtn = document.getElementById("AddBtn");
const DataBox = document.querySelector(".DataBox");
let editTitle;
let editDesc;
let toDoArray = [];

let localArray = [];



const AddData = () => {


    //** check if input field is not empty */
    if (inputTitle.value == "" || inputDescription.value == "") {
        alert("please write something... 📝🖊");
    }

    //** setting the length for both input field field */
    else if(String(inputTitle.value).length > 20 || String(inputDescription.value).length > 50){
        alert("⚠ can't add more than 20 letters for title and more than for 50 description ⚠");
    }

    else if(AddBtn.innerText=="EDIT") {

        let getLocalArray = JSON.parse(localStorage.getItem("localArray"));
        let editLocalTitle = editTitle.innerText;            //**storing old value */
        let editLocalDesc = editDesc.innerText;

        editTitle.innerText = inputTitle.value;             //** update old value
        editDesc.innerText = inputDescription.value;

        inputTitle.value="";
        inputDescription.value = "";

        getLocalArray.map((curElem)=>{
            if(curElem.title == editLocalTitle && curElem.description == editLocalDesc){
                curElem.title = editTitle.innerText;
                curElem.description = editDesc.innerText;
                localStorage.setItem("localArray", JSON.stringify(getLocalArray));
            }
        })

        AddBtn.innerText = "ADD";

    }

    else{
        let toDoObj = {
            title: inputTitle.value,
            description: inputDescription.value,
        }
        toDoArray.push(toDoObj);
        console.log(toDoArray);

        let li = document.createElement("li");
        li.classList.add("p-lr", "p-tb", "d-grid", "b-radius", "m-t");

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");

        let titlePara = document.createElement("p");
        titlePara.classList.add("title", "f-bold", "text-italic", "text-small");

        let DescPara = document.createElement("p");
        DescPara.classList.add("description", "m-t-10", "f-thin", "text-small");

        let editBtn = document.createElement("i");
        editBtn.classList.add("fa-solid", "fa-pen-to-square", "m-t-10", "text-big", "p-tb-10", "p-lr", "edit_btn", "b-radius");


        let deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fa-solid", "fa-trash-can", "text-big", "p-tb-10", "p-lr", "delete_btn", "b-radius");

        titlePara.innerText = toDoObj.title;
        DescPara.innerText = toDoObj.description;

        li.appendChild(div1);
        li.appendChild(div2);
        div1.appendChild(titlePara);
        div1.appendChild(DescPara);
        div2.appendChild(editBtn);
        div2.appendChild(deleteBtn);
        DataBox.appendChild(li);


        //** assigning the value entered in input field */
        inputTitle.value="";
        inputDescription.value="";


        //* adding data into local storage
        localArray = localStorage.setItem("localArray", JSON.stringify(toDoArray));
    }
}


//** concept of event delegation */
const updateData = (event) =>{

    let targetElem = event.target

    if(targetElem.classList.contains("delete_btn")){

        let getLocalArray = JSON.parse(localStorage.getItem("localArray"));     //** get local storage data */
        let delTitle = targetElem.parentElement.previousElementSibling.firstElementChild.innerText;
        let delDesc = targetElem.parentElement.previousElementSibling.lastElementChild.innerText;

        
        getLocalArray.map((curElem, index)=>{
            if(curElem.title == delTitle && curElem.description == delDesc){
                targetElem.parentElement.parentElement.remove();
                getLocalArray.splice(index, 1);
            }
            localStorage.setItem("localArray", JSON.stringify(getLocalArray));
        })        
    }

    else if(targetElem.classList.contains("edit_btn")){

        AddBtn.innerText = "EDIT";

        editTitle = targetElem.parentElement.previousElementSibling.firstElementChild;
        inputTitle.value = editTitle.innerText;

        editDesc = targetElem.parentElement.previousElementSibling.lastElementChild;
        inputDescription.value = editDesc.innerText;
        inputDescription.focus();

    }
}




const getLocalData = () =>{
    let getLocalArray = JSON.parse(localStorage.getItem("localArray")) || [];

    //** if local storage is not empty then create elements to show the local storage data one-by-one */
    if(getLocalArray != []){
        getLocalArray.forEach((curElem) => {
            let li = document.createElement("li");
            li.classList.add("p-lr", "p-tb", "d-grid", "b-radius", "m-t");
    
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
    
            let titlePara = document.createElement("p");
            titlePara.classList.add("title", "f-bold", "text-italic", "text-small");
    
            let DescPara = document.createElement("p");
            DescPara.classList.add("description", "m-t-10", "f-thin", "text-small");
    
            let editBtn = document.createElement("i");
            editBtn.classList.add("fa-solid", "fa-pen-to-square", "m-t-10", "text-big", "p-tb-10", "p-lr", "edit_btn", "b-radius");
    
    
            let deleteBtn = document.createElement("i");
            deleteBtn.classList.add("fa-solid", "fa-trash-can", "text-big", "p-tb-10", "p-lr", "delete_btn", "b-radius");
    
            titlePara.innerText = curElem.title;
            DescPara.innerText = curElem.description;
    
            li.appendChild(div1);
            li.appendChild(div2);
            div1.appendChild(titlePara);
            div1.appendChild(DescPara);
            div2.appendChild(editBtn);
            div2.appendChild(deleteBtn);
            DataBox.appendChild(li);
        });
    }
    
}




//? functions ====
DataBox.addEventListener("click", updateData);
AddBtn.addEventListener("click", AddData);
document.addEventListener("DOMContentLoaded", getLocalData);
