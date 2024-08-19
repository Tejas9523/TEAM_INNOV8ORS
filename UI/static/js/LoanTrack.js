document.addEventListener('DOMContentLoaded', function() {
    // This function would normally fetch data from your backend
    var loan = document.getElementById('loan-trackers').innerHTML
    alert(loan)
    function fetchUserLoanData() {
        return new Promise((resolve) => {
            // Simulating an API call
            setTimeout(() => {
                resolve([
                    {
                        loanType: loan,
                        totalLoan: 250000,
                        paidAmount: 75000,
                        remainingAmount: 175000,
                        interestRate: 3.5,
                        payments: [
                            { month: "January 2024", status: "paid" },
                            { month: "February 2024", status: "default" },
                            { month: "March 2024", status: "paid" },
                            { month: "April 2024", status: "late" },
                            { month: "May 2024", status: "late" },
                            { month: "June 2024", status: "paid" },
                            { month: "July 2024", status: "paid" },
                            { month: "August 2024", status: "default" },
                            { month: "September 2024", status: "late" },
                            { month: "October 2024", status: "paid" },
                            { month: "November 2024", status: "paid" },
                            { month: "December 2024", status: "default" }
                        ]
                    },
                    {
                        loanType: "Car Loan",
                        totalLoan: 50000,
                        paidAmount: 20000,
                        remainingAmount: 30000,
                        interestRate: 4.5,
                        payments: [
                            { month: "June 2024", status: "late" },
                            { month: "July 2024", status: "late" },
                            { month: "August 2024", status: "paid" },
                            { month: "September 2024", status: "default" },
                            { month: "October 2024", status: "paid" },
                            { month: "November 2024", status: "late" },
                            { month: "December 2024", status: "paid" },
                            { month: "January 2025", status: "default" },
                            { month: "February 2025", status: "default" },
                            { month: "March 2025", status: "late" },
                            { month: "April 2025", status: "paid" },
                            { month: "May 2025", status: "paid" }
                        ]
                    }
                ]);
            }, 1000);
        });
    }

    function createLoanTracker(loan) {
        const trackerDiv = document.createElement('div');
        trackerDiv.className = 'loan-tracker';

        const header = document.createElement('div');
        header.className = 'loan-header';
        header.textContent = loan.loanType;
        trackerDiv.appendChild(header);

        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'scroll-container';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create header row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th class="loan-type">Loan Type</th>';
        loan.payments.forEach(payment => {
            headerRow.innerHTML += `<th>${payment.month}</th>`;
        });
        thead.appendChild(headerRow);

        // Create payment status row
        const statusRow = document.createElement('tr');
        statusRow.innerHTML = `<td class="loan-type">${loan.loanType}</td>`;
        loan.payments.forEach(payment => {
            let statusSymbol = getStatusSymbol(payment.status);
            statusRow.innerHTML += `<td><span class="payment-status">${statusSymbol}</span></td>`;
        });
        tbody.appendChild(statusRow);

        table.appendChild(thead);
        table.appendChild(tbody);
        scrollContainer.appendChild(table);
        trackerDiv.appendChild(scrollContainer);

        // Create summary
        const summary = calculateSummary(loan);
        const summaryContainer = createSummaryContainer(summary, loan);
        trackerDiv.appendChild(summaryContainer);

        return trackerDiv;
    }

    function getStatusSymbol(status) {
        switch(status) {
            case 'paid': return '✅';
            case 'default': return '❌';
            case 'late': return '⏳';
            default: return '❓';
        }
    }

    function calculateSummary(loan) {
        const summary = { timely: 0, late: 0, defaulted: 0 };
        loan.payments.forEach(payment => {
            switch(payment.status) {
                case 'paid': summary.timely++; break;
                case 'late': summary.late++; break;
                case 'default': summary.defaulted++; break;
            }
        });
        return summary;
    }

    function createSummaryContainer(summary, loan) {
        const container = document.createElement('div');
        container.className = 'summary-container';

        const items = [
            { label: 'On Time Payments', value: summary.timely },
            { label: 'Late Payments', value: summary.late },
            { label: 'Defaults', value: summary.defaulted },
            { label: 'Total Loan', value: `$${loan.totalLoan.toLocaleString()}` },
            { label: 'Paid Amount', value: `$${loan.paidAmount.toLocaleString()}` },
            { label: 'Remaining Amount', value: `$${loan.remainingAmount.toLocaleString()}` },
            { label: 'Interest Rate', value: `${loan.interestRate}%` }
        ];

        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'summary-item';
            div.innerHTML = `<h3>${item.label}</h3><p>${item.value}</p>`;
            container.appendChild(div);
        });

        return container;
    }

    // Main function to initialize the page
    async function initializePage() {
        const loanTrackersContainer = document.getElementById('loan-trackers');
        loanTrackersContainer.innerHTML = '<p>Loading...</p>';

        try {
            const loanData = await fetchUserLoanData();
            loanTrackersContainer.innerHTML = '';

            loanData.forEach(loan => {
                const loanTracker = createLoanTracker(loan);
                loanTrackersContainer.appendChild(loanTracker);
            });
        } catch (error) {
            console.error('Error fetching loan data:', error);
            loanTrackersContainer.innerHTML = '<p>Error loading loan data. Please try again later.</p>';
        }
    }

    initializePage();
});