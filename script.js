// ========== RESUME DATA ==========
const resumeData = {
    personalInfo: {
        photo: 'images/photo.jpg',
        name: 'Your Name',
        phone: '+1 234 567 890',
        email: 'your.email@example.com',
        linkedin: 'https://linkedin.com/in/yourprofile'
    },
    summary: 'Write a brief description about yourself, your professional background, key strengths, and career objectives. Highlight what makes you unique and what you bring to potential employers.',
    skills: {
        sql: {
            title: 'SQL',
            icon: 'fas fa-database',
            description: 'Write a description of your SQL skills, including types of databases you\'ve worked with, query optimization experience, and specific projects where you used SQL.',
            experience: [
                { label: 'Years', value: 'Add years of experience' },
                { label: 'Proficiency', value: 'Beginner / Intermediate / Advanced / Expert' },
                { label: 'Tools', value: 'MySQL, PostgreSQL, SQL Server, etc.' }
            ]
        },
        excel: {
            title: 'Excel',
            icon: 'fas fa-file-excel',
            description: 'Write a description of your Excel skills, including advanced functions, pivot tables, macros, VBA, data analysis, and visualization capabilities.',
            experience: [
                { label: 'Years', value: 'Add years of experience' },
                { label: 'Proficiency', value: 'Beginner / Intermediate / Advanced / Expert' },
                { label: 'Specializations', value: 'Pivot Tables, VLOOKUP, Macros, etc.' }
            ]
        },
        python: {
            title: 'Python',
            icon: 'fas fa-code',
            description: 'Write a description of your Python skills, including libraries/frameworks you\'ve used, types of projects (data analysis, web development, automation, etc.), and specific applications.',
            experience: [
                { label: 'Years', value: 'Add years of experience' },
                { label: 'Proficiency', value: 'Beginner / Intermediate / Advanced / Expert' },
                { label: 'Libraries', value: 'Pandas, NumPy, Flask, Django, etc.' }
            ]
        }
    },
    workExperience: [
        {
            title: 'Company Name',
            subtitle: 'Your Role',
            dates: 'Jan 2020 - Present',
            description: 'Write a brief description of your responsibilities and achievements. Click to see more details about this position.',
            details: ['Achievement or responsibility 1', 'Achievement or responsibility 2', 'Achievement or responsibility 3']
        },
        {
            title: 'Previous Company',
            subtitle: 'Previous Role',
            dates: 'Jun 2018 - Dec 2019',
            description: 'Description of your previous role and responsibilities.',
            details: ['Achievement or responsibility 1', 'Achievement or responsibility 2']
        }
    ],
    education: [
        {
            title: 'University Name',
            subtitle: "Bachelor's Degree in Field of Study",
            dates: '2014 - 2018',
            description: 'Add details about your education, major achievements, relevant coursework, or extracurricular activities.',
            details: []
        }
    ]
};

// ========== TOGGLE DROPDOWN DETAILS ==========
function toggleDetails(button) {
    const header = button;
    const details = header.nextElementSibling;
    const isOpen = details.classList.contains('open');

    document.querySelectorAll('.timeline-details.open').forEach(detail => {
        detail.classList.remove('open');
    });
    document.querySelectorAll('.timeline-header.active').forEach(h => {
        h.classList.remove('active');
    });

    if (!isOpen) {
        details.classList.add('open');
        header.classList.add('active');
    }
}

// ========== SKILL MODAL FUNCTIONS ==========
function openSkillModal(skillKey) {
    const skillData = resumeData.skills[skillKey];
    
    if (!skillData) {
        console.error('Skill data not found for:', skillKey);
        return;
    }
    
    const modal = document.getElementById('skill-modal');
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    const modalIcon = modal.querySelector('.modal-icon');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalExperience = modal.querySelector('.modal-experience');
    
    if (modalIcon) {
        modalIcon.className = skillData.icon;
    }
    if (modalTitle) {
        modalTitle.textContent = skillData.title;
    }
    if (modalDescription) {
        modalDescription.textContent = skillData.description;
    }
    if (modalExperience) {
        modalExperience.innerHTML = '';
        skillData.experience.forEach(exp => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${exp.label}:</strong> <span>${exp.value}</span>`;
            modalExperience.appendChild(li);
        });
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSkillModal() {
    const modal = document.getElementById('skill-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// ========== POPULATE RESUME FUNCTIONS ==========
function populateSkills() {
    const container = document.getElementById('skills-grid');
    container.innerHTML = '';
    
    Object.entries(resumeData.skills).forEach(([key, skill]) => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.setAttribute('data-skill', key);
        card.onclick = () => openSkillModal(key);
        card.innerHTML = `
            <i class="${skill.icon}"></i>
            <span>${skill.title}</span>
        `;
        container.appendChild(card);
    });
}

function populateTimeline(containerId, items, isEducation = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    items.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const titleClass = isEducation ? 'school-name' : 'company-name';
        const detailsList = item.details && item.details.length > 0 
            ? `<ul class="details-list">${item.details.map(d => `<li>${d}</li>`).join('')}</ul>` 
            : '';
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <button class="timeline-header" onclick="toggleDetails(this)">
                    <div class="timeline-header-left">
                        <h3 class="${titleClass}">${item.title}</h3>
                        <span class="role">${item.subtitle}</span>
                    </div>
                    <div class="timeline-header-right">
                        <span class="dates">${item.dates}</span>
                        <i class="fas fa-chevron-down toggle-icon"></i>
                    </div>
                </button>
                <div class="timeline-details">
                    <p>${item.description}</p>
                    ${detailsList}
                </div>
            </div>
        `;
        container.appendChild(timelineItem);
    });
}

function populateResume() {
    // Personal Info
    document.getElementById('profile-photo').src = resumeData.personalInfo.photo;
    document.getElementById('name').textContent = resumeData.personalInfo.name;
    document.getElementById('footer-name').textContent = resumeData.personalInfo.name;
    
    const phoneLink = document.getElementById('phone');
    phoneLink.href = 'tel:' + resumeData.personalInfo.phone;
    phoneLink.querySelector('span').textContent = resumeData.personalInfo.phone;
    
    const emailLink = document.getElementById('email');
    emailLink.href = 'mailto:' + resumeData.personalInfo.email;
    emailLink.querySelector('span').textContent = resumeData.personalInfo.email;
    
    document.getElementById('linkedin').href = resumeData.personalInfo.linkedin;
    
    // Summary
    document.getElementById('summary-text').textContent = resumeData.summary;
    
    // Skills
    populateSkills();
    
    // Work Experience
    populateTimeline('work-timeline', resumeData.workExperience);
    
    // Education
    populateTimeline('education-timeline', resumeData.education, true);
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    populateResume();
    
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Close modal when clicking outside
document.getElementById('skill-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSkillModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSkillModal();
    }
});
