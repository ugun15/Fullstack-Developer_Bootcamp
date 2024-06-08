let dataMyproject = [];

function submitmyProject(event) {
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

    if (!projectName) {
        alert("Project name harus diisi");
        return;
    } else if (!startDate) {
        alert("Start date harus diisi");
        return;
    } else if (!endDate) {
        alert("End date harus diisi");
        return;
    } else if (!description) {
        alert("Description harus diisi");
        return;
    } else if (!nodejs && !nextjs && !reactjs && !typescript) {
        alert("Silahkan melakukan pilihan technologies");
        return;
    } else if (uploadImage.length === 0) {
        alert("File harus diisi");
        return;
    }

    uploadImage = URL.createObjectURL(uploadImage[0]);

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
    contentContainer.innerHTML = "";
    
    for (let index = 0; index < dataMyproject.length; index++) {
        const project = dataMyproject[index];
        contentContainer.innerHTML += `
                <div class="blog-list-items">
                    <div class="blog-image">
                       <a href="projectdetail.html" target="_black">
                        <img src="${project.image}" alt="image  upload"/>
                        </a>
                    </div>
                    <div class="blog-content">
                        <h2>${project.project} - ${new Date(project.    start).getFullYear()}</h2>
                        <div class="detail-blog">
                            durasi : ${calculateDuration(project.   start, project.end)}
                        </div>
                        <p class="list-deskripsi">${project.    deskripsi}</p>
                        <p class="list-technologies">${project. technologies.map(tech => `<>${tech}</    span>`).join(" ")}</p>
                        <div class="program-icon">
                            <a href="#" class="icon">
                                <i class="fab fa-google-play"></i>
                            </a>
                            <a href="#" class="icon">
                                <i class="fab fa-android"></i>
                            </a>
                            <a href="#" class="icon">
                                <i class="fab fa-java"></i>
                            </a>
                        </div>
                        <div class="btn-group">
                            <button class="btn-edit">edit</button>
                            <button class="btn-delete"  onclick="deleteProject(${index}) ">delete</button>
                        </div>
                    </div>
                </div>
        `;
    }
}

function deleteProject(index) {
    dataMyproject.splice(index, 1);
    renderBlog();
}

function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let diffYears = endDate.getFullYear() - startDate.getFullYear();
    let diffMonths = endDate.getMonth() - startDate.getMonth();
    let diffDays = endDate.getDate() - startDate.getDate();

    if (diffDays < 0) {
        diffMonths--;
        diffDays += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    }
    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    return `${diffMonths} bulan `;
}
