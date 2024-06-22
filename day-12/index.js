const express = require("express");
const path = require("path");
const multer = require("multer");
const hbs = require("hbs");

const app = express();
const port = 5000;

const projects = [];

// Setting template engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Setting static folder assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));

// Middleware untuk mengurai data form
app.use(express.urlencoded({ extended: false }));

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Cek apakah ada file yang diunggah
    if (file) {
      cb(null, 'src/assets');
    } else {
      // Jika tidak ada file, biarkan kosong
      cb(null, null);
    }
  },
  filename: function (req, file, cb) {
    // Cek apakah ada file yang diunggah
    if (file) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    } else {
      // Jika tidak ada file, biarkan kosong
      cb(null, null);
    }
  }
});

const upload = multer({ storage: storage });

// Register helper function untuk menghitung tahun 
hbs.registerHelper('formatYear', function(dateString) {
  const date = new Date(dateString);
  return date.getFullYear();
});

// Register helper function untuk menghitung durasi
hbs.registerHelper('duration', function(start_date, end_date) {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Jika start date dan end date sama, tampilkan durasi dalam hari
  if (diffDays === 0) {
    return `${diffDays + 1} day`;
  }
  
  const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  if (diffMonths >= 1) {
    return `${diffMonths} bulan`;
  } else {
    return `${diffDays} hari`;
  }
});

// Setting Routing
app.get("/", (req, res) => res.render('index', { projects }));
app.get("/addmyproject", (req, res) => res.render('addmyproject'));
app.get("/testimonial", (req, res) => res.render('testimonial'));
app.get("/contact", (req, res) => res.render('contact'));
app.get('/updatemyproject', (req, res) => res.render('updatemyproject'));

// Route untuk menambahkan proyek baru
app.post('/addmyproject', upload.single('image'), (req, res) => {
  const { inputProject, startDate, endDate, description, technologies } = req.body;
  const newProject = {
    inputProject: inputProject,
    start: startDate,
    end: endDate,
    deskripsi: description,
    technologies: Array.isArray(technologies) ? technologies : [technologies],
    image: req.file ? `/assets/${req.file.filename}` : '', // Hanya simpan jika ada file
    postAt: new Date().toLocaleDateString(),
    author: "Gunawan Dzakwan S",
  };
  console.log(newProject);
  projects.push(newProject);
  res.redirect('/');
});

// Route untuk menampilkan detail proyek berdasarkan index
app.get('/project/:index', (req, res) => {
    const { index } = req.params;
    const project = projects[index];
    if (project) {
      res.render('projectDetail', { project });
    } else {
      res.status(404).send('Project not found');
    }
});

// Route untuk mengupdate proyek
app.get('/updatemyproject/:index', (req, res) => {
  const { index } = req.params;
  const project = projects[index];
  if (project) {
    res.render('updatemyproject', { project, index });
  } else {
    res.status(404).send('Project not found');
  }
});

// Route untuk megirim data update
app.post('/updatemyproject/:index', upload.single('image'), (req, res) => {
  const { index } = req.params;
  const { inputProject, startDate, endDate, description, technologies } = req.body;
  const project = projects[index];
  
  project.inputProject = inputProject;
  project.start = startDate;
  project.end = endDate;
  project.deskripsi = description;
  project.technologies = Array.isArray(technologies) ? technologies : [technologies];
  
  if (req.file) {
    project.image = `/assets/${req.file.filename}`;
  }
  
  res.redirect('/');
});

// Route untuk delete proyek
app.post('/deleteproject/:index', (req, res) => {
    const { index } = req.params;
    projects.splice(index, 1);
    res.redirect('/');
});

// Route untuk port
app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
