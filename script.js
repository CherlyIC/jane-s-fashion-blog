const searchInput  = document.querySelector("#search-input");
const posts        = document.querySelectorAll(".post-card");
const tags         = document.querySelectorAll(".tag");
const likeButtons  = document.querySelectorAll(".like-btn");
const scoreDisplay = document.querySelector("#score-display");
const backToTopBtn = document.querySelector("#back-to-top");
const blogHeading  = document.querySelector("#blog-heading");
const navLinks     = document.querySelectorAll(".nav-link");
const noResults    = document.querySelector("#no-results");

if (!scoreDisplay) console.error(" #score-display not found in HTML");
if (!searchInput)  console.error(" #search-input not found in HTML");
if (!blogHeading)  console.error(" #blog-heading not found in HTML");
if (!backToTopBtn) console.error(" #back-to-top not found in HTML");
if (!noResults)    console.error(" #no-results not found in HTML");

let score = 0;

function updateScore() {
  score += 1;
  scoreDisplay.innerText = score;

  if (score >= 10) {
    scoreDisplay.classList.add("gold");
  }
}

likeButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("liked")) {
      btn.classList.remove("liked");
      btn.innerText = "👍 Like";
      score -= 1;
      scoreDisplay.innerText = score;

      if (score < 10) {
        scoreDisplay.classList.remove("gold");
      }
    } else {
      btn.classList.add("liked");
      btn.innerText = "❤️ Liked";
      updateScore();
    }
  });
});

searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  posts.forEach(function (post) {
    if (post.innerText.toLowerCase().includes(query)) {
      post.classList.remove("hidden");
      visibleCount++;
    } else {
      post.classList.add("hidden");
    }
  });

  if (visibleCount === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
});

tags.forEach(function (tag) {
  tag.addEventListener("click", function () {
    const selectedTag = tag.getAttribute("data-tag");

    tags.forEach(function (t) {
      t.classList.remove("active");
    });
    tag.classList.add("active");

    if (selectedTag === "all") {
      blogHeading.innerText = "All Posts";
    } else {
      blogHeading.innerText = selectedTag + " — Posts";
    }

    let visibleCount = 0;

    posts.forEach(function (post) {
      const postTag = post.getAttribute("data-tag");

      if (selectedTag === "all" || postTag === selectedTag) {
        post.classList.remove("hidden");
        visibleCount++;
      } else {
        post.classList.add("hidden");
      }
    });

    searchInput.value = "";

    if (visibleCount === 0) {
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }

    document.querySelector("#blog").scrollIntoView({ behavior: "smooth" });
  });
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});