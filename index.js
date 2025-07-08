document.addEventListener("DOMContentLoaded", function () {
    fetch("database.json")
    .then(response => response.json())
    .then(data => {
        var main_element = document.getElementById("main_contents");
        var bases = Object.keys(data.bases);
        
        bases.forEach(base => {
            var base_element = document.createElement("div");
            base_element.classList.add("base_element", "bg-white", "rounded-lg", "shadow-md", "p-6", "hover:shadow-lg", "transition-shadow", "cursor-pointer", "border-2", "border-transparent", "hover:border-green-300");
            
            base_element.innerHTML = `
            <div class="flex flex-col h-full justify-between p-4">
                <!-- Image container to center image vertically -->
                <div class="flex justify-center items-center mb-4" style="height: 200px;">
                    <img class="max-w-full h-auto" src="assets/${base}.png" alt="${base}">
                </div>
                <!-- Text content aligned at the bottom -->
                <div>
                    <h3 class="text-xl font-bold text-green-800 capitalize mb-2">${base}</h3>
                    <p class="text-green-600 text-sm">${Object.keys(data.bases[base]).length} distributions</p>
                </div>
            </div>
            `;
            base_element.addEventListener('click', function() {
                showDistros(base, data.bases[base]);
            });
            
            main_element.appendChild(base_element);
        });
    })
    .catch(error => {
        console.error('Oops! Something went wrong:', error);
        document.getElementById("main_contents").innerHTML = `
            <div class="col-span-full text-center p-8">
                <p class="text-red-500 text-lg">😅 Couldn't load the data. Maybe try refreshing?</p>
            </div>
        `;
    });
});

function showDistros(baseName, distros) {
    const detailsElement = document.getElementById("distro_details");
    const distroNames = Object.keys(distros);
    
    let distroCards = '';
    distroNames.forEach(distroName => {
        const distro = distros[distroName];
        const goodForTags = distro.good_for.map(tag => 
            `<span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">${tag}</span>`
        ).join('');

        const PackageManagers = distro.package_managers.map(tag => 
            `<span class="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">${tag}</span>`
        ).join('');
        
        const deTags = distro.official_desktop_environments.map(de => 
            `<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">${de}</span>`
        ).join('');
        
        distroCards += `
        <div class="bg-green-50 rounded-lg p-4 border border-green-200 hover:bg-green-100 transition-colors flex items-start">
            <div class="flex-1">
                <h4 class="text-lg font-bold text-green-900 mb-2">${distroName}</h4>
                <div class="space-y-2 text-sm">
                    <p><span class="font-semibold text-gray-700">Version:</span> <span class="text-green-700">${distro.latest_version}</span></p>
                    <p><span class="font-semibold text-gray-700">Based on:</span> <span class="text-green-700">${distro.based_on}</span></p>
                    <p><span class="font-semibold text-gray-700">Country:</span> <span class="text-green-700">${distro.country}</span></p>
                    <p><span class="font-semibold text-gray-700">Website:</span> <a class="text-cyan-700" href="${distro.website}">${distro.website}</a></p>
                    <div>
                        <span class="font-semibold text-gray-700">Good for:</span>
                        <div class="mt-1">${goodForTags}</div>
                    </div>
                    <div>
                        <span class="font-semibold text-gray-700">Package Managers:</span>
                        <div class="mt-1">${PackageManagers}</div>
                    </div>
                    ${distro.official_desktop_environments.length > 0 ? `
                    <div>
                        <span class="font-semibold text-gray-700">Desktop Environments:</span>
                        <div class="mt-1">${deTags}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
            <div class="ml-4 w-24 h-24 flex-shrink-0">
                <img src="assets/distrologos/${distroName.toLowerCase()}.png" alt="${distroName}" class="w-full h-full object-cover rounded-lg" />
            </div>
        </div>
        `;
    });
    
    detailsElement.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-green-800 capitalize">🐧 ${baseName} Based Distributions</h3>
            <button onclick="hideDistros()" class="text-green-600 hover:text-green-800 font-semibold">✕ Close</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${distroCards}
        </div>
        <div class="mt-4 text-xs text-gray-500 text-center">
            <p>💡 Tip: Data might be a bit outdated or quirky - that's the charm!</p>
        </div>
    `;
    
    detailsElement.classList.remove('hidden');
    detailsElement.scrollIntoView({ behavior: 'smooth' });
}

function hideDistros() {
    document.getElementById("distro_details").classList.add('hidden');
}
