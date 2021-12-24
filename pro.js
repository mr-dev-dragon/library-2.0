var title = document.getElementById('title');
var author = document.getElementById('author');
var price = document.getElementById('price');
var date = document.getElementById('date');
var language = document.getElementById('language');
var types = document.querySelectorAll('input[name="Selectionner"]');
var formulaire = document.getElementById('form');
var fill = document.getElementsByClassName("fill");
const Novel = document.getElementById('Novel');
const assy = document.getElementById('essy');
const Comic = document.getElementById('Comic');
const test = document.querySelector('.test');
var table = document.getElementsByTagName('table')[0];
var save = document.getElementById('save');
var add = document.getElementById('button');
document.getElementById('save').style.display="none";
var selected;
var validation_ok = true;
var paragraph = document.getElementById('h1');
var storage = JSON.parse(localStorage.getItem("table")) ?? [];
const markup = ` ${storage.map((s)=>{
  return `<tr>
                      <td>${s.title}</td>
                      <td>${s.author}</td>
                      <td>${s.price}</td>
                      <td>${s.language}</td>
                      <td>${s.date}</td>
                      <td>${s.types}</td>
                      <td>

                    <a onClick="btnSupr(this)"><img src="img/x-button (1).png" id="Delete" class="btn"> </a>
                    <a onClick="btnEdit(this)" ><img src="img/write.png"  id="edit" class="btn"> </a>
                        <style>
                            .btn{
                                width: 45px;
                                margin-top:5px ;
                                margin-bottom:-10px ;
                            }
                            .btn:hover{
                            width: 50px;
                            }
                        </style>
                        
                 </td>
  </tr>
  `
}).join('')
}
`
test.insertAdjacentHTML('beforeend', markup);
var allBookNames = [];
formulaire.addEventListener('submit', function eVent(e) {
  e.preventDefault();





  var validation_ok = true;
  if (title.value.length > 30) {
    validation_ok = false;
    fill[0].innerHTML = "must not exceed 30 characters";
    fill[0].style.color = 'red'
  }
  else if (title.value == "") {
    validation_ok = false;
    fill[0].innerHTML = "This field is required";
    fill[0].style.color = 'red'
    title.style.borderColor = "red"
  }
  else {
    title.style.borderColor = "#1a7fe9"
    fill[0].innerHTML = "";
  };
  if (author.value.length > 20) {
    validation_ok = false;
    fill[1].innerHTML = "must not exceed 20 characters";
    fill[1].style.color = 'red'
  }
  else if (author.value == "") {
    validation_ok = false;
    fill[1].innerHTML = "This field is required";
    fill[1].style.color = 'red';
    author.style.borderColor = "red"
  }
  
  else {
    author.style.borderColor = "#1a7fe9"
    fill[1].innerHTML = "";
  };
  if (isNaN(price.value)) {
    validation_ok = false;
    fill[2].innerHTML = "enter a number";
    fill[2].style.color = 'red';
    price.style.borderColor = "red"
  }
  else if (price.value == "") {
    validation_ok = false;
    fill[2].innerHTML = " This field is required";
    fill[2].style.color = 'red';
    price.style.borderColor = "red"
  }
  else if (price.value < 0) {
    validation_ok = false;
    fill[2].innerHTML = " the value of price must be positive";
    fill[2].style.color = 'red';
    price.style.borderColor = "red"
  }
  else {
    fill[2].style.color = '#1a7fe9';
    price.style.borderColor = "#1a7fe9"
    fill[2].innerHTML = "";
  };
  if (date.value == "") {
    validation_ok = false;
    fill[3].innerHTML = "This field is required";
    fill[3].style.color = 'red';
    date.style.borderColor = "red"
  }
  else {
    date.style.borderColor = "#1a7fe9"
    fill[3].innerHTML = "";

  };
  if (language.value == "") {
    validation_ok = false;
    fill[4].innerHTML = "Select a language";
    fill[4].style.color = 'red';
    language.style.borderColor = "red"
  }
  else {
    fill[4].innerHTML = "";
    language.style.borderColor = "#1a7fe9"
  }
  if (!(Novel.checked || assy.checked || Comic.checked)) {
    validation_ok = false;
    fill[5].innerHTML = "Lay down your type of book";
    fill[5].style.color = 'red';
  }
  else {
    fill[5].innerHTML = "";
  }

  for (var type of types) {
    if (type.checked) {
      selected = type.value;
      break;
    }
  }
  class book {
    constructor(title, author, price, date, language, types, email) {
      this.title = title.value;
      this.author = author.value;
      this.price = price.value;
      this.date = date.value;
      this.language = language.value;
      this.types = types.value;
      this.email = email.value;
    }
  };
  if (validation_ok == true) {
    paragraph.innerHTML = `
    

    <div class="infor">
        <p class="p11"><span>the book is</span> ${title.value}</p>
        <p class="p22"><span>thetype of the book </span> ${type.value}</p>
        <p class="p11"><span>the language</span> ${language.value}</p>
        <p class="p22"><span>the author</span> ${author.value}</p>
        <p class="p11"><span>pthe date of public</span> ${date.value}</p>
        <p class="p22"><span>the price</span> ${price.value} Dhs</p>
     </div>
     
     
     
     
     `;
    allBookNames.push(title.value);
    allBookNames.sort();
    let index = 1;
    index += allBookNames.indexOf(title.value);
    table.style.display = "block";
    var ligne = table.insertRow(index);
    ligne.insertCell(0).innerHTML = title.value;
    ligne.insertCell(1).innerHTML = author.value;
    ligne.insertCell(2).innerHTML = price.value;
    ligne.insertCell(3).innerHTML = date.value;
    ligne.insertCell(4).innerHTML = language.options[language.selectedIndex].value;
    ligne.insertCell(5).innerHTML = type.value;
    ligne.insertCell(6).innerHTML = '<button onclick="btnEdit(this)"class="btn">Editer</button>' + '<button onclick="btnSupr(this)"  class="btn"  id="btn2">DELET</button>';
    function localstorage(){
        storage.push({
        title : title.value,
        author : author.value,
        price : price.value,
        date : date.value,
        language: language.value,
        types:type.value,
        email: email.value
      })
      localStorage.setItem("table",JSON.stringify(storage));
    }
    
    localstorage();
    sortTable();
  }

  resetForm();
});
function resetForm() {
  title.value = "";
  author.value = "";
  price.value = "";
  date.value = "";
  language.value = "";
   document.getElementById('button').style.display = "block";
  document.getElementById('save').style.display = "none";
}
function btnSupr(r) {
  alert("you are sure you want to delete this")
  var i = r.parentNode.parentNode.rowIndex;
  table.deleteRow(i);
}
function btnEdit(td) {
  selectedRow = td.parentElement.parentElement;
  title.value = selectedRow.cells[0].innerHTML;
  author.value = selectedRow.cells[1].innerHTML;
  price.value = selectedRow.cells[2].innerHTML;
  date.value = selectedRow.cells[3].innerHTML;
  language.value = selectedRow.cells[4].innerHTML;
  selected = selectedRow.cells[5].innerHTML;

            document.getElementById('button').style.display = "none";
        document.getElementById('save').style.display = "block";
  for (var i = 0; i < 3; i++) {
    if (types[i].value == selectedRow.cells[5].innerHTML) {
      types[i].checked = true;
    }
  }
}
function save() {
  selectedRow.cells[0].innerHTML = title.value;
  selectedRow.cells[1].innerHTML = author.value;
  selectedRow.cells[2].innerHTML = price.value;
  selectedRow.cells[3].innerHTML = date.value;
  selectedRow.cells[4].innerHTML = language.options[language.selectedIndex].value;
  for (var type of types) {
    if (type.checked) {
      selected = type.value;
    }
  }

  selectedRow.cells[5].innerHTML = selected;
  save.style.display = "none";
  sortTable() 
  resetForm();
            document.getElementById('button').style.display = "block";
        document.getElementById('save').style.display = "none";
}
var myApp = new function () {
    sortTable();
   this.printTable = function () {
          
            var tab = document.getElementById('table');
            var win = window.open('', '', 'height=700,width=700');
            win.document.write(tab.outerHTML);
            win.document.close();
            win.print();
   }
   

    }

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector("#table");
  switching = true;

  while (switching) {
     switching = false;
    rows = table.rows;
 
    for (i = 1; i < (rows.length - 1); i++) {

      shouldSwitch = false;
 
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
     
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
 
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
} 

// 
// 
// 
// 
// 
// 

// the end