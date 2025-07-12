var data_;
fetch("https://raw.githubusercontent.com/Daradege/distrosearch/refs/heads/main/database.json")
.then(data => data.json())
.then(data => {
    data_ = data
})


document.addEventListener("DOMContentLoaded", function () {

        // roles

        const uniqueGoodFor = new Set();

        for (const base in data_.bases) {
            for (const distro in data_.bases[base]) {
                data_.bases[base][distro].good_for.forEach(item => {
                    uniqueGoodFor.add(item);
                });
            }
        }
        const roles = Array.from(uniqueGoodFor);
        const role_select = document.getElementById("role");
        role_select.innerHTML = roles.map(item => `<option value="${item}">${item}</option>`).join('');
        role_select.innerHTML += `<option value="All">All</option>`;

        // de

        const desktopEnvs = new Set();
        for (const base in data_.bases) {
            for (const distro in data_.bases[base]) {
                data_.bases[base][distro].official_desktop_environments.forEach(item => {
                    desktopEnvs.add(item);
                });
            }
        }

        const envs = Array.from(desktopEnvs);

        const  desktop_envs_select = document.getElementById("desktop");
        desktop_envs_select.innerHTML = envs.map(item => `<option value="${item}">${item}</option>`).join('');
        desktop_envs_select.innerHTML += `<option value="All">All</option>`;

        // packageman

        const packageManagers = new Set();
        for (const base in data_.bases) {
            for (const distro in data_.bases[base]) {
                data_.bases[base][distro].package_managers.forEach(item => {
                    packageManagers.add(item);
                })
            }
        }

        const package_managers_select = document.getElementById("packageManager");
        package_managers_select.innerHTML = Array.from(packageManagers).map(item => `<option value="${item}">${item}</option>`).join('');
        package_managers_select.innerHTML += `<option value="All">All</option>`;

        // base

        const bases = new Set();

        for (const base in data_.bases) {
            for (const distro in data_.bases[base]) {
                bases.add(data_.bases[base][distro].based_on)
            }
        }

        const based_on = document.getElementById("base");
        based_on.innerHTML = Array.from(bases).map(item => `<option value="${item}">${item}</option>`).join('');
        based_on.innerHTML += `<option value="All">All</option>`;

    })

    document.getElementById("submitbutton").addEventListener("click", function() {
            const selected_role = document.getElementById("role").value;
            const selected_desktop = document.getElementById("desktop").value;
            const selected_package_manager = document.getElementById("packageManager").value;
            const selected_base = document.getElementById("base").value;
            
            var matches = new Array();
            for (const base in data_.bases) {
                for (const distroName in data_.bases[base]) {

                    const distro = data_.bases[base][distroName];
                    
                    const roleMatch = selected_role === "All" || (distro.good_for && distro.good_for.includes(selected_role));
                    
                    const desktopMatch = selected_desktop === "All" || (distro.official_desktop_environments && distro.official_desktop_environments.includes(selected_desktop));

                    const packageManagerMatch = selected_package_manager === "All" || (distro.package_managers && distro.package_managers.includes(selected_package_manager));
                    
                    const baseMatch = selected_base === "All" || (distro.based_on && (distro.based_on.includes(selected_base) || base === selected_base));
                    
                    
                    if (roleMatch && desktopMatch && packageManagerMatch && baseMatch) {
                        matches.push({
                            name: distroName,
                            base: base,
                            version: distro.latest_version,
                            website: distro.website
                        });
                    }
                }
            }
            var showto = document.getElementById("preferencesSummary");
            showto.innerHTML = '';
            matches.forEach(match => {
                showto.innerHTML += `
                <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 class="text-xl font-bold text-green-800 mb-2">${match.name}</h2>
                <ul class="list-disc pl-5">
                <li class="text-green-600">Version: ${match.version}</li>
                <li class="text-green-600">Website: <a class="text-cyan-600" href="${match.website}">${match.website}</a></li>
                </ul>
                </div>
                `
            });
        })