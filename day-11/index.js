const express = require("express");
const path = require("path"); // Ini sudah langsung ada di Node.JS

const app = express();
const port = 5000;

// app.set 
// Untuk mendeskripsikan template engine yang dipakai
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "src/views")); // Ini memberitahu template-engine mengambil dari folder views

app.use("/assets", express.static(path.join(__dirname, "src/assets"))); // Ini untuk mengambil semua folder assets dengan statis biar bisa terpanggil jika menggunakan "hbs"

app.get("/", home); // Ini adalah home / mengambil di home, dan home adalah sebuah fungsi.
app.get("/myproject", myproject); // Ini adalah myproject / mengambil myproject, dan myproject adalah sebuah fungsi.
app.get("/testimonial", testimonial); // Ini adalah testimonial / mengambil testimonial, dan testimonial adalah sebuah fungsi.
app.get("/contact", contact); // Ini adalah contact / mengambil contact, dan contact adalah sebuah fungsi.

// function home
function home(req,res) {
    res.render("index"); // Yaitu agar melakukan sebuah respon untuk merender pada halaman "index"
}

function myproject(req,res) {
    res.render("myproject"); // Yaitu agar melakukan sebuah respon untuk merender pada halaman "myproject"
}

function testimonial(req,res) {
    res.render("testimonial"); // Yaitu agar melakukan sebuah respon untuk merender pada halaman "testimonial"
}

function contact(req,res) {
    res.render("contact"); // Yaitu agar melakukan sebuah respon untuk merender pada halaman "contact"
}


app.listen(port, () => {
    console.log(`Sever berjalan pada port ${port}`);
}); 