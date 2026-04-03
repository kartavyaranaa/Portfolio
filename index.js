import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

/* --- THREE.JS LIQUID BUTTON --- */
function initLiquidButton(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0,
        metalness: 0.1,
        transmission: 0.95,
        thickness: 0.5,
        ior: 1.5,
        opacity: 0.8,
        transparent: true,
        clearcoat: 1,
    });

    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.015;
        renderer.render(scene, camera);
    };
    animate();

    container.addEventListener('click', () => {
        material.emissive.setHex(0x333333);
        setTimeout(() => {
            material.emissive.setHex(0x000000);
            window.location.href = 'contact.html';
        }, 100);
    });
}

/* --- INIT GSAP & OBSERVERS --- */
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));

    // 2. Hero Animations
    const hero = document.querySelector(".hero-section");
    const heroText = document.querySelector(".hero-text");
    const heroRight = document.querySelector(".hero-right");

    if (hero && heroText && heroRight) {
        gsap.timeline({
            scrollTrigger: {
                trigger: hero, start: "top top", end: "bottom top", scrub: 1.2,
            }
        })
            .to(heroText, { y: -120, scale: 0.92, opacity: 0.85, ease: "power2.out" }, 0)
            .to(heroRight, { y: -80, opacity: 0, ease: "power2.out" }, 0);

        gsap.to(hero, {
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            "--hero-parallax": "120px"
        });
        ScrollTrigger.create({
            trigger: hero, start: "top top", end: "bottom top",
            onEnter: () => hero.classList.add("hero-active"),
            onLeaveBack: () => hero.classList.remove("hero-active")
        });
    }

    // 3. Footer Name Swipe
    gsap.from(".footer-name", {
        scrollTrigger: { trigger: ".site-footer", start: "top 90%", toggleActions: "play none none none" },
        x: -200, opacity: 0, duration: 1.5, ease: "power4.out", autoAlpha: 1, delay: 0.2
    });
}

/* --- POPUPS & INTERACTION --- */
function initPopups() {
    const popup = document.getElementById('github-popup');
    const closeBtn = document.getElementById('close-popup');

    function togglePopup() {
        if (!popup) return;
        popup.classList.add('show');
        setTimeout(() => { popup.classList.remove('show'); }, 5000);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => popup.classList.remove('show'));
    }

    setTimeout(() => {
        togglePopup();
        setInterval(togglePopup, 30000);
    }, 3000);

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .category-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.8)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });
}

/* --- MODAL LOGIC --- */
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');

window.openModal = function(projectId) {
    let content = '';
    const githubBase = 'https://github.com/kartavyaranaa/';
    
    if (projectId === 'project-pathfinder') {
        content = `
            <h2>Pathfinder Prime</h2>
            <p>An Autonomous Delivery Agent built with Python. Advanced pathfinding and navigation system.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li>Python</li>
                <li>Pathfinding Algorithms</li>
                <li>MIT License</li>
            </ul>
            <p><a href="${githubBase}Pathfinder-Prime" target="_blank" class="project-link">View on GitHub →</a></p>
        `;
    } else if (projectId === 'project-microtools') {
        content = `
            <h2>Micro Tools</h2>
            <p>Collection of JavaScript micro-tools for everyday development tasks.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li>JavaScript</li>
            </ul>
            <p><a href="${githubBase}Micro-Tools" target="_blank" class="project-link">View on GitHub →</a></p>
        `;
    } else if (projectId === 'project-java') {
        content = `
            <h2>Java Project</h2>
            <p>Comprehensive Java development project showcasing OOP principles.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li>Java</li>
            </ul>
            <p><a href="${githubBase}java_project" target="_blank" class="project-link">View on GitHub →</a></p>
        `;
    } else if (projectId === 'project-lungcancer') {
        content = `
            <h2>Lung Cancer Prediction ML Model</h2>
            <p>Machine Learning model for lung cancer prediction using Jupyter Notebooks.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li>Jupyter Notebook</li>
                <li>Machine Learning</li>
                <li>Python</li>
            </ul>
            <p><a href="${githubBase}lung-cancer-prediction-ML-MODEL-main" target="_blank" class="project-link">View on GitHub →</a></p>
        `;
    } else if (projectId === 'project-rl') {
        content = `
            <h2>Reinforcement Learning in Neuroscience</h2>
            <p>RL applications in neuroscience research and modeling.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li>Reinforcement Learning</li>
                <li>Neuroscience</li>
                <li>Python</li>
            </ul>
            <p><a href="${githubBase}Reinforcement-learning-RL-in-neuroscience-main" target="_blank" class="project-link">View on GitHub →</a></p>
        `;
    } else if (projectId === 'project-cvdisease') {
        content = `
            <h2>CV Disease Research Paper Model</h2>
            <p>Machine learning models from cardiovascular disease research papers implemented in Jupyter.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li>Jupyter Notebook</li>
                <li>Machine Learning</li>
            </ul>
            <p><a href="${githubBase}cv-disease-research-paper-model-main" target="_blank" class="project-link">View on GitHub →</a></p>
        `;
    } else if (projectId === 'project-ossaudit') {
        content = `
            <h2>OSS Audit 24MIM10081-Kartavya</h2>
            <p>Open Source Software audit and analysis project.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li>Shell</li>
            </ul>
            <p><a href="${githubBase}oss-audit-24MIM10081-Kartavya" target="_blank" class="project-link">View on GitHub →</a></p>
        `;
    } else if (projectId === 'project-demo') {
        content = `
            <h2>First GitHub Demo</h2>
            <p>My first demonstration project on GitHub.</p>
            <h3>Tech Stack</h3>
            <ul>
                <li>GitHub</li>
            </ul>
            <p><a href="${githubBase}this is my first demo of git hub" target="_blank" class="project-link">View on GitHub →</a></p>
        `;
    } else {
        content = '<h2>Project</h2><p>Check out the project on GitHub!</p>';
    }
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

window.closeModal = function() {
    modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

// Run everything on Load
window.addEventListener('load', () => {
    initLiquidButton('glass-button-container');
    initAnimations();
    initPopups();
});