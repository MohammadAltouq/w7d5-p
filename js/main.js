
setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();
  const d1 = new Date(); 
  document.querySelector("d").innerHTML = d.toLocaleTimeString();
  document.querySelector("d1").innerHTML = d1.toLocaleDateString();
}
const form = document.querySelector('#addForm')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event)
})
console.log(form)
const getData  = async (city) => {
    let Response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b1f1c730941092079eca533aba75648&units=Imperial`)
    
    return Response.data
}

const addCity = (name, temp, temp_max, temp_min, humidity, description, d_icon, timeAdded)  => {
    
    let html = `<tr>
    <td>${name}</td>
    <td>${temp}<span>&#8457;</span></td>
    <td>${temp_max}<span>&#8457;</span>/${temp_min}<span>&#8457;</span></td>
    <td>${humidity}%</td>
    <td><img style="display:block;" width="10%" height="10%" src="https://openweathermap.org/img/wn/${d_icon}@2x.png" alt="${description}" title="${description}" /></td>
    <td>${timeAdded}</td>
    <td><input type="button" value="Delete Row" id="myclass" onclick="SomeDeleteRowFunction()"></td>
    </tr>`
    document.querySelector('tbody').insertAdjacentHTML('beforeend', html);
    // alert(name +" was added")
}

const load_data = async () => {
    let city = document.querySelector('#city').value
    let info = await getData(city);
    let t = new Date()
    let timeAdded = t.toLocaleTimeString();
    timeAdded = timeAdded + " "+ t.toLocaleDateString()
    // addCity(info.id, info.name, info.main.temp, info.main.temp_max, info.main.temp_min, info.main.humidity, info.weather[0].description)
    addCity(info.name, info.main.temp, info.main.temp_max, info.main.temp_min, info.main.humidity, info.weather[0].description, info.weather[0].icon, timeAdded)
}

function SomeDeleteRowFunction() {
    var td = event.target.parentNode;
    var tr = td.parentNode; 
    tr.parentNode.removeChild(tr);
    let trs = Array.from(document.querySelector('tbody').querySelectorAll('.ip-row'))
    let index = 1;
    trs.forEach((tr) => { 
        tr.querySelectorAll('td')[0].innerHTML = index;
        index++
    })
}


