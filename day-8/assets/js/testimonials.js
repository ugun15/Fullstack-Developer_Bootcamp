const TestimoniData = [
    {
      image : "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: '"Keren banget jasanya!"',
      author: "Harps Joseph",
      rating: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: '"Keren lah pokonya!"',
      author: "Christian Buehner",
      rating: 4,
    },
    {
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: '"The best pelayanannya!"',
      author: "Irene Strong",
      rating: 4,
    },
    {
      image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: '"Oke lah!"',
      author: "Jeffrey Keenan",
      rating: 3,
    },
    {
      image: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: '"Apa apaan ini!"',
      author: "Salomé Guruli",
      rating: 1,
    },
  ];
  
  function html(item) {
    return `
      <div class="testimonial">
          <img src="${item.image}" alt="testimonial" class="profile-testimonial">
              <p class="quote">${item.content}</p>
              <p class="author">- ${item.author}</p>
              <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>`;
  }
  
  function allTestimonial() {
    let testimonialHtml = ``;
    TestimoniData.forEach((item) => {
      testimonialHtml += html(item);
    });
  
    document.getElementById("testimonials").innerHTML = testimonialHtml;
  }
  
  allTestimonial();
  
  function filterTestimonials(rating) {
    let testimonialHtml = ``;
    const testimonialFilter = TestimoniData.filter((item) => {
      return item.rating === rating;
    });
  
    if (testimonialFilter.length === 0) {
      testimonialHtml = `<h1> Data not found!</h1>`;
    } else {
      testimonialFilter.forEach((item) => {
        testimonialHtml += html(item);
      });
    }
  
    document.getElementById("testimonials").innerHTML = testimonialHtml;
  }
  