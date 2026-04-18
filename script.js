// ========== RESUME DATA ==========
const resumeData = {
    personalInfo: {
        photo: 'https://cdn.phototourl.com/free/2026-04-07-fcf60d49-f112-46b7-b796-94704bbf139e.jpg',
        name: 'Natthawan Duangkaew',
        phone: '+66 87 160 5848',
        email: 'natthawan.bdk@gmail.com',
        linkedin: 'http://linkedin.com/in/ntwdk'
    },

    summary: 'Business and data-oriented analyst with experience in trust and safety operations, focusing on risk assessment and policy-based decision making. Skilled in analyzing behavioral data, identifying risk patterns, and supporting consistent decisions in high-risk cases. Strong in Excel and SQL fundamentals, with the ability to turn data into clear insights. Interested in risk analytics roles in banking where I can apply analytical thinking to support risk evaluation and business decisions.',

    skills: {
        sql: {
            title: 'SQL',
            icon: 'fas fa-database',
            description: 'Basic experience in SQL for data extraction and analysis. Able to write queries to support investigation, identify patterns, and work with structured datasets.',
            experience: [
                { label: 'Years', value: '1 year' },
                { label: 'Proficiency', value: 'Basic - Intermediate' },
                { label: 'Tools', value: 'SQL (learning through Google Data Analytics Certificate)' }
            ]
        },
        excel: {
            title: 'Excel',
            icon: 'fas fa-file-excel',
            description: 'Advanced Excel skills for data analysis and reporting. Used to track case trends, summarize findings, and support internal reviews. Strong in data cleaning and structured analysis.',
            experience: [
                { label: 'Years', value: '2+ years' },
                { label: 'Proficiency', value: 'Advanced' },
                { label: 'Tools', value: 'Pivot Tables, VLOOKUP/XLOOKUP, Data Cleaning, Reporting' }
            ]
        },
        python: {
            title: 'Python',
            icon: 'fas fa-code',
            description: 'Basic knowledge of Python for data analysis. Familiar with using pandas for simple data handling and analysis tasks.',
            experience: [
                { label: 'Years', value: '<1 year' },
                { label: 'Proficiency', value: 'Beginner' },
                { label: 'Libraries', value: 'Pandas (basic)' }
            ]
        }
    },

    workExperience: [
        {
            title: 'Accenture Solution Co., Ltd.',
            subtitle: 'Content Analyst',
            dates: 'May 2024 - Present',
            description: 'Worked in trust and safety operations, focusing on analyzing high-risk user cases and supporting consistent policy-based decisions.',
            details: [
                'Analyzed complex and high-risk user cases using behavioral data and contextual signals',
                'Identified recurring patterns and risk indicators to support consistent decision-making',
                'Handled sensitive and edge cases with high attention to detail and accuracy',
                'Used Excel to track trends, summarize findings, and support internal reviews',
                'Collaborated with policy, quality, and operations teams to align decision standards',
                'Summarized insights from daily operations to support process improvement'
            ]
        },
        {
            title: 'Tenma Paper Mills Co., Ltd.',
            subtitle: 'Research and Development',
            dates: 'Jan 2022 - Jan 2024',
            description: 'Conducted research and data analysis to support product development and process optimization.',
            details: [
                'Designed and conducted experiments to test material performance',
                'Analyzed experimental and production data to meet industry standards',
                'Evaluated cost and performance to support practical recommendations',
                'Translated technical data into clear insights for process improvement'
            ]
        }
    ],

    education: [
        {
            title: 'Chulalongkorn University',
            subtitle: "Master of Science in Science for Industry",
            dates: 'Jan 2022 - Jan 2024',
            description: 'Focused on data analysis, research, and industrial process understanding.',
            details: [
                'Hi-Fl Consortium Scholarship (Full Scholarship)',
                'Relevant coursework: Industrial Process, Innovation Management, Business Concepts for Scientists'
            ]
        },
        {
            title: 'Chulalongkorn University',
            subtitle: "Bachelor of Science in Materials Science",
            dates: 'Aug 2017 - Jul 2021',
            description: 'Studied materials properties and industrial applications.',
            details: [
                'Relevant coursework: Ceramic Materials, Material Processing, Mechanical Properties'
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
