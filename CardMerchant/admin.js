// Initialize DataTables
$(document).ready(function() {
    $('#activityTable').DataTable({
        responsive: true,
        order: [[0, 'desc']]
    });

    $('#usersTable').DataTable({
        responsive: true,
        ajax: {
            url: '/api/users', // Replace with real endpoint
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'email' },
            { 
                data: 'status',
                render: function(data) {
                    let badgeClass = 'pending';
                    if (data === 'verified') badgeClass = 'completed';
                    if (data === 'banned') badgeClass = 'flagged';
                    return `<span class="status ${badgeClass}">${data}</span>`;
                }
            },
            { data: 'cards' },
            { 
                data: 'balance',
                render: function(data) {
                    return '$' + parseFloat(data).toFixed(2);
                }
            },
            { data: 'last_active' },
            {
                data: null,
                render: function() {
                    return `
                        <div class="action-buttons">
                            <button class="btn-icon" title="Edit"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon" title="Ban"><i class="fas fa-ban"></i></button>
                        </div>
                    `;
                }
            }
        ]
    });

    // Tab switching
    $('.sidebar-nav a').click(function(e) {
        e.preventDefault();
        $('.sidebar-nav li').removeClass('active');
        $(this).parent().addClass('active');
        
        const target = $(this).attr('href');
        $('.admin-section').removeClass('active-section');
        $(target).addClass('active-section');
    });
});

// Search functionality
$('#userSearch').keyup(function() {
    $('#usersTable').DataTable().search($(this).val()).draw();
});

$('#userFilter').change(function() {
    const filter = $(this).val();
    if (filter === 'all') {
        $('#usersTable').DataTable().column(2).search('').draw();
    } else {
        $('#usersTable').DataTable().column(2).search(filter).draw();
    }
});

// Sample admin functions
function approveKYC(userId) {
    if (confirm(`Approve KYC for user ${userId}?`)) {
        // API call would go here
        alert(`KYC approved for user ${userId}`);
    }
}

function flagTransaction(txId) {
    if (confirm(`Flag transaction ${txId} as suspicious?`)) {
        // API call would go here
        alert(`Transaction ${txId} flagged for review`);
    }
}