document.addEventListener("DOMContentLoaded", function () {
    fetch("../desktops.json")
    .then(response => response.json())
    .then(data => {
        var main_element = document.getElementById("main_contents");
        var envs = Object.keys(data);

        envs.forEach(element => {
            main_element.appendChild(document.createElement("div")).innerHTML = `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4">
            <img src="../assets/desktops/${element}.png" alt="${element}">
            <h2 class="text-xl font-bold text-green-800 mb-2">${data[element].name}</h2>
            <ul class="list-disc pl-5">
                <li class="text-green-600">${data[element].description}</li>
                <li class="text-green-600">Website: <a class="text-cyan-600" href="${data[element].website}">${data[element].website}</a></li>
                <li class="text-red-600">Developer: ${data[element].developed_by}</li>
            </ul>
            Tags: ${data[element].tags.map(tag => `<span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">${tag}</span>`).join(' ')}
            </div>`
        });

    })
})