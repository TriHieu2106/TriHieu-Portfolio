"use strict";

/* ======================================
   Project Data
====================================== */

const projectData = {
  malware: {
    category: "Information Assurance",
    title: "Malware Analysis & Digital Forensics",
    description:
      "A cybersecurity analysis project focused on examining suspicious samples inside an isolated analysis environment and investigating their behavior.",
    highlights: [
      "Used FlareVM as an isolated malware-analysis environment.",
      "Observed network behavior and traffic using Wireshark.",
      "Practiced static and behavioral analysis techniques.",
      "Used YARA concepts to identify suspicious patterns and indicators."
    ],
    technologies: [
      "FlareVM",
      "Wireshark",
      "YARA",
      "Digital Forensics",
      "Malware Analysis"
    ]
  },

  database: {
    category: "Database",
    title: "Relational Database System",
    description:
      "A database design project focused on creating a structured relational system in SQL Server using a clearly defined data model.",
    highlights: [
      "Designed an Entity Relationship Diagram (ERD).",
      "Created a database model containing 10 entities.",
      "Defined relationships between entities.",
      "Applied relational database design principles.",
      "Implemented the structure using SQL Server."
    ],
    technologies: [
      "SQL Server",
      "SQL",
      "ERD",
      "Database Design",
      "Relational Database"
    ]
  },

  workshop: {
    category: "Leadership",
    title: '"Sắc Màu Nón Lá" Workshop',
    description:
      "A collaborative workshop project where I worked as Project Leader and coordinated planning, logistics, communication, and participant feedback.",
    highlights: [
      "Served as Project Leader.",
      "Coordinated responsibilities across the project team.",
      "Supported logistics and workshop preparation.",
      "Managed participant communication and organization.",
      "Helped implement systems for collecting participant feedback."
    ],
    technologies: [
      "Leadership",
      "Teamwork",
      "Communication",
      "Project Planning",
      "Feedback Management"
    ]
  }
};


/* ======================================
   Elements
====================================== */

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

const modal = document.getElementById("projectModal");
const modalDialog = modal.querySelector(".modal-dialog");
const modalClose = document.getElementById("modalClose");

const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalHighlights = document.getElementById("modalHighlights");
const modalTech = document.getElementById("modalTech");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

let lastFocusedElement = null;


/* ======================================
   Project Filtering
====================================== */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // Update button state
    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    // Filter project cards
    projectCards.forEach((card) => {
      const category = card.dataset.category;

      const shouldShow =
        filter === "all" || category === filter;

      card.classList.toggle("hidden", !shouldShow);
    });
  });
});


/* ======================================
   Project Modal
====================================== */

function openModal(projectKey) {
  const project = projectData[projectKey];

  if (!project) {
    return;
  }

  lastFocusedElement = document.activeElement;

  // Insert project content
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  modalHighlights.innerHTML = "";
  modalTech.innerHTML = "";

  project.highlights.forEach((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;

    modalHighlights.appendChild(item);
  });

  project.technologies.forEach((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;

    modalTech.appendChild(tag);
  });

  // Show modal
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  // Move keyboard focus into modal
  modalClose.focus();
}


function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  // Return focus to element that opened the modal
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}


/* Open modal from project cards */

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    openModal(card.dataset.project);
  });

  // Allow Enter / Space to activate cards
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      openModal(card.dataset.project);
    }
  });
});


/* Close modal button */

modalClose.addEventListener("click", closeModal);


/* Close when clicking overlay */

modal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) {
    closeModal();
  }
});


/* ======================================
   Keyboard Accessibility
====================================== */

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("open")) {
    return;
  }

  // Escape closes modal
  if (event.key === "Escape") {
    closeModal();
    return;
  }

  // Trap Tab focus inside modal
  if (event.key === "Tab") {
    trapFocus(event);
  }
});


function trapFocus(event) {
  const focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ];

  const focusableElements = [
    ...modalDialog.querySelectorAll(
      focusableSelectors.join(",")
    )
  ];

  if (focusableElements.length === 0) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement =
    focusableElements[focusableElements.length - 1];

  if (
    event.shiftKey &&
    document.activeElement === firstElement
  ) {
    event.preventDefault();
    lastElement.focus();
  } else if (
    !event.shiftKey &&
    document.activeElement === lastElement
  ) {
    event.preventDefault();
    firstElement.focus();
  }
}


/* ======================================
   Mobile Navigation
====================================== */

menuToggle.addEventListener("click", () => {
  const isOpen =
    menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute(
    "aria-expanded",
    String(!isOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen
      ? "Open navigation menu"
      : "Close navigation menu"
  );

  navLinks.classList.toggle("open");
});


/* Close mobile menu when link is selected */

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  });
});


/* ======================================
   Footer Year
====================================== */

document.getElementById("currentYear").textContent =
  new Date().getFullYear();