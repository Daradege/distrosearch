document.addEventListener("DOMContentLoaded", function () {
    fetch("database.json")
    .then(response => response.json())
    .then(data => {
        var main_element = document.getElementById("main_contents")
        var bases = Object.keys(data.bases);
        bases.forEach(base => {
            var base_element = document.createElement("div");
            base_element.classList.add("base_element");
            base_element.innerHTML = `${String.}: ${Object.keys(data.bases[base])}`;
            main_element.appendChild(base_element);
        });
    })
})