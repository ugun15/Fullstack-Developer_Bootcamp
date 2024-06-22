let dataMyproject = [];

function submitmyProject(event) {

    // Fungsi dari even dan prevenDefault adalah menahan agar
    // tidak terjadinya refresh langsung halaman
    // ketika kita inputkan data, agar kita tau datanya sudah
    // masuk atau belum jika via console dan dapat kita lihat 
    // perubahan jika menggunakan inerhtml
    event.preventDefault();

    let projectName = document.getElementById("projectName").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let description = document.getElementById("description").value;
    let nodejs = document.getElementById("nodejs").checked ? document.getElementById("nodejs").value : "";
    let nextjs = document.getElementById("nextjs").checked ? document.getElementById("nextjs").value : "";
    let reactjs = document.getElementById("reactjs").checked ? document.getElementById("reactjs").value : "";
    let typescript = document.getElementById("typescript").checked ? document.getElementById("typescript").value : "";
    let uploadImage = document.getElementById("uploadImage").files;

    // Pengkondisian pada input data Add Project
    if (!projectName) {
        alert("Project name harus diisi"); // Kondisi 1
        return;
    } else if (!startDate) {
        alert("Start date harus diisi"); // Kondisi 2
        return;
    } else if (!endDate) {
        alert("End date harus diisi"); // Kondisi 3
        return;
    } else if (!description) {
        alert("Description harus diisi"); // Kondisi 4
        return;
    } else if (!nodejs && !nextjs && !reactjs && !typescript) {
        alert("Silahkan melakukan pilihan technologies"); // Kondisi 5
        return;
    } else if (uploadImage.length === 0) {
        alert("File harus diisi"); // Kondisi 6
        return;
    }

    // Mengambil sumber dari file image(jpn/png/dll)
    uploadImage = URL.createObjectURL(uploadImage[0]);

    // Datanya ini akan dimasukkan kedalam sebuah Array
    const addProject = {
        project: projectName,
        start: startDate,
        end: endDate,
        deskripsi: description,
        technologies: [nodejs, nextjs, reactjs, typescript].filter(tech => tech !== ""),
        image: uploadImage,
        postAt: new Date().toLocaleDateString(),
        author: "Gunawan Dzakwan S",
    };

    dataMyproject.push(addProject);
    console.log("dataArray", dataMyproject);
    renderBlog();
}

function renderBlog() {
    const contentContainer = document.getElementById("content");
    contentContainer.innerHTML = `
    <!--Pemindahan elemen Row dipindahkan keluar dari loop for, sehingga semua card proyek ditempatkan di dalam elemen row yang sama.-->
        <section class="custom-section w-100">
            <div class="container-fluid p-5 my-5">
                <h1 class="text-center mb-3 p-5">MY PROJECT</h1>
                <div class="row" id="projectRow"></div>
            </div>
        </section>
    `;
    
    const projectRow = document.getElementById("projectRow");

    // Melakukan pengulangan card project dengan data berbeda 
    // dengan baris yang sama  
    for (let index = 0; index < dataMyproject.length; index++) {
        const project = dataMyproject[index];
        const projectCard = `
            <div class="col-md-4 mb-4">
                <div class="card project-card"> 
                    <img 
                        src="${project.image}" 
                        class="rounded m-4"
                        alt="Project Image"
                    />
                    <div class="card-body">
                        <h5 class="card-title">
                            ${project.project} - ${new Date(project.start).getFullYear()}
                        </h5>
                        <p class="card-text">
                            durasi : ${calculateDuration(project.start, project.end)}
                        </p>
                        <p class="card-text">
                            ${project.deskripsi}
                        </p>
                        <p class="list-technologies">
                            ${project.technologies.map(tech => `- ${tech}</span>`).join(" ")}
                        </p>
                        <div class="d-flex justify-content-evenly mt-3 gap-2">
                            <button class="btn btn-warning w-50">
                                Edit
                            </button>
                            <button class="btn btn-danger w-50" onclick="deleteProject(${index})">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        projectRow.innerHTML += projectCard;
    }
}

// Fungsi melakukan delete data Myproject
function deleteProject(index) {
    dataMyproject.splice(index, 1);
    renderBlog();
}

// Fungsi kalkulasi / perhitungan sebuah durasi 
function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    let diffYears = endDate.getFullYear() - startDate.getFullYear();
    let diffMonths = endDate.getMonth() - startDate.getMonth();
    let diffDays = endDate.getDate() - startDate.getDate();

    // Pengkondisian perhitungan durasi hari
    if (diffDays < 0) {
        diffMonths--;
        diffDays += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    }

    // Pengkondisian perhitungan durasi bulan
    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }
    
    return `${diffMonths} bulan`;

}
