// ========== RESUME DATA ==========
const resumeData = {
    personalInfo: {
        photo: 'images/photo.jpg',
        name: 'Natthawan Duangkaew',
        phone: '087 160 5848',
        email: 'natthawan.bdk@gmail.com',
        linkedin: 'https://linkedin.com/in/yourprofile'
    },
    summary: 'Data analyst with experience in reviewing and analyzing large sets of user-generated content. Skilled in identifying patterns, detecting potential risks, and supporting decision-making with data. Strong in SQL and Excel, with a focus on accuracy and clear analysis. Interested in applying analytical skills to risk and banking roles for long-term career growth.',
    
    skills: {
        sql: {
            title: 'SQL',
            icon: 'fas fa-database',
            description: 'Used SQL to extract, clean, and analyze large datasets. Able to write queries to identify patterns, trends, and abnormal behavior. Experience supporting reporting and investigation tasks.',
            experience: [
                { label: 'Years', value: '1+ year' },
                { label: 'Proficiency', value: 'Intermediate' },
                { label: 'Tools', value: 'SQL (internal tools, basic query optimization)' }
            ]
        },
        excel: {
            title: 'Excel',
            icon: 'fas fa-file-excel',
            description: 'Strong in data analysis using Excel. Experienced with Pivot Tables, VLOOKUP/XLOOKUP, and data cleaning. Used for reporting, trend analysis, and supporting business decisions.',
            experience: [
                { label: 'Years', value: '2+ years' },
                { label: 'Proficiency', value: 'Advanced' },
                { label: 'Specializations', value: 'Pivot Tables, VLOOKUP, XLOOKUP, Data Analysis' }
            ]
        },
        python: {
            title: 'Python',
            icon: 'fas fa-code',
            description: 'Basic experience using Python for data analysis and data handling. Familiar with simple scripts for data processing and analysis.',
            experience: [
                { label: 'Years', value: '<1 year' },
                { label: 'Proficiency', value: 'Beginner' },
                { label: 'Libraries', value: 'Pandas (basic), NumPy (basic)' }
            ]
        }
    },

    workExperience: [
        {
            title: 'Accenture',
            subtitle: 'Content Analyst',
            dates: '2024 - Present',
            description: 'Reviewed and analyzed large volumes of user content to ensure policy compliance and identify potential risks.',
            details: [
                'Analyzed user-generated content to identify patterns and potential risk behaviors',
                'Detected abnormal or suspicious cases and escalated when necessary',
                'Used internal tools, SQL, and Excel to support data analysis and reporting',
                'Worked with global teams to improve accuracy and consistency in decision-making',
                'Maintained high attention to detail and handled sensitive cases with accuracy'
            ]
        },
        {
            title: 'Tenma Paper Mills',
            subtitle: 'R&D Intern',
            dates: '2023',
            description: 'Supported research and data analysis for product and process improvement.',
            details: [
                'Collected and analyzed experimental data to support research projects',
                'Assisted in process improvement and testing',
                'Prepared reports and summarized findings for the team'
            ]
        }
    ],

    education: [
        {
            title: 'Chulalongkorn University',
            subtitle: "Master's Degree in Industrial Science",
            dates: '2022 - 2024',
            description: 'Focused on data analysis, research, and process optimization.',
            details: [
                'Hi-Fl Consortium Scholarship recipient',
                'Relevant coursework: Data Analysis, Statistics, Process Optimization'
            ]
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
