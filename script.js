// Array to hold the sales records
let salesRecords = [];

// Function to add a sale
function addSale() {
    const date = document.getElementById('date').value;
    const item = document.getElementById('item').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!date || !item || !quantity) {
        alert('Please select a date, item, and quantity.');
        return;
    }

    // Check if a record with the same date and item already exists
    const existingRecord = salesRecords.find(record => record.date === date && record.item === item);

    if (existingRecord) {
        // If the record exists, update the quantity
        existingRecord.quantity += quantity;
    } else {
        // Create a new sale record
        const sale = {
            date: date,
            item: item,
            quantity: quantity
        };
        // Add the sale record to the array
        salesRecords.push(sale);
    }

    // Update the displayed sales list
    displaySales();
}

// Function to display the sales records
function displaySales() {
    const salesTableBody = document.querySelector('#salesTable tbody');
    salesTableBody.innerHTML = ''; // Clear the current table

    // Group sales by date
    const groupedSales = salesRecords.reduce((acc, record) => {
        if (!acc[record.date]) {
            acc[record.date] = [];
        }
        acc[record.date].push(record);
        return acc;
    }, {});

    // Get the dates and sort them in ascending order
    const sortedDates = Object.keys(groupedSales).sort((a, b) => new Date(a) - new Date(b));

    sortedDates.forEach(date => {
        const dateRow = document.createElement('tr');
        dateRow.innerHTML = `<td colspan="3" style="font-weight: bold;">${date}</td>`;
        salesTableBody.appendChild(dateRow);

        groupedSales[date].forEach(record => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td></td>
                <td>${record.item}</td>
                <td>${record.quantity}</td>
            `;
            salesTableBody.appendChild(tr);
        });
    });
}
