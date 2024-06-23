const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const path = require("path"); // Ini sudah ada di Node JS
const moment = require("moment"); // Menambahkan moment
const hbs = require("hbs");
const app = express();
const port = 5000;

// Setting template engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Setting folder static assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));

// Middleware -> yang berfungsi sebagai alat untuk memproses inputan dari form (Request)
app.use(express.urlencoded({ extended: false }));

// Register helper function untuk menghitung tahun 
hbs.registerHelper('formatYear', function(dateString) {
  const date = moment(dateString);
  return date.year();
});

// Register helper fungsi untuk menghitung durasi
hbs.registerHelper('duration', function(start_date, end_date) {
  const startDate = moment(start_date);
  const endDate = moment(end_date);
  const diffDays = endDate.diff(startDate, 'days');

  if (diffDays < 30) {
    return `${diffDays} hari`;
  } else {
    const diffMonths = endDate.diff(startDate, 'months');
    return `${diffMonths} bulan`;
  }
});

hbs.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Setting Routing
app.get("/", async (req, res) => {
  try{
    // Mengambil semua project dari sebuah database
    const projectFromDB = await sequelize.query(`SELECT * FROM "Projects"`, {type : QueryTypes. SELECT});

    // Melakukan sebuah parsing JSON string technology kembali ke sebuah array
    projectFromDB.forEach(project => {
      project.technologies = JSON.parse(project.technologies);
    });

    res.render('index', { projects : projectFromDB });
  } catch (error) {
    console.error('Error when fetching projects:', error);
    res.status(500).send('Failed to fetch projects');
  }
});

app.get("/addmyproject", (req, res) => res.render('addmyproject'));
app.get("/testimonial", (req, res) => res.render('testimonial'));
app.get("/contact", (req, res) => res.render('contact'));
app.get('/updatemyproject', (req, res) => res.render('updatemyproject'));

app.post('/addmyproject', async (req, res) => {
  const { inputProject, startDate, endDate, description, technologies } = req.body;
  const newProject = {
    name: inputProject,
    start_date: startDate,
    end_date: endDate,
    descriptions: description,
    technologies: JSON.stringify(Array.isArray(technologies) ? technologies : [technologies]),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  try {
    // Simpan proyek ke dalam database menggunakan Sequelize
    await sequelize.query(
      `INSERT INTO "Projects" (name, start_date, end_date, descriptions, technologies, "createdAt", "updatedAt") VALUES (:name, :start_date, :end_date, :descriptions, :technologies, :createdAt, :updatedAt)`,
      {
        replacements: newProject,
        type: QueryTypes.INSERT
      }
    );

    // Ambil kembali semua proyek dari database dan perbarui variabel projects
    const projectsFromDB = await sequelize.query(`SELECT * FROM "Projects"`, { type: QueryTypes.SELECT });
    projectsFromDB.forEach(project => {
      project.technologies = JSON.parse(project.technologies);
    });

    // Redirect ke halaman Home setelah menyimpan proyek
    res.redirect('/');
  } catch (error) {
    console.error('Error when adding project:', error);
    res.status(500).send('Failed to add project');
  }
});

// Route untuk menampilkan detail proyek berdasarkan index
app.get('/projectdetail/:index', async (req, res) => {
    const { index } = req.params;
    try {
      // Mengambil semua project pada database
      const projectsFromDB = await sequelize.query(`SELECT * FROM "Projects"`, { type: QueryTypes.SELECT });
        projectsFromDB.forEach(project => {
          project.technologies = JSON.parse(project.technologies);
      });

    const project = projectsFromDB[index];
    if (project) {
      res.render('projectdetail', { project });
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    console.error('Error when fetching projects:', error);
    res.status(500).send('Failed to fetch projects');
  }
});

// Route untuk mendapatkan form update project
app.get('/updatemyproject/:index', async (req, res) => {
  const { index } = req.params;
  try {
    // Mengambil semua proyek dari database
    const projectsFromDB = await sequelize.query(`SELECT * FROM "Projects"`, { type: QueryTypes.SELECT });
    projectsFromDB.forEach(project => {
      project.technologies = JSON.parse(project.technologies);
    });

    const project = projectsFromDB[index];
    if (project) {
      res.render('updatemyproject', { project, projectIndex: index });
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    console.error('Error when fetching projects:', error);
    res.status(500).send('Failed to fetch projects');
  }
});

app.post('/updatemyproject/:index', async (req, res) => {
  const { index } = req.params;
  const { inputProject, startDate, endDate, description, technologies } = req.body;
  try {
    const updatemyproject = {
      name: inputProject,
      start_date: startDate,
      end_date: endDate,
      descriptions: description,
      technologies: JSON.stringify(Array.isArray(technologies) ? technologies : [technologies]),
      updatedAt: new Date()
    };

    await sequelize.query(
      `UPDATE "Projects" SET name = :name, start_date = :start_date, end_date = :end_date, descriptions = :descriptions, technologies = :technologies, "updatedAt" = :updatedAt WHERE id = :id`,
      {
        replacements: { ...updatemyproject, id: index },
        type: QueryTypes.UPDATE
      }
    );

    res.redirect('/');
  } catch (error) {
    console.error('Error when updating project:', error);
    res.status(500).send('Failed to update project');
  }
});

// Route untuk delete project
app.post('/deleteproject/:index', async (req, res) => {
  const { index } = req.params;
  try {
    await sequelize.query(
      `DELETE FROM "Projects" WHERE id = :id`,
      {
        replacements: { id: index },
        type: QueryTypes.DELETE
      }
    );
  res.redirect('/');
  } catch (error) {
    console.error('Error when deleting project:', error);
    res.status(500).send('Failed to delete project');
  }
});

// Route untuk port
app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
