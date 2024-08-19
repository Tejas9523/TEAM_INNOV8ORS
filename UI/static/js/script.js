document.addEventListener('DOMContentLoaded', () => {
    // Login page functionality
    const loginForm = document.getElementById('loginForm');
    const signupLink = document.getElementById('signupLink');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Here you would typically send a request to your server to authenticate the user
            console.log('Login attempt:', email, password);

            // For demo purposes, we'll just redirect to the dashboard
            window.location.href = 'dashboard.html';
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Sign up functionality would be implemented here.');
        });
    }

    // Dashboard functionality
    const signOutBtn = document.getElementById('signOutBtn');

    if (signOutBtn) {
        signOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you would typically clear the user's session
            window.location.href = 'index.html';
        });
    }

    //highlighting tabs :

    // Add this script at the end of your HTML file or in a separate JS file
    document.addEventListener('DOMContentLoaded', function () {
        const links = document.querySelectorAll('nav ul li a');

        links.forEach(link => {
            link.addEventListener('click', function () {
                links.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });


    // Render credit score chart
    const scoreChart = document.getElementById('scoreChart');
    const riskChart = document.getElementById('riskChart');
    var score = document.getElementById('score').innerHTML;
    var risk = document.getElementById('risk').innerHTML;

    if (score > 750 && score <= 900) {
        grade = "Excellent";
        clr = "#048b59";
    }
    if (score > 650 && score <= 749) {
        grade = "Good";
        clr = "#f9c200";
    }
    if (score > 500 && score <= 649) {
        grade = "Average";
        clr = "#ff7300";
    }
    if (score > 300 && score <= 499) {
        grade = "Poor";
        clr = "#f93930";
    }
    document.getElementById('grade').innerHTML = grade;

    alert
    if (scoreChart) {

        new Chart(scoreChart, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [score, 900 - score],
                    backgroundColor: [clr, '#f0f0f0'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '80%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }

    if (risk > 0 && risk <= 1) {
        des = "Very low risk of default. High credit quality.";
        rgrade = "Excellent (AAA)";
        clr = "#00FF00";
    }
    if (risk > 1 && risk <= 3) {
        des = "Low risk of default. High credit quality but slightly lower than AAA.";
        rgrade = "Very Good (AA)";
        clr = "#66FF66";
    }
    if (risk > 3 && risk <= 5) {
        des = "Moderate risk of default. Good credit quality but with some vulnerabilities.";
        rgrade = "Good (A)";
        clr = "#9ACD32";
    }
    if (risk > 5 && risk <= 10) {
        des = "Moderate risk of default. Satisfactory credit quality but more susceptible to economic changes.";
        rgrade = "Fair (BBB)";
        clr = "#FFFF00";
    }
    if (risk > 10 && risk <= 20) {
        des = "High risk of default. Below investment grade; more sensitive to economic conditions.";
        rgrade = "Poor (BB)";
        clr = "#FFA500";
    }
    if (risk > 20 && risk <= 40) {
        des = "Very high risk of default. Speculative; substantial risk of default.";
        rgrade = "Very Poor (B)";
        clr = "#FF4500";
    }
    if (risk > 40 && risk <= 100) {
        des = "High probability of default. Credit quality is very low; significant risk of loss.";
        rgrade = "Default (C)";
        clr = "#FF0000";
    }
    document.getElementById('riskgrade').innerHTML = rgrade;
    document.getElementById('des').innerHTML = des;


    if (riskChart) {

        new Chart(riskChart, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [risk, 100 - risk],
                    backgroundColor: [clr, '#f0f0f0'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '80%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }


    // Render score trend chart
    const trendChart = document.getElementById('trendChart');
    if (trendChart) {
        dahsboard
        new Chart(trendChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Credit Score',
                    data: [700, 720, 750, 760, 770, 780],
                    borderColor: clr,
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 600,
                        max: 850
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    } dahsboard
}); dahsboard
dahsboard

function download() {

    var opt = {
        margin: 0,
        filename: 'Report.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Convert the container to a PDF
    html2pdf().from(document.getElementById('dashboard')).set(opt).save();
}

