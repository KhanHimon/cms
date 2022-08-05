const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            label: '# of Votes',
            data: [50, 25, 25],
            backgroundColor: [
                'yellow',
                '#74F671',
                '#2C7BB5'
            ]
        }]
    }
});